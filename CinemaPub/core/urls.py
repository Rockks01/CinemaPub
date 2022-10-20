from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from core.views import *

urlpatterns = [
    # ===WEB urls==
    # Main urls.
    path("", index, name="index"),
    path("add_post", add_post, name="add_post"),
    path("delete_post", delete_post),
    path("more_description", moreDescription, name="more_description"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)