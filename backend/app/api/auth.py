from fastapi import APIRouter, Depends, HTTPException, status
import os
from dotenv import load_dotenv
load_dotenv()
import secrets
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, Token, UserLogin
from app.auth.security import hash_password, verify_password
from app.auth.jwt import create_access_token
from app.db.database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=Token)
def signup(user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )

    new_user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hash_password(user_in.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


from pydantic import BaseModel

class GoogleAuthRequest(BaseModel):
    token: str

@router.get("/google")
def google_auth_info():
    return {
        "status": "Ready",
        "instructions": "To enable Google Sign-in, ensure GOOGLE_CLIENT_ID is set in your backend .env file and matched in the frontend provider."
    }


@router.post("/google")
async def google_auth_callback(data: GoogleAuthRequest, db: Session = Depends(get_db)):
    try:
        # Verify the token
        google_client_id = os.getenv("GOOGLE_CLIENT_ID")
        # Verify the token
        google_client_id = os.getenv("GOOGLE_CLIENT_ID")
        
        if not google_client_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Google Client ID not configured"
            )

        id_info = id_token.verify_oauth2_token(
            data.token, 
            requests.Request(), 
            google_client_id,
            clock_skew_in_seconds=10
        )

        email = id_info.get("email")
        name = id_info.get("name")
        
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Google token: email not found"
            )

        # Check if user exists
        user = db.query(User).filter(User.email == email).first()

        if not user:
            # Create new user
            random_password = secrets.token_urlsafe(16)
            new_user = User(
                username=name or email.split("@")[0],
                email=email,
                hashed_password=hash_password(random_password)
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            user = new_user

        # Generate JWT token
        token = create_access_token({"sub": user.email})
        return {"access_token": token, "token_type": "bearer"}

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Google token: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Google authentication failed: {str(e)}"
        )
