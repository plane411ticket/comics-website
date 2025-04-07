from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Manga
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
        search = self.request.query_params.get('search') 
        if search:
            queryset = queryset.filter(title__icontains=search)
        return queryset
    # def get_permissions(self):
    #     if self.action in ['list', 'retrieve']:  # GET requests
    #         return [AllowAny()]
    #     return [IsAdminUser()] 
def home(request):
    return render(request, 'home.html')