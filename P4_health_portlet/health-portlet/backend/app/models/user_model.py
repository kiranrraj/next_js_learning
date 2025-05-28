from pydantic import BaseModel
from typing import List, Optional

class User(BaseModel):
    id: Optional[str]
    username: str
    role: str
    accessible_portlets: List[str]
    created_at: Optional[str]  
