import logging
import sys
from typing import Any

from core.config import settings

# Configure logging format
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO if settings.ENVIRONMENT == "production" else logging.DEBUG,
    handlers=[logging.StreamHandler(sys.stdout)],
)

# Create logger
logger = logging.getLogger("ai-law-professor")


def get_logger(name: str) -> Any:
    """
    Get a logger instance with the given name

    Args:
        name: The name of the logger

    Returns:
        logging.Logger: A configured logger instance
    """
    return logging.getLogger(f"ai-law-professor.{name}")
