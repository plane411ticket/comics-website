from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets,status
from views import *
from .models import *
from serializers import *
class GenresViewSet(viewsets.ModelViewSet):
    queryset = Genres.objects.all()
    serializer_class = GenresSerializer
