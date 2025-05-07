from fastapi import FastAPI
from app.db.mongo import start, stop
from contextlib import asynccontextmanager
from app.routes.auth.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting MongoDB connection...")
    await start()
    logger.info("MongoDB connection started.")
    yield
    logger.info("Stopping MongoDB connection...")
    await stop()
    logger.info("MongoDB connection stopped.")

app = FastAPI(lifespan=lifespan)

# Register routes
app.include_router(auth_router)

print("Routes:")
for route in app.routes:
    print(route.path)


@app.get("/")
async def home():
    logger.info("Root endpoint accessed.")
    return {"message": "Welcome to the health portal!"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
