from rest_framework import serializers
from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'cover']
        read_only_fields = ['id'] 
    

class FavoriteSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Favorite
        fields = '__all__'
    def get_user(self,obj):
        user = obj.user
        serializers = UserSerializer(user,many=False)
        return serializers.data
class CommentsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comments
        fields = ['post_id','content','type','parent']
        read_only_fields = ['createdAt', 'user']
    def get_user(self,obj):
        user = obj.user
        serializers = UserSerializer(user,many=False)
        return serializers.data
class LikeSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Likes
        fields = '__all__'
    def get_user(self,obj):
        user = obj.user
        serializers = UserSerializer(user,many=False)
        return serializers.data

# class NotificationSerializer(serializers.ModelSerializer):
#     user = serializers.SerializerMethodField(read_only=True)
#     class Meta:
#         model = Notification
#         fields = '__all__'
#     def get_user(self, obj):
#         user = obj.user
#         serializers = UserSerializer(user, many=False)
#         return serializers.data