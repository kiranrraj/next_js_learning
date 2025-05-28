from fastapi import APIRouter
from services.patients_3_services import get_all_patients_3

router = APIRouter()

@router.get("/patients3")
async def get_patients_3():
    patients = await get_all_patients_3()
    return {"patients": patients}
