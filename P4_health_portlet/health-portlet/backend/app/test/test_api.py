import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_signup():
    response = client.post(
        "/signup", json={"username": "testuser", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert response.json() == {"message": "User created"}

def test_login():
    response = client.post(
        "/login", json={"username": "testuser", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_get_user():
    response = client.get("/users/testuser")
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"
