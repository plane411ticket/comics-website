from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'genre', GenresViewSet)

urlpatterns = [
    path('genre/', genre_request, name="genres"),
]

