from db.connection import db
from models.user_model import User

def serialize_user(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user.get("username"),
        "role": user.get("role"),
        "accessible_portlets": user.get("accessible_portlets", []),
        "created_at": user.get("created_at").isoformat() if user.get("created_at") else None
    }

async def get_all_users():
    users_cursor = db["users"].find()
    users = await users_cursor.to_list(100)
    serialized_users = []
    for user in users:
        serialized_user = serialize_user(user)
        serialized_users.append(serialized_user)

    return serialized_users
