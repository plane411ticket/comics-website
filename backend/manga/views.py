from .models import Manga
from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from django.db.models import Value, IntegerField, Case, When, Q, Count
from .serializers import MangaSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
# get,delete,post
class MangaViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset = super().get_queryset()
        q = self.request.query_params.get('q')
        if not q:
            return queryset
        keyword = q.strip().split()
        query = Q()
        relevance = Value(0, output_field=IntegerField())
        for kw in keyword:
            query |= Q(title__icontains=kw)
            query |= Q(author__icontains=kw)
            relevance = relevance + Case(
                When(title__icontains=kw, then=Value(10)),       # ưu tiên title
                When(author__icontains=kw, then=Value(5)),
                default=Value(0),
                output_field=IntegerField()
            )
        return queryset.filter(query).annotate(score=relevance).order_by('-score')
    # def get_permissions(self):
    #     if self.action in ['list', 'retrieve']:  # GET requests
    #         return [AllowAny()]
    #     return [IsAdminUser()]
@api_view(['GET'])
@permission_classes([AllowAny])
def advanced_search(request):
    include_genres = request.GET.getlist("include_genres")
    exclude_genres = request.GET.getlist("exclude_genres")
    min_chapters = request.GET.get("min_chapters")
    max_chapters = request.GET.get("max_chapters")
    author = request.GET.get("author")
    status = request.GET.get("status")

    Mangas = Manga.objects.all()

    if include_genres:
        # Lọc các truyện có đủ số lượng thể loại mong muốn
        Mangas = Mangas.annotate(
            matched_genres=Count('genres', filter=Q(genres___id__in=include_genres))
        ).filter(matched_genres=len(include_genres))
    print("Mangas", include_genres)
    if exclude_genres:
        Mangas = Mangas.exclude(genres___id__in=exclude_genres).distinct() 
        #bỏ truyện có 1 trong các thể loại không muốn

    if min_chapters:
        Mangas = Mangas.filter(numChapters__gte=int(min_chapters))

    if max_chapters:
        Mangas = Mangas.filter(numChapters__lte=int(max_chapters))

    if author:
        Mangas = Mangas.filter(author__icontains=author)

    if status:
        Mangas = Mangas.filter(status__iexact=status)

    serializer = MangaSerializer(Mangas, many=True, context={'request': request}) 
    # custom view nên cần request để biết base URL của server 
    return Response({"results": serializer.data})
def home(request):
    return render(request, 'home.html')


from django.shortcuts import render
from django.http import JsonResponse
import os, json

from django.conf import settings
from .models import Manga
from chapter.models import MangaChapter, MangaChapterImage
from genres.models import Genre

TRUYEN_PATH = os.path.join(settings.BASE_DIR, 'truyen_tranh', 'Json')

def convert_views(view_str):
    try:
        view_str = view_str.lower().replace('k', '000').replace('.', '')
        return int(view_str)
    except:
        return 0

def import_json_file(filepath, uploader):
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    if Manga.objects.filter(title=data["title"]).exists():
        return f"❗ Bỏ qua: {data['title']} đã tồn tại"

    manga = Manga.objects.create(
        title=data["title"],
        author=data.get("author", "Không rõ"),
        description=data.get("description", "Đang cập nhật"),
        uploader=uploader,  # ✅ dùng đối tượng CustomUser
        status='ongoing' if "tiến hành" in data["status"].lower() else 'completed',
        cover_image=data["cover"],
        source="Đang cập nhật",
        numViews=convert_views(data.get("views", "0"))
    )

    for g in data.get("genres", []):
        genre, _ = Genre.objects.get_or_create(name=g)
        manga.genres.add(genre)

    for chap_data in data.get("chapters", []):
        chapter = MangaChapter.objects.create(
            manga=manga,
            title=chap_data.get("title", f"Chapter {chap_data.get('number')}"),
            chapter_number=chap_data.get("number", 0)
        )

        for idx, image_url in enumerate(chap_data.get("images", []), start=1):
            MangaChapterImage.objects.create(
                chapter=chapter,
                image=image_url,
                page=idx
            )

    manga.numChapters = manga.chapters.count()
    manga.save()
    return f"✅ Nhập thành công: {manga.title}"


from django.contrib.auth import get_user_model

def import_all_manga(request):
    Manga.objects.all().delete()  # Xóa tất cả truyện hiện có
    User = get_user_model()
    uploader_user = User.objects.filter(username="admin").first()

    if not uploader_user:
        return JsonResponse({"error": "User 'upload' không tồn tại."}, status=400)

    results = []
    for file in os.listdir(TRUYEN_PATH):
        if file.endswith('.json'):
            json_file_path = os.path.join(TRUYEN_PATH, file)
            result = import_json_file(json_file_path, uploader_user)
            results.append(result)
    return JsonResponse({"results": results})

