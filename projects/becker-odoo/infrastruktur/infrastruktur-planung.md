# Infrastruktur-Planung: Odoo ERP für Becker Sicherheitstechnik GmbH

**Projekt:** CLED-2026-001/002  
**Kunde:** Becker Sicherheitstechnik GmbH  
**Version:** 1.0  
**Datum:** 05.02.2026  
**Autor:** C-led Solutions GmbH

---

## 1. Executive Summary

Diese Infrastruktur-Planung definiert die technische Architektur für die Odoo ERP-Implementation bei Becker Sicherheitstechnik GmbH. Das System wird auf Hetzner Cloud gehostet mit drei separaten Umgebungen (Development, Test, Production) und verwendet Odoo Community Edition.

**Kernanforderungen:**
- 25 gleichzeitige Benutzer
- ~20.000 Produkte, ~10.000 Kunden
- ~5.000 Objekte mit Gebäudeplänen (je 50 MB = 250 GB Storage)
- 99,5% SLA-Ziel
- Tägliche Backups mit 30 Tagen Retention

---

## 2. Server-Sizing & Hardware-Spezifikationen

### 2.1 Production Environment

**Server-Typ:** Hetzner CCX33 (Dedicated vCPU)

| Komponente | Spezifikation | Begründung |
|------------|---------------|------------|
| **vCPU** | 8 Dedicated Cores | 25 User + Background Jobs + Reporting |
| **RAM** | 32 GB | Odoo-Prozesse (8 Workers à 2 GB) + PostgreSQL (8 GB) + OS/Cache (8 GB) |
| **Root Disk** | 240 GB NVMe SSD | OS, Odoo-Installation, Temp-Files |
| **Region** | Falkenstein (fsn1) | DSGVO-konform, niedrige Latenz DE |
| **IPv4** | Ja | Primäre Zugriffs-IP |
| **Backup** | Via Volume Storage | Separates Backup-Konzept |

**Odoo Worker Configuration:**
```ini
workers = 8
max_cron_threads = 2
limit_memory_hard = 2684354560  # 2.5 GB per worker
limit_memory_soft = 2147483648  # 2 GB per worker
limit_time_cpu = 600
limit_time_real = 1200
```

### 2.2 Test Environment

**Server-Typ:** Hetzner CPX31

| Komponente | Spezifikation | Begründung |
|------------|---------------|------------|
| **vCPU** | 4 Shared Cores | Realistisches Testing mit 5-10 User |
| **RAM** | 8 GB | 4 Workers + PostgreSQL |
| **Root Disk** | 160 GB NVMe SSD | OS + Odoo + Testdaten |
| **Region** | Falkenstein (fsn1) | Gleiche Region wie Prod |

**Odoo Worker Configuration:**
```ini
workers = 4
max_cron_threads = 1
limit_memory_hard = 2147483648
limit_memory_soft = 1610612736
```

### 2.3 Development Environment

**Server-Typ:** Hetzner CPX21

| Komponente | Spezifikation | Begründung |
|------------|---------------|------------|
| **vCPU** | 3 Shared Cores | Entwicklung & Debugging |
| **RAM** | 4 GB | 2 Workers + PostgreSQL |
| **Root Disk** | 80 GB NVMe SSD | OS + Odoo + Entwickler-Tools |
| **Region** | Falkenstein (fsn1) | Konsistenz |

**Odoo Worker Configuration:**
```ini
workers = 2
max_cron_threads = 1
limit_memory_hard = 1610612736
limit_memory_soft = 1073741824
```

---

## 3. Volume Storage Architektur

**WICHTIG:** Persistente Daten werden auf separaten Block Storage Volumes gespeichert, NICHT im Server Image. Dies ermöglicht:
- Server-Upgrades ohne Datenverlust
- Snapshots & Backups unabhängig vom Server
- Skalierbarkeit bei wachsendem Datenvolumen

### 3.1 Production Storage Volumes

