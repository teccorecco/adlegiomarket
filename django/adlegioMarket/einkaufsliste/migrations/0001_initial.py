# Generated by Django 5.0.6 on 2024-10-04 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ShoppingItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('category', models.CharField(blank=True, max_length=255)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
