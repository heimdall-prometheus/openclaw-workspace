# Becker Sicherheitstechnik - Odoo ERP Projektplan

**Version:** Final (basierend auf Aufwandschätzung_v1)  
**Projektstart:** 02.02.2026  
**Strategie:** Quick Wins First → Komplexes Backloaded

---

## 📊 Phasen-Übersicht (aus Aufwandschätzung)

| Phase | Min PT | Max PT | Mittel |
|-------|--------|--------|--------|
| 1. Analyse & Projektsetup | 9 | 14 | 11,5 |
| 2. Infrastruktur & Basis | 3 | 5 | 4 |
| 3. Stammdatenmigration | 2 | 3 | 2,5 |
| 4. Buchhaltung | 8,5 | 12,5 | 10,5 |
| 5. Einkauf & Beschaffung | 4 | 7 | 5,5 |
| 6. Lager & Logistik | 5 | 9 | 7 |
| 7. Vertrieb & Auftragsabwicklung | 4 | 5,5 | 4,75 |
| 8. Projektmanagement & CRM | 6 | 8 | 7 |
| 9. Mängeldoku & Service | 7 | 9 | 8 |
| 10. Custom Module & Schnittstellen | 7 | 11 | 9 |
| 11. Schulung & Change | 5,5 | 8 | 6,75 |
| 12. Test & Rollout | 2 | 3 | 2,5 |
| **GESAMT** | **63** | **95** | **~79** |

---

## 🎯 Projektablauf (Quick Wins First)

### WOCHE 1-3: Analyse & Projektsetup

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Kick-off & Projektorganisation | 2 | 3 | ✅ Projektteam steht, Rollen klar |
| Prozessworkshops (Ist/Soll) | 4 | 6 | ✅ Ist-Prozesse dokumentiert, Soll definiert |
| Anforderungs-Mapping & Backlog | 2 | 3 | ✅ Priorisiertes Backlog |
| Projektplan & Roadmap | 1 | 2 | ✅ Verbindlicher Zeitplan |

**🎁 Ergebnis:** Klares Bild der Anforderungen, alle Beteiligten abgeholt

---

### WOCHE 4-5: Infrastruktur & Basis

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Installation Odoo Community | 0,5 | 0,5 | ✅ System läuft |
| Server-Konfiguration (On-Premise) | 0,5 | 0,5 | ✅ Produktivumgebung steht |
| Integration OCA-Bibliotheken | 1 | 2 | ✅ Benötigte Module installiert |
| Rechte- & Rollenkonzept | 1 | 2 | ✅ Benutzer können einloggen |

**🎁 Ergebnis:** Funktionierendes System zum Anfassen

---

### WOCHE 5-6: Stammdatenmigration

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Import Artikelstamm | - | - | ✅ Produkte verfügbar |
| Import Kunden & Lieferanten | - | - | ✅ Partner angelegt |
| Import Bestände | - | - | ✅ Lagerbestände korrekt |
| Testmigration & Validierung | 2 | 3 | ✅ Daten geprüft & freigegeben |

**🎁 Ergebnis:** System mit echten Daten

---

### WOCHE 6-8: Vertrieb & Auftragsabwicklung ⚡ QUICK WIN

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Angebots- & Auftragsprozesse inkl. Rabatte | 1 | 2 | ✅ Erstes Angebot aus Odoo |
| Kundenspezifische Preisregeln | 0,5 | 0,5 | ✅ Individuelle Preise möglich |
| Auftragsbestätigung & Kopierlogik | 0,5 | 1 | ✅ Aufträge effizient erstellen |
| POS-Modul | 2 | 2 | ✅ Thekenverkauf funktioniert |

**🎁 Ergebnis:** Vertrieb arbeitet produktiv mit Odoo

---

### WOCHE 8-10: Einkauf & Beschaffung ⚡ QUICK WIN

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Bestellung & Wareneingang | 1 | 2 | ✅ Bestellungen digital |
| Lieferantenverwaltung | 0,5 | 0,5 | ✅ Lieferanten gepflegt |
| Übersicht offene Bestellungen | 0,5 | 0,5 | ✅ "Wann kommt mein Zeug?" beantwortet |
| 3-Wege-Prüfung (automatisiert) | 2 | 4 | ✅ Automatischer Abgleich |

**🎁 Ergebnis:** Einkauf läuft digital, Transparenz bei Bestellungen

---

### WOCHE 10-12: Lager & Logistik

| Aufgabe | PT min | PT max | Deliverable | Zusatz |
|---------|--------|--------|-------------|--------|
| Mehrere Lagerorte & Lagerplätze | 0,5 | 2 | ✅ 3 Standorte konfiguriert | Eigenleistung möglich |
| Bestandsführung inkl. Umlagerung Monteure | 0,5 | 1 | ✅ Material-Tracking |  |
| Scanner-Integration | 2 | 3 | ✅ Mobile Scanner funktionieren | Bei mobilen Scannern |
| Etikettendruck | 1 | 2 | ✅ Barcodes druckbar | Modul ~500€ |
| Meldebestand & Bestellvorschläge | 1 | 1 | ✅ Automatische Nachbestellung |  |

**🎁 Ergebnis:** Vollständige Lagertransparenz

---

### WOCHE 12-15: Buchhaltung

