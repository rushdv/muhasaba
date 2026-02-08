from pydantic import BaseModel, EmailStr
from typing import Optional

# ইউজার রেজিস্ট্রেশনের সময় যা যা পাঠাবে
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# এপিআই রেসপন্স হিসেবে ইউজারকে যা যা দেখাবো (পাসওয়ার্ড ছাড়া)
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool

    class Config:
        from_attributes = True

# লগইন সফল হলে যে টোকেন দেবো
class Token(BaseModel):
    access_token: str
    token_type: str

# টোকেনের ভেতরকার ডাটা (পরবর্তীতে লাগবে)
class TokenData(BaseModel):
    username: Optional[str] = None