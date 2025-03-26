import pytest
from fastapi.testclient import TestClient

def test_health_check(client: TestClient):
    """
    Test the health check endpoint
    """
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "ai-service"}

def test_version_check(client: TestClient):
    """
    Test the version endpoint
    """
    response = client.get("/api/version")
    assert response.status_code == 200
    data = response.json()
    assert "version" in data
    assert data["version"] == "0.1.0"
    assert "environment" in data
