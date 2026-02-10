# Becker Sicherheitstechnik - Odoo ERP
## Prozess-Workshop Planung & Priorisierung

**Datum:** 02.02.2026  
**Projekt:** ERP-Einführung Odoo  
**Zweck:** Gesprächsgrundlage zur Workshop-Priorisierung mit Uwe Becker

---

## 📋 Übersicht: 35 Prozesse in 7 Bereichen

| Bereich | Anzahl Prozesse | Workshop-Zeit | Priorität |
|---------|-----------------|---------------|-----------|
| 1. Lager & Logistik | 6 | 4.5h | ⬜ |
| 2. Einkauf & Beschaffung | 5 | 4h | ⬜ |
| 3. Vertrieb & Auftragsabwicklung | 5 | 4h | ⬜ |
| 4. Projekte & Nachkalkulation | 5 | 4.5h | ⬜ |
| 5. Monteure & Service | 7 | 6.5h | ⬜ |
| 6. Buchhaltung & Finanzen | 6 | 4.5h | ⬜ |
| 7. Schnittstellen & Custom | 3 | 3.5h | ⬜ |
| **GESAMT** | **37** | **~31h** | |

**Empfehlung:** 7-8 Workshop-Halbtage à 4h

---

## 🏭 1. LAGER & LOGISTIK

| # | Prozess | Beschreibung | Komplexität | Zeit | Prio |
|---|---------|--------------|-------------|------|------|
| L1 | **Wareneingang** | Ware annehmen, prüfen, einbuchen | Mittel | 1h | ⬜ |
| L2 | **Warenausgang / Picking** | Kommissionierung für Aufträge | Mittel | 1h | ⬜ |
| L3 | **Umlagerung Monteur** | Material von Lager auf Monteur-Fahrzeug | Hoch | 1h | ⬜ |
| L4 | **Bestandsführung** | Inventur, Korrekturen, Seriennummern | Mittel | 0.5h | ⬜ |
| L5 | **Meldebestand** | Automatische Bestellvorschläge | Niedrig | 0.5h | ⬜ |
| L6 | **Etiketten & Barcode** | Drucken, Scannen, Hardware | Niedrig | 0.5h | ⬜ |

**Key User für diesen Bereich:** _________________________

**Pain Points aktuell:**
- ⬜ _________________________________________________
- ⬜ _________________________________________________

**Priorität Bereich (1-7):** ⬜

---

## 🛒 2. EINKAUF & BESCHAFFUNG

| # | Prozess | Beschreibung | Komplexität | Zeit | Prio |
|---|---------|--------------|-------------|------|------|
| E1 | **Bestellung anlegen** | Bestellung beim Lieferanten | Niedrig | 0.5h | ⬜ |
| E2 | **RFQ-Prozess** | Anfrage → Angebote vergleichen → Bestellung | Mittel | 1h | ⬜ |
| E3 | **Wareneingang-Abgleich** | Lieferschein mit Bestellung prüfen | Mittel | 0.5h | ⬜ |
| E4 | **3-Wege-Prüfung** | Bestellung ↔ Lieferschein ↔ Rechnung | **Hoch** | 1.5h | ⬜ |
| E5 | **Lieferantenverwaltung** | Konditionen, Bewertung, Hinweise | Niedrig | 0.5h | ⬜ |

**Key User für diesen Bereich:** _________________________

**Pain Points aktuell:**
- ⬜ "Wann kommt mein Zeug?" - Keine Übersicht offene Bestellungen
- ⬜ _________________________________________________

**Priorität Bereich (1-7):** ⬜

---

## 💰 3. VERTRIEB & AUFTRAGSABWICKLUNG

| # | Prozess | Beschreibung | Komplexität | Zeit | Prio |
|---|---------|--------------|-------------|------|------|
| V1 | **Angebotserstellung** | Angebot schreiben, Vorlagen, Rabatte | Mittel | 1h | ⬜ |
| V2 | **Auftragsbestätigung** | AB erstellen, Verknüpfung Einkauf | Niedrig | 0.5h | ⬜ |
| V3 | **Kundenpreise** | Kundenspezifische Preisregeln | Mittel | 1h | ⬜ |
| V4 | **Auftragsfortschritt** | Status, Liefertermine, Kundenkommunikation | Mittel | 0.5h | ⬜ |
| V5 | **POS / Thekenkauf** | Direktverkauf vor Ort | Mittel | 1h | ⬜ |

**Key User für diesen Bereich:** _________________________

**Pain Points aktuell:**
- ⬜ Kundenhistorie fehlt (was wurde angeboten, geliefert, zu welchem Preis?)
- ⬜ _________________________________________________

**Priorität Bereich (1-7):** ⬜

---

## 📊 4. PROJEKTE & NACHKALKULATION

| # | Prozess | Beschreibung | Komplexität | Zeit | Prio |
|---|---------|--------------|-------------|------|------|
| P1 | **Projektanlage** | Projekt erstellen, Struktur, Nummern | Mittel | 1h | ⬜ |
| P2 | **Kosten erfassen** | Material, Arbeitszeit, Fremdleistung | **Hoch** | 1.5h | ⬜ |
| P3 | **Weiterberechnung** | Kosten an Kunde weiterberechnen | **Hoch** | 1h | ⬜ |
| P4 | **Profitabilität** | Auswertung je Projekt, Reports | Mittel | 0.5h | ⬜ |
| P5 | **Dokumentenablage** | Dateien, Fotos, Notizen pro Projekt | Niedrig | 0.5h | ⬜ |

**Key User für diesen Bereich:** _________________________

