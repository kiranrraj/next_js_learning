from pydantic import BaseModel
from typing import List

class UserSignup(BaseModel):
    username: str
    password: str
    role: str
    accessible_portlets: List[str]

class UserLogin(BaseModel):
    username: str
    password: str
