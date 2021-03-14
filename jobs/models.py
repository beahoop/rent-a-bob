from django.db import models
from django.conf import settings
# Create your models here.
class Job(models.Model):
    text = models.CharField(max_length=255)
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.text[:50]
