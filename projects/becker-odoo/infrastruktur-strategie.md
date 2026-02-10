# Becker Odoo - Infrastruktur-Strategie

**Projektstart:** 6. Februar 2026
**Strategie:** Klein starten (Dev+Test) → Migration bei Production-Bedarf

## 📋 Requirements

### Docker Container (Dev + Test Phase)
```yaml
Services:
  - Odoo (2 Instanzen: dev + test)
  - PostgreSQL (2 DBs)
  - Redis (Cache)
  - Nginx (Reverse Proxy)
  
Geschätzter Bedarf:
  - RAM: 4-6 GB (2x Odoo à 1-2GB, PostgreSQL 1GB, Rest)
  - CPU: 2-4 Cores
  - Storage: 50-100 GB SSD (DB + Filestore)
  - Traffic: ~1 TB/Monat
```

### Production Phase (später)
```yaml
Services:
  - Odoo (prod + test + dev optional)
  - PostgreSQL (HA Setup möglich)
  - Redis
  - Backup System
  - Monitoring
  
Geschätzter Bedarf:
  - RAM: 8-16 GB
  - CPU: 4-8 Cores
  - Storage: 200-500 GB SSD
  - Traffic: 2-5 TB/Monat
```

---

## 🔷 Phase 1: Dev+Test Cloud Server

### Option 1: Hetzner Cloud CPX21
**Specs:**
- 3 vCPU (AMD/Intel)
- 4 GB RAM
- 80 GB NVMe SSD
- 20 TB Traffic
- Backup: +20% (optional)

**Preis:** 7,49€/Monat (89,88€/Jahr)
**Standort:** Deutschland (Nürnberg/Falkenstein)
**Setup:** Cloud-Init, Snapshots gratis

**Pro:**
- Günstig
- Deutsche Rechenzentren
- Flexible Snapshots
- Gute Performance

**Con:**
- Shared vCPU (kann schwanken)
- Backup kostet extra

---

### Option 2: Netcup VPS 500 G11
**Specs:**
- 2 vCores
- 4 GB RAM
- 80 GB SSD
- Traffic unlimitiert
- Snapshots inkl.

**Preis:** 4,50€/Monat (54€/Jahr)
**Standort:** Deutschland (Nürnberg)

**Pro:**
- Sehr günstig
- Unlimitierter Traffic
- Deutscher Anbieter

**Con:**
- Kleinere Community
- Weniger Flexibilität bei Scaling

---

### Option 3: Contabo Cloud VPS S
**Specs:**
- 4 vCPU Cores
- 8 GB RAM
- 100 GB NVMe
- 32 TB Traffic

**Preis:** 7,49€/Monat (89,88€/Jahr)
**Standort:** Deutschland/EU

**Pro:**
- Mehr RAM für gleichen Preis
- Sehr viel Traffic
- Gute Performance

**Con:**
- Support-Qualität variabel
- Weniger Premium-Image

---

## 🔶 Phase 2: Production Server

### Option A: Hetzner Cloud CPX31
**Specs:**
- 4 vCPU
- 8 GB RAM
- 160 GB NVMe SSD
- 20 TB Traffic

**Preis:** 14,25€/Monat (171€/Jahr)
**Upgrade-Path:** Seamless von CPX21

---

### Option B: Hetzner Cloud CPX41
**Specs:**
- 8 vCPU
- 16 GB RAM
- 240 GB NVMe SSD
- 20 TB Traffic

**Preis:** 27,45€/Monat (329,40€/Jahr)

---

### Option C: Hetzner Dedicated Server AX42
**Specs:**
- AMD Ryzen 5 3600 (6C/12T)
- 64 GB DDR4 RAM
- 2x 512 GB NVMe SSD (RAID)
- 1 Gbit/s unlimitiert

**Preis:** 43,90€/Monat (526,80€/Jahr)

**Pro:**
- Dedicated Hardware
- Riesige RAM-Reserve
- Predictable Performance
- Hardware-RAID

**Con:**
- Setup-Zeit länger
- Weniger flexibel (kein instant resize)

---

### Option D: Netcup Root Server RS 2000 G11
**Specs:**
- AMD Ryzen (4 Cores)
- 16 GB DDR5 RAM
- 1 TB NVMe SSD
- 2,5 Gbit unlimitiert

**Preis:** 19,90€/Monat (238,80€/Jahr)

**Pro:**
- Extrem gutes Preis-Leistungs-Verhältnis
- Viel Storage
- Unlimitierter Traffic

