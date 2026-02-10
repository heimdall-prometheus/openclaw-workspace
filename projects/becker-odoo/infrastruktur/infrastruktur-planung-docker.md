# Infrastruktur-Planung: Odoo ERP für Becker Sicherheitstechnik GmbH
## Docker-basierte Multi-Environment Architektur

**Projekt:** CLED-2026-001/002  
**Kunde:** Becker Sicherheitstechnik GmbH  
**Version:** 2.0 (Docker)  
**Datum:** 05.02.2026  
**Autor:** C-led Solutions GmbH

---

## 1. Executive Summary

Diese Infrastruktur-Planung definiert eine **Docker-basierte Architektur** für die Odoo ERP-Implementation bei Becker Sicherheitstechnik GmbH. Alle drei Umgebungen (Development, Test, Production) laufen auf **einem einzigen Hetzner Cloud Server** als isolierte Docker Container mit Odoo Community Edition.

**Kernanforderungen:**
- 25 gleichzeitige Benutzer
- ~20.000 Produkte, ~10.000 Kunden
- ~5.000 Objekte mit Gebäudeplänen (je 50 MB = 250 GB Storage)
- 99,5% SLA-Ziel
- Tägliche Backups mit 30 Tagen Retention

**Architektur-Prinzipien:**
- **Single Server:** Kosteneffizient, einfache Verwaltung
- **Docker Isolation:** Prod/Test/Dev strikt getrennt
- **Resource Limits:** CPU/RAM pro Environment begrenzt
- **Persistent Volumes:** Daten überleben Container-Neustarts

---

## 2. Server-Spezifikationen

### 2.1 Hetzner CCX33 (Dedicated vCPU)

**Zentrale Hardware für alle Environments:**

| Komponente | Spezifikation | Begründung |
|------------|---------------|------------|
| **vCPU** | 8 Dedicated Cores | 4 Prod + 2 Test + 1 Dev + 1 System/DB |
| **RAM** | 32 GB | 16 GB Prod + 8 GB Test + 4 GB Dev + 4 GB Reserve |
| **Root Disk** | 240 GB NVMe SSD | OS, Docker Images, Temp-Files |
| **Region** | Falkenstein (fsn1) | DSGVO-konform, niedrige Latenz DE |
| **IPv4** | Ja | Primäre Zugriffs-IP |
| **Preis** | €119,00/Monat | Dedicated CPUs für stabile Performance |

**Betriebssystem:** Ubuntu 24.04 LTS Server

---

## 3. Docker-Architektur

### 3.1 Container-Übersicht

```
┌─────────────────────────────────────────────────────────┐
│          Hetzner CCX33 (8 vCPU, 32 GB RAM)             │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐             │
│  │  Nginx Proxy    │  │  PostgreSQL     │             │
│  │  (Port 80/443)  │  │  (Multi-DB)     │             │
│  │  CPU: 0.5       │  │  CPU: 1.5       │             │
│  │  RAM: 1 GB      │  │  RAM: 4 GB      │             │
│  └────────┬────────┘  └────────┬────────┘             │
│           │                    │                       │
│  ┌────────┴────────────────────┴────────┐             │
│  │        Docker Bridge Network          │             │
│  └────┬────────────┬────────────┬────────┘             │
│       │            │            │                      │
│  ┌────▼──────┐┌───▼──────┐┌───▼──────┐               │
│  │ Odoo Prod ││Odoo Test ││ Odoo Dev │               │
│  │ Port 8069 ││Port 8070 ││Port 8071 │               │
│  │ CPU: 4    ││CPU: 2    ││CPU: 1    │               │
│  │ RAM: 16GB ││RAM: 8GB  ││RAM: 4GB  │               │
│  └───────────┘└──────────┘└──────────┘               │
│       │            │            │                      │
│  ┌────▼────────────▼────────────▼────────┐            │
│  │       Persistent Volume Storage        │            │
│  │  /mnt/odoo-data, /mnt/building-plans   │            │
│  └───────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Docker Compose Stack

**Datei:** `/opt/odoo-stack/docker-compose.yml`

```yaml
version: '3.8'

networks:
  odoo_network:
    driver: bridge

