import json
import os
import django
import sys


# Dynamically setting the Django project path
project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))  # Lấy đường dẫn gốc của dự án
sys.path.append(project_path)

# Set the default settings module for Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# Initialize Django
django.setup()

from manga.models import Manga
from genres.models import Genre


# Function to import genres from a JSON file
def import_mangas(json_file_path):
    Manga.objects.all().delete()  # Xóa dữ liệu cũ

    with open(json_file_path, encoding='utf-8') as f:
        data = json.load(f)

        for item in data:
            manga = Manga.objects.create(
                title=item['title'],
                author=item['author'],
                description=item['description'],
                cover_image=item['cover_image']
            )

            for genre_name in item.get('genres', []):
                genre, _ = Genre.objects.get_or_create(name=genre_name)
                manga.genres.add(genre)

    print("✅ Manga imported successfully!")

# Main function
def create_Mangas(apps, schema_editor):
    # Ensure the environment is correctly set
    print(f"Using Django settings module: {os.environ.get('DJANGO_SETTINGS_MODULE')}")

    # Optionally delete existing data to avoid conflict
    Manga = apps.get_model('manga', 'Manga')

if __name__ == '__main__':
    json_file_path = os.path.join(project_path, 'manga', 'UNREAL_data.JSON')
    import_mangas(json_file_path)
    print("✅ Đã lọc và tải truyện lên database.")
