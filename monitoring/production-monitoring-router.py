"""
Production Monitoring Router for mein-malbuch.

This file goes to: /var/www/mein-malbuch-prod/backend/app/api/monitoring.py
"""
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
import json
import subprocess
from datetime import datetime
import os

# Import existing dependencies
from app.core.database import SessionLocal
from app.core.config import settings

# Import our monitoring tools
try:
    from app.services.telegram_service import get_telegram_service
except ImportError:
    def get_telegram_service():
        return None

router = APIRouter(prefix="/monitoring", tags=["monitoring"])


def get_system_status():
    """Get system status using basic system commands."""
    try:
        # CPU usage from top
        top_output = subprocess.run(["top", "-bn1"], capture_output=True, text=True, timeout=5)
        cpu_usage = 0.0
        if top_output.returncode == 0:
            for line in top_output.stdout.split('\n'):
                if '%Cpu' in line:
                    for part in line.split(','):
                        if 'id' in part:  # idle percentage
                            idle = float(part.split()[0])
                            cpu_usage = round(100 - idle, 1)
                            break
        
        # Memory from /proc/meminfo
        memory = {"percent": 0, "total_gb": 0, "used_gb": 0, "available_gb": 0}
        try:
            with open('/proc/meminfo', 'r') as f:
                mem_info = {}
                for line in f:
                    if ':' in line:
                        key, value = line.split(':', 1)
                        value_kb = int(value.split()[0])
                        mem_info[key.strip()] = value_kb
                
                total_kb = mem_info.get('MemTotal', 0)
                available_kb = mem_info.get('MemAvailable', 0)
                used_kb = total_kb - available_kb
                
                memory = {
                    "percent": round((used_kb / total_kb * 100), 1) if total_kb > 0 else 0,
                    "total_gb": round(total_kb / 1024**2, 2),
                    "used_gb": round(used_kb / 1024**2, 2),
                    "available_gb": round(available_kb / 1024**2, 2)
                }
        except Exception:
            pass
        
        # Disk usage
        disk = {"percent": 0, "total_gb": 0, "used_gb": 0, "free_gb": 0}
        try:
            df_output = subprocess.run(["df", "-h", "/"], capture_output=True, text=True, timeout=5)
            if df_output.returncode == 0:
                lines = df_output.stdout.split('\n')
                if len(lines) >= 2:
                    fields = lines[1].split()
                    if len(fields) >= 5:
                        disk["percent"] = int(fields[4].rstrip('%'))
        except Exception:
            pass
        
        # Service status
        services = {}
        for service in ["nginx", "postgresql", "redis-server", "docker", "tailscaled"]:
            try:
                result = subprocess.run(["systemctl", "is-active", service], 
                                      capture_output=True, text=True, timeout=5)
                services[service] = result.stdout.strip() == "active"
            except Exception:
                services[service] = False
        
        # Application health
        app_health = {"fastapi_running": False, "celery_running": False}
        try:
            # Check uvicorn processes
            pgrep_result = subprocess.run(["pgrep", "-cf", "uvicorn.*app.main"], 
                                        capture_output=True, text=True, timeout=5)
            if pgrep_result.returncode == 0:
                app_health["fastapi_running"] = int(pgrep_result.stdout.strip()) > 0
            
            # Check celery processes
            pgrep_result = subprocess.run(["pgrep", "-cf", "celery.*worker"], 
                                        capture_output=True, text=True, timeout=5)
            if pgrep_result.returncode == 0:
                app_health["celery_running"] = int(pgrep_result.stdout.strip()) > 0
        except Exception:
            pass
        
        return {
            "timestamp": datetime.now().isoformat(),
            "cpu": {"usage_percent": cpu_usage},
            "memory": memory,
            "disk": disk,
            "services": services,
            "application": app_health
        }
    
    except Exception as e:
        return {"error": str(e), "timestamp": datetime.now().isoformat()}


@router.get("/health")
async def monitoring_health():
    """Extended health check with system stats."""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "mein-malbuch-monitoring",
        "version": "1.0.0"
    }


@router.get("/system")
async def system_status():
    """Get system status."""
    try:
        status = get_system_status()
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail={"error": str(e)})


@router.get("/health/detailed")
async def detailed_health():
    """Detailed health check including all systems."""
    health_data = {
        "timestamp": datetime.now().isoformat(),
        "service": "mein-malbuch-api",
        "status": "healthy",
        "checks": {}
    }
    
    overall_healthy = True
    
    # Database check
    try:
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
        import redis
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
    
    # System check
    try:
        system_status = get_system_status()
        
        # Check for alerts
        alerts = []
        cpu_usage = system_status.get("cpu", {}).get("usage_percent", 0)
        memory_usage = system_status.get("memory", {}).get("percent", 0)
        
        if cpu_usage > 80:
            alerts.append({"type": "high_cpu", "severity": "warning", 
                          "message": f"CPU usage at {cpu_usage}%"})
        if memory_usage > 85:
            alerts.append({"type": "high_memory", "severity": "warning",
                          "message": f"Memory usage at {memory_usage}%"})
        
        # Check services
        services = system_status.get("services", {})
        for service, running in services.items():
            if not running:
                alerts.append({"type": "service_down", "severity": "critical",
                              "message": f"Service '{service}' is down"})
        
        health_data["checks"]["system"] = {
            "status": "healthy" if not alerts else "warning",
            "alerts": alerts,
            "cpu_percent": cpu_usage,
            "memory_percent": memory_usage,
            "services": services
        }
        
        if any(a["severity"] == "critical" for a in alerts):
            overall_healthy = False
            
    except Exception as e:
        health_data["checks"]["system"] = {
            "status": "error",
            "message": f"System check error: {str(e)}"
        }
    
    health_data["status"] = "healthy" if overall_healthy else "unhealthy"
    
    if not overall_healthy:
        raise HTTPException(status_code=503, detail=health_data)
    
    return health_data


@router.post("/test-telegram")
async def test_telegram():
    """Test Telegram notification (admin only)."""
    telegram = get_telegram_service()
    if not telegram:
        raise HTTPException(status_code=503, detail="Telegram service not configured")
    
    try:
        success = telegram.send_message_sync("🧪 Test-Nachricht von mein-malbuch Monitoring!")
        if success:
            return {"status": "success", "message": "Telegram test message sent"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send test message")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Telegram test failed: {str(e)}")


@router.get("/config")
async def monitoring_config():
    """Get monitoring configuration status."""
    telegram = get_telegram_service()
    
    return {
        "telegram": {
            "enabled": telegram is not None and telegram.enabled if telegram else False,
            "configured": telegram is not None if telegram else False,
            "chat_id_set": bool(telegram and telegram.chat_id) if telegram else False
        },
        "environment": {
            "telegram_bot_token_set": bool(os.getenv("TELEGRAM_BOT_TOKEN")),
            "telegram_chat_id_set": bool(os.getenv("TELEGRAM_CHAT_ID")),
            "telegram_notifications_enabled": os.getenv("TELEGRAM_NOTIFICATIONS_ENABLED", "false").lower() == "true"
        }
    }