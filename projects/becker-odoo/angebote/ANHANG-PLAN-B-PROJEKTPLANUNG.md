# Anhang: Detaillierte Projektplanung
## Angebot CLED-2026-002 - Kernumfang (60 PT)

**Projekt:** Odoo ERP Implementation  
**Kunde:** Becker Sicherheitstechnik GmbH  
**Anbieter:** C-led Solutions GmbH

---

## Übersicht

| Bereich | Prozesse | Aufwand |
|---------|----------|---------|
| 1. Vertrieb & Angebote | 5 | 12 PT |
| 2. Einkauf & Bestellung | 5 | 8 PT |
| 3. Projektmanagement & Nachkalkulation | 5 | 10 PT |
| 4. CRM & Kundenakte (Basis) | 2 | 4 PT |
| 5. Lager & Bestand | 6 | 10 PT |
| 6. Buchhaltung & DATEV | 6 | 12 PT |
| 7. Puffer & Testing | - | 4 PT |
| **Gesamt** | **29** | **60 PT** |

---

## 1. Vertrieb & Angebote (12 PT)

| # | Prozess | Beschreibung | PT |
|---|---------|--------------|-----|
| V1 | Angebotserstellung | Angebote erstellen, Vorlagen, Rabattregeln | 3 |
| V2 | Auftragsbestätigung | AB erstellen, Verknüpfung mit Einkauf | 2 |
| V3 | Kundenspezifische Preise | Preisregeln pro Kunde/Gruppe | 3 |
| V4 | Auftragsfortschritt | Status-Tracking, Liefertermine, Kundenkommunikation | 2 |
| V5 | POS / Thekenkauf | Direktverkauf vor Ort, Kassensystem | 2 |

**Ergebnis:** Durchgängiger Vertriebsprozess von Angebot bis Rechnung

---

## 2. Einkauf & Bestellung (8 PT)

| # | Prozess | Beschreibung | PT |
|---|---------|--------------|-----|
| E1 | Bestellung anlegen | Bestellungen beim Lieferanten | 1 |
| E2 | RFQ-Prozess | Anfrage → Angebote vergleichen → Bestellung | 2 |
| E3 | Wareneingang-Abgleich | Lieferschein mit Bestellung prüfen | 1.5 |
| E4 | 3-Wege-Prüfung | Bestellung ↔ Lieferschein ↔ Rechnung automatisiert | 2.5 |
| E5 | Lieferantenverwaltung | Konditionen, Bewertung, Hinweise | 1 |

**Ergebnis:** Transparenz über offene Bestellungen, automatisierte Prüfungen

---

## 3. Projektmanagement & Nachkalkulation (10 PT)

| # | Prozess | Beschreibung | PT |
|---|---------|--------------|-----|
| P1 | Projektanlage | Projekt erstellen, Struktur, Nummernkreise | 2 |
| P2 | Kosten erfassen | Material, Arbeitszeit, Fremdleistung auf Projekt | 3 |
| P3 | Weiterberechnung | Projektkosten an Kunde weiterberechnen | 2.5 |
| P4 | Profitabilität | Auswertungen, Margen-Reports pro Projekt | 1.5 |
| P5 | Dokumentenablage | Dateien, Fotos, Notizen pro Projekt | 1 |

**Ergebnis:** Vollständige Projekttransparenz, keine vergessenen Weiterberechnungen

---

## 4. CRM & Kundenakte - Basis (4 PT)

| # | Prozess | Beschreibung | PT |
|---|---------|--------------|-----|
| C1 | Kundenhistorie | Komplette Historie: Angebote, Aufträge, Rechnungen | 2 |
| C2 | Kontaktmanagement | Ansprechpartner, Kommunikationshistorie | 2 |

**Ergebnis:** Grundlegende Kundensicht, Historie entsteht automatisch durch Nutzung

---

## 5. Lager & Bestand (10 PT)

| # | Prozess | Beschreibung | PT |
|---|---------|--------------|-----|
| L1 | Wareneingang | Ware annehmen, prüfen, einbuchen | 2 |
| L2 | Warenausgang / Picking | Kommissionierung für Aufträge | 2 |
| L3 | Umlagerung Monteur | Material von Lager auf Monteur-Fahrzeug | 2 |
| L4 | Bestandsführung | Inventur, Korrekturen, Seriennummern | 1.5 |
| L5 | Meldebestand | Automatische Bestellvorschläge | 1.5 |
| L6 | Etiketten & Barcode | Drucken, Scannen (Hardware-Integration) | 1 |

**Ergebnis:** Echtzeit-Bestandsübersicht, effiziente Lagerprozesse

---

## 6. Buchhaltung & DATEV (12 PT)