| Aufgabe | PT min | PT max | Deliverable | Zusatz |
|---------|--------|--------|-------------|--------|
| DATEV-Schnittstelle | 1 | 2 | ✅ Export für Steuerberater | Extramodul ~500€ |
| X-Rechnung / ZUGFeRD | 0,5 | 0,5 | ✅ Gesetzeskonform | inkl. OCR |
| Eingangsrechnungsprüfung (automatisiert) | 3 | 4 | ✅ Automatischer Abgleich |  |
| Pflichtfelder & Validierungsregeln | 2 | 3 | ✅ Qualität gesichert |  |
| Kontenplan & Testmigration | 2 | 3 | ✅ Buchhaltung bereit |  |

**🎁 Ergebnis:** Buchhaltung automatisiert, X-Rechnung ready

---

### WOCHE 15-17: Projektmanagement & CRM

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Projektanlage & Nachkalkulation | 2 | 3 | ✅ Kosten je Projekt sichtbar |
| Projektdokumentation | 1 | 2 | ✅ Alles am Projekt hinterlegt |
| CRM & Kundenhistorie | 2 | 2 | ✅ Komplette Kundenakte |
| Profitabilität je Projekt | 1 | 1 | ✅ Gewinn/Verlust auf Knopfdruck |

**🎁 Ergebnis:** Kein Umsatzverlust mehr durch fehlende Weiterberechnung

---

### WOCHE 17-20: Mängeldoku & Service 🔧 KOMPLEX

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Wartungsverträge (inkl. Doku) | 1 | 1 | ✅ Verträge digital verwaltet |
| Mobile App für Monteure | 4 | 5 | ✅ Monteure arbeiten mobil |
| Mängeldoku mit Foto | 1 | 2 | ✅ Fotos direkt am Projekt |
| Digitale Unterschrift | 1 | 1 | ✅ Kunde signiert digital |

**🎁 Ergebnis:** Zettelwirtschaft beendet, Monteure vollständig digital

---

### WOCHE 20-23: Custom Module & Schnittstellen 🔗 KOMPLEX

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| S-Firm Schnittstelle | 1 | 2 | ✅ Überweisungen automatisiert |
| GAEB-Import Ausschreibungen | 3 | 4 | ✅ Ausschreibungen → Angebote |
| Mapping GAEB Produkte (N:1) | - | - | ✅ Statistik & Abrechnung |
| Sonderlösungen | 3 | 5 | ✅ Custom Workflows |

**🎁 Ergebnis:** Alle Spezialanforderungen umgesetzt

---

### WOCHE 23-25: Schulung & Change

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Key-User-Training | 3 | 4 | ✅ Key User fit |
| Admin-Training | 0,5 | 1 | ✅ Admins können System verwalten |
| Endanwender-Workshops | 1 | 2 | ✅ Alle Mitarbeiter geschult |
| Schulungsunterlagen | 1 | 1 | ✅ Dokumentation vorhanden |

**🎁 Ergebnis:** Team ist bereit für produktiven Betrieb

---

### WOCHE 25-26: Test & Rollout

| Aufgabe | PT min | PT max | Deliverable |
|---------|--------|--------|-------------|
| Integrationstests | - | - | ✅ Alle Prozesse getestet |
| Pilotbetrieb | - | - | ✅ Echtbetrieb mit Fallback |
| Bugfixes & Nachjustierung | 2 | 3 | ✅ System stabil |
| Go-Live-Begleitung | - | - | ✅ Support bei Start |

**🎁 Ergebnis:** Produktiver Betrieb

---

## 📅 Meilensteine

| Woche | Meilenstein | Status |
|-------|-------------|--------|
| 3 | Analyse abgeschlossen | ⬜ |
| 5 | System steht | ⬜ |
| 8 | Vertrieb produktiv | ⬜ |
| 10 | Einkauf produktiv | ⬜ |
| 15 | Buchhaltung komplett | ⬜ |
| 17 | Projektcontrolling live | ⬜ |
| 20 | Monteure digital | ⬜ |
| 23 | Custom Schnittstellen fertig | ⬜ |
| 25 | Schulungen abgeschlossen | ⬜ |
| 26 | **GO-LIVE** | ⬜ |

---

## 💰 Zusatzkosten (Module)

| Modul | Kosten |
|-------|--------|
| DATEV-Schnittstelle | ~500€ |
| Etikettendruck-Modul | ~500€ |
| **Summe Module** | **~1.000€** |

---

## ⚠️ Risiken & Mitigation

| Risiko | Wahrscheinlichkeit | Mitigation |
|--------|-------------------|------------|
| Datenqualität Migration | Mittel | Frühe Testmigration, Validierung |
| GAEB-Komplexität | Hoch | Puffer eingeplant, iterativ vorgehen |
| Akzeptanz Mitarbeiter | Niedrig | Quick Wins erzeugen Buy-In |
| Scanner-Hardware | Mittel | Frühzeitige Beschaffung |

---

## ✅ Nächste Schritte

1. **Kick-off Meeting** mit Uwe terminieren
2. **Key User** pro Bereich benennen
3. **Server-Infrastruktur** vorbereiten
4. **Datenexport aus Altsystem** starten

---

*Erstellt: 02.02.2026 | Heimdall*
*Basierend auf: Aufwandschätzung_v1.xlsx*
