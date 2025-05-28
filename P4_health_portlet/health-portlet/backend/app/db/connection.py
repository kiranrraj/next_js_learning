from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

client = AsyncIOMotorClient(settings.DATABASE_URL)
db = client[settings.DB_NAME]

print(db)
