from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from manga.serializers import MangaSerializer

from .models import Favorite


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', "password" ,'email', 'isAdmin']
        extra_kwargs = {'password': {'write_only': True}}    

    def create(self,validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name
class FavoriteSerializer(serializers.ModelSerializer):
    manga = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Favorite
        fields = '__all__'

    def get_manga(self, obj):
        manga = obj.manga
        serializer = MangaSerializer(manga, many=False)
        return serializer.data