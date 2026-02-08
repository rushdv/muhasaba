import sys
import os
sys.path.append(os.getcwd())

from app.auth.security import verify_password, hash_password
from app.db.database import SessionLocal
from app.models.user import User

print("=" * 50)
print("Testing Login Logic")
print("=" * 50)

db = SessionLocal()
user = db.query(User).filter(User.email == "shihab@test.com").first()

if user:
    print(f"✓ User found: {user.username}")
    print(f"  Email: {user.email}")
    print(f"  Hashed password in DB: {user.hashed_password[:50]}...")
    
    password_to_test = "password123"
    try:
        is_match = verify_password(password_to_test, user.hashed_password)
        print(f"\n✓ Password verification: {is_match}")
        if is_match:
            print("  ✓ LOGIN WOULD SUCCEED")
        else:
            print("  ✗ LOGIN WOULD FAIL - Password mismatch")
    except Exception as e:
        print(f"✗ Error during verify_password: {e}")
else:
    print("✗ User not found.")

db.close()

print("\n" + "=" * 50)
print("Testing JWT Token Creation")
print("=" * 50)

try:
    from app.auth.jwt import create_access_token
    token = create_access_token({"sub": "shihab@test.com"})
    print(f"✓ Token created successfully")
    print(f"  Token: {token[:50]}...")
except Exception as e:
    print(f"✗ Error creating token: {e}")
    import traceback
    traceback.print_exc()
