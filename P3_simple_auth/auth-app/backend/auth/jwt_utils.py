# auth/jwt_utils.py
import jwt
import datetime
from typing import Optional
from config import settings

# Create a JWT token
def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None):
    to_encode = data.copy()
    now = datetime.datetime.now(datetime.timezone.utc)

    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = None
    try:
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        print(f"DEBUG: Successfully created JWT token for data: {data}")
    except jwt.PyJWTError as e:
        print(f"ERROR: Error encoding JWT token: {e}")
    except Exception as e:
        print(f"ERROR: An unexpected error occurred during JWT encoding: {e}")
    return encoded_jwt

# Verify JWT token
def verify_token(token: str):
    payload = None
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        print(f"DEBUG: Successfully decoded JWT token. Payload: {payload}")
        return payload
    except jwt.ExpiredSignatureError:
        print("ERROR: JWT token has expired.")
        return None
    except jwt.InvalidSignatureError:
        print("ERROR: Invalid signature in JWT token.")
        return None
    except jwt.InvalidAlgorithmError:
        print("ERROR: Invalid algorithm specified in JWT token.")
        return None
    except jwt.DecodeError:
        print("ERROR: Could not decode JWT token. It might be malformed.")
        return None
    except jwt.PyJWTError as e:
        print(f"ERROR: A general JWT error occurred during verification: {e}")
        return None
    except Exception as e:
        print(f"ERROR: An unexpected error occurred during JWT verification: {e}")
        return None