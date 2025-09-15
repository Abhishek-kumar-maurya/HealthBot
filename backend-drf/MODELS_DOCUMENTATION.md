# HealthBot Django Models and Serializers Documentation

## Overview
This implementation provides Django models and serializers for the HealthBot backend application, supporting user authentication, health records management, and chat functionality.

## Models Implemented

### 1. User Model (`main.models.User`)
- **Extends**: Django's `AbstractUser`
- **Custom Fields**:
  - `email`: Unique email field
  - `created_at`: Auto timestamp for creation
  - `updated_at`: Auto timestamp for updates
- **Purpose**: Custom user model for authentication and user management

### 2. HealthRecord Model (`main.models.HealthRecord`)
- **Fields**:
  - `user`: ForeignKey to User (one-to-many relationship)
  - `visit_date`: DateTime of the medical visit
  - `doctor`: Doctor's name (CharField, max 200 chars)
  - `diagnosis`: Medical diagnosis (TextField)
  - `medications`: Current medications (TextField, optional)
  - `lab_results`: Laboratory test results (TextField, optional)
  - `notes`: Additional notes (TextField, optional)
  - `created_at` & `updated_at`: Auto timestamps
- **Purpose**: Store medical records linked to users

### 3. ChatMessage Model (`main.models.ChatMessage`)
- **Fields**:
  - `user`: ForeignKey to User (one-to-many relationship)
  - `message_text`: The chat message content (TextField)
  - `sender`: Choice field ('user' or 'bot')
  - `timestamp`: Auto timestamp for message creation
- **Purpose**: Store chat conversation history between users and the bot

## Serializers Implemented

### 1. UserSerializer (`main.serializers.UserSerializer`)
- **Purpose**: User registration with password validation
- **Features**:
  - Password confirmation validation
  - Encrypted password storage
  - Comprehensive user fields

### 2. UserProfileSerializer (`main.serializers.UserProfileSerializer`)
- **Purpose**: User profile viewing/editing (no password fields)
- **Features**: Safe user data exposure for profile management

### 3. HealthRecordSerializer (`main.serializers.HealthRecordSerializer`)
- **Purpose**: Health record CRUD operations
- **Features**:
  - Auto-association with authenticated user
  - All health record fields supported

### 4. ChatMessageSerializer (`main.serializers.ChatMessageSerializer`)
- **Purpose**: Chat message CRUD operations
- **Features**:
  - Auto-association with authenticated user
  - Support for both user and bot messages

## API Endpoints

### User Management
- `POST /api/register/` - User registration
- `GET/PUT /api/profile/` - User profile management

### Health Records
- `GET/POST /api/health-records/` - List/create health records
- `GET/PUT/DELETE /api/health-records/<id>/` - Manage specific health record

### Chat Messages
- `GET/POST /api/chat-messages/` - List/create chat messages

### General
- `GET /api/` - API overview and status

## Configuration

### Django Settings
- **Custom User Model**: `AUTH_USER_MODEL = 'main.User'`
- **DRF Authentication**: Session and Token authentication
- **Database**: Configured for PostgreSQL via environment variables
- **Environment Variables**: Support via python-dotenv

### Database Migrations
- Initial migration created and applied
- Custom User model properly configured

## Testing
- Comprehensive test suite implemented in `main.tests.py`
- Tests cover:
  - User creation and authentication
  - Health record management
  - Chat message functionality
  - API endpoint functionality
- All tests passing ✓

## Security Features
- Password validation using Django's built-in validators
- User-scoped data access (users can only access their own records)
- Authentication required for all data operations
- CSRF protection enabled

## File Structure
```
backend-drf/
├── main/
│   ├── models.py          # User, HealthRecord, ChatMessage models
│   ├── serializers.py     # DRF serializers for all models
│   ├── views.py           # API views and endpoints
│   ├── urls.py            # URL routing for main app
│   ├── admin.py           # Django admin configuration
│   ├── tests.py           # Comprehensive test suite
│   └── migrations/        # Database migrations
├── healthbot_backend/
│   ├── settings.py        # Django configuration
│   ├── urls.py            # Main URL routing
│   └── ...
├── manage.py              # Django management script
└── requirements.txt       # Python dependencies
```

## Usage Examples

### User Registration
```json
POST /api/register/
{
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "password": "secure_password123",
    "password_confirm": "secure_password123"
}
```

### Health Record Creation
```json
POST /api/health-records/
{
    "visit_date": "2024-01-15T10:00:00Z",
    "doctor": "Dr. Smith",
    "diagnosis": "Annual checkup",
    "medications": "Vitamin D supplement",
    "lab_results": "All values within normal range",
    "notes": "Patient in excellent health"
}
```

### Chat Message Creation
```json
POST /api/chat-messages/
{
    "message_text": "I need help with my medication schedule",
    "sender": "user"
}
```

This implementation provides a solid foundation for the HealthBot application with proper Django conventions, security practices, and comprehensive testing.