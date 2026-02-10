# Mitarbeiter-Wünsche — Analyse & GitHub Issues
**Datum:** 06.02.2026  
**Quelle:** E-Mail Jenny Friedrich (DSB) → Uwe Becker → Erik  
**Analyse:** Heimdall  
**Odoo Edition:** Community 17.0

---

## 📊 Zusammenfassung

| Mitarbeiter | Wünsche | Issues erstellt | Rückfrage nötig | Enterprise-Blocker |
|-------------|---------|-----------------|-----------------|-------------------|
| **NKE** | 5 | 5 (2 merged mit DKR) | 0 | 0 |
| **DKR** | 5 | 4 (2 merged mit NKE) | 1 (Bedienung) | 0 |
| **RZO** | 5 | 5 | 1 (Mobile App) | 0 |
| **JDR** | 16 | 14 | 9 | 3 (Studio, Helpdesk, WhatsApp) |
| **GESAMT** | **31** | **26 Issues** | **11 Rückfragen** | **3 Enterprise-only** |

### Doppelnennungen (zusammengeführt):
- **Aktuelle Preise** → NKE + DKR → Issue #9
- **Zwischensummen** → NKE + DKR → Issue #10

---

## 👤 NKE — Stammdaten & Vertrieb

### NKE-1: Keine doppelten Artikel
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | Community: Basis-Constraints nativ, Fuzzy-Match via OCA |
| **Complexity** | Mittel |
| **Milestone** | M1: Basis-Setup & Stammdaten |
| **GitHub Issue** | [#6](https://github.com/becker-sicherheit/odoo/issues/6) |

### NKE-2: Eindeutige Kundennummern
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | Community: Sequenzen + Merge nativ |
| **Complexity** | Mittel |
| **Milestone** | M1: Basis-Setup & Stammdaten |
| **GitHub Issue** | [#7](https://github.com/becker-sicherheit/odoo/issues/7) |

### NKE-3: Lager- vs. Beschaffungsartikel korrekt
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | Community: 100% nativ (Produkttypen, Routen) |
| **Complexity** | Niedrig (Konfiguration + Schulung) |
| **Milestone** | M1: Basis-Setup & Stammdaten |
| **GitHub Issue** | [#8](https://github.com/becker-sicherheit/odoo/issues/8) |

### NKE-4: Aktuelle Preise!! (= DKR-4)
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar (doppelt genannt!) |
| **Feasibility** | Community: Preislisten nativ, Lieferanten-Import nativ, Historie → OCA/Custom |
| **Complexity** | Mittel bis Hoch |
| **Milestone** | M2: Vertrieb & Angebote |
| **GitHub Issue** | [#9](https://github.com/becker-sicherheit/odoo/issues/9) |

### NKE-5: Automatische Zwischensummen (= DKR-5)
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar (doppelt genannt!) |
| **Feasibility** | Community: Sections nativ, Zwischensummen → OCA-Modul |
| **Complexity** | Niedrig-Mittel |
| **Milestone** | M2: Vertrieb & Angebote |
| **GitHub Issue** | [#10](https://github.com/becker-sicherheit/odoo/issues/10) |

---

## 👤 DKR — Vertrieb & Angebote

### DKR-1: Statistik bei Angebotserstellung
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ⚠️ Mittel (welche Statistik genau?) |
| **Feasibility** | Community: Basis-Reports nativ, Inline-Widget → Custom |
| **Complexity** | Mittel |
| **Milestone** | M2: Vertrieb & Angebote |
| **GitHub Issue** | [#11](https://github.com/becker-sicherheit/odoo/issues/11) |

### DKR-2: Produktbilder in Angeboten
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | Community: QWeb Template Anpassung oder OCA-Modul |
| **Complexity** | Niedrig |
| **Milestone** | M2: Vertrieb & Angebote |
| **GitHub Issue** | [#12](https://github.com/becker-sicherheit/odoo/issues/12) |

### DKR-3: Einfache und intuitive Bedienung
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ❌ Zu unspezifisch für ein Issue |
| **Feasibility** | Allgemeines UX-Ziel — durchzieht alle Module |
| **Complexity** | N/A |
| **Milestone** | Alle |
| **Aktion** | 📝 Notiz — als Querschnitts-Anforderung in allen Schulungen/Tests beachten |

> **Notiz:** "Einfache Bedienung" ist kein einzelnes Feature sondern ein Qualitätsziel. Wird berücksichtigt bei:
> - UI-Anpassungen (vereinfachte Formulare)
> - Schulungskonzept
> - User Acceptance Testing
> - Rollenzugeschnittene Menüs (nur relevante Module sichtbar)

### DKR-4: Ständig aktuelle Preise → siehe NKE-4, Issue #9
### DKR-5: Zwischensummen/Kumulierung → siehe NKE-5, Issue #10

---

## 👤 RZO — Projektmanagement & Monteur-Service

### RZO-1: Zentrales Vorgangs-Management
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar — beschreibt den Kernprozess |
| **Feasibility** | Community: Analytic Accounts + Projekt als Hub → nativ, ergänzt um Custom Views |
| **Complexity** | Hoch |
| **Milestone** | M4: Projektmanagement & Nachkalkulation |
| **GitHub Issue** | [#13](https://github.com/becker-sicherheit/odoo/issues/13) |

### RZO-2: Mobile App mit Terminplan + Abrechnung
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ⚠️ Mittel — "Vorgang" muss definiert werden |
| **Feasibility** | Community: Responsive Web ja, native App nein, Field Service → Enterprise-only |
| **Complexity** | Hoch bis Sehr hoch |
| **Milestone** | M8: Monteure & Service |
| **GitHub Issue** | [#14](https://github.com/becker-sicherheit/odoo/issues/14) |

### RZO-3: Vorgangs-Statusübersicht (Pipeline)
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar — Kanban/Pipeline gewünscht |
| **Feasibility** | Community: CRM-Pipeline oder Projekt-Kanban → nativ |
| **Complexity** | Niedrig-Mittel (Konfiguration) |
| **Milestone** | M4: Projektmanagement & Nachkalkulation |
| **GitHub Issue** | [#15](https://github.com/becker-sicherheit/odoo/issues/15) |

### RZO-4: Mobile Material + Unterschrift + Lieferschein
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar — sehr konkreter Workflow beschrieben |
| **Feasibility** | Community: Teilweise nativ (Barcode, Mail), Signatur & Mobile → Custom |
| **Complexity** | Hoch |
| **Milestone** | M8: Monteure & Service |
| **GitHub Issue** | [#16](https://github.com/becker-sicherheit/odoo/issues/16) |

### RZO-5: Reklamationen/Wareneingang verknüpft mit Auftrag
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | Community: Großteils nativ (Analytic Accounts, Returns) |
| **Complexity** | Mittel |
| **Milestone** | M3: Einkauf & Beschaffung |
| **GitHub Issue** | [#17](https://github.com/becker-sicherheit/odoo/issues/17) |

---

## 👤 JDR — Schnittstellen & Integrationen

### JDR-1: X-Rechnung Modul ⚡ GESETZLICH
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar — gesetzliche Pflicht |
| **Feasibility** | Community: OCA-Module verfügbar |
| **Complexity** | Mittel |
| **Milestone** | M7: Buchhaltung & Finanzen |
| **GitHub Issue** | [#18](https://github.com/becker-sicherheit/odoo/issues/18) |

### JDR-2: QR-Codes auf Rechnungen
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | Community: EPC QR → nativ in Odoo 17! |
| **Complexity** | Niedrig |
| **Milestone** | M7: Buchhaltung & Finanzen |
| **GitHub Issue** | [#19](https://github.com/becker-sicherheit/odoo/issues/19) |

### JDR-3: DHL / GLS Anbindung
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | Community: OCA/Drittanbieter-Module, delivery Framework nativ |
| **Complexity** | Mittel |
| **Milestone** | M6: Lager & Bestandsführung |
| **GitHub Issue** | [#20](https://github.com/becker-sicherheit/odoo/issues/20) |

### JDR-4: Barcode Operations
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | ⚠️ Vollwertige Barcode-App = Enterprise! OCA-Alternative verfügbar |
| **Complexity** | Mittel |
| **Milestone** | M6: Lager & Bestandsführung |
| **GitHub Issue** | [#21](https://github.com/becker-sicherheit/odoo/issues/21) |

### JDR-5: E-Mail/Outlook Integration
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ⚠️ Viele offene Fragen (Lizenzen, Infrastruktur) |
| **Feasibility** | Community: SMTP nativ, Outlook Plugin → Enterprise-only |
| **Complexity** | Mittel |
| **Milestone** | M5: CRM & Kundenakte |
| **GitHub Issue** | [#22](https://github.com/becker-sicherheit/odoo/issues/22) |

### JDR-6: EDI / NORDWEST DataConnect
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ❌ Unklar — Formate, Umfang, Provider? |
| **Feasibility** | Community: OCA-Basis, aber Custom Dev für NORDWEST |
| **Complexity** | Sehr hoch |
| **Milestone** | M9: Schnittstellen & Custom |
| **GitHub Issue** | [#23](https://github.com/becker-sicherheit/odoo/issues/23) |

### JDR-7: Oxomi / PIM / DataView
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ❌ Unklar — nur Stichworte, kein konkreter Use Case |
| **Feasibility** | Custom Integration (API) |
| **Complexity** | Unklar |
| **Milestone** | M9: Schnittstellen & Custom |
| **GitHub Issue** | [#24](https://github.com/becker-sicherheit/odoo/issues/24) |

### JDR-8: Integrierter WebShop
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ⚠️ Mittel — Zielgruppe klar, Umfang unklar |
| **Feasibility** | Community: eCommerce-Modul nativ vorhanden! |
| **Complexity** | Hoch |
| **Milestone** | M9: Schnittstellen & Custom |
| **GitHub Issue** | [#25](https://github.com/becker-sicherheit/odoo/issues/25) |

### JDR-9: Helpdesk Modul 🔴 ENTERPRISE
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ⚠️ Mittel — Wofür genau? |
| **Feasibility** | ⚠️ ENTERPRISE-ONLY! Alternative: OCA `helpdesk_mgmt` |
| **Complexity** | Mittel |
| **Milestone** | M9: Schnittstellen & Custom |
| **GitHub Issue** | [#26](https://github.com/becker-sicherheit/odoo/issues/26) |

### JDR-10: Odoo Studio 🔴 ENTERPRISE
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar — will No-Code Anpassungen |
| **Feasibility** | ❌ ENTERPRISE-ONLY! Kein Community-Equivalent |
| **Complexity** | N/A |
| **Milestone** | M9: Schnittstellen & Custom |
| **GitHub Issue** | [#27](https://github.com/becker-sicherheit/odoo/issues/27) |

### JDR-11: eBay Modul
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ⚠️ Unklar — Umfang? |
| **Feasibility** | Community: Drittanbieter/Custom, natives Modul → Enterprise-nah |
| **Complexity** | Hoch |
| **Milestone** | M9: Schnittstellen & Custom |
| **GitHub Issue** | [#28](https://github.com/becker-sicherheit/odoo/issues/28) |

### JDR-12: Shopware Schnittstelle
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ⚠️ Unklar — Ist Shopware überhaupt im Einsatz? |
| **Feasibility** | Custom oder Drittanbieter-Connector |
| **Complexity** | Hoch bis Sehr hoch |
| **Milestone** | M9: Schnittstellen & Custom |
| **GitHub Issue** | [#29](https://github.com/becker-sicherheit/odoo/issues/29) |

### JDR-13: WhatsApp Business 🔴 ENTERPRISE-NAH
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ⚠️ Unklar — Use Case? |
| **Feasibility** | ⚠️ Natives Modul Enterprise-only, Custom API möglich |
| **Complexity** | Hoch |
| **Milestone** | M9: Schnittstellen & Custom |
| **GitHub Issue** | [#30](https://github.com/becker-sicherheit/odoo/issues/30) |

### JDR-14: POS SumUp Integration
| Aspekt | Bewertung |
|--------|-----------|
| **Klarheit** | ✅ Klar |
| **Feasibility** | Community: POS nativ, SumUp → Custom Payment Provider |
| **Complexity** | Mittel |
| **Milestone** | M2: Vertrieb & Angebote |
| **GitHub Issue** | [#31](https://github.com/becker-sicherheit/odoo/issues/31) |

---

## 🔴 Enterprise-Only Blocker

Folgende Wünsche sind in **Odoo Community 17 NICHT nativ** möglich:

| Wunsch | Enterprise Feature | Community Alternative |
|--------|-------------------|----------------------|
| Odoo Studio | Studio App | Custom Module Development (CI/CD) |
| Helpdesk | Helpdesk Modul | OCA `helpdesk_mgmt` |
| WhatsApp | WhatsApp Modul | Custom API Integration |
| Barcode App (voll) | Barcode App | OCA `stock_barcodes` |
| Outlook Plugin | mail_plugin_outlook | SMTP Integration |
| Field Service | field_service | Custom Mobile Views |

**→ Empfehlung:** Alle durch OCA-Module oder Custom Dev lösbar. Enterprise-Upgrade ist NICHT nötig.

---

## 📌 Rückfragen sammeln (für nächstes Meeting)

### An NKE:
- (keine offenen Fragen)

### An DKR:
- Was genau bedeutet "einfache Bedienung"? Welche Prozesse sind aktuell umständlich?
- Welche Statistiken genau bei der Angebotserstellung? (Umsatz, Marge, Historie?)

### An RZO:
- Definition "Vorgang": Ist das ein Projekt? Ein Auftrag? Ein Service-Einsatz?
- Mobile: Welche Geräte? Android/iOS? Firmengeräte oder BYOD?
- Offline-Fähigkeit nötig? (Keller/Baustelle)

### An JDR:
- Oxomi: Was wird aktuell genutzt?
- PIM: Welches System? Oder soll Odoo das PIM sein?
- DataView: Was genau? Produkt/Hersteller?
- EDI: Welche Formate? Welche Lieferanten?
- NORDWEST DataConnect: API-Doku vorhanden?
- E-Mail: MS365 Lizenzen vorhanden? DNS-Verwaltung?
- eBay: Aktuell im Einsatz? Umsatzvolumen?
- Shopware: Im Einsatz oder nur Interesse?
- WhatsApp: Wofür genau? DSGVO mit DSB klären!
- Helpdesk: Wofür? (Kunden-Reklamationen? Interner Support?)
- SumUp: Welches Gerät? Wie viele Standorte?

---

## 📈 Milestone-Verteilung der Issues

| Milestone | Issues | Nummern |
|-----------|--------|---------|
| **M1:** Basis-Setup & Stammdaten | 3 | #6, #7, #8 |
| **M2:** Vertrieb & Angebote | 4 | #9, #10, #11, #12, #31 |
| **M3:** Einkauf & Beschaffung | 1 | #17 |
| **M4:** Projektmanagement | 2 | #13, #15 |
| **M5:** CRM & Kundenakte | 1 | #22 |
| **M6:** Lager & Bestandsführung | 2 | #20, #21 |
| **M7:** Buchhaltung & Finanzen | 2 | #18, #19 |
| **M8:** Monteure & Service | 2 | #14, #16 |
| **M9:** Schnittstellen & Custom | 8 | #23-#30 |

---

*Erstellt: 06.02.2026 16:xx UTC | Heimdall*
*Für: Erik Reisig / C-LED GmbH*
