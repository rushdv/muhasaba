import sys
import os
sys.path.append(os.getcwd())

from app.auth.security import hash_password
from app.db.database import SessionLocal
from app.models.user import User

db = SessionLocal()

# Try to find and update the existing user
user = db.query(User).filter(User.email == "shihab@test.com").first()

if user:
    print(f"Updating password for user: {user.username}")
    new_password = "password123"
    user.hashed_password = hash_password(new_password)
    db.commit()
    print(f"✓ Password updated successfully")
    print(f"  New hashed password: {user.hashed_password[:50]}...")
else:
    print("User not found. Creating new user...")
    new_user = User(
        username="shihab",
        email="shihab@test.com",
        hashed_password=hash_password("password123")
    )
    db.add(new_user)
    db.commit()
    print("✓ User created successfully")
    print(f"  Username: {new_user.username}")
    print(f"  Email: {new_user.email}")

db.close()

# Verify the password
from app.auth.security import verify_password
db = SessionLocal()
user = db.query(User).filter(User.email == "shihab@test.com").first()
if verify_password("password123", user.hashed_password):
    print("\n✓ Password verification successful!")
else:
    print("\n✗ Password verification failed!")
db.close()
