from fastapi import APIRouter, HTTPException
from app.models.user import UserSignup
from app.db.mongo import users_collection
from app.utils.security import hash_password
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup")
def signup(user: UserSignup):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    user_doc = {
        "username": user.username,
        "password": hash_password(user.password),
        "role": user.role,
        "accessible_portlets": user.accessible_portlets,
        "created_at": datetime.now()
    }
    
    users_collection.insert_one(user_doc)
    return {"message": "User created successfully"}
