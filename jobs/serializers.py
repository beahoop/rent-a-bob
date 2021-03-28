from rest_framework import serializers
from .models import Job, Note
from googlecal.serializers import EventsSerializer

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Note
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    clientname = serializers.ReadOnlyField(source='client.last_name')
    clientemail= serializers.ReadOnlyField(source='client.email')
    clientaddress_street = serializers.ReadOnlyField(source='client.address_street')
    notes = NoteSerializer(many=True, read_only=True)
    event = EventsSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = '__all__'