#### Volume 1: Odoo Filestore & Datenbank
| Parameter | Wert |
|-----------|------|
| **Name** | `prod-odoo-data` |
| **Größe** | 100 GB |
| **Typ** | SSD (Volumes) |
| **Mount Point** | `/mnt/odoo-data` |
| **Inhalt** | PostgreSQL Data Dir, Odoo Filestore |
| **Auto-Resize** | Bei 80% Auslastung warnen |

**Verzeichnisstruktur:**
```
/mnt/odoo-data/
├── postgresql/           # PostgreSQL 14 Data Directory
│   └── 14/main/
└── odoo/
    └── filestore/        # Odoo Attachments (nicht Gebäudepläne)
```

#### Volume 2: Gebäudepläne & Objekt-Attachments
| Parameter | Wert |
|-----------|------|
| **Name** | `prod-building-plans` |
| **Größe** | 300 GB (Start: 250 GB + 20% Buffer) |
| **Typ** | SSD (Volumes) |
| **Mount Point** | `/mnt/building-plans` |
| **Inhalt** | PDF, DWG, Bilder von 5.000+ Objekten |
| **Wachstum** | +50 GB/Jahr (ca. 1.000 neue Objekte) |

**Verzeichnisstruktur:**
```
/mnt/building-plans/
├── objects/
│   ├── OBJ-00001/       # Pro Objekt ein Ordner
│   │   ├── floor-plans/
│   │   ├── photos/
│   │   └── metadata.json
│   └── OBJ-00002/
└── archive/             # Abgeschlossene Projekte
```

#### Volume 3: Backup Storage
| Parameter | Wert |
|-----------|------|
| **Name** | `prod-backups` |
| **Größe** | 500 GB (Start) |
| **Typ** | Standard (günstiger) |
| **Mount Point** | `/mnt/backups` |
| **Retention** | 30 Tage Daily + 12 Monate Monthly |
| **Inhalt** | PostgreSQL Dumps, Filestore Snapshots |

**Backup-Schema:**
```
/mnt/backups/
├── daily/
│   ├── 2026-02-05/
│   │   ├── db-dump.sql.gz
│   │   └── filestore.tar.gz
│   └── 2026-02-04/
├── monthly/
│   └── 2026-02/
└── logs/
```

### 3.2 Test Environment Storage

| Volume | Größe | Typ | Mount Point |
|--------|-------|-----|-------------|
| `test-odoo-data` | 50 GB | SSD | `/mnt/odoo-data` |
| `test-building-plans` | 100 GB | Standard | `/mnt/building-plans` |
| `test-backups` | 100 GB | Standard | `/mnt/backups` |

**Hinweis:** Test-Environment enthält Subset der Produktionsdaten (ca. 25% des Volumens).

### 3.3 Development Environment Storage

| Volume | Größe | Typ | Mount Point |
|--------|-------|-----|-------------|
| `dev-odoo-data` | 30 GB | SSD | `/mnt/odoo-data` |
| `dev-backups` | 20 GB | Standard | `/mnt/backups` |

**Hinweis:** Dev nutzt Mock-Daten, keine echten Gebäudepläne.

---

## 4. Netzwerk & Sicherheit

### 4.1 Firewall-Regeln (UFW)

**Production Server:**

| Port | Protokoll | Source | Zweck |
|------|-----------|--------|-------|
| 22 | TCP | Büro-IP + VPN | SSH Admin-Zugang |
| 80 | TCP | 0.0.0.0/0 | HTTP (Redirect zu HTTPS) |
| 443 | TCP | 0.0.0.0/0 | HTTPS Odoo-Zugriff |
| 5432 | TCP | Test/Dev IPs | PostgreSQL (nur interne Replikation) |
| 8069 | TCP | localhost | Odoo (über Nginx Proxy) |

**Default Policy:** DENY ALL, whitelist only

### 4.2 SSL/TLS Konfiguration

