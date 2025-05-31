from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'me', ProfileViewSet, basename='my-profile')
urlpatterns = [
    path('favorite/', ToggleFavorite, name='favorite'),
    path('like/',ToggleLike,name='like_post'),
    path('refresh/',RefreshTokenView,name='token_refresh'),
    path('login/', LoginUser,name='token_obtain_pair'),
    path('register/',RegisterUser ,name='register'),
    path('logout/',LogoutUser ,name='logout'),
    # path('notifications/', NotificationViewSet, name='notification-list'),
    # path('notifications/mark-as-seen/', MarkAsSeenViewSet, name='notification-mark-seen'),
    # path('notifications/<int:pk>/', NotificationDeleteViewSet, name='notification-delete'),
    
    path('', include(router.urls)),
    # to be continued
]
