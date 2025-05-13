from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["health_dashboard"]

now = datetime.now()

# 1. Insert Portlets
portlet_data = [
    {
        "_id": "portlet1",
        "title": "Patients Portlet 1",
        "description": "Patient record set 1",
        "data_collection": "patients_1",
        "is_default": True,
        "created_at": now,
    },
    {
        "_id": "portlet2",
        "title": "Patients Portlet 2",
        "description": "Patient record set 2",
        "data_collection": "patients_2",
        "is_default": True,
        "created_at": now,
    },
    {
        "_id": "portlet3",
        "title": "Patients Portlet 3",
        "description": "Patient record set 3",
        "data_collection": "patients_3",
        "is_default": True,
        "created_at": now,
    },
    {
        "_id": "portlet4",
        "title": "Patients Portlet 4",
        "description": "Patient record set 4",
        "data_collection": "patients_4",
        "is_default": True,
        "created_at": now,
    },
    {
        "_id": "portlet5",
        "title": "Pharma Test Centers",
        "description": "Pharmaceutical testing locations",
        "data_collection": "pharma_test_centers",
        "is_default": True,
        "created_at": now,
    }
]
db.portlets.delete_many({})
db.portlets.insert_many(portlet_data)

# 2. Insert Roles & Permissions
roles_permissions = [
    {
        "role": "admin",
        "permissions": ["read", "write", "delete", "update"],
        "created_at": now,
    },
    {
        "role": "doctor",
        "permissions": ["read", "update"],
        "created_at": now,
    },
    {
        "role": "pharmaCenter",
        "permissions": ["read"],
        "created_at": now,
    },
    {
        "role": "developer",
        "permissions": ["read", "write"],
        "created_at": now,
    },
    {
        "role": "testuser",
        "permissions": ["read"],
        "created_at": now,
    },
    {
        "role": "user",
        "permissions": ["read"],
        "created_at": now,
    },
]
db.roles_permissions.delete_many({})
db.roles_permissions.insert_many(roles_permissions)

# 3. Insert Users
users = [
    {
        "_id": ObjectId(),
        "username": "adminUser",
        "password": "admin123",
        "role": "admin",
        "accessible_portlets": ["portlet1", "portlet2", "portlet3", "portlet4", "portlet5"],
        "created_at": now,
    },
    {
        "_id": ObjectId(),
        "username": "drjohn",
        "password": "doc456",
        "role": "doctor",
        "accessible_portlets": ["portlet1", "portlet2", "portlet3", "portlet4", "portlet5"],
        "created_at": now,
    },
    {
        "_id": ObjectId(),
        "username": "pharmaCenterUser",
        "password": "pharma789",
        "role": "pharmaCenter",
        "accessible_portlets": ["portlet5", "portlet1", "portlet2", "portlet3", "portlet4"],
        "created_at": now,
    },
    {
        "_id": ObjectId(),
        "username": "dev1",
        "password": "devpass",
        "role": "developer",
        "accessible_portlets": ["portlet5"],
        "created_at": now,
    },
    {
        "_id": ObjectId(),
        "username": "tester",
        "password": "testpass",
        "role": "testuser",
        "accessible_portlets": ["portlet5"],
        "created_at": now,
    },
    {
        "_id": ObjectId(),
        "username": "regularuser",
        "password": "userpass",
        "role": "user",
        "accessible_portlets": ["portlet5"],
        "created_at": now,
    },
]
db.users.delete_many({})
db.users.insert_many(users)

# 4. Insert User Portlet Layouts
user_portlet_layouts = []
for user in users:
    user_portlet_layouts.append({
        "user_id": user["_id"],
        "layout": user["accessible_portlets"][:3],  # Default first 3
        "created_at": now
    })

db.user_portlet_layouts.delete_many({})
db.user_portlet_layouts.insert_many(user_portlet_layouts)

print("Seeded users, roles_permissions, portlets, and user_portlet_layouts.")
