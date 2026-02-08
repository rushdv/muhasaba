import requests
import json

print("=" * 60)
print("Testing Complete Login Flow")
print("=" * 60)

# Test 1: Test Login API
print("\n1. Testing Login API...")
url = "http://127.0.0.1:8000/auth/login"
payload = {
    "email": "shihab@test.com",
    "password": "password123"
}

try:
    response = requests.post(url, json=payload)
    print(f"   Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        token = data.get('access_token')
        print(f"   ✓ Login successful!")
        print(f"   ✓ Token received: {token[:50]}...")
        
        # Test 2: Use token to access protected endpoint
        print("\n2. Testing Protected Endpoint...")
        headers = {"Authorization": f"Bearer {token}"}
        protected_url = "http://127.0.0.1:8000/"
        protected_response = requests.get(protected_url, headers=headers)
        print(f"   Status Code: {protected_response.status_code}")
        print(f"   Response: {protected_response.json()}")
        
    else:
        print(f"   ✗ Login failed!")
        print(f"   Response: {response.text}")
        
except Exception as e:
    print(f"   ✗ Error: {e}")

print("\n" + "=" * 60)
print("Login Test Complete")
print("=" * 60)
