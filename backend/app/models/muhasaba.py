from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import date

class MuhasabaLog(Base):
    __tablename__ = "muhasaba_logs"

    id = Column(Integer, primary_key=True, index=True)
    task_name = Column(String, nullable=False)
    is_completed = Column(Boolean, default=False)
    log_date = Column(Date, default=date.today)
    note = Column(String, nullable=True)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="logs")
