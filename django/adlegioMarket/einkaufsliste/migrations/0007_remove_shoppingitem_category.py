# Generated by Django 5.0.6 on 2024-10-05 16:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('einkaufsliste', '0006_remove_shoppingitem_added_on_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoppingitem',
            name='category',
        ),
    ]