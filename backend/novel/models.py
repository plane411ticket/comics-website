from django.db import models

# Create your models here. hacked by zpotassium

class Novel(models.Model):
    title = models.CharField(max_length=255, unique=True)       # Tên truyện
    description = models.TextField()   # Mô tả truyện
    cover_image = models.URLField()  # Link ảnh bìa
    created_at = models.DateTimeField(auto_now_add=True)    # Ngày tạo

    def __str__(self):
        return self.title 

class Chapter(models.Model):
    novel = models.ForeignKey(Novel, related_name="chapters", on_delete=models.CASCADE) # Truyện liên kết
    chapter_number = models.IntegerField() # Số chương
    title = models.CharField(max_length=255, blank=True, null=True) # Tiêu đề chương
    content = models.JSONField()  # Từng trang nội dung
    created_at = models.DateTimeField(auto_now_add=True) # Ngày tạo

    class Meta:
        unique_together = ("novel", "chapter_number") # Tránh trùng lặp

    def __str__(self):
        return f"{self.novel.title} - Chapter {self.chapter_number}"  

