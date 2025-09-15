from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, HealthRecord, ChatMessage


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model.
    Handles user registration, login, and profile data.
    """
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 
                 'password', 'password_confirm', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def validate(self, attrs):
        """
        Validate that passwords match.
        """
        if attrs.get('password') != attrs.get('password_confirm'):
            raise serializers.ValidationError("Passwords don't match.")
        return attrs

    def create(self, validated_data):
        """
        Create a new user with encrypted password.
        """
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Simplified user serializer for profile views (no password fields).
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 
                 'created_at', 'updated_at')
        read_only_fields = ('id', 'username', 'created_at', 'updated_at')


class HealthRecordSerializer(serializers.ModelSerializer):
    """
    Serializer for HealthRecord model.
    Handles all health record details.
    """
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = HealthRecord
        fields = ('id', 'user', 'visit_date', 'doctor', 'diagnosis', 
                 'medications', 'lab_results', 'notes', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')

    def create(self, validated_data):
        """
        Create a health record and associate it with the current user.
        """
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['user'] = request.user
        return super().create(validated_data)


class ChatMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for ChatMessage model.
    Handles chat history and messages.
    """
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ('id', 'user', 'message_text', 'sender', 'timestamp')
        read_only_fields = ('id', 'user', 'timestamp')

    def create(self, validated_data):
        """
        Create a chat message and associate it with the current user.
        """
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['user'] = request.user
        return super().create(validated_data)