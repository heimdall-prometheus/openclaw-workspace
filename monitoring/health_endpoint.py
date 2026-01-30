"""
Health check endpoint for mein-malbuch monitoring.

Add this to your FastAPI app to enable health monitoring.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
import redis
from datetime import datetime

from app.core.database import get_db
from app.core.config import settings
from app.services.system_monitor import get_system_monitor

router = APIRouter()


@router.get("/health")
async def health_check():
    """
    Basic health check endpoint.
    Returns 200 OK if service is responding.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "mein-malbuch-api"
    }


@router.get("/health/detailed")
async def detailed_health_check(db: Session = Depends(get_db)):
    """
    Detailed health check including database, redis, and system stats.
    """
    health_data = {
        "timestamp": datetime.now().isoformat(),
        "service": "mein-malbuch-api",
        "status": "healthy",
        "checks": {}
    }
    
    overall_healthy = True
    
    # Database check
    try:
        db.execute(text("SELECT 1"))
        health_data["checks"]["database"] = {
            "status": "healthy",
            "message": "PostgreSQL connection successful"
        }
    except Exception as e:
        health_data["checks"]["database"] = {
            "status": "unhealthy",
            "message": f"Database error: {str(e)}"
        }
        overall_healthy = False
    
    # Redis check
    try:
        r = redis.from_url(settings.REDIS_URL)
        r.ping()
        health_data["checks"]["redis"] = {
            "status": "healthy", 
            "message": "Redis connection successful"
        }
    except Exception as e:
        health_data["checks"]["redis"] = {
            "status": "unhealthy",
            "message": f"Redis error: {str(e)}"
        }
        overall_healthy = False
    
    # System stats
    try:
        monitor = get_system_monitor()
        system_status = monitor.get_full_system_status()
        alerts = monitor.check_alerts(system_status)
        
        health_data["checks"]["system"] = {
            "status": "healthy" if not alerts else "warning",
            "cpu_percent": system_status["cpu"]["usage_percent"],
            "memory_percent": system_status["memory"]["percent"],
            "disk_percent": system_status["disk"]["percent"],
            "alerts": alerts
        }
        
        if alerts:
            critical_alerts = [a for a in alerts if a["severity"] == "critical"]
            if critical_alerts:
                overall_healthy = False
    
    except Exception as e:
        health_data["checks"]["system"] = {
            "status": "error",
            "message": f"System check error: {str(e)}"
        }
    
    health_data["status"] = "healthy" if overall_healthy else "unhealthy"
    
    # Return appropriate HTTP status
    if not overall_healthy:
        raise HTTPException(status_code=503, detail=health_data)
    
    return health_data


@router.get("/health/system")
async def system_status():
    """
    Detailed system monitoring endpoint.
    """
    try:
        monitor = get_system_monitor()
        return monitor.get_full_system_status()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"error": "System monitoring error", "message": str(e)}
        )