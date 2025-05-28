# import json
# import os
# import django
# import sys
# from django.conf import settings

# # Dynamically setting the Django project path
# project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))  # Lấy đường dẫn gốc của dự án
# sys.path.append(project_path)

# # Set the default settings module for Django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# # Initialize Django
# django.setup()

# from genres.models import Genre

# # Function to import genres from a JSON file
# def import_genres(json_file_path):
#     #Delete to avoid duplicate
#     Genre.objects.all().delete()
#     with open(json_file_path, encoding='utf-8') as f:
#         data = json.load(f)
#         for item in data:
#             Genre.objects.get_or_create(name=item['name'])
#     print("✅ Genres imported successfully!")

# # Main function
# def create_genres(apps, schema_editor):
#     # Ensure the environment is correctly set
#     print(f"Using Django settings module: {os.environ.get('DJANGO_SETTINGS_MODULE')}")

#     # Optionally delete existing data to avoid conflict
#     Genre = apps.get_model('genres', 'Genre')

# if __name__ == '__main__':
#     json_file_path = os.path.join(settings.BASE_DIR.parent, 'backend', 'genres', 'unique_genres.json')
#     import_genres(json_file_path)
#     print("✅ Đã lọc và tải truyện lên database.")


import json
import os
from django.conf import settings
from django.http import HttpResponse
from genres.models import Genre

def import_genres_view(request):
    # Đường dẫn file JSON dựa trên BASE_DIR
    json_file_path = os.path.join(settings.BASE_DIR, 'genres', 'unique_genres.json')

    if not os.path.exists(json_file_path):
        return HttpResponse(f"File not found: {json_file_path}", status=404)

    Genre.objects.all().delete()

    with open(json_file_path, encoding='utf-8') as f:
        data = json.load(f)
        for item in data:
            Genre.objects.get_or_create(name=item['name'])

    return HttpResponse("✅ Genres imported successfully!")
