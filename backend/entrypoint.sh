#!/bin/sh

python manage.py makemigrations
echo "🔧 Chạy migrate..."
python manage.py migrate
echo "from django.contrib.auth import get_user_model; User = get_user_model(); print('Superuser exists') if User.objects.filter(username='admin').exists() else User.objects.create_superuser('admin', 'admin@example.com', '@Admin0123456')" | python3 manage.py shell

echo "🚀 Khởi động server..."
python manage.py runserver 0.0.0.0:8000
 