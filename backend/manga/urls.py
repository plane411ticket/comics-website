from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MangaViewSet,PageViewSet,ChapterViewSet

router = DefaultRouter()
router.register(r'manga', MangaViewSet)  # /api/manga/
router.register(r'pages', PageViewSet)
router.register(r'chapters', ChapterViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
