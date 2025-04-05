from rest_framework import serializers
from .models import Manga

class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manga
        fields = '__all__'
        read_only_fields = ['numViews', 'numFavorites', 'numChapters', 'numLikes', 'numComments']
