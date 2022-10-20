from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session

from core.models import *

def index(request):
    user = None
    session_key = request.COOKIES.get("sessionid")
    session = Session.objects.filter(session_key=session_key)
    if session.exists():
        session = session.get()
        uid = session.get_decoded().get('_auth_user_id')
        user = User.objects.get(pk=uid)
    posts = Post.objects.all()
    return render(request, "index.html", {"user": user, "posts": posts})

def add_post(request):
    post_files = request.FILES
    post_data = request.POST
    image = post_files.get("image")
    title = post_data.get("title")
    description = post_data.get("description")
    post = Post.objects.filter(title=title, description=description)
    if not post.exists():
        post = Post.objects.create(title=title, description=description, image=image)
        return JsonResponse({"response": True})
    else:
        return JsonResponse({"response": False})

def delete_post(request):
    post_data = request.POST
    post_id = post_data.get("post_id")
    post = Post.objects.filter(id=post_id).delete()
    return JsonResponse({"response": True})

def moreDescription(request):
    post_data = request.POST
    post_id = post_data.get("post_id")
    post = Post.objects.get(id=post_id)
    return JsonResponse({"response": True, "title": post.title, "description": post.description})

def edit_item(request):
    return render(request, "edit_item.html")
