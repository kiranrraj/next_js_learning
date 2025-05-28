from db.connection import db
from models.role_permissions_model import RolePermissions

def serialize_role_permissions(role_permissions) -> dict:
    return {
        "id": str(role_permissions["_id"]),
        "role": role_permissions.get("role"),
        "permissions": role_permissions.get("permissions"),
        "created_at": role_permissions.get("created_at").isoformat() if role_permissions.get("created_at") else None
    }

async def get_all_role_permissions():
    role_permissions_cursor = db["role_permissions"].find()
    role_permissions = await role_permissions_cursor.to_list(100)
    return [serialize_role_permissions(role_permissions) for role_permissions in role_permissions]
