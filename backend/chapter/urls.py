from django.urls import path
from .views import *

urlpatterns = [
    path("manga/<str:pk>/chapters", getMangaChapterList, name="chapters-by-manga"),  
    path("chapter/<str:pk>/", getMangaChapter, name="chapter-detail"),  
    path("novel/<str:pk>/chapters", getNovelChapterList, name="chapters-by-novel"),
    path("chapter/<str:pk>/novel", getNovelChapter, name="chapter-detail-novel"),
]
