import json
import os
import django
import sys
from novel.models import Novel
import requests
from django.core.files.base import ContentFile

# Dynamically setting the Django project path
project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))  # Lấy đường dẫn gốc của dự án
sys.path.append(project_path)

# Set the default settings module for Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# Initialize Django
django.setup()


def get_image_from_url(url):
    """
    Tải ảnh từ URL và trả về một tuple (filename, ContentFile) 
    để dùng với ImageField.save()
    """
    response = requests.get(url)
    if response.status_code == 200:
        filename = url.split('/')[-1] or 'downloaded_image.jpg'
        return filename, ContentFile(response.content)
    else:
        raise Exception(f"Không thể tải ảnh từ URL: {url}")
# Function to import novel from a JSON file
def import_novel(json_file_path):
    with open(json_file_path, encoding='utf-8') as f:
        data = json.load(f)
        for item in data:
            Novel.objects.get_or_create(title=item['title'], 
                                        author=item['author'],
                                        description=item['description'],
                                        cover=item['cover'],
                                        genre=item['genre'],
                                        status=item['status'],
                                        chapters=item['chapters'])
    print("✅ novel imported successfully!")

# Main function
def create_novel(apps, schema_editor):
    # Ensure the environment is correctly set
    print(f"Using Django settings module: {os.environ.get('DJANGO_SETTINGS_MODULE')}")

    # Optionally delete existing data to avoid conflict
    Novel = apps.get_model('novel', 'Novel')
    
    # Define the path to your JSON file (could be passed as an argument or configured)
    json_file_path = os.path.join(project_path,"novel", 'novel-detail.json')
    # Import novel
    import_novel(json_file_path)