volumes:
  postgres_data:
  odoo_prod_filestore:
  odoo_test_filestore:
  odoo_dev_filestore:
  building_plans:
  backups:

services:
  # PostgreSQL Database (Shared für alle Environments)
  postgres:
    image: postgres:14-alpine
    container_name: odoo_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: odoo
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - /mnt/odoo-data/postgres:/var/lib/postgresql/data
    networks:
      - odoo_network
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 4G
        reservations:
          cpus: '1.0'
          memory: 2G
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U odoo"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Odoo Production
  odoo_prod:
    image: odoo:17.0
    container_name: odoo_prod
    restart: unless-stopped
    depends_on:
      - postgres
    environment:
      - HOST=postgres
      - USER=odoo
      - PASSWORD=${POSTGRES_PASSWORD}
      - DB_NAME=odoo_prod
    volumes:
      - odoo_prod_filestore:/var/lib/odoo
      - /mnt/odoo-data/prod/filestore:/var/lib/odoo
      - /mnt/building-plans:/mnt/building-plans:ro
      - ./addons:/mnt/extra-addons
      - ./config/odoo-prod.conf:/etc/odoo/odoo.conf
    networks:
      - odoo_network
    ports:
      - "8069:8069"
    deploy:
      resources:
        limits:
          cpus: '4.0'
          memory: 16G
        reservations:
          cpus: '3.0'
          memory: 12G
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:8069/web/health || exit 1"]
      interval: 60s
      timeout: 10s
      retries: 3

  # Odoo Test
  odoo_test:
    image: odoo:17.0
    container_name: odoo_test
    restart: unless-stopped
    depends_on:
      - postgres
    environment:
      - HOST=postgres
      - USER=odoo
      - PASSWORD=${POSTGRES_PASSWORD}
      - DB_NAME=odoo_test
    volumes:
      - odoo_test_filestore:/var/lib/odoo
      - /mnt/odoo-data/test/filestore:/var/lib/odoo
      - ./addons:/mnt/extra-addons
      - ./config/odoo-test.conf:/etc/odoo/odoo.conf
    networks:
      - odoo_network
    ports:
      - "8070:8069"
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 8G
        reservations:
          cpus: '1.5'
          memory: 6G

  # Odoo Development
  odoo_dev:
    image: odoo:17.0
    container_name: odoo_dev
    restart: unless-stopped
    depends_on:
      - postgres
    environment:
      - HOST=postgres
      - USER=odoo
      - PASSWORD=${POSTGRES_PASSWORD}
      - DB_NAME=odoo_dev
    volumes:
      - odoo_dev_filestore:/var/lib/odoo
      - /mnt/odoo-data/dev/filestore:/var/lib/odoo
      - ./addons:/mnt/extra-addons:rw
      - ./config/odoo-dev.conf:/etc/odoo/odoo.conf
    networks:
      - odoo_network
    ports:
      - "8071:8069"
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 4G
        reservations:
          cpus: '0.5'
          memory: 2G

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: odoo_nginx
    restart: unless-stopped
    depends_on:
      - odoo_prod
      - odoo_test
      - odoo_dev
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/sites-enabled:/etc/nginx/sites-enabled:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - /var/www/html:/var/www/html:ro
    networks:
      - odoo_network
    ports:
      - "80:80"
      - "443:443"
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 1G
```

### 3.3 Resource Allocation

| Service | CPU Limit | CPU Reserve | RAM Limit | RAM Reserve |
|---------|-----------|-------------|-----------|-------------|
| **Odoo Prod** | 4.0 | 3.0 | 16 GB | 12 GB |
| **Odoo Test** | 2.0 | 1.5 | 8 GB | 6 GB |
| **Odoo Dev** | 1.0 | 0.5 | 4 GB | 2 GB |
| **PostgreSQL** | 1.5 | 1.0 | 4 GB | 2 GB |
| **Nginx** | 0.5 | 0.25 | 1 GB | 512 MB |
| **System** | - | 0.75 | - | 2 GB |
| **GESAMT** | 9.0 | 7.0 | 33 GB | 24.5 GB |

**Warum Limits?**
- **Prod-Schutz:** Test/Dev können Prod nicht beeinträchtigen
- **Fair Scheduling:** Docker cgroups enforced
- **Predictable Performance:** Keine Resource Starvation

---

## 4. Volume Storage Architektur

### 4.1 Hetzner Volume Configuration

#### Volume 1: Odoo Data (Postgres + Filestores)
| Parameter | Wert |
|-----------|------|
| **Name** | `odoo-data` |
| **Größe** | 150 GB |
| **Typ** | SSD (Volumes) |
| **Mount Point** | `/mnt/odoo-data` |
| **Inhalt** | PostgreSQL, Odoo Filestores (alle 3 Envs) |

**Verzeichnisstruktur:**
```
/mnt/odoo-data/
├── postgres/             # PostgreSQL Data Directory
│   └── 14/main/
├── prod/
│   └── filestore/        # Prod Attachments
├── test/
│   └── filestore/        # Test Attachments
└── dev/
    └── filestore/        # Dev Attachments
