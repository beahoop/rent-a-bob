from django.db import models
from django.db import models
from phone_field import PhoneField

# Create your models here.

class Event(models.Model):
    #locations
    summary = models.CharField(max_length=100)
    location = models.CharField(max_length=300)
    description = models.CharField(max_length=300, blank=True, null=True)
    # start = models.JSONField(encoder=None, decoder=None, null=True)
    dateTime_start = models.DateTimeField(null=True)
    dateTime_end = models.DateTimeField(null=True)
    # timeZone =
    #   #
      # 'start': {
        # 'dateTime': '2021-04-05T07:00:00',
      #   'timeZone': 'America/Los_Angeles',
      # },
    # end = models.JSONField(encoder=None, decoder=None, null=True)
      # 'end': {
      #   'dateTime': '2021-04-05T09:00:00',
      #   'timeZone': 'America/Los_Angeles',
      # },
    attendees = models.JSONField(encoder=None, decoder=None, null=True)
      # 'attendees': [
      #   {
      #         'displayName' : 'Bob',
      #       'comment': 'testing this event sender',
      #       'email': 'rentabob@live.com'
      #   },


    def __str__(self):
        return self.summary[:30]
