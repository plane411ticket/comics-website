from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid
import os

def create_superuser(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()

    # Lấy thông tin từ biến môi trường
    username = os.getenv('SUPERUSER_USERNAME')
    email = os.getenv('SUPERUSER_EMAIL')
    password = os.getenv('SUPERUSER_PASSWORD')
    if not all([username, email, password]):
        # Nếu thiếu biến thì không làm gì, chỉ log thông báo (hoặc raise nếu bạn muốn)
        print(f"Thiếu biến môi trường: username={username}, email={email}, password={'***' if password else None}")
        return
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('manga', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('manga', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='manga.manga')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RunPython(create_superuser),
    ]
