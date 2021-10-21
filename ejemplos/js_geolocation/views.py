from django.shortcuts import render, redirect

from .models import Location


def geolocation_view(request):
    if request.method == "GET":
        return render(request, "js_geolocation/geolocation_template.html", {"locations": Location.objects.all()})

    if request.method == "POST":
        new_location = Location(lat=request.POST["lat"], lon=request.POST["lon"])
        new_location.save()
        return redirect(".")