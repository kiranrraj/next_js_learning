from pydantic import BaseModel, Field
from typing import List

class User(BaseModel):
    username: str
    role: str
    accessible_portlets: List[str]

class UserInDB(User):
    hashed_password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: User
