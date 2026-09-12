from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.api.threats import router as threats_router, threat_events


app = FastAPI(
    title="CyberGuard",
    description="Cybersecurity Threat Detection & Monitoring Platform",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# API Routers
# =========================

app.include_router(threats_router)


# =========================
# Root
# =========================

@app.get("/")
def root():
    return {
        "service": "CyberGuard",
        "version": "1.0.0",
        "status": "online",
        "message": "CyberGuard security backend is running"
    }


# =========================
# Health Check
# =========================

@app.get("/api/health")
def health():

    return {
        "service": "CyberGuard",
        "status": "online",
        "security_engine": "ready",
        "timestamp": datetime.utcnow().isoformat()
    }


# =========================
# Real Dashboard
# =========================

@app.get("/api/dashboard")
def dashboard():

    total_threats = len(threat_events)

    critical = sum(
        1 for event in threat_events
        if event.get("severity") == "critical"
    )

    high = sum(
        1 for event in threat_events
        if event.get("severity") == "high"
    )

    medium = sum(
        1 for event in threat_events
        if event.get("severity") == "medium"
    )

    safe_events = sum(
        1 for event in threat_events
        if not event.get("detected", False)
    )

    # حساب درجة الأمان بشكل ديناميكي
    security_score = 100

    security_score -= critical * 15
    security_score -= high * 8
    security_score -= medium * 3

    security_score = max(0, min(100, security_score))

    return {
        "threats": total_threats,
        "critical": critical,
        "high": high,
        "medium": medium,
        "safe_events": safe_events,
        "security_score": security_score,
        "timestamp": datetime.utcnow().isoformat()
    }
