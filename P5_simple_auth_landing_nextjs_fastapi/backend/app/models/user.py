from pydantic import BaseModel, Field
from typing import List, Annotated

# Used for sign-in
class UserLogin(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]
    password: Annotated[str, Field(min_length=6, max_length=100)]

# Used for sign-up / registration
class UserCreate(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]
    password: Annotated[str, Field(min_length=6, max_length=100)]
    role: Annotated[str, Field(min_length=3)]
    accessible_portlets: Annotated[List[str], Field(default_factory=list)]
