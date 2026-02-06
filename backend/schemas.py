from pydantic import BaseModel
from datetime import date
from typing import Dict, Optional

class DailyLogBase(BaseModel):
    date: date
    prayers: Dict[str, bool]
    quran_pages: int
    sunnah_habits: Dict[str, bool]
    notes: Optional[str] = None
    mood: Optional[str] = None

class DailyLogCreate(DailyLogBase):
    pass

class DailyLog(DailyLogBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True
