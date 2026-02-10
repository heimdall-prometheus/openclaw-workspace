# Becker Sicherheitstechnik - Odoo ERP Projektplan

**Projektstart:** 02.02.2026  
**Partner:** Uwe Becker  
**Status:** Discovery & Planung  

---

## 🎯 Projektziele

### Hauptziele
1. **Transparenz erhöhen** - Projektkosten & Bestellungen nachvollziehbar
2. **Reaktionszeiten verkürzen** - Automatisierung & Vorlagen
3. **X-Rechnung** - Gesetzliche Anforderung umsetzen
4. **Umsatzverluste vermeiden** - Weiterberechnung automatisieren

---

## 📋 Projektphasen

### Phase 0: Vorbereitung & Kickoff (Woche 1-2)
**Dauer:** 2 Wochen  
**Status:** 🔄 In Arbeit

#### Aufgaben
- [x] Anforderungen gesammelt (Anforderungen_erp_v0.1.txt)
- [x] Projektskizze erstellt
- [ ] **Kickoff Meeting mit Uwe**
  - Projektziele bestätigen
  - Timeline abstimmen
  - Team definieren (wer ist Key User?)
- [ ] **IST-Analyse starten**
  - Aktuelles System dokumentieren
  - Prozess-Workflows aufnehmen
  - Datenstruktur analysieren

#### Deliverables
- [ ] Kickoff-Protokoll
- [ ] IST-Analyse Dokument
- [ ] Finaler Projektplan mit Zeitschiene

---

### Phase 1: Discovery & Konzeption (Woche 3-6)
**Dauer:** 4 Wochen  
**Ziel:** Vollständige Anforderungsaufnahme & technisches Konzept

#### 1.1 Anforderungs-Workshops (Woche 3-4)

**Workshop 1: Lagerverwaltung & Logistik**
- Lagerorte, Regalverwaltung
- 3 Standorte mit Nummernkreisen
- Wareneingang/-ausgang
- Barcode-System
- Mobile Scanner (Hardware klären!)

**Workshop 2: Einkauf & Bestellwesen**
- Offene Bestellungen Tracking
- Lieferanten-Management
- 3-Wege-Prüfung automatisieren
- Verknüpfung Auftragsbestätigung ↔ Einkauf

**Workshop 3: Vertrieb & CRM**
- Angebotserstellung & Vorlagen
- Kundenspezifische Preise & Historie
- Projektdokumentation
- POS Modul (falls benötigt)

**Workshop 4: Monteure & Service**
- Arbeitszeiterfassung
- Terminplanung Monteure
- Montage-Doku (inkl. Fotos)
- Wartungsverträge
- Material-Entnahme Prozess
- Umlagerung Lager → Monteur

**Workshop 5: Finanzen & Buchhaltung**
- Eingangsrechnungsprüfung
- Pflichtfeld-Regeln
- DATEV Sync
- X-Rechnung Support (PRIORITÄT!)
- Kostenstellen pro Projekt

#### 1.2 Custom Requirements Detaillierung (Woche 5)

**S-Firm Schnittstelle**
- API Dokumentation anfordern
- Mapping Überweisungen
- Test-Environment aufsetzen

**GAEB Import**
- Datei-Format analysieren
- Mapping: GAEB Position → Odoo Produkte (N:1)
- Angebot-Generierung Workflow
- Statistik & Abrechnung

**OCR Eingangsrechnungen**
- KI API evaluieren (welcher Provider?)
- Automatische Artikel-Anlage
- Validierungs-Workflow

#### 1.3 Technisches Konzept (Woche 6)

- [ ] **Architektur-Diagramm**
  - Server-Infrastruktur
  - Datenbank-Schema
  - Schnittstellen-Design
  
- [ ] **Modul-Liste**
  - Standard Odoo Module
  - Community Module (welche?)
  - Custom Module (Aufwand?)
  
- [ ] **Daten-Migration Konzept**
  - Welche Daten aus Alt-System?
  - Mapping definieren
  - Test-Migration Strategie

