import uuid
import hashlib
from django.shortcuts import render, redirect, get_object_or_404
from .models import ShoppingItem, ShoppingList  # Importiere das neue ShoppingList Model

def einkaufsliste_view(request, short_link=None):
    if short_link:
        shopping_list = get_object_or_404(ShoppingList, short_link=short_link)
    else:
        random_uuid = str(uuid.uuid4())
        short_link = hashlib.md5(random_uuid.encode()).hexdigest()[:8]
        shopping_list = ShoppingList.objects.create(short_link=short_link)

    if request.method == "POST":
        item_name = request.POST.get('item_name')
        category = categorize_item(item_name)
        
        # Erstelle einen neuen Artikel und füge ihn zur Einkaufsliste hinzu
        item = ShoppingItem.objects.create(name=item_name, category=category)
        shopping_list.items.add(item)  # Artikel zur Einkaufsliste hinzufügen

    items = shopping_list.items.all()  # Alle Artikel der Einkaufsliste abrufen

    return render(request, 'einkaufsliste.html', {'items': items, 'short_link': short_link})

def redirect_to_shopping_list(request, short_link):
    return einkaufsliste_view(request, short_link)

def delete_item(request, item_id):
    item = ShoppingItem.objects.get(id=item_id)
    item.delete()
    return redirect('einkaufsliste')

def categorize_item(item_name):
    if item_name.lower() in ['äpfel', 'bananen', 'birnen']:
        return 'Obst'
    elif item_name.lower() in ['klopapier', 'seife']:
        return 'Haushaltswaren'
    return 'Sonstiges'


