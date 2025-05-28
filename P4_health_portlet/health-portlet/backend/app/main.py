from fastapi import FastAPI
from routes.user_routes import router as user_router
from routes.patients_1_routes import router as patient_1_router
from routes.patients_2_routes import router as patient_2_router
from routes.patients_3_routes import router as patient_3_router
from routes.patients_4_routes import router as patient_4_router
from routes.pharma_test_centers_routes import router as pharma_test_centers_router
from routes.portlets_routes import router as portlets_router
from routes.role_permissions_routes import router as role_permissions_router

app = FastAPI()
app.include_router(user_router)
app.include_router(patient_1_router)
app.include_router(patient_2_router)
app.include_router(patient_3_router)
app.include_router(patient_4_router)
app.include_router(pharma_test_centers_router)
app.include_router(portlets_router)
app.include_router(role_permissions_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
