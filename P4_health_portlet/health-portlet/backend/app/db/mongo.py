from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.collection import Collection
from pymongo.database import Database
from app.utils.config import settings
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "health_dashboard")

# Global variables
db_client: AsyncIOMotorClient = None
db: Database = None

# Collections
users_collection: Collection = None
patients_collection: Collection = None
test_sites_collection: Collection = None
otp_collection: Collection = None

async def start():
    """Initialize the MongoDB connection."""
    global db_client, db, users_collection, patients_collection, test_sites_collection, otp_collection
    
    # Initialize the client and connect to the database
    db_client = AsyncIOMotorClient(MONGO_URI)
    db = db_client[MONGO_DB_NAME]
    
    # Initialize the collections
    users_collection = db["users"]
    patients_collection = db["patients"]
    test_sites_collection = db["test_sites"]
    otp_collection = db["otp"]

async def stop():
    """Close the MongoDB connection."""
    global db_client
    if db_client:
        db_client.close()
