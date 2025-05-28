from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class RolePermissions(BaseModel):
    id: Optional[str]
    role: str
    permissions: List[str]
    created_at: Optional[datetime]

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat() if v else None,
            ObjectId: str  # Convert ObjectId to string
        }
