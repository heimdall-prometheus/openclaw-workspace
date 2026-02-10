# Infrastruktur-Planung: Odoo ERP für Becker Sicherheitstechnik GmbH
## Dedicated Server mit Docker Multi-Environment Architektur

**Projekt:** CLED-2026-001/002  
**Kunde:** Becker Sicherheitstechnik GmbH  
**Version:** 2.0 (Dedicated)  
**Datum:** 05.02.2026  
**Autor:** C-led Solutions GmbH

---

## 1. Executive Summary

Diese Infrastruktur-Planung definiert eine **Docker-basierte Architektur auf Dedicated Server** für die Odoo ERP-Implementation bei Becker Sicherheitstechnik GmbH. Alle drei Umgebungen (Development, Test, Production) laufen auf **einem einzigen Hetzner Dedicated Server** als isolierte Docker Container mit Odoo Community Edition.

**Kernanforderungen:**
- 25 gleichzeitige Benutzer
- ~20.000 Produkte, ~10.000 Kunden
- ~5.000 Objekte mit Gebäudeplänen (je 50 MB = 250 GB Storage)
- 99,5% SLA-Ziel
- Tägliche Backups mit 30 Tagen Retention

**Architektur-Prinzipien:**
- **Single Dedicated Server:** Maximale Performance, keine Noisy-Neighbor-Probleme
- **Docker Isolation:** Prod/Test/Dev strikt getrennt
- **Resource Limits:** CPU/RAM pro Environment begrenzt
- **Persistent Volumes:** Daten überleben Container-Neustarts
- **Hardware RAID:** Redundante Disks für Datensicherheit

---

## 2. Server-Spezifikationen

### 2.1 Hetzner Dedicated Server AX52

**Zentrale Hardware für alle Environments:**

| Komponente | Spezifikation | Begründung |
|------------|---------------|------------|
| **CPU** | AMD Ryzen 7 3700X (8 Cores / 16 Threads @ 3.6 GHz) | Dedicated CPU Power, keine Throttling |
| **RAM** | 64 GB DDR4 ECC | Double the Cloud - 32 GB Prod + 16 GB Test + 8 GB Dev + 8 GB Reserve |
| **Disks** | 2x 512 GB NVMe SSD (RAID 1) | Hardware RAID für Redundanz, 512 GB nutzbar |
| **RAID Controller** | Software RAID (mdadm) | Standard bei Hetzner Server |
| **Network** | 1 Gbit/s Uplink | Unbegrenzt Traffic inklusive |
| **Region** | Falkenstein (FSN1-DC5) | DSGVO-konform, niedrige Latenz DE |
| **IPv4** | 1x inklusive | Primäre Zugriffs-IP |
| **Preis** | €51,00/Monat | Setup-Fee: €199 (einmalig) |

**Betriebssystem:** Ubuntu 24.04 LTS Server

**Disk Layout:**
```
/dev/md0 (RAID 1):
├── / (root)          100 GB  (OS, Docker, Logs)
├── /var/lib/docker   150 GB  (Container Images & Volumes)
├── /mnt/odoo-data    150 GB  (PostgreSQL + Filestores)
├── /mnt/building     250 GB  (Gebäudepläne - Start, kann wachsen)
└── /mnt/backups       50 GB  (Lokale Backups, 7 Tage Retention)
```

**RAID Monitoring:** `mdadm --monitor` mit Email-Alerts bei Disk-Fehler

---

## 3. Docker-Architektur

### 3.1 Container-Übersicht

```
┌─────────────────────────────────────────────────────────────┐
│     Hetzner Dedicated AX52 (8C/16T, 64 GB RAM, RAID 1)     │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  Nginx Proxy    │  │  PostgreSQL     │                  │
│  │  (Port 80/443)  │  │  (Multi-DB)     │                  │
│  │  CPU: 1.0       │  │  CPU: 2.0       │                  │
│  │  RAM: 2 GB      │  │  RAM: 8 GB      │                  │
│  └────────┬────────┘  └────────┬────────┘                  │
│           │                    │                            │
│  ┌────────┴────────────────────┴────────┐                  │
│  │        Docker Bridge Network          │                  │
│  └────┬────────────┬────────────┬────────┘                  │
│       │            │            │                           │
│  ┌────▼──────┐┌───▼──────┐┌───▼──────┐                    │
│  │ Odoo Prod ││Odoo Test ││ Odoo Dev │                    │
│  │ Port 8069 ││Port 8070 ││Port 8071 │                    │
│  │ CPU: 8    ││CPU: 4    ││CPU: 2    │                    │
│  │ RAM: 32GB ││RAM: 16GB ││RAM: 8GB  │                    │
│  └───────────┘└──────────┘└──────────┘                    │
│       │            │            │                           │
│  ┌────▼────────────▼────────────▼────────┐                 │
│  │       Persistent Volume Storage        │                 │
│  │  /mnt/odoo-data, /mnt/building-plans   │                 │
│  │         (RAID 1 Protected)             │                 │
│  └───────────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
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
      - /mnt/odoo-data/postgres:/var/lib/postgresql/data
      - ./postgres/postgresql.conf:/etc/postgresql/postgresql.conf
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    networks:
      - odoo_network
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 8G
        reservations:
          cpus: '1.5'
          memory: 6G
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
          cpus: '8.0'   # Kann alle Cores nutzen (Dedicated!)
          memory: 32G
        reservations:
          cpus: '6.0'
          memory: 24G
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
          cpus: '4.0'
          memory: 16G
        reservations:
          cpus: '3.0'
          memory: 12G

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
          cpus: '2.0'
          memory: 8G
        reservations:
          cpus: '1.0'
          memory: 4G

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
          cpus: '1.0'
          memory: 2G
```

