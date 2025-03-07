from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MangaViewSet,PageSerializer,ChapterSerializer

router = DefaultRouter()
router.register(r'manga', MangaViewSet)  # /api/manga/
router.register(r'pages', PageSerializer)
router.register(r'chapters', ChapterSerializer)
urlpatterns = [
    path('', include(router.urls)),
]
