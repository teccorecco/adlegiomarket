import uuid
import hashlib
from django.shortcuts import render, redirect, get_object_or_404
from django.utils.crypto import get_random_string
from django.utils import timezone
from datetime import timedelta
from .models import ShoppingItem, ShoppingList
from django.http import JsonResponse
import re

# Generate a short link using a hash
def generate_short_link():
    random_uuid = str(uuid.uuid4())
    return hashlib.md5(random_uuid.encode()).hexdigest()[:6]  # Kürzerer Hash (6 Zeichen)

def einkaufsliste_view(request, short_link):
    shopping_list = ShoppingList.objects.get(short_link=short_link)
    items = ShoppingItem.objects.filter(shopping_list=shopping_list)

    if request.method == 'POST':
        item_name = request.POST.get('item_name')
        quantity = request.POST.get('quantity')

        # Ensure quantity is a valid positive integer
        try:
            quantity = int(quantity)
            if quantity < 1:
                return render(request, 'einkaufsliste.html', {
                    'short_link': short_link,
                    'items': items,
                    'shopping_list_name': shopping_list.name,
                    'error_message': 'Die Menge muss mindestens 1 sein.',
                })
        except ValueError:
            return render(request, 'einkaufsliste.html', {
                'short_link': short_link,
                'items': items,
                'shopping_list_name': shopping_list.name,
                'error_message': 'Die Menge muss eine Zahl sein.',
            })

        category = categorize_item(item_name)

        # Update the shopping list name if provided
        list_name = request.POST.get('list_name')
        if list_name:
            shopping_list.name = list_name
            shopping_list.save()

        ShoppingItem.objects.create(
            name=item_name,
            quantity=quantity,
            category=category,
            shopping_list=shopping_list
        )

        return redirect('einkaufsliste', short_link=short_link)

    return render(request, 'einkaufsliste.html', {
        'short_link': short_link,
        'items': items,
        'shopping_list_name': shopping_list.name,  # Pass the shopping list name to the template
    })
    
# Create a new empty shopping list and redirect
def default_einkaufsliste_view(request):
    new_list = ShoppingList.objects.create(short_link=get_random_string(8))
    return redirect('einkaufsliste', short_link=new_list.short_link)

import re

def categorize_item(item_name):
    category_keywords = {
        'Obst': ['apfel', 'äpfel', 'banane', 'bananen', 'birne', 'birnen', 'orange', 'orangen',
                 'kiwi', 'kiwis', 'traube', 'trauben', 'ananas', 'melone', 'zitrone', 'mandarine',
                 'mandarinen', 'pfirsich', 'pfirsiche', 'pflaume', 'pflaumen', 'früchte'],
        'Gemüse': ['tomate', 'tomaten', 'kartoffel', 'kartoffeln', 'gurke', 'gurken', 'paprika',
                   'paprikas', 'zwiebel', 'zwiebeln', 'karotte', 'karotten', 'spinat', 'spinatblätter',
                   'brokkoli', 'brokkolis', 'salat', 'kohl', 'kohlarten', 'radieschen', 'sellerie',
                   'blumenkohl'],
        'Getränke': ['wasser', 'cola', 'bier', 'biere', 'wein', 'saft', 'milch', 'tee', 'kaffee'],
        'Backwaren': ['brot', 'brötchen', 'kuchen', 'croissant', 'croissants', 'baguette', 'toast',
                      'muffin', 'muffins', 'scone', 'scones', 'gebäck', 'brezel', 'brezeln', 'zopf'],
        'Haushaltswaren': ['klopapier', 'seife', 'reinigungsmittel', 'spülmittel', 'waschmittel',
                           'zahnpasta', 'bürste', 'bürsten', 'papierhandtücher', 'müllbeutel', 'schwamm',
                           'allzweckreiniger'],
        'Fleisch & Fisch': ['huhn', 'hühnerfleisch', 'rindfleisch', 'schweinefleisch', 'fisch',
                            'thunfisch', 'lachs', 'salami', 'würstchen', 'hackfleisch', 'steak',
                            'frikadelle'],
        'Snacks': ['chips', 'schokolade', 'gummibärchen', 'kekse', 'popcorn', 'nüsse', 'cracker',
                   'salzstangen', 'riegel', 'getrocknete früchte'],
        'Milchprodukte': ['butter', 'käse', 'joghurt', 'milch', 'quark', 'sahne', 'creme fraiche',
                          'frischkäse', 'ricotta', 'parmesan'],
        'Tiefkühlkost': ['pizza', 'fischstäbchen', 'gemüse', 'pommes', 'eis', 'tiefkühlgemüse',
                         'tiefkühlobst', 'frozen meal', 'frozen meals', 'frozen dessert', 'frozen desserts'],
        'Sonstiges': ['nudel', 'nudeln', 'reis', 'öl', 'gewürz', 'gewürze', 'soße', 'saucen',
                     'süßigkeit', 'süßigkeiten', 'konserve', 'haltbare lebensmittel', 'backzutat', 'getränk'],
    }
    
    # Preprocessing: Entferne führende/trailing Leerzeichen und konvertiere in Kleinbuchstaben
    item_name = item_name.strip().lower()

    # Iteriere durch jede Kategorie und ihre Schlüsselwörter
    for category, keywords in category_keywords.items():
        for keyword in keywords:
            # Prüfe, ob das Keyword als Teilstring im Item enthalten ist
            if keyword in item_name:
                return category
    
    # Standardkategorie, falls keine Übereinstimmung gefunden wurde
    return 'Sonstiges'

def delete_item(request, item_id):
    item = get_object_or_404(ShoppingItem, id=item_id)
    short_link = item.shopping_list.short_link
    item.delete()
    return redirect('einkaufsliste', short_link=short_link)

# Redirect to shopping list view
def redirect_to_shopping_list(request, short_link):
    return einkaufsliste_view(request, short_link)

# Function to delete expired shopping lists (older than 30 hours)
def delete_expired_lists():
    expiry_time = timezone.now() - timedelta(hours=30)
    ShoppingList.objects.filter(created_at__lt=expiry_time).delete()


def toggle_item_checked(request, item_id):
    if request.method == 'POST':
        item = ShoppingItem.objects.get(id=item_id)
        checked = request.POST.get('checked') == 'true'
        item.checked = checked
        item.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False}, status=400)
