# AI Law Professor

An AI-powered learning assistant for law students, providing interactive legal education through natural language conversations.

## Project Structure

```
ai-law-professor/
├── packages/
│   ├── frontend/        # Next.js frontend application
│   ├── backend/         # Express.js backend API
│   └── ai-service/      # FastAPI AI service
```

## Prerequisites

- Node.js (v18 or later)
- Python (v3.10 or later)
- PostgreSQL (v14 or later)

## Setup Instructions

### 1. Install Dependencies

#### Frontend (Next.js)
```bash
cd packages/frontend
npm install
```

#### Backend (Express)
```bash
cd packages/backend
npm install
```

#### AI Service (FastAPI)
```bash
cd packages/ai-service
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Environment Setup

Create and configure the following .env files:

#### Backend (.env)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_law_professor
CORS_ORIGIN=http://localhost:3000
```

#### AI Service (.env)
```env
ENVIRONMENT=development
HOST=0.0.0.0
PORT=3002
CHROMA_DB_DIR=data/chromadb
EMBEDDING_MODEL=text-embedding-ada-002
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb ai_law_professor
```

### 4. Start Development Servers

#### Start All Services
```bash
# From project root
npm run dev
```

Or start services individually:

#### Frontend
```bash
cd packages/frontend
npm run dev
# Available at http://localhost:3000
```

#### Backend
```bash
cd packages/backend
npm run dev
# Available at http://localhost:3001
```

#### AI Service
```bash
cd packages/ai-service
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
python src/main.py
# Available at http://localhost:3002
```

## Development Guidelines

- Follow TypeScript best practices for frontend and backend development
- Use Python type hints and follow PEP 8 guidelines for the AI service
- Write tests for critical functionality
- Keep code modular and maintainable
- Document API endpoints and important functions

## Available Scripts

- `npm run dev`: Start all services in development mode
- `npm run build`: Build all packages
- `npm run test`: Run tests across all packages
- `npm run lint`: Run linting across all packages

## API Documentation

- Frontend: [http://localhost:3000/docs](http://localhost:3000/docs)
- Backend: [http://localhost:3001/docs](http://localhost:3001/docs)
- AI Service: [http://localhost:3002/docs](http://localhost:3002/docs)
