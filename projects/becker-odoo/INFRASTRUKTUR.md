# Infrastruktur - Becker Odoo ERP

## ✅ Entscheidung (5. Feb 2026)

**Hosting:** Hetzner Cloud CPX21 → CPX31  
**Projektstart:** 6. Februar 2026

---

## 📋 Phase 1: Development & Test (Feb-Juli 2026)

### Server: Hetzner Cloud CPX21
- **Specs:** 4 GB RAM, 3 vCPU, 80 GB NVMe
- **Kosten:** 7,49€/Monat
- **Umgebungen:** Dev + Test (Docker Compose)
- **Standort:** Nürnberg, Deutschland

### Docker Setup
```yaml
Services:
  - Odoo Dev (Port 8069)
  - Odoo Test (Port 8070)
  - PostgreSQL (2 DBs)
  - Redis Cache
  - Nginx Reverse Proxy
```

### Domains
- `odoo-dev.becker-sicherheit.de`
- `odoo-test.becker-sicherheit.de`

---

## 🚀 Phase 2: Production (ab Juli 2026)

### Migration: CPX21 → CPX31
- **Methode:** Snapshot-Restore (~5 Min Downtime)
- **Neue Specs:** 8 GB RAM, 4 vCPU, 160 GB NVMe
- **Kosten:** 14,25€/Monat
- **Domain:** `odoo.becker-sicherheit.de`

### Skalierungs-Optionen
Bei Bedarf weitere Upgrades:
- **CPX41:** 16 GB RAM, 8 vCPU (27,45€/Mon)
- **AX42 Dedicated:** 64 GB RAM, 6C/12T (43,90€/Mon)

---

## 💰 Kosten (3 Jahre)

| Phase | Server | Dauer | Kosten |
|-------|--------|-------|--------|
| Phase 1 | CPX21 | 6 Monate | 44,94€ |
| Phase 2 | CPX31 | 30 Monate | 427,50€ |
| **Total** | | **36 Monate** | **472,44€** |

**Durchschnitt:** ca. 13€/Monat

---

## 🎯 Entscheidungsgründe

### Warum Hetzner?
1. ✅ Seamless Upgrades (Snapshot → Restore in 5 Min)
2. ✅ Bewährte Plattform (tausende Odoo-Installationen)
3. ✅ Deutsche Rechenzentren (DSGVO)
4. ✅ Große Community & Dokumentation
5. ✅ Flexible Skalierung bis Dedicated Server

### Warum nicht Netcup/Contabo?
- **Netcup:** Günstiger (4,50€), aber nur 2 vCores + weniger Flexibilität
- **Contabo:** 8GB RAM, aber Support-Qualität variabel

---

## 🔐 Security Setup

- [x] SSH Key-Only (kein Password)
- [x] Fail2ban (Brute-Force Protection)
- [x] UFW Firewall (nur 22, 80, 443)
- [x] Automatische Security Updates
- [x] PostgreSQL nur intern
- [x] SSL/TLS (Let's Encrypt)
- [x] Tägliche Backups (DB + Filestore)

---

## 📅 Timeline

| Datum | Milestone |
|-------|-----------|
| **6. Feb 2026** | Server bestellen + Setup |
| **7-8. Feb** | Docker + Environments |
| **9. Feb - Jun** | Development Phase |
| **Juli 2026** | Production Go-Live |

---

## 📄 Dokumentation

**Vollständige Analyse (PDF):**  
https://assets.imr-media.de/becker-odoo/Infrastruktur-Entscheidung-Becker-Odoo.pdf

**Enthält:**
- Detaillierte Option-Vergleiche
- Migrations-Strategie
- Monitoring & Backup-Konzept
- Risiko-Analyse
- Wartungsplan

---

## 🔄 Migration-Prozess (Dev → Prod)

### Vorbereitung (T-7 Tage)
1. Snapshot CPX21 erstellen
2. DB Backups anlegen
3. Doku aktualisieren

### Migration (T-Day)
1. Finales Snapshot
2. CPX31 bestellen
3. Snapshot restore
4. DNS umbiegen
5. SSL erneuern
6. Funktionstests

**Downtime:** 5-10 Minuten

---

## 📊 Monitoring

- **Uptime Kuma:** Server-Erreichbarkeit
- **Netdata:** System-Metriken
- **PostgreSQL Stats:** DB-Performance
- **Odoo Logs:** Application-Level

---

**Erstellt:** 5. Februar 2026  
**Ansprechpartner:** Erik Reisig, C-led Solutions GmbH  
**Nächster Review:** Bei Production Go-Live (Juli 2026)
