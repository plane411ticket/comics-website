from django.db import models
from django.contrib.auth.models import User
import uuid

from manga.models import *
# class User(models.Model):
#     _id = models.UUIDField(default=uuid.uuid4,  unique=True,
#                            primary_key=True, editable=False)
#     username = models.CharField(max_length=200, null=True, blank=True)
#     email = models.EmailField(max_length=200, null=True, blank=True)
#     password = models.CharField(max_length=200, null=True, blank=True)
#     isAdmin = models.BooleanField(default=False)
#     createdAt = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.username

#     def has_perm(self, perm, obj=None):
#         return self.isAdmin

#     def has_module_perms(self, app_label):
#         return True

    # @property
    # def token(self):
    #     return ''
# Create your models here.
class Favorite(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    manga = models.ForeignKey(Manga, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)