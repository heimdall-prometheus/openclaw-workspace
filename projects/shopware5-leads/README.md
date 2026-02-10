# Shopware 5 EOL Lead-Akquise Projekt

## Ziel
Deutsche Online-Shops identifizieren, die noch Shopware 5 betreiben → potentielle Kunden für Migration zu SW6 oder anderen Plattformen.

## Status
- **Gestartet:** 2026-01-31
- **Phase:** Recherche & Lead-Sammlung

## Struktur
- `data/leads.json` - Lead-Datenbank
- `data/analyzed/` - Detailanalysen pro Shop
- `scripts/` - Recherche-Tools
- `docs/` - Dokumentation

## Shopware 5 Detection
Erkennungsmerkmale:
- `<meta name="generator" content="Shopware">`
- `/themes/Frontend/Responsive/` im Source
- `shopware.php` Endpoints
- Cookie: `session-*` mit SW-Pattern
- X-Shopware-* Headers (manchmal)
- `/engine/Shopware/` Pfade in Errors
