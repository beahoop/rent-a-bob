# Generated by Django 3.1.7 on 2021-03-16 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0003_auto_20210315_1639'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='client_location',
            field=models.CharField(choices=[('IOP', 'IOP'), ('Remote', 'Remote')], default='Remote', max_length=50),
        ),
    ]
