from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import os
import secrets

from google.oauth2 import id_token
from google.auth.transport import requests

from app.models.user import User
from app.schemas.user import UserCreate, Token, UserLogin
from app.auth.security import hash_password, verify_password
from app.auth.jwt import create_access_token
from app.db.database import get_db

# ⚠️ NO prefix here (prefix থাকবে main.py তে)
router = APIRouter(tags=["auth"])


# =========================
# Normal Signup
# =========================
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


# =========================
# Normal Login
# =========================
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


# =========================
# Google Auth
# =========================
class GoogleAuthRequest(BaseModel):
    token: str


@router.post("/google", response_model=Token)
def google_auth(data: GoogleAuthRequest, db: Session = Depends(get_db)):
    try:
        google_client_id = os.getenv("GOOGLE_CLIENT_ID")
        if not google_client_id:
            print("❌ CRITICAL: GOOGLE_CLIENT_ID is missing from environment!")
            raise Exception("GOOGLE_CLIENT_ID is not set in backend environment")

        google_client_id = google_client_id.strip()
        print(f"DEBUG: Using Google Client ID: {google_client_id[:10]}...{google_client_id[-10:]}")
        print(f"DEBUG: Received token (first 20 chars): {data.token[:20]}...")

        # Basic verification - with clock skew allowance
        try:
            id_info = id_token.verify_oauth2_token(
                data.token,
                requests.Request(),
                audience=google_client_id,
                clock_skew_in_seconds=20 # Increased skew
            )
            print("✅ Token verified successfully with audience check")
        except ValueError as ve:
            print(f"⚠️ Initial verification failed: {ve}. Attempting loose verification...")
            # Try without audience to see what's inside
            id_info = id_token.verify_oauth2_token(
                data.token,
                requests.Request(),
                clock_skew_in_seconds=20
            )
            actual_aud = id_info.get('aud')
            print(f"DEBUG: Token audience: {actual_aud}")
            print(f"DEBUG: Expected audience: {google_client_id}")
            
            if actual_aud != google_client_id:
                raise ValueError(f"Audience mismatch. Token has '{actual_aud}' but backend expects '{google_client_id}'")

        email = id_info.get("email")
        name = id_info.get("name") or id_info.get("given_name")

        if not email:
            raise Exception("No email found in Google ID token")

        user = db.query(User).filter(User.email == email).first()

        if not user:
            print(f"DEBUG: Creating new user for email: {email}")
            base_username = name or email.split("@")[0]
            username = base_username

            if db.query(User).filter(User.username == username).first():
                username = f"{base_username}_{secrets.token_hex(3)}"

            user = User(
                username=username,
                email=email,
                hashed_password=hash_password(secrets.token_urlsafe(12))
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        token = create_access_token({"sub": user.email})
        return {"access_token": token, "token_type": "bearer"}

    except Exception as e:
        error_msg = str(e)
        print(f"🔥 GOOGLE AUTH ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Google Authentication Failed: {error_msg}"
        )
