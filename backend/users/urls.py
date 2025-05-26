from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'profile', ProfileViewSet, basename='profile')
urlpatterns = [
    path('favorite/', ToggleFavorite, name='favorite'),
    path('like/',ToggleLike,name='like_post'),
    path('refresh/',refreshTokenView,name='token_refresh'),
    path('login/', loginUser,name='token_obtain_pair'),
    path('register/',registerUser ,name='register'),
    path('logout/',logoutUser ,name='logout'),
    
    path('', include(router.urls)),
    # to be continued
]
