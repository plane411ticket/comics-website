from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

urlpatterns = [
    path('login/', MyTokenObtainView.as_view(),name='token_obtain_pair'),
    path('register/',registerUser ,name='register'),
    path('profile/',getUserProfile ,name='user-profile'),
    path('profile/update/',updateUserProfile,name='user-update-profile'),
    # to be continued
]
