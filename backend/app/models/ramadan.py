from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, Text, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import date

class RamadanReport(Base):
    __tablename__ = "ramadan_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    day_number = Column(Integer, nullable=False) # 1-30
    log_date = Column(Date, default=date.today)

    # Core Ibadah (Farz)
    is_fasting = Column(Boolean, default=False)
    salah_fajr = Column(Boolean, default=False)
    salah_dhuhr = Column(Boolean, default=False)
    salah_asr = Column(Boolean, default=False)
    salah_maghrib = Column(Boolean, default=False)
    salah_isha = Column(Boolean, default=False)
    taraweeh = Column(Boolean, default=False)
    tahajjud = Column(Boolean, default=False)
    duha = Column(Boolean, default=False)
    tahiyatul_masjid = Column(Boolean, default=False)
    tahiyatul_wudu = Column(Boolean, default=False)

    # Sunnat/Nawafil
    sunnat_fajr = Column(Boolean, default=False)
    sunnat_dhuhr = Column(Boolean, default=False)
    sunnat_asr = Column(Boolean, default=False)
    sunnat_maghrib = Column(Boolean, default=False)
    sunnat_isha = Column(Boolean, default=False)

    # Quran Tracker (Specific Fields)
    quran_para = Column(Integer, nullable=True)
    quran_page = Column(Integer, nullable=True)
    quran_ayat = Column(Integer, nullable=True)
    quran_progress = Column(String, nullable=True) # General notes

    # Daily Checklist (Expanded)
    sokal_er_zikr = Column(Boolean, default=False)
    shondha_er_zikr = Column(Boolean, default=False)
    had_sadaqah = Column(Boolean, default=False)
    daily_task = Column(Boolean, default=False)
    jamaat_salat = Column(Boolean, default=False)
    istighfar_70 = Column(Boolean, default=False)
    quran_translation = Column(Boolean, default=False)
    allahur_naam_shikkha = Column(Boolean, default=False)
    diner_ayat_shikkha = Column(Boolean, default=False)
    diner_hadith_shikkha = Column(Boolean, default=False)
    miswak = Column(Boolean, default=False)
    calling_relative = Column(Boolean, default=False)
    learning_new = Column(Boolean, default=False)

    # Metrics
    spiritual_energy = Column(Integer, default=5) # 1-10
    reflection_note = Column(Text, nullable=True)

    # Relationships
    owner = relationship("User", back_populates="ramadan_reports")

    __table_args__ = (
        UniqueConstraint('user_id', 'day_number', name='_user_day_uc'),
        CheckConstraint('spiritual_energy >= 1 AND spiritual_energy <= 10', name='energy_range'),
    )
