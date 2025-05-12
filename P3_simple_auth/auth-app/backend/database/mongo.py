

from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

try:
    client = AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.DB_NAME]
    print(f"INFO: Connecting to MongoDB at: {settings.MONGO_URI}, database: {settings.DB_NAME}")
    client.admin.command('ismaster')
    print("INFO: Successfully connected to MongoDB.")
except Exception as e:
    print(f"ERROR: Could not connect to MongoDB: {e}")

