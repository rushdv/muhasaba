from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas
from database import SessionLocal, engine, get_db
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Muhasaba API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Muhasaba API"}

@app.get("/logs/", response_model=List[schemas.DailyLog])
def read_logs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    logs = crud.get_daily_logs(db, skip=skip, limit=limit)
    return logs

@app.post("/logs/", response_model=schemas.DailyLog)
def create_log(log: schemas.DailyLogCreate, db: Session = Depends(get_db)):
    db_log = crud.get_daily_log(db, date_str=log.date)
    if db_log:
        return crud.update_daily_log(db, log_id=db_log.id, log=log)
    return crud.create_daily_log(db, log=log)

@app.get("/logs/{date}", response_model=schemas.DailyLog)
def read_log(date: str, db: Session = Depends(get_db)):
    db_log = crud.get_daily_log(db, date_str=date)
    if db_log is None:
        raise HTTPException(status_code=404, detail="Log not found")
    return db_log
