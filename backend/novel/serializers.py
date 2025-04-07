from rest_framework import serializers
from .models import Novel
class NovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novel
        fields = '__all__'
        read_only_fields = ['numViews', 'numFavorites','numChapters', 'numLikes', 'numComments']
