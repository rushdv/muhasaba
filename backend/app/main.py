from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth
from app.api import muhasaba
from app.api import ramadan


app = FastAPI(title="Muhasaba API")

# CORS কনফিগারেশন
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # আপাতত ডেমোর জন্য সব এলাউ করা হয়েছে, প্রোডাকশনে স্পেসিফিক ইউআরএল দিতে হবে
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(muhasaba.router)
app.include_router(auth.router)
app.include_router(ramadan.router)

@app.get("/")
def root():
    return {"status": "ok"}
