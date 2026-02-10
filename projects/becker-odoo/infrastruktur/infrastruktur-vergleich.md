# Infrastruktur-Vergleich: Cloud vs. Dedicated
## Odoo ERP für Becker Sicherheitstechnik GmbH

**Projekt:** CLED-2026-001/002  
**Datum:** 05.02.2026  
**Autor:** C-led Solutions GmbH

---

## Executive Summary

Beide Optionen nutzen **Docker mit 3 isolierten Environments** (Prod/Test/Dev) auf **einem einzigen Server**. Der Hauptunterschied liegt in der Server-Technologie: **Cloud (virtuelle vCPUs)** vs. **Dedicated (physische Hardware)**.

**TL;DR Empfehlung:**
- **Start:** Dedicated AX52 (€3.412 günstiger über 3 Jahre, bessere Performance)
- **Wenn:** Schneller PoC nötig (<1 Woche) → Cloud CCX33, dann später Migration

---

## 1. Kosten-Vergleich

### 1.1 Monatliche Kosten

| Komponente | Cloud CCX33 | Dedicated AX52 | Differenz |
|------------|-------------|----------------|-----------|
| **Server/Compute** | €119,00 | €51,00 | **-€68,00** |
| **Storage Volumes** | €32,50 (3x) | €0,00 (on-board) | **-€32,50** |
| **IPv4 Adresse** | €1,19 | €0,00 (inkl.) | **-€1,19** |
| **Storage Box** | €12,90 | €12,90 | €0,00 |
| **GESAMT/Monat** | **€165,59** | **€63,90** | **-€101,69 (-61%)** |

### 1.2 Einmalige Kosten

| Kostenart | Cloud | Dedicated | Notizen |
|-----------|-------|-----------|---------|
| **Setup Fee** | €0 | €199 | Amortisiert sich in 2 Monaten! |
| **Disk Upgrade** | €0 | €50 (2027) | Optional, wenn Storage voll |

### 1.3 TCO (Total Cost of Ownership) - 3 Jahre

| Kostenart | Cloud CCX33 | Dedicated AX52 | Differenz |
|-----------|-------------|----------------|-----------|
| **Monatlich (36 Monate)** | €165,59 × 36 = €5.961 | €63,90 × 36 = €2.300 | - |
| **Setup** | €0 | €199 | +€199 |
| **Disk Upgrade (2027)** | €0 | €50 | +€50 |
| **GESAMT 3 Jahre** | **€5.961** | **€2.549** | **-€3.412 (-57%)** |

**ROI:** Dedicated spart **€3.412 über 3 Jahre** (57% günstiger)!

---

## 2. Hardware-Vergleich

### 2.1 Compute

| Spezifikation | Cloud CCX33 | Dedicated AX52 | Winner |
|---------------|-------------|----------------|--------|
| **CPU** | 8 vCPU (Shared) | 8C/16T @ 3.6 GHz (Dedicated) | 🏆 Dedicated |
| **CPU-Architektur** | AMD EPYC (virtualisiert) | AMD Ryzen 7 3700X (physisch) | 🏆 Dedicated |
| **Throttling** | Möglich (Noisy Neighbors) | Keine | 🏆 Dedicated |
| **Single-Thread Performance** | Mittel | Hoch (Gaming-CPU) | 🏆 Dedicated |
| **Turbo Boost** | Begrenzt | Bis 4.4 GHz | 🏆 Dedicated |

### 2.2 Memory

| Spezifikation | Cloud CCX33 | Dedicated AX52 | Winner |
|---------------|-------------|----------------|--------|
| **RAM** | 32 GB | 64 GB | 🏆 Dedicated (2x) |
| **ECC** | Ja | Ja | ⚖️ Tie |
| **RAM für Prod** | 16 GB | 32 GB | 🏆 Dedicated (2x) |
| **RAM für Test** | 8 GB | 16 GB | 🏆 Dedicated (2x) |
| **RAM für Dev** | 4 GB | 8 GB | 🏆 Dedicated (2x) |

### 2.3 Storage

