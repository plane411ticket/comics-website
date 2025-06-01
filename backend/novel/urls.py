from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
router = DefaultRouter()
router.register(r'novel', NovelViewSet)  # /api/manga/


urlpatterns = [
    path('novel/advanced-search/', advanced_search, name='advanced_search'),
    path('', include(router.urls)),
]

