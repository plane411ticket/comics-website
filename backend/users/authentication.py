from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get("access_token")
        print(f"Raw token from cookies: {raw_token}")
        if raw_token is None:
            return None  # No token? Let DRF fall back to permission check
        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            print(f"Authenticated user: {user.username}")
            if user is None:
                print("User not found for the provided token.")
                return None
            return (user, validated_token)
        except (InvalidToken, TokenError):
            print(f"Invalid token: {raw_token}")
            return None  # Invalid token? Silently fail so permission_classes can decide

    def authenticate_header(self, request):
        return ''