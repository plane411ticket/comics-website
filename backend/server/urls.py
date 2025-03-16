from django.contrib import admin
from django.urls import path, include
from manga.views import home
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from debug_toolbar.toolbar import debug_toolbar_urls
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('manga.urls')),  # API starts with /api/
    path('api/', include('users.urls')),
    # auth login
    # path('api-auth/', include('rest_framework.urls')),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', home),
    # path("", TemplateView.as_view(template_name="index.html")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += debug_toolbar_urls()