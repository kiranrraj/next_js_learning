from pydantic import BaseModel, Field
from typing import List

class UserSignup(BaseModel):
    username: str
    password: str
    role: str
    accessible_portlets: List[str] = Field(default_factory=list)
