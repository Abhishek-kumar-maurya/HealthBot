from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import User, HealthRecord, ChatMessage
from .serializers import UserSerializer, UserProfileSerializer, HealthRecordSerializer, ChatMessageSerializer


class UserCreateView(generics.CreateAPIView):
    """
    Create a new user account.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Get or update user profile.
    """
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class HealthRecordListCreateView(generics.ListCreateAPIView):
    """
    List all health records for the authenticated user or create a new one.
    """
    serializer_class = HealthRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HealthRecord.objects.filter(user=self.request.user)


class HealthRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a specific health record.
    """
    serializer_class = HealthRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HealthRecord.objects.filter(user=self.request.user)


class ChatMessageListCreateView(generics.ListCreateAPIView):
    """
    List all chat messages for the authenticated user or create a new one.
    """
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChatMessage.objects.filter(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def api_overview(request):
    """
    Simple API overview endpoint to test the setup.
    """
    return Response({
        'message': 'HealthBot API is running!',
        'user': request.user.username,
        'endpoints': {
            'user_profile': '/api/profile/',
            'health_records': '/api/health-records/',
            'chat_messages': '/api/chat-messages/',
        }
    })
