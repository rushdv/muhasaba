from sqlalchemy.orm import Session
import models, schemas

def get_daily_log(db: Session, date_str: str):
    return db.query(models.DailyLog).filter(models.DailyLog.date == date_str).first()

def get_daily_logs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.DailyLog).offset(skip).limit(limit).all()

def create_daily_log(db: Session, log: schemas.DailyLogCreate, user_id: int = 1):
    db_log = models.DailyLog(**log.model_dump(), user_id=user_id)
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

def update_daily_log(db: Session, log_id: int, log: schemas.DailyLogCreate):
    db_log = db.query(models.DailyLog).filter(models.DailyLog.id == log_id).first()
    if db_log:
        for key, value in log.model_dump().items():
            setattr(db_log, key, value)
        db.commit()
        db.refresh(db_log)
    return db_log
