from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth import authenticate
from .serializers import *
from .models import Favorite
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse
from rest_framework.exceptions import PermissionDenied
from novel.models import Novel
from manga.models import Manga
from django.contrib.auth import get_user_model
import jwt
import time
from rest_framework import permissions, viewsets
from django.contrib.contenttypes.models import ContentType
from .models import Comments
from .serializers import CommentsSerializer
from users.authentication import CookieJWTAuthentication
from rest_framework.decorators import authentication_classes
User = get_user_model()
# ============================
# Authentication with user
# ============================
@api_view(['POST'])
@permission_classes([AllowAny])
def RegisterUser(request):
    data = request.data
    try:
        if User.objects.filter(email=data["email"]).exists():
            return Response({"detail": "User with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        if not data['name'] or not data['password']:
            return Response({"detail": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password']) # hash password for security
        )
        print("Received data:", request.data) 
        message = {'detail': 'Register Successfully!'}
        
        return Response({"message": message, "id": user.id}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Lỗi: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def LoginUser(request):
    data = request.data
    try:
        email = data['email']
        password = data['password']
        
        user = authenticate(username=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            info = {"user":({"username":user.username},{"_id":user.id})}
            response = HttpResponse({"message": "Đăng nhập thành công!"}, info)
            response.set_cookie(
                key="access_token", value=access_token, httponly=True, secure=True, samesite="Lax"
            )
            response.set_cookie(
                key="refresh_token", value=str(refresh), httponly=True, secure=True, samesite="Lax"
            )

            return response

        return Response({"error": password}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": f"Lỗi: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def LogoutUser(request):
    response = Response({"message": "Logged out successfully"}, status=200)
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response
@api_view(["POST"])
@permission_classes([AllowAny])
def RefreshTokenView(request):
    refresh_token = request.COOKIES.get("refresh_token")
    access_token = request.COOKIES.get("access_token")

    # Kiểm tra access token còn hạn không
    if access_token:
        try:
            # Giải mã access token để đọc `exp` mà không cần verify signature
            payload = jwt.decode(access_token, options={"verify_signature": False})
            exp = payload.get("exp")

            if exp and exp > int(time.time()):
                print("Token chưa hạn")
                return Response({"message": "Access token vẫn còn hiệu lực, không cần refresh."})
        except jwt.DecodeError:
            pass  # token lỗi, sẽ xử lý bên dưới
    if not refresh_token:
        return Response({"error": "Không có refresh token!"}, status=status.HTTP_401_UNAUTHORIZED)

    # Nếu access token hết hạn hoặc lỗi → tạo token mới từ refresh
    try:
        refresh = RefreshToken(refresh_token)
        new_access_token = str(refresh.access_token)

        response = HttpResponse({"message": "Đã tạo access token mới!"})
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

# ============================
#  User ViewSets
# ============================

@authentication_classes([CookieJWTAuthentication])
class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if(user.is_staff or user.is_superuser):
            return User.objects.all()
        return User.objects.filter(id=user.id)
    def perform_destroy(self, instance):
        user = self.request.user
        if not (user.is_staff or user.is_superuser or instance == user):
            raise PermissionDenied("Bạn không có quyền xóa tài khoản này.")
        instance.delete()
    def perform_update(self, serializer):
        user = self.request.user
        if not (user.is_staff or user.is_superuser or self.get_object() == user):
            raise PermissionDenied("Bạn không có quyền cập nhật tài khoản này.")
        serializer.save()

@api_view(["POST"])
@authentication_classes([CookieJWTAuthentication])
def ToggleLike(request):
    user = request.user
    type = request.data.get("type")
    post_id = request.data.get("post_id")
    if not post_id:
        return Response({"error": "Missing 'post' ID"}, status=status.HTTP_400_BAD_REQUEST)

    if(type == "novel"):
        try:
            post = Novel.objects.get(_id=post_id)
        except Novel.DoesNotExist:
            return Response({"error": "Novel not found"}, status=status.HTTP_404_NOT_FOUND)
    if(type == "manga"):
        try:
            post = Manga.objects.get(_id=post_id)
        except Manga.DoesNotExist:
            return Response({"error": "Manga not found"}, status=status.HTTP_404_NOT_FOUND)
    print("Debug like: ",post_id)
    like = Likes.objects.filter(user=user, post_id=post_id).first()

    if like:
        # Nếu đã like → unlike
        like.delete()
        post.numLikes = max(post.numLikes - 1, 0)
        post.save(update_fields=['numLikes'])
        return Response({"status": "unliked","numLikes":post.numLikes}, status=status.HTTP_200_OK)
    else:
        # Nếu chưa like → like
        Likes.objects.create(user=user, post_id=post_id, type=type)
        post.numLikes += 1
        post.save(update_fields=['numLikes'])
        return Response({"status": "liked","numLikes":post.numLikes}, status=status.HTTP_201_CREATED)
@api_view(["POST"])
@authentication_classes([CookieJWTAuthentication])
def ToggleFavorite(request):
    user = request.user
    type = request.data.get("type")
    post_id = request.data.get("post_id")
    if not post_id:
        return Response({"error": "Missing 'post' ID"}, status=status.HTTP_400_BAD_REQUEST)

    if(type == "novel"):
        try:
            post = Novel.objects.get(_id=post_id)
        except Novel.DoesNotExist:
            return Response({"error": "Novel not found"}, status=status.HTTP_404_NOT_FOUND)
    if(type == "manga"):
        try:
            post = Manga.objects.get(_id=post_id)
        except Manga.DoesNotExist:
            return Response({"error": "Manga not found"}, status=status.HTTP_404_NOT_FOUND)
    print("Debug fav: ",post_id)
    fav = Favorite.objects.filter(user=user, post_id=post_id).first()

    if fav:
        # Nếu đã fav → unfav
        fav.delete()
        post.numFavorites = max(post.numFavorites - 1, 0)
        post.save(update_fields=['numFavorites'])
        return Response({"status": "unfavorite","numFavorites":post.numFavorites}, status=status.HTTP_200_OK)
    else:
        # Nếu chưa fav → fav
        Favorite.objects.create(user=user, post_id=post_id, type=type)
        post.numFavorites += 1
        post.save(update_fields=['numFavorites'])
        return Response({"status": "favorite","numFavorites":post.numFavorites}, status=status.HTTP_201_CREATED)

@authentication_classes([CookieJWTAuthentication])
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

    def get_permissions(self):
        # Mặc định mọi người được xem
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        # Các action còn lại cần đăng nhập
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        chapter_type = self.request.query_params.get('chapter_type')
        chapter_id = self.request.query_params.get('chapter_id')
        content_type = self.request.query_params.get('content_type')
        object_id = self.request.query_params.get('object_id')

        if chapter_type and chapter_id:
            try:
                chapter_model = ContentType.objects.get(model=chapter_type.lower())
                return Comments.objects.filter(
                    chapter_content_type=chapter_model,
                    chapter_object_id=chapter_id
                ).order_by('-created_at')
            except ContentType.DoesNotExist:
                return Comments.objects.none()

        elif content_type and object_id:
            try:
                post_model = ContentType.objects.get(model=content_type.lower())
                return Comments.objects.filter(
                    content_type=post_model,
                    object_id=object_id
                ).order_by('-created_at')
            except ContentType.DoesNotExist:
                return Comments.objects.none()

        return Comments.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        obj = serializer.validated_data['content_object']
        if hasattr(obj, 'numComments'):
            obj.numComments = getattr(obj, 'numComments', 0) + 1
            obj.save(update_fields=['numComments'])

    def perform_destroy(self, instance):
        user = self.request.user
        if not (user.is_staff or user.is_superuser or instance.user == user):
            raise PermissionDenied("Bạn chỉ có thể xóa comment của chính mình.")

        obj = instance.content_object
        if hasattr(obj, 'numComments'):
            obj.numComments = max(getattr(obj, 'numComments', 1) - 1, 0)
            obj.save(update_fields=['numComments'])

        instance.delete()