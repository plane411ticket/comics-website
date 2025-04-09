from django.urls import path
from .views import getMangaChapter, getMangaChapterList, getNovelChapterList, getNovelChapter

urlpatterns = [
    path("novel/<str:pk>/chapters", getNovelChapterList, name="chapters-by-novel"),  
    path("chapter/<str:pk>/", getNovelChapter, name="chapter-detail"),  
]

urlpatterns = [
    path("manga/<str:pk>/chapters", getMangaChapterList, name="chapters-by-manga"),  
    path("chapter/<str:pk>/", getMangaChapter, name="chapter-detail"),  
]
