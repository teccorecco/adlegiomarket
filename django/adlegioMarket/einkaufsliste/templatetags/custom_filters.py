from django import template
from collections import defaultdict

register = template.Library()

@register.filter
def group_by_category(items):
    grouped_items = {}
    for item in items:
        if item.category not in grouped_items:
            grouped_items[item.category] = []
        grouped_items[item.category].append(item)
    return grouped_items.items()

@register.filter
def get_category_icon(category):
    icons = {
        'Obst': 'bi bi-apple',
        'Haushaltswaren': 'bi bi-house',
        'Getränke': 'bi bi-cup',
        'Backwaren': 'bi bi-bread-slice',
        'Sonstiges': 'bi bi-basket'
    }
    return icons.get(category, 'bi bi-basket')
