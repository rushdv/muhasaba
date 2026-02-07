from fastapi import FastAPI

app = FastAPI(title="Muhasaba API")

@app.get("/")
def root():
    return {"status": "ok", "message": "Muhasaba backend running"}
