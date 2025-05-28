from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import NovelSerializer
from .models import Novel
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Value, IntegerField, Case, When, Q, Count
from .models import Novel
from rest_framework import filters

from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET'])
@permission_classes([AllowAny])
def advanced_search(request):
    include_genres = request.GET.getlist("include_genres")
    exclude_genres = request.GET.getlist("exclude_genres")
    min_chapters = request.GET.get("min_chapters")
    max_chapters = request.GET.get("max_chapters")
    author = request.GET.get("author")
    status = request.GET.get("status")

    novels = Novel.objects.all()

    if include_genres:
        # Lọc các truyện có đủ số lượng thể loại mong muốn
        novels = novels.annotate(
            matched_genres=Count('genres', filter=Q(genres___id__in=include_genres))
        ).filter(matched_genres=len(include_genres))
    print("novels", include_genres)
    if exclude_genres:
        novels = novels.exclude(genres___id__in=exclude_genres).distinct() 
        #bỏ truyện có 1 trong các thể loại không muốn

    if min_chapters:
        novels = novels.filter(numChapters__gte=int(min_chapters))

    if max_chapters:
        novels = novels.filter(numChapters__lte=int(max_chapters))

    if author:
        novels = novels.filter(author__icontains=author)

    if status:
        novels = novels.filter(status__iexact=status)

    serializer = NovelSerializer(novels, many=True, context={'request': request}) 
    # custom view nên cần request để biết base URL của server 
    return Response({"results": serializer.data})

class NovelViewSet(viewsets.ModelViewSet):
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer
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
    
@api_view(['PUT'])
@permission_classes([AllowAny])
def updateNumFavorite(request, pk):
    try:
        novel = Novel.objects.get(_id = pk)
        novel.numFavorites = novel.numFavorites + 1
        novel.save()
        serialize = NovelSerializer(novel, many=False, context={'request': request})
        return Response(serialize.data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"[ERROR updateNumFavorite]: {e}")
        return Response({'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['PUT'])
@permission_classes([AllowAny])
def updateNumComments(request, pk):
    try:
        # Lấy truyện theo ID
        novel = Novel.objects.get(_id=pk)
        
        # Tăng số lượng bình luận
        novel.numComments = novel.numComments + 1
        novel.save()
        
        # Serialize và trả về dữ liệu
        serialize = NovelSerializer(novel, many=False, context={'request': request})
        return Response(serialize.data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"[ERROR updateNumComments]: {e}")
        return Response({'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    




from django.http import JsonResponse
import os
import json
from .models import Novel
from chapter.models import NovelChapter
from genres.models import Genre
from django.conf import settings
import requests
from django.core.files.base import ContentFile

def download_image_to_file(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        file_name = os.path.basename(url)
        return ContentFile(response.content), file_name
    except Exception as e:
        print(f"❌ Failed to download image from {url}: {e}")
        return None, None

def import_novel_view(request):
    base_path = os.path.join(settings.BASE_DIR, 'novel', 'truyen-save-2')

    Novel.objects.all().delete()

    for i in range(2):
        for j in range(26):
            file_path = os.path.join(base_path, f'page{i+1}_truyen{j+1}.json')
            if not os.path.isfile(file_path):
                print(f"❌ File not found: {file_path}")
                continue

            with open(file_path, encoding='utf-8') as f:
                item = json.load(f)
            cover_file, cover_url = download_image_to_file(item.get('covers', ''))
            novel, _ = Novel.objects.get_or_create(
                title=item['title'],
                author=item['author'],
                description=item['description'],
                status=item['status'],
            )
            if cover_file and cover_url:
                cover_name = cover_url.split("/")[-1] + ".jpg"
                novel.cover_image.save(cover_name, cover_file, save=True)

            genre_names = item.get('genres', [])
            genre_instances = []
            for name in genre_names:
                genre, _ = Genre.objects.get_or_create(name=name)
                genre_instances.append(genre)
            novel.genres.set(genre_instances)

            chapters = item.get('chapters', [])
            novel.numChapters = len(chapters)
            for idx, chapter in enumerate(chapters):
                NovelChapter.objects.get_or_create(
                    novel=novel,
                    chapter_number=idx+1,
                    title=chapter['title_chapter'],
                    content=chapter['content'],
                )
            novel.save()

    return JsonResponse({"message": "✅ Tất cả truyện đã được import thành công!"})



import json
import os
import django
import sys
import requests
from django.conf import settings  # ✅ Import settings từ Django
from django.core.files.base import ContentFile

# Cấu hình Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

# Import models sau khi setup Django
from novel.models import Novel
from chapter.models import NovelChapter
from genres.models import Genre

def download_image_to_file(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        file_name = os.path.basename(url)
        return ContentFile(response.content), file_name
    except Exception as e:
        print(f"❌ Failed to download image from {url}: {e}")
        return None, None

def delete_all_novels():
    try:
        Novel.objects.all().delete()
        print("✅ All novels deleted successfully!")
    except Exception as e:
        print(f"❌ Failed to delete novels: {e}")

def import_novel(json_file_path):
    with open(json_file_path, encoding='utf-8') as f:
        item = json.load(f)
    cover_file, cover_url = download_image_to_file(item.get('covers', ''))
    novel, _ = Novel.objects.get_or_create(
        title=item['title'],
        author=item['author'],
        description=item['description'],
        status=item['status'],
    )
    if cover_file and cover_url:
        cover_name = cover_url.split("/")[-1] + ".jpg"
        novel.cover_image.save(cover_name, cover_file, save=True)
    genre_names = item.get('genres', [])
    genre_instances = []
    for name in genre_names:
        genre, _ = Genre.objects.get_or_create(name=name)
        genre_instances.append(genre)

    novel.genres.set(genre_instances)

    chapters = item.get('chapters', [])
    novel.numChapters = len(chapters)
    for idx, chapter in enumerate(chapters):
        NovelChapter.objects.get_or_create(
            novel=novel,
            chapter_number=idx + 1,
            title=chapter['title_chapter'],
            content=chapter['content'],
        )
    novel.save()
    print(f"✅ Imported: {novel.title} ({novel.numChapters} chapters)")

if __name__ == '__main__':
    print(f"Using Django settings module: {os.environ.get('DJANGO_SETTINGS_MODULE')}")
    delete_all_novels()
    for i in range(2):
        for j in range(26):
            # ✅ Sử dụng BASE_DIR
            json_file_path = os.path.join(settings.BASE_DIR, 'novel', 'truyen-save-2', f'page{i+1}_truyen{j+1}.json')
            if os.path.isfile(json_file_path):
                import_novel(json_file_path)
            else:
                print(f'❌ Không tìm thấy file: {json_file_path}')
                break
