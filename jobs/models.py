from django.db import models
from django.conf import settings
# Create your models here.
class Job(models.Model):
    Not Turning on = 'Not Turning on'
    I don't know = 'I don\'t know'
    COM_ISSUE = [
        (Not Turning on, 'Not Turning on'),
        (I don\'t know, 'I don\'t know'),

    ]
    Mac = 'Mac'
    PC = 'PC'
    I don't know = 'I don\'t know'
    OS = [
        (PC, 'PC'),
        (Mac, 'Mac'),
        (I don\'t know, 'I don\'t know'),

    ]
    # text = models.CharField(max_length=255)
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    computer_issue =  models.CharField(
        max_length=50,
        choices=COM_ISSUE,
        default= I don't know,
    )
    os =  models.CharField(
        max_length=50,
        choices=OS,
        default= I don't know,
    )
    
    def __str__(self):
        return self.text[:50]
