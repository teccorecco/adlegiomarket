# Generated by Django 5.0.6 on 2024-10-05 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('einkaufsliste', '0004_remove_shoppinglist_items_shoppinglist_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='shoppinglist',
            name='items',
            field=models.ManyToManyField(related_name='shopping_lists', to='einkaufsliste.shoppingitem'),
        ),
    ]
