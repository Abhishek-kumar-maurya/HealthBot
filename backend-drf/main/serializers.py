from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, HealthRecord, ChatMessage


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone', 'date_of_birth', 'gender', 'medical_conditions', 
                 'medications', 'allergies', 'emergency_contact', 'emergency_phone']


class HealthRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = ['id', 'title', 'description', 'category', 'date', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'message', 'sender', 'timestamp']
        read_only_fields = ['sender', 'timestamp']