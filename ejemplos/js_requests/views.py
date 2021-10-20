from .models import TextData
from django.shortcuts import render

def requests_view(request):
    if request.method == "GET":
        return render(request, "js_requests/requests_template.html", {"my_data": TextData.objects.all()})

    if request.method == "POST":
        new_data = TextData(text=request.POST["text"])
        new_data.save()
        return render(request, "js_requests/requests_template.html", {"my_data": TextData.objects.all()})