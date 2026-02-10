from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Fallback to local sqlite for development awareness
    DATABASE_URL = "sqlite:///./test.db"
    print("WARNING: DATABASE_URL not set, falling back to SQLite.")

# SQLAlchemy Engine creation
# For Postgres on Fly.io, we use psycopg2-binary
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()