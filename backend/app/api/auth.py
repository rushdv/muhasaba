from fastapi import APIRouter, Depends, HTTPException, status
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
async def google_auth_callback(data: GoogleAuthRequest):
    # This is a placeholder for actual Google token verification
    # logic using google-auth-library
    return {
        "access_token": "placeholder_google_token",
        "token_type": "bearer",
        "message": "Google authentication successful (Placeholder)"
    }
