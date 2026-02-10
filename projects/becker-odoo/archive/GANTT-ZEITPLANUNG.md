# Becker Odoo - Gantt-Chart & Zeitplanung

**Erstellt:** 02.02.2026  
**Annahme:** 3-4 Arbeitstage pro Woche verfügbar  
**Gesamt-Aufwand geschätzt:** 175-270 PT (Mittel: ~220 PT)

---

## 📊 Aufwand pro Bereich (kombiniert)

| # | Bereich | Workshop | Impl. Aufwand | Gesamt PT | Priorität |
|---|---------|----------|---------------|-----------|-----------|
| 1 | **Projekte & Nachkalkulation** | 4.5h | 25-35 PT | **30 PT** | 🔴 KRITISCH |
| 2 | **Buchhaltung & Finanzen** | 4.5h | 20-30 PT | **25 PT** | 🔴 KRITISCH |
| 3 | **Monteure & Service** | 6.5h | 35-50 PT | **40 PT** | 🟡 HOCH |
| 4 | **Einkauf & Beschaffung** | 4h | 20-30 PT | **25 PT** | 🟡 HOCH |
| 5 | **Lager & Logistik** | 4.5h | 20-30 PT | **25 PT** | 🟢 MITTEL |
| 6 | **Vertrieb & Auftragsabwicklung** | 4h | 20-25 PT | **22 PT** | 🟢 MITTEL |
| 7 | **Schnittstellen & Custom** | 3.5h | 50-70 PT | **60 PT** | ⚪ PARALLEL |
| - | **PM & Migration** | - | 50-70 PT | **60 PT** | 🔵 LAUFEND |
| | **GESAMT** | **~31h** | | **~287 PT** | |

---

## 🗓️ GANTT-CHART (bei 3.5 PT/Woche Durchschnitt)

```
Woche    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18
         |----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----| 
         Feb                     Mär                      Apr                      Mai

PHASE 0: VORBEREITUNG (5 PT)
         ████████
         W1-2

PHASE 1: DISCOVERY & WORKSHOPS (15 PT)
                  █████████████████████
                  W3        W4        W5

─────────────────── KRITISCH (zuerst) ───────────────────

PROJEKTE & NACHKALKULATION (30 PT) - Umsatzverlust vermeiden!
                            ████████████████████████████████████████████████████
                            W5              W6              W7              W8    W9

BUCHHALTUNG & FINANZEN (25 PT) - X-Rechnung Pflicht!
                                        ████████████████████████████████████████
                                        W7              W8              W9   W10

─────────────────── HOCH (danach) ───────────────────

MONTEURE & SERVICE (40 PT)
                                                    ████████████████████████████████████████████████████████████████
                                                    W10             W11             W12             W13       W14

EINKAUF & BESCHAFFUNG (25 PT)
                                                                            ████████████████████████████████████████
                                                                            W12             W13             W14  W15

─────────────────── MITTEL ───────────────────

LAGER & LOGISTIK (25 PT)
                                                                                    ████████████████████████████████████████
                                                                                    W14             W15             W16  W17

VERTRIEB & AUFTRAGSABWICKLUNG (22 PT)
                                                                                            ████████████████████████████████████
                                                                                            W16             W17         W18

─────────────────── PARALLEL (Custom Dev) ───────────────────

SCHNITTSTELLEN & CUSTOM (60 PT) - S-Firm, GAEB, OCR
         ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
         W5                                                                                                                              W18+
         (Parallel zur Implementierung, nach Bedarf)

─────────────────── LAUFEND ───────────────────

PM & MIGRATION (60 PT)
█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
W1                                                                                                                                        W20+
```

---

## 📅 Detaillierte Wochenplanung

### Monat 1: Februar 2026

| KW | Woche | Tage | Bereich | Aktivitäten |
|----|-------|------|---------|-------------|
| 06 | W1 | 4 | **Vorbereitung** | Kickoff Uwe, IST-Analyse starten |
| 06 | W2 | 3 | **Vorbereitung** | IST-Analyse, Datenstruktur analysieren |
| 07 | W3 | 4 | **Discovery** | Workshop Lager, Einkauf |
| 07 | W4 | 3 | **Discovery** | Workshop Vertrieb, Monteure |
| 08 | W5 | 4 | **Discovery + Projekte** | Workshop Finanzen, Schnittstellen + Start Projekte |

### Monat 2: März 2026

| KW | Woche | Tage | Bereich | Aktivitäten |
|----|-------|------|---------|-------------|
| 09 | W6 | 4 | **Projekte** | Projektstruktur, Kostenstellen, Weiterberechnung |
| 09 | W7 | 3 | **Projekte + Buha** | Profitabilität + Start Buchhaltung |
| 10 | W8 | 4 | **Buchhaltung** | Eingangsrechnung, X-Rechnung Setup |
| 10 | W9 | 3 | **Buchhaltung** | DATEV, 3-Wege-Prüfung |
| 11 | W10 | 4 | **Monteure** | Terminplanung, Zeiterfassung |

