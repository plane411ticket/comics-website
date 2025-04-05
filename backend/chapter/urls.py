from django.urls import path
from .views import getMangaChapter, getMangaChapterList

urlpatterns = [
    path("manga/<str:pk>/chapters", getMangaChapterList, name="chapters-by-manga"),  
    path("chapter/<str:pk>/", getMangaChapter, name="chapter-detail"),  
]
