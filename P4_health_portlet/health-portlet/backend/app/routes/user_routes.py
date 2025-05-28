from fastapi import APIRouter
from services.user_services import get_all_users

router = APIRouter()

@router.get("/users", tags=["Users"])
async def read_users():
    return await get_all_users()
