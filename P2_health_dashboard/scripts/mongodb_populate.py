import pymongo
from faker import Faker
import random
from bson import ObjectId
from datetime import datetime

fake = Faker()

try:
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["health_dashboard"]
    print("Connected to MongoDB successfully.")
except pymongo.errors.ConnectionError as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)

users_collection = db["users"]
otp_logs_collection = db["otp_logs"]
login_audit_logs_collection = db["login_audit_logs"]
roles_permissions_collection = db["roles_permissions"]
pharma_test_centers_collection = db["pharma_test_centers"]
patients_collection_1 = db["patients_1"]
patients_collection_2 = db["patients_2"]
patients_collection_3 = db["patients_3"]
patients_collection_4 = db["patients_4"]
audit_logs_collection = db["audit_logs"] 
system_logs_collection = db["system_logs"]  

# Helper function to handle inserts with error handling
def safe_insert(collection, data):
    try:
        collection.insert_many(data)
        print(f"Successfully inserted {len(data)} documents into {collection.name}. Document count: {collection.count_documents({})}")
    except pymongo.errors.PyMongoError as e:
        print(f"Error inserting documents into {collection.name}: {e}")

# Helper function to drop collections before inserting data
def drop_collections():
    try:
        collections_to_drop = [
            users_collection,
            otp_logs_collection,
            login_audit_logs_collection,
            roles_permissions_collection,
            pharma_test_centers_collection,
            patients_collection_1,
            patients_collection_2,
            patients_collection_3,
            patients_collection_4,
            audit_logs_collection,  # Add audit log collection
            system_logs_collection   # Add system log collection
        ]
        for collection in collections_to_drop:
            collection.drop()
            print(f"Dropped collection: {collection.name}")
    except Exception as e:
        print(f"Error dropping collections: {e}")

# Generate dummy users
def generate_users():
    print("Start generating users...")
    users = []
    roles = ["admin", "doctor", "testcenter", "developer", "testuser"]
    try:
        for role in roles:
            for _ in range(3):  # 3 users per role
                users.append({
                    "username": fake.user_name(),
                    "password": fake.password(length=12),
                    "role": role,
                    "accessible_portlets": random.sample([f"portlet{i}" for i in range(1, 11)], k=5),
                    "created_at": datetime.now()
                })
        safe_insert(users_collection, users)
    except Exception as e:
        print(f"Error generating users: {e}")

# Generate OTP logs
def generate_otp_logs():
    print("Start generating OTP logs...")
    otp_logs = []
    try:
        for user in users_collection.find():
            for _ in range(3):  # Each user gets 3 OTP logs
                otp_logs.append({
                    "user_id": user["_id"],
                    "otp": fake.random_number(digits=6),  # Generate a random 6-digit OTP
                    "created_at": datetime.now()
                })
        safe_insert(otp_logs_collection, otp_logs)
    except Exception as e:
        print(f"Error generating OTP logs: {e}")

# Generate login audit logs
def generate_login_audit_logs():
    print("Start generating login audit logs...")
    login_logs = []
    try:
        for user in users_collection.find():
            login_logs.append({
                "user_id": user["_id"],
                "timestamp": datetime.now(),
                "success": random.choice([True, False]),  # Simulate login success/failure
                "created_at": datetime.now()
            })
        safe_insert(login_audit_logs_collection, login_logs)
    except Exception as e:
        print(f"Error generating login audit logs: {e}")

# Generate roles permissions
def generate_roles_permissions():
    print("Start generating roles and permissions...")
    roles_permissions = [
        {"role": "admin", "permissions": ["read", "write", "delete", "update"]},
        {"role": "doctor", "permissions": ["read", "update"]},
        {"role": "testcenter", "permissions": ["read"]},
        {"role": "developer", "permissions": ["read", "write"]},
        {"role": "testuser", "permissions": ["read"]},
    ]
    try:
        safe_insert(roles_permissions_collection, roles_permissions)
    except Exception as e:
        print(f"Error generating roles and permissions: {e}")

# Generate Pharma Test Centers data
def generate_pharma_test_centers():
    print("Start generating pharma test centers data...")
    test_centers = []
    try:
        for _ in range(20):
            test_centers.append({
                "name": fake.company(),
                "location": fake.address(),
                "contact": fake.phone_number(),
                "created_at": datetime.now()
            })
        safe_insert(pharma_test_centers_collection, test_centers)
    except Exception as e:
        print(f"Error generating pharma test centers data: {e}")

# Generate patient data 
def generate_patient_data(collection):
    print(f"Start generating patient data for {collection.name}...")
    patients = []
    try:
        for _ in range(100):
            patients.append({
                "name": fake.name(),
                "contact": fake.phone_number(),
                "address": fake.address(),
                "created_at": datetime.now()
            })
        safe_insert(collection, patients)
    except Exception as e:
        print(f"Error generating patient data for {collection.name}: {e}")

# Generate audit logs for tracking system actions 
def generate_audit_logs():
    print("Start generating audit logs...")
    audit_logs = []
    try:
        actions = ["create", "update", "delete", "view"]
        for _ in range(10):
            audit_logs.append({
                "action": random.choice(actions),
                "user_id": random.choice([user["_id"] for user in users_collection.find()]),
                "timestamp": datetime.now(),
                "description": fake.sentence(),
                "created_at": datetime.now()
            })
        safe_insert(audit_logs_collection, audit_logs)
    except Exception as e:
        print(f"Error generating audit logs: {e}")

# Generate system logs for error or info tracking
def generate_system_logs():
    print("Start generating system logs...")
    system_logs = []
    try:
        log_types = ["error", "info", "warning"]
        for _ in range(15):
            system_logs.append({
                "log_type": random.choice(log_types),
                "message": fake.sentence(),
                "timestamp": datetime.now(),
                "created_at": datetime.now()
            })
        safe_insert(system_logs_collection, system_logs)
    except Exception as e:
        print(f"Error generating system logs: {e}")

# Generate all collections
def generate_all_data():
    try:
        # drop_collections()  # Clean up previous collections
        generate_users()
        generate_otp_logs()
        generate_login_audit_logs()
        generate_roles_permissions()
        generate_pharma_test_centers()
        generate_patient_data(patients_collection_1)
        generate_patient_data(patients_collection_2)
        generate_patient_data(patients_collection_3)
        generate_patient_data(patients_collection_4)
        generate_audit_logs()  
        generate_system_logs()  
        print("Data population complete!")
    except Exception as e:
        print(f"Error during data population: {e}")

generate_all_data()
