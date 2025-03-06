from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Manga
from .serializers import MangaSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


class MangaViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer

@api_view(['GET'])
def manga_list(request):
    sample_data = [
        {"id": 1, "title": "One Piece", "author": "Eiichiro Oda"},
        {"id": 2, "title": "Naruto", "author": "Masashi Kishimoto"},
    ]
    return Response(sample_data)


def home(request):
    return render(request, 'home.html')