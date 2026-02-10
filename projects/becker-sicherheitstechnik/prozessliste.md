# Becker Sicherheitstechnik - Prozessliste (Hypothese)

**Stand:** 2026-02-02
**Kontext:** Odoo ERP Implementation
**Unternehmensprofil:** Handwerk + Handel im Bereich Sicherheitstechnik

---

## 1. Vertrieb & Kundenakquise

### 1.1 Anfragenmanagement
- [ ] Anfragen erfassen (Telefon, E-Mail, Website, vor Ort)
- [ ] Anfragen qualifizieren (Privat/Gewerblich, Projektgröße)
- [ ] Zuständigkeit zuweisen (Handel vs. Montage)

### 1.2 Angebotswesen
- [ ] Vor-Ort-Termine planen (Aufmaß, Beratung)
- [ ] Angebote kalkulieren (Material + Arbeitszeit)
- [ ] Angebote erstellen und versenden
- [ ] Angebotsnachverfolgung
- [ ] Auftragsbestätigung bei Annahme

### 1.3 Kundenbetreuung
- [ ] Stammkundenpflege
- [ ] Wartungsverträge verwalten
- [ ] Reklamationsmanagement

---

## 2. Einkauf & Beschaffung

### 2.1 Lieferantenmanagement
- [ ] Lieferantenstammdaten pflegen
- [ ] Konditionen verhandeln
- [ ] Lieferantenbewertung

### 2.2 Bestellwesen
- [ ] Bedarfsermittlung (Lager, Projektbezogen)
- [ ] Bestellungen auslösen
- [ ] Liefertermine überwachen
- [ ] Bestellbestätigungen prüfen

### 2.3 Wareneingang
- [ ] Lieferungen annehmen
- [ ] Wareneingangsprüfung (Menge, Qualität)
- [ ] Einlagerung
- [ ] Lieferschein-/Rechnungsabgleich

---

## 3. Lagerwirtschaft

### 3.1 Bestandsführung
- [ ] Lagerorte verwalten
- [ ] Bestandsübersicht (Echtzeit)
- [ ] Mindestbestände / Meldebestände
- [ ] Inventur (Stichtag/permanent)

### 3.2 Kommissionierung
- [ ] Material für Projekte reservieren
- [ ] Kommissionierlisten erstellen
- [ ] Materialausgabe an Monteure
- [ ] Rückgabe nicht verwendeter Materialien

### 3.3 Lagerlogistik
- [ ] Einlagerung organisieren
- [ ] Umlagerungen
- [ ] Retouren verarbeiten

---

## 4. Projektmanagement (Handwerk/Montage)

### 4.1 Projektplanung
- [ ] Projekte anlegen
- [ ] Ressourcenplanung (Personal, Material, Werkzeug)
- [ ] Zeitplanung / Terminierung
- [ ] Subunternehmer einplanen (falls relevant)

### 4.2 Projektdurchführung
- [ ] Arbeitsaufträge erstellen
- [ ] Monteurszuweisung
- [ ] Fortschrittsverfolgung
- [ ] Stundenerfassung auf Projekt
- [ ] Materialverbrauch erfassen

### 4.3 Projektabschluss
- [ ] Abnahmeprotokoll
- [ ] Dokumentation (Fotos, Anleitungen)
- [ ] Übergabe an Kunde
- [ ] Gewährleistungsfristen tracken

---

## 5. Service & Wartung

### 5.1 Wartungsverträge
- [ ] Verträge anlegen und verwalten
- [ ] Wartungsintervalle definieren
- [ ] Automatische Erinnerungen/Termine

### 5.2 Serviceeinsätze
- [ ] Störungsmeldungen erfassen
- [ ] Priorisierung / SLA-Tracking
- [ ] Techniker disponieren
- [ ] Einsatzberichte erstellen

### 5.3 Ersatzteilmanagement
- [ ] Ersatzteilbedarf aus Service
- [ ] Schnellverfügbarkeit kritischer Teile

---

## 6. Personalwesen (Handwerk-spezifisch)

### 6.1 Zeiterfassung
- [ ] Arbeitszeiten erfassen (Büro, Baustelle)
- [ ] Fahrtzeitenerfassung
- [ ] Überstunden / Zuschläge
- [ ] Urlaubs-/Krankmeldungen

