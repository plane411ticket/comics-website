from users.models import Notification, Favorite

def sendNotify(chapter):
    print("sendNotify called for chapter:", chapter)
    if hasattr(chapter, 'novel'):
        item = chapter.novel
        title = item.title
        chapter_number = chapter.chapter_number
        _type = 'novel'
        link = f"novel/{item._id}"
    
    elif hasattr(chapter, 'manga'):
        item = chapter.manga
        title = item.title
        chapter_number = chapter.chapter_number
        _type = 'manga'
        link = f"manga/{item._id}"

    else:
        return
    
    favs = Favorite.objects.filter(post_id = item._id, type=_type)

    for fav in favs:
        Notification.objects.create(
            user=fav.user,
            message=f"Truyện {title} vừa cập nhật chương {chapter_number}",
            link=link
        )