from django.db import models
from django.conf import settings
from clients.models import Client
# Create your models here.


class Job(models.Model):
    client =  models.ForeignKey(Client, on_delete=models.CASCADE)
    #hardware
    Computer = 'Computer'
    Printer = 'Printer'
    Other = 'Other'
    HARDWARE = [
        (Computer, 'Computer'),
        (Printer, 'Printer'),
        (Other, 'Other'),
    ]
    #issues
    Not_turning_on = 'Not Turning on'
    I_dont_know = 'I don\'t know'
    ISSUE = [
        (Not_turning_on, 'Not Turning on'),
        (I_dont_know, 'I don\'t know'),
    ]

    #os
    Mac = 'Mac'
    PC = 'PC'
    I_dont_know = 'I don\'t know'
    OS = [
        (PC, 'PC'),
        (Mac, 'Mac'),
        (I_dont_know, 'I don\'t know'),
    ]
    #locations
    IOP = 'IOP'
    Remote = 'Remote'
    LOCATION = [
        (IOP, 'IOP'),
        (Remote, 'Remote'),

    ]
    # text = models.CharField(max_length=255)

    hardware =  models.CharField(
        max_length=50,
        choices=HARDWARE,
        default= I_dont_know,
    )
    issue =  models.CharField(
        max_length=50,
        choices= ISSUE,
        default= I_dont_know,
    )
    os =  models.CharField(
        max_length=50,
        choices=OS,
        default= I_dont_know,
    )
    client_location =  models.CharField(
        max_length=50,
        choices=LOCATION,
        default= Remote,
    )
    # notes =

    def __str__(self):
        return self.issue[:50]

class Note(models.Model):
    text = models.CharField(max_length=255)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_date = models.DateField(auto_now=False, auto_now_add=True)
    job =  models.ForeignKey(Job, on_delete=models.CASCADE)
    def __str__(self):
        return self.text[:50]