**Pain Points aktuell:**
- ⬜ ⚠️ **UMSATZVERLUST** durch fehlende Weiterberechnung!
- ⬜ Profitabilität pro Projekt unklar
- ⬜ Aktuell: Projekt = Ordner im Dateisystem

**Priorität Bereich (1-7):** ⬜

---

## 🔧 5. MONTEURE & SERVICE

| # | Prozess | Beschreibung | Komplexität | Zeit | Prio |
|---|---------|--------------|-------------|------|------|
| M1 | **Terminplanung** | Einsatzplanung, Kalender, Urlaub | **Hoch** | 1.5h | ⬜ |
| M2 | **Zeiterfassung** | Arbeitszeit auf Projekt buchen | Mittel | 1h | ⬜ |
| M3 | **Material-Entnahme** | Material aus Lager/Auto entnehmen | **Hoch** | 1h | ⬜ |
| M4 | **Montage-Doku** | Dokumentation inkl. Fotos | Mittel | 1h | ⬜ |
| M5 | **Digitale Unterschrift** | Kunde unterschreibt auf Tablet | Niedrig | 0.5h | ⬜ |
| M6 | **Wartungsverträge** | Zyklen, Erinnerungen, Verknüpfung | Mittel | 1h | ⬜ |
| M7 | **Mängeldoku** | Mängel erfassen bei Wartung | Mittel | 0.5h | ⬜ |

**Key User für diesen Bereich:** _________________________

**Pain Points aktuell:**
- ⬜ Abrechnung Monteure unklar - Material fehlt
- ⬜ Aktuell: Zettel-Wirtschaft!
- ⬜ Keine Verknüpfung Termin → Auftrag → Personal

**Priorität Bereich (1-7):** ⬜

---

## 🧾 6. BUCHHALTUNG & FINANZEN

| # | Prozess | Beschreibung | Komplexität | Zeit | Prio |
|---|---------|--------------|-------------|------|------|
| B1 | **Eingangsrechnung** | Rechnung erfassen, prüfen | Mittel | 1h | ⬜ |
| B2 | **Auto-Prüfung** | Automatisierter Abgleich mit Bestellung | **Hoch** | 1h | ⬜ |
| B3 | **Ausgangsrechnung** | Rechnung an Kunde erstellen | Niedrig | 0.5h | ⬜ |
| B4 | **X-Rechnung** | ZUGFeRD / XRechnung Format | Mittel | 1h | ⬜ |
| B5 | **DATEV Export** | Monatlicher Sync zum Steuerberater | Mittel | 0.5h | ⬜ |
| B6 | **Kostenstellen** | Zuordnung pro Projekt/Abteilung | Mittel | 0.5h | ⬜ |

**Key User für diesen Bereich:** _________________________

**Pain Points aktuell:**
- ⬜ ⚠️ **X-Rechnung ist gesetzlich erforderlich!**
- ⬜ Pflichtfelder bei Rechnungseingang fehlen (wer gebucht, wer freigegeben)
- ⬜ _________________________________________________

**Priorität Bereich (1-7):** ⬜

---

## 🔗 7. SCHNITTSTELLEN & CUSTOM

| # | Prozess | Beschreibung | Komplexität | Zeit | Prio |
|---|---------|--------------|-------------|------|------|
| S1 | **S-Firm** | Überweisungen an Bank übertragen | Mittel | 1h | ⬜ |
| S2 | **GAEB Import** | Ausschreibung importieren → Angebot | **Hoch** | 1.5h | ⬜ |
| S3 | **GAEB Mapping** | Produkte zu GAEB-Positionen (N:1) | **Hoch** | 1h | ⬜ |

**Key User für diesen Bereich:** _________________________

**Pain Points aktuell:**
- ⬜ _________________________________________________

**Priorität Bereich (1-7):** ⬜

---

## 🎯 PRIORISIERUNGS-MATRIX

### Nach Dringlichkeit

| Priorität | Bereich | Begründung |
|-----------|---------|------------|
| 1 | __________ | _________________________________ |
| 2 | __________ | _________________________________ |
| 3 | __________ | _________________________________ |
| 4 | __________ | _________________________________ |
| 5 | __________ | _________________________________ |
| 6 | __________ | _________________________________ |
| 7 | __________ | _________________________________ |

### Empfehlung basierend auf Pain Points:

**🔴 KRITISCH (zuerst):**
- **Projekte & Nachkalkulation** → Umsatzverlust vermeiden!
- **Buchhaltung** → X-Rechnung gesetzlich!

**🟡 HOCH:**
- **Monteure & Service** → Zettelwirtschaft beenden
- **Einkauf** → 3-Wege-Prüfung automatisieren

**🟢 MITTEL:**
- **Lager & Logistik**
- **Vertrieb**
- **Schnittstellen**

---

## 📅 WORKSHOP-KALENDER

| KW | Datum | Bereich | Dauer | Key User |
|----|-------|---------|-------|----------|
| __ | __.__.2026 | _________________ | __h | _________ |
| __ | __.__.2026 | _________________ | __h | _________ |
| __ | __.__.2026 | _________________ | __h | _________ |
| __ | __.__.2026 | _________________ | __h | _________ |
| __ | __.__.2026 | _________________ | __h | _________ |
| __ | __.__.2026 | _________________ | __h | _________ |
| __ | __.__.2026 | _________________ | __h | _________ |

---

## ✅ NÄCHSTE SCHRITTE

1. ⬜ Bereiche priorisieren (1-7)
2. ⬜ Key User pro Bereich benennen
3. ⬜ Workshop-Termine festlegen
4. ⬜ Raum & Equipment organisieren
5. ⬜ Einladungen versenden

---

**Erstellt:** Heimdall | **Für:** Erik Reisig  
**Projekt:** Becker Sicherheitstechnik Odoo ERP
