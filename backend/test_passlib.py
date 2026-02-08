from passlib.context import CryptContext

try:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed = pwd_context.hash("password123")
    print(f"Hashed: {hashed}")
    match = pwd_context.verify("password123", hashed)
    print(f"Match: {match}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