| Parameter | Wert |
|-----------|------|
| **Zertifikat** | Let's Encrypt (Certbot) |
| **Renewal** | Automatisch via Cronjob |
| **Domains** | `odoo.becker-sicherheit.de` (Prod)<br>`odoo-test.becker-sicherheit.de` (Test) |
| **TLS Version** | TLS 1.2 minimum, TLS 1.3 preferred |
| **Cipher Suites** | Mozilla Modern Compatibility |

**Nginx SSL Config:**
```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256...';
ssl_prefer_server_ciphers off;
add_header Strict-Transport-Security "max-age=63072000" always;
```

### 4.3 VPN-Zugang für Admins

**Lösung:** WireGuard VPN

| Parameter | Wert |
|-----------|------|
| **Port** | 51820/UDP |
| **Subnet** | 10.8.0.0/24 |
| **Clients** | 5 (Admin-Team) |
| **Routing** | Split Tunnel (nur Odoo-Netz) |

**Zweck:** Sicherer SSH-Zugang ohne öffentliches Expose von Port 22.

### 4.4 Zugriffskontrolle

| Benutzergruppe | Zugriff | Authentifizierung |
|----------------|---------|-------------------|
| **Becker Mitarbeiter** | Odoo Web UI | Username/Password + 2FA (optional) |
| **Admins (C-led)** | SSH + Odoo Backend | SSH Key + WireGuard VPN |
| **API Clients** | REST API | API Key (Odoo Token) |

---

## 5. Backup & Disaster Recovery

### 5.1 Backup-Strategie

**Automatisierte Backups via Cron:**

| Typ | Zeitpunkt | Retention | Speicherort |
|-----|-----------|-----------|-------------|
| **Database Dump** | 02:00 UTC täglich | 30 Tage | `/mnt/backups/daily/` |
| **Filestore Snapshot** | 02:30 UTC täglich | 30 Tage | `/mnt/backups/daily/` |
| **Building Plans Snapshot** | 03:00 UTC täglich | 30 Tage | `/mnt/backups/daily/` |
| **Volume Snapshot (Hetzner)** | 04:00 UTC täglich | 7 Tage | Hetzner Cloud |
| **Monthly Full Backup** | 1. jeden Monats | 12 Monate | `/mnt/backups/monthly/` + Offsite |

**Backup-Script (Beispiel für PostgreSQL):**
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/mnt/backups/daily/$DATE"
mkdir -p $BACKUP_DIR

# PostgreSQL Dump
sudo -u postgres pg_dump odoo_prod | gzip > $BACKUP_DIR/db-dump.sql.gz

# Filestore Backup
tar -czf $BACKUP_DIR/filestore.tar.gz /mnt/odoo-data/odoo/filestore/

# Gebäudepläne (inkrementell mit rsync)
rsync -av --link-dest=/mnt/backups/daily/latest /mnt/building-plans/ $BACKUP_DIR/building-plans/

