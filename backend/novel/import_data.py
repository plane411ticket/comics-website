import json
import os
import django
import sys
import requests
from django.core.files.base import ContentFile

# Cấu hình Django
project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_path)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

# Import models sau khi setup Django
from novel.models import Novel
from chapter.models import NovelChapter
from genres.models import Genre
def download_image_to_file(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        file_name = os.path.basename(url)
        return ContentFile(response.content), file_name
    except Exception as e:
        print(f"❌ Failed to download image from {url}: {e}")
        return None, None

def import_novel(json_file_path):
    with open(json_file_path, encoding='utf-8') as f:
        item = json.load(f)
    cover_file, cover_url = download_image_to_file(item.get('covers', ''))
    novel, _ = Novel.objects.get_or_create(
        title=item['title'],
        author=item['author'],
        description=item['description'],
        status=item['status'],
    )
    if cover_file and cover_url:
        cover_name = cover_url.split("/")[-1] + ".jpg"
        novel.cover_image.save(cover_name, cover_file, save=True)
    genre_names = item.get('genres', [])
    genre_instances = []
    for name in genre_names:
        genre, _ = Genre.objects.get_or_create(name=name)
        genre_instances.append(genre)

    novel.genres.set(genre_instances)
    chapters = item.get('chapters', [])
    for idx, chapter in enumerate(chapters):
        NovelChapter.objects.get_or_create(
            novel=novel,
            chapter_number=idx+1,
            title=chapter['title_chapter'],
            content=chapter['content'],
        )
    print("✅ Novel imported successfully!")

if __name__ == '__main__':
    print(f"Using Django settings module: {os.environ.get('DJANGO_SETTINGS_MODULE')}")
    for i in range(20):
        json_file_path = os.path.join(project_path, 'novel', 'truyen-save', f'page1_truyen{i+1}.json')
        import_novel(json_file_path)
