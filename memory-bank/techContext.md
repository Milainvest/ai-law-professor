# AI Law Professor - Technical Context

## Technology Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI Library**: shadcn/ui + Tailwind CSS
- **State Management**: React Context + Zustand
- **Charting**: Recharts
- **Testing**: Jest + React Testing Library

### API Layer

- **Framework**: Express.js
- **Language**: TypeScript
- **API Protocol**: REST/GraphQL hybrid
- **Authentication**: NextAuth.js
- **Documentation**: Swagger UI

### AI Service

- **Framework**: FastAPI
- **Language**: Python
- **LLM Integration**: LangChain
- **Vector Database**: ChromaDB
- **Embeddings**: OpenAI text-embedding-3-large
- **RAG Pipeline**: Custom implementation

### Databases

- **Primary**: PostgreSQL (v15)
- **Vector**: PostgreSQL pgvector extension
- **Cache**: Redis
- **ORM**: TypeORM (Node.js), SQLAlchemy (Python)
- **Migrations**: Alembic (Python)

### DevOps

- **Containerization**: Docker
- **Orchestration**: Kubernetes (local dev), AWS EKS (prod)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

## Development Environment

- **Node.js**: v20.11.0 (LTS)
- **Python**: 3.11
- **Package Managers**: npm (Node), poetry (Python)
- **IDE**: VS Code with recommended extensions
- **Linting**: ESLint + Prettier (Node), flake8 + black (Python)

## Key Dependencies

- **Frontend**:
  - next-auth for authentication
  - react-markdown for content rendering
  - zod for form validation

- **Backend**:
  - langchain for AI pipeline
  - psycopg2 for PostgreSQL access
  - pgvector for vector operations
  - redis-py for caching

## Technical Constraints

1. **Legal Accuracy**: All responses must be citable and verifiable
2. **Privacy**: Must comply with educational data protection laws
3. **Performance**: Sub-second response time for common queries
4. **Scalability**: Support concurrent users from law school classes
5. **Maintainability**: Clear separation of legal knowledge from code

## Development Practices

- Test-driven development for critical components
- Code reviews for all AI prompt engineering
- Weekly knowledge base updates
- Automated legal citation validation
- Feature flags for gradual rollout
