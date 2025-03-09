from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets,status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Manga,Chapter,Page
from .serializers import MangaSerializer, ChapterSerializer, PageSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

class MangaViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer

class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    parser_classes = (MultiPartParser, FormParser)

@api_view(['GET'])
def manga_request(request):
    return HttpResponse('Manga request')


def home(request):
    return render(request, 'home.html')