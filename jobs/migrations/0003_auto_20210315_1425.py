# Generated by Django 3.1.7 on 2021-03-15 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_job_client'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='text',
        ),
        migrations.AddField(
            model_name='job',
            name='computer_issue',
            field=models.CharField(choices=[('Not Turning on', 'Not Turning on'), ("I don't know", "I don't know")], default="I don't know", max_length=50),
        ),
        migrations.AddField(
            model_name='job',
            name='os',
            field=models.CharField(choices=[('PC', 'PC'), ('Mac', 'Mac'), ("I don't know", "I don't know")], default="I don't know", max_length=50),
        ),
    ]