```

#### Volume 2: Gebäudepläne & Objekt-Attachments
| Parameter | Wert |
|-----------|------|
| **Name** | `building-plans` |
| **Größe** | 300 GB (Start: 250 GB + 20% Buffer) |
| **Typ** | SSD (Volumes) |
| **Mount Point** | `/mnt/building-plans` |
| **Inhalt** | PDF, DWG, Bilder von 5.000+ Objekten |
| **Wachstum** | +50 GB/Jahr |

**Verzeichnisstruktur:**
```
/mnt/building-plans/
├── objects/
│   ├── OBJ-00001/
│   │   ├── floor-plans/
│   │   ├── photos/
│   │   └── metadata.json
│   └── OBJ-00002/
└── archive/
```

**Docker Mount:** Read-Only für Prod Container (Datensicherheit)

#### Volume 3: Backup Storage
| Parameter | Wert |
|-----------|------|
| **Name** | `backups` |
| **Größe** | 500 GB (Start) |
| **Typ** | Standard (günstiger) |
| **Mount Point** | `/mnt/backups` |
| **Retention** | 30 Tage Daily + 12 Monate Monthly |

**Backup-Schema:**
```
/mnt/backups/
├── daily/
│   ├── 2026-02-05/
│   │   ├── postgres-dump.sql.gz
│   │   ├── odoo-prod-filestore.tar.gz
│   │   └── building-plans-snapshot.tar.gz
│   └── 2026-02-04/
├── monthly/
│   └── 2026-02/
└── logs/
```

---

## 5. Netzwerk & Sicherheit

### 5.1 Nginx Reverse Proxy Konfiguration

**Datei:** `/opt/odoo-stack/nginx/sites-enabled/odoo.conf`

```nginx
# Production
upstream odoo_prod {
    server odoo_prod:8069;
}

server {
    listen 443 ssl http2;
    server_name odoo.becker-sicherheit.de;

    ssl_certificate /etc/letsencrypt/live/odoo.becker-sicherheit.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/odoo.becker-sicherheit.de/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;
    add_header Strict-Transport-Security "max-age=63072000" always;

    client_max_body_size 50M;
    proxy_read_timeout 300s;

    location / {
        proxy_pass http://odoo_prod;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ~* /web/static/ {
        proxy_cache_valid 200 90d;
        proxy_buffering on;
        expires 864000;
        proxy_pass http://odoo_prod;
    }
}

