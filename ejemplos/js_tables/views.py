from django.shortcuts import render
from .models import Movie

def table_view_framework(request):
    if request.method == "GET":
        return render(request, "js_tables/tables_template_framework.html", {'movies': Movie.objects.all()})

def table_view_pure_javascript(request):
    if request.method == "GET":
        return render(request, "js_tables/tables_template_pure_javascript.html", {'movies': Movie.objects.all()})

