import logging
from fastapi import APIRouter, HTTPException
from app.models.user import UserSignup, UserLogin
from app.db.mongo import db_client
from app.utils.security import hash_password, verify_password
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])
logger = logging.getLogger(__name__)

@router.post("/signup")
async def signup(user: UserSignup):
    logger.info(f"Signup attempt for user: {user.username}")
    existing_user = await db_client.health_dashboard.users.find_one({"username": user.username})
    if existing_user:
        logger.warning(f"User {user.username} already exists.")
        raise HTTPException(status_code=400, detail="Username already exists")

    user_doc = {
        "username": user.username,
        "password": hash_password(user.password),
        "role": user.role,
        "accessible_portlets": user.accessible_portlets,
        "created_at": datetime.utcnow()
    }

    await db_client.health_dashboard.users.insert_one(user_doc)
    logger.info(f"User {user.username} created successfully.")
    return {"message": "User created successfully"}

@router.post("/signin")
async def signin(user: UserLogin):
    logger.info(f"Signin attempt for user: {user.username}")
    user_doc = await db_client.health_dashboard.users.find_one({"username": user.username})
    if not user_doc:
        logger.warning(f"User {user.username} not found.")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not verify_password(user.password, user_doc["password"]):
        logger.warning(f"Incorrect password for user: {user.username}")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    logger.info(f"User {user.username} signed in successfully.")
    return {
        "message": "Login successful",
        "role": user_doc["role"],
        "accessible_portlets": user_doc["accessible_portlets"]
    }
