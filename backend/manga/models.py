from django.db import models

class Manga(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='static/images/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
