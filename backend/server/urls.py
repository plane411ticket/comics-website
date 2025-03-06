from django.contrib import admin
from django.urls import path, include
from manga.views import home
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('manga.urls')),  # API starts with /api/
    path('', home),
]
