from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Law Professor"
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:3001"]

    # FastAPI Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Vector Store Settings
    CHROMA_DB_DIR: str = "data/chromadb"

    # Embedding Settings
    EMBEDDING_MODEL: str = "text-embedding-ada-002"

    # Other Settings
    ENVIRONMENT: str = "development"

    class Config:
        case_sensitive = True
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