| Spezifikation | Cloud CCX33 | Dedicated AX52 | Winner |
|---------------|-------------|----------------|--------|
| **Root Disk** | 240 GB NVMe | 100 GB NVMe | 🏆 Cloud |
| **Odoo Data** | 150 GB Volume (extern) | 150 GB on-board | ⚖️ Tie |
| **Building Plans** | 300 GB Volume (extern) | 250 GB on-board | 🏆 Cloud |
| **Backups** | 500 GB Volume (extern) | 50 GB on-board | 🏆 Cloud |
| **Redundanz** | Hetzner RAID (intern) | RAID 1 (2x 512 GB) | 🏆 Dedicated (sichtbar) |
| **IOPS** | Hoch (SSD Volumes) | Sehr hoch (lokales NVMe) | 🏆 Dedicated |
| **Latenz** | ~1-2ms (Netzwerk) | <0.1ms (lokal) | 🏆 Dedicated |

**Notizen:**
- Cloud: Flexiblere Storage-Erweiterung (online resize)
- Dedicated: Bessere I/O-Performance (lokal), aber Disk-Upgrade = Hardware-Tausch

### 2.4 Netzwerk

| Spezifikation | Cloud CCX33 | Dedicated AX52 | Winner |
|---------------|-------------|----------------|--------|
| **Uplink** | Shared 1 Gbit/s | Dedicated 1 Gbit/s | 🏆 Dedicated |
| **Traffic** | 20 TB/Monat inkl. | Unbegrenzt | 🏆 Dedicated |
| **IPv4** | €1,19/M | Inklusive | 🏆 Dedicated |

---

## 3. Performance-Vergleich

### 3.1 Docker Resource Allocation

| Service | Cloud Limits | Dedicated Limits | Differenz |
|---------|--------------|------------------|-----------|
| **Odoo Prod CPU** | 4.0 | 8.0 | +100% |
| **Odoo Prod RAM** | 16 GB | 32 GB | +100% |
| **Odoo Test CPU** | 2.0 | 4.0 | +100% |
| **Odoo Test RAM** | 8 GB | 16 GB | +100% |
| **PostgreSQL RAM** | 4 GB | 8 GB | +100% |

**Fazit:** Dedicated kann **doppelt so viele Ressourcen** pro Container allokieren!

### 3.2 PostgreSQL Tuning

| Parameter | Cloud CCX33 | Dedicated AX52 | Winner |
|-----------|-------------|----------------|--------|
| **shared_buffers** | 1 GB | 2 GB | 🏆 Dedicated |
| **effective_cache_size** | 3 GB | 6 GB | 🏆 Dedicated |
| **work_mem** | 32 MB | 64 MB | 🏆 Dedicated |
| **max_connections** | 100 | 150 | 🏆 Dedicated |
| **max_parallel_workers** | 4 | 8 | 🏆 Dedicated |

### 3.3 Odoo Worker Configuration

| Parameter | Cloud Prod | Dedicated Prod | Differenz |
|-----------|------------|----------------|-----------|
| **Workers** | 8 | 17 | +113% |
| **max_cron_threads** | 2 | 4 | +100% |
| **limit_memory_hard** | 2 GB | 2.5 GB | +25% |
| **db_maxconn** | 64 | 128 | +100% |

**Fazit:** Dedicated kann **mehr gleichzeitige Requests** verarbeiten!

### 3.4 Erwartete Performance-Metriken

| Metrik | Cloud CCX33 | Dedicated AX52 | Differenz |
|--------|-------------|----------------|-----------|
| **Concurrent Users** | 25 | 40-50 | +60-100% |
| **Page Load Time** | <2s | <1s | -50% |
| **DB Query Performance** | Gut | Sehr gut | +30% |
| **Report Generation** | 10s | 6s | -40% |
| **File Upload (50 MB)** | 15s | 8s | -47% |

**Annahmen:** Gleicher Workload, optimale Konfiguration

---

## 4. Skalierbarkeit

### 4.1 Vertikale Skalierung (Scale-Up)

| Szenario | Cloud CCX33 | Dedicated AX52 | Winner |
|----------|-------------|----------------|--------|
| **Upgrade-Zeit** | 5 Min (Resize) | 4h (Server Migration) | 🏆 Cloud |
| **Downtime** | 10 Min | 4h | 🏆 Cloud |
| **Kosten** | +€72/M (CCX43) | +€114/M (PX92) | 🏆 Cloud |
| **Aufwand** | Niedrig (Button-Click) | Hoch (Data Migration) | 🏆 Cloud |

