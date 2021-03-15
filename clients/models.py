from django.db import models
from phone_field import PhoneField

# Create your models here.

class Client(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    phone_number = PhoneField(blank=True, help_text='Contact phone number')

    def __str__(self):
        return self.last_name[:30]
