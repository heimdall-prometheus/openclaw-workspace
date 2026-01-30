"""
System Monitor for mein-malbuch server.

Monitors:
- CPU usage
- Memory usage  
- Disk usage
- Service status (nginx, postgresql, redis, docker)
- Application health
"""
import asyncio
import psutil
import subprocess
from typing import Dict, Any, List
from datetime import datetime
import json


class SystemMonitor:
    """Monitor system health and send alerts."""
    
    def __init__(self):
        self.thresholds = {
            "cpu_percent": 80,
            "memory_percent": 85,
            "disk_percent": 90,
        }
    
    def get_cpu_usage(self) -> float:
        """Get current CPU usage percentage."""
        return psutil.cpu_percent(interval=1)
    
    def get_memory_usage(self) -> Dict[str, float]:
        """Get memory usage statistics."""
        memory = psutil.virtual_memory()
        return {
            "percent": memory.percent,
            "total_gb": round(memory.total / 1024**3, 2),
            "used_gb": round(memory.used / 1024**3, 2),
            "available_gb": round(memory.available / 1024**3, 2)
        }
    
    def get_disk_usage(self) -> Dict[str, float]:
        """Get disk usage for root partition."""
        disk = psutil.disk_usage('/')
        return {
            "percent": round(disk.used / disk.total * 100, 2),
            "total_gb": round(disk.total / 1024**3, 2),
            "used_gb": round(disk.used / 1024**3, 2),
            "free_gb": round(disk.free / 1024**3, 2)
        }
    
    def check_service_status(self, service: str) -> bool:
        """Check if a systemd service is running."""
        try:
            result = subprocess.run(
                ["systemctl", "is-active", service],
                capture_output=True,
                text=True,
                timeout=10
            )
            return result.stdout.strip() == "active"
        except Exception:
            return False
    
    def get_docker_status(self) -> Dict[str, Any]:
        """Get Docker containers status."""
        try:
            result = subprocess.run(
                ["docker", "ps", "--format", "json"],
                capture_output=True,
                text=True,
                timeout=10
            )
            if result.returncode != 0:
                return {"error": "Docker not accessible"}
            
            containers = []
            for line in result.stdout.strip().split('\n'):
                if line:
                    try:
                        container = json.loads(line)
                        containers.append({
                            "name": container.get("Names", "unknown"),
                            "image": container.get("Image", "unknown"),
                            "status": container.get("Status", "unknown"),
                            "ports": container.get("Ports", "")
                        })
                    except json.JSONDecodeError:
                        continue
            
            return {"containers": containers, "count": len(containers)}
        
        except Exception as e:
            return {"error": str(e)}
    
    def get_nginx_status(self) -> Dict[str, Any]:
        """Get Nginx status and basic stats."""
        try:
            # Check if nginx is running
            is_running = self.check_service_status("nginx")
            
            # Get nginx process info
            nginx_processes = []
            for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']):
                if proc.info['name'] == 'nginx':
                    nginx_processes.append(proc.info)
            
            return {
                "running": is_running,
                "processes": len(nginx_processes),
                "process_details": nginx_processes
            }
        
        except Exception as e:
            return {"error": str(e), "running": False}
    
    def get_application_health(self) -> Dict[str, Any]:
        """Check application-specific health."""
        try:
            # Check if FastAPI process is running (uvicorn)
            fastapi_processes = []
            for proc in psutil.process_iter(['pid', 'name', 'cmdline', 'cpu_percent', 'memory_percent']):
                cmdline = ' '.join(proc.info['cmdline'] or [])
                if 'uvicorn' in cmdline and 'app.main' in cmdline:
                    fastapi_processes.append({
                        "pid": proc.info['pid'],
                        "cpu_percent": proc.info['cpu_percent'],
                        "memory_percent": proc.info['memory_percent'],
                        "cmdline": cmdline
                    })
            
            # Check if Celery workers are running
            celery_processes = []
            for proc in psutil.process_iter(['pid', 'name', 'cmdline', 'cpu_percent', 'memory_percent']):
                cmdline = ' '.join(proc.info['cmdline'] or [])
                if 'celery' in cmdline and 'worker' in cmdline:
                    celery_processes.append({
                        "pid": proc.info['pid'],
                        "cpu_percent": proc.info['cpu_percent'],
                        "memory_percent": proc.info['memory_percent']
                    })
            
            return {
                "fastapi_processes": fastapi_processes,
                "fastapi_running": len(fastapi_processes) > 0,
                "celery_processes": celery_processes,
                "celery_running": len(celery_processes) > 0
            }
        
        except Exception as e:
            return {"error": str(e)}
    
    def get_full_system_status(self) -> Dict[str, Any]:
        """Get comprehensive system status."""
        return {
            "timestamp": datetime.now().isoformat(),
            "cpu": {
                "usage_percent": self.get_cpu_usage(),
                "threshold": self.thresholds["cpu_percent"]
            },
            "memory": {
                **self.get_memory_usage(),
                "threshold": self.thresholds["memory_percent"]
            },
            "disk": {
                **self.get_disk_usage(),
                "threshold": self.thresholds["disk_percent"]
            },
            "services": {
                "nginx": self.check_service_status("nginx"),
                "postgresql": self.check_service_status("postgresql"),
                "redis": self.check_service_status("redis-server"),
                "docker": self.check_service_status("docker"),
                "tailscale": self.check_service_status("tailscaled")
            },
            "docker": self.get_docker_status(),
            "nginx": self.get_nginx_status(),
            "application": self.get_application_health()
        }
    
    def check_alerts(self, status: Dict[str, Any]) -> List[Dict[str, str]]:
        """Check for alert conditions and return list of alerts."""
        alerts = []
        
        # CPU alert
        cpu_usage = status["cpu"]["usage_percent"]
        if cpu_usage > self.thresholds["cpu_percent"]:
            alerts.append({
                "type": "high_cpu",
                "message": f"CPU usage at {cpu_usage:.1f}% (threshold: {self.thresholds['cpu_percent']}%)",
                "severity": "critical" if cpu_usage > 95 else "warning"
            })
        
        # Memory alert
        memory_usage = status["memory"]["percent"]
        if memory_usage > self.thresholds["memory_percent"]:
            alerts.append({
                "type": "high_memory", 
                "message": f"Memory usage at {memory_usage:.1f}% (threshold: {self.thresholds['memory_percent']}%)",
                "severity": "critical" if memory_usage > 95 else "warning"
            })
        
        # Disk alert
        disk_usage = status["disk"]["percent"]
        if disk_usage > self.thresholds["disk_percent"]:
            alerts.append({
                "type": "high_disk",
                "message": f"Disk usage at {disk_usage:.1f}% (threshold: {self.thresholds['disk_percent']}%)",
                "severity": "critical" if disk_usage > 95 else "warning"
            })
        
        # Service alerts
        for service, running in status["services"].items():
            if not running:
                alerts.append({
                    "type": "service_down",
                    "message": f"Service '{service}' is not running",
                    "severity": "critical"
                })
        
        # Application alerts
        app = status.get("application", {})
        if not app.get("fastapi_running", False):
            alerts.append({
                "type": "app_down",
                "message": "FastAPI application is not running",
                "severity": "critical"
            })
        
        if not app.get("celery_running", False):
            alerts.append({
                "type": "celery_down",
                "message": "Celery workers are not running",
                "severity": "warning"
            })
        
        return alerts


# Global monitor instance
system_monitor = SystemMonitor()


def get_system_monitor() -> SystemMonitor:
    """Get the global system monitor instance."""
    return system_monitor