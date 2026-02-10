# Becker Sicherheitstechnik
## Leitfaden: Ablösung Warenwirtschaftssystem → Odoo

**Ziel:** Strukturierte Informationssammlung für erfolgreiche Migration  
**Datum:** 02.02.2026

---

# PHASE 1: IST-ANALYSE (Woche 1-2)
## "Was haben wir?"

---

### 1.1 DAS ALTE SYSTEM

| Frage | Antwort |
|-------|---------|
| **Name des Systems?** | |
| **Hersteller / Version?** | |
| **Seit wann im Einsatz?** | |
| **Wer betreut es technisch?** | |
| **Läuft Support noch?** | |
| **Wartungskosten/Jahr?** | |

**Warum wird gewechselt?**
- [ ] System veraltet / kein Support mehr
- [ ] Funktionen fehlen
- [ ] Zu teuer
- [ ] Nicht mehr zeitgemäß
- [ ] Sonstiges: _________________

---

### 1.2 WELCHE DATEN SIND DRIN?

| Datenbereich | Anzahl ca. | Qualität (1-5) | Muss mit? |
|--------------|------------|----------------|-----------|
| **Kunden** | ___ Stück | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Lieferanten** | ___ Stück | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Artikel** | ___ Stück | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Lagerbestände** | ___ Positionen | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Offene Angebote** | ___ Stück | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Offene Aufträge** | ___ Stück | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Offene Bestellungen** | ___ Stück | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Rechnungshistorie** | ___ Jahre | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Preislisten** | ___ Stück | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |
| **Kundenpreise** | ___ Stück | ⬜⬜⬜⬜⬜ | ☐ Ja ☐ Nein |

**Kann das System Daten exportieren?**
- [ ] CSV/Excel Export
- [ ] Datenbankzugriff (SQL)
- [ ] API
- [ ] Nur manuell / Screenshots
- [ ] Unbekannt

---

### 1.3 WER ARBEITET DAMIT?

| Bereich | Anzahl User | Hauptprozesse |
|---------|-------------|---------------|
| **Büro / Verwaltung** | ___ | |
| **Einkauf** | ___ | |
| **Vertrieb** | ___ | |
| **Lager** | ___ | |
| **Buchhaltung** | ___ | |
| **Geschäftsführung** | ___ | |
| **Monteure** | ___ | |
| **GESAMT** | ___ | |

---

# PHASE 2: KRITISCHE PROZESSE (Woche 2-3)
## "Was muss vom Tag 1 laufen?"

---

### 2.1 TAGESGESCHÄFT - OHNE DAS GEHT NICHTS

**Bitte priorisieren (1 = kritischste):**

| Prio | Prozess | Wie oft/Tag? | Geht auch mit Excel? |
|------|---------|--------------|----------------------|
| ⬜ | Angebot schreiben | ___x | ☐ Ja ☐ Nein |
| ⬜ | Auftrag anlegen | ___x | ☐ Ja ☐ Nein |
| ⬜ | Rechnung schreiben | ___x | ☐ Ja ☐ Nein |
| ⬜ | Bestellung an Lieferant | ___x | ☐ Ja ☐ Nein |
| ⬜ | Wareneingang buchen | ___x | ☐ Ja ☐ Nein |
| ⬜ | Warenausgang buchen | ___x | ☐ Ja ☐ Nein |
| ⬜ | Lagerbestand prüfen | ___x | ☐ Ja ☐ Nein |
| ⬜ | Kundendaten nachschlagen | ___x | ☐ Ja ☐ Nein |
| ⬜ | Artikelpreis nachschlagen | ___x | ☐ Ja ☐ Nein |
| ⬜ | Lieferstatus prüfen | ___x | ☐ Ja ☐ Nein |

---

### 2.2 MONATLICH / PERIODISCH

| Prozess | Wann? | Kritisch? |
|---------|-------|-----------|
| DATEV Export | ☐ Monatlich ☐ Quartalsweise | ☐ Ja ☐ Nein |
| Inventur | ☐ Jährlich ☐ Laufend | ☐ Ja ☐ Nein |
| Auswertungen/Reports | _________________ | ☐ Ja ☐ Nein |
| _________________ | _________________ | ☐ Ja ☐ Nein |

---

### 2.3 PARALLELBETRIEB ODER HARTER SCHNITT?

**Option A: Parallelbetrieb**
- Beide Systeme laufen 2-4 Wochen parallel
- Doppelte Arbeit, aber sicherer
- Rückfall-Option

**Option B: Harter Cut-Over**
- Stichtag: Altes System aus, neues an
- Schneller, aber riskanter
- Kein Zurück

**Bevorzugt:** ☐ Parallelbetrieb ☐ Harter Schnitt ☐ Noch unklar

**Idealer Go-Live Zeitpunkt:**
- [ ] Monatsanfang (wegen Buchhaltung)
- [ ] Nach Inventur
- [ ] Ruhige Geschäftsphase: _____________
- [ ] Fester Termin: _____________

---

# PHASE 3: MVP DEFINITION (Woche 3-4)
## "Was ist das Minimum für Go-Live?"

---

### 3.1 MUSS VS. KANN SPÄTER

