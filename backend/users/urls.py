from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, FavoriteViewSet

router = DefaultRouter()
router.register(r'user/register', UserViewSet,basename="user")  # /api/user/register/
router.register(r'user/favorites', FavoriteViewSet,basename="favorites")  # /api/user/favorites/

urlpatterns = [
    path('', include(router.urls)),
]
