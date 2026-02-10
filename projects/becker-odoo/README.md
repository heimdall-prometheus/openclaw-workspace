# Becker Odoo ERP - Projektdokumentation

## 🚀 Quick Links

| Umgebung | URL | Status |
|----------|-----|--------|
| **Development** | https://becker-odoo-dev.erikreisig.de | ✅ Live |
| **Test** | https://becker-odoo-test.erikreisig.de | ✅ Live |
| **Production** | (später) | ⏳ Pending |

## 📋 Dokumentation

| Datei | Zweck |
|-------|-------|
| **PROJECT.md** | Technische Projektdetails |
| **SERVER-SETUP.md** | Server-Installation & Konfiguration |
| **CREDENTIALS.md** | 🔐 Login-Daten (VERTRAULICH!) |
| **BACKUP.md** | ⭐ Backup & Recovery Anleitung |
| **ZEITERFASSUNG.md** | Arbeitszeit-Tracking |
| **INFRASTRUKTUR.md** | Architektur-Übersicht |

## 🖥️ Infrastruktur

| Komponente | Details |
|------------|---------|
| **Server** | Hetzner CPX42 (16GB RAM, 8 vCPU) |
| **IP** | 100.71.171.30 (Tailscale) |
| **OS** | Ubuntu 24.04.3 LTS |
| **Stack** | Docker, PostgreSQL 15, Nginx, Odoo 17 |
| **Backups** | Cloudflare R2 (`becker-odoo-backups`) |

## 💾 Backup & Recovery

**Automatische Backups:** Täglich 03:00 Berlin

| Was | Wo | Retention |
|-----|-----|-----------|
| PostgreSQL DBs | R2 | 30d / 12w / 12m / 5y |
| Filestore | R2 | 30d / 12w / 12m / 5y |

**Recovery:** Siehe [BACKUP.md](BACKUP.md)

```bash
# Manuelles Backup
sudo /opt/odoo-backup/backup.sh

# Logs prüfen
tail -f /var/log/odoo-backup.log
```

## 📅 Projekt-Timeline

- **Start:** 9. Februar 2026
- **Go-Live:** 20. Juli 2026
- **Dauer:** 23 Wochen @ 3.5 PT/Woche (~80 PT)

## 📁 Ordnerstruktur

```
becker-odoo/
├── README.md                    # Diese Datei
├── PROJECT.md                   # Technische Details
├── SERVER-SETUP.md              # Server-Dokumentation
├── CREDENTIALS.md               # 🔐 Login-Daten
├── BACKUP.md                    # ⭐ Backup & Recovery
├── ZEITERFASSUNG.md             # Arbeitszeit
├── INFRASTRUKTUR.md             # Architektur
├── scripts/                     # Backup-Scripts
│   ├── backup.sh
│   └── cleanup-r2.sh
├── angebote/                    # Angebotsdokumente
└── archive/                     # Alte Versionen
```

## 🔧 Häufige Befehle

```bash
# SSH zum Server
ssh heimdall@100.71.171.30

# Container Status
docker ps

# Logs anzeigen
docker logs -f odoo-dev
docker logs -f odoo-test

# Neustart
docker restart odoo-dev
docker restart odoo-test
```

## 📞 Kontakte

- **Partner:** Uwe Becker (Becker Sicherheitstechnik GmbH)
- **GitHub:** github.com/becker-sicherheit/odoo

---
*Letzte Aktualisierung: 5. Februar 2026*
