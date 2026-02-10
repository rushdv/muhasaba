from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth
from app.api import muhasaba
from app.api import ramadan

from app.db.database import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Muhasabah API")

# =========================
# CORS Configuration
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://muhasabah.vercel.app",  # frontend
        "http://localhost:5173",         # local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Routers
# =========================

# Auth routes
# /api/auth/login
# /api/auth/signup
# /api/auth/google
app.include_router(auth.router, prefix="/api/auth")

# Other API routes
app.include_router(muhasaba.router, prefix="/api")
app.include_router(ramadan.router, prefix="/api")

# =========================
# Health Check
# =========================
@app.get("/")
def root():
    return {"status": "ok"}
