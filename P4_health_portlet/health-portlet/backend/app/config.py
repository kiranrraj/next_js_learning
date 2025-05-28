from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "your-secret-key"
    DATABASE_URL: str = "mongodb://localhost:27017"
    DB_NAME: str = "health_dashboard"

    class Config:
        env_file = ".env" 

settings = Settings()
