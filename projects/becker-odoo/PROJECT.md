# Becker Sicherheitstechnik - Odoo ERP Implementation

**Start:** 02.02.2026  
**Partner:** Uwe Becker (30 Jahre Bekanntschaft mit Erik)  
**Status:** Planung & Discovery Phase  

---

## 📊 Projekt-Übersicht

### Unternehmen
- **Name:** Becker Sicherheitstechnik GmbH
- **Branche:** Sicherheitstechnik (Schließanlagen, Briefkästen, Tresore)
- **Standorte:** 3 Standorte mit verschiedenen Nummernkreisen
- **Geschäftsfelder:**
  - Handel (B2C + B2B)
  - Montage & Service
  - Wartungsverträge

### Verbindung
- **Erik:** 22,5% Anteil an mein-schluessel.de (gemeinsam mit Uwe)
- **Uwe Becker:** 77,5% Anteil, Geschäftsführer Becker Sicherheitstechnik GmbH
- **Beziehung:** ~30 Jahre Geschäftsbekanntschaft

---

## 🎯 Projekt-Ziele

### Strategische Ziele
- **Reaktionszeiten reduzieren** → Vorlagen und Automatisierung
- **Nachvollziehbarkeit erhöhen** → Projektmodul mit voller Historie
- **X-Rechnung Support** (zeitlicher Treiber → Januar)
- **Transparenz** → Überblick über offene Bestellungen, Projektkosten

### Pain Points (Aktuell)
1. **Nachvollziehbarkeit**
   - Keine Historie je Kunde
   - Berechnung pro Projekt unklar
   - Weiterberechnung von Bestellungen je Projekt → EVTL UMSATZVERLUST!
   - Arbeitszeit nicht erfasst
   - Projekt = Ordner (aktuell)
   - Profitabilität pro Projekt?

2. **Überblick Bestellungen**
   - "Wann kommt mein Zeug?" für Kunde unklar
   - Kein Link: Auftragsbestätigung Kunde ↔ Auftragsbestätigung Lieferant
   - Offene Bestellungen pro Kunde nicht sichtbar
   - Verfügbarkeit für Lieferbarkeit Auftrag unklar

3. **3-Wege-Prüfung** nicht automatisiert

4. **Abrechnung Monteure**
   - Material unklar
   - Zeiterfassung fehlt
   - Aktuell: Zettel!
   - Umlagerung Lager → Monteur nicht automatisiert
   - Bestand reservieren fehlt

5. **PROZESS für Material Entnahme/Ausgang** fehlt

---

## 📋 Anforderungen

### Out of the box / Konfiguration / Evtl Custom View
- ✅ Mehrere Lagerorte, Lagerplätze, Regalverwaltung
- ✅ 3 Standorte mit verschiedenen Nummernkreisen
- ✅ Bilder hinterlegen
- ✅ Projektdoku + CRM
- ✅ Pro Position je Eingangsrechnung/Bestellung → Kostenstelle/Projekt erfassen
- ✅ Offene Bestellungen anzeigen pro Produkt (auch bei Bestellposition)
- ⚙️ Pflichtfeld-Regel-Set für Eingangsrechnungen (wer bucht, Projektnummer, Handel)
- ✅ Barcodes auf alle Belege
- ✅ Rechnung digital empfangen
- ⚙️ Verknüpfung Auftragsbestätigung und Einkauf
- ✅ Lagerhaltung
- ✅ Wareneingang
- ✅ POS Modul
- ⚙️ Kundenspezifische Historie (Angebote, Artikel, Preise)

### Community Module - evtl erweitern
- 🔧 Wartungsverträge verwalten (mit Verknüpfung)
- 🔧 Arbeitszeiterfassung inkl. Arbeitszeitmodelle
- 🔧 X-Rechnungen Support
- 🔧 Regelbasierte Preisänderungen (VK + EK)
- 🔧 Monteurplanung + Montage-Doku (Details klären!)
- 🔧 Eingangsrechnungsprüfung automatisieren (OCR via KI API, nicht Community)
- 🔧 Monatlicher DATEV Sync
- 🔧 Automatische Artikel-Anlage aus Lieferschein/Eingangsrechnungen