#### Deliverables
- [ ] Workshop-Protokolle (5x)
- [ ] Technisches Konzept Dokument
- [ ] Daten-Migrations-Plan
- [ ] Custom Module Spezifikationen

---

### Phase 2: Angebot & Vertragsklärung (Woche 7-8)
**Dauer:** 2 Wochen

#### Aufgaben
- [ ] **Aufwandsschätzung verfeinern**
  - Standard-Konfiguration: X Tage
  - Community Module: X Tage
  - Custom Development: X Tage
  - Migration: X Tage
  - Schulung: X Tage
  - Projektmanagement: X Tage

- [ ] **Angebot erstellen**
  - Festpreis vs. Time & Material?
  - Phasen & Meilensteine
  - Zahlungsplan
  - Change Request Prozess

- [ ] **Förderung prüfen**
  - Digital Innovation Programm nutzen?
  - Unterlagen vorbereiten
  - Antrag stellen (falls sinnvoll)

#### Deliverables
- [ ] Detailliertes Angebot
- [ ] Projektvertrag
- [ ] Förderantrag (falls relevant)

---

### Phase 3: Setup & Basis-Konfiguration (Woche 9-12)
**Dauer:** 4 Wochen  
**Voraussetzung:** Vertrag unterschrieben

#### 3.1 Infrastruktur Setup (Woche 9)
- [ ] Odoo Server aufsetzen
  - Test-Environment
  - Staging-Environment
  - Production-Environment
- [ ] Datenbank-Setup
- [ ] Backup-Strategie
- [ ] Monitoring einrichten

#### 3.2 Basis-Konfiguration (Woche 10-11)
- [ ] **Stammdaten**
  - 3 Standorte anlegen
  - Nummernkreise konfigurieren
  - Lagerverwaltung Setup
  
- [ ] **Standard-Module aktivieren**
  - Lager
  - Einkauf
  - Vertrieb
  - CRM
  - Projekt
  - Finanzen
  - Arbeitszeiterfassung

- [ ] **Community-Module installieren**
  - Wartungsverträge
  - X-Rechnung
  - (weitere nach Liste)

#### 3.3 Test-Daten & Prozesse (Woche 12)
- [ ] Test-Kunden anlegen
- [ ] Test-Produkte anlegen
- [ ] Basis-Workflows testen

#### Deliverables
- [ ] Funktionierende Test-Environment
- [ ] Dokumentation Basis-Konfiguration

---

### Phase 4: Custom Development (Woche 13-20)
**Dauer:** 8 Wochen (parallel zu Phase 5 möglich)

#### 4.1 S-Firm Schnittstelle (Woche 13-15)
- [ ] API Integration entwickeln
- [ ] Überweisungs-Export
- [ ] Testing & Fehlerbehandlung

#### 4.2 GAEB Import (Woche 16-18)
- [ ] Parser entwickeln
- [ ] Produkt-Mapping
- [ ] Angebots-Generierung
- [ ] Statistik-Auswertungen

#### 4.3 OCR Eingangsrechnungen (Woche 19-20)
- [ ] KI API Integration
- [ ] Artikel-Anlage automatisieren
- [ ] Validierungs-Workflow
- [ ] Testing

#### Deliverables
- [ ] 3 Custom Module (getestet)
- [ ] API Dokumentation
- [ ] Unit Tests

---

### Phase 5: Erweiterte Konfiguration (Woche 15-22)
**Dauer:** 8 Wochen (parallel zu Phase 4)

#### 5.1 Projekt-Modul (Woche 15-17)
- [ ] Projektstruktur definieren
- [ ] Kostenstellen-Tracking
- [ ] Weiterberechnung einrichten
- [ ] Dokumenten-Ablage
- [ ] Profitabilitäts-Reports

#### 5.2 Monteur-Workflows (Woche 18-20)
- [ ] Terminplanung Setup
- [ ] Arbeitszeiterfassung konfigurieren
- [ ] Material-Entnahme Prozess
- [ ] Umlagerungs-Automatisierung
- [ ] Montage-Dokumentation (mit Fotos)