# Cleanup (30 Tage Retention)
find /mnt/backups/daily/ -type d -mtime +30 -exec rm -rf {} \;
```

### 5.2 Offsite Backup

**Lösung:** Hetzner Storage Box (BX31)

| Parameter | Wert |
|-----------|------|
| **Speicher** | 1 TB |
| **Protokoll** | rsync über SSH |
| **Zeitpunkt** | 05:00 UTC täglich (nach lokalem Backup) |
| **Verschlüsselung** | GPG vor Upload |
| **Retention** | 90 Tage |

**Warum Offsite?**
- Schutz vor Data Center Ausfall
- Ransomware Protection (read-only Mount)
- Compliance (DSGVO empfiehlt Offsite-Kopien)

### 5.3 Disaster Recovery Plan

**Recovery Time Objective (RTO):** 4 Stunden  
**Recovery Point Objective (RPO):** 24 Stunden (tägliche Backups)

**Recovery-Prozess:**

1. **Server-Ausfall:**
   - Neuen Server in Hetzner provisionieren (15 min)
   - Volume Storage re-attachen (5 min)
   - Odoo/PostgreSQL starten (10 min)
   - DNS umstellen (TTL: 300s)
   - **Gesamt:** ~45 Minuten

2. **Datenverlust (Corruption):**
   - Volume Snapshot wiederherstellen (30 min)
   - PostgreSQL Recovery aus Dump (1-2 Stunden bei 20k Produkten)
   - **Gesamt:** ~2-3 Stunden

3. **Ransomware/Malware:**
   - Server neu aufsetzen (1 Stunde)
   - Offsite Backup wiederherstellen (2 Stunden)
   - **Gesamt:** ~3-4 Stunden

**Jährlicher DR-Test:** Einmal pro Jahr wird ein Recovery-Test durchgeführt (dokumentiert).

---

## 6. Monitoring & Alerting

### 6.1 System-Monitoring

**Tool:** Prometheus + Grafana (gehostet auf separatem Monitoring-Server oder Managed Service)

| Metrik | Threshold Warning | Threshold Critical |
|--------|-------------------|-------------------|
| **CPU Auslastung** | 70% (5 min Avg) | 85% (5 min Avg) |
| **RAM Nutzung** | 80% | 90% |
| **Disk Space (Root)** | 75% | 85% |
| **Disk Space (Volumes)** | 80% | 90% |
| **Network I/O** | 80% Link Capacity | 95% Link Capacity |
| **PostgreSQL Connections** | 80% von max_connections | 95% von max_connections |

**Node Exporter Metriken:**
- CPU, Memory, Disk, Network
- System Load Average
- Disk I/O Operations

### 6.2 Odoo-spezifisches Monitoring

| Metrik | Beschreibung | Alert |
|--------|--------------|-------|
| **HTTP Response Time** | Nginx → Odoo Latency | >2s (P95) |
| **Database Query Time** | Slow Queries | >5s |
| **Worker Availability** | Anzahl aktiver Workers | <4 von 8 |
| **Queue Length** | Odoo Job Queue | >100 pending |
| **Login Failures** | Brute-Force Detection | >10 Fails/min |
| **Disk I/O Wait** | PostgreSQL Bottleneck | >20% iowait |

**Odoo Logs zu überwachen:**
- `/var/log/odoo/odoo-server.log` (Errors/Warnings)
- Nginx Access/Error Logs
- PostgreSQL Slow Query Log

### 6.3 Uptime Monitoring (Extern)

**Service:** UptimeRobot (oder BetterUptime)

| Check | Intervall | Alert-Kanal |
|-------|-----------|-------------|
| **HTTPS Health Check** | 5 Minuten | Email + SMS |
| **Database Connectivity** | 10 Minuten | Email |
| **SSL Expiry Check** | 24 Stunden | Email (30 Tage vorher) |

**Ziel:** 99,5% Uptime = max. 3,6 Stunden Downtime/Monat

### 6.4 Alerting-Kanäle

| Schweregrad | Kanal | Reaktionszeit |
|-------------|-------|---------------|
| **Critical** | SMS + Telegram + Email | 15 Minuten |
| **Warning** | Email + Telegram | 1 Stunde |
| **Info** | Email (Daily Digest) | 24 Stunden |

**On-Call Rotation:** C-led Team mit Bereitschafts-Handy.

---

## 7. Deployment Pipeline

### 7.1 Git-Workflow

**Repository-Struktur:**
```
becker-odoo/
├── addons/               # Custom Odoo Modules
│   ├── becker_crm/
│   ├── becker_inventory/
│   └── becker_reports/
├── config/
│   ├── odoo-dev.conf
│   ├── odoo-test.conf
│   └── odoo-prod.conf
├── scripts/
│   ├── deploy.sh
│   └── backup.sh
└── docker-compose.yml    # Optional: Dev Environment
```

**Branches:**
- `main` → Production
- `staging` → Test Environment
- `develop` → Development
- Feature Branches: `feature/inventory-improvements`

### 7.2 Deployment-Prozess

**Development → Test:**
1. Developer merged Feature Branch in `develop`
2. Automatischer Deploy auf Dev-Server (via Git Hook)
3. Automated Tests (Unit Tests, falls vorhanden)
4. Manuelles Testing durch C-led Team
5. Merge `develop` → `staging` (Pull Request mit Code Review)
6. Deploy auf Test-Server
7. User Acceptance Testing (UAT) mit Becker-Team

**Test → Production:**
1. Merge `staging` → `main` (Pull Request, 2 Approvals erforderlich)
2. Tag erstellen (z.B. `v1.2.3`)
3. Automatischer Deploy auf Prod-Server:
   - Pre-Deploy Backup
   - Maintenance Mode ON
   - Git Pull auf Prod-Server
   - Odoo Upgrade/Migration (falls DB-Änderungen)
   - Restart Odoo Workers
   - Smoke Tests (Health Check)
   - Maintenance Mode OFF
4. Monitoring für 1 Stunde verschärft

**Rollback-Strategie:**
- Bei Fehler: Git Revert + Backup Restore
- Max. Rollback-Zeit: 30 Minuten

### 7.3 Continuous Integration (Optional)

**Tool:** GitLab CI oder GitHub Actions

**Pipeline-Stages:**
1. **Lint:** Python Code Style Check (flake8, pylint)
2. **Test:** Unit Tests für Custom Modules
3. **Build:** Docker Image erstellen (falls genutzt)
4. **Deploy:** SSH Deploy auf Target Environment

---

## 8. Performance-Optimierung

### 8.1 Datenbankoptimierung (PostgreSQL)

**postgresql.conf Anpassungen (Production):**
```ini
# Memory Settings
shared_buffers = 8GB               # 25% des RAM
effective_cache_size = 24GB        # 75% des RAM
work_mem = 64MB                    # Pro Sort Operation
maintenance_work_mem = 2GB         # Für VACUUM, Index-Builds

