# Generated by Django 3.1.7 on 2021-03-15 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0002_clients_phone_number'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Clients',
            new_name='Client',
        ),
    ]
