from rest_framework import viewsets
from .models import Manga
from .serializers import MangaSerializer

class MangaViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer
