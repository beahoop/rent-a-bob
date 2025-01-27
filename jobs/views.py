from django.shortcuts import render
from rest_framework import generics, permissions
from .permissions import IsClientOrReadOnly
from .serializers import JobSerializer, NoteSerializer
from . import models


class JobsListView(generics.ListCreateAPIView):
    queryset = models.Job.objects.all().order_by('created_date')
    serializer_class = JobSerializer
    permission_classes = [IsClientOrReadOnly]

class JobsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Job.objects.all().order_by('created_date')
    serializer_class = JobSerializer


class NotesListView(generics.ListCreateAPIView):
    queryset = models.Note.objects.all()
    serializer_class = NoteSerializer


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class NotesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
