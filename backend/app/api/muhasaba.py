from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.muhasaba import MuhasabaLog
from app.schemas.muhasaba import MuhasabaCreate, MuhasabaResponse
from app.auth.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/muhasaba", tags=["muhasaba"])

@router.post("/", response_model=MuhasabaResponse)
def create_log(log: MuhasabaCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # নতুন লগ তৈরি করা এবং বর্তমান ইউজারের সাথে লিংক করা
    new_log = MuhasabaLog(**log.model_dump(), user_id=current_user.id)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log

@router.get("/", response_model=List[MuhasabaResponse])
def get_my_logs(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # শুধুমাত্র এই ইউজারের লগগুলো রিটার্ন করবে
    return db.query(MuhasabaLog).filter(MuhasabaLog.user_id == current_user.id).all()