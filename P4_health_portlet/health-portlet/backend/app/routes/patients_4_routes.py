from fastapi import APIRouter
from services.patients_4_services import get_all_patients_4

router = APIRouter()

@router.get("/patients4")
async def get_patients_4():
    patients = await get_all_patients_4()
    return {"patients": patients}