### Monat 3: April 2026

| KW | Woche | Tage | Bereich | Aktivitäten |
|----|-------|------|---------|-------------|
| 13 | W11 | 3 | **Monteure** | Material-Entnahme, Montage-Doku |
| 14 | W12 | 4 | **Monteure + Einkauf** | Wartungsverträge + Start Einkauf |
| 15 | W13 | 4 | **Einkauf** | Bestellprozess, RFQ, 3-Wege-Prüfung |
| 15 | W14 | 3 | **Einkauf + Lager** | Abschluss + Start Lager |

### Monat 4: Mai 2026

| KW | Woche | Tage | Bereich | Aktivitäten |
|----|-------|------|---------|-------------|
| 17 | W15 | 4 | **Lager** | Wareneingang, Warenausgang, Umlagerung |
| 18 | W16 | 3 | **Lager + Vertrieb** | Bestandsführung + Start Vertrieb |
| 19 | W17 | 4 | **Vertrieb** | Angebote, Kundenpreise, Auftragsfortschritt |
| 19 | W18 | 3 | **Vertrieb** | POS, Abschluss Basis-Implementierung |

### Ab Monat 5: Juni-August 2026

| Phase | Wochen | Aktivitäten |
|-------|--------|-------------|
| **Migration** | W19-22 | Test-Migration, Daten-Bereinigung, Final-Migration |
| **UAT** | W23-26 | Key User Testing, Bug Fixing, Abnahme |
| **Schulung** | W27-28 | End-User Training alle Bereiche |
| **Go-Live** | W29 | Cutover, Go-Live Support |
| **Hypercare** | W30-33 | Stabilisierung, Feintuning |

---

## 🎯 Meilensteine

| # | Meilenstein | Ziel-Datum | KW |
|---|-------------|------------|-----|
| M1 | Kickoff abgeschlossen | 07.02.2026 | W2 |
| M2 | Discovery fertig | 28.02.2026 | W5 |
| M3 | **Projekte & Buha LIVE** ⚠️ | 21.03.2026 | W9 |
| M4 | Monteure LIVE | 11.04.2026 | W12 |
| M5 | Einkauf & Lager LIVE | 02.05.2026 | W15 |
| M6 | Vertrieb LIVE | 16.05.2026 | W18 |
| M7 | Migration fertig | 13.06.2026 | W22 |
| M8 | UAT abgeschlossen | 11.07.2026 | W26 |
| M9 | **GO-LIVE** 🚀 | 25.07.2026 | W29 |

---

## ⚠️ Abhängigkeiten

```
Projekte & Nachkalkulation
    └── benötigt für: Monteure (Kostenerfassung)
    └── benötigt für: Buchhaltung (Weiterberechnung)

Lager & Logistik  
    └── benötigt für: Monteure (Umlagerung)
    └── benötigt für: Einkauf (Wareneingang)

Einkauf & Beschaffung
    └── benötigt für: Buchhaltung (3-Wege-Prüfung)
    └── benötigt für: Vertrieb (Auftragsverknüpfung)

Schnittstellen
    └── GAEB → benötigt für: Vertrieb (Angebote)
    └── S-Firm → benötigt für: Buchhaltung (Überweisungen)
    └── OCR → optional, kann später
```

---

## 📈 Kapazitätsplanung

### Annahmen
- **Verfügbar:** 3-4 Tage/Woche = Ø 3.5 PT/Woche
- **Projektdauer:** ~18 Wochen Implementierung = 63 PT
- **Gesamt inkl. Migration, UAT, Schulung:** ~28-30 Wochen

### Berechnung
| Posten | PT | Wochen (bei 3.5 PT/W) |
|--------|-----|----------------------|
| Vorbereitung + Discovery | 20 | 6 |
| Basis-Implementierung | 167 | 48 (→ parallel!) |
| Custom Development | 60 | 17 (parallel) |
| Migration | 30 | 9 |
| Schulung | 20 | 6 |
| **→ Kritischer Pfad** | ~100 | **~28 Wochen** |

**Ergebnis:** Mit Parallelisierung erreichbar in **~7 Monaten** (bis Ende August 2026)

---

## ✅ Nächste Schritte

1. [ ] **Mit Uwe abstimmen:**
   - Prioritäten bestätigen (Projekte + Buha zuerst?)
   - Key Users pro Bereich benennen
   - Verfügbarkeit bestätigen (3-4 Tage/Woche realistisch?)

2. [ ] **Workshop-Termine festlegen:**
   - KW 7-8 (Mitte Februar): 5 Discovery-Workshops
   - Je 4-6h pro Workshop

3. [ ] **Abhängigkeiten prüfen:**
   - GAEB wirklich parallel möglich?
   - X-Rechnung Deadline? (gesetzlich ab wann?)

---

*Erstellt: 02.02.2026 11:35 UTC | Heimdall*
