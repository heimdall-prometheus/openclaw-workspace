# Heimdall Makro-Tracker

**Privacy-First Nutrition Tracking für Erik**

## System

- **Datenspeicherung:** Lokal in `YYYY-MM-DD.json`
- **Datenbank:** `food-database.json` (USDA + Custom)
- **Zugriff:** Nur Erik + Heimdall
- **Keine Cloud, keine Apps, keine Werbung**

## Aktuelles Ziel

**Phase 1: Baseline Tracking (Woche 1)**
- Alles tracken, keine Limits
- Durchschnittliche Kalorienzufuhr ermitteln
- Grundumsatz berechnen
- Dann: Phase 2 mit nachhaltigem Defizit planen

**Ausgangssituation:**
- Gewicht: 168kg
- Größe: 180cm
- Ziel: Abnehmen
- Vorteil: Muskelmasse von früher (höherer Grundumsatz)

## Input-Methoden

1. **Foto + Text** (wie heute)
2. **Nur Text:** "500g Hähnchen, 4 Eier, 3 Champignons"
3. **Kurz:** "Frühstück wie gestern"

Heimdall analysiert automatisch und trägt ein.

## Datei-Format

```json
{
  "date": "YYYY-MM-DD",
  "meals": [
    {
      "time": "HH:MM",
      "name": "Frühstück/Mittag/Abend/Snack",
      "photo": "/path/to/photo.jpg",
      "items": [...],
      "totals": {...}
    }
  ],
  "dailyTotals": {...},
  "notes": "..."
}
```

## Reports

- **Täglich:** Makros + % der Ziele
- **Wöchentlich:** Durchschnitte, Trends
- **Monatlich:** Best/Worst Days, Fortschritt

## Nächste Schritte

1. ✅ System aufgebaut
2. ✅ Erstes Frühstück getracked
3. ⏳ Weitere Mahlzeiten tracken (heute)
4. ⏳ Nach 7 Tagen: Baseline auswerten
5. ⏳ Phase 2: Defizit-Plan erstellen

---
*Gestartet: 2026-02-01 10:14 UTC*
