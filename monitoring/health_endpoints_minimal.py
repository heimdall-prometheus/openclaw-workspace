"""
Minimal Health Endpoints für mein-malbuch Integration.

Kann direkt in das bestehende FastAPI Backend integriert werden.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
import redis
from datetime import datetime
import sys
import os

# Import minimal monitor (relative path for integration)
sys.path.append('/home/heimdall/monitoring')
from minimal_system_monitor import MinimalSystemMonitor

router = APIRouter(prefix="/monitoring", tags=["monitoring"])


@router.get("/health")
async def health_check():
    """
    Basic health check endpoint.
    Returns 200 OK if service is responding.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "mein-malbuch-api",
        "version": "1.0.0"
    }


@router.get("/health/detailed")
async def detailed_health_check():
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
        # Import database dependencies
        from app.core.database import SessionLocal
        from app.core.config import settings
        
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        
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
        from app.core.config import settings
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
        monitor = MinimalSystemMonitor()
        system_status = monitor.get_full_system_status()
        alerts = monitor.check_alerts(system_status)
        
        health_data["checks"]["system"] = {
            "status": "healthy" if not alerts else "warning",
            "cpu_percent": system_status["cpu"]["usage_percent"],
            "memory_percent": system_status["memory"]["percent"],
            "disk_percent": system_status["disk"]["percent"],
            "services": system_status["services"],
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


@router.get("/system")
async def system_status():
    """
    Detailed system monitoring endpoint.
    """
    try:
        monitor = MinimalSystemMonitor()
        return monitor.get_full_system_status()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"error": "System monitoring error", "message": str(e)}
        )