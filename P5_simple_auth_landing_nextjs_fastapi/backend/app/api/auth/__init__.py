from fastapi import APIRouter
from app.api.auth import signup, signin

router = APIRouter()
router.include_router(signup.router)
router.include_router(signin.router)
