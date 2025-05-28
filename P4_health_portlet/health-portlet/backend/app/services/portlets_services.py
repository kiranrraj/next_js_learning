from db.connection import db
from models.portlets_model import Portlet

def serialize_portlet(portlet) -> dict:
    return {
        "id": portlet.get("_id"),
        "title": portlet.get("title"),
        "description": portlet.get("description"),
        "data_collection": portlet.get("data_collection"),
        "is_default": portlet.get("is_default"),
        "created_at": portlet.get("created_at").isoformat() if portlet.get("created_at") else None
    }

async def get_all_portlets():
    portlets_cursor = db["portlets"].find()
    portlets = await portlets_cursor.to_list(100)
    return [serialize_portlet(portlet) for portlet in portlets]
