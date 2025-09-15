from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    We can add custom fields here if needed in the future.
    """
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username


class HealthRecord(models.Model):
    """
    Model to store health records for users.
    Links to User and stores medical information.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='health_records')
    visit_date = models.DateTimeField()
    doctor = models.CharField(max_length=200)
    diagnosis = models.TextField()
    medications = models.TextField(blank=True, help_text="Current medications")
    lab_results = models.TextField(blank=True, help_text="Laboratory test results")
    notes = models.TextField(blank=True, help_text="Additional notes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-visit_date']

    def __str__(self):
        return f"{self.user.username} - {self.visit_date.strftime('%Y-%m-%d')} - {self.doctor}"


class ChatMessage(models.Model):
    """
    Model to store chat messages between user and bot.
    Links to User and stores conversation history.
    """
    SENDER_CHOICES = [
        ('user', 'User'),
        ('bot', 'Bot'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_messages')
    message_text = models.TextField()
    sender = models.CharField(max_length=4, choices=SENDER_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.user.username} - {self.sender} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
