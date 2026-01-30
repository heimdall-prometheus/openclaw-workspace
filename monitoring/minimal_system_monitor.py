"""
Minimal System Monitor für mein-malbuch ohne externe Dependencies.

Verwendet system commands für Monitoring - sicher und ohne neue Pakete.
"""
import subprocess
import json
from typing import Dict, Any, List
from datetime import datetime


class MinimalSystemMonitor:
    """Monitor system health using built-in system commands."""
    
    def __init__(self):
        self.thresholds = {
            "cpu_percent": 80,
            "memory_percent": 85,
            "disk_percent": 90,
        }
    
    def run_command(self, cmd: List[str], timeout: int = 5) -> str:
        """Safely run system command."""
        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=timeout
            )
            return result.stdout.strip() if result.returncode == 0 else ""
        except Exception:
            return ""
    
    def get_cpu_usage(self) -> float:
        """Get CPU usage from /proc/loadavg."""
        try:
            # Use top for 1 second measurement
            output = self.run_command(["top", "-bn1"])
            if not output:
                return 0.0
                
            for line in output.split('\n'):
                if '%Cpu' in line:
                    # Parse line like "%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.2 id,  0.0 wa,  0.0 hi,  0.3 si,  0.0 st"
                    parts = line.split(',')
                    for part in parts:
                        if 'id' in part:  # idle percentage
                            idle = float(part.split()[0])
                            return round(100 - idle, 1)
            return 0.0
        except Exception:
            return 0.0
    
    def get_memory_usage(self) -> Dict[str, float]:
        """Get memory usage from /proc/meminfo."""
        try:
            output = self.run_command(["cat", "/proc/meminfo"])
            if not output:
                return {"percent": 0, "total_gb": 0, "used_gb": 0, "available_gb": 0}
            
            mem_info = {}
            for line in output.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    # Extract numeric value (in kB)
                    value_kb = int(value.split()[0])
                    mem_info[key.strip()] = value_kb
            
            total_kb = mem_info.get('MemTotal', 0)
            available_kb = mem_info.get('MemAvailable', 0)
            used_kb = total_kb - available_kb
            
            percent = round((used_kb / total_kb * 100), 1) if total_kb > 0 else 0
            
            return {
                "percent": percent,
                "total_gb": round(total_kb / 1024**2, 2),
                "used_gb": round(used_kb / 1024**2, 2),
                "available_gb": round(available_kb / 1024**2, 2)
            }
        except Exception:
            return {"percent": 0, "total_gb": 0, "used_gb": 0, "available_gb": 0}
    
    def get_disk_usage(self) -> Dict[str, float]:
        """Get disk usage using df command."""
        try:
            output = self.run_command(["df", "-h", "/"])
            if not output:
                return {"percent": 0, "total_gb": 0, "used_gb": 0, "free_gb": 0}
            
            lines = output.split('\n')
            if len(lines) < 2:
                return {"percent": 0, "total_gb": 0, "used_gb": 0, "free_gb": 0}
            
            # Parse df output: Filesystem Size Used Avail Use% Mounted
            fields = lines[1].split()
            if len(fields) >= 5:
                percent = int(fields[4].rstrip('%'))
                
                # Convert sizes (assuming they end with G, M, etc.)
                def parse_size(size_str):
                    if size_str.endswith('G'):
                        return float(size_str[:-1])
                    elif size_str.endswith('M'):
                        return float(size_str[:-1]) / 1024
                    elif size_str.endswith('K'):
                        return float(size_str[:-1]) / 1024**2
                    else:
                        return float(size_str) / 1024**3  # Assume bytes
                
                total_gb = parse_size(fields[1])
                used_gb = parse_size(fields[2])
                free_gb = parse_size(fields[3])
                
                return {
                    "percent": percent,
                    "total_gb": round(total_gb, 2),
                    "used_gb": round(used_gb, 2),
                    "free_gb": round(free_gb, 2)
                }
        except Exception:
            pass
        
        return {"percent": 0, "total_gb": 0, "used_gb": 0, "free_gb": 0}
    
    def check_service_status(self, service: str) -> bool:
        """Check if systemd service is running."""
        output = self.run_command(["systemctl", "is-active", service])
        return output == "active"
    
    def get_process_count(self, pattern: str) -> int:
        """Count processes matching pattern."""
        output = self.run_command(["pgrep", "-cf", pattern])
        try:
            return int(output) if output else 0
        except ValueError:
            return 0
    
    def get_nginx_status(self) -> Dict[str, Any]:
        """Get nginx process info."""
        is_running = self.check_service_status("nginx")
        process_count = self.get_process_count("nginx")
        
        return {
            "running": is_running,
            "processes": process_count
        }
    
    def get_application_health(self) -> Dict[str, Any]:
        """Check mein-malbuch application health."""
        # Check FastAPI processes
        fastapi_count = self.get_process_count("uvicorn.*app.main")
        
        # Check Celery workers
        celery_count = self.get_process_count("celery.*worker")
        
        return {
            "fastapi_processes": fastapi_count,
            "fastapi_running": fastapi_count > 0,
            "celery_processes": celery_count,
            "celery_running": celery_count > 0
        }
    
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
            "nginx": self.get_nginx_status(),
            "application": self.get_application_health()
        }
    
    def check_alerts(self, status: Dict[str, Any]) -> List[Dict[str, str]]:
        """Check for alert conditions."""
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
        
        return alerts


# Test function
def test_monitor():
    """Test the monitor."""
    monitor = MinimalSystemMonitor()
    status = monitor.get_full_system_status()
    alerts = monitor.check_alerts(status)
    
    print("=== SYSTEM STATUS ===")
    print(f"CPU: {status['cpu']['usage_percent']}%")
    print(f"Memory: {status['memory']['percent']}%")
    print(f"Disk: {status['disk']['percent']}%")
    print(f"Services: {status['services']}")
    print(f"FastAPI: {status['application']['fastapi_running']}")
    
    if alerts:
        print("\n⚠️ ALERTS:")
        for alert in alerts:
            print(f"  {alert['severity']}: {alert['message']}")
    else:
        print("\n✅ All systems healthy")


if __name__ == "__main__":
    test_monitor()