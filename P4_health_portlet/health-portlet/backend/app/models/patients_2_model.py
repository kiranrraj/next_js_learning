from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Patient2(BaseModel):
    id: Optional[str]  # _id field, converted to string (This need to be converted into string, we cannot use Object)
    name: str
    contact: str
    address: str
    created_at: Optional[datetime]

    class Config:
        # To allow `datetime` fields to be serialized to JSON
        json_encoders = {
            datetime: lambda v: v.isoformat() if v else None
        }
