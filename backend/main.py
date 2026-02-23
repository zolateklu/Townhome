from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt, JWTError

app = FastAPI(
    title="Townhome Appointment API",
    description="Appointment management system with JWT authentication",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "some-secret-key!"
ALGORITHM = "HS256"
security = HTTPBearer()

# In-memory storage for appointments
appointments_db = []
appointment_id_counter = 1

class LoginRequest(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str

class AppointmentCreate(BaseModel):
    client_name: str
    service_date: str
    service_type: str
    estimated_duration: int

class Appointment(BaseModel):
    id: int
    client_name: str
    service_date: str
    service_type: str
    estimated_duration: int
    created_at: str
    user_id: int

def create_token(user_id: int, username: str) -> str:
    payload = {
        "user_id": user_id,
        "username": username,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@app.post("/auth/login", tags=["Authentication"], summary="Login and get JWT token")
def login(request: LoginRequest):
    """
    Login with username and password to receive a JWT access token.
    
    **Test Credentials:**
    - Username: testuser
    - Password: testpass123
    
    Returns an access token valid for 24 hours.
    """
    # Minimal auth - replace with real validation
    if request.username == "testuser" and request.password == "testpass123":
        token = create_token(1, request.username)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

@app.get("/auth/me", tags=["Authentication"], summary="Get current user info")
def get_current_user(payload: dict = Depends(verify_token)):
    """
    Get the currently authenticated user's information.
    
    Requires a valid JWT token in the Authorization header.
    """
    return {"user_id": payload["user_id"], "username": payload["username"]}

@app.post("/api/appointments", response_model=Appointment, tags=["Appointments"], summary="Create new appointment")
def create_appointment(appointment: AppointmentCreate, payload: dict = Depends(verify_token)):
    """
    Create a new appointment for the authenticated user.
    
    **Required fields:**
    - client_name: Name of the client
    - service_date: Date in YYYY-MM-DD format
    - service_type: One of "mowing", "installation", or "maintenance"
    - estimated_duration: Duration in minutes (integer)
    
    Returns the created appointment with auto-generated ID and timestamp.
    """
    global appointment_id_counter
    
    new_appointment = Appointment(
        id=appointment_id_counter,
        client_name=appointment.client_name,
        service_date=appointment.service_date,
        service_type=appointment.service_type,
        estimated_duration=appointment.estimated_duration,
        created_at=datetime.utcnow().isoformat(),
        user_id=payload["user_id"]
    )
    
    appointments_db.append(new_appointment.dict())
    appointment_id_counter += 1
    
    return new_appointment

@app.get("/api/appointments", tags=["Appointments"], summary="Get user's appointments")
def get_appointments(payload: dict = Depends(verify_token)):
    """
    Get all appointments for the authenticated user.
    
    Returns a list of appointments filtered by the current user's ID.
    """
    user_appointments = [apt for apt in appointments_db if apt["user_id"] == payload["user_id"]]
    return user_appointments
