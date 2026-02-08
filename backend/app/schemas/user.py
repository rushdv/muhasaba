from pydantic import BaseModel, EmailStr
from typing import Optional

# Data sent during user registration
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# User details shown in API response (excluding password)
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool

    class Config:
        from_attributes = True

# Token provided after successful login
class Token(BaseModel):
    access_token: str
    token_type: str

# Data inside the token
class TokenData(BaseModel):
    username: Optional[str] = None