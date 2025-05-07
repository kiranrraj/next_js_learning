# app/api/auth/signup.py
from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate
from app.database.mongo import db
from app.core.security import hash_password

# Create an instance of the router
router = APIRouter()

@router.post("/signup")
async def signup(user: UserCreate):
    # Check if the username already exists
    existing_user = await db["user"].find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # Hash the password before saving it
    hashed_pw = hash_password(user.password)

    # Create the user dictionary and add hashed password
    user_dict = user.dict()
    user_dict["password"] = hashed_pw

    # Insert the user into the MongoDB collection
    await db["user"].insert_one(user_dict)

    # Return success message
    return {"message": "User created successfully. Please sign in."}
