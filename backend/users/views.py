from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import UserSerializer, FavoriteSerializer, UserSerializerWithToken
from .models import Favorite
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):   
    def validate(self,attrs):
        data = super().validate(attrs) # perform JWT authentication.
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v # add more data
        return data   

class MyTokenObtainView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password']) # hash password for security
        )
        serializer =  UserSerializerWithToken(user,many=False) 
        # use customize token-function to create obtain pair token with new data
        return Response(serializer.data) 
    except:
        message = {'detail': 'User with this email already exists'}
        return Response (message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    try:
        user = request.user 
        serializer = UserSerializerWithToken(user,many=False)
        data = request.data
        user.first_name =data['name']
        user.username = data['username']
        user.email = data['email']
        if data['password']!='':
            user.password = make_password(data['password'])
        user.save()
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail':f'{e}'},status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    try:
        user = request.user 
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail':f'{e}'},status=status.HTTP_204_NO_CONTENT)


class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Favorite.objects.filter(user=user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else: 
            print(serializer.errors)
