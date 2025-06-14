from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'genres', GenresViewSet)  

urlpatterns = [
    path('import-genres/', import_genres_view),
    path('', include(router.urls)), 
]

