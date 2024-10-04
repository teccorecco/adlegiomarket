from django.db import models

class ShoppingItem(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)  # Menge des Artikels
    category = models.CharField(max_length=255, blank=True)  # Kategorie des Artikels
    added_on = models.DateTimeField(auto_now_add=True)  # Datum und Uhrzeit der Hinzufügung

    def __str__(self):
        return f"{self.name} ({self.quantity})"

class ShoppingList(models.Model):
    short_link = models.CharField(max_length=8, unique=True)  # Eindeutiger Link für die Einkaufsliste
    items = models.ManyToManyField(ShoppingItem, related_name='shopping_lists')  # Beziehung zu ShoppingItem

    def __str__(self):
        return self.short_link
