# Odoo-Einführung Becker Sicherheitstechnik GmbH

**Erstellt:** 2026-02-01  
**Meeting:** 2026-02-02, 10:00 Uhr Berlin  
**Kunde:** Becker Sicherheitstechnik GmbH  
**Ansprechpartner:** Uwe Becker (Geschäftsführer)

---

## 1. Unternehmensprofil

### Basisdaten
- **Gründung:** 1985 (Dieter Becker), seit 2003 unter Uwe Becker
- **Standort:** Dessau, Sachsen-Anhalt
- **Umsatz:** ~4 Mio € p.a.
- **Branche:** Sicherheitstechnik (Handwerk + Handel)
- **Website:** becker-sicherheit.de

### Geschäftsmodell
- **B2B:** Öffentliche Einrichtungen, Fachhändler, Verarbeiter
- **B2C:** Endkunden
- **E-Commerce:** mein-schluessel.de (Shopware 6, gemeinsam mit Erik)

### Geschäftsbereiche (angenommen)
1. **Handel:** Vertrieb von Sicherheitsprodukten (Schlösser, Schließanlagen, etc.)
2. **Handwerk/Service:** Installation, Montage, Wartung
3. **Beratung:** Sicherheitskonzepte für Unternehmen/Institutionen

---

## 2. Typische Pain Points (Handwerk + Handel)

### Operative Herausforderungen
- [ ] Fragmentierte Systeme (Excel, separate Tools)
- [ ] Manuelle Angebotserstellung
- [ ] Unklare Lagerbestände
- [ ] Zeiterfassung Außendienst/Monteure
- [ ] Projektverfolgung bei Installationen
- [ ] Rechnungsstellung nach Leistung

### Strategische Herausforderungen
- [ ] Keine Echtzeit-Übersicht über Projekte
- [ ] Schwierige Kostenkalkulation
- [ ] Kundenkommunikation (Auftragsstand)
- [ ] Integration Online-Shop ↔ ERP

**⚠️ Im Meeting klären:** Welche davon sind die größten Schmerzpunkte?

---

## 3. Empfohlene Odoo-Module

### 🟢 Phase 1: Kernmodule (Sofort)

| Modul | Zweck | Priorität |
|-------|-------|-----------|
| **CRM** | Leads, Opportunities, Kundenhistorie | ⭐⭐⭐ |
| **Verkauf** | Angebote, Aufträge, Preislisten | ⭐⭐⭐ |
| **Einkauf** | Lieferanten, Bestellungen | ⭐⭐⭐ |
| **Lager** | Bestandsführung, Bewegungen | ⭐⭐⭐ |
| **Buchhaltung** | Rechnungen, Zahlungen, DATEV-Export | ⭐⭐⭐ |
| **Kontakte** | Zentrale Stammdatenverwaltung | ⭐⭐⭐ |

### 🟡 Phase 2: Erweiterungen (3-6 Monate)

| Modul | Zweck | Priorität |
|-------|-------|-----------|
| **Projekt** | Installationsprojekte verwalten | ⭐⭐ |
| **Zeiterfassung** | Stunden der Monteure erfassen | ⭐⭐ |
| **Außendienst** | Mobile App für Techniker | ⭐⭐ |
| **Helpdesk** | Service-Tickets, Wartungsverträge | ⭐⭐ |

### 🔵 Phase 3: Optional (6-12 Monate)

| Modul | Zweck | Priorität |
|-------|-------|-----------|
| **E-Commerce** | Odoo-Shop oder Shopware-Integration | ⭐ |
| **HR** | Personalverwaltung, Abwesenheiten | ⭐ |
| **Dokumente** | DMS, Verträge, Zeichnungen | ⭐ |
| **Marketing** | Newsletter, Kampagnen | ⭐ |

---

## 4. Integration mein-schluessel.de

### Status Quo
- Shopware 6 E-Commerce
- Eigentümerstruktur: Erik 22,5% / Uwe 77,5%
- Vermutlich separate Systeme (Shop ↔ Warenwirtschaft)

### Integrations-Optionen

#### Option A: Shopware ↔ Odoo Connector
- **Pro:** Shopware bleibt bestehen, Sync von Produkten/Bestellungen
- **Contra:** Zwei Systeme pflegen, potentielle Sync-Probleme
- **Aufwand:** Mittel (Connector konfigurieren)

#### Option B: Migration zu Odoo E-Commerce
- **Pro:** Ein System für alles, native Integration
- **Contra:** Shopware-Investment verloren, Umgewöhnung
- **Aufwand:** Hoch (Shop-Migration)

#### Option C: Parallelbetrieb (vorerst)
- **Pro:** Kein Risiko, schrittweise
- **Contra:** Keine Synergien
- **Aufwand:** Niedrig

**💡 Empfehlung:** Option A (Connector) oder C (Parallelbetrieb starten, später entscheiden)

---

## 5. Technische Infrastruktur

### Hosting-Optionen

| Option | Vorteile | Nachteile | Kosten |
|--------|----------|-----------|--------|
| **Odoo.sh** (Cloud) | Managed, Updates automatisch, Backups | Abhängigkeit, monatl. Kosten | ~€50-200/User/Monat |
| **Self-Hosted** | Volle Kontrolle, einmalige Kosten | Wartung selbst, IT-Know-how nötig | Server + Wartung |
| **Partner-Hosting** | Managed + Support | Abhängigkeit vom Partner | Individuell |

**Für 4 Mio Umsatz empfohlen:** Odoo.sh oder Partner-Hosting

