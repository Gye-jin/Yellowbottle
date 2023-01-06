from django.urls import path
from . import views

urlpatterns = [
    path("", views.index_page),
    path("predict/", views.predict_model),
]