from django.urls import path

from . import views

urlpatterns = [
    path('tables/framework', views.table_view_framework , name='js_tables_framework'),
    path('tables/pure_javascript', views.table_view_pure_javascript, name='js_tables_javascript'),
]