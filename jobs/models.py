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
    Other = "Other"
    NoOn = "No On"
    NoScreen = "No Screen"
    BlurryScreen = "Blurry Screen"
    NotNormalStartup = "Not Normal Startup"
    NoInternet = "No Internet"
    SlowComputer = "Slow Computer"
    NotmyHomepage = "Not My HomePage"
    Virus = "Virus"
    NoEmail = "No Email"
    HackedEmail = "Hacked Email"
    HelpBuy = "Help Buy"
    SetUpComputer = "Set Up Computer"
    Transfer = "Transfer"
    Wipe = "Wipe"
    Not = 'Not turning on'
    Unknown = "Unknown"
    # "NoOn"Doesn’t turn on at all
    # "NoScreen"Turns on but nothing on the screen
    # "BlurryScreen"Screen on but faint/blurry/lines/etc
    # "NotNormalStartup" Screen on but not the normal startup screen
    # "NoInternet" Computer on but won’t connect to the internet/browser won’t go anywhere
    # "SlowComputer" Very slow during startup or once up
    # "NotMyHomePage" Goes to strange websites/home page is different
    # "Virus"Virus (malware) is causing problems
    # "NoEmail" No email or passwords are wrong
    # "HackedEmail" Email has been hacked
    # "HelpBuy" Buy new computer and setup
    # "SetUpComputer" Setup new computer already purchased
    # "Transfer"Transfer data from old computer to new or setup new backup plan
    # "Wipe" Wipe old computer/remove hard drive
    ISSUE = [
        (Other,'Other'),
        (Not, 'Not Turning on'),
        (Unknown, "I dont know"),
        (NoOn, "Doesn’t turn on at all"),
        (NoScreen, "Turns on but nothing on the screen"),
        (BlurryScreen, "Screen on but faint/blurry/lines/etc"),
        (NotNormalStartup, "Screen on but not normal startup"),
        (NoInternet, "Computer on but won’t connect to the internet"),
        (SlowComputer, "Slow Computer"),
        (NotmyHomepage, "Goes to strange websites"),
        (Virus, "Virus (malware) is causing problems"),
        (NoEmail, "No email or passwords are wrong"),
        (HackedEmail, "Email has been hacked"),
        (HelpBuy, " Buy new computer and setup"),
        (SetUpComputer, "Setup new computer already purchased"),
        (Transfer, "Transfer data or setup new w/ backup plan"),
        (Wipe, "Wipe old computer/remove hard drive"),
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
    issue_speical =  models.CharField(max_length=255, null=True, blank=True)

    os =  models.CharField(
        max_length=50,
        choices=OS,
        default= Unknown
    )
    model_number = models.CharField(max_length=255, null=True, blank=True)
    created_date = models.DateField(auto_now=False, auto_now_add=True, null=True)
    def __str__(self):
        return f"{self.client}, {self.hardware}: {self.issue[:50]}"

class Note(models.Model):
    text = models.CharField(max_length=255)
    image = models.ImageField(upload_to='notes/', null=True, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_date = models.DateField(auto_now=False, auto_now_add=True)
    job =  models.ForeignKey(Job, related_name="notes", on_delete=models.CASCADE)
    def __str__(self):
        return self.text[:50]
