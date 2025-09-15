from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, HealthRecord, ChatMessage


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Custom User admin with additional fields.
    """
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'created_at')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'created_at')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-created_at',)

    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('created_at', 'updated_at')}),
    )
    readonly_fields = ('created_at', 'updated_at')


@admin.register(HealthRecord)
class HealthRecordAdmin(admin.ModelAdmin):
    """
    Admin interface for HealthRecord model.
    """
    list_display = ('user', 'visit_date', 'doctor', 'diagnosis', 'created_at')
    list_filter = ('visit_date', 'doctor', 'created_at')
    search_fields = ('user__username', 'user__email', 'doctor', 'diagnosis')
    ordering = ('-visit_date',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Patient Info', {
            'fields': ('user',)
        }),
        ('Visit Details', {
            'fields': ('visit_date', 'doctor', 'diagnosis')
        }),
        ('Medical Information', {
            'fields': ('medications', 'lab_results', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    """
    Admin interface for ChatMessage model.
    """
    list_display = ('user', 'sender', 'message_preview', 'timestamp')
    list_filter = ('sender', 'timestamp')
    search_fields = ('user__username', 'message_text')
    ordering = ('-timestamp',)
    readonly_fields = ('timestamp',)

    def message_preview(self, obj):
        """
        Show a preview of the message text.
        """
        return obj.message_text[:50] + '...' if len(obj.message_text) > 50 else obj.message_text
    message_preview.short_description = 'Message Preview'
