from django.db import models
from phone_field import PhoneField

# Create your models here.

class Client(models.Model):
    #locations
    IOP = 'IOP'
    Sullivan = 'Sullivan'
    Kiawah = 'Kiawah'
    Seabrook = 'Seabrook'
    MtPleasant = 'MtPleasant'
    NorthCharleston = 'NorthCharleston'
    WestAshely = 'WestAshely'
    JamesIsland = 'JamesIsland'
    GooseCreek = 'GooseCreek'
    Summerville = 'Summerville'
    Charleston = 'Charleston'
    Remote = 'Remote'
    Vacationer = 'Vacationer'
    LOCATION = [
        (IOP, 'IOP'),
        (Sullivan, 'Sullivan'),
        (Kiawah, 'Kiawah'),
        (Seabrook, 'Seabrook'),
        (MtPleasant, 'MtPleasant'),
        (NorthCharleston, 'NorthCharleston'),
        (WestAshely, 'WestAshely'),
        (JamesIsland, 'JamesIsland'),
        (GooseCreek, 'GooseCreek'),
        (Summerville, 'Summerville'),
        (Charleston, 'Charleston'),
        (Remote, 'Remote'),
        (Vacationer, 'Vacationer'),
    ]
    #Call times
    Morning = 'Morning'
    MidDay = 'MidDay'
    Evening = 'Evening'
    CALLTIMES = [
        (Morning, 'Morning'),
        (MidDay, 'MidDay'),
        (Evening, 'Evening'),
    ]

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    phone_number = PhoneField(blank=True, help_text='Contact phone number')
    call_time =  models.CharField(
        max_length=50,
        choices=CALLTIMES,
        default= Morning,
    )
    location =  models.CharField(
        max_length=50,
        choices=LOCATION,
        default= Remote,
    )
    address_street = models.CharField(max_length=255, null=True)
    zipcode = models.FloatField(null=True)

    def __str__(self):
        return self.last_name[:30]
