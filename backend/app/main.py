from fastapi import FastAPI
from app.api import auth
from app.api import muhasaba


app = FastAPI(title="Muhasaba API")
app.include_router(muhasaba.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"status": "ok"}
