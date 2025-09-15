# HealthBot Frontend

A complete React frontend application for the HealthBot medical assistant platform.

## 🚀 Features

- **Authentication System**: Complete login/logout with protected routes
- **Dashboard**: Health overview with quick actions and statistics
- **Interactive ChatBot**: AI-powered health assistance with conversation history
- **Health Records**: Medical visits, medications, and lab results management
- **User Profile**: Comprehensive profile management with health information
- **Responsive Design**: Mobile-first design with CSS modules
- **Modern Tech Stack**: React 18, React Router v6, Vite build system

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorMessage.jsx    # Error/success message display
│   ├── Loader.jsx          # Loading spinner component
│   ├── Navbar.jsx          # Navigation header
│   └── ProtectedRoute.jsx  # Route guard component
├── context/            # React context providers
│   └── AuthContext.jsx     # Authentication state management
├── pages/              # Application pages
│   ├── Login.jsx           # Authentication page
│   ├── Dashboard.jsx       # Main dashboard
│   ├── ChatBot.jsx         # AI chat interface
│   ├── Profile.jsx         # User profile management
│   ├── HealthRecords.jsx   # Medical records interface
│   └── NotFound.jsx        # 404 error page
├── styles/             # Global styles and CSS modules
│   └── global.css          # Global CSS variables and utilities
├── App.jsx             # Main application component
└── index.jsx           # Application entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application includes a dummy authentication system for development and testing:

- **Login**: Use any email and password combination
- **Demo Credentials**: Click "Fill Demo Credentials" on login page
- **Protected Routes**: All main pages require authentication
- **Logout**: Available from the navigation menu

## 📱 Pages & Features

### Dashboard
- Health overview cards
- Quick action buttons
- Recent activity feed
- Navigation to all main features

### ChatBot
- Interactive health assistant
- Message history
- Quick suggestion buttons
- Typing indicators
- Professional health responses

### Health Records
- **Medical Visits**: Track doctor appointments and diagnoses
- **Medications**: Manage current and past medications
- **Lab Results**: View test results with normal/abnormal indicators
- Tabbed interface for easy navigation

### Profile
- Personal information management
- Health details (blood type, allergies, medications)
- Emergency contact information
- Editable forms with validation

## 🎨 Styling

The application uses CSS Modules for component-specific styling:

- **Global Styles**: CSS custom properties for theming
- **CSS Modules**: Scoped styling for components
- **Responsive Design**: Mobile-first approach
- **Medical Theme**: Professional healthcare-focused design
- **Accessibility**: Proper contrast and keyboard navigation

## 🔧 Development

### Adding New Pages

1. Create component in `src/pages/`
2. Create corresponding CSS module
3. Add route to `App.jsx`
4. Update navigation in `Navbar.jsx`

### Adding New Components

1. Create component in `src/components/`
2. Create corresponding CSS module
3. Export from component for reuse

### API Integration

The application is ready for API integration:

- Authentication context supports async login/logout
- Error handling components for API failures
- Loading states throughout the application
- Environment variables configured for API URLs

### Environment Variables

Create a `.env` file:
```
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

The `dist/` folder contains the production-ready files.

### Docker Deployment

The application can be deployed using the provided Dockerfile:

```bash
docker build -t healthbot-frontend .
docker run -p 3000:3000 healthbot-frontend
```

## 🧪 Testing

The application is built with testing in mind:

- Modular component structure
- Separated business logic in context
- Mock data for development
- Error boundaries for stability

## 🤝 Contributing

1. Follow the existing file structure
2. Use CSS modules for styling
3. Implement proper error handling
4. Add loading states for async operations
5. Maintain responsive design principles

## 📝 License

This project is part of the HealthBot application suite.
