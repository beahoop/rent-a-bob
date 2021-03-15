# Generated by Django 3.1.7 on 2021-03-15 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0005_auto_20210315_1548'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='client_location',
            field=models.CharField(choices=[('IOP', 'IOP'), ('Remote', 'Remote')], default='Remote', max_length=50),
        ),
        migrations.AlterField(
            model_name='job',
            name='hardware',
            field=models.CharField(choices=[('Computer', 'Computer'), ('Printer', 'Printer'), ('Other', 'Other')], default="I don't know", max_length=50),
        ),
        migrations.AlterField(
            model_name='job',
            name='issue',
            field=models.CharField(choices=[('Not Turning on', 'Not Turning on'), ("I don't know", "I don't know")], default="I don't know", max_length=50),
        ),
        migrations.AlterField(
            model_name='job',
            name='os',
            field=models.CharField(choices=[('PC', 'PC'), ('Mac', 'Mac'), ("I don't know", "I don't know")], default="I don't know", max_length=50),
        ),
    ]