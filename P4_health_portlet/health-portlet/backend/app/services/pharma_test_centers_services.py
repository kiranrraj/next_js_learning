from db.connection import db
from models.pharma_test_centers_model import PharmaTestCenter

def serialize_pharma_test_center(center) -> dict:
    return {
        "id": str(center["_id"]),
        "name": center.get("name"),
        "location": center.get("location"),
        "contact": center.get("contact"),
        "created_at": center.get("created_at").isoformat() if center.get("created_at") else None
    }

async def get_all_pharma_test_centers():
    centers_cursor = db["pharma_test_centers"].find()
    centers = await centers_cursor.to_list(100)
    return [serialize_pharma_test_center(center) for center in centers]