### 3.3 Resource Allocation (Dedicated Hardware)

| Service | CPU Limit | CPU Reserve | RAM Limit | RAM Reserve |
|---------|-----------|-------------|-----------|-------------|
| **Odoo Prod** | 8.0 (alle Cores!) | 6.0 | 32 GB | 24 GB |
| **Odoo Test** | 4.0 | 3.0 | 16 GB | 12 GB |
| **Odoo Dev** | 2.0 | 1.0 | 8 GB | 4 GB |
| **PostgreSQL** | 2.0 | 1.5 | 8 GB | 6 GB |
| **Nginx** | 1.0 | 0.5 | 2 GB | 1 GB |
| **System** | - | 1.0 | - | 2 GB |
| **GESAMT** | 17.0 | 13.0 | 66 GB | 49 GB |

**Warum höhere Limits als Cloud?**
- **Dedicated CPU:** Keine Noisy Neighbors, volle Power
- **Mehr RAM:** 64 GB vs 32 GB - doppelt so viel Spielraum
- **Prod bekommt mehr:** 8 CPUs vs 4 in Cloud-Variante
- **Overhead für Bursts:** Test/Dev können bei Bedarf mehr nutzen

---

## 4. Storage-Architektur

### 4.1 RAID 1 Layout (512 GB nutzbar)

| Partition | Größe | Dateisystem | Mount Point | Zweck |
|-----------|-------|-------------|-------------|-------|
| **Root** | 100 GB | ext4 | / | OS, Docker, System-Logs |
| **Docker** | 150 GB | ext4 | /var/lib/docker | Container Images & Named Volumes |
| **Odoo Data** | 150 GB | ext4 | /mnt/odoo-data | PostgreSQL + Filestores (alle 3 Envs) |
| **Building Plans** | 250 GB | ext4 | /mnt/building-plans | Gebäudepläne (5.000 Objekte @ 50 MB) |
| **Backups** | 50 GB | ext4 | /mnt/backups | Lokale Backups (7 Tage Daily) |
| **Swap** | 16 GB | swap | - | Emergency Memory |

**Total:** 716 GB (passt auf 2x 512 GB RAID 1)

**RAID Monitoring:**
```bash
# Status checken
cat /proc/mdstat

# Email-Alerts bei Disk-Fehler
mdadm --monitor --scan --daemonise --mail=alert@becker-sicherheit.de
```

### 4.2 Storage-Verzeichnisstruktur

```
/mnt/odoo-data/
├── postgres/             # PostgreSQL Data Directory (50 GB)
│   └── 14/main/
├── prod/
│   └── filestore/        # Prod Attachments (30 GB)
├── test/
│   └── filestore/        # Test Attachments (10 GB)
└── dev/
    └── filestore/        # Dev Attachments (5 GB)

/mnt/building-plans/      # 250 GB Start, wächst +50 GB/Jahr
├── objects/
│   ├── OBJ-00001/
│   │   ├── floor-plans/
│   │   ├── photos/
│   │   └── metadata.json
│   └── OBJ-00002/
└── archive/

/mnt/backups/             # 50 GB = 7 Tage Retention
├── daily/
│   ├── 2026-02-05/
│   │   ├── postgres-prod.sql.gz (5 GB compressed)
│   │   ├── filestore-prod.tar.gz (3 GB)
│   │   └── building-plans-snapshot.tar.gz (250 MB incremental)
│   └── 2026-02-04/
└── logs/
```

### 4.3 Storage-Wachstum (3 Jahre Projection)

| Jahr | Neue Objekte | Building Plans | PostgreSQL | Total Bedarf |
|------|--------------|----------------|------------|--------------|
| **2026** | 1.000 | +50 GB | +10 GB | 310 GB |
| **2027** | 1.000 | +50 GB | +10 GB | 370 GB |
| **2028** | 1.000 | +50 GB | +10 GB | 430 GB |

**RAID 1 Kapazität:** 512 GB nutzbar  
**Puffer:** 82 GB nach 3 Jahren (16% Reserve)

**Bei Bedarf: Disk-Upgrade:**
- 2x 512 GB → 2x 1 TB NVMe (~€200 einmalig)
- RAID Rebuild während laufendem Betrieb (Downtime: 0 Min)

---

## 5. Netzwerk & Sicherheit

### 5.1 Nginx Reverse Proxy Konfiguration

**Datei:** `/opt/odoo-stack/nginx/sites-enabled/odoo.conf`