# Checkpoints
checkpoint_completion_target = 0.9
wal_buffers = 16MB
max_wal_size = 4GB

# Query Planner
random_page_cost = 1.1             # SSD-optimiert (Default: 4.0)
effective_io_concurrency = 200     # SSD-Parallelität

# Connections
max_connections = 100              # Odoo Workers + Reserve
```

**Regelmäßige Wartung:**
- **VACUUM:** Nightly um 01:00 UTC
- **ANALYZE:** Nach großen Datenimporten
- **REINDEX:** Monatlich für große Tabellen

### 8.2 Odoo-Optimierung

**Konfigurationsparameter:**
```ini
# Performance
db_maxconn = 64
limit_request = 8192
limit_time_cpu = 600
limit_time_real = 1200
max_cron_threads = 2

# Caching
enable_page_cache = True
cache_timeout = 100000

# Logging (Production)
log_level = warn                   # Reduziert I/O
logfile = /var/log/odoo/odoo-server.log
logrotate = True
```

**Odoo-spezifische Optimierungen:**
- **Lazy Loading:** Nur benötigte Felder laden
- **Indexing:** Datenbank-Indizes auf häufig gesuchte Felder
- **Cron Jobs:** Zeitversetzt laufen lassen (nicht alles um 00:00)
- **Reports:** Große Reports asynchron generieren (Job Queue)

### 8.3 Nginx-Caching

**Static Assets Caching:**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

**Gzip Compression:**
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml;
```

### 8.4 Load Balancing (Optional, Future)

Falls 25 User auf 50+ wachsen:
- **Hetzner Load Balancer** vor zwei Odoo-Servern
- **Shared PostgreSQL:** Separate DB-Server (Hetzner CPX51)
- **Session Store:** Redis für Odoo-Sessions (Multi-Server)

---

## 9. Skalierbarkeit & Wachstum

