# Generated by Django 3.1.7 on 2021-03-30 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0011_auto_20210330_0933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='location',
            field=models.CharField(choices=[('IOP', 'IOP'), ('Sullivan', 'Sullivan'), ('Kiawah', 'Kiawah'), ('Seabrook', 'Seabrook'), ('MtPleasant', 'MtPleasant'), ('NorthCharleston', 'NorthCharleston'), ('WestAshley', 'WestAshley'), ('JamesIsland', 'JamesIsland'), ('GooseCreek', 'GooseCreek'), ('Summerville', 'Summerville'), ('Charleston', 'Charleston'), ('Remote', 'Remote'), ('On Vacation here', 'On Vacation here')], default='Remote', max_length=50),
        ),
    ]
