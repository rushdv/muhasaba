from app.auth.security import verify_password, hash_password
from app.db.database import SessionLocal
from app.models.user import User

db = SessionLocal()
user = db.query(User).filter(User.email == "shihab@test.com").first()

if user:
    print(f"User found: {user.username}")
    print(f"Hashed password in DB: {user.hashed_password}")
    
    password_to_test = "password123"
    try:
        is_match = verify_password(password_to_test, user.hashed_password)
        print(f"Password match for 'password123': {is_match}")
    except Exception as e:
        print(f"Error during verify_password: {e}")
else:
    print("User not found.")

db.close()
