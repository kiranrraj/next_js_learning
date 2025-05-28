from fastapi import APIRouter
from services.pharma_test_centers_services import get_all_pharma_test_centers

router = APIRouter()

@router.get("/pharma-test-centers")
async def get_pharma_test_centers():
    centers = await get_all_pharma_test_centers()
    return {"pharma_test_centers": centers}
