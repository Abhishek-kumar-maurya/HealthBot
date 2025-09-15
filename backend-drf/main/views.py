from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import UserProfile, HealthRecord, ChatMessage
from .serializers import UserProfileSerializer, HealthRecordSerializer, ChatMessageSerializer, UserSerializer
import random


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'detail': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'detail': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'detail': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    token, created = Token.objects.get_or_create(user=user)
    
    # Create user profile
    UserProfile.objects.create(user=user)
    
    return Response({
        'token': token.key,
        'user': UserSerializer(user).data
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        request.user.auth_token.delete()
    except:
        pass
    return Response({'detail': 'Successfully logged out'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    return Response(UserSerializer(request.user).data)


class HealthRecordViewSet(viewsets.ModelViewSet):
    serializer_class = HealthRecordSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return HealthRecord.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ChatMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ChatMessage.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Save user message
        user_message = serializer.save(user=self.request.user, sender='user')
        
        # Generate a simple bot response (replace with actual AI later)
        bot_responses = [
            "Thank you for sharing that with me. How are you feeling today?",
            "I understand your concern. Can you tell me more about any symptoms?",
            "That's helpful information. Have you consulted with a healthcare provider about this?",
            "I'm here to help. What would you like to know about your health?",
            "Based on what you've shared, I recommend keeping track of any changes and consulting with a medical professional.",
            "Thank you for the update. Is there anything specific you'd like advice on?",
        ]
        
        bot_message_text = random.choice(bot_responses)
        ChatMessage.objects.create(
            user=self.request.user,
            message=bot_message_text,
            sender='bot'
        )


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    try:
        profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=request.user)
    
    if request.method == 'GET':
        data = UserProfileSerializer(profile).data
        # Include user data
        data.update({
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,
        })
        return Response(data)
    
    elif request.method == 'PUT':
        # Update user fields
        user = request.user
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.email = request.data.get('email', user.email)
        user.save()
        
        # Update profile fields
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            data.update({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
            })
            return Response(data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
