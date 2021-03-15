from rest_framework import serializers
from .models import Job, Note

class JobSerialier(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class NoteSerialier(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Note
        fields = '__all__'
