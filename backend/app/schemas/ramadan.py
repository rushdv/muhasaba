from pydantic import BaseModel, Field
from datetime import date
from typing import List, Optional

class RamadanReportBase(BaseModel):
    day_number: int = Field(..., ge=1, le=30)
    is_fasting: bool = False
    
    # Salat (Farz)
    salah_fajr: bool = False
    salah_dhuhr: bool = False
    salah_asr: bool = False
    salah_maghrib: bool = False
    salah_isha: bool = False
    taraweeh: bool = False
    tahajjud: bool = False
    duha: bool = False

    # Sunnat/Nawafil
    sunnat_fajr: bool = False
    sunnat_dhuhr: bool = False
    sunnat_asr: bool = False
    sunnat_maghrib: bool = False
    sunnat_isha: bool = False

    # Quran Tracker
    quran_para: Optional[int] = None
    quran_page: Optional[int] = None
    quran_ayat: Optional[int] = None
    quran_progress: Optional[str] = None

    # Daily Checklist
    sokal_er_zikr: bool = False
    shondha_er_zikr: bool = False
    had_sadaqah: bool = False
    daily_task: bool = False
    jamaat_salat: bool = False
    istighfar_70: bool = False
    quran_translation: bool = False
    allahur_naam_shikkha: bool = False
    diner_ayat_shikkha: bool = False
    diner_hadith_shikkha: bool = False
    miswak: bool = False
    calling_relative: bool = False
    learning_new: bool = False

    # Metrics
    spiritual_energy: int = Field(5, ge=1, le=10)
    reflection_note: Optional[str] = None

class RamadanReportCreate(RamadanReportBase):
    pass

class RamadanReportResponse(RamadanReportBase):
    id: int
    user_id: int
    log_date: date

    class Config:
        from_attributes = True

class RamadanAnalytics(BaseModel):
    total_fasted_days: int
    salah_consistency_percentage: float
    quran_summary: List[str]
    total_names_memorized: int # Multiplied by 3 per day
    avg_spiritual_energy: float
    total_sadaqah_days: int
    highlight_text: str

class SpiritualContent(BaseModel):
    day: int
    ayat: dict
    hadith: str
    dua: dict
    names: List[dict]
