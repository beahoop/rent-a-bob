from django.db import models
from django.conf import settings
# Create your models here.
class Job(models.Model):
    Not_turning_on = 'Not Turning on'
    I_dont_know = 'I don\'t know'
    COM_ISSUE = [
        (Not_turning_on, 'Not Turning on'),
        (I_dont_know, 'I don\'t know'),

    ]
    Mac = 'Mac'
    PC = 'PC'
    I_dont_know = 'I don\'t know'
    OS = [
        (PC, 'PC'),
        (Mac, 'Mac'),
        (I_dont_know, 'I don\'t know'),

    ]
    IOP = 'IOP'
    Remote = 'Remote'
    LOCATION = [
        (PC, 'PC'),
        (IOP, 'IOP'),
        (Remote, 'Remote'),

    ]
    # text = models.CharField(max_length=255)
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    computer_issue =  models.CharField(
        max_length=50,
        choices=COM_ISSUE,
        default= I_dont_know,
    )
    os =  models.CharField(
        max_length=50,
        choices=OS,
        default= I_dont_know,
    )
    client_location =  models.CharField(
        max_length=50,
        choices=OS,
        default= LOCATION,
    )

    def __str__(self):
        return self.text[:50]
