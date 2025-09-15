from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'health-records', views.HealthRecordViewSet, basename='healthrecord')
router.register(r'chat/messages', views.ChatMessageViewSet, basename='chatmessage')

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/user/', views.current_user_view, name='current_user'),
    path('profile/', views.profile_view, name='profile'),
    path('', include(router.urls)),
]