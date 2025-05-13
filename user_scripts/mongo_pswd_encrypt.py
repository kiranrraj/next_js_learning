import asyncio
import bcrypt
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "health_dashboard"
COLLECTION = "users"

async def fix_password_fields():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    users = db[COLLECTION]

    cursor = users.find({})
    async for user in cursor:
        if "password" in user:
            plaintext = user["password"]
            hashed = bcrypt.hashpw(plaintext.encode(), bcrypt.gensalt()).decode()
            await users.update_one(
                {"_id": user["_id"]},
                {
                    "$set": {"hashed_password": hashed},
                    "$unset": {"password": ""}
                }
            )
            print(f" Updated user '{user['username']}'")

    print("All users updated successfully.")
    client.close()  # <- FIXED: don't use await

asyncio.run(fix_password_fields())