#### 5.3 Automatisierungen (Woche 21-22)
- [ ] Eingangsrechnungs-Prüfung
- [ ] Meldebestand → Bestellvorschlag
- [ ] Email-Automatisierungen
- [ ] Regelbasierte Preisänderungen

#### Deliverables
- [ ] Konfigurierte Workflows
- [ ] Automatisierungs-Dokumentation

---

### Phase 6: Daten-Migration (Woche 23-26)
**Dauer:** 4 Wochen

#### 6.1 Migration Vorbereitung (Woche 23)
- [ ] Daten-Export aus Alt-System
- [ ] Daten-Bereinigung
- [ ] Mapping validieren

#### 6.2 Test-Migration (Woche 24-25)
- [ ] Erste Migration Durchlauf
- [ ] Daten-Qualität prüfen
- [ ] Fehler beheben
- [ ] Zweite Migration (falls nötig)

#### 6.3 Final Migration (Woche 26)
- [ ] Produktiv-Migration
- [ ] Vollständigkeits-Check
- [ ] Parallel-Betrieb starten

#### Deliverables
- [ ] Migrierte Daten in Production
- [ ] Migrations-Report

---

### Phase 7: User Acceptance Testing (Woche 27-30)
**Dauer:** 4 Wochen

#### 7.1 Key User Training (Woche 27)
- [ ] Admin-Schulung (2 Tage)
- [ ] Key User Training (3 Tage)
- [ ] Test-Szenarien durchspielen

#### 7.2 UAT Phase (Woche 28-29)
- [ ] Testfälle definieren
- [ ] User Testing
- [ ] Feedback sammeln
- [ ] Bug Fixing
- [ ] Anpassungen vornehmen

#### 7.3 Final Acceptance (Woche 30)
- [ ] Abnahme-Test
- [ ] Sign-Off Key Users
- [ ] Go-Live Vorbereitung

#### Deliverables
- [ ] UAT Protokoll
- [ ] Finale Anpassungen
- [ ] Go-Live Checkliste

---

### Phase 8: Schulung & Go-Live (Woche 31-34)
**Dauer:** 4 Wochen

#### 8.1 End-User Schulungen (Woche 31-32)
- [ ] **Lager-Team** (1 Tag)
- [ ] **Einkauf-Team** (1 Tag)
- [ ] **Vertrieb-Team** (2 Tage)
- [ ] **Monteure** (1 Tag)
- [ ] **Buchhaltung** (1 Tag)

#### 8.2 Go-Live (Woche 33)
- [ ] **Final Cutover**
  - Letzte Daten-Migration
  - Alt-System deaktivieren
  - Production freischalten
  
- [ ] **Go-Live Support** (Tag 1-5)
  - On-Site Support
  - Probleme lösen
  - Quick Fixes

#### 8.3 Hypercare (Woche 34)
- [ ] Tägliche Check-Ins
- [ ] Performance Monitoring
- [ ] User Support
- [ ] Feintuning

#### Deliverables
- [ ] Schulungs-Materialien
- [ ] Go-Live Protokoll
- [ ] Support-Tickets gelöst

---

### Phase 9: Hypercare & Stabilisierung (Woche 35-38)
**Dauer:** 4 Wochen

#### Aufgaben
- [ ] Wöchentliche Review Meetings
- [ ] Performance Optimierung
- [ ] Prozess-Anpassungen
- [ ] Restliche Schulungen (falls nötig)
- [ ] Dokumentation finalisieren

#### Deliverables
- [ ] Stabiles Produktiv-System
- [ ] Finale Dokumentation
- [ ] Projekt-Abschlussbericht

---

### Phase 10: Wartung & Support (ab Woche 39)
**Kontinuierlich**

#### Support-Modell definieren
- [ ] Support-Level Agreement (SLA)
- [ ] Reaktionszeiten
- [ ] Eskalations-Prozess
- [ ] Wartungs-Vertrag

#### Continuous Improvement
- [ ] Monatliche Reviews
- [ ] Feature Requests sammeln
- [ ] Optimierungen priorisieren
- [ ] Releases planen

---

## ⏱️ Zeitplan Übersicht

