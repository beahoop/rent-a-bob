from rest_framework import serializers
from .models import Job, Note

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Note
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    clientname = serializers.ReadOnlyField(source='client.last_name')
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = '__all__'