**Fazit:** Cloud ist flexibler beim Scale-Up, aber Dedicated bleibt günstiger.

### 4.2 Horizontale Skalierung (Scale-Out)

**Beide identisch:**
- Multi-Server Setup mit Load Balancer
- PostgreSQL auf dedizierten Server
- Redis für Session-Sharing

**Kosten (ab 50+ User):**
- Cloud: ~€400/M (2x CCX33 + LB + Dedicated DB)
- Dedicated: ~€346/M (2x AX52 + LB + PX62 DB)

**Winner:** 🏆 Dedicated (auch bei Scale-Out günstiger!)

### 4.3 Storage-Erweiterung

| Aspekt | Cloud | Dedicated | Winner |
|--------|-------|-----------|--------|
| **Online Resize** | Ja (Volume erweitern) | Nein (Disk-Tausch) | 🏆 Cloud |
| **Downtime** | 0 Min | 0 Min (RAID Rebuild) | ⚖️ Tie |
| **Kosten** | €5/100GB/M | €50-150 einmalig | 🏆 Dedicated (langfristig) |
| **Aufwand** | Niedrig | Mittel (Hetzner Support) | 🏆 Cloud |

---

## 5. Verfügbarkeit & Disaster Recovery

### 5.1 Hardware-Redundanz

| Aspekt | Cloud CCX33 | Dedicated AX52 | Winner |
|--------|-------------|----------------|--------|
| **Storage Redundanz** | Ja (Hetzner RAID intern) | Ja (RAID 1 sichtbar) | ⚖️ Tie |
| **CPU/RAM Redundanz** | Nein | Nein | ⚖️ Tie |
| **Single Point of Failure** | Server | Server | ⚖️ Tie |

### 5.2 Backup & Restore

| Aspekt | Cloud | Dedicated | Winner |
|--------|-------|-----------|--------|
| **Backup-Methode** | Rsync + pg_dump | Rsync + pg_dump | ⚖️ Tie |
| **Snapshots** | Ja (Volume Snapshots) | Nein | 🏆 Cloud |
| **Restore-Zeit** | 1h (Snapshot) | 2h (Rsync Restore) | 🏆 Cloud |
| **Offsite Backup** | Ja (Storage Box) | Ja (Storage Box) | ⚖️ Tie |

### 5.3 Disaster Recovery Szenarien

| Szenario | Cloud RTO | Dedicated RTO | Winner |
|----------|-----------|---------------|--------|
| **Container Crash** | 30s | 30s | ⚖️ Tie |
| **DB Corruption** | 10 Min | 15 Min | 🏆 Cloud |
| **Disk Failure** | Transparent (Hetzner) | 0 Min (RAID 1) | 🏆 Dedicated |
| **Server Crash** | 1h (Snapshot Restore) | 4-8h (Neubestellung) | 🏆 Cloud |

**Fazit:** Cloud ist resilienter bei katastrophalen Ausfällen (Server tot).

---

## 6. Betrieb & Management

### 6.1 Setup-Aufwand

| Task | Cloud CCX33 | Dedicated AX52 | Winner |
|------|-------------|----------------|--------|
| **Server Provisionierung** | 5 Min | 24h | 🏆 Cloud |
| **RAID Setup** | Nicht nötig | 30 Min | 🏆 Cloud |
| **Gesamt-Setup-Zeit** | 6,5 Tage | 8 Tage | 🏆 Cloud |

### 6.2 Laufender Betrieb

| Aspekt | Cloud | Dedicated | Winner |
|--------|-------|-----------|--------|
| **Monitoring RAID** | Nicht nötig | mdadm + Alerts | 🏆 Cloud |
| **Disk-Austausch** | Hetzner kümmert sich | Hetzner Support + Rebuild | 🏆 Cloud |
| **Storage erweitern** | Online (5 Min) | Disk-Upgrade (2h Arbeit) | 🏆 Cloud |
| **Server upgraden** | Online (10 Min) | Migration (4h) | 🏆 Cloud |

**Fazit:** Cloud ist wartungsärmer, Dedicated erfordert mehr Hands-On.

### 6.3 Komplexität

| Aspekt | Cloud | Dedicated | Winner |
|--------|-------|-----------|--------|
| **Docker Setup** | Identisch | Identisch | ⚖️ Tie |
| **Netzwerk-Config** | Einfacher (Cloud Firewall) | UFW manuell | 🏆 Cloud |
| **Backup-Setup** | Identisch | Identisch | ⚖️ Tie |
| **Monitoring** | Identisch | + RAID Monitoring | 🏆 Cloud |

