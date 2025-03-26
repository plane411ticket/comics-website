from django.db import models
class Manga(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='manga_covers/',default='manga_covers/default.jpg',blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title

class Chapter(models.Model):
    manga = models.ForeignKey(Manga, related_name="chapters", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.manga.title} - Chapter {self.number}"

class Page(models.Model):
    chapter = models.ForeignKey(Chapter, related_name="pages", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="manga_pages/")
    page_number = models.IntegerField()

    def __str__(self):
        return f"Page {self.page_number} of {self.chapter}"
