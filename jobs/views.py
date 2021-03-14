from django.shortcuts import render
from rest_framework import generics
from .serializers import JobSerialier
from . import models


class JobsListView(generics.ListCreateAPIView):
    queryset = models.Job.objects.all()
    serializer_class = JobSerialier