### Benutzer (geschätzt)
- Geschäftsführung: 1-2
- Vertrieb/Innendienst: 2-4
- Einkauf/Lager: 1-2
- Buchhaltung: 1-2
- Monteure/Außendienst: 3-5
- **Gesamt:** ~10-15 User

---

## 6. Implementierungs-Roadmap

### Vorprojekt (2-4 Wochen)
- [ ] Ist-Analyse der aktuellen Prozesse
- [ ] Anforderungsworkshop mit Abteilungen
- [ ] Lastenheft/Pflichtenheft erstellen
- [ ] Odoo-Edition & Hosting entscheiden
- [ ] Projektplan & Budget abstimmen

### Phase 1: Basis-Setup (4-8 Wochen)
- [ ] Odoo-Instanz aufsetzen
- [ ] Stammdaten-Migration (Kunden, Lieferanten, Artikel)
- [ ] Kernmodule konfigurieren (CRM, Verkauf, Einkauf, Lager, Buchhaltung)
- [ ] Benutzer anlegen & Rechte
- [ ] Schulung Kernteam

### Phase 2: Go-Live Kernprozesse (2-4 Wochen)
- [ ] Parallelbetrieb (Alt + Neu)
- [ ] Datenabgleich & Korrekturen
- [ ] Go-Live Kernmodule
- [ ] Support-Phase intensiv

### Phase 3: Erweiterungen (3-6 Monate)
- [ ] Projekt & Zeiterfassung
- [ ] Außendienst-App
- [ ] Helpdesk/Service
- [ ] Shopware-Integration (wenn gewünscht)

### Phase 4: Optimierung (ongoing)
- [ ] Prozessoptimierungen
- [ ] Reporting & Dashboards
- [ ] Weitere Module nach Bedarf

---

## 7. Budget-Schätzung

### Einmalige Kosten

| Position | Geschätzt |
|----------|-----------|
| Lizenz (je nach Edition) | €0 - €5.000 |
| Implementierung/Beratung (150-250 Stunden) | €15.000 - €35.000 |
| Datenmigration | €3.000 - €8.000 |
| Schulungen | €2.000 - €5.000 |
| Anpassungen/Customizing | €5.000 - €15.000 |
| **Gesamt einmalig** | **€25.000 - €68.000** |

### Laufende Kosten (monatlich)

| Position | Geschätzt |
|----------|-----------|
| Hosting (Cloud) | €200 - €500 |
| Support/Wartung | €300 - €800 |
| Lizenzen (je nach Edition) | €0 - €500 |
| **Gesamt monatlich** | **€500 - €1.800** |

**⚠️ Hinweis:** Stark abhängig von Umfang und Customizing-Bedarf!

---

## 8. Risiken & Mitigation

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| Widerstand der Mitarbeiter | Mittel | Hoch | Frühe Einbindung, Schulungen |
| Datenmigration fehlerhaft | Mittel | Hoch | Testmigration, Validierung |
| Unterschätzte Komplexität | Mittel | Mittel | Puffer einplanen, agil vorgehen |
| Integration Shop scheitert | Niedrig | Mittel | Parallelbetrieb als Fallback |
| Budget-Überschreitung | Mittel | Mittel | Fixpreis-Pakete, Phasen-Ansatz |

---

## 9. Fragen für das Meeting

### Zum Ist-Zustand
1. Welche Software wird aktuell eingesetzt? (Warenwirtschaft, Buchhaltung, etc.)
2. Wie viele Mitarbeiter werden das System nutzen?
3. Wie läuft aktuell die Auftragsabwicklung? (Angebot → Rechnung)
4. Wie werden Projekte/Installationen dokumentiert?
5. Welche Schnittstellen sind wichtig? (DATEV, Bank, Shop, etc.)

### Zu den Anforderungen
6. Was sind die Top 3 Pain Points im Alltag?
7. Welche Prozesse sollen als erstes digitalisiert werden?
8. Gibt es Sonderprozesse (Wartungsverträge, Rahmenverträge, etc.)?
9. Mobile Nutzung für Monteure gewünscht?
10. Wie wichtig ist die Shop-Integration kurzfristig?

### Zum Projekt
11. Timeline-Erwartungen? Wann soll Go-Live sein?
12. Budget-Rahmen?
13. Wer ist der interne Projektverantwortliche?
14. Gibt es einen IT-Ansprechpartner?

---

## 10. Nächste Schritte

Nach dem Meeting am 02.02.2026:

1. **Anforderungen dokumentieren** (basierend auf Meeting-Input)
2. **Projekt anlegen** in task-system/ mit klarer Definition
3. **Proof of Concept** planen (Demo mit echten Daten)
4. **Angebot erstellen** (falls Erik das macht oder Partner einbinden)
5. **Zeitplan finalisieren**

---

## Anhang

### Nützliche Ressourcen
- [Odoo Dokumentation](https://www.odoo.com/documentation)
- [Odoo für Handwerk (ecodoo)](https://www.ecodoo.eu/blog/der-odoo-blog-4/odoo-im-baugewerbe-handwerk-effizienz-durch-eine-massgeschneiderte-erp-branchenlosung-75)
- [DATEV-Export Modul](https://apps.odoo.com/apps/modules/browse?search=datev)

### Wettbewerber/Alternativen
- SAP Business One
- Microsoft Dynamics 365 Business Central
- Sage 100
- Lexware/Haufe

**Odoo-Vorteil:** Modular, kosteneffizient, Open Source, flexibel

---

*Prepared by Heimdall | 2026-02-01*
