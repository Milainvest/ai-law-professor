# AI Law Professor - AI Service

This service handles the AI/ML components of the AI Law Professor application, including RAG (Retrieval Augmented Generation) and natural language processing.

## Prerequisites

- Python 3.10 or later
- pip
- virtualenv (recommended)

## Setup

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Install the package in development mode:
```bash
pip install -e .
```

4. Copy the example environment file and configure it:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Development

Start the development server:
```bash
npm run dev
# or
python run.py
```

The server will be available at http://localhost:3002

## Testing

Run tests:
```bash
npm test
# or
python run_tests.py
```

Run tests with watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run coverage
```

## Code Quality

Format code:
```bash
npm run format
```

Run linting:
```bash
npm run lint
```

## API Documentation

When the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:3002/docs
- ReDoc: http://localhost:3002/redoc

## Project Structure

```
src/
├── api/            # API endpoints
│   └── v1/         # API version 1
├── core/           # Core functionality
├── models/         # Data models
├── services/       # Business logic
└── utils/          # Utility functions

tests/              # Test files
├── api/
│   └── v1/         # API tests
└── conftest.py     # Test configuration
```

## Environment Variables

- `ENVIRONMENT`: development/production
- `PORT`: Server port (default: 3002)
- `HOST`: Server host (default: 0.0.0.0)
- `CORS_ORIGIN`: Allowed CORS origins
