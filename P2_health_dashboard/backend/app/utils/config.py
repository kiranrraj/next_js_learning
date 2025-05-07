from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "health_dashboard")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
