from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime


app = FastAPI(
    title="CyberGuard",
    description="Cybersecurity Threat Detection & Monitoring Platform",
    version="1.0.0"
)


# Allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "service": "CyberGuard",
        "version": "1.0.0",
        "status": "online",
        "message": "CyberGuard security backend is running"
    }


@app.get("/api/health")
def health():
    return {
        "service": "CyberGuard",
        "status": "online",
        "security_engine": "ready",
        "timestamp": datetime.utcnow().isoformat()
    }


@app.get("/api/dashboard")
def dashboard():
    return {
        "threats": 12,
        "critical": 2,
        "high": 4,
        "medium": 6,
        "safe_events": 105,
        "security_score": 87
    }
