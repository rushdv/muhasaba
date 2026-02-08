import requests

url = "http://localhost:8000/auth/login"
payload = {
    "email": "shihab@test.com",
    "password": "password123"
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
