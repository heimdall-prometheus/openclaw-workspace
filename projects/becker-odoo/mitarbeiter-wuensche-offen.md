# Offene Rückfragen — Mitarbeiter-Wünsche
**Stand:** 07.02.2026  
**Bezug:** E-Mail Jenny Friedrich → Uwe Becker → Erik (Februar 2026)

---

## An DKR — Vertrieb

### DKR-1: "Einfache Einsicht der Statistik"
- **Welche Statistik genau?** Umsatz pro Kunde? Marge? Bestellhistorie? Preisvergleich?
- Soll die Statistik direkt im Angebots-Formular eingeblendet werden oder als separater Report?

### DKR-3: "Einfache und intuitive Bedienung"
- **Zu unspezifisch für ein Issue.** Welche Prozesse sind aktuell besonders umständlich?
- Wird als Querschnitts-Anforderung in Schulung/UAT berücksichtigt, aber kein eigenes GitHub-Issue.

---

## An RZO — Monteure & Service

### RZO-2: Mobile App mit Terminplan + Abrechnung
- **Was genau ist ein "Vorgang"?** Projekt? Auftrag? Service-Einsatz? Wartungsvertrag?
- **Welche Endgeräte?** Android / iOS? Firmengeräte oder BYOD?
- **Offline-Fähigkeit nötig?** (Keller, Baustelle ohne Empfang)
- **"Abrechnung":** Automatische Rechnungserstellung aus dem Vorgang? Oder nur Zeiterfassung?

---

## An JDR — Schnittstellen/Technisch

### JDR-7: Oxomi, PIM, DataView
- **Oxomi:** Was wird aktuell davon genutzt? (Kataloge, Datenblätter, Etiketten?)
- **PIM:** Welches PIM-System ist gemeint? Oder soll Odoo selbst als PIM dienen?
- **DataView:** Was genau? Hersteller-Produktdaten? Welche Lieferanten/Hersteller?
- **Generell:** Sind das laufende Systeme die angebunden werden sollen, oder Wünsche für die Zukunft?

### JDR-6: EDI / NORDWEST DataConnect
- **Welche EDI-Formate?** (EDIFACT, OpenTrans, BMEcat, …?)
- **Welche Lieferanten außer NORDWEST** benötigen EDI?
- **NORDWEST DataConnect:** Ist API-Dokumentation vorhanden? Zugangs-Credentials?
- **Umfang:** Nur Katalogdaten-Import oder auch Bestellungen/Rechnungen?

### JDR-5: E-Mail/Outlook/MS365
- **Sind MS365-Lizenzen vorhanden?** Wenn ja, welcher Plan?
- **Wer verwaltet DNS?** (für SPF/DKIM/DMARC-Konfiguration)
- **Dezentral vs. zentral:** Soll jeder Mitarbeiter seinen eigenen Posteingang haben oder gibt es zentrale Adressen?
- **Budget für ggf. fehlende Lizenzen?**

### JDR-11: eBay Modul
- **Wird eBay aktuell aktiv genutzt?** Wenn ja, welches Umsatzvolumen?
- **Umfang:** Nur Produktlistung? Oder auch Bestellimport, Bestandsabgleich?
- **Wie viele Artikel** sollen auf eBay gelistet werden?

### JDR-12: Shopware Schnittstelle
- **Ist Shopware aktuell im Einsatz?** Welche Version?
- **Oder nur Interesse** an einer möglichen Anbindung?
- **Falls ja:** Welche Daten sollen synchronisiert werden? (Produkte, Bestände, Bestellungen, Kunden)

### JDR-13: WhatsApp Business Integration
- **Wofür genau?** Kundenkommunikation? Monteur-Benachrichtigungen? Marketing?
- **⚠️ DSGVO:** Muss mit dem DSB (Jenny Friedrich?) abgestimmt werden!
- **Nativer WhatsApp-Connector = Enterprise-only!** Custom API-Integration möglich, aber aufwändig.

### JDR-9: Helpdesk Modul
- **Wofür?** Kunden-Reklamationen? Interner IT-Support? Monteur-Rückmeldungen?
- **Wie viele Tickets/Monat** erwartbar?
- **⚠️ Enterprise-only!** Alternative: OCA `helpdesk_mgmt`

### JDR-14: POS SumUp
- **Welches SumUp-Gerät?** (Air, Solo, Solo Printer?)
- **Wie viele Standorte/Kassen?**
- **Aktuell SumUp im Einsatz oder geplant?**

---

## 🔴 Enterprise-Blocker — Klärung nötig

Diese 3 Wünsche benötigen **Enterprise Edition** (oder teure Custom-Alternativen):

| Wunsch | Enterprise Feature | Community-Alternative | Aufwand Alternative |
|--------|-------------------|----------------------|-------------------|
| Odoo Studio | Studio App | Custom Module Dev via Code | Hoch (pro Anpassung) |
| Helpdesk | Helpdesk Modul | OCA `helpdesk_mgmt` | Mittel |
| WhatsApp | WhatsApp Modul | Custom API (Meta Business API) | Hoch |

**→ Empfehlung:** Mit Becker klären ob Enterprise-Upgrade für diese 3 Features wirtschaftlich sinnvoller wäre als Custom-Entwicklung. Kostenvergleich erstellen.

---

## Nächster Schritt

**Workshop/Meeting mit Mitarbeitern einplanen** um alle offenen Fragen zu klären.  
Idealerweise JDR persönlich befragen — die meisten offenen Punkte kommen von den Schnittstellen-Wünschen.

---

*Erstellt: 07.02.2026 | Heimdall*
