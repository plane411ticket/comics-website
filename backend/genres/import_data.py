import json
import os
import django
import sys

# Load Django settings
sys.path.append('/home/nndd411/NT208.P21.ANTN_1/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from genres.models import Genre
print(os.environ.get('DJANGO_SETTINGS_MODULE'))

def import_genres():
    with open('genres.json', encoding='utf-8') as f:
        data = json.load(f)
        for item in data:
            Genre.objects.get_or_create(name=item['name'])
    print("✅ Genres imported successfully!")

if __name__ == "__main__":
    Genre.objects.all().delete() #xóa để tránh xung đột dữ liệu
    import_genres()
