from pydantic import BaseModel
from datetime import date
from typing import Optional

class MuhasabaBase(BaseModel):
    task_name: str
    is_completed: bool = False
    log_date: date
    note: Optional[str] = None

class MuhasabaCreate(MuhasabaBase):
    pass

class MuhasabaResponse(MuhasabaBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True