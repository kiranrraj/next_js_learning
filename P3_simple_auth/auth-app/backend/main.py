from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from auth.routes import router as auth_router

app = FastAPI()

# CORS setup to allow frontend to connect 
app.add_middleware(
    CORSMiddleware,
    # Update with your frontend URL
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])

@app.get("/")
async def root():
    return {"message": "Welcome to the API"}

# Exception handler for HTTPException
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    print(f"HTTP Exception: Status Code={exc.status_code}, Detail='{exc.detail}', URL='{request.url}'")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

# Exception handler for generic Exceptions
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    print(f"Internal Server Error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"},
    )