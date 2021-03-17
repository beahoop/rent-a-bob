from rest_framework import serializers
from .models import Client
from jobs.serializers import JobSerializer

class ClientSerializer(serializers.ModelSerializer):
    jobs = JobSerializer(many=True, read_only=True)
    class Meta:
        model = Client
        fields = '__all__'
