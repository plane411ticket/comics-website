from rest_framework import serializers
from .models import Manga, Chapters, Comments

class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manga
        fields = '__all__'
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapters
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'