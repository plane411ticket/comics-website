from django.urls import re_path
from . import consumer

websocket_urlpatterns = [re_path(r'ws/notifications/(?P<user_id>[^/]+)/$', consumer.NotificationConsumer.as_asgi()),]
