from fastapi import APIRouter
from services.patients_1_services import get_all_patients_1

router = APIRouter()

@router.get("/patients1")
async def get_patients_1():
    patients = await get_all_patients_1()
    return {"patients": patients}
