from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# get_current_user dependency can be added here later
