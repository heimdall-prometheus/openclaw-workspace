# leads.imr-media.de — IMR Media Lead Scraper & Qualifier

## Strategie (aktuell)
**Scrapen → Qualifizieren → Export nach Apollo → Outreach in Apollo**

Die Plattform war ursprünglich als Full-Stack CRM + Email-Outreach gedacht. Cold-Email-Sequences hatten katastrophale Ergebnisse → Strategiewechsel:
- ✅ **Behalten:** Scraping (Gelbe Seiten) + Qualifizierung (Chrome Extension + Claude Vision)
- ❌ **Abgeschaltet:** Email Sequences, Campaigns, Mailbox (alles ARCHIVED)
- 🔄 **Neu:** Apollo.io für Outreach (Import via CSV)

## Infrastruktur
| | |
|---|---|
| **URL** | https://leads.imr-media.de |
| **Server** | mein-malbuch (100.67.243.6) |
| **Pfad** | /opt/lead-generator |
| **Port** | 3040 (Next.js 14 — ⚠️ DEV mode!) |
| **DB** | SQLite/Prisma — /opt/lead-generator/webapp/prisma/prod.db (30MB) |
| **Nginx** | /etc/nginx/sites-enabled/leads.imr-media.de |

## Tech Stack
Next.js 14, React 18, Tailwind 4, TypeScript, Prisma (SQLite), Claude SDK (Vision), Resend (legacy), R2 (Screenshots), Recharts, Playwright, GrapeJS

## Aktiver Workflow

```
1. Gelbe Seiten Scraper     → Leads in DB (Name, Adresse, Telefon, Website)
2. Claude Vision Analysis    → Screenshot + AI-Bewertung der Website
3. Chrome Extension          → Manuelle Qualifizierung + Kontaktdaten-Extraktion
4. CSV Export                → /api/export oder Vollexport (leads_vollstaendig_*.csv)
5. Apollo Import             → Accounts + Contacts CSVs
6. Outreach in Apollo        → Email Sequences, Calls
```

## Datenstand (06.02.2026)

### Pipeline
| Stufe | Anzahl | % |
|---|---|---|
| Leads gesamt | 6.419 | 100% |
| Qualifiziert (keine Website) | 3.612 | 56% |
| Qualifiziert (schlechte Website) | 285 | 4,4% |
| Nicht qualifiziert | 2.503 | 39% |
| Vision complete | 120 | 1,9% |
| Contacted | 219 | 3,4% |
| **Interessiert (warm!)** | **3** | |

### Die 3 warmen Leads
| Name | Stadt | Status |
|---|---|---|
| Dr. Stefanie Morlok | Utting am Ammersee | Interested (letzter Kontakt 04.02.) |
| Automobilforum Sigg & Still (Ford) | Augsburg | Interested |
| AS Dienstleistungen | Friedberg | Interested |

### Scraping-Abdeckung
- **Region:** Augsburg/Schwaben (bisher nur 1 Stadt)
- **Branchen:** 10+ (Zahnarzt, Steuerberater, GaLaBau, Maler, Friseur, Energieberater, Elektriker, Ingenieurbüro, Werkstatt, Umzug)
- **34 Batches** abgeschlossen

### Apollo-Export (05.02.2026)
- 94 Accounts + 94 Contacts als CSV vorbereitet
- Test-Imports mit julian.faupel@-Adressen als Fallback
- Accounts enthalten: Name, Website, Phone, Adresse, Screenshot-URL, Vision-URL

## Katastrophaler Email-Fehler (Legacy)
- 2.272 Emails gesendet, nur 210 als "delivered" getracked
- **Reply Rate: 1,2%** (27 Antworten)
- 14 Bounces, 3 Stop-Words
- Alle 11 Sequences → ARCHIVED
- Konsequenz: **Kein eigener Email-Outreach mehr, alles über Apollo**

## Chrome Extension
- 11 Versionen (v2-v11), aktuell v11
- Download: leads.imr-media.de/ext-v11.zip
- Funktion: Lead-Qualifizierung direkt im Browser während Gelbe-Seiten-Browsing

## Sonstige Subsysteme (Legacy/inaktiv)
| Modul | Status | Beschreibung |
|---|---|---|
| Sequences | ❌ ARCHIVED | 11 Sales-Sequences, alle deaktiviert |
| Email Campaigns | ❌ Inaktiv | Legacy Cold-Email System |
| Mailbox | ❌ Inaktiv | Resend Webhook Inbound |
| Homepage Visioner | ⚠️ Unklar | Generiert Redesign-Vorschläge für Leads |
| CRM Pipeline | ⚠️ Minimal | 214 lost, 3 interested, Rest kein Funnel-Step |

## User
| Email | Rolle |
|---|---|
| reisig@c-led.net | ADMIN (zuletzt 05.02.) |
| julian.faupel@imr-media.de | ADMIN (zuletzt 12.01.) |
| erik@imr-media.de | VIEWER (nie eingeloggt) |

## Offene Fragen / Handlungsbedarf
1. **Production Build?** — Läuft als `next dev`, sollte `next build && next start` sein
2. **Scraping skalieren** — Bisher nur Augsburg, weitere Städte?
3. **Apollo-Integration automatisieren?** — Aktuell manueller CSV-Export/Import
4. **Vision Pipeline optimieren** — 129 failed, 22 pending — was ist das Problem?
5. **Homepage Visioner** — Wird das noch genutzt als Sales-Asset?
6. **3 warme Leads** — Werden die in Apollo weiterbearbeitet?
7. **Inaktiv seit 23.01.** — Bewusste Pause oder vergessen?
