from django.shortcuts import render
from rest_framework import generics
from .serializers import JobSerialier,NoteSerialier
from . import models


class JobsListView(generics.ListCreateAPIView):
    queryset = models.Job.objects.all()
    serializer_class = JobSerialier

class NotesListView(generics.ListCreateAPIView):
    queryset = models.Note.objects.all()
    serializer_class = NoteSerialier
