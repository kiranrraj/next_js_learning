# app/api/auth/signin.py
from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate
from app.database.mongo import db
from app.core.security import verify_password

router = APIRouter()

@router.post("/signin")
async def signin(user: UserCreate):
    # Find the user by username
    existing_user = await db["user"].find_one({"username": user.username})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    # Verify the password
    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    # Return a success message (you can return a JWT token or other data here)
    return {"message": f"Welcome {user.username}!"}
