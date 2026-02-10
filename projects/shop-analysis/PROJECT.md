# Shopware 5 EOL Lead-Projekt

> Deutsche Shops mit veralteter Shopware 5 Installation finden → Migrations-Leads generieren

## 📊 Status

| Metrik | Wert |
|--------|------|
| **Status** | 🔄 Running |
| **Priorität** | HIGH |
| **Gestartet** | 2026-01-31 |
| **Owner** | Heimdall |

## 🎯 Ziel

10.000 deutsche E-Commerce Shops analysieren und Shopware 5 Shops als Leads für Migrations-Dienstleistungen identifizieren.

## 📋 Tasks

### Phase 1: URL Collection ✅
- [x] Batch 1: Initiale Sammlung
- [x] Batch 2: 3,079 URLs (Trusted Shops, Geizhals, etc.)
- [x] Batch 3: 4,347 URLs (Shopware Showcase, Storeleads, etc.)
- **Gesamt: ~7,400 URLs**

### Phase 2: Tech Detection 🔄
- [x] `analyze-shop.js` Script erstellt
- [x] `batch-detect-sw5.js` Batch-Processor erstellt
- [ ] Alle URLs durchscannen (~4,700 noch offen)
- [ ] Ergebnisse in `results/sw5-leads.json`

### Phase 3: Contact Extraction ⬜
- [ ] Impressum-Scraper erweitern
- [ ] Email-Validierung
- [ ] Telefonnummern normalisieren
- [ ] In CRM-Format exportieren

### Phase 4: Outreach ⬜
- [ ] Email-Templates erstellen
- [ ] Outreach-Strategie definieren
- [ ] Tracking für Responses

## 📈 Metriken

| Datum | Analysiert | SW5 | SW6 | Conversion |
|-------|------------|-----|-----|------------|
| 2026-01-31 12:15 | 1000 | 69 | 208 | 6.9% |

## 📁 Dateien

```
projects/shop-analysis/
├── PROJECT.md          # Diese Datei
├── README.md           # Technische Docs
├── analyze-shop.js     # Einzelanalyse
├── batch-detect-sw5.js # Batch-Processor
├── urls/
│   ├── batch-2.json    # 3,079 URLs
│   └── batch-3.json    # 4,347 URLs
└── results/
    ├── sw5-detection.json  # Alle Ergebnisse
    └── sw5-leads.json      # Nur SW5 Leads
```

## 🔗 Referenzen

- Shopware 5 EOL: Juli 2024
- SW6 Migration Guide: https://docs.shopware.com/

## 📝 Notizen

- Detection-Rate für SW5 liegt bei ~7% - das sind potentiell 500+ Leads
- Viele Shops haben bereits Kontaktdaten (Email, Telefon)
- "sw5-migration" als Approach-Angle wird automatisch gesetzt

---
*Zuletzt aktualisiert: 2026-01-31 12:15 UTC*