```nginx
# Production
upstream odoo_prod {
    server odoo_prod:8069;
    keepalive 64;
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

    client_max_body_size 100M;  # Größere Uploads für Gebäudepläne
    proxy_read_timeout 300s;
    proxy_connect_timeout 10s;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        proxy_pass http://odoo_prod;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        
        # WebSocket Support (für Live-Chat, Notifications)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Static Assets Caching
    location ~* /web/static/ {
        proxy_pass http://odoo_prod;
        proxy_cache_valid 200 90d;
        proxy_buffering on;
        expires 864000;
        add_header Cache-Control "public, immutable";
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}

# HTTP → HTTPS Redirect
server {
    listen 80;
    server_name odoo.becker-sicherheit.de;
    return 301 https://$server_name$request_uri;
}

# Test Environment (Basic Auth)
server {
    listen 443 ssl http2;
    server_name odoo-test.becker-sicherheit.de;
    
    ssl_certificate /etc/letsencrypt/live/odoo-test.becker-sicherheit.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/odoo-test.becker-sicherheit.de/privkey.pem;

    auth_basic "Test Environment - Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        proxy_pass http://odoo_test:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Development (nur via VPN)
upstream odoo_dev {
    server odoo_dev:8069;
}

server {
    listen 8071;
    server_name localhost;
    
    # Nur VPN-Clients
    allow 10.8.0.0/24;
    deny all;

    location / {
        proxy_pass http://odoo_dev;
        proxy_set_header Host $host;
    }
}
```

### 5.2 Firewall-Regeln (UFW)

| Port | Protokoll | Source | Zweck |
|------|-----------|--------|-------|
| 22 | TCP | VPN Only (10.8.0.0/24) | SSH Admin-Zugang |
| 80 | TCP | 0.0.0.0/0 | HTTP (Redirect zu HTTPS) |
| 443 | TCP | 0.0.0.0/0 | HTTPS Odoo Prod/Test |
| 51820 | UDP | 0.0.0.0/0 | WireGuard VPN |
| 8069-8071 | TCP | localhost | Odoo Containers (intern) |
| 5432 | TCP | 172.18.0.0/16 | PostgreSQL (Docker Network) |

**UFW Setup:**
```bash
# Default Deny
ufw default deny incoming
ufw default allow outgoing

# Öffentlich
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 51820/udp

# SSH nur nach VPN-Setup (vorher: von überall)
ufw allow 22/tcp
# Nach VPN-Setup:
# ufw delete allow 22/tcp
# ufw allow from 10.8.0.0/24 to any port 22 proto tcp

ufw enable
```

### 5.3 VPN-Zugang (WireGuard)

**Zweck:** Sicherer Admin-Zugang zu Dev-Environment + SSH

| Parameter | Wert |
|-----------|------|
| **Port** | 51820/UDP |
| **Subnet** | 10.8.0.0/24 |
| **Server IP** | 10.8.0.1 |
| **Clients** | 5 (C-led Team + Becker Admin) |
| **Routing** | Split Tunnel (nur Server 10.8.0.1/32) |

**WireGuard Config:** `/etc/wireguard/wg0.conf`

```ini
[Interface]
Address = 10.8.0.1/24
ListenPort = 51820
PrivateKey = <SERVER_PRIVATE_KEY>

# Client 1: C-led Admin
[Peer]
PublicKey = <CLIENT_1_PUBLIC_KEY>
AllowedIPs = 10.8.0.2/32

# Client 2: Becker Admin
[Peer]
PublicKey = <CLIENT_2_PUBLIC_KEY>
AllowedIPs = 10.8.0.3/32

# ... weitere Clients
```

**Client Config (Beispiel):**
```ini
[Interface]
PrivateKey = <CLIENT_PRIVATE_KEY>
Address = 10.8.0.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = <SERVER_PUBLIC_KEY>
Endpoint = <SERVER_PUBLIC_IP>:51820
AllowedIPs = 10.8.0.1/32  # Nur Server routen
PersistentKeepalive = 25
```

**Aktivierung:**
```bash
systemctl enable wg-quick@wg0
systemctl start wg-quick@wg0
```

---

## 6. Backup & Disaster Recovery

### 6.1 Lokale Backups (7 Tage Retention)

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

# Odoo Filestores (nur Prod kritisch)
tar -czf "$BACKUP_DIR/filestore-prod.tar.gz" /mnt/odoo-data/prod/filestore/
tar -czf "$BACKUP_DIR/filestore-test.tar.gz" /mnt/odoo-data/test/filestore/

# Gebäudepläne (inkrementell mit rsync)
rsync -av --link-dest=/mnt/backups/daily/latest /mnt/building-plans/ "$BACKUP_DIR/building-plans/"

# Backup Log
echo "Backup Size:" >> "$BACKUP_DIR/backup.log"
du -sh "$BACKUP_DIR" >> "$BACKUP_DIR/backup.log"

# Cleanup (7 Tage Retention auf lokalem Disk)
find /mnt/backups/daily/ -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null || true

# Symlink für inkrementelle Backups
ln -sfn "$BACKUP_DIR" /mnt/backups/daily/latest

