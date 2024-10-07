from django.db import models
from django.utils import timezone
from datetime import timedelta

class ShoppingList(models.Model):
    short_link = models.CharField(max_length=8, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name or f"Shopping List ({self.short_link})"

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(hours=30)

class ShoppingItem(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    category = models.CharField(max_length=255, blank=True)  # Ensure this field is present
    added_on = models.DateTimeField(auto_now_add=True)
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE)
    checked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.quantity})"

