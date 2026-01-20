#!/bin/bash

# HealthBot Project Status Checker
# This script analyzes the current state of the HealthBot project

echo "🏥 HealthBot Project Status Checker"
echo "=================================="
echo

# Check project structure
echo "📁 Project Structure:"
if [ -d "backend-drf" ] && [ -d "frontend-react" ] && [ -d "ai-langchain" ]; then
    echo "✅ All three main services directories exist"
else
    echo "❌ Missing service directories"
fi

if [ -f "docker-compose.yml" ]; then
    echo "✅ Docker Compose file exists"
else
    echo "❌ Docker Compose file missing"
fi

echo

# Check backend implementation
echo "🔧 Backend Service Status:"
if [ -f "backend-drf/manage.py" ]; then
    echo "✅ Django project structure exists"
else
    echo "❌ Django project not found"
fi

# Check if main app is configured
if grep -q "main" backend-drf/healthbot_backend/settings.py 2>/dev/null; then
    echo "✅ Main app is configured"
else
    echo "❌ Main app not configured in settings"
fi

# Check if DRF is configured
if grep -q "rest_framework" backend-drf/healthbot_backend/settings.py 2>/dev/null; then
    echo "✅ Django REST Framework configured"
else
    echo "❌ Django REST Framework not configured"
fi

# Check if custom models exist
if [ -s "backend-drf/main/models.py" ] && [ "$(wc -l < backend-drf/main/models.py)" -gt 3 ]; then
    echo "✅ Custom models implemented"
else
    echo "❌ No custom models found (only default content)"
fi

echo

# Check AI service implementation
echo "🤖 AI Service Status:"
if [ -f "ai-langchain/requirements.txt" ]; then
    echo "✅ AI service requirements exist"
else
    echo "❌ AI service requirements missing"
fi

# Check for actual Python implementation
if find ai-langchain -name "*.py" -exec test -s {} \; 2>/dev/null; then
    echo "✅ Python implementation files exist"
else
    echo "❌ No Python implementation found"
fi

echo

# Check frontend implementation
echo "💻 Frontend Service Status:"
if [ -f "frontend-react/package.json" ]; then
    echo "✅ Frontend package.json exists"
else
    echo "❌ Frontend package.json missing"
fi

# Check for React components
if find frontend-react -name "*.jsx" -o -name "*.tsx" 2>/dev/null | grep -q .; then
    echo "✅ React components exist"
else
    echo "❌ No React components found"
fi

# Check for Vite config
if [ -f "frontend-react/vite.config.js" ] || [ -f "frontend-react/vite.config.ts" ]; then
    echo "✅ Vite configuration exists"
else
    echo "❌ Vite configuration missing"
fi

echo

# Check testing setup
echo "🧪 Testing Status:"
backend_tests=$(find backend-drf -name "test_*.py" -o -name "*_test.py" 2>/dev/null | wc -l)
frontend_tests=$(find frontend-react -name "*.test.*" -o -name "*.spec.*" 2>/dev/null | wc -l)

if [ $backend_tests -gt 0 ]; then
    echo "✅ Backend tests found ($backend_tests files)"
else
    echo "❌ No backend tests found"
fi

if [ $frontend_tests -gt 0 ]; then
    echo "✅ Frontend tests found ($frontend_tests files)"
else
    echo "❌ No frontend tests found"
fi

echo

# Check CI/CD
echo "🔄 CI/CD Status:"
if [ -f ".github/workflows/ci.yml" ]; then
    echo "✅ CI workflow file exists"
    if grep -q "echo.*placeholder" .github/workflows/ci.yml 2>/dev/null; then
        echo "⚠️  CI workflow is only a placeholder"
    else
        echo "✅ CI workflow appears to be implemented"
    fi
else
    echo "❌ CI workflow missing"
fi

echo

# Overall assessment
echo "📊 Overall Assessment:"
echo "Phase 0 (Scaffolding): ✅ Complete"
echo "Phase 1 (Implementation): ❌ Not started"
echo
echo "Current completion: ~15%"
echo "Next steps: Implement actual application logic in each service"

echo
echo "🚀 To start development:"
echo "1. Implement Django models and API endpoints"
echo "2. Create FastAPI server for AI service"
echo "3. Build React components and UI"
echo "4. Add comprehensive testing"
echo "5. Set up proper CI/CD pipeline"