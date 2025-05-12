from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from typing import List

# FastAPI application initialization
app = FastAPI()

# Configure CORS to allow requests from frontend (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB client and database setup
client = MongoClient("mongodb://localhost:27017")  # Make sure MongoDB is running on default port
db = client["health_dashboard"]
patients_collection = db["patients_1"]  # Your MongoDB collection name

# Pydantic model to structure the response data
class Patient(BaseModel):
    id: str
    name: str
    contact: str
    address: str
    created_at: str

# Helper function to serialize MongoDB ObjectId to string
def patient_serializer(patient) -> dict:
    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "contact": patient["contact"],
        "address": patient["address"],
        "created_at": patient["created_at"].isoformat(),  # Convert datetime to string
    }

# Route to get all patients from MongoDB
@app.get("/patients", response_model=List[Patient])
async def get_patients():
    try:
        # Fetch all patient records from the MongoDB collection
        patients_cursor = patients_collection.find()
        patients = [patient_serializer(patient) for patient in patients_cursor]
        return patients
    except Exception as e:
        return {"message": f"Error fetching patients: {str(e)}"}

