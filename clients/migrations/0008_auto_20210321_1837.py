# Generated by Django 3.1.7 on 2021-03-21 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0007_auto_20210317_1528'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='address_street',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='client',
            name='zipcode',
            field=models.FloatField(null=True),
        ),
    ]
