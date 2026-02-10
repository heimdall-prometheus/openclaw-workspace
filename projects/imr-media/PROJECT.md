# IMR Media - Agentur-Projekte

> Digitale Agentur - Website, Lead Generation, Tools & Infrastruktur

## 📊 Status

| Metrik | Wert |
|--------|------|
| **Status** | 🔄 Running |
| **Priorität** | HIGH |
| **Website** | https://imr-media.de |
| **Owner** | Erik + Heimdall |

## 🎯 Ziel

IMR Media als Full-Service Digitalagentur positionieren mit:
- Starker Online-Präsenz
- Lead Generation (Leitfäden, Tools)
- Professionelle Kommunikation (VoIP, Email)

---

## 📋 Aktive Workstreams

### 1. Website & Lead Magnets ⚠️
**Status:** Teilweise Live - Redeploy erforderlich

**OFFEN:**
- [ ] **Cloudflare Pages Redeploy** - /online-shop-guide zeigt 404 (Build ist korrekt, aber nicht deployed)
  - Option A: Dashboard → Pages → imr-media → Retry deployment
  - Option B: Neues Token mit "Cloudflare Pages:Edit" Permission
- [ ] Formular End-to-End testen nach Redeploy

| Asset | URL | Beschreibung |
|-------|-----|--------------|
| Website | imr-media.de | Vite + React + Tailwind |
| Leitfaden | /leitfaden | 19-seitiger Website-Guide (Pro) |
| Shop-Guide | /online-shop-guide | E-Com Checkliste (Beginner) |

**Infrastruktur:**
- Server: mein-malbuch (100.67.243.6)
- Repo: `git@github.com:InMediasReh/homepage.git`
- Deploy: Cloudflare Pages (auto on push)
- API: api.imr-media.de (Cloudflare Worker)

**PDFs auf R2:**
- `assets.imr-media.de/imr-media/lead-magnets/website-leitfaden-v5.pdf`
- `assets.imr-media.de/imr-media/lead-magnets/FINAL-synthese-v6.pdf`

---

### 2. Fonial VoIP Setup ⏳
**Status:** Blocked - Wartet auf Konfiguration

| Info | Wert |
|------|------|
| Login | reisig@c-led.net |
| Kundennummer | 422712 |
| Plan | fonial PLUS |
| Rufnummer | 0821 99950242 (Augsburg) |
| Support | 0221 669 669 66 |

**Tasks:**
- [x] Account vorhanden
- [x] Rufnummer aktiv (0821 99950242)
- [ ] Weiterleitung/Ziel konfigurieren
- [ ] Call Recording aktivieren (Support kontaktieren)
- [ ] SIP Client einrichten (Zoiper empfohlen)
- [ ] Outbound/Inbound CRM-Integration

**Empfohlene Clients:**
- iPhone/Mac: Zoiper (kostenlos, sync-fähig)
- Alternative: Groundwire (Premium)

---

### 3. Shopware 5 EOL Leads 🔄
**Status:** Running - Tech Detection läuft

Separate Projektdatei: `projects/shop-analysis/PROJECT.md`

**Ziel:** Deutsche SW5-Shops als Migrations-Kunden für IMR Media

| Metrik | Stand |
|--------|-------|
| URLs gesammelt | ~7,400 |
| SW5 gefunden | ~105+ (läuft) |
| Conversion | ~7% |

---

### 4. Marketing & Content 📋
**Status:** Backlog

**Ideen:**
- [ ] Blog-Artikel zu Website-Fehlern
- [ ] Case Studies von Projekten
- [ ] Social Media Präsenz (LinkedIn?)
- [ ] Newsletter-Aufbau
- [ ] SEO-Optimierung der Landingpages

---

### 5. Tools & Automatisierung 📋
**Status:** Backlog

**Ideen:**
- [ ] Automatische Lead-Benachrichtigung (Telegram)
- [ ] CRM-Integration für Leads
- [ ] Angebots-Generator
- [ ] Projekt-Zeiterfassung

---

## 📁 Dateien & Ressourcen

```
projects/imr-media/
├── PROJECT.md          # Diese Datei
└── (weitere Dateien)

Externe:
├── /var/www/imr-media/  # Server-Pfad
├── credentials/imr-api-keys.md  # API Keys
└── projects/shop-analysis/  # SW5 Lead-Projekt
```

## 🔗 Referenzen

- Website: https://imr-media.de
- GitHub: github.com/InMediasReh/homepage
- Cloudflare: Pages + Workers + R2
- Fonial: fonial.de (VoIP Provider)

## 📝 Notizen

- Lead Magnets deployed am 2026-01-31
- Fonial-Nummer ist aktiv aber leitet nirgendwo hin!
- SW5 EOL ist potentiell lukratives Geschäft (Support-Ende war Juli 2024)

---
*Zuletzt aktualisiert: 2026-01-31 12:17 UTC*