| # | Prozess | Beschreibung | PT |
|---|---------|--------------|-----|
| B1 | Eingangsrechnung | Rechnung erfassen, prüfen, kontieren | 2 |
| B2 | Auto-Prüfung | Automatischer Abgleich mit Bestellung/Lieferschein | 2.5 |
| B3 | Ausgangsrechnung | Rechnung an Kunde erstellen | 1.5 |
| B4 | X-Rechnung | ZUGFeRD / XRechnung Format (gesetzlich erforderlich) | 2.5 |
| B5 | DATEV Export | Monatlicher Sync zum Steuerberater | 2 |
| B6 | Kostenstellen | Zuordnung pro Projekt/Abteilung | 1.5 |

**Ergebnis:** X-Rechnung Compliance, automatisierte Buchhaltung

---

## 7. Puffer & Testing (4 PT)

- Unvorhergesehene Anpassungen
- Erweiterte Testphase
- Go-Live Begleitung
- Nacharbeiten

---

## Timeline

```
Feb 2026    Mär 2026    Apr 2026    Mai 2026    Jun 2026
|-----------|-----------|-----------|-----------|-----------|
[== Setup ==]
            [=== Vertrieb & Angebote (12 PT) ===]
                        [== Einkauf & Bestellung (8 PT) ==]
                                    [=== Projektmanagement (10 PT) ===]
                                                [= CRM Basis (4 PT) =]
                                                [=== Lager & Bestand (10 PT) ===]
                                                            [=== Buchhaltung (12 PT) ===]
                                                                        [Puffer (4 PT)]
                                                                                    ✓ GO-LIVE
```

| Meilenstein | Datum |
|-------------|-------|
| Projektstart | 9. Februar 2026 |
| Go-Live Vertrieb/Einkauf | Mitte März 2026 |
| Go-Live Lager/Buchhaltung | Ende Mai 2026 |
| Go-Live Komplett | **Ende Juni 2026** |

---

## ⚠️ In diesem Angebot NICHT enthalten

Die folgenden Bereiche sind im Kernumfang nicht enthalten und können als **Phase 2** separat beauftragt werden:

### Monteur-App & Service (8 PT) - Phase 2

| # | Prozess | Beschreibung |
|---|---------|--------------|
| M1 | Terminplanung | Einsatzplanung, Kalender, Urlaubsverwaltung |
| M2 | Zeiterfassung | Arbeitszeit auf Projekt buchen |
| M3 | Material-Entnahme | Material aus Lager/Fahrzeug entnehmen & buchen |
| M4 | Montage-Dokumentation | Dokumentation inkl. Fotos |
| M5 | Digitale Unterschrift | Kunde unterschreibt auf Tablet |
| M6 | Wartungsverträge | Zyklen, Erinnerungen, Verknüpfung |
| M7 | Mängeldokumentation | Mängel erfassen bei Wartung |

**Workaround ohne Monteur-App:**
- Zeiterfassung über Odoo Web-Oberfläche (nicht mobile-optimiert)
- Material-Dokumentation wie bisher (Zettel/Excel)

---

### Schnittstellen & Custom (12 PT) - Phase 2

| # | Prozess | Beschreibung |
|---|---------|--------------|
| S1 | S-Firm Schnittstelle | Überweisungen automatisch an Banking übertragen |
| S2 | GAEB Import | Ausschreibungen importieren → Angebot erstellen |
| S3 | GAEB Mapping | Produkte zu GAEB-Positionen zuordnen (N:1) |

**Workaround ohne Schnittstellen:**
- S-Firm: Überweisungen manuell in Banking-Software erstellen (wie bisher)
- GAEB: Ausschreibungen manuell in Odoo erfassen (Excel-Import möglich)

---

### Erweiterte CRM-Funktionen (4 PT) - Phase 2

| # | Prozess | Beschreibung |
|---|---------|--------------|
| C3 | Wiedervorlage | Termine, Follow-ups, Erinnerungen |
| C4 | Kundenanalyse | Umsatz, Deckungsbeitrag, ABC-Klassifizierung |

**Workaround:** Grundlegende Kundenhistorie ist enthalten, erweiterte Analysen über Standard-Reports

---

### Zusammenfassung Phase 2

| Bereich | Aufwand | Kann separat beauftragt werden |
|---------|---------|--------------------------------|
| Monteur-App & Service | 8 PT | Ja |
| Schnittstellen (S-Firm, GAEB) | 12 PT | Ja |
| CRM Erweiterungen | 4 PT | Ja |
| **Gesamt Phase 2** | **24 PT** | |

---

## Voraussetzungen (Kunde)

- Benennung Key User pro Bereich
- Zugang zu Altsystemen für Datenmigration
- Verfügbarkeit für Workshops & Tests
- Bereitstellung Testdaten
- Entscheidungsbefugnis Ansprechpartner

---

## Nicht im Angebot enthalten

- Hardware (Scanner, Tablets, Etikettendrucker)
- Odoo Hosting & Betrieb (separates Angebot)
- Support nach Go-Live (separates Angebot, Stundenbasis)
- Odoo Enterprise Lizenzen (Community Edition wird verwendet)
- Reisekosten (falls anfallend, nach Aufwand)
- Change Requests nach Abnahme
- **Phase 2 Bereiche** (siehe oben)

---

*C-led Solutions GmbH | Februar 2026*
