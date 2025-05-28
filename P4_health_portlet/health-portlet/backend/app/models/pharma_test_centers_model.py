from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class PharmaTestCenter(BaseModel):
    id: Optional[str]
    name: str
    location: str
    contact: str
    created_at: Optional[datetime]

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat() if v else None
        }
