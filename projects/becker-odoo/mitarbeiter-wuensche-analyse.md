# Mitarbeiter-Wünsche — Zusammenfassung & Analyse
**Stand:** 07.02.2026  
**Quelle:** E-Mail Jenny Friedrich (DSB) → Uwe Becker → Erik  
**Odoo Edition:** Community 17.0  
**Repo:** `becker-sicherheit/odoo`

---

## 📊 Gesamtübersicht

| Kennzahl | Wert |
|----------|------|
| **Mitarbeiter befragt** | 4 (NKE, DKR, RZO, JDR) |
| **Wünsche gesamt** | 31 |
| **GitHub Issues erstellt** | 26 (Issues #6–#31) |
| **Doppelnennungen zusammengeführt** | 2 (Preise, Zwischensummen) |
| **Nicht als Issue (zu unspezifisch)** | 1 (DKR: "einfache Bedienung") |
| **Rückfragen offen** | 11 |
| **Enterprise-only Blocker** | 3 (Studio, Helpdesk, WhatsApp) |

---

## 🏷️ Issues nach Mitarbeiter

### NKE — Stammdaten & Vertrieb (5 Wünsche → 5 Issues)
| # | Wunsch | Issue | Complexity | Status |
|---|--------|-------|-----------|--------|
| 1 | Keine doppelten Artikel | [#6](https://github.com/becker-sicherheit/odoo/issues/6) | Mittel | ✅ Klar |
| 2 | Eindeutige Kundennummern | [#7](https://github.com/becker-sicherheit/odoo/issues/7) | Mittel | ✅ Klar |
| 3 | Lager-/Beschaffungsartikel korrekt | [#8](https://github.com/becker-sicherheit/odoo/issues/8) | Niedrig | ✅ Klar |
| 4 | Aktuelle Preise | [#9](https://github.com/becker-sicherheit/odoo/issues/9) | Mittel-Hoch | ✅ (=DKR-4) |
| 5 | Zwischensummen | [#10](https://github.com/becker-sicherheit/odoo/issues/10) | Niedrig-Mittel | ✅ (=DKR-5) |

### DKR — Vertrieb & Angebote (5 Wünsche → 4 Issues)
| # | Wunsch | Issue | Complexity | Status |
|---|--------|-------|-----------|--------|
| 1 | Statistik bei Angeboten | [#11](https://github.com/becker-sicherheit/odoo/issues/11) | Mittel | ⚠️ Rückfrage |
| 2 | Produktbilder in Angeboten | [#12](https://github.com/becker-sicherheit/odoo/issues/12) | Niedrig | ✅ Klar |
| 3 | Einfache Bedienung | — | N/A | ❌ Zu unspezifisch |
| 4 | Aktuelle Preise | → #9 | — | Zusammengeführt |
| 5 | Zwischensummen/Kumulierung | → #10 | — | Zusammengeführt |

### RZO — Monteure & Service (5 Wünsche → 5 Issues)
| # | Wunsch | Issue | Complexity | Status |
|---|--------|-------|-----------|--------|
| 1 | Vorgangs-Management | [#13](https://github.com/becker-sicherheit/odoo/issues/13) | Hoch | ✅ Klar |
| 2 | Mobile App + Terminplan | [#14](https://github.com/becker-sicherheit/odoo/issues/14) | Hoch-Sehr hoch | ⚠️ Rückfrage |
| 3 | Vorgangs-Statusübersicht | [#15](https://github.com/becker-sicherheit/odoo/issues/15) | Niedrig-Mittel | ✅ Klar |
| 4 | Mobile Material + Unterschrift | [#16](https://github.com/becker-sicherheit/odoo/issues/16) | Hoch | ✅ Klar |
| 5 | Reklamationen/Wareneingang | [#17](https://github.com/becker-sicherheit/odoo/issues/17) | Mittel | ✅ Klar |

### JDR — Schnittstellen & Technik (16 Wünsche → 14 Issues)
| # | Wunsch | Issue | Complexity | Status |
|---|--------|-------|-----------|--------|
| 1 | X-Rechnung | [#18](https://github.com/becker-sicherheit/odoo/issues/18) | Mittel | ✅ Gesetzlich! |
| 2 | QR-Codes Rechnungen | [#19](https://github.com/becker-sicherheit/odoo/issues/19) | Niedrig | ✅ Nativ! |
| 3 | DHL/GLS Anbindung | [#20](https://github.com/becker-sicherheit/odoo/issues/20) | Mittel | ✅ OCA-Module |
| 4 | Barcode Operations | [#21](https://github.com/becker-sicherheit/odoo/issues/21) | Mittel | ⚠️ Enterprise-nah |
| 5 | E-Mail/Outlook/MS365 | [#22](https://github.com/becker-sicherheit/odoo/issues/22) | Mittel | ⚠️ Rückfrage |
| 6 | EDI/NORDWEST DataConnect | [#23](https://github.com/becker-sicherheit/odoo/issues/23) | Sehr hoch | ⚠️ Rückfrage |
| 7 | Oxomi/PIM/DataView | [#24](https://github.com/becker-sicherheit/odoo/issues/24) | Unklar | ⚠️ Rückfrage |
| 8 | Integrierter WebShop | [#25](https://github.com/becker-sicherheit/odoo/issues/25) | Hoch | ⚠️ Rückfrage |
| 9 | Helpdesk | [#26](https://github.com/becker-sicherheit/odoo/issues/26) | Mittel | 🔴 Enterprise |
| 10 | Odoo Studio | [#27](https://github.com/becker-sicherheit/odoo/issues/27) | N/A | 🔴 Enterprise |
| 11 | eBay Modul | [#28](https://github.com/becker-sicherheit/odoo/issues/28) | Hoch | ⚠️ Rückfrage |
| 12 | Shopware | [#29](https://github.com/becker-sicherheit/odoo/issues/29) | Hoch-Sehr hoch | ⚠️ Rückfrage |
| 13 | WhatsApp Business | [#30](https://github.com/becker-sicherheit/odoo/issues/30) | Hoch | 🔴 Enterprise |
| 14 | POS SumUp | [#31](https://github.com/becker-sicherheit/odoo/issues/31) | Mittel | ⚠️ Rückfrage |

---

## 📈 Complexity-Verteilung

```
Niedrig:         ████ 4 Issues (QR, Bilder, Artikelkonf., Statusübersicht)
Niedrig-Mittel:  ██ 2 Issues (Zwischensummen, Pipeline)
Mittel:          ████████ 8 Issues
Mittel-Hoch:     █ 1 Issue (Preisaktualisierung)
Hoch:            ██████ 6 Issues
Sehr Hoch:       █ 1 Issue (EDI/NORDWEST)
Unklar:          █ 1 Issue (Oxomi/PIM)
N/A:             █ 1 Issue (Studio = Enterprise)
```

---

## 🎯 Empfehlungen

### 1. Quick Wins (Niedrig/Niedrig-Mittel → sofort umsetzbar)
- **#19** QR-Codes → nativ in Odoo 17, nur aktivieren
- **#12** Produktbilder in Angeboten → QWeb-Template oder OCA-Modul
- **#8** Lager-/Beschaffungsartikel → Konfiguration + Schulung
- **#15** Statusübersicht → Kanban/Pipeline nativ vorhanden

### 2. Kernprozess-Wünsche (Hoch → Workshop planen)
- **#13, #14, #16** — RZO's Monteur-Workflow ist der **komplexeste Block**
- Benötigt Prozess-Workshop mit RZO um den genauen Ablauf zu definieren
- Evtl. Custom Module für Field Service (Enterprise-Replacement)

### 3. Enterprise-Blocker klären
- **Studio (#27):** Kein Ersatz in Community → Custom Dev nötig, pro Anpassung
- **Helpdesk (#26):** OCA `helpdesk_mgmt` ist guter Ersatz
- **WhatsApp (#30):** Meta Business API custom möglich, aber aufwändig + DSGVO!
- **→ Kostenvergleich:** Enterprise-Upgrade vs. Community + Custom berechnen

### 4. Schnittstellen priorisieren
JDR hat 14 Schnittstellen-Wünsche! Davon:
- **Must-have:** X-Rechnung (gesetzlich), E-Mail, QR-Codes
- **Should-have:** DHL/GLS, Barcode, EDI/NORDWEST
- **Nice-to-have:** eBay, Shopware, WebShop, Oxomi/PIM
- **Klärungsbedarf:** Fast alle → Workshop mit JDR nötig

### 5. Nächste Schritte
1. **Rückfragen klären** → Meeting mit NKE, DKR, RZO, JDR (siehe `mitarbeiter-wuensche-offen.md`)
2. **Milestone-Zuordnung** → Issues den bestehenden Milestones zuweisen
3. **Aufwandschätzung aktualisieren** → Diese 26 Issues in die Gesamtkalkulation einarbeiten
4. **Enterprise vs. Community Entscheidung** → Kostenvergleich für Becker erstellen

---

## 📋 Labels im Repo

| Label | Anzahl Issues |
|-------|--------------|
| `mitarbeiter-wunsch` | 26 |
| `enhancement` | 18 |
| `needs-clarification` | 11 |
| `schnittstelle` | 9 |
| `vertrieb` | 4 |
| `lager` | 4 |
| `stammdaten` | 3 |
| `enterprise-only` | 3 |
| `community-module` | 4 |
| `buchhaltung` | 2 |
| `monteur` | 2 |
| `einkauf` | 2 |
| `question` | 6 |
| `custom-dev` | 1 |

---

## 📁 Zugehörige Dateien

- `mitarbeiter-wuensche-2026-02.md` — Detaillierte Analyse jedes einzelnen Wunsches
- `mitarbeiter-wuensche-offen.md` — Offene Rückfragen an Mitarbeiter
- `mitarbeiter-wuensche-analyse.md` — Diese Zusammenfassung

---

*Erstellt: 07.02.2026 | Heimdall*  
*Für: Erik Reisig / C-LED GmbH*
