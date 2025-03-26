from fastapi import APIRouter

from core.logging import get_logger

router = APIRouter(tags=["health"])
logger = get_logger("api.health")


@router.get("/health")
async def health_check():
    """
    Health check endpoint to verify service status
    """
    logger.info("Health check requested")
    return {"status": "ok", "service": "ai-service"}


@router.get("/api/version")
async def get_version():
    """
    Get the current version of the API
    """
    from core.config import settings

    logger.info(f"Version check requested. Environment: {settings.ENVIRONMENT}")
    return {"version": "0.1.0", "environment": settings.ENVIRONMENT}
