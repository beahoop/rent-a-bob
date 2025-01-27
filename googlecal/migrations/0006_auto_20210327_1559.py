# Generated by Django 3.1.7 on 2021-03-27 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('googlecal', '0005_auto_20210327_1524'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='timeZone',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='location',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='summary',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
