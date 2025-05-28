from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import uuid
from manga.models import *
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class CustomUser(AbstractUser):
    cover = models.ImageField(upload_to='covers/', null=True, blank=True)

    def __str__(self):
        return self.username

class Favorite(models.Model):
    FAVORITE_TYPE = [
        ('novel', 'Tiểu thuyết'),
        ('manga', 'Manga'),
        ('audio', 'Audio'),
        ('forum', 'Diễn đàn'),
    ]
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    post_id = models.CharField(blank=True, max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    type = models.CharField(
        max_length=20,
        choices=FAVORITE_TYPE,
        default='novel'
    ) # tăng tốc độ truy xuất 
    def __str__(self):
        return str(self.user)


class Comments(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    # Đối tượng cha (post chính): Manga, Novel, Audio, Forum
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='comment_post_type')
    object_id = models.CharField(max_length=255)
    content_object = GenericForeignKey('content_type', 'object_id')

    # Nếu comment nằm trong chapter cụ thể nào đó (ChapterManga, ChapterNovel,...)
    chapter_content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True, blank=True, related_name='comment_chapter_type')
    chapter_object_id = models.CharField(max_length=255, null=True, blank=True)
    chapter = GenericForeignKey('chapter_content_type', 'chapter_object_id')

    def __str__(self):
        return f"{self.user} - {self.content[:20]}..."
        
class Likes(models.Model):
    LIKE_PLACES = [
        ('novel', 'Tiểu thuyết'),
        ('manga', 'Manga'),
        ('audio', 'Audio'),
        ('forum', 'Diễn đàn'),
    ]
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post_id = models.CharField(blank=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(
        max_length=20,
        choices=LIKE_PLACES,
        default='novel'
    ) # tăng tốc độ truy xuất 
    def __str__(self):
        return f"{self.user} - {self.comment}"