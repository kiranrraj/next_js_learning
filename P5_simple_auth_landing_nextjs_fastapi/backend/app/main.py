from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.auth.signup import router as signup_router
from app.api.auth.signin import router as signin_router
from fastapi.routing import APIRoute
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from slowapi import Limiter
from slowapi.util import get_remote_address
from redis import Redis
import logging, os
from pydantic_settings import BaseSettings, SettingsConfigDict  # Changed import
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# PydanticSettings class to load settings from environment variables
class Settings(BaseSettings):
    MONGODB_URI: str
    DB_NAME: str
    ENV: str = "development"  # Default to 'development' if not provided

    model_config = SettingsConfigDict(env_file=".env", extra="ignore") 

# Initialize settings and MongoDB client
settings = Settings()
client = MongoClient(settings.MONGODB_URI)
db = client[settings.DB_NAME]

# FastAPI app initialization
app = FastAPI()

# Initialize Redis connection for rate limiting
redis = Redis(host='localhost', port=6379, db=0)

# Initialize Limiter
limiter = Limiter(key_func=get_remote_address)

# Define allowed origins securely
# ALLOWED_ORIGINS = [
#     "https://productionsite.com", 
#     "https://productionsite2.com",          
# ]

# # Use localhost for development only
# if settings.ENV == "development":
#     ALLOWED_ORIGINS.append("http://localhost:3000")

# Apply CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

# Registering the routers
app.include_router(signup_router, prefix="/api/auth")
app.include_router(signin_router, prefix="/api/auth")

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to the FastAPI backend!",
        "available_endpoints": [
            "/api/auth/signup - Register a new user",
            "/api/auth/signin - Sign in with existing credentials",
            "/health - Check if the server is alive",
            "/debug - Check available routes",
            "/test-mongo - Test MongoDB connection"
        ],
    }

@app.get("/health")
async def health_check():
    return {"status": "OK"}

@app.get("/debug")
async def debug_routes():
    routes = [{"path": route.path, "methods": list(route.methods)} for route in app.routes if isinstance(route, APIRoute)]
    return {"routes": routes}

@app.get("/test-mongo")
async def test_mongo_connection():
    try:
        client = MongoClient(settings.MONGO_URI)
        db = client[settings.DB_NAME]
        db.command("ping")
        return {"status": "success", "message": "Connected to MongoDB successfully"}
    except ServerSelectionTimeoutError as e:
        logger.error(f"MongoDB Connection Error: {str(e)}")
        raise HTTPException(status_code=500, detail="MongoDB connection failed")
    except Exception as e:
        logger.error(f"Unexpected Error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while testing MongoDB connection")

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    logger.error(f"HTTP Exception: {exc.detail} - Path: {request.url.path}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "path": request.url.path,
            "status_code": exc.status_code
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unexpected Error: {str(exc)} - Path: {request.url.path}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "An unexpected error occurred.",
            "path": request.url.path,
            "status_code": 500
        }
    )
