# Generated by Django 3.1.7 on 2021-03-17 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0014_auto_20210317_2351'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='model_number',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
