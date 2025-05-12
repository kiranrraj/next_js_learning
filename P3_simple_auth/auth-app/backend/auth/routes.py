# auth/routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from database.mongo import db
from auth.models import User, UserInDB, LoginResponse
from auth.jwt_utils import create_access_token
from auth.password_utils import verify_password

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        user_in_db = await db["users"].find_one({"username": form_data.username})
        print(f"Attempting to log in with username: {form_data.username}")
        
        if not user_in_db:
            print(f"ERROR: User {form_data.username} not found in database")
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

        user = UserInDB(**user_in_db)
        print(f"User {form_data.username} found, verifying password.")

        if not verify_password(form_data.password, user.hashed_password):
            print(f"ERROR: Incorrect password for {form_data.username}")
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

        access_token = create_access_token(data={"sub": user.username}, expires_delta=timedelta(minutes=30))
        print(f"User {form_data.username} successfully logged in, token generated.")
        
        return LoginResponse(access_token=access_token, token_type="bearer", user=User(username=user.username, role=user.role, accessible_portlets=user.accessible_portlets))

    except Exception as e:
        print(f"ERROR: Unexpected error: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error during login")
