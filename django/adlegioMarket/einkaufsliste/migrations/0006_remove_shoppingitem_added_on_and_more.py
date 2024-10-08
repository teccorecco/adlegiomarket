# Generated by Django 5.0.6 on 2024-10-05 16:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('einkaufsliste', '0005_shoppinglist_items'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoppingitem',
            name='added_on',
        ),
        migrations.RemoveField(
            model_name='shoppinglist',
            name='items',
        ),
        migrations.AddField(
            model_name='shoppingitem',
            name='shopping_list',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='einkaufsliste.shoppinglist'),
            preserve_default=False,
        ),
    ]
