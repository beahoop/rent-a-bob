# Generated by Django 3.1.7 on 2021-03-16 18:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0011_job_job_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='client_location',
        ),
    ]
