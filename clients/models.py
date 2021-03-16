from django.db import models
from phone_field import PhoneField

# Create your models here.

class Client(models.Model):
    #locations
    IOP = 'IOP'
    Remote = 'Remote'
    Vacationer = 'Vacationer'
    LOCATION = [
        (IOP, 'IOP'),
        (Remote, 'Remote'),
        (Vacationer, 'Vacationer'),

    ]
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    phone_number = PhoneField(blank=True, help_text='Contact phone number')
    location =  models.CharField(
        max_length=50,
        choices=LOCATION,
        default= Remote,
    )

    def __str__(self):
        return self.last_name[:30]
