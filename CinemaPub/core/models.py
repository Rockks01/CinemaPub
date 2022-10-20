from os.path import splitext
from uuid import uuid4

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.core.files.storage import FileSystemStorage


class UUIDFileStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        _, ext = splitext(name)
        return F"{settings.MEDIA_ROOT}/{uuid4().hex + ext}"


class Post(models.Model):
    title = models.CharField(max_length=128)
    description = models.TextField()
    image = models.ImageField(storage=UUIDFileStorage())
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-created"]
        verbose_name = "Пост"
        verbose_name_plural = "Посты"
