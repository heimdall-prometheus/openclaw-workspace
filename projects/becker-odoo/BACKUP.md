# Becker Odoo - Backup & Recovery

## Übersicht

| Setting | Wert |
|---------|------|
| **R2 Bucket** | `becker-odoo-backups` |
| **Region** | EEUR (Europa) |
| **Schedule** | Täglich 03:00 Berlin |
| **Kosten** | ~$2-5/Monat |

## Was wird gesichert?

| Typ | Inhalt | Format |
|-----|--------|--------|
| **Database** | PostgreSQL Dump | `.sql.gz` |
| **Filestore** | Attachments, Uploads | `.tar.gz` |

## Retention Policy

| Kategorie | Aufbewahrung | Backups |
|-----------|--------------|---------|
| **Daily** | 30 Tage | ~30 |
| **Weekly** | 12 Wochen | ~12 |
| **Monthly** | 12 Monate | ~12 |
| **Yearly** | 5 Jahre | ~5 |

## Struktur im Bucket

```
becker-odoo-backups/
├── dev/
│   ├── daily/
│   │   ├── db_2026-02-05_03-00.sql.gz
│   │   └── filestore_2026-02-05_03-00.tar.gz
│   ├── weekly/
│   ├── monthly/
│   └── yearly/
├── test/
│   └── (gleiche Struktur)
└── prod/
    └── (gleiche Struktur)
```

---

## Recovery Anleitung

### 1. Backup herunterladen

```bash
# Auf dem Server
cd /var/backups/odoo

# Mit Python/boto3
python3 << 'EOF'
import boto3
from botocore.config import Config

s3 = boto3.client('s3',
    endpoint_url='https://e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com',
    aws_access_key_id='fba6fd5a52259788403b98521e965376',
    aws_secret_access_key='ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e',
    config=Config(signature_version='s3v4')
)

# Beispiel: Letztes Dev-Backup
s3.download_file('becker-odoo-backups', 'dev/daily/db_2026-02-05_03-00.sql.gz', 'restore_db.sql.gz')
s3.download_file('becker-odoo-backups', 'dev/daily/filestore_2026-02-05_03-00.tar.gz', 'restore_filestore.tar.gz')
EOF
```

### 2. Backups auflisten

```bash
python3 << 'EOF'
import boto3
from botocore.config import Config

s3 = boto3.client('s3',
    endpoint_url='https://e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com',
    aws_access_key_id='fba6fd5a52259788403b98521e965376',
    aws_secret_access_key='ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e',
    config=Config(signature_version='s3v4')
)

# Alle Backups auflisten
for obj in s3.list_objects_v2(Bucket='becker-odoo-backups').get('Contents', []):
    print(f"{obj['LastModified']} {obj['Size']:>10} {obj['Key']}")
EOF
```

### 3. Database Restore

```bash
# Container stoppen
docker stop odoo-dev

# Datenbank droppen und neu erstellen
docker exec odoo-dev-db psql -U odoo -c "DROP DATABASE IF EXISTS odoo_dev;"
docker exec odoo-dev-db psql -U odoo -c "CREATE DATABASE odoo_dev OWNER odoo;"

# Backup einspielen
gunzip -c restore_db.sql.gz | docker exec -i odoo-dev-db psql -U odoo odoo_dev

# Container starten
docker start odoo-dev
```

### 4. Filestore Restore

```bash
# Backup entpacken
VOLUME_PATH="/var/lib/docker/volumes/dev_odoo-dev-web-data/_data/filestore"
sudo rm -rf ${VOLUME_PATH}/*
sudo tar -xzf restore_filestore.tar.gz -C ${VOLUME_PATH}
sudo chown -R 101:101 ${VOLUME_PATH}  # Odoo User
```

### 5. Vollständiger Recovery (Disaster)

```bash
# 1. Neuen Server aufsetzen (siehe SERVER-SETUP.md)
# 2. Docker Compose starten (leere DBs)
# 3. Letztes Backup herunterladen
# 4. DB + Filestore restore (siehe oben)
# 5. Odoo neu starten
```

---

## Manuelles Backup

```bash
# Sofort-Backup ausführen
sudo /opt/odoo-backup/backup.sh
```

## Logs prüfen

```bash
# Backup-Logs
tail -100 /var/log/odoo-backup.log
```

## Cron-Jobs

```
# /etc/cron.d/odoo-backup
0 2 * * * root /opt/odoo-backup/backup.sh >> /var/log/odoo-backup.log 2>&1
0 3 * * 0 root /opt/odoo-backup/cleanup-r2.sh >> /var/log/odoo-backup.log 2>&1
```

---

## Notfall-Kontakte

- **Server:** 100.71.171.30 (Tailscale)
- **R2 Dashboard:** https://dash.cloudflare.com → R2 → becker-odoo-backups

---

*Erstellt: 5. Februar 2026*
