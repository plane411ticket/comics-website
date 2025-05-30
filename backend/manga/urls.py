from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'manga', MangaViewSet)  # /api/manga/

urlpatterns = [
    path('import/', import_all_manga, name='import_manga'),
    path('manga/advanced-search/', advanced_search, name='advanced_search'),
    path('', include(router.urls)),
]