echo "[$(date)] Backup completed successfully."
```

**Cron:** Täglich um 02:00 UTC
```cron
0 2 * * * /opt/odoo-stack/scripts/backup.sh >> /var/log/odoo-backup.log 2>&1
```

**Backup-Größen (geschätzt):**
- PostgreSQL Prod: ~5 GB compressed
- Filestore Prod: ~3 GB
- Building Plans: ~250 MB (inkrementell)
- **Total pro Tag:** ~8 GB
- **7 Tage:** ~56 GB (passt in 50 GB Partition mit Rotation)

### 6.2 Offsite Backup (Hetzner Storage Box)

**Hetzner Storage Box BX31:** 1 TB für €12,90/Monat

**Sync-Script:** `/opt/odoo-stack/scripts/offsite-sync.sh`

```bash
#!/bin/bash
set -e

DATE=$(date +%Y-%m-%d)
SOURCE="/mnt/backups/daily/latest"

echo "[$(date)] Starting offsite sync..."

# Verschlüsseln (GPG) + Rsync zu Storage Box
for FILE in "$SOURCE"/*.gz; do
    gpg --encrypt --recipient backup@becker-sicherheit.de "$FILE"
done

# Rsync mit Deduplizierung
rsync -avz --delete \
    --bwlimit=10000 \
    "$SOURCE/" \
    u123456@u123456.your-storagebox.de:/odoo-backups/daily/

# Monatliche Snapshots (1. des Monats)
if [ $(date +%d) -eq 01 ]; then
    MONTH=$(date +%Y-%m)
    rsync -av "$SOURCE/" \
        u123456@u123456.your-storagebox.de:/odoo-backups/monthly/$MONTH/
fi

echo "[$(date)] Offsite sync completed."
```

**Cron:** Täglich um 05:00 UTC (nach lokalem Backup)
```cron
0 5 * * * /opt/odoo-stack/scripts/offsite-sync.sh >> /var/log/odoo-offsite.log 2>&1
```

**Retention:**
- **Daily Backups:** 30 Tage (auf Storage Box)
- **Monthly Backups:** 12 Monate
- **Total Storage:** ~300 GB nach 1 Jahr (passt in 1 TB Box)

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
    docker exec -i odoo_postgres psql -U odoo -d postgres -c "DROP DATABASE odoo_prod;"
gunzip < /mnt/backups/daily/latest/postgres-prod.sql.gz | \
    docker exec -i odoo_postgres psql -U odoo -d postgres -c "CREATE DATABASE odoo_prod;"
gunzip < /mnt/backups/daily/latest/postgres-prod.sql.gz | \
    docker exec -i odoo_postgres psql -U odoo -d odoo_prod

# Restart
docker-compose start odoo_prod
# Downtime: ~15 Minuten
```

#### Szenario 3: RAID Disk Failure
**Problem:** Eine der 2 RAID-Disks stirbt  
**Recovery:**
```bash
# Automatisch: RAID 1 läuft weiter auf 1 Disk (degraded mode)
# Downtime: 0 Minuten

# Manuelle Aktion (kann während Betrieb):
# 1. Neue Disk einbauen (Hetzner Datacenter)
# 2. RAID rebuild starten
mdadm --manage /dev/md0 --add /dev/sdb
# Rebuild: ~2-4 Stunden, keine Downtime
```

#### Szenario 4: Kompletter Server-Ausfall (Hardware defekt)
**Problem:** Motherboard/CPU tot, Server nicht mehr bootbar  
**Recovery:**
1. **Neuen Dedicated Server bestellen** (AX52, 24h Bereitstellung bei Hetzner)
2. **Ubuntu installieren** (Remote Console, 30 Min)
3. **Docker + Stack Setup** (1h)
4. **Restore von Storage Box:**
   ```bash
   rsync -avz u123456@u123456.your-storagebox.de:/odoo-backups/daily/latest/ /mnt/backups/restore/
   gunzip < /mnt/backups/restore/postgres-prod.sql.gz | docker exec -i odoo_postgres psql -U odoo -d odoo_prod
   tar -xzf /mnt/backups/restore/filestore-prod.tar.gz -C /mnt/odoo-data/prod/
   tar -xzf /mnt/backups/restore/building-plans-snapshot.tar.gz -C /mnt/building-plans/
   ```
5. **DNS umstellen** (TTL: 300s = 5 Min Propagation)
6. **Go-Live**

**Gesamt-Downtime:** ~4-6 Stunden (inkl. Serverbestellung + Setup)

**RTO:** 8 Stunden (inkl. Puffer)  
**RPO:** 24 Stunden (tägliche Backups)

**Verbesserung möglich:**
- **Spare Server in Standby:** Monatliche Kosten +€51, RTO: 30 Minuten
- **Hetzner Rescue System:** Server neu installieren auf gleicher Hardware, RTO: 2h

---

## 7. Monitoring & Alerting

### 7.1 Container Health Monitoring

**Docker Health Checks:** Bereits in `docker-compose.yml` definiert

**Health Check Script:** `/opt/odoo-stack/scripts/health-check.sh`

```bash
#!/bin/bash
# Check if all containers are healthy
UNHEALTHY=$(docker ps --filter health=unhealthy --format '{{.Names}}')

if [ ! -z "$UNHEALTHY" ]; then
    echo "ALERT: Unhealthy containers: $UNHEALTHY"
    # Send Telegram notification
    curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d "chat_id=${CHAT_ID}" \
        -d "text=🚨 Odoo Docker Alert: $UNHEALTHY is unhealthy!"
fi

# Check RAID Status
if grep -q "\[U_\]" /proc/mdstat || grep -q "\[_U\]" /proc/mdstat; then
    echo "ALERT: RAID Degraded!"
    curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d "chat_id=${CHAT_ID}" \
        -d "text=🚨 RAID ALERT: Disk failure detected! Check /proc/mdstat"
fi
```

**Systemd Timer:** Alle 5 Minuten
```ini
# /etc/systemd/system/odoo-health-check.timer
[Unit]
Description=Odoo Health Check Timer

[Timer]
OnBootSec=5min
OnUnitActiveSec=5min

[Install]
WantedBy=timers.target
```

### 7.2 Resource Monitoring (Prometheus + cAdvisor + Node Exporter)

**Docker Compose Ergänzung:**
```yaml
  # cAdvisor: Container-Metriken
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

  # Node Exporter: Server-Hardware-Metriken
  node_exporter:
    image: prom/node-exporter:latest
    container_name: node_exporter
    command:
      - '--path.rootfs=/host'
    volumes:
      - /:/host:ro
    ports:
      - "9100:9100"
    networks:
      - odoo_network
    
  # Prometheus: Metriken-Sammlung
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - odoo_network
```

**Prometheus Config:** `prometheus/prometheus.yml`
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
  
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['node_exporter:9100']
```

**Metriken:**
- **Container:** CPU/RAM Usage, Network I/O, Disk I/O, Restarts
- **Hardware:** CPU Temp, Disk Health (SMART), RAM Usage, Network Throughput
- **RAID:** `/proc/mdstat` Monitoring (Custom Script)

### 7.3 Uptime Monitoring (Extern)

**UptimeRobot (Free Plan):**
- HTTPS Check: `https://odoo.becker-sicherheit.de/web/health` (5 Min Intervall)
- Alert via Email + SMS bei Downtime >5 Min

**Ziel:** 99,5% Uptime = max. 3,6h Downtime/Monat

---

## 8. Performance-Optimierung

### 8.1 PostgreSQL Tuning (8 GB RAM für Container)

**Custom Config:** `/opt/odoo-stack/postgres/postgresql.conf`

```ini
# Memory Settings (8 GB für Container, dedicated hardware!)
shared_buffers = 2GB          # 25% von 8 GB
effective_cache_size = 6GB    # 75% von 8 GB
work_mem = 64MB               # Mehr als Cloud (dediziert!)
maintenance_work_mem = 1GB

# Checkpoints
checkpoint_completion_target = 0.9
wal_buffers = 16MB
max_wal_size = 4GB            # Mehr als Cloud
min_wal_size = 1GB

# Query Planner (NVMe SSD-optimiert)
random_page_cost = 1.1
effective_io_concurrency = 300  # NVMe = mehr IOPS

# Connections
max_connections = 150         # Mehr als Cloud

# Parallelism (8 Cores dedicated!)
max_worker_processes = 8
max_parallel_workers_per_gather = 4
max_parallel_workers = 8
```

**Mount in docker-compose.yml:**
```yaml
postgres:
  volumes:
    - ./postgres/postgresql.conf:/etc/postgresql/postgresql.conf
  command: postgres -c config_file=/etc/postgresql/postgresql.conf
```

### 8.2 Odoo Worker Configuration

**Production (`config/odoo-prod.conf`):**
```ini
[options]
# Workers (2 * CPU Cores + 1) = 2 * 8 + 1 = 17
workers = 17
max_cron_threads = 4
limit_memory_hard = 2684354560  # 2.5 GB
limit_memory_soft = 2147483648  # 2 GB
limit_time_cpu = 600
limit_time_real = 1200
db_maxconn = 128                # Mehr Connections (dedicated!)

# Caching
enable_page_cache = True
cache_timeout = 100000

# Logging (Prod = weniger verbose)
log_level = warn
logfile = /var/log/odoo/odoo-server.log
log_handler = :WARNING,werkzeug:WARNING

# Performance
list_db = False
db_name = odoo_prod
```

**Test Environment:**
```ini
workers = 8
max_cron_threads = 2
limit_memory_hard = 2147483648  # 2 GB
limit_memory_soft = 1610612736  # 1.5 GB
db_maxconn = 64
```

**Dev Environment:**
```ini
workers = 4
max_cron_threads = 1
limit_memory_hard = 1610612736  # 1.5 GB
limit_memory_soft = 1073741824  # 1 GB
db_maxconn = 32
log_level = debug
```

### 8.3 Nginx Caching & Compression

```nginx
# HTTP/2 Server Push für kritische Assets
http2_push /web/static/src/css/base.css;
http2_push /web/static/src/js/boot.js;

# Static Assets Caching (aggressive)
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 90d;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Gzip Compression (high ratio für dedicated CPU)
gzip on;
gzip_vary on;
gzip_comp_level 6;
gzip_min_length 1024;
gzip_proxied any;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

# Brotli Compression (besser als Gzip, aber CPU-intensiver)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
```

---

## 9. Skalierbarkeit & Upgrade-Pfade

### 9.1 Vertikale Skalierung (Scale-Up)

**Aktuell:** AX52 (8C/16T, 64 GB RAM, 2x 512 GB NVMe)

**Upgrade-Optionen:**

| Szenario | Upgrade zu | Kosten Δ | Aufwand |
|----------|------------|----------|---------|
| **Mehr CPU** | PX92 (AMD Ryzen 9 5950X, 16C/32T, 128 GB) | +€114/M (€165 total) | Server Migration (4h Downtime) |
| **Mehr Storage** | 2x 1 TB NVMe statt 2x 512 GB | +€50 einmalig (Disk-Upgrade via Support) | RAID Rebuild (2h, keine Downtime) |
| **Mehr Workers** | 17 → 25 Workers | €0 | Config-Änderung, Container restart (1 Min Downtime) |

**Storage Upgrade (In-Place, Zero Downtime):**
1. Hetzner Support kontaktieren: Disk-Upgrade auf 2x 1 TB
2. Techniker baut neue Disks ein (während Server läuft)
3. RAID Rebuild: `mdadm --grow /dev/md0 --size=max`
4. Filesystem erweitern: `resize2fs /dev/md0`
5. Fertig - keine Downtime

### 9.2 Horizontale Skalierung (Scale-Out)

**Bei > 50 gleichzeitigen Usern: Multi-Server Setup**

**Architektur:**
```
[Hetzner Load Balancer LB11]  €5/M
        |
    +---+---+
    |       |
[AX52 #1] [AX52 #2]  (je 17 Workers)
    |       |
    +---+---+
        |
[PostgreSQL Server PX62]  (32C/256GB)
        |
  [Redis Session Store]  (Shared Sessions)
```

**Migration:**
1. Zweiten AX52 provisionieren (€51/M)
2. PostgreSQL auf dedizierten PX62 migrieren (€239/M)
3. Redis für Session-Sharing (HA Cluster)
4. Hetzner Load Balancer davor (€5/M)
5. Filestore auf Ceph/GlusterFS (Shared Storage)

**Kosten Scale-Out:** €51 + €239 + €5 = €295/M zusätzlich = **€346/M total**

**Downtime:** <30 Minuten (geplantes Wartungsfenster)

### 9.3 Storage-Wachstum (5 Jahre Projection)

| Jahr | Objekte | Building Plans | PostgreSQL | Backups | Total |
|------|---------|----------------|------------|---------|-------|
| **2026** | 5.000 | 250 GB | 50 GB | 50 GB | 450 GB |
| **2027** | 6.000 | 300 GB | 60 GB | 60 GB | 520 GB ⚠️ |
| **2028** | 7.000 | 350 GB | 70 GB | 70 GB | 590 GB |
| **2029** | 8.000 | 400 GB | 80 GB | 80 GB | 660 GB |
| **2030** | 9.000 | 450 GB | 90 GB | 90 GB | 730 GB |

**⚠️ Disk-Upgrade nötig:** Ende 2026/Anfang 2027 (1 TB Disks)

**Upgrade Path:**
- **2026:** 2x 512 GB RAID 1 (512 GB nutzbar)
- **2027:** 2x 1 TB RAID 1 (1 TB nutzbar) - €50 Upgrade
- **2029:** 2x 2 TB RAID 1 (2 TB nutzbar) - €150 Upgrade

---

## 10. Kosten-Kalkulation

### 10.1 Monatliche Kosten (Dedicated Setup)

| Komponente | Typ | Kosten |
|------------|-----|--------|
| **Server** | Hetzner AX52 (8C/16T, 64 GB, 2x 512 GB NVMe) | €51,00 |
| **Storage Box** | BX31 (1 TB Offsite Backup) | €12,90 |
| **Traffic** | Unbegrenzt inkl. | €0,00 |
| **SSL Zertifikat** | Let's Encrypt | €0,00 |
| **Monitoring** | UptimeRobot Free | €0,00 |
| **GESAMT** | | **€63,90/Monat** |

**Einmalige Kosten:**
- **Setup Fee:** €199 (nur 1x beim ersten Server)
- **Disk Upgrade (2027):** €50 (optional, wenn Storage voll)

### 10.2 Vergleich: Dedicated vs. Cloud Docker

| Komponente | Cloud (CCX33) | Dedicated (AX52) | Ersparnis |
|------------|---------------|------------------|-----------|
| **Server** | €119,00 | €51,00 | **-€68,00** |
| **Volumes (3x)** | €32,50 | €0,00 (on-board) | **-€32,50** |
| **IPv4** | €1,19 | €0,00 (inkl.) | **-€1,19** |
| **Storage Box** | €12,90 | €12,90 | €0,00 |
| **SUMME** | **€165,59/M** | **€63,90/M** | **-€101,69/M** |

**Jährliche Ersparnis:** €1.220/Jahr  
**3-Jahres-Ersparnis:** €3.660 (abzgl. Setup €199) = **€3.461 netto**

**Amortisierung:** Setup-Fee (€199) amortisiert sich in 2 Monaten!

### 10.3 TCO (Total Cost of Ownership) - 3 Jahre

| Kostenart | Cloud CCX33 | Dedicated AX52 | Differenz |
|-----------|-------------|----------------|-----------|
| **Monatliche Kosten** | €165,59 × 36 | €63,90 × 36 | - |
| **Setup** | €0 | €199 (1x) | +€199 |
| **Disk Upgrade (2027)** | €0 | €50 (1x) | +€50 |
| **GESAMT 3 Jahre** | **€5.961** | **€2.549** | **-€3.412** |

**ROI:** 57% Kostenersparnis über 3 Jahre!

### 10.4 Break-Even bei Scale-Out

**Wann lohnt sich Cloud wieder?**

| Setup | Monatliche Kosten | Szenario |
|-------|-------------------|----------|
| **Dedicated Single** | €63,90 | 1-50 User ✅ |
| **Cloud Single** | €165,59 | NIE (teurer bei gleicher Leistung) ❌ |
| **Dedicated Scale-Out** | €346,00 | 50-100 User |
| **Cloud Scale-Out** | ~€400,00 | 50-100 User (CCX43 + 2x CCX23) |

**Fazit:** Dedicated ist IMMER günstiger (Single + Scale-Out)!

---

## 11. Zeitplan & Rollout

### 11.1 Infrastruktur-Setup (Phase 1: Woche 1-2)

| Task | Dauer | Verantwortlich | Notizen |
|------|-------|----------------|---------|
| Hetzner Dedicated Server Bestellung | 1 Tag | Becker / C-led | 24h Bereitstellung |
| Server Bereitstellung (Hetzner) | 1 Tag | Hetzner | Automatisch |
| Ubuntu Base Setup (RAID, Partitioning) | 0,5 Tage | C-led | RAID 1 + LVM |
| Security Hardening (UFW, Fail2Ban, SSH) | 0,5 Tage | C-led | SSH Keys Only |
| Docker + Docker Compose Installation | 0,5 Tage | C-led | Docker CE |
| Docker Stack Setup (docker-compose.yml) | 1 Tag | C-led | Alle 3 Envs |
| Nginx + SSL Setup (Let's Encrypt) | 0,5 Tage | C-led | Wildcard Cert |
| WireGuard VPN Setup | 0,5 Tage | C-led | 5 Clients |
| Backup-Scripts + Cronjobs | 1 Tag | C-led | Lokal + Offsite |
| Monitoring Setup (Prometheus + Grafana) | 1 Tag | C-led | Dashboards |
| RAID Monitoring + Alerts | 0,5 Tage | C-led | mdadm + Email |
| Testing (alle 3 Environments) | 1 Tag | C-led | Smoke Tests |
| **GESAMT** | **8 Tage** | | +1 Tag vs Cloud (wegen RAID Setup) |

**Meilenstein:** Docker-Infrastruktur Ready for Development

### 11.2 Go-Live Vorbereitung (nach Entwicklung)

| Task | Dauer | Verantwortlich |
|------|-------|----------------|
| Production Data Migration | 2 Tage | C-led + Becker |
| Load Testing (25+ Users, JMeter) | 1 Tag | C-led |
| Security Audit (Nmap, OWASP ZAP) | 1 Tag | C-led |
| Disaster Recovery Test (Full Restore) | 1 Tag | C-led |
| User Training | 2 Tage | C-led |
| Go-Live (Samstag Nacht) | 4 Stunden | C-led (On-Call) |
| Post-Go-Live Monitoring | 1 Woche | C-led |

**Go-Live Plan:**
- Samstag 22:00: Wartungsmodus ON
- 22:00-00:00: Data Migration (2h statt 1h, weil lokal)
- 00:00-00:30: Testing & Validation
- 00:30: Go-Live
- Sonntag 06:00: Monitoring & Bugfixes

---

## 12. Sicherheits-Checkliste

- [ ] **Firewall (UFW):** Nur 80/443/51820 öffentlich
- [ ] **SSH:** Key-basiert, nur via VPN nach Setup
- [ ] **VPN:** WireGuard für Admin-Zugang aktiv
- [ ] **SSL:** Let's Encrypt Wildcard Zertifikat
- [ ] **Docker:** Rootless Mode (optional, erhöht Sicherheit)
- [ ] **PostgreSQL:** Nur Docker-Netzwerk, keine externe Verbindung
- [ ] **Odoo Admin:** Default Password geändert
- [ ] **Secrets:** `.env` File für Passwörter (nicht in Git!)
- [ ] **Backups:** Automatisiert + Verschlüsselt + Restore getestet
- [ ] **RAID Monitoring:** mdadm + Email-Alerts
- [ ] **Monitoring:** Health Checks + Prometheus + Alerts
- [ ] **Logs:** Zentralisiert, Retention 90 Tage
- [ ] **Fail2Ban:** Installiert für SSH/Nginx Brute-Force Protection
- [ ] **Test Environment:** Basic Auth aktiviert
- [ ] **AppArmor/SELinux:** Docker-Profile aktiv

---

## 13. Vor- und Nachteile: Dedicated vs. Cloud

### 13.1 Vorteile Dedicated Server

✅ **Kosten:** 61% günstiger (€63,90 vs €165,59/M)  
✅ **Performance:** Dedicated CPU, keine Noisy Neighbors  
✅ **RAM:** Doppelt so viel (64 GB vs 32 GB)  
✅ **Storage:** Lokal auf NVMe, keine Volume-Kosten  
✅ **RAID:** Hardware-Redundanz inklusive  
✅ **Unbegrenzter Traffic:** Keine Mehrkosten  
✅ **Predictable Performance:** Keine Cloud-Throttling  

### 13.2 Nachteile Dedicated Server

❌ **Setup-Fee:** €199 einmalig (aber nach 2 Monaten amortisiert)  
❌ **Bereitstellung:** 24h statt 5 Min (Cloud sofort)  
❌ **Skalierung:** Nicht instant (Server Migration nötig)  
❌ **Disaster Recovery:** 4-8h statt 1h (Cloud: Snapshot Restore)  
❌ **Keine Snapshots:** Backups nur via Rsync/Dump  
❌ **Hardware-Risiko:** Bei Defekt 24h Wartezeit auf neuen Server  

### 13.3 Wann welche Option?

| Anforderung | Cloud CCX33 | Dedicated AX52 |
|-------------|-------------|----------------|
| **Schneller Start** | ✅ (5 Min) | ❌ (24h) |
| **Budget < €100/M** | ❌ (€165,59) | ✅ (€63,90) |
| **Max. Performance** | ❌ (Shared CPU) | ✅ (Dedicated) |
| **Instant Scaling** | ✅ (Resize) | ❌ (Migration) |
| **Hohe Verfügbarkeit** | ✅ (Snapshots) | ⚠️ (RAID + Backup) |
| **TCO 3 Jahre** | €5.961 | €2.549 ✅ |

**Empfehlung für Becker:**
- **Start:** Dedicated AX52 (Budget + Performance)
- **Bei Wachstum > 50 User:** Scale-Out mit 2x AX52
- **Cloud nur wenn:** Schneller PoC (<1 Woche), dann Migration zu Dedicated

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

# RAID Status
cat /proc/mdstat
mdadm --detail /dev/md0

# Disk Health (SMART)
smartctl -a /dev/sda
smartctl -a /dev/sdb

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
| **RAID Rebuild** | Nach Disk-Austausch | 2-4h | Bei Bedarf |
| **Emergency Patches** | Nach Ankündigung | Variabel | Bei Bedarf |
| **Major Upgrades** | Samstag 22:00-02:00 UTC | 4h | Halbjährlich |

**Kommunikation:** 7 Tage Vorlauf via Email

### 14.3 Support-Levels (SLA)

| Priorität | Reaktionszeit | Lösung-Ziel | Beispiele |
|-----------|---------------|-------------|-----------|
| **Critical** | 30 Min | 4 Stunden | System down, RAID Degraded, Datenverlust |
| **High** | 2 Stunden | 8 Stunden | Performance-Probleme, Container-Ausfall |
| **Medium** | 1 Arbeitstag | 3 Arbeitstage | Bugs, kleinere Anpassungen |
| **Low** | 3 Arbeitstage | Nach Aufwand | Feature Requests |

---

## 15. Dokumentation & Übergabe

### 15.1 Technische Dokumentation

**Übergabe an Becker-Team:**
- [ ] Server-Zugangsdaten (Hetzner Robot + SSH Key)
- [ ] Docker-Compose Files + Configs
- [ ] Backup & Recovery Runbook
- [ ] RAID Monitoring & Disk-Austausch Guide
- [ ] Deployment-Prozess Guide
- [ ] Troubleshooting Guide
- [ ] Monitoring Dashboard URLs (Prometheus/Grafana)

### 15.2 Knowledge Transfer

**Geplante Sessions:**
1. **Docker Basics** (2h): Container, Compose, Volumes
2. **Deployment Workshop** (2h): Git → Deploy → Rollback
3. **Backup & Recovery** (2h): Hands-On Restore
4. **RAID Management** (2h): mdadm, Disk-Austausch, Monitoring
5. **Monitoring & Alerting** (1h): Dashboards, Interpretation

---

## 16. Anhänge

### 16.1 Nützliche Links

- **Hetzner Dedicated:** https://www.hetzner.com/de/dedicated-rootserver
- **Docker Docs:** https://docs.docker.com/
- **Odoo Community:** https://www.odoo.com/documentation/17.0/
- **Nginx Docs:** https://nginx.org/en/docs/
- **mdadm Guide:** https://raid.wiki.kernel.org/index.php/RAID_setup

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

# Check Disk I/O
iostat -x 5
```

**Problem:** RAID Degraded  
**Lösung:**
```bash
# Status checken
cat /proc/mdstat

# Failed Disk identifizieren
mdadm --detail /dev/md0

# Hetzner Support kontaktieren für Disk-Austausch
# Nach Austausch: Rebuild
mdadm --manage /dev/md0 --add /dev/sdb
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
| 1.0 | 05.02.2026 | Initiale Version (Cloud) | Erik Reisig |
| 2.0 | 05.02.2026 | Dedicated Server mit Docker | Erik Reisig |

---

**Kontakt:**  
C-led Solutions GmbH  
Erik Reisig (Geschäftsführer)  
Email: reisig@c-led.net  
Web: c-led.net

**Ende der Infrastruktur-Planung (Dedicated Edition)**
