from django.urls import path
from . import views

urlpatterns = [
    path('l/', views.einkaufsliste_view, name='einkaufsliste'),
    path('l/delete/<int:item_id>/', views.delete_item, name='delete_item'),
    path('l/<str:short_link>/', views.redirect_to_shopping_list, name='redirect_to_shopping_list'),
]
