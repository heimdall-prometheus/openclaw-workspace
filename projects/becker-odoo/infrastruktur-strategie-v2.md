# Becker Odoo - Infrastruktur Update (Claude-Anforderung)

**Update:** 5. Februar 2026, 16:01 UTC  
**Neue Anforderung:** Claude Code muss auch auf Server laufen

---

## 📊 Hetzner Cloud CPX-Serie (Verfügbar)

| Modell | vCPU | RAM | SSD | Traffic | Preis/Mon |
|--------|------|-----|-----|---------|-----------|
| CPX22 | 2 | 4 GB | 80 GB | 20 TB | 5,99€ |
| **CPX32** | **4** | **8 GB** | **160 GB** | **20 TB** | **10,49€** |
| **CPX42** | **8** | **16 GB** | **320 GB** | **20 TB** | **19,49€** |
| CPX52 | 12 | 24 GB | 480 GB | 20 TB | 27,99€ |
| CPX62 | 16 | 32 GB | 640 GB | 20 TB | 38,49€ |

---

## 🧮 RAM-Bedarf Kalkulation

### Docker Services (Dev + Test):
```
Odoo Dev:           1.5 GB
Odoo Test:          1.5 GB
PostgreSQL:         1.0 GB
Redis:              0.3 GB
Nginx:              0.1 GB
System (Ubuntu):    0.5 GB
----------------------------
Subtotal:           4.9 GB
```

### Claude Code:
```
Claude Code:        2.0 GB (typ. Node.js AI Agent)
Puffer:             1.0 GB
----------------------------
Total mit Claude:   ~8 GB
```

**Fazit:** 8 GB ist **MINIMUM** - kein Puffer!

### Production Phase (später):
```
Odoo Production:    2-3 GB (mehr Daten, mehr Users)
PostgreSQL:         1.5 GB
Redis:              0.5 GB
Claude Code:        2.0 GB
Nginx + System:     1.0 GB
----------------------------
Total Production:   7-9 GB (ohne Dev/Test!)
```

**Fazit:** Production braucht 16 GB wenn Claude dabei ist.

---

## 🎯 Empfehlung: CPX42 (16 GB)

### Warum CPX42?

1. **Genug RAM für ALLES:**
   - Dev + Test + Claude: 8 GB → passt locker
   - Production + Claude: 9-10 GB → noch 6 GB Puffer
   - Kein RAM-Stress, stabile Performance

2. **8 vCPU statt 4:**
   - Docker Compose mit 5+ Containern
   - Claude Code braucht CPU für AI-Inference
   - Odoo + PostgreSQL + Claude parallel = CPU-hungry

3. **320 GB Storage:**
   - Datenbank-Wachstum über 3 Jahre
   - Logs, Backups, Filestore
   - Claude Code Models/Cache

4. **Zukunftssicher:**
   - Kein Upgrade nötig bei Production Go-Live
   - Kann Dev + Test + Production gleichzeitig laufen lassen
   - Bei Wachstum: Nur Production auf eigenen Server auslagern

### Warum NICHT CPX32 (8GB)?

❌ **Zu knapp:**
- Dev + Test + Claude = ~8 GB (100% Auslastung!)
- Kein RAM-Puffer für Peaks
- Bei Production Go-Live: MUSS auf CPX52 upgraden (27,99€)
- Risiko: OOM Kills, Swapping, schlechte Performance

---

## 💰 Kosten-Vergleich (3 Jahre)

### Szenario A: CPX32 Start → CPX52 Production
```
Phase 1 (6 Mon Dev+Test):
  CPX32: 10,49€ × 6 = 62,94€

Phase 2 (30 Mon Production):
  CPX52: 27,99€ × 30 = 839,70€
  
TOTAL: 902,64€ (3 Jahre)
Monatlich: 25,07€
```

### Szenario B: CPX42 von Anfang an (EMPFOHLEN)
```
Phase 1 (6 Mon Dev+Test):
  CPX42: 19,49€ × 6 = 116,94€

Phase 2 (30 Mon Dev+Test+Prod):
  CPX42: 19,49€ × 30 = 584,70€
  
TOTAL: 701,64€ (3 Jahre)
Monatlich: 19,49€

ERSPARNIS: 201€ vs. Szenario A!
```