### 6.2 Disposition
- [ ] Monteurkalender
- [ ] Einsatzplanung
- [ ] Qualifikationsmatrix (Wer kann was?)
- [ ] Schulungen / Zertifikate tracken

### 6.3 Lohnvorbereitung
- [ ] Stundenzusammenstellung
- [ ] Zuschläge berechnen
- [ ] Export für Lohnbuchhaltung

---

## 7. Finanzen & Buchhaltung

### 7.1 Faktura (Ausgangsrechnungen)
- [ ] Abschlagsrechnungen (bei größeren Projekten)
- [ ] Schlussrechnungen
- [ ] Handels-Rechnungen (Warenverkauf)
- [ ] Gutschriften

### 7.2 Kreditorenbuchhaltung
- [ ] Eingangsrechnungen erfassen
- [ ] Rechnungsprüfung (3-Way-Match)
- [ ] Zahlungsläufe
- [ ] Skonto-Überwachung

### 7.3 Debitorenbuchhaltung
- [ ] Offene Posten überwachen
- [ ] Mahnwesen (Mahnstufen)
- [ ] Zahlungseingänge buchen

### 7.4 Reporting
- [ ] BWA / GuV
- [ ] Projektrentabilität
- [ ] Liquiditätsplanung

---

## 8. Handel (Warenverkauf ohne Montage)

### 8.1 Verkauf
- [ ] Kundenbestellungen erfassen
- [ ] Preislisten / Rabatte
- [ ] Verfügbarkeitsprüfung
- [ ] Direktlieferung vs. Lagerabholung

### 8.2 Versand
- [ ] Lieferscheine erstellen
- [ ] Versandabwicklung (Spedition, Paket)
- [ ] Sendungsverfolgung

### 8.3 E-Commerce (falls relevant)
- [ ] Webshop-Anbindung (mein-schluessel.de?)
- [ ] Bestandssynchronisation
- [ ] Online-Bestellungen verarbeiten

---

## 9. Qualitätsmanagement

### 9.1 Dokumentation
- [ ] Montageanleitungen
- [ ] Prüfprotokolle
- [ ] Zertifikate verwalten

### 9.2 Reklamationen
- [ ] Reklamationen erfassen
- [ ] Ursachenanalyse
- [ ] Nachbesserung koordinieren
- [ ] Kulanzregelungen

---

## 10. Fuhrpark (falls relevant)

- [ ] Fahrzeugstammdaten
- [ ] Wartungsintervalle / TÜV
- [ ] Tankkarten-Abrechnung
- [ ] Fahrzeugzuordnung zu Monteuren

---

## Priorisierung für Odoo-Rollout

### Phase 1 (MVP)
1. **Stammdaten**: Kunden, Lieferanten, Artikel
2. **Verkauf**: Angebote → Aufträge → Rechnungen
3. **Einkauf**: Bestellungen → Wareneingang
4. **Lager**: Grundlegende Bestandsführung

### Phase 2
5. **Projektmanagement**: Für Montageprojekte
6. **Zeiterfassung**: Stunden auf Projekte buchen
7. **Finanzen**: Integration Buchhaltung

### Phase 3
8. **Service & Wartung**: Wiederkehrende Aufträge
9. **Erweiterte Planung**: Ressourcenplanung, Kalender
10. **Reporting**: Dashboards, KPIs

---

## Offene Fragen für Kickoff

1. **Struktur:** Gibt es mehrere Standorte/Lager?
2. **Schnittstellen:** DATEV? Andere Systeme?
3. **E-Commerce:** mein-schluessel.de Integration?
4. **Subunternehmer:** Werden welche eingesetzt?
5. **Wartungsverträge:** Wie viele? Welche Intervalle?
6. **Mitarbeiterzahl:** Wie viele Monteure/Büro?
7. **Mobilgeräte:** Tablets für Monteure?

---

*Diese Liste ist eine Hypothese basierend auf typischen Prozessen eines Sicherheitstechnik-Betriebs mit Handel + Handwerk. Im Kickoff-Meeting validieren und anpassen.*
