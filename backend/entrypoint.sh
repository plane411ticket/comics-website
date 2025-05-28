#!/bin/sh

python manage.py makemigrations
echo "🔧 Chạy migrate..."
python manage.py migrate

echo ">> Creating superuser..."
python3 create_superuser.py

echo "🚀 Khởi động server..."
python manage.py runserver 0.0.0.0:8000
 