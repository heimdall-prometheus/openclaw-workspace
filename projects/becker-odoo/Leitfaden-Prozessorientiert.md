# Becker Sicherheitstechnik
## Leitfaden: Prozessorientierte Odoo-Einführung

**Ansatz:** Prozess für Prozess zum Ziel  
**Datum:** 02.02.2026

---

# DAS VORGEHEN

```
┌─────────────────────────────────────────────────────────────┐
│  PRO PROZESS:                                               │
│                                                             │
│  1️⃣  IST-Analyse      → Wie läuft es heute?                │
│  2️⃣  Prozessoptimierung → Wie sollte es eigentlich sein?   │
│  3️⃣  SOLL in Odoo     → Neuen Prozess umsetzen             │
│                                                             │
│  ═══════════════════════════════════════════════════════    │
│                                                             │
│  WENN ALLE PROZESSE FERTIG:                                 │
│  4️⃣  Datenmigration   → Daten rüber holen                  │
│  5️⃣  Altsystem ablösen → Warenwirtschaft abschalten        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# PHASE 0: DATEN-EXPORT (SOFORT)
## "Womit haben wir es zu tun?"

### Export aus Warenwirtschaft

**Ziel:** Früh verstehen, welche Daten existieren und wie sie strukturiert sind.

| Export | Format | Priorität |
|--------|--------|-----------|
| Artikelstamm | CSV/Excel | ⭐⭐⭐ |
| Kundenstamm | CSV/Excel | ⭐⭐⭐ |
| Lieferanten | CSV/Excel | ⭐⭐ |
| Preislisten | CSV/Excel | ⭐⭐ |
| Lagerbestände | CSV/Excel | ⭐⭐ |

**Fragen für Uwe:**
- [ ] Kann das System Daten exportieren?
- [ ] Welche Formate? (CSV, Excel, SQL, API?)
- [ ] Wer hat Zugriff auf die Exports?
- [ ] Gibt es Dokumentation zur Datenstruktur?

---

# PHASE 1: PROZESSE IDENTIFIZIEREN
## "Was machen wir eigentlich alles?"

### Prozess-Inventar erstellen

| Nr | Prozess | Häufigkeit | Kritisch? | Status |
|----|---------|------------|-----------|--------|
| 1 | | | ☐ | ⬜ Offen |
| 2 | | | ☐ | ⬜ Offen |
| 3 | | | ☐ | ⬜ Offen |
| 4 | | | ☐ | ⬜ Offen |
| 5 | | | ☐ | ⬜ Offen |
| 6 | | | ☐ | ⬜ Offen |
| 7 | | | ☐ | ⬜ Offen |
| 8 | | | ☐ | ⬜ Offen |
| 9 | | | ☐ | ⬜ Offen |
| 10 | | | ☐ | ⬜ Offen |

**Status-Legende:**
- ⬜ Offen
- 🔵 IST-Analyse läuft
- 🟡 Prozessoptimierung
- 🟢 SOLL in Odoo umgesetzt
- ✅ Abgeschlossen

---

# PHASE 2: PROZESS-DURCHLAUF (PRO PROZESS)

---

## VORLAGE: Prozess-Dokumentation

### Prozess: _________________________________

---

### SCHRITT 1: IST-ANALYSE
**"Wie läuft es heute?"**

**Prozessbeschreibung:**
```
Wer?     → 
Was?     → 
Wann?    → 
Wie oft? → 
Womit?   → (System, Excel, Papier?)
```

**Ablauf (Schritte):**
1. _________________________________
2. _________________________________
3. _________________________________
4. _________________________________
5. _________________________________

**Beteiligte Personen:**
| Rolle | Name | Aufgabe im Prozess |
|-------|------|-------------------|
| | | |
| | | |

**Verwendete Systeme/Tools:**
- [ ] Warenwirtschaft
- [ ] Excel
- [ ] Papier
- [ ] Email
- [ ] Sonstiges: ___________

**Pain Points (Probleme heute):**
1. _________________________________
2. _________________________________
3. _________________________________

**Schnittstellen zu anderen Prozessen:**
- Vorgelagerter Prozess: ___________
- Nachgelagerter Prozess: ___________

---

### SCHRITT 2: PROZESSOPTIMIERUNG
**"Wie sollte es eigentlich sein?"**

**Optimierungspotenziale:**
| Problem (IST) | Lösung (SOLL) | Nutzen |
|---------------|---------------|--------|
| | | |
| | | |
| | | |

**Neuer optimierter Ablauf:**
1. _________________________________
2. _________________________________
3. _________________________________
4. _________________________________
5. _________________________________

**Automatisierungspotenzial:**
- [ ] Vollständig manuell bleiben
- [ ] Teilweise automatisierbar
- [ ] Vollständig automatisierbar

**Beschreibung Automatisierung:**
_________________________________

---

### SCHRITT 3: SOLL IN ODOO
**"Umsetzung im neuen System"**

**Odoo Module benötigt:**
- [ ] Verkauf (Sales)
- [ ] Einkauf (Purchase)
- [ ] Lager (Inventory)
- [ ] Buchhaltung (Accounting)
- [ ] Projekt
- [ ] Fertigung (Manufacturing)
- [ ] Sonstiges: ___________

**Konfiguration erforderlich:**
| Einstellung | Wert |
|-------------|------|
| | |
| | |

**Anpassungen/Customizing:**
- [ ] Standard-Odoo reicht
- [ ] Felder hinzufügen
- [ ] Workflow anpassen
- [ ] Eigene Entwicklung nötig

**Beschreibung Anpassungen:**
_________________________________

**Test-Szenario:**
1. _________________________________
2. _________________________________
3. _________________________________

**Abnahme durch:** _______________ **Datum:** ___________

---

### SCHRITT 4: FREIGABE

| Prüfpunkt | OK? |
|-----------|-----|
| IST-Analyse vollständig | ☐ |
| Prozessoptimierung definiert | ☐ |
| SOLL in Odoo umgesetzt | ☐ |
| Test erfolgreich | ☐ |
| Schulung durchgeführt | ☐ |
| Key User abgenommen | ☐ |

**Prozess Status:** ⬜ Offen → ✅ Abgeschlossen

---

# PHASE 3: MIGRATION (NACH ALLEN PROZESSEN)

## Erst wenn alle Prozesse ✅ sind:

### 3.1 Datenmigration planen

| Daten | Quelle | Ziel in Odoo | Verantwortlich |
|-------|--------|--------------|----------------|
| Artikel | Export WaWi | Produkte | |
| Kunden | Export WaWi | Kontakte | |
| Lieferanten | Export WaWi | Kontakte | |
| Lagerbestand | Export WaWi | Inventur | |
| Offene Aufträge | Export WaWi | Verkaufsaufträge | |
| Offene Bestellungen | Export WaWi | Bestellungen | |

### 3.2 Migration durchführen

| Schritt | Beschreibung | Status |
|---------|--------------|--------|
| 1 | Daten exportieren | ⬜ |
| 2 | Daten bereinigen | ⬜ |
| 3 | Testmigration | ⬜ |
| 4 | Prüfung | ⬜ |
| 5 | Finale Migration | ⬜ |

### 3.3 Altsystem ablösen

| Prüfpunkt | Datum | OK? |
|-----------|-------|-----|
| Alle Prozesse in Odoo funktionieren | | ☐ |
| Alle Daten migriert | | ☐ |
| Alle User geschult | | ☐ |
| Parallelbetrieb erfolgreich (optional) | | ☐ |
| **GO für Abschaltung** | | ☐ |

---

# PROZESS-REIHENFOLGE

## Empfohlene Reihenfolge (mit Uwe besprechen):

| Prio | Prozess | Begründung |
|------|---------|------------|
| 1 | **Stammdaten** | Basis für alles andere |
| 2 | **Angebot → Auftrag** | Kerngeschäft |
| 3 | **Einkauf & Bestellung** | Material beschaffen |
| 4 | **Wareneingang** | Lager befüllen |
| 5 | **Lager & Bestand** | Übersicht behalten |
| 6 | **Rechnung** | Geld verdienen |
| 7 | **Projekt/Montage** | Aufträge abwickeln |
| 8 | **DATEV Export** | Buchhaltung |
| 9 | **Reports** | Auswertungen |

---

# WORKSHOP-AGENDA (Vorschlag)

## Termin 1: Kickoff & Daten-Review
- [ ] Projekt-Ansatz erklären
- [ ] Daten-Export besprechen
- [ ] Erste Exports ansehen
- [ ] Prozess-Inventar starten

## Termin 2-X: Pro Prozess
- [ ] IST-Analyse (30 min)
- [ ] Prozessoptimierung (30 min)
- [ ] SOLL definieren (30 min)
- [ ] Umsetzung planen

## Finaler Termin: Migration
- [ ] Alle Prozesse ✅?
- [ ] Migrationsplan
- [ ] Go-Live Datum

---

# CHECKLISTE VOR TERMIN MIT UWE

**Must-Have:**
- [ ] Name des Warenwirtschaftssystems
- [ ] Export-Möglichkeiten klären
- [ ] 3-5 wichtigste Prozesse identifizieren
- [ ] Wer sind die Key User?

**Nice-to-Have:**
- [ ] Ersten Daten-Export mitbringen
- [ ] Bekannte Pain Points
- [ ] Zeitrahmen-Vorstellung

---

# NOTIZEN

_Platz für Gesprächsnotizen:_




---
---
---

**Erstellt:** Heimdall | **Projekt:** Becker Sicherheitstechnik  
**Version:** 1.0 | **Datum:** 02.02.2026  
**Ansatz:** Prozessorientierte Einführung
