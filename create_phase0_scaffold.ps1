# create_phase0_scaffold.ps1
# Run from workspace root. Creates Phase 0 scaffold files.
Param()

# Create folders
New-Item -ItemType Directory -Force -Path backend-drf,frontend-react,ai-langchain,.github\workflows

# docker-compose.yml
@'
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: healthbot
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"

  backend:
    build: ./backend-drf
    env_file:
      - ./backend-drf/.env.example
    depends_on:
      - postgres
      - redis
    ports:
      - "8000:8000"

  ai-langchain:
    build: ./ai-langchain
    env_file:
      - ./ai-langchain/.env.example
    depends_on:
      - qdrant
      - redis
    ports:
      - "8100:8100"

  frontend:
    build: ./frontend-react
    env_file:
      - ./frontend-react/.env.example
    ports:
      - "3000:3000"

volumes:
  pgdata:
'@ | Out-File -Encoding utf8 docker-compose.yml

# Root README
@'
# HealthBot — Phase 0 (Scaffolding)

This creates scaffolding for three services:
- backend-drf
- ai-langchain
- frontend-react

Run locally:
1. Copy `.env.example` -> `.env` for each service and fill secrets.
2. docker-compose up --build
'@ | Out-File -Encoding utf8 README.md

# backend-drf files
@'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "healthbot_backend.asgi:application", "--host", "0.0.0.0", "--port", "8000", "--reload"]
'@ | Out-File -Encoding utf8 backend-drf\Dockerfile

@'
Django>=4.2
djangorestframework
psycopg2-binary
python-dotenv
celery[redis]
redis
gunicorn
uvicorn
django-environ
'@ | Out-File -Encoding utf8 backend-drf\requirements.txt

@'
# Backend Django env example
DJANGO_SECRET_KEY=change-me
DATABASE_URL=postgres://postgres:postgres@postgres:5432/healthbot
REDIS_URL=redis://redis:6379/0
HMAC_PHONE_SALT=change-this-salt
ALLOWED_HOSTS=localhost,127.0.0.1
'@ | Out-File -Encoding utf8 backend-drf\.env.example

@'
# backend-drf

Purpose: Django REST Framework backend skeleton for HealthBot.

Local dev:
- Copy `.env.example` to `.env` and update.
- Build and run via root docker-compose: `docker-compose up --build backend`
'@ | Out-File -Encoding utf8 backend-drf\README.md

# frontend-react files
@'
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]
'@ | Out-File -Encoding utf8 frontend-react\Dockerfile

@'
{
  "name": "healthbot-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.5.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^2.0.0"
  }
}
'@ | Out-File -Encoding utf8 frontend-react\package.json

@'
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
'@ | Out-File -Encoding utf8 frontend-react\.env.example

@'
# frontend-react

Skeleton React + Tailwind frontend.

Local dev (from project root):
docker-compose up --build frontend
'@ | Out-File -Encoding utf8 frontend-react\README.md

# ai-langchain files
@'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "ai_server.app:app", "--host", "0.0.0.0", "--port", "8100", "--reload"]
'@ | Out-File -Encoding utf8 ai-langchain\Dockerfile

@'
fastapi
uvicorn
transformers
sentence-transformers
langchain
qdrant-client
pinecone-client
redis
python-dotenv
'@ | Out-File -Encoding utf8 ai-langchain\requirements.txt

@'
QDRANT_URL=http://qdrant:6333
PINECONE_API_KEY=
PINECONE_ENV=
EMBEDDING_MODEL=sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
GEN_MODEL=google/flan-t5-base
REDIS_URL=redis://redis:6379/0
'@ | Out-File -Encoding utf8 ai-langchain\.env.example

@'
# ai-langchain

LangChain orchestration service skeleton.

Notes:
- Uses sentence-transformers embeddings by default (see .env.example).
- Vector DB: Qdrant local (docker-compose) or Pinecone (production).
'@ | Out-File -Encoding utf8 ai-langchain\README.md

# CI and tooling
@'
name: CI

on:
  push:
    branches: [ main, master, 'phase-*' ]
  pull_request:
    branches: [ main, master ]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Lint placeholder
        run: echo "Add lint/test steps for each service"
'@ | Out-File -Encoding utf8 .github\workflows\ci.yml

@'
[tool.black]
line-length = 88

[tool.isort]
profile = "black"
'@ | Out-File -Encoding utf8 pyproject.toml

@'
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
'@ | Out-File -Encoding utf8 .eslintrc.cjs

@'
{
  "singleQuote": true,
  "trailingComma": "all"
}
'@ | Out-File -Encoding utf8 .prettierrc

# demo script
@'
# demo.ps1 — build and run the scaffold stack locally
docker-compose build
docker-compose up -d
Write-Host "Services started. Backend: http://localhost:8000  Frontend: http://localhost:3000  AI: http://localhost:8100"
'@ | Out-File -Encoding utf8 demo.ps1

Write-Host "Phase 0 scaffold files created. Please open and update .env files, then run git commands to commit."