| Funktion | MUSS (Go-Live) | KANN (Phase 2) |
|----------|----------------|----------------|
| **STAMMDATEN** | | |
| Kundenverwaltung | ☐ | ☐ |
| Lieferantenverwaltung | ☐ | ☐ |
| Artikelstamm | ☐ | ☐ |
| Preislisten | ☐ | ☐ |
| Kundenspezifische Preise | ☐ | ☐ |
| **VERKAUF** | | |
| Angebote erstellen | ☐ | ☐ |
| Aufträge erfassen | ☐ | ☐ |
| Lieferscheine | ☐ | ☐ |
| Rechnungen | ☐ | ☐ |
| X-Rechnung | ☐ | ☐ |
| **EINKAUF** | | |
| Bestellungen | ☐ | ☐ |
| Wareneingang | ☐ | ☐ |
| Eingangsrechnungen | ☐ | ☐ |
| 3-Wege-Prüfung | ☐ | ☐ |
| **LAGER** | | |
| Bestandsführung | ☐ | ☐ |
| Mehrere Lagerorte | ☐ | ☐ |
| Umlagerungen | ☐ | ☐ |
| Scanner/Barcode | ☐ | ☐ |
| **BUCHHALTUNG** | | |
| DATEV Export | ☐ | ☐ |
| Offene Posten | ☐ | ☐ |
| **PROJEKT** | | |
| Projektanlage | ☐ | ☐ |
| Kostenerfassung | ☐ | ☐ |
| Nachkalkulation | ☐ | ☐ |
| **MONTEURE** | | |
| Terminplanung | ☐ | ☐ |
| Zeiterfassung | ☐ | ☐ |
| Mobile App | ☐ | ☐ |
| **SCHNITTSTELLEN** | | |
| S-Firm | ☐ | ☐ |
| GAEB Import | ☐ | ☐ |

---

### 3.2 MVP ZUSAMMENFASSUNG

**Go-Live MVP enthält:**
1. _________________________________
2. _________________________________
3. _________________________________
4. _________________________________
5. _________________________________

**Phase 2 (nach Go-Live):**
1. _________________________________
2. _________________________________
3. _________________________________

---

# PHASE 4: MIGRATION PLANUNG (Woche 4-5)
## "Wie kommen die Daten rüber?"

---

### 4.1 MIGRATIONS-REIHENFOLGE

| Schritt | Was | Abhängig von | Wer liefert Daten? |
|---------|-----|--------------|-------------------|
| 1 | Artikelstamm | - | |
| 2 | Kunden | - | |
| 3 | Lieferanten | - | |
| 4 | Preislisten | Artikel | |
| 5 | Lagerbestände | Artikel | |
| 6 | Offene Aufträge | Kunden, Artikel | |
| 7 | Offene Bestellungen | Lieferanten, Artikel | |

---

### 4.2 DATENBEREINIGUNG

**Vor Migration klären:**

| Thema | Frage | Entscheidung |
|-------|-------|--------------|
| **Altdaten** | Wie viele Jahre Historie mitnehmen? | ___ Jahre |
| **Duplikate** | Gibt es doppelte Kunden/Artikel? | ☐ Ja, bereinigen ☐ Nein |
| **Inaktive** | Inaktive Artikel/Kunden mitnehmen? | ☐ Ja ☐ Nein |
| **Nummernkreise** | Alte Nummern behalten? | ☐ Ja ☐ Neu starten |

---

# PHASE 5: RESSOURCEN & TIMELINE (Woche 5-6)
## "Wer macht was bis wann?"

---

### 5.1 TEAM BECKER

| Rolle | Name | Verfügbar h/Woche |
|-------|------|-------------------|
| **Projektleiter (Uwe?)** | | ___h |
| **Key User Vertrieb** | | ___h |
| **Key User Einkauf** | | ___h |
| **Key User Lager** | | ___h |
| **Key User Buchhaltung** | | ___h |
| **IT Ansprechpartner** | | ___h |

---

### 5.2 ZEITRAHMEN

| Frage | Antwort |
|-------|---------|
| **Wunsch Go-Live Datum?** | |
| **Harte Deadline?** | ☐ Ja: _________ ☐ Nein |
| **Urlaubszeiten zu beachten?** | |
| **Geschäftlich ruhige Phase?** | |

---

### 5.3 GROBE TIMELINE

| Phase | Wochen | Von - Bis |
|-------|--------|-----------|
| IST-Analyse & Discovery | 2-3 | |
| MVP Definition & Konzept | 2 | |
| Setup & Konfiguration | 3-4 | |
| Datenmigration Test | 2 | |
| User Training | 2 | |
| Pilotbetrieb | 2-4 | |
| Go-Live | 1 | |
| Hypercare | 2-4 | |
| **GESAMT** | **16-22** | |

---

# CHECKLISTE: GESPRÄCHSVORBEREITUNG

## Vor dem Termin mit Uwe klären:

### Must-Have Infos:
- [ ] Name + Version Altsystem
- [ ] Anzahl User
- [ ] Wichtigste 5 Prozesse
- [ ] Wunsch Go-Live Datum
- [ ] Budget-Rahmen (falls bekannt)

### Nice-to-Have:
- [ ] Export-Möglichkeiten Altsystem
- [ ] Datenmengen (Artikel, Kunden, etc.)
- [ ] Bekannte Pain Points
- [ ] Vorherige ERP-Erfahrung im Team

### Mitbringen zum Termin:
- [ ] Diesen Leitfaden (ausgedruckt)
- [ ] Aufwandsschätzung
- [ ] Laptop für Demo (falls gewünscht)

---

# NOTIZEN

_Platz für Gesprächsnotizen:_

---
---
---
---
---

**Erstellt:** Heimdall | **Projekt:** Becker Sicherheitstechnik  
**Version:** 1.0 | **Datum:** 02.02.2026
