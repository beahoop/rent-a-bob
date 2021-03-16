from django.shortcuts import render
from rest_framework import generics
from .serializers import ClientSerializer
from . import models


class ClientsListView(generics.ListCreateAPIView):
    queryset = models.Client.objects.all()
    serializer_class = ClientSerializer

class ClientsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Client.objects.all()
    serializer_class = ClientSerializer
