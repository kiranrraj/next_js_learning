# test_script.py
import requests
import json

# Backend base URL
BASE_URL = "http://localhost:8001"

# Test credentials (only admin and drdhanvantari are correct)
TEST_USERS = [
    {"username": "admin", "password": "Admin@123@@", "expected_role": "admin"},
    {"username": "drdhanvantari", "password": "doc456", "expected_role": "doctor"},
    {"username": "pharmaCenterUser", "password": "Pharma@123@@", "expected_role": "pharmaCenter"},
    {"username": "dev1", "password": "devpass", "expected_role": "developer"},
    {"username": "tester", "password": "Test@123@@", "expected_role": "testuser"},
    {"username": "regularuser", "password": "User@123@@", "expected_role": "user"}
]

def log_request_response(response):
    print("Request URL:", response.request.url)
    print("Request method:", response.request.method)
    print("Request headers:", dict(response.request.headers))
    print("Request body:", response.request.body if response.request.body else "None")
    print("Response status:", response.status_code)
    try:
        print("Response body:", response.json())
    except Exception:
        print("Response body is not valid JSON.")
        print(response.text)

# Step 1: Login and get access token
def login_and_get_token(username, password):
    url = f"{BASE_URL}/auth/login"
    payload = {
        "username": username,
        "password": password
    }
    # Learn more on this content, needed for security
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    try:
        print(f"Logging in as {username}...")
         # Using data instead of json, for learning
        response = requests.post(url, data=payload, headers=headers) 
        log_request_response(response)
        response.raise_for_status()

        data = response.json()
        token = data.get("access_token")

        if not token:
            print(f"No access token received for {username}.")
            return None

        print(f"Login successful for {username}.")
        return token, data["user"]

    except requests.HTTPError as http_err:
        print(f"HTTP error occurred during login for {username}:", http_err)
    except requests.ConnectionError:
        print("Connection error: Unable to connect to the backend.")
    except requests.Timeout:
        print("Request timed out.")
    except Exception as err:
        print(f"Unexpected error during login for {username}:", err)

    return None, None

# Step 2: Access protected route
def access_protected_route(token, expected_role):
    url = f"{BASE_URL}/api/auth/me"
    headers = {
        "Authorization": f"Bearer {token}"
    }

    try:
        print("Fetching user details from protected endpoint...")
        response = requests.get(url, headers=headers)
        log_request_response(response)
        response.raise_for_status()

        data = response.json()

        # Check if the user role matches the expected role
        if data["role"] == expected_role:
            print(f"User {data['username']} has correct role: {expected_role}. Test passed.")
        else:
            print(f"Role mismatch for {data['username']}. Expected: {expected_role}, Got: {data['role']}")
        return data

    except requests.HTTPError as http_err:
        print(f"HTTP error accessing protected route:", http_err)
    except requests.ConnectionError:
        print("Connection error to protected endpoint.")
    except requests.Timeout:
        print("Request to protected endpoint timed out.")
    except Exception as err:
        print("Unexpected error accessing protected route:", err)

if __name__ == "__main__":
    for user in TEST_USERS:
        token, user_data = login_and_get_token(user["username"], user["password"])
        if token and user_data:
            access_protected_route(token, user["expected_role"])
        else:
            print(f"Skipping protected route access for {user['username']} due to login failure.")
