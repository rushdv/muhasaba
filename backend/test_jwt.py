from app.auth.jwt import create_access_token

try:
    token = create_access_token({"sub": "test@example.com"})
    print(f"Generated Token: {token}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
