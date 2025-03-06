from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MangaViewSet,manga_list

router = DefaultRouter()
router.register(r'manga', MangaViewSet)  # /api/manga/

urlpatterns = [
    path('', include(router.urls)),
]
