# Generated by Django 5.0.6 on 2024-10-04 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('einkaufsliste', '0002_shoppinglist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoppinglist',
            name='items',
            field=models.ManyToManyField(related_name='shopping_lists', to='einkaufsliste.shoppingitem'),
        ),
    ]
