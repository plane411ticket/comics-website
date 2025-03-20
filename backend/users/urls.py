from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [
    path('refresh/',refreshTokenView,name='token_refresh'),
    path('login/', loginUser,name='token_obtain_pair'),
    path('register/',registerUser ,name='register'),
    path('logout/',logoutUser ,name='logout'),
    path('profile/',getUserProfile ,name='user-profile'),
    path('profile/update/',updateUserProfile,name='user-update-profile'),
    # to be continued
]