| Phase | Wochen | Start | Ende | Status |
|-------|--------|-------|------|--------|
| **0. Vorbereitung** | 2 | W1 | W2 | 🔄 In Arbeit |
| **1. Discovery** | 4 | W3 | W6 | ⏸️ Geplant |
| **2. Angebot** | 2 | W7 | W8 | ⏸️ Geplant |
| **3. Setup** | 4 | W9 | W12 | ⏸️ Geplant |
| **4. Custom Dev** | 8 | W13 | W20 | ⏸️ Geplant |
| **5. Konfiguration** | 8 | W15 | W22 | ⏸️ Geplant |
| **6. Migration** | 4 | W23 | W26 | ⏸️ Geplant |
| **7. UAT** | 4 | W27 | W30 | ⏸️ Geplant |
| **8. Go-Live** | 4 | W31 | W34 | ⏸️ Geplant |
| **9. Hypercare** | 4 | W35 | W38 | ⏸️ Geplant |
| **10. Support** | ∞ | W39+ | - | ⏸️ Geplant |

**Gesamt-Projektdauer:** ~9 Monate (38 Wochen)

---

## 🎯 Kritische Erfolgsfaktoren

### Must-Have vor Go-Live
1. ✅ **X-Rechnung Support** (gesetzlich!)
2. ✅ **Projekt-Tracking** (Umsatzverlust vermeiden!)
3. ✅ **3-Wege-Prüfung** (Automatisierung)
4. ✅ **Monteur-Workflows** (Zeiterfassung + Material)
5. ✅ **GAEB Import** (falls kritisch für Business)

### Nice-to-Have (Phase 2)
- OCR Eingangsrechnungen
- S-Firm Schnittstelle (falls nicht kritisch)
- Erweiterte Automatisierungen

---

## 🚨 Risiken & Mitigation

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **X-Rechnung Deadline** | Mittel | Hoch | Früh starten, Community Module nutzen |
| **Daten-Migration Probleme** | Hoch | Hoch | Test-Migrationen, genug Puffer |
| **User Adoption** | Mittel | Hoch | Frühes Training, Key User Champions |
| **Custom Dev Aufwand** | Mittel | Mittel | Time & Material für Custom, klare Scope |
| **S-Firm API Probleme** | Mittel | Mittel | API Doku frühzeitig prüfen |
| **Resource Availability** | Mittel | Mittel | Key User frühzeitig blocken |

---

## 📞 Nächste Schritte (diese Woche!)

### Top Priority
1. **Kickoff Meeting mit Uwe terminieren**
   - Wann: Diese Woche
   - Agenda: Projektplan vorstellen, Timeline bestätigen, Key Users definieren

2. **IST-Analyse starten**
   - Termin beim Kunden vor Ort
   - Aktuelles System anschauen
   - Prozesse dokumentieren

3. **Workshop-Termine blocken**
   - 5 Workshops in Woche 3-4 einplanen
   - Key User Verfügbarkeit klären

### Fragen zu klären
- [ ] Wer sind die Key Users pro Bereich?
- [ ] Welches Alt-System nutzen sie aktuell?
- [ ] Gibt es bereits Odoo Erfahrung im Team?
- [ ] Hardware: Welche Scanner/Drucker/Tablets?
- [ ] Server: On-Premise oder Cloud?
- [ ] Budget: Gibt es ein fixes Budget oder Time & Material?

---

## 💰 Aufwands-Kategorien (grob)

*Detaillierte Aufwandsschätzung nach Discovery Phase!*

### Grob-Schätzung
- **Standard-Konfiguration:** 40-60 PT
- **Community Module:** 10-20 PT
- **Custom Development:** 60-100 PT
  - S-Firm: 15-25 PT
  - GAEB: 25-40 PT
  - OCR: 20-35 PT
- **Migration:** 20-30 PT
- **Schulung:** 15-20 PT
- **Projektmanagement:** 30-40 PT

**Gesamt (grob):** 175-270 Personentage

**⚠️ Dies ist eine erste Schätzung! Nach Discovery Phase wird verfeinert.**

---

*Zuletzt aktualisiert: 2026-02-02 11:15 UTC*
