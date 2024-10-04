
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('features/', views.features, name='features'),
    path('aboutus/', views.aboutus, name='aboutus'),
    path('contacts/', views.contacts, name='contacts'),
    path('agb_datenschutz/', views.agb_datenschutz, name='agb_datenschutz'),
    path('impressum/', views.impressum, name='impressum'),
]
