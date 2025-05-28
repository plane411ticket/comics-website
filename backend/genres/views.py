from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from rest_framework import viewsets,status
from .views import *
from .models import Genre
from .serializers import GenresSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAdminUser

class GenresViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenresSerializer
    permission_classes = [AllowAny]
    
    
@api_view(["GET"])
@permission_classes([AllowAny])
def genre_request(request):
    genres = Genre.objects.all() 
    serializer = GenresSerializer(genres, many=True)
    return Response({"genres": serializer.data}, status=status.HTTP_200_OK)



# views.py

from django.http import JsonResponse
import os
import json
from .models import Genre
from django.conf import settings

def import_genres_view(request):
    file_path = os.path.join(settings.BASE_DIR, '..', 'genres', 'unique_genres.json')

    # Xóa dữ liệu cũ để tránh trùng lặp
    Genre.objects.all().delete()

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)
        for item in data:
            Genre.objects.get_or_create(name=item['name'])

    return JsonResponse({"message": "✅ Genres imported successfully!"})
