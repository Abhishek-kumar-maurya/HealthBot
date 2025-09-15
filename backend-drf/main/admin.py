from django.contrib import admin
from .models import UserProfile, HealthRecord, ChatMessage


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'date_of_birth', 'created_at']
    list_filter = ['gender', 'created_at']
    search_fields = ['user__username', 'user__email']


@admin.register(HealthRecord)
class HealthRecordAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'category', 'date', 'created_at']
    list_filter = ['category', 'date', 'created_at']
    search_fields = ['user__username', 'title', 'description']


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['user', 'sender', 'message_preview', 'timestamp']
    list_filter = ['sender', 'timestamp']
    search_fields = ['user__username', 'message']
    
    def message_preview(self, obj):
        return obj.message[:50] + "..." if len(obj.message) > 50 else obj.message
    message_preview.short_description = 'Message'
