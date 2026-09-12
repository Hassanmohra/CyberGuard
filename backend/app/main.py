from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.api.threats import router as threats_router

app = FastAPI(
    title="CyberGuard",
    description="Cybersecurity Threat Detection & Monitoring Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(threats_router)


# =========================
# CyberGuard Dashboard Data
# =========================

dashboard_data = {
    "threats": 0,
    "critical": 0,
    "high": 0,
    "medium": 0,
    "safe_events": 0,
    "security_score": 100
}


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
        **dashboard_data,
        "timestamp": datetime.utcnow().isoformat()
    }
