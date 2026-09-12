from fastapi import APIRouter
from app.security.threat_detector import threat_detector
from datetime import datetime

router = APIRouter(
    prefix="/api/threats",
    tags=["Threat Detection"]
)

# تخزين مؤقت للأحداث أثناء تشغيل النظام
threat_events = []


@router.post("/analyze")
async def analyze_threat(event: dict):

    result = threat_detector.analyze(event)

    # إضافة وقت التسجيل
    result["logged_at"] = datetime.utcnow().isoformat()

    # حفظ الحدث
    threat_events.append(result)

    return result


@router.get("/")
async def get_threats():

    return {
        "total": len(threat_events),
        "events": threat_events
    }