**Con:**
- Root Server = mehr Admin-Aufwand
- Weniger Snapshots/Backup-Optionen

---

## 💰 Kosten-Vergleich (3 Jahre)

### Szenario 1: Hetzner Cloud (Empfehlung)
```
Phase 1 (6 Monate Dev+Test):
  CPX21: 7,49€ × 6 = 44,94€

Phase 2 (30 Monate Production):
  CPX31: 14,25€ × 30 = 427,50€
  
TOTAL: 472,44€ (3 Jahre)
Monatlich: ~13,12€
```

### Szenario 2: Contabo → Hetzner Dedicated
```
Phase 1 (6 Monate):
  Contabo VPS S: 7,49€ × 6 = 44,94€

Phase 2 (30 Monate):
  Hetzner AX42: 43,90€ × 30 = 1.317€
  
TOTAL: 1.361,94€ (3 Jahre)
Monatlich: ~37,83€
```

### Szenario 3: Netcup Full Lifecycle
```
Phase 1 (6 Monate):
  VPS 500: 4,50€ × 6 = 27€

Phase 2 (30 Monate):
  RS 2000: 19,90€ × 30 = 597€
  
TOTAL: 624€ (3 Jahre)
Monatlich: ~17,33€
```

---

## 🎯 Empfehlung: Hetzner Cloud CPX21 → CPX31/41

**Warum:**

1. **Flexibilität:** Seamless Upgrades, Snapshots, Backups
2. **Performance:** Deutsche DCs, gute vCPU-Performance
3. **Bewährt:** Tausende Odoo-Installationen auf Hetzner
4. **Support:** Gute Dokumentation, große Community
5. **Migration:** Mit Snapshot in 5 Minuten auf größere Instanz
6. **Kosten:** Mittelfeld, aber beste Flexibilität

**Migration-Path:**
```
Start: CPX21 (4GB, 3 vCPU) - 7,49€/Monat
  ↓ (bei Prod-Start)
Scale: CPX31 (8GB, 4 vCPU) - 14,25€/Monat
  ↓ (bei Wachstum)
Scale: CPX41 (16GB, 8 vCPU) - 27,45€/Monat
  ↓ (bei großem Wachstum)
Dedicated: AX42 (64GB, 6C/12T) - 43,90€/Monat
```

**Alternative:** Netcup (günstiger, aber weniger Flexibilität)
- Gut für: Budget-bewusste Projekte
- Nicht ideal für: Schnelle Scaling-Anforderungen

---

## 📅 Timeline & Actions

### Morgen (6. Feb):
- [ ] Hetzner Account anlegen (falls nicht vorhanden)
- [ ] CPX21 Server bestellen (Nürnberg DC)
- [ ] DNS vorbereiten (odoo-dev.becker-sicherheit.de)
- [ ] SSH Keys deployen
- [ ] Docker + Docker Compose installieren

### Woche 1-2:
- [ ] Dev Environment aufsetzen
- [ ] Test Environment aufsetzen
- [ ] Backup-Strategie testen
- [ ] Monitoring aufsetzen (optional: Uptime Kuma)

### Bei Production-Start (~Juli):
- [ ] Snapshot von CPX21 erstellen
- [ ] CPX31 bestellen
- [ ] Restore Snapshot auf CPX31
- [ ] DNS umbiegen
- [ ] CPX21 kündigen (oder als Staging behalten)

---

## 🔐 Security Checklist

- [ ] SSH Key-Only (kein Password Login)
- [ ] Fail2ban installieren
- [ ] UFW Firewall (nur 22, 80, 443)
- [ ] Automatische Security Updates
- [ ] PostgreSQL nicht öffentlich exponieren
- [ ] SSL Certificates (Let's Encrypt)
- [ ] Odoo nur über Nginx Proxy

---

## 📊 Monitoring

**Minimal:**
- Uptime Kuma (Docker Container)
- Disk Space Alerts
- PostgreSQL Connection Monitoring

**Optional:**
- Prometheus + Grafana
- Netdata
- Sentry (für Odoo Errors)

---

## 🚀 Next Steps

1. **Entscheidung:** Hetzner CPX21? (Empfehlung)
2. **Server bestellen:** Heute/Morgen früh
3. **Setup Skript:** Automatisiertes Setup mit Ansible/Bash
4. **Docker Compose:** Multi-Environment Setup vorbereiten

**Frage an Erik:** Hetzner CPX21 OK? Oder lieber Netcup (günstiger) / Contabo (mehr RAM)?
