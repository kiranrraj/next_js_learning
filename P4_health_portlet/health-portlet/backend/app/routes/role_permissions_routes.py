from fastapi import APIRouter
from services.role_permissions_services import get_all_role_permissions

router = APIRouter()

@router.get("/role-permissions")
async def get_role_permissions():
    role_permissions = await get_all_role_permissions()
    return {"role_permissions": role_permissions}
