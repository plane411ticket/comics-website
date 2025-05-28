#!/bin/sh

python manage.py makemigrations
echo "🔧 Chạy migrate..."
python manage.py migrate

echo "🚀 Khởi động server..."
python manage.py runserver 0.0.0.0:8000
 