### 9.1 Vertikale Skalierung (Scale-Up)

**Wenn CPU/RAM an Grenzen kommt:**

| Aktuell | Upgrade zu | Kosten Δ |
|---------|------------|----------|
| CCX33 (8 vCPU, 32 GB) | CCX43 (16 vCPU, 64 GB) | +€72/Monat |

**Upgrade-Prozess:**
1. Server herunterfahren
2. Server-Typ ändern (Hetzner Console)
3. Server starten → Volumes automatisch verfügbar
4. Odoo Worker Configuration anpassen (z.B. 12 Workers)
5. **Downtime:** ~10 Minuten

### 9.2 Horizontale Skalierung (Scale-Out)

**Bei > 50 gleichzeitigen Usern:**

**Architektur:**
```
           [Hetzner Load Balancer]
                    |
        +-----------+-----------+
        |                       |
   [Odoo Web 1]           [Odoo Web 2]
   (8 Workers)            (8 Workers)
        |                       |
        +-----------+-----------+
                    |
            [PostgreSQL Server]
            (Dediziert, CPX51)
                    |
            [Redis Session Store]
```

**Vorteile:**
- 16 Workers gesamt = ~50 concurrent users
- Ausfallsicherheit (High Availability)
- Rolling Deployments ohne Downtime

### 9.3 Storage-Wachstum

**Gebäudepläne-Volume Erweiterung:**

| Jahr | Neue Objekte | Storage Bedarf | Volume Größe |
|------|--------------|----------------|--------------|
| 2026 | 1.000 | +50 GB | 300 GB |
| 2027 | 1.000 | +50 GB | 350 GB |
| 2028 | 1.000 | +50 GB | 400 GB |

**Volume Resize (Online, ohne Downtime):**
```bash
# Hetzner Cloud Console: Volume erweitern
# Dann auf Server:
sudo resize2fs /dev/disk/by-id/scsi-0HC_Volume_123456
```

---

## 10. Kosten-Kalkulation

### 10.1 Production Environment (Monatlich)

| Komponente | Typ | Kosten |
|------------|-----|--------|
| **Server** | CCX33 (8 vCPU, 32 GB) | €119,00 |
| **Volume: Odoo Data** | 100 GB SSD | €5,00 |
| **Volume: Building Plans** | 300 GB SSD | €15,00 |
| **Volume: Backups** | 500 GB Standard | €10,00 |
| **Hetzner Storage Box** | BX31 (1 TB Offsite) | €12,90 |
| **IPv4 Adresse** | 1x | €1,19 |
| **Traffic** | 20 TB inkl. | €0,00 |
| **Load Balancer** | (Optional) | (€5,00) |
| **SSL Zertifikat** | Let's Encrypt | €0,00 |
| **Monitoring** | UptimeRobot Free | €0,00 |
| **Domain** | becker-sicherheit.de (extern) | (extern) |
| **GESAMT** | | **€163,09/Monat** |

### 10.2 Test Environment (Monatlich)

| Komponente | Typ | Kosten |
|------------|-----|--------|
| **Server** | CPX31 (4 vCPU, 8 GB) | €15,90 |
| **Volume: Odoo Data** | 50 GB SSD | €2,50 |
| **Volume: Building Plans** | 100 GB Standard | €2,00 |
| **Volume: Backups** | 100 GB Standard | €2,00 |
| **IPv4 Adresse** | 1x | €1,19 |
| **GESAMT** | | **€23,59/Monat** |

### 10.3 Development Environment (Monatlich)

| Komponente | Typ | Kosten |
|------------|-----|--------|
| **Server** | CPX21 (3 vCPU, 4 GB) | €9,90 |
| **Volume: Odoo Data** | 30 GB SSD | €1,50 |
| **Volume: Backups** | 20 GB Standard | €0,40 |
| **IPv4 Adresse** | 1x | €1,19 |
| **GESAMT** | | **€12,99/Monat** |

