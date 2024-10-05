from django.urls import path
from . import views

urlpatterns = [
    path('', views.default_einkaufsliste_view, name='default_einkaufsliste'),  # Neue Liste erstellen
    path('<str:short_link>/', views.einkaufsliste_view, name='einkaufsliste'),  # Bestehende Liste anzeigen
    path('delete/<int:item_id>/', views.delete_item, name='delete_item'),  # Artikel löschen
    path('toggle_item/<int:item_id>/', views.toggle_item_checked, name='toggle_item_checked'),
]
