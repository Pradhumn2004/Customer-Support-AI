import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_chat_endpoint():
    response = client.post("/api/chat/", json={
        "message": "How do I reset my password?",
        "session_id": "test-session-001"
    })
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert len(data["response"]) > 0


def test_chat_validation():
    response = client.post("/api/chat/", json={
        "message": "",
        "session_id": ""
    })
    assert response.status_code == 422


def test_create_ticket():
    response = client.post("/api/tickets/", json={
        "user_id": "user-001",
        "subject": "Test ticket",
        "description": "This is a test ticket",
        "priority": "medium"
    })
    assert response.status_code == 200
    data = response.json()
    assert "ticket_id" in data
    assert data["status"] == "open"


def test_get_ticket():
    create_resp = client.post("/api/tickets/", json={
        "user_id": "user-002",
        "subject": "Lookup test",
        "description": "Testing ticket lookup"
    })
    ticket_id = create_resp.json()["ticket_id"]

    response = client.get(f"/api/tickets/{ticket_id}")
    assert response.status_code == 200
    assert response.json()["ticket_id"] == ticket_id


def test_get_nonexistent_ticket():
    response = client.get("/api/tickets/FAKE-1234")
    assert response.status_code == 404
