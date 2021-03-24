from django.shortcuts import render
from rest_framework import generics, permissions
from .permissions import IsClientOrReadOnly
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from .serializers import ClientSerializer
from . import models

class ListClients(APIView):
    serializer_class = ClientSerializer
    permission_classes = [IsClientOrReadOnly]

    def post(self, request, format=None):
        phone = request.data["phone_number"]

        if models.Client.objects.filter(phone_number=phone).exists():
            client = models.Client.objects.get(phone_number=phone)
            print("already exists", client)
            serializer = ClientSerializer(client)
            return Response(serializer.data)
        else:
            serializer = ClientSerializer(data=request.data)
            print("Creating new client", phone)
            serializer.is_valid()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ClientsListView(generics.ListCreateAPIView):
    queryset = models.Client.objects.all().order_by('last_name')
    serializer_class = ClientSerializer
    permission_classes = [IsClientOrReadOnly]

    #if it gets a post request
    #just api view... and attach api function
class ClientsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsClientOrReadOnly]








# def post(self, request, format=None):
    # serializer = ClientSerializer(data=request.data)
#     phone = request.data["phone_number"]
#     # import pdb; pdb.set_trace()
#
#     if models.Client.objects.filter(phone_number=phone).exists():
#         # import pdb; pdb.set_trace()
#         client = models.Client.objects.get(phone_number=phone)
#         print("already exists", client)
#         serializer.is_valid()
#         # # import pdb; pdb.set_trace()
#         # #if the client exist then return that client back
#         # serializer = serializer(client)
#         return Response(serializer.data)
