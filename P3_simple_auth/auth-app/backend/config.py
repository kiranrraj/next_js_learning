from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "health_dashboard"
    SECRET_KEY: str = "your_secret_key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env" 
        case_sensitive = True

try:
    settings = Settings()
    print(f"DEBUG: Loaded Settings: {settings.model_dump()}")
except Exception as e:
    print(f"ERROR: Error loading settings: {e}")