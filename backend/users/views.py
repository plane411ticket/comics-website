from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth import authenticate
from .serializers import UserSerializer, FavoriteSerializer, UserSerializerWithToken
from .models import Favorite
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

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
        
        message = {'detail': 'Success!'}
        return Response (message,status=status.HTTP_200_OK) 
    except:
        message = {'detail': 'User with this email already exists'}
        return Response (message,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def loginUser(request):
    data = request.data
    try:
        email = data['email']
        password = data['password']
        
        user = authenticate(username=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            response = HttpResponse({"message": "Đăng nhập thành công!"})
            response.set_cookie(
                key="access_token", value=access_token, httponly=True, secure=True, samesite="Lax"
            )
            response.set_cookie(
                key="refresh_token", value=str(refresh), httponly=True, secure=True, samesite="Lax"
            )

            return response

        return Response({"error": "Thông tin đăng nhập không chính xác!"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": f"Lỗi: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(["POST"])
def refreshTokenView(request):
    refresh_token = request.COOKIES.get("refresh_token")  # Lấy refresh token từ cookie
    if not refresh_token:
        return Response({"error": "Không có refresh token!"}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        refresh = RefreshToken(refresh_token)  # Tạo access token mới từ refresh token
        new_access_token = str(refresh.access_token)

        response = HttpResponse({"message": "Refresh token thành công!"})
        response.set_cookie(
            key="access_token",
            value=new_access_token,
            httponly=True,
            secure=True,
            samesite="Lax",
        )
        return response

    except Exception:
        return Response({"error": "Refresh token không hợp lệ!"}, status=status.HTTP_401_UNAUTHORIZED)   

    
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

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    try:
        return Response({"user": request.user.username})
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
