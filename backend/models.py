from sqlalchemy import Column, Integer, String, Date, JSON, Text
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class DailyLog(Base):
    __tablename__ = "daily_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    date = Column(Date, unique=True, index=True)
    prayers = Column(JSON)  # e.g., {"fajr": true, "dhuhr": true, ...}
    quran_pages = Column(Integer, default=0)
    sunnah_habits = Column(JSON) # e.g., {"dhikr": true, "dua": true}
    notes = Column(Text, nullable=True)
    mood = Column(String, nullable=True)
