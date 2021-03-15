# Generated by Django 3.1.7 on 2021-03-15 16:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0003_auto_20210315_1639'),
        ('jobs', '0006_auto_20210315_1603'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='client',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='clients.client'),
            preserve_default=False,
        ),
    ]
