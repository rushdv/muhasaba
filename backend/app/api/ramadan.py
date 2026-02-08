from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from app.db.database import get_db
from app.auth.deps import get_current_user
from app.models.user import User
from app.models.ramadan import RamadanReport
from app.schemas.ramadan import RamadanReportCreate, RamadanReportResponse, RamadanAnalytics, SpiritualContent
from app.data.ramadan_content import get_ramadan_day_content

router = APIRouter(prefix="/ramadan", tags=["ramadan"])

@router.get("/content/{day}", response_model=SpiritualContent)
def get_content(day: int):
    content = get_ramadan_day_content(day)
    if not content:
        raise HTTPException(status_code=404, detail="Content not found for this day")
    return {"day": day, **content}

@router.post("/report", response_model=RamadanReportResponse)
def upsert_report(
    report_in: RamadanReportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if report already exists for this day and user
    db_report = db.query(RamadanReport).filter(
        RamadanReport.user_id == current_user.id,
        RamadanReport.day_number == report_in.day_number
    ).first()

    if db_report:
        # Update existing
        for field, value in report_in.model_dump().items():
            setattr(db_report, field, value)
        db_report.log_date = date.today()
    else:
        # Create new
        db_report = RamadanReport(
            **report_in.model_dump(),
            user_id=current_user.id,
            log_date=date.today()
        )
        db.add(db_report)
    
    db.commit()
    db.refresh(db_report)
    return db_report

@router.get("/history", response_model=List[RamadanReportResponse])
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(RamadanReport).filter(
        RamadanReport.user_id == current_user.id
    ).order_by(RamadanReport.day_number.asc()).all()

@router.get("/analytics", response_model=RamadanAnalytics)
def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    reports = db.query(RamadanReport).filter(RamadanReport.user_id == current_user.id).all()
    
    if not reports:
        return {
            "total_fasted_days": 0,
            "salah_consistency_percentage": 0.0,
            "quran_summary": [],
            "total_names_memorized": 0,
            "avg_spiritual_energy": 0.0,
            "total_sadaqah_days": 0,
            "highlight_text": "Start your journey today!"
        }

    total_days = len(reports)
    fasted_days = sum(1 for r in reports if r.is_fasting)
    
    salah_count = 0
    for r in reports:
        salah_count += sum([r.salah_fajr, r.salah_dhuhr, r.salah_asr, r.salah_maghrib, r.salah_isha])
    
    salah_consistency = (salah_count / (total_days * 5)) * 100 if total_days > 0 else 0
    
    quran_list = []
    for r in reports:
        if r.quran_para or r.quran_page or r.quran_ayat:
            parts = []
            if r.quran_para: parts.append(f"Para {r.quran_para}")
            if r.quran_page: parts.append(f"Page {r.quran_page}")
            if r.quran_ayat: parts.append(f"Ayat {r.quran_ayat}")
            quran_list.append(", ".join(parts))
        elif r.quran_progress:
            quran_list.append(r.quran_progress)
            
    names_memorized = sum(3 for r in reports if r.allahur_naam_shikkha)
    avg_energy = sum(r.spiritual_energy for r in reports) / total_days
    sadaqah_days = sum(1 for r in reports if r.had_sadaqah)

    return {
        "total_fasted_days": fasted_days,
        "salah_consistency_percentage": round(salah_consistency, 1),
        "quran_summary": quran_list[-5:], # Last 5 updates
        "total_names_memorized": names_memorized,
        "avg_spiritual_energy": round(avg_energy, 1),
        "total_sadaqah_days": sadaqah_days,
        "highlight_text": f"Masha'Allah! You have completed a spiritual journey of {total_days} days."
    }
