import uuid
import hashlib
from django.shortcuts import render, redirect, get_object_or_404
from django.utils.crypto import get_random_string
from django.utils import timezone
from datetime import timedelta
from .models import ShoppingItem, ShoppingList
from django.http import JsonResponse
from .utils import categorize_item

# Generate a short link using a hash
def generate_short_link():
    random_uuid = str(uuid.uuid4())
    return hashlib.md5(random_uuid.encode()).hexdigest()[:6]  

def einkaufsliste_view(request, short_link):
    # Hol die Einkaufsliste anhand des short_link
    shopping_list = get_object_or_404(ShoppingList, short_link=short_link)
    # Hol alle zugehörigen Artikel aus der Datenbank
    items = ShoppingItem.objects.filter(shopping_list=shopping_list)

    # Wenn der Request ein POST ist, wurde ein Formular abgesendet
    if request.method == 'POST':
        # Hole die eingegebenen Daten aus dem Formular
        item_name = request.POST.get('item_name')
        quantity = request.POST.get('quantity', 1)  # Standardwert ist 1

        # Validierung der Menge
        try:
            quantity = int(quantity)
            if quantity < 1:
                raise ValueError("Quantity must be at least 1")
        except ValueError:
            return render(request, 'einkaufsliste.html', {
                'short_link': short_link,
                'items': items,
                'error_message': 'Die Menge muss eine Zahl größer oder gleich 1 sein.',
            })

        # Kategorisiere den Artikel
        category = categorize_item(item_name)

        # Überprüfe, ob der Artikel bereits in der Liste existiert
        existing_item = ShoppingItem.objects.filter(shopping_list=shopping_list, name=item_name).first()
        if existing_item:
            # Wenn der Artikel existiert, erhöhe die Menge
            existing_item.quantity += quantity
            existing_item.save()
        else:
            # Wenn der Artikel neu ist, erstelle ihn
            ShoppingItem.objects.create(
                name=item_name,
                quantity=quantity,
                category=category,
                shopping_list=shopping_list
            )

        # Nach dem Hinzufügen oder Aktualisieren, leite zurück zur Liste (Optional mit Anker)
        return redirect(f'/l/{short_link}')

    # Wenn es kein POST Request ist, rendere einfach die Seite mit den bestehenden Artikeln
    return render(request, 'einkaufsliste.html', {
        'short_link': short_link,
        'items': items,
    })
    
# Create a new empty shopping list and redirect
def default_einkaufsliste_view(request):
    new_list = ShoppingList.objects.create(short_link=get_random_string(6))
    return redirect('einkaufsliste', short_link=new_list.short_link)

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
    """Update item checked status."""
    if request.method == 'POST':
        item = get_object_or_404(ShoppingItem, id=item_id)
        checked = request.POST.get('checked') == 'true'
        item.checked = checked
        item.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False}, status=400)

import logging

logger = logging.getLogger(__name__)

def delete_selected_items(request):
    if request.method == 'POST':
        item_ids = request.POST.get('item_ids')
        short_link = request.POST.get('short_link')

        # Debugging-Ausgabe zur Kontrolle der empfangenen Daten
        print(f"Received item_ids: {item_ids}")
        print(f"Received short_link: {short_link}")  # Prüfe, ob short_link korrekt übermittelt wird

        if not item_ids:
            return JsonResponse({'error': 'Keine Artikel ausgewählt.'}, status=400)

        # Versuche, die ShoppingList basierend auf dem short_link zu finden
        try:
            shopping_list = ShoppingList.objects.get(short_link=short_link)
        except ShoppingList.DoesNotExist:
            return JsonResponse(
                {'error': f'ShoppingList mit dem short_link "{short_link}" nicht gefunden.'}, 
                status=404
            )

        # Lösche die ausgewählten Items, die zu dieser ShoppingList gehören
        item_ids = item_ids.split(',')
        try:
            ShoppingItem.objects.filter(id__in=item_ids, shopping_list=shopping_list).delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Ungültige Anfragemethode.'}, status=400)

def delete_all_items(request):
    if request.method == 'POST':
        short_link = request.POST.get('short_link')
        if not short_link:
            return JsonResponse({'error': 'short_link missing'}, status=400)

        try:
            shopping_list = ShoppingList.objects.get(short_link=short_link)
            ShoppingItem.objects.filter(shopping_list=shopping_list).delete()
            return JsonResponse({'success': True})
        except ShoppingList.DoesNotExist:
            return JsonResponse({'error': 'ShoppingList not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)