### Custom Module
- 🛠️ **Schnittstelle zu S-Firm** → Überweisungen
- 🛠️ **GAEB Import**
  - Ausschreibungen Import aus Datei
  - Angebot erstellen
  - Mapping Produkte → GAEB Position (N:1)
    - Für Statistik
    - Für Abrechnung

---

## 🔧 Weitere Anforderungen

### Prozesse
- Meldebestand → Bestellvorschlag
- SSO evtl mit Medium
- Auftrag kopieren → KEINE deep copy! (MA, Datum, Preise aktualisieren)
- Kundenspezifische/Gruppenspezifische Preisregeln
- Lieferantenspezifische Hinweise
- Lieferanten-Angebote → CRM → RFQ Prozess + Wiedervorlage
- Terminplanung Monteure (Arbeitszeitmodell, Urlaub, Verknüpfung zu Aufträgen)
- Mängeldokumentation Wartungsverträge (inkl. Foto)
- Angebotsvorlagen
- Rechtemanagement → Rollenkonzept
- Duplikatsprüfung bei Anlage (Produkte/Kunden)

### Pflichtfelder
- Rechnungseingang:
  - Wer gebucht
  - Wer freigegeben
  - Welche Ausgangsrechnung/Vorgangsnummer
- Info-Felder pro Position einpflegen bei Eingang
- Optionale Infos auf Belegen
- Bestandsverwaltung beim Kunden
- Pflichtfelder für bestimmte Artikel
- Seriennummer-Verwaltung

### Mobile/Digital
- Digitale Unterschrift gegen zeichnen beim Kunden
- Etikettendruck (Hardware?)
- Mobile Scanner
- Picking-Prozess für Montage/Material ersetzen

---

## 📁 Dateien

```
projects/becker-odoo/
├── Anforderungen_erp_v0.1.txt          # Detaillierte Anforderungen
├── Anforderungen_erp_v0.txt            # Erste Version
├── EyeAble_Audit_www_becker-sicherheit.de.pdf  # Website Audit
├── Förderung Digital Innovation/
│   ├── Anhang1 - Zielarchitektur.pdf
│   ├── DIGITAL_INNOVATION_Projektskizze...pdf
│   ├── Handelsregisterauszug.pdf
│   └── KMU_Erklärung_Becker.pdf
└── Odoo/
    ├── Aufwandschätzung_v1.xlsx        # Erste Aufwandschätzung
    ├── Projeksizze ERP Odoo Becker -v0.01.docx
    └── system_übersicht.png            # System-Architektur Diagramm
```

---

## ⏭️ Nächste Schritte

1. **Discovery Phase**
   - IST-Prozesse dokumentieren
   - Daten-Struktur analysieren
   - Schnittstellen-Details klären (S-Firm, GAEB)
   - Hardware-Anforderungen (Scanner, Etikettendrucker)

2. **Aufwandschätzung verfeinern**
   - Module identifizieren
   - Custom Development Umfang
   - Migration/Datenübernahme
   - Schulung

3. **Zeitplan & Meilensteine**
   - X-Rechnung Deadline beachten (Januar)
   - Phasing: Welche Module zuerst?

4. **Angebot erstellen**
   - Festpreis vs. Time & Material
   - Förderung Digital Innovation nutzen?

---

## 🔑 Key Facts

- **Komplex:** Viele Custom Requirements (GAEB, S-Firm, spezielle Workflows)
- **Zeitdruck:** X-Rechnung muss implementiert werden
- **Förderung:** Digital Innovation Programm läuft (Projektskizze vorhanden)
- **Risiko:** Umsatzverlust durch fehlende Weiterberechnung aktuell!

---

*Zuletzt aktualisiert: 2026-02-02 11:09 UTC*
