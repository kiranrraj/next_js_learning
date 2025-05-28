from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class Portlet(BaseModel):
    id: str
    title: str
    description: str
    data_collection: str
    is_default: bool
    created_at: Optional[datetime]

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat() if v else None
        }
