from django.urls import path

from . import views

urlpatterns = [
    path('requests/', views.requests_view, name='js_requests'),
]