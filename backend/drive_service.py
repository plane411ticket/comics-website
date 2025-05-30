# import os
# import cloudinary.uploader
# import django

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")  # Đường dẫn settings của bạn
# django.setup()

# from django.conf import settings
# import cloudinary

# cloudinary.config(
#     cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
#     api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
#     api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
# )

# BASE_PATH = "/mnt/g/My Drive/truyen_tranh/images"

# def is_image_file(filename):
#     # Kiểm tra đuôi file có thuộc các định dạng ảnh phổ biến không
#     IMAGE_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')
#     return filename.lower().endswith(IMAGE_EXTENSIONS)

# def upload_image(image_path, folder_cloudinary):
#     result = cloudinary.uploader.upload(
#         image_path,
#         folder=folder_cloudinary,
#         use_filename=True,
#         unique_filename=False,
#         overwrite=True
#     )
#     return result['secure_url']

# def upload_manga(manga_folder):
#     manga_path = os.path.join(BASE_PATH, manga_folder)
#     print(f"\n📘 Đang xử lý truyện: {manga_folder}")

#     # Upload cover
#     cover_path = os.path.join(manga_path, "cover.jpg")
#     if os.path.exists(cover_path) and is_image_file(cover_path):
#         cover_url = upload_image(cover_path, f"manga/{manga_folder}/cover")
#         print(f"✅ Cover URL: {cover_url}")
#     else:
#         print("⚠️ Không tìm thấy cover hoặc cover không phải file ảnh hợp lệ.")

#     # Upload chapter images
#     for item in sorted(os.listdir(manga_path)):
#         chapter_dir = os.path.join(manga_path, item)
#         if os.path.isdir(chapter_dir) and item.lower().startswith("chapter"):
#             print(f"\n📂 Đang xử lý {item}")
#             for img_name in sorted(os.listdir(chapter_dir)):
#                 img_path = os.path.join(chapter_dir, img_name)
#                 if os.path.isfile(img_path) and is_image_file(img_path):
#                     try:
#                         img_url = upload_image(img_path, f"manga/{manga_folder}/{item}")
#                         print(f"🖼️  {img_name} → {img_url}")
#                     except Exception as e:
#                         print(f"❌ Lỗi upload ảnh {img_name}: {e} - Bỏ qua ảnh này và tiếp tục.")
#                 else:
#                     print(f"⚠️ Bỏ qua file không phải ảnh: {img_name}")
#     generate_json_for_manga(manga_folder, uploaded_data)

# # # def main():
# # #     for manga_folder in sorted(os.listdir(BASE_PATH)):
# # #         folder_path = os.path.join(BASE_PATH, manga_folder)
# # #         if os.path.isdir(folder_path):
# # #             upload_manga(manga_folder)

# # # if __name__ == "__main__":
# # #     main()
import os
import cloudinary.uploader
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from django.conf import settings
import cloudinary

cloudinary.config(
    cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
    api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
    api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
)

BASE_PATH = "/mnt/g/My Drive/truyen_tranh/images"
JSON_OUTPUT_PATH = "./truyen_tranh/Json"  # nơi lưu JSON
os.makedirs(JSON_OUTPUT_PATH, exist_ok=True)

def is_image_file(filename):
    IMAGE_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')
    return filename.lower().endswith(IMAGE_EXTENSIONS)

def upload_image(image_path, folder_cloudinary):
    result = cloudinary.uploader.upload(
        image_path,
        folder=folder_cloudinary,
        use_filename=True,
        unique_filename=False,
        overwrite=True
    )
    return result['secure_url']



def upload_manga(manga_folder):
    manga_path = os.path.join(BASE_PATH, manga_folder)
    print(f"\n📘 Đang xử lý truyện: {manga_folder}")

    uploaded_data = {
        "cover": "",
        "chapters": {}
    }

    # Upload cover
    cover_path = os.path.join(manga_path, "cover.jpg")
    if os.path.exists(cover_path) and is_image_file(cover_path):
        cover_url = upload_image(cover_path, f"manga/{manga_folder}/cover")
        print(f"✅ Cover URL: {cover_url}")
        uploaded_data["cover"] = cover_url
    else:
        print("⚠️ Không tìm thấy cover hoặc cover không phải file ảnh hợp lệ.")

    # Upload các chapter
    for item in sorted(os.listdir(manga_path)):
        chapter_dir = os.path.join(manga_path, item)
        if os.path.isdir(chapter_dir) and item.lower().startswith("chapter"):
            print(f"\n📂 Đang xử lý {item}")
            chapter_images = []
            for img_name in sorted(os.listdir(chapter_dir)):
                img_path = os.path.join(chapter_dir, img_name)
                if os.path.isfile(img_path) and is_image_file(img_path):
                    try:
                        img_url = upload_image(img_path, f"manga/{manga_folder}/{item}")
                        chapter_images.append(img_url)
                        print(f"🖼️  {img_name} → {img_url}")
                    except Exception as e:
                        print(f"❌ Lỗi upload ảnh {img_name}: {e}")
                else:
                    print(f"⚠️ Bỏ qua file không phải ảnh: {img_name}")
            if chapter_images:
                uploaded_data["chapters"][item] = chapter_images

    #
    
    
    Gọi tạo JSON sau khi upload xong
    generate_json_for_manga(manga_folder, uploaded_data)
    

def generate_json_for_manga(slug, uploaded_data):
    json_data = {
        "title": slug.replace("-", " ").title(),
        "slug": slug,
        "cover": uploaded_data["cover"],
        "chapters": []
    }

    for chapter_name in sorted(uploaded_data["chapters"]):
        try:
            chapter_number = int(chapter_name.lower().replace("chapter", "").strip())
        except ValueError:
            chapter_number = chapter_name
        chapter_data = {
            "number": chapter_number,
            "title": chapter_name,
            "images": uploaded_data["chapters"][chapter_name]
        }
        json_data["chapters"].append(chapter_data)

    json_path = os.path.join(JSON_OUTPUT_PATH, f"{slug}.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
    print(f"\n📝 Đã tạo file JSON: {json_path}")

def main():
    for manga_folder in sorted(os.listdir(BASE_PATH)):
        folder_path = os.path.join(BASE_PATH, manga_folder)
        if os.path.isdir(folder_path):
            upload_manga(manga_folder)

if __name__ == "__main__":
    main()
