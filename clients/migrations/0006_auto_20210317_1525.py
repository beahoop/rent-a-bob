# Generated by Django 3.1.7 on 2021-03-17 15:25

from django.db import migrations
import phone_field.models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0005_auto_20210316_1856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='phone_number',
            field=phone_field.models.PhoneField(help_text='Contact phone number', max_length=31),
        ),
    ]
