from django.db import models
from django.conf import settings
from clients.models import Client
# Create your models here.


class Job(models.Model):
    client =  models.ForeignKey(Client, related_name="jobs", on_delete=models.CASCADE)
    #job_status
    New = 'New'
    Open = 'Open'
    Closed = 'Closed'
    STATUS = [
        (New, 'New'),
        (Open, 'Open'),
        (Closed, 'Closed'),
    ]
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
    Not = 'Not Turning on'
    Unknown = "Unknown"
    ISSUE = [
        (Not, 'Not Turning on'),
        (Unknown, "Unknown"),
    ]

    #os
    Mac = 'Mac'
    PC = 'PC'
    Unknown = 'Unknown'
    OS = [
        (PC, 'PC'),
        (Mac, 'Mac'),
        (Unknown, 'Unknown'),
    ]

    # text = models.CharField(max_length=255)
    job_status =  models.CharField(
        max_length=50,
        choices=STATUS,
        default= New,
    )

    hardware =  models.CharField(
        max_length=50,
        choices=HARDWARE,
        default= Other,
    )
    issue =  models.CharField(
        max_length=50,
        choices= ISSUE,
        default= Unknown,
    )
    os =  models.CharField(
        max_length=50,
        choices=OS,
        default= Unknown
    )
    model_number = models.CharField(max_length=255, null=True)
    def __str__(self):
        return f"{self.client}, {self.hardware}: {self.issue[:50]}"

class Note(models.Model):
    text = models.CharField(max_length=255)
    image = models.ImageField(upload_to='notes/', null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_date = models.DateField(auto_now=False, auto_now_add=True)
    job =  models.ForeignKey(Job, related_name="notes", on_delete=models.CASCADE)
    def __str__(self):
        return self.text[:50]