### Szenario C: CPX42 → CPX52 später (wenn nötig)
```
Phase 1+2 (30 Mon):
  CPX42: 19,49€ × 30 = 584,70€

Phase 3 (6 Mon bei starkem Wachstum):
  CPX52: 27,99€ × 6 = 167,94€
  
TOTAL: 752,64€ (3 Jahre)
Monatlich: 20,91€
```

---

## 📊 Vergleichs-Matrix

| Kriterium | CPX32 (8GB) | CPX42 (16GB) | Winner |
|-----------|-------------|--------------|--------|
| RAM für Dev+Test+Claude | ⚠️ Knapp (100%) | ✅ Locker (50%) | CPX42 |
| RAM für Production | ❌ Zu wenig | ✅ Perfekt | CPX42 |
| CPU für Claude | ⚠️ 4 Cores | ✅ 8 Cores | CPX42 |
| Kosten Start | ✅ 10,49€ | ⚠️ 19,49€ | CPX32 |
| Kosten 3 Jahre | ❌ 902€ | ✅ 701€ | CPX42 |
| Upgrade nötig? | ❌ Ja (bei Go-Live) | ✅ Nein | CPX42 |
| Risiko | ⚠️ OOM Kills | ✅ Stabil | CPX42 |

**Klarer Sieger: CPX42**

---

## 🚀 Deployment-Strategie mit CPX42

### Phase 1: Development & Test (6 Monate)
```yaml
Server: CPX42 (16GB, 8 vCPU)
Services:
  - Odoo Dev (Port 8069)
  - Odoo Test (Port 8070)
  - PostgreSQL (2 DBs)
  - Redis Cache
  - Nginx Reverse Proxy
  - Claude Code (Port 3000)
  
RAM Usage: ~8 GB (50% Auslastung)
```

### Phase 2: Production Go-Live (ab Juli)
```yaml
Server: CPX42 (16GB, 8 vCPU)
Services:
  - Odoo Production (Port 80/443)
  - Odoo Test (Port 8070) - optional
  - PostgreSQL (prod + test)
  - Redis Cache
  - Nginx Reverse Proxy
  - Claude Code (Port 3000)
  
RAM Usage: ~12 GB (75% Auslastung)
```

### Option: Production auslagern (bei Bedarf)
Wenn Production + Dev + Test + Claude zusammen zu viel:
- CPX42 behält Dev + Test + Claude
- Neuer Server für Production only (CPX32 reicht dann)

---

## 🔐 Claude Code Setup

### Docker Container
```yaml
claude-code:
  image: node:22
  volumes:
    - ./workspace:/workspace
  environment:
    - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
  ports:
    - "3000:3000"
  restart: unless-stopped
  mem_limit: 2g
  cpus: 2
```

### Zugriff
- Internal: http://claude-code:3000
- External: https://claude.becker-sicherheit.de (via Nginx)

---

## 📅 Timeline Update

| Datum | Milestone |
|-------|-----------|
| **6. Feb 2026** | Hetzner CPX42 bestellen |
| **7-8. Feb** | Server Setup + Docker + Claude |
| **9. Feb - Jun** | Development mit Claude Support |
| **Juli 2026** | Production Go-Live (gleicher Server) |

---

## ✅ Finale Empfehlung

**Server:** Hetzner Cloud CPX42  
**Specs:** 16 GB RAM, 8 vCPU, 320 GB SSD  
**Preis:** 19,49€/Monat  
**Kosten (3 Jahre):** 701,64€ (~19,49€/Mon)

**Begründung:**
- ✅ Genug RAM für Dev + Test + Production + Claude
- ✅ 8 vCPU für parallele Workloads
- ✅ Kein Upgrade nötig bei Go-Live
- ✅ 201€ günstiger als CPX32 → CPX52 Path
- ✅ Zukunftssicher für 3+ Jahre

**Alternative:** CPX52 (24GB) nur wenn:
- Mehr als 2 Odoo-Instanzen gleichzeitig
- Mehrere Claude Code Instanzen
- Sehr große Datenbanken (>100GB)

---

**Nächster Schritt:** CPX42 bei Hetzner bestellen? 🚀
