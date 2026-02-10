# Lebensmittel-Sonderposten.de (Hapex GmbH)

## Überblick
| | |
|---|---|
| **Firma** | Hapex GmbH |
| **Shop** | www.lebensmittel-sonderposten.de |
| **Weitere** | lagerverkauf-freilinger.de |
| **Firmenwebsite** | hapex-gmbh.de |
| **Adresse** | Marburger Straße 127, 35396 Gießen |
| **Lager** | Rothweg 4, 35457 Lollar (Mo-Fr 9-15 Uhr) |
| **Branche** | Lebensmittel-Restposten / Sonderposten |
| **Geschäft** | Überhangware, MHD-Ware, Verpackungsschäden, Sonderposten |
| **Gegründet** | 2015 (Onlinehandel), 2017 (eigener Shop) |
| **Vertrieb** | Online + Markthandel + Einzelhandel + eigene LKWs |
| **Apps** | iOS App verfügbar |
| **TrustedShops** | 8.517 Bewertungen |

## Eriks Rolle
- **Consultant:** 4h/Woche mandatiert
- **Zeiterfassung:** projects/lebensmittel-sonderposten/ZEITERFASSUNG.md

## Tech Stack (Production)
| | |
|---|---|
| **Server** | 46.101.247.162 (DigitalOcean Droplet) |
| **SSH** | root@46.101.247.162 |
| **OS** | Ubuntu 24.10 (EOL! — Upgrade pending) |
| **Shopware** | 6.7.1.1 (Production) |
| **PHP** | 8.3.11 |
| **Webserver** | Nginx + PHP-FPM |
| **DB** | DigitalOcean Managed MySQL (extern) |
| **DB-Host** | lebensmittel-sonderposten-sw6-do-user-18569825-0.h.db.ondigitalocean.com:25060 |
| **DB-User** | doadmin |
| **DB-Name** | sw6_dev (Artefakt — IST Production!) |
| **Search** | OpenSearch (DigitalOcean Managed) |
| **Cache/Lock** | Redis (10.114.0.9:6379) via stunnel |
| **Storage** | DigitalOcean Spaces (s3forsw6.fra1.digitaloceanspaces.com) |
| **Email** | Resend (SMTP) |
| **Web-Root** | /var/www/dev2.lebensmittel-sonderposten.de/web |
| **Domain** | www.lebensmittel-sonderposten.de (Cloudflare, SSL) |
| **Blue-Green** | Enabled (BLUE_GREEN_DEPLOYMENT=1) |
| **HTTP Cache** | Disabled (SHOPWARE_HTTP_CACHE_ENABLED=0) |

## Shop-Daten (Stand: 06.02.2026)
| Metrik | Wert |
|---|---|
| **Produkte (Parent)** | 29.832 |
| **Produkte (Total)** | 29.894 |
| **Kategorien** | 1.680 |
| **Kunden** | 1.451.656 (!!) |
| **Orders (Total)** | 233.186 |
| **Sales Channels** | 14 |

### Sales Channels
| Channel | Status |
|---|---|
| Lebensmittel-Sonderposten.de | Haupt-Shop |
| TEMU | Aktiv |
| Google Shopping XML | Feed |
| Amazon AFN-Bestellung | Aktiv |
| Pickware POS | POS-System |
| Lagerkasse Lollar | Offline POS |
| Interner Verkauf | Intern |
| MHD erreicht | Sonder-Channel |
| lmsopo für Temu | Temu-Integration |

### Umsatz-Entwicklung (Brutto)
| Monat | Orders | Umsatz (€) |
|---|---|---|
| Feb 2026 (bis 06.) | 7.713 | 581.389 |
| Jan 2026 | 27.984 | 2.154.318 |
| Dez 2025 | 34.784 | 2.885.789 |
| Nov 2025 | 32.307 | 3.116.903 |
| Okt 2025 | 15.233 | 1.559.442 |
| Sep 2025 | 95 | 4.108 |

**~2-3 Mio €/Monat Umsatz!** Massive E-Commerce Operation.

## Sortiment
Lebensmittel-Sonderposten spezialisiert auf:
- **Lebensmittel** (Hauptkategorie)
- **Süßigkeiten**
- **Vegane Produkte**
- **Käse**
- **Getränke**
- **Gewürze**
- **Kaffee**
- **Körper- und Haushaltshygiene**

Business-Modell: Einkauf von Überhangware, kurz-MHD, Verpackungsschäden von Markenherstellern → Weiterverkauf zum Discount-Preis.

## Infrastruktur-Notizen
- ⚠️ **Ubuntu 24.10 ist EOL** — Upgrade auf 25.10 verfügbar
- ⚠️ **System Load 9.1** bei Abfrage — möglicherweise unter Last
- ⚠️ **Disk: 63.8% von 154GB** — Monitoring sinnvoll
- ✅ Eigene LKWs + Kühltransport
- ✅ Cloudflare (WAF/CDN)
- ✅ OpenSearch für Suche
- ✅ Diverse Monitoring-Scripts vorhanden (alert_message_failures.sh, monitor_db_locks.sh etc.)
- ✅ Claude/MCP-Konfiguration vorhanden (.claude/, CLAUDE.md) — vorheriger AI-Einsatz

## Offene Fragen
- Was genau ist der Consulting-Scope? (Performance, Features, Migration?)
- Gibt es spezifische Probleme / Prioritäten?
- Zugang zum Shopware Admin Panel?
- Wer sind die Ansprechpartner bei Hapex?
