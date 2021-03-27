# Generated by Django 3.1.7 on 2021-03-27 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('googlecal', '0004_event_datetime_start'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='attendees',
        ),
        migrations.RemoveField(
            model_name='event',
            name='end',
        ),
        migrations.AddField(
            model_name='event',
            name='attendee_comment',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='attendee_email',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='attendee_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='dateTime_end',
            field=models.DateTimeField(null=True),
        ),
    ]