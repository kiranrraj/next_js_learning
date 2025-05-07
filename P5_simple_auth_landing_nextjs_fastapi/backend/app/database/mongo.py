
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "health_dashboard"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")  # Pydantic v2 way

settings = Settings()

client = AsyncIOMotorClient(settings.MONGODB_URI)
# Reference to the database
db: AsyncIOMotorDatabase = client[settings.DB_NAME]
