import sys
import os
sys.path.append(os.getcwd())

from app.db.database import SessionLocal
from app.models.user import User

db = SessionLocal()
users = db.query(User).all()
if not users:
    print("NO USERS FOUND")
else:
    for u in users:
        print(f"User: {u.username}, Email: {u.email}")
db.close()