---

## 7. Risiko-Analyse

### 7.1 Cloud CCX33 Risiken

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **Noisy Neighbor** | Mittel | Mittel | Performance-Monitoring + Resize |
| **CPU Throttling** | Niedrig | Mittel | Dedicated vCPUs (schon gewählt) |
| **Kostenüberschreitung** | Niedrig | Niedrig | Volumes fix, kein Auto-Scaling |
| **Vendor Lock-In** | Niedrig | Mittel | Docker = portabel |

### 7.2 Dedicated AX52 Risiken

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **Hardware-Ausfall** | Niedrig | Hoch | RAID 1 + Offsite Backup |
| **Disk Failure** | Mittel (3-5 Jahre) | Niedrig | RAID 1 = Redundanz |
| **Längere Downtime** | Niedrig | Hoch | Spare Server (optional, +€51/M) |
| **Storage Limit** | Mittel (2027) | Mittel | Disk-Upgrade (€50) |

### 7.3 Risiko-Scoring

| Kriterium | Cloud | Dedicated | Winner |
|-----------|-------|-----------|--------|
| **Verfügbarkeit** | 99,5% | 99,3% | 🏆 Cloud |
| **Performance-Stabilität** | 95% | 99% | 🏆 Dedicated |
| **Hardware-Redundanz** | Intern | RAID 1 | ⚖️ Tie |
| **Disaster Recovery** | Sehr gut | Gut | 🏆 Cloud |

---

## 8. Entscheidungsmatrix

### 8.1 Gewichtete Bewertung

| Kriterium | Gewicht | Cloud Score | Dedicated Score | Cloud Punkte | Dedicated Punkte |
|-----------|---------|-------------|-----------------|--------------|------------------|
| **Kosten** | 25% | 3/10 | 10/10 | 0,75 | 2,50 |
| **Performance** | 20% | 7/10 | 10/10 | 1,40 | 2,00 |
| **Skalierbarkeit** | 15% | 9/10 | 7/10 | 1,35 | 1,05 |
| **Verfügbarkeit** | 15% | 9/10 | 8/10 | 1,35 | 1,20 |
| **Betriebsaufwand** | 10% | 9/10 | 7/10 | 0,90 | 0,70 |
| **Setup-Zeit** | 10% | 10/10 | 6/10 | 1,00 | 0,60 |
| **Risiko** | 5% | 8/10 | 7/10 | 0,40 | 0,35 |
| **GESAMT** | 100% | - | - | **7,15** | **8,40** |

**Winner:** 🏆 **Dedicated AX52** (8,40 vs 7,15 Punkte)

### 8.2 Use-Case Mapping

| Szenario | Empfehlung | Grund |
|----------|------------|-------|
| **Langfristig (3+ Jahre)** | Dedicated | TCO: -€3.412 Ersparnis |
| **Budget < €100/M** | Dedicated | €63,90 vs €165,59 |
| **Max. Performance** | Dedicated | 2x RAM, Dedicated CPU, lokales NVMe |
| **Schneller PoC (<1 Woche)** | Cloud | 5 Min Setup vs 24h |
| **Hohe Skalierungs-Dynamik** | Cloud | Instant Resize |
| **Maximale Verfügbarkeit** | Cloud | Snapshots + schnelleres DR |

---

## 9. Migrations-Szenarien

### 9.1 Cloud → Dedicated (Spätere Migration)

**Szenario:** Start mit Cloud für schnellen PoC, später Migration zu Dedicated für Kosten/Performance

**Aufwand:**
1. Dedicated Server bestellen (24h)
2. Docker Stack auf neuem Server deployen (1 Tag)
3. Wartungsfenster (Samstag Nacht):
   - PostgreSQL Dump + Restore (2h)
   - Filestore Rsync (1h)
   - DNS umstellen (5 Min)
4. Testing (2h)
5. Go-Live

**Downtime:** ~5 Stunden (geplant)  
**Kosten:** Setup-Fee €199 + 1 Monat Overlap (~€230 total)

### 9.2 Dedicated → Cloud (Unwahrscheinlich)

