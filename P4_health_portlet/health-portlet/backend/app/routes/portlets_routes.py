from fastapi import APIRouter
from services.portlets_services import get_all_portlets

router = APIRouter()

@router.get("/portlets")
async def get_portlets():
    portlets = await get_all_portlets()
    return {"portlets": portlets}
