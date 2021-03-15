# Generated by Django 3.1.7 on 2021-03-15 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_auto_20210315_1425'),
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.RenameField(
            model_name='job',
            old_name='computer_issue',
            new_name='issue',
        ),
        migrations.RemoveField(
            model_name='job',
            name='client',
        ),
        migrations.AddField(
            model_name='job',
            name='client_location',
            field=models.CharField(choices=[('PC', 'PC'), ('Mac', 'Mac'), ("I don't know", "I don't know")], default=[('PC', 'PC'), ('IOP', 'IOP'), ('Remote', 'Remote')], max_length=150),
        ),
        migrations.AddField(
            model_name='job',
            name='hardware',
            field=models.CharField(choices=[('Computer', 'Computer'), ('Printer', 'Printer'), ('Other', 'Other')], default="I don't know", max_length=150),
        ),
    ]
