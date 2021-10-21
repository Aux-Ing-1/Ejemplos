from django.urls import path

from . import views

urlpatterns = [
    path('geolocation/', views.geolocation_view, name='js_geolocation'),
]