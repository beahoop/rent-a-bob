from rest_framework import serializers
from .models import Job

class JobSerialier(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Job
        fields = '__all__'
