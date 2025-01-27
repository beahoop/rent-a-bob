# Generated by Django 3.1.7 on 2021-03-29 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0022_job_created_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='issue',
            field=models.CharField(choices=[('Other', 'Other'), ('Not turning on', 'Not Turning on'), ('Unknown', 'I dont know'), ('No On', 'Doesn’t turn on at all'), ('No Screen', 'Turns on but nothing on the screen'), ('Blurry Screen', 'Screen on but faint/blurry/lines/etc'), ('Not Normal Startup', 'Screen on but not normal startup'), ('No Internet', 'Computer on but won’t connect to the internet'), ('Slow Computer', 'Slow Computer'), ('Not My HomePage', 'Goes to strange websites'), ('Virus', 'Virus (malware) is causing problems'), ('No Email', 'No email or passwords are wrong'), ('Hacked Email', 'Email has been hacked'), ('Help Buy', ' Buy new computer and setup'), ('Set Up Computer', 'Setup new computer already purchased'), ('Transfer', 'Transfer data or setup new w/ backup plan'), ('Wipe', 'Wipe old computer/remove hard drive')], default='Unknown', max_length=50),
        ),
    ]