**Szenario:** Dedicated wird zu limitiert, Cloud bietet mehr Flexibilität

**Aufwand:** Identisch zu Cloud → Dedicated  
**Downtime:** ~4 Stunden  
**Kosten:** 0€ Setup-Fee, aber höhere monatliche Kosten

---

## 10. Finale Empfehlung

### 10.1 Für Becker Sicherheitstechnik GmbH

**Empfehlung: 🏆 Dedicated Server AX52**

**Begründung:**
1. **Kosten:** €3.412 Ersparnis über 3 Jahre (57% günstiger)
2. **Performance:** Doppelt so viel RAM, dedizierte CPU, lokales NVMe
3. **Planbarkeit:** Fixe Kosten, keine Volume-Überraschungen
4. **Wachstum:** Ressourcen reichen für 40-50 User (vs 25)
5. **ROI:** Setup-Fee amortisiert sich in 2 Monaten

**Risiko-Mitigation:**
- RAID 1 für Disk-Redundanz
- Tägliche Backups + Offsite (Storage Box)
- Disaster Recovery Plan (8h RTO)
- Bei Bedarf: Spare Server für €51/M (99,9% Uptime)

### 10.2 Alternative Empfehlung

**Wenn:** Projektstart < 1 Woche, Budget keine Rolle

**Dann:** Start mit Cloud CCX33 → Migration zu Dedicated nach 3-6 Monaten

**Trade-Off:**
- ✅ Sofortiger Start (5 Min statt 24h)
- ✅ Schnelleres Testing
- ❌ €500-1.000 höhere Kosten in den ersten Monaten
- ❌ Migrations-Aufwand später (5h Downtime)

### 10.3 Entscheidungstabelle

| "Wenn..." | "Dann wähle..." |
|-----------|-----------------|
| Projektstart > 1 Woche Zeit | **Dedicated** |
| Budget < €100/Monat | **Dedicated** |
| TCO über 3 Jahre wichtig | **Dedicated** |
| Max. Performance gewünscht | **Dedicated** |
| Sofortiger Start nötig | **Cloud** (dann Migration) |
| Hohe Skalierungs-Dynamik | **Cloud** |
| Maximale Verfügbarkeit kritisch | **Cloud** |

---

## 11. Nächste Schritte

### 11.1 Bei Wahl: Dedicated AX52

1. ✅ **Entscheidung dokumentieren** (dieses Dokument)
2. 🔲 **Hetzner Dedicated Server bestellen** (AX52)
3. 🔲 **Hetzner Storage Box bestellen** (BX31, 1 TB)
4. 🔲 **Domain-Zugang klären** (becker-sicherheit.de DNS)
5. 🔲 **Server-Setup starten** (siehe infrastruktur-planung-dedicated.md)
6. 🔲 **Go-Live Termin fixieren** (20. Juli 2026 - Plan A)

### 11.2 Bei Wahl: Cloud CCX33

1. ✅ **Entscheidung dokumentieren**
2. 🔲 **Hetzner Cloud Server erstellen** (CCX33)
3. 🔲 **Volumes erstellen** (150 GB + 300 GB + 500 GB)
4. 🔲 **Hetzner Storage Box bestellen** (BX31)
5. 🔲 **Server-Setup starten** (siehe infrastruktur-planung-docker.md)
6. 🔲 **Migration zu Dedicated planen** (optional, nach 3-6 Monaten)

---

## 12. Approval & Sign-Off

**Entscheidung:**
- [ ] Dedicated AX52 (empfohlen)
- [ ] Cloud CCX33
- [ ] Hybrid (Cloud Start → Dedicated Migration nach __ Monaten)

**Unterschrift:**

| Rolle | Name | Datum |
|-------|------|-------|
| **Projektleiter (C-led)** | Erik Reisig | |
| **Kunde (Becker)** | Uwe Becker | |

---

**Dokumente:**
- **Cloud-Plan:** `infrastruktur-planung-docker.md` (29 KB)
- **Dedicated-Plan:** `infrastruktur-planung-dedicated.md` (39 KB)
- **Dieser Vergleich:** `infrastruktur-vergleich.md`

**Kontakt:**  
C-led Solutions GmbH  
Erik Reisig (Geschäftsführer)  
Email: reisig@c-led.net  
Web: c-led.net

**Ende des Infrastruktur-Vergleichs**
