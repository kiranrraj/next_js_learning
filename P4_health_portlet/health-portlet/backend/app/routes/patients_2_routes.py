from fastapi import APIRouter
from services.patients_2_services import get_all_patients_2

router = APIRouter()

@router.get("/patients2")
async def get_patients_2():
    patients = await get_all_patients_2()
    return {"patients": patients}
