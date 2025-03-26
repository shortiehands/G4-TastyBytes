import pytest
from fastapi.testclient import TestClient
from backend.app.main import app  # adjust to your FastAPI entry point
from backend.app.routes import auth  # adjust based on your folder structure
from backend.app.exceptions import ServiceException
from unittest.mock import patch

client = TestClient(app)


@pytest.fixture(autouse=True)
def override_router():
    # Ensure the auth router is included
    app.include_router(auth.router)
    yield


def test_login_success():
    with patch('app.routes.auth.cognito_service.authenticate_user') as mock_auth:
        mock_auth.return_value = {
            "id_token": "id_token",
            "access_token": "access_token",
            "refresh_token": "refresh_token"
        }
        response = client.post("/login", data={"username": "testuser", "password": "Password123"})
        assert response.status_code == 200
        assert response.json()["message"] == "Login successful"
        assert "tokens" in response.json()
        mock_auth.assert_called_once()


def test_login_failure():
    with patch('app.routes.auth.cognito_service.authenticate_user', side_effect=ServiceException(401, "Invalid creds")):
        response = client.post("/login", data={"username": "testuser", "password": "wrongpass"})
        assert response.status_code == 401
        assert response.json()["detail"] == "Invalid creds"


def test_registration_success():
    with patch('app.routes.auth.cognito_service.register_user') as mock_register:
        mock_register.return_value = {
            "UserSub": "user-123",
            "UserConfirmed": False
        }
        response = client.post("/registration", data={"username": "newuser", "email": "email@test.com", "password": "Password123"})
        assert response.status_code == 201
        assert response.json()["user_sub"] == "user-123"
        assert response.json()["message"] == "User registration successful."
        mock_register.assert_called_once()


def test_registration_failure():
    with patch('app.routes.auth.cognito_service.register_user', side_effect=ServiceException(400, "User already exists")):
        response = client.post("/registration", data={"username": "newuser", "email": "email@test.com", "password": "Password123"})
        assert response.status_code == 400
        assert response.json()["detail"] == "User already exists"



def test_confirmation_success():
    with patch('app.routes.auth.cognito_service.client.confirm_sign_up') as mock_confirm, \
         patch('app.routes.auth.cognito_service.calculate_secret_hash') as mock_secret_hash:
        
        mock_secret_hash.return_value = "fake_hash"
        mock_confirm.return_value = {}

        response = client.post("/confirmation", data={"username": "testuser", "confirmation_code": "123456"})
        assert response.status_code == 200
        assert response.json()["message"] == "User confirmed successfully."
        mock_confirm.assert_called_once()
        mock_secret_hash.assert_called_once()

def test_confirmation_failure():
    with patch('app.routes.auth.cognito_service.client.confirm_sign_up', side_effect=ServiceException(400, "Invalid confirmation code")), \
         patch('app.routes.auth.cognito_service.calculate_secret_hash') as mock_secret_hash:
        
        mock_secret_hash.return_value = "fake_hash"

        response = client.post("/confirmation", data={"username": "testuser", "confirmation_code": "wrongcode"})
        assert response.status_code == 400
        assert response.json()["detail"] == "Invalid confirmation code"

