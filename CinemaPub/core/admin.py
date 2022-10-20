from django.contrib import admin
from django.utils.safestring import mark_safe

from core.models import *

@admin.register(Post)
class Post(admin.ModelAdmin):
    fields = ["title", "description", "image", "created"]
    list_display = ["title", "description", "get_image"]

    def get_image(self, obj):
        if obj.image:
            return mark_safe(f"<img src='{obj.image.url}' wdith=70 height=70>")
        else:
            return obj.image

    get_image.short_description = "Изображение"
