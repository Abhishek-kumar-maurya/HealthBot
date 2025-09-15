from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from .models import HealthRecord, ChatMessage
import json


class UserModelTest(TestCase):
    """Test the User model and serializers."""
    
    def setUp(self):
        self.User = get_user_model()
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'testpass123',
            'password_confirm': 'testpass123'
        }

    def test_user_creation(self):
        """Test creating a user via the API."""
        client = Client()
        response = client.post('/api/register/', data=self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(self.User.objects.filter(username='testuser').exists())

    def test_user_profile(self):
        """Test retrieving user profile."""
        user = self.User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        client = Client()
        client.force_login(user)
        response = client.get('/api/profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['username'], 'testuser')


class HealthRecordModelTest(TestCase):
    """Test the HealthRecord model and serializers."""
    
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.health_data = {
            'visit_date': '2024-01-15T10:00:00Z',
            'doctor': 'Dr. Test',
            'diagnosis': 'Test diagnosis',
            'medications': 'Test medication',
            'lab_results': 'Test results',
            'notes': 'Test notes'
        }

    def test_health_record_creation(self):
        """Test creating a health record via the API."""
        client = Client()
        client.force_login(self.user)
        response = client.post('/api/health-records/', 
                              data=json.dumps(self.health_data),
                              content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(HealthRecord.objects.filter(user=self.user).exists())

    def test_health_record_listing(self):
        """Test listing health records."""
        HealthRecord.objects.create(
            user=self.user,
            visit_date='2024-01-15T10:00:00Z',
            doctor='Dr. Test',
            diagnosis='Test diagnosis'
        )
        client = Client()
        client.force_login(self.user)
        response = client.get('/api/health-records/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ChatMessageModelTest(TestCase):
    """Test the ChatMessage model and serializers."""
    
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.chat_data = {
            'message_text': 'Test message',
            'sender': 'user'
        }

    def test_chat_message_creation(self):
        """Test creating a chat message via the API."""
        client = Client()
        client.force_login(self.user)
        response = client.post('/api/chat-messages/', 
                              data=json.dumps(self.chat_data),
                              content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ChatMessage.objects.filter(user=self.user).exists())

    def test_chat_message_listing(self):
        """Test listing chat messages."""
        ChatMessage.objects.create(
            user=self.user,
            message_text='Test message',
            sender='user'
        )
        client = Client()
        client.force_login(self.user)
        response = client.get('/api/chat-messages/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
