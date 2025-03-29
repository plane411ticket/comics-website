from django.contrib import admin
from .models import Genres

@admin.register(Genres)
class GenresAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'createdAt')

