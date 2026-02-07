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
def create_log(
    log: MuhasabaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_log = MuhasabaLog(**log.model_dump(), user_id=current_user.id)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log


@router.get("/", response_model=List[MuhasabaResponse])
def get_my_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(MuhasabaLog)
        .filter(MuhasabaLog.user_id == current_user.id)
        .order_by(MuhasabaLog.log_date.desc())
        .all()
    )


@router.patch("/{log_id}", response_model=MuhasabaResponse)
def update_log_status(
    log_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    log = (
        db.query(MuhasabaLog)
        .filter(
            MuhasabaLog.id == log_id,
            MuhasabaLog.user_id == current_user.id,
        )
        .first()
    )
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")

    log.is_completed = not log.is_completed
    db.commit()
    db.refresh(log)
    return log


@router.delete("/{log_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_log(
    log_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    log = (
        db.query(MuhasabaLog)
        .filter(
            MuhasabaLog.id == log_id,
            MuhasabaLog.user_id == current_user.id,
        )
        .first()
    )
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")

    db.delete(log)
    db.commit()
