from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    # API Overview
    path('', views.api_overview, name='api_overview'),
    
    # User endpoints
    path('register/', views.UserCreateView.as_view(), name='user_register'),
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    
    # Health records endpoints
    path('health-records/', views.HealthRecordListCreateView.as_view(), name='health_records'),
    path('health-records/<int:pk>/', views.HealthRecordDetailView.as_view(), name='health_record_detail'),
    
    # Chat messages endpoints
    path('chat-messages/', views.ChatMessageListCreateView.as_view(), name='chat_messages'),
]