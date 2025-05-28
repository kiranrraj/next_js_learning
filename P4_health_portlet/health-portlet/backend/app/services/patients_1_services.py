from db.connection import db
from models.patients_1_model import Patient1

def serialize_patient(patient) -> dict:
    return {
        "id": str(patient["_id"]),
        "name": patient.get("name"),
        "contact": patient.get("contact"),
        "address": patient.get("address"),
        "created_at": patient.get("created_at").isoformat() if patient.get("created_at") else None
    }

# Fetch all patients from the patients_1 collection
async def get_all_patients_1():
    patients_cursor = db["patients_1"].find()
    patients = await patients_cursor.to_list(100)  # Limit to 100 results, we need to do pagination later 
    return [serialize_patient(patient) for patient in patients]