### 10.4 Gesamtkosten

| Zeitraum | Kosten | Notizen |
|----------|--------|---------|
| **Monatlich** | **€199,67** | Alle 3 Environments |
| **Jährlich** | **€2.396,04** | 12 Monate |
| **3 Jahre** | **€7.188,12** | Projekt-Laufzeit |

**Zusätzliche Kosten (nicht enthalten):**
- Odoo Community Edition: €0 (Open Source)
- VPN (WireGuard): €0 (Open Source)
- Support & Wartung: Wird separat abgerechnet (siehe Angebot)

### 10.5 Kostenkontrolle & Monitoring

**Hetzner Cloud API + Cost Alerting:**
- Monatliches Budget: €200
- Alert bei 80% (€160): Email an Billing
- Automatischer Report: 1. jeden Monats

**Optimierungspotenziale:**
- Test/Dev Environments nachts herunterfahren: -50% (€18/Monat)
- Backup-Retention verkürzen: -€5/Monat
- Standard Storage statt SSD für alte Gebäudepläne: -€5/Monat

---

## 11. Zeitplan & Rollout

### 11.1 Infrastruktur-Setup (Woche 1-2)

| Task | Dauer | Verantwortlich |
|------|-------|----------------|
| Hetzner Account + Billing Setup | 1 Tag | Becker / C-led |
| Server Provisionierung (alle 3) | 1 Tag | C-led |
| Volume Storage erstellen & mounten | 0,5 Tage | C-led |
| Ubuntu Base Setup (UFW, Updates, Hardening) | 1 Tag | C-led |
| PostgreSQL 14 Installation & Tuning | 1 Tag | C-led |
| Odoo Community Installation (alle Envs) | 1 Tag | C-led |
| Nginx + SSL Setup (Let's Encrypt) | 0,5 Tage | C-led |
| WireGuard VPN Setup | 0,5 Tage | C-led |
| Backup-Scripts + Cronjobs | 1 Tag | C-led |
| Monitoring Setup (Prometheus/Grafana) | 1 Tag | C-led |
| **GESAMT** | **8 Tage** | |

**Meilenstein:** Infrastruktur Ready for Development (Go-Live Dev)

### 11.2 Deployment zu Prod (nach Entwicklung)

| Task | Dauer | Verantwortlich |
|------|-------|----------------|
| Production Data Migration (Altdaten) | 2 Tage | C-led + Becker |
| Load Testing (25+ concurrent users) | 1 Tag | C-led |
| Security Audit (Penetration Test) | 1 Tag | C-led |
| Disaster Recovery Test | 0,5 Tage | C-led |
| User Training (Becker Mitarbeiter) | 2 Tage | C-led |
| Go-Live (Samstag Nacht) | 4 Stunden | C-led (On-Call) |
| Post-Go-Live Monitoring (1 Woche intensiv) | 1 Woche | C-led |

---

## 12. Sicherheits-Checkliste (Pre-Production)

- [ ] **Firewall Rules:** Nur notwendige Ports offen
- [ ] **SSH:** Key-basiert, kein Password Auth, Custom Port
- [ ] **VPN:** WireGuard für Admin-Zugang aktiv
- [ ] **SSL:** Let's Encrypt Zertifikat installiert & Auto-Renewal
- [ ] **PostgreSQL:** Keine Remote-Connections außer Test/Dev
- [ ] **Odoo:** Default Admin Password geändert
- [ ] **2FA:** Für Admin-Accounts aktiviert (Odoo App)
- [ ] **Backups:** Automatisiert, getestet (Restore-Test!)
- [ ] **Monitoring:** Alerts funktionieren (Test-Alert senden)
- [ ] **Logs:** Zentralisiert, Retention 90 Tage
- [ ] **Fail2Ban:** Installiert für SSH/Nginx Brute-Force Protection
- [ ] **DSGVO:** Datenverarbeitung dokumentiert (siehe Projektplan)

---

## 13. Maintenance & Support

### 13.1 Wartungsfenster

| Typ | Zeitpunkt | Dauer | Frequenz |
|-----|-----------|-------|----------|
| **Routine Maintenance** | Sonntag 02:00-06:00 UTC | 4h | Monatlich |
| **Emergency Patches** | Nach Ankündigung | Variabel | Bei Bedarf |
| **Major Upgrades** | Samstag 22:00-04:00 UTC | 6h | Halbjährlich |

**Kommunikation:** 7 Tage Vorlauf via Email an Becker-Team.

### 13.2 Support-Levels (SLA)

| Priorität | Reaktionszeit | Lösung-Ziel | Beispiele |
|-----------|---------------|-------------|-----------|
| **Critical** | 30 Minuten | 4 Stunden | System down, Datenverlust |
| **High** | 2 Stunden | 8 Stunden | Performance-Probleme, Module-Ausfall |
| **Medium** | 1 Arbeitstag | 3 Arbeitstage | Bugs, kleinere Anpassungen |
| **Low** | 3 Arbeitstage | Nach Aufwand | Feature Requests, Fragen |

**Erreichbarkeit:**
- **Office Hours:** Mo-Fr 09:00-18:00 CET (Email + Telefon)
- **On-Call (Critical):** 24/7 (Telefon: +49...)

---

## 14. Dokumentation & Übergabe

### 14.1 Technische Dokumentation

**Übergabe an Becker-Team:**
- [ ] Server-Zugangsdaten (LastPass Shared Vault)
- [ ] Firewall-Regeln Übersicht
- [ ] Backup & Recovery Runbook
- [ ] Monitoring Dashboard URL + Credentials
- [ ] Odoo Admin Credentials
- [ ] Deployment-Prozess Dokumentation
- [ ] Troubleshooting Guide

**Formate:**
- Markdown Files (GitHub Repository)
- PDF-Export für Offline-Zugang
- Video-Tutorials (Loom) für komplexe Prozesse

### 14.2 Knowledge Transfer Sessions

**Geplant:**
1. **Infrastruktur Overview** (2h): Architektur, Server, Volumes
2. **Backup & Recovery Workshop** (2h): Hands-On Restore
3. **Monitoring & Alerting** (1h): Dashboards, Interpretation
4. **Odoo Deployment** (2h): Git Workflow, Manual Deploy

**Teilnehmer:** Becker IT-Team (falls vorhanden) + Key Users

---

## 15. Anhänge

### 15.1 Hetzner Cloud Produkt-Links

- **Server Types:** https://www.hetzner.com/de/cloud
- **Volume Storage:** https://docs.hetzner.com/cloud/volumes/overview
- **Storage Box:** https://www.hetzner.com/de/storage/storage-box
- **Load Balancer:** https://docs.hetzner.com/cloud/load-balancers/overview

### 15.2 Odoo Community Resources

- **Official Docs:** https://www.odoo.com/documentation/17.0/
- **Community Forum:** https://www.odoo.com/forum/
- **GitHub Repo:** https://github.com/odoo/odoo

### 15.3 Monitoring Tools

- **Prometheus:** https://prometheus.io/
- **Grafana:** https://grafana.com/
- **UptimeRobot:** https://uptimerobot.com/

---

## 16. Approval & Sign-Off

| Rolle | Name | Unterschrift | Datum |
|-------|------|--------------|-------|
| **Projektleiter (C-led)** | Erik Reisig | | |
| **Kunde (Becker)** | Uwe Becker | | |
| **Infrastruktur-Verantwortlicher** | | | |

**Änderungshistorie:**

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0 | 05.02.2026 | Initiale Version | Erik Reisig |

---

**Kontakt:**  
C-led Solutions GmbH  
Erik Reisig (Geschäftsführer)  
Email: reisig@c-led.net  
Web: c-led.net

**Ende der Infrastruktur-Planung**