# Test Environment
server {
    listen 443 ssl http2;
    server_name odoo-test.becker-sicherheit.de;
    
    # SSL Config (gleich wie Prod)
    ssl_certificate /etc/letsencrypt/live/odoo-test.becker-sicherheit.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/odoo-test.becker-sicherheit.de/privkey.pem;

    # Basic Auth für Test-Umgebung
    auth_basic "Test Environment - Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        proxy_pass http://odoo_test:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Development (nur via VPN erreichbar)
server {
    listen 8071;
    server_name localhost;
    
    allow 10.8.0.0/24;  # VPN Subnet
    deny all;

    location / {
        proxy_pass http://odoo_dev:8069;
        proxy_set_header Host $host;
    }
}
```

### 5.2 Firewall-Regeln (UFW)

| Port | Protokoll | Source | Zweck |
|------|-----------|--------|-------|
| 22 | TCP | VPN Only | SSH (nach VPN-Setup auf VPN-IP beschränken) |
| 80 | TCP | 0.0.0.0/0 | HTTP (Redirect zu HTTPS) |
| 443 | TCP | 0.0.0.0/0 | HTTPS Odoo-Zugriff |
| 51820 | UDP | 0.0.0.0/0 | WireGuard VPN |
| 8069-8071 | TCP | localhost | Odoo Containers (nur intern) |
| 5432 | TCP | 172.18.0.0/16 | PostgreSQL (nur Docker Network) |

**Docker Containers sind vom Host isoliert** - nur Nginx exponiert Ports nach außen.

### 5.3 VPN-Zugang (WireGuard)

**Zweck:** Sicherer Admin-Zugang zu Dev-Environment + SSH

| Parameter | Wert |
|-----------|------|
| **Port** | 51820/UDP |
| **Subnet** | 10.8.0.0/24 |
| **Clients** | 5 (C-led Team + Becker Admin) |
| **Routing** | Split Tunnel (nur Server-Netz) |

**Nach VPN-Setup:**
- SSH auf Port 22 nur von VPN-IPs erlauben
- Dev-Environment (Port 8071) nur via VPN erreichbar

---

## 6. Backup & Disaster Recovery

### 6.1 Automatisierte Backups

**Backup-Script:** `/opt/odoo-stack/scripts/backup.sh`

```bash
#!/bin/bash
set -e

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/mnt/backups/daily/$DATE"
mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting backup for $DATE..."

# PostgreSQL Dumps (alle 3 DBs)
docker exec odoo_postgres pg_dump -U odoo odoo_prod | gzip > "$BACKUP_DIR/postgres-prod.sql.gz"
docker exec odoo_postgres pg_dump -U odoo odoo_test | gzip > "$BACKUP_DIR/postgres-test.sql.gz"
docker exec odoo_postgres pg_dump -U odoo odoo_dev | gzip > "$BACKUP_DIR/postgres-dev.sql.gz"

# Odoo Filestores
tar -czf "$BACKUP_DIR/filestore-prod.tar.gz" /mnt/odoo-data/prod/filestore/
tar -czf "$BACKUP_DIR/filestore-test.tar.gz" /mnt/odoo-data/test/filestore/

# Gebäudepläne (inkrementell mit rsync)
rsync -av --link-dest=/mnt/backups/daily/latest /mnt/building-plans/ "$BACKUP_DIR/building-plans/"

# Cleanup (30 Tage Retention)
find /mnt/backups/daily/ -type d -mtime +30 -exec rm -rf {} \; 2>/dev/null || true

# Symlink für inkrementelle Backups
ln -sfn "$BACKUP_DIR" /mnt/backups/daily/latest

echo "[$(date)] Backup completed successfully."
```

**Cron:** Täglich um 02:00 UTC
```cron
0 2 * * * /opt/odoo-stack/scripts/backup.sh >> /var/log/odoo-backup.log 2>&1
```

### 6.2 Offsite Backup

**Hetzner Storage Box (BX31):** 1 TB für €12,90/Monat

**Sync-Script:** `/opt/odoo-stack/scripts/offsite-sync.sh`

```bash
#!/bin/bash
# Encrypt und sync zu Hetzner Storage Box
gpg --encrypt --recipient backup@becker-sicherheit.de \
    /mnt/backups/daily/latest/postgres-prod.sql.gz

rsync -avz --delete \
    /mnt/backups/daily/ \
    u123456@u123456.your-storagebox.de:/odoo-backups/
```

**Cron:** Täglich um 05:00 UTC (nach lokalem Backup)

### 6.3 Disaster Recovery Szenarien

#### Szenario 1: Container Crash
**Problem:** Odoo Prod Container stoppt unerwartet  
**Recovery:**
```bash
docker-compose restart odoo_prod
# Downtime: ~30 Sekunden
```

#### Szenario 2: Datenbank Corruption
**Problem:** PostgreSQL DB korrupt  
**Recovery:**
```bash
# Stop Container
docker-compose stop odoo_prod

# Restore aus Backup
gunzip < /mnt/backups/daily/latest/postgres-prod.sql.gz | \
    docker exec -i odoo_postgres psql -U odoo -d odoo_prod

# Restart
docker-compose start odoo_prod
# Downtime: ~10 Minuten
```

#### Szenario 3: Kompletter Server-Ausfall
**Problem:** Hetzner Server defekt  
**Recovery:**
1. Neuen CCX33 provisionieren (15 min)
2. Docker + Docker Compose installieren (10 min)
3. Volumes von Snapshots wiederherstellen (30 min)
4. `docker-compose up -d` (5 min)
5. DNS umstellen (TTL: 300s)
**Gesamt: ~1 Stunde**

**RTO:** 2 Stunden  
**RPO:** 24 Stunden (tägliche Backups)

---

## 7. Monitoring & Alerting

### 7.1 Container Health Monitoring

**Docker Health Checks:** Bereits in `docker-compose.yml` definiert

**Überwachung via Systemd:**
```bash
# /etc/systemd/system/odoo-health-check.service
[Service]
ExecStart=/opt/odoo-stack/scripts/health-check.sh
```

**Health Check Script:**
```bash
#!/bin/bash
# Check if all containers are healthy
UNHEALTHY=$(docker ps --filter health=unhealthy --format '{{.Names}}')

if [ ! -z "$UNHEALTHY" ]; then
    echo "ALERT: Unhealthy containers: $UNHEALTHY"
    # Send Telegram notification
    curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d "chat_id=${CHAT_ID}" \
        -d "text=🚨 Docker Alert: $UNHEALTHY is unhealthy!"
fi
```

### 7.2 Resource Monitoring (Prometheus + cAdvisor)

**Docker Compose Ergänzung:**
```yaml
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    ports:
      - "8080:8080"
    networks:
      - odoo_network
```

**Metriken:**
- CPU/RAM Usage per Container
- Network I/O
- Disk I/O
- Container Restarts

### 7.3 Uptime Monitoring (Extern)

**UptimeRobot (Free Plan):**
- HTTPS Check: `https://odoo.becker-sicherheit.de/web/health` (5 Min Intervall)
- Alert via Email + SMS bei Downtime

**Ziel:** 99,5% Uptime = max. 3,6h Downtime/Monat

---

## 8. Deployment & CI/CD

### 8.1 Git Workflow

**Repository:** `git@github.com:c-led/becker-odoo.git`

**Branches:**
- `main` → Production
- `staging` → Test
- `develop` → Development

### 8.2 Deployment-Prozess

**Script:** `/opt/odoo-stack/scripts/deploy.sh`

```bash
#!/bin/bash
# Deploy zu Target Environment
ENV=$1  # prod | test | dev

echo "Deploying to $ENV..."

cd /opt/odoo-stack
git fetch origin

case $ENV in
  prod)
    git checkout main
    git pull origin main
    docker-compose up -d --no-deps --build odoo_prod
    docker exec odoo_prod odoo --update all --stop-after-init
    docker-compose restart odoo_prod
    ;;
  test)
    git checkout staging
    git pull origin staging
    docker-compose up -d --no-deps --build odoo_test
    ;;
  dev)
    git checkout develop
    git pull origin develop
    docker-compose up -d --no-deps --build odoo_dev
    ;;
esac

echo "Deployment to $ENV completed."
```

**Aufruf:**
```bash
# Deploy zu Test
./scripts/deploy.sh test

# Deploy zu Prod (mit Pre-Deploy Backup!)
./scripts/backup.sh && ./scripts/deploy.sh prod
```

### 8.3 Rollback-Strategie

**Bei Fehlern nach Deployment:**
```bash
# Git Revert auf letzten stabilen Commit
git revert HEAD
docker-compose up -d --no-deps --build odoo_prod

# ODER: DB Restore aus Backup
./scripts/restore.sh /mnt/backups/daily/2026-02-04/postgres-prod.sql.gz
```

**Max. Rollback-Zeit:** 15 Minuten

---

## 9. Performance-Optimierung

### 9.1 PostgreSQL Tuning

**Custom Config:** `/opt/odoo-stack/postgres/postgresql.conf`

```ini
# Memory Settings (4 GB für Container)
shared_buffers = 1GB
effective_cache_size = 3GB
work_mem = 32MB
maintenance_work_mem = 512MB

# Checkpoints
checkpoint_completion_target = 0.9
wal_buffers = 16MB
max_wal_size = 2GB

# Query Planner (SSD-optimiert)
random_page_cost = 1.1
effective_io_concurrency = 200

# Connections
max_connections = 100
```

**Mount in docker-compose.yml:**
```yaml
postgres:
  volumes:
    - ./postgres/postgresql.conf:/etc/postgresql/postgresql.conf
```

### 9.2 Odoo Worker Configuration

**Production (`config/odoo-prod.conf`):**
```ini
[options]
workers = 8
max_cron_threads = 2
limit_memory_hard = 2147483648  # 2 GB
limit_memory_soft = 1610612736  # 1.5 GB
limit_time_cpu = 600
limit_time_real = 1200
db_maxconn = 64

# Caching
enable_page_cache = True
cache_timeout = 100000

# Logging (Prod = weniger verbose)
log_level = warn
logfile = /var/log/odoo/odoo-server.log
```

**Test Environment:** 4 Workers, 1 GB Limit  
**Dev Environment:** 2 Workers, Debug Logging

### 9.3 Nginx Caching

```nginx
# Static Assets Caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}

# Gzip Compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript;
```

---

## 10. Skalierbarkeit & Upgrade-Pfade

### 10.1 Vertikale Skalierung (Scale-Up)

**Wenn 25 User nicht mehr ausreichen:**

| Szenario | Aktuell | Upgrade zu | Kosten Δ | Aufwand |
|----------|---------|------------|----------|---------|
| **Mehr RAM/CPU** | CCX33 (8/32) | CCX43 (16/64) | +€72/M | Server stoppen, Typ ändern, starten (10 Min) |
| **Mehr Workers** | 8 Workers | 12 Workers | €0 | Config-Änderung, Container restart |

**Docker macht Scale-Up einfach:** Resource Limits in `docker-compose.yml` anpassen, `docker-compose up -d`

### 10.2 Horizontale Skalierung (Scale-Out)

**Bei > 50 gleichzeitigen Usern: Multi-Server Setup**

**Architektur:**
```
[Hetzner Load Balancer]
        |
    +---+---+
    |       |
[Odoo 1] [Odoo 2]  (je 8 Workers)
    |       |
    +---+---+
        |
[PostgreSQL Server]  (Dedicated, CPX51)
        |
  [Redis Session Store]
```

**Migration:**
1. Prod auf eigenen Server (CCX33) migrieren
2. Zweiten Odoo-Server provisionieren
3. Load Balancer davor setzen
4. PostgreSQL auf dedizierten Server
5. Redis für Session-Sharing

**Downtime:** <30 Minuten (geplantes Wartungsfenster)

### 10.3 Storage-Wachstum

**Gebäudepläne-Volume Erweiterung:**

| Jahr | Neue Objekte | Storage Bedarf | Volume Größe | Monat. Kosten |
|------|--------------|----------------|--------------|---------------|
| 2026 | 1.000 | +50 GB | 300 GB | €15,00 |
| 2027 | 1.000 | +50 GB | 350 GB | €17,50 |
| 2028 | 1.000 | +50 GB | 400 GB | €20,00 |

**Resize (Online):**
```bash
# Hetzner Cloud Console: Volume erweitern
# Dann auf Server:
sudo resize2fs /dev/disk/by-id/scsi-0HC_Volume_123456
# Docker Containers bemerken Änderung automatisch
```

---

## 11. Kosten-Kalkulation

### 11.1 Monatliche Kosten (Docker Setup)

| Komponente | Typ | Kosten |
|------------|-----|--------|
| **Server** | CCX33 (8 vCPU, 32 GB) | €119,00 |
| **Volume: Odoo Data** | 150 GB SSD | €7,50 |
| **Volume: Building Plans** | 300 GB SSD | €15,00 |
| **Volume: Backups** | 500 GB Standard | €10,00 |
| **Hetzner Storage Box** | BX31 (1 TB Offsite) | €12,90 |
| **IPv4 Adresse** | 1x | €1,19 |
| **Traffic** | 20 TB inkl. | €0,00 |
| **SSL Zertifikat** | Let's Encrypt | €0,00 |
| **Monitoring** | UptimeRobot Free | €0,00 |
| **GESAMT** | | **€165,59/Monat** |

### 11.2 Vergleich: Docker vs. 3 Server

| Komponente | 3 Server (alt) | Docker (neu) | Ersparnis |
|------------|----------------|--------------|-----------|
| **Server** | €119 + €15,90 + €9,90 | €119 | -€25,80 |
| **Volumes** | €51,50 | €32,50 | -€19,00 |
| **IPv4** | €3,57 (3x) | €1,19 (1x) | -€2,38 |
| **Sonstiges** | €22,90 | €12,90 | -€10,00 |
| **SUMME** | **€199,67/M** | **€165,59/M** | **-€34,08/M** |

**Jährliche Ersparnis:** €409/Jahr  
**3-Jahres-Ersparnis:** €1.227

### 11.3 Kostenkontrolle

**Hetzner Cloud API + Alerting:**
- Monatliches Budget: €170
- Alert bei 80% (€136): Email an Billing
- Report: 1. jeden Monats

**Weitere Optimierungen:**
- Backup-Retention kürzen (30 → 14 Tage): -€3/M
- Dev-Container nachts stoppen: Keine Ersparnis (Server läuft 24/7)
- Standard Storage für Archive: -€2/M

---

## 12. Zeitplan & Rollout

### 12.1 Infrastruktur-Setup (Phase 1: Woche 1-2)

| Task | Dauer | Verantwortlich |
|------|-------|----------------|
| Hetzner Account + Server Provisionierung | 0,5 Tage | Becker / C-led |
| Volume Storage erstellen & mounten | 0,5 Tage | C-led |
| Ubuntu Base Setup (UFW, Updates, Hardening) | 0,5 Tage | C-led |
| Docker + Docker Compose Installation | 0,5 Tage | C-led |
| Docker Stack Setup (docker-compose.yml) | 1 Tag | C-led |
| Nginx + SSL Setup (Let's Encrypt) | 0,5 Tage | C-led |
| WireGuard VPN Setup | 0,5 Tage | C-led |
| Backup-Scripts + Cronjobs | 1 Tag | C-led |
| Monitoring Setup (cAdvisor + UptimeRobot) | 0,5 Tage | C-led |
| Testing (alle 3 Environments) | 1 Tag | C-led |
| **GESAMT** | **6,5 Tage** | |

**Meilenstein:** Docker-Infrastruktur Ready for Development

### 12.2 Go-Live Vorbereitung (nach Entwicklung)

| Task | Dauer | Verantwortlich |
|------|-------|----------------|
| Production Data Migration | 2 Tage | C-led + Becker |
| Load Testing (25+ Users) | 1 Tag | C-led |
| Security Audit | 1 Tag | C-led |
| Disaster Recovery Test | 0,5 Tage | C-led |
| User Training | 2 Tage | C-led |
| Go-Live (Samstag Nacht) | 4 Stunden | C-led (On-Call) |
| Post-Go-Live Monitoring | 1 Woche | C-led |

**Go-Live Plan:**
- Samstag 22:00: Wartungsmodus ON
- 22:00-23:00: Data Migration
- 23:00-00:30: Testing & Validation
- 00:30: Go-Live
- Sonntag 06:00: Monitoring & Bugfixes

---

## 13. Sicherheits-Checkliste

- [ ] **Firewall (UFW):** Nur 80/443/51820 öffentlich
- [ ] **SSH:** Key-basiert, nur via VPN nach Setup
- [ ] **VPN:** WireGuard für Admin-Zugang aktiv
- [ ] **SSL:** Let's Encrypt Zertifikate installiert
- [ ] **Docker:** Rootless Mode (optional, erhöht Sicherheit)
- [ ] **PostgreSQL:** Nur Docker-Netzwerk, keine externe Verbindung
- [ ] **Odoo Admin:** Default Password geändert
- [ ] **Secrets:** `.env` File für Passwörter (nicht in Git!)
- [ ] **Backups:** Automatisiert + Restore getestet
- [ ] **Monitoring:** Health Checks + Alerts aktiv
- [ ] **Logs:** Zentralisiert, Retention 90 Tage
- [ ] **Fail2Ban:** Installiert für SSH/Nginx Brute-Force Protection
- [ ] **Test Environment:** Basic Auth aktiviert

---

## 14. Management & Wartung

### 14.1 Häufige Befehle

```bash
# Stack starten
cd /opt/odoo-stack
docker-compose up -d

# Status checken
docker-compose ps
docker stats

# Logs anzeigen
docker-compose logs -f odoo_prod
docker-compose logs --tail=100 nginx

# Container restart
docker-compose restart odoo_prod

# Backup manuell ausführen
./scripts/backup.sh

# Update Odoo Image
docker-compose pull odoo
docker-compose up -d --no-deps odoo_prod
```

### 14.2 Wartungsfenster

| Typ | Zeitpunkt | Dauer | Frequenz |
|-----|-----------|-------|----------|
| **Routine Maintenance** | Sonntag 02:00-04:00 UTC | 2h | Monatlich |
| **Emergency Patches** | Nach Ankündigung | Variabel | Bei Bedarf |
| **Major Upgrades** | Samstag 22:00-02:00 UTC | 4h | Halbjährlich |

**Kommunikation:** 7 Tage Vorlauf via Email

### 14.3 Support-Levels (SLA)

| Priorität | Reaktionszeit | Lösung-Ziel | Beispiele |
|-----------|---------------|-------------|-----------|
| **Critical** | 30 Min | 4 Stunden | System down, Datenverlust |
| **High** | 2 Stunden | 8 Stunden | Performance-Probleme, Container-Ausfall |
| **Medium** | 1 Arbeitstag | 3 Arbeitstage | Bugs, kleinere Anpassungen |
| **Low** | 3 Arbeitstage | Nach Aufwand | Feature Requests |

---

## 15. Dokumentation & Übergabe

### 15.1 Technische Dokumentation

**Übergabe an Becker-Team:**
- [ ] Server-Zugangsdaten (Hetzner + SSH Key)
- [ ] Docker-Compose Files + Configs
- [ ] Backup & Recovery Runbook
- [ ] Deployment-Prozess Guide
- [ ] Troubleshooting Guide
- [ ] Monitoring Dashboard URLs

### 15.2 Knowledge Transfer

**Geplante Sessions:**
1. **Docker Basics** (2h): Container, Compose, Volumes
2. **Deployment Workshop** (2h): Git → Deploy → Rollback
3. **Backup & Recovery** (2h): Hands-On Restore
4. **Monitoring & Alerting** (1h): Dashboards, Interpretation

---

## 16. Anhänge

### 16.1 Nützliche Links

- **Hetzner Cloud:** https://www.hetzner.com/de/cloud
- **Docker Docs:** https://docs.docker.com/
- **Odoo Community:** https://www.odoo.com/documentation/17.0/
- **Nginx Docs:** https://nginx.org/en/docs/

### 16.2 Troubleshooting

**Problem:** Container startet nicht  
**Lösung:**
```bash
docker-compose logs odoo_prod
# Häufig: DB Connection Failed → Postgres zuerst starten
```

**Problem:** Out of Memory  
**Lösung:**
```bash
docker stats  # Identify memory hog
# Resource Limits in docker-compose.yml anpassen
```

**Problem:** Performance-Degradation  
**Lösung:**
```bash
# PostgreSQL VACUUM
docker exec odoo_postgres psql -U odoo -d odoo_prod -c "VACUUM ANALYZE;"
```

---

## 17. Approval & Sign-Off

| Rolle | Name | Unterschrift | Datum |
|-------|------|--------------|-------|
| **Projektleiter (C-led)** | Erik Reisig | | |
| **Kunde (Becker)** | Uwe Becker | | |

**Änderungshistorie:**

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0 | 05.02.2026 | Initiale Version (3 Server) | Erik Reisig |
| 2.0 | 05.02.2026 | Umstellung auf Docker + CCX33 | Erik Reisig |

---

**Kontakt:**  
C-led Solutions GmbH  
Erik Reisig (Geschäftsführer)  
Email: reisig@c-led.net  
Web: c-led.net

**Ende der Infrastruktur-Planung (Docker Edition)**
