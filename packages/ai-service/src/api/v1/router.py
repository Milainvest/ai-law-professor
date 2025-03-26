from fastapi import APIRouter

from .health import router as health_router

router = APIRouter()

# Include all routers
router.include_router(health_router)
