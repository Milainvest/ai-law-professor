import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "src"))

from main import app

@pytest.fixture
def client() -> TestClient:
    """
    Create a test client for the FastAPI application
    """
    return TestClient(app)
