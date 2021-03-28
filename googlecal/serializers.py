from rest_framework import serializers
from .models import Event
# from jobs.serializers import JobSerializer


class EventsSerializer(serializers.ModelSerializer):
    # job = JobSerializer(many=False, read_only=True)
    class Meta:
        model = Event
        fields = '__all__'
