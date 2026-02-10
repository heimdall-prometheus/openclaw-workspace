# mein-schluessel.de – UserSoft ERP Integration

## Übersicht

Die mein-schluessel.de Shopware 6 Installation ist bidirektional mit dem ERP-System **UserSoft** verbunden. Diese Integration muss bei der Migration zu **Odoo** (Becker Projekt) repliziert werden.

## Architektur

```
┌─────────────┐    CSV/rsync     ┌──────────────┐    rsync/mount    ┌──────────────┐
│  Shopware 6  │ ◄──────────────► │  Hetzner NFS  │ ◄──────────────► │  UserSoft ERP │
│  (Webshop)   │    alle 5 Min    │  (/mnt/)      │                  │  (Becker)     │
└─────────────┘                  └──────────────┘                  └──────────────┘
```

## Datenflüsse

### 1. 📥 UserSoft → Shopware: Lagerbestand-Import

**Richtung:** ERP → Webshop
**Frequenz:** Alle 5 Minuten (Cron)
**Plugin:** `Rdcsvimport6` (von rundum.digital)
**Befehl:** `rd:csv:import:stock <dir> <prefix>`

**Flow:**
1. UserSoft exportiert CSV-Dateien nach NFS-Mount
2. rsync kopiert von `/mnt/shopware-export/ZumShop/` → `/var/www/.../shopware-export/ZumShop/`
3. Shopware CLI-Command liest CSVs und updated Lagerbestände
4. Verarbeitete Dateien werden mit `.done` markiert

**CSV-Format (Lagerbestand):**
```csv
ArtikelNr;Bestand
Silca-HF75R;150
Silca-REN1;200
DOM-DM3X;45
```
- Separator: Semikolon (`;`)
- Spalte 0: `productNumber` (Shopware Artikelnummer)
- Spalte 1: `stock` (Integer Lagerbestand)
- Dateiname-Pattern: `lager{timestamp}.csv`

**Code-Logik:**
1. Öffne Directory, filtere nach Prefix + `.csv`
2. Skip wenn `.done` Marker existiert
3. Für jede Zeile: Suche Produkt per `productNumber`
4. Batch-Update aller Bestände via `productRepository->update()`
5. Setze `.done` Marker

### 2. 📤 Shopware → UserSoft: Bestellungsexport

**Richtung:** Webshop → ERP
**Trigger:** Event `CheckoutOrderPlacedEvent` (bei jeder neuen Bestellung)
**Plugin:** `Rdcsvexport6` (von rundum.digital)
**Sync-Befehl:** `rd:csv:export:sync <destination>`

**Flow:**
1. Kunde bestellt → `CheckoutOrderPlacedSubscriber` feuert
2. Rechnung (PDF) wird automatisch generiert
3. 3 Dateien werden in `order_export/` geschrieben:
   - `{orderNr}_order.csv` – Bestelldaten + Positionen
   - `{orderNr}_customer.csv` – Kundendaten
   - `{orderNr}_rechnung.pdf` – Rechnungs-PDF
4. Cron (`cron_export.sh`) synced alle 5 Min nach NFS
5. rsync → `/mnt/shopware-export/VomShop/`
6. Erfolgreich kopierte Dateien → `synced/VomShop/`

**CSV-Format: Bestellung ({orderNr}_order.csv)**
```csv
"SatzArt";"Belegart";"orderID_Shopware";"BelegNr";"Belegdatum";"KundenNr";"ZahlungsKZ";"BezahltAm";"NettoPreis";"BruttoPreis";"NamePDF";"BezahlStatus";"DokumenteDrucken"
"A";"A";"019c2f...772f";"38105";"2026-02-05";"39731";"PayPal";"2026-02-05 19:54:26";"111.39";"132.6";"38905_rechnung.pdf";"open";""
"B";"Silca-HF75R";"10";"Stk";"0.4";"4";"";"Silca-HF75R";"Silca Rohling HF75R"
"B";"Silca-REN1";"10";"Stk";"0.4";"4";"";"Silca-REN1";"Silca Rohling RENZ REN1"
"V";"VERSAND";"1";"Stk";"0";"0"
```

**Satzarten:**
| SatzArt | Bedeutung | Felder |
|---------|-----------|--------|
| **A** | Auftragsheader | Belegart, OrderID, BelegNr, Datum, KundenNr, Zahlung, Preise, PDF |
| **B** | Bestellposition | ArtikelNr, Menge, Einheit, EPreis, PosPreis, HerstellerNr, Bezeichnung |
| **V** | Versandkosten | ArtikelNr="VERSAND", Menge, Einheit, Preis |

**Bundle-Handling:** Container-Positionen mit `dvsnSetConfigurator=true` und Preis <0.01 werden übersprungen (Issue #339).

**CSV-Format: Kunde ({orderNr}_customer.csv)**
```csv
"KundenNr";"Rechnung_Anrede";"Rechnung_Name";"Rechnung_Firma";"Rechnung_Strasse";"Rechnung_PLZ";"Rechnung_Ort";"Rechnung_TelefonNr";"Liefer_Anrede";"Liefer_Name";"Liefer_Name2";"Liefer_Strasse";"Liefer_PLZ";"Liefer_Ort";"Liefer_TelefonNr";"Email";"MWStPflicht";"ZahlungsKZ";"KundenArt";"registriert";"UStIdNr";"SteuerNr";"Kundengruppe"
"39731";"Keine Angabe";"Pasquale Zongoli";"";"Dachauer Str. 245";"80637";"München";"";"...";"...";"...";"...";"...";"...";"...";"pasquale_94@msn.com";"0";"PayPal";"B2C";"nein";"";"";"Shopkunden"
```

**Felder Kundendaten:**
| Feld | Beschreibung |
|------|-------------|
| KundenNr | Shopware Kundennummer |
| Rechnung_* | Rechnungsadresse (Anrede, Name, Firma, Straße, PLZ, Ort, Telefon) |
| Liefer_* | Lieferadresse (Anrede, Name, Name2/Firma, Straße, PLZ, Ort, Telefon) |
| Email | E-Mail-Adresse |
| MWStPflicht | 0 = brutto, 1 = netto |
| ZahlungsKZ | Zahlungsart (PayPal, Klarna, Amazon Pay, etc.) |
| KundenArt | B2B oder B2C (basierend auf Firmenfeld) |
| registriert | ja/nein (Gastkunde?) |
| UStIdNr | USt-ID wenn vorhanden |
| Kundengruppe | Shopware Kundengruppe |

### 3. 📥 Extern → Shopware: Artikel-Import

**Richtung:** Externer Service → Shopware
**Frequenz:** Alle 5 Minuten (Cron)
**Script:** `cron_artikel.sh`
**Quelle:** `https://artikel.meinschluessel.er-investment.de/Csv/Download`
**Auth:** Basic Auth (rundumdigital:Vokol%Ituqo181)

**Flow:**
1. curl holt CSV von externer URL
2. Datei wird nach `shopware-export/VomShop/artikel.csv` gespeichert
3. Vermutlich von UserSoft oder separatem Service verarbeitet

## Relevanz für Odoo-Migration (Becker Projekt)

### Was Odoo ersetzen muss:

1. **Lagerbestand-Sync:** Odoo → Shopware (statt UserSoft → Shopware)
   - Odoo muss CSV-Dateien im gleichen Format generieren ODER
   - Neues Plugin: Odoo REST API → Shopware Bestandsupdate (besser!)

2. **Bestellungsübergabe:** Shopware → Odoo (statt Shopware → UserSoft)
   - Option A: CSV-Export beibehalten, Odoo importiert CSVs
   - Option B: Neues Plugin mit Odoo API-Anbindung (besser!)
   - Felder: Bestelldaten, Positionen, Kundendaten, Rechnungs-PDF

3. **Artikel-Stammdaten:** Odoo → Shopware
   - Aktuell über externe URL (`artikel.meinschluessel.er-investment.de`)
   - Muss durch Odoo-Artikelexport ersetzt werden

### Empfohlene Odoo-Integration (API-basiert):

```
┌─────────────┐    REST API     ┌──────────────┐
│  Shopware 6  │ ◄────────────► │  Odoo 17     │
│  (Webshop)   │                │  (ERP)       │
└─────────────┘                └──────────────┘

Odoo → Shopware:
- Lagerbestände (Echtzeit oder alle 5 Min)
- Artikeldaten (Preise, Beschreibungen, Bilder)

Shopware → Odoo:
- Bestellungen (Webhook bei Checkout)
- Kundendaten (bei Registrierung/Bestellung)
- Retouren & Stornos
```

### Migrations-Checkliste:

- [ ] Odoo Artikel-Modul mit Shopware-Artikelnummern mappen
- [ ] Odoo Lagerbestand-Export (CSV oder API)
- [ ] Odoo Bestell-Import (CSV oder API)
- [ ] Odoo Kunden-Import (CSV oder API)
- [ ] Odoo Rechnungsgenerierung (statt Shopware-intern)
- [ ] Testlauf: Parallel UserSoft + Odoo (Übergangsphase)
- [ ] UserSoft abschalten, Odoo übernimmt komplett

## Technische Details

### Datei-Pfade auf Server
```
/var/www/vhosts/mein-schluessel.de/
├── shopware-export/
│   ├── ZumShop/          ← UserSoft → Shopware (Lagerbestand CSVs)
│   ├── VomShop/          ← Shopware → UserSoft (Bestell-CSVs, temporär)
│   └── synced/VomShop/   ← Erfolgreich synchronisierte Dateien
├── cron_export.sh        ← Sync-Script (alle 5 Min)
├── cron_artikel.sh       ← Artikel-Download (alle 5 Min)
└── httpdocs_sw6/current/order_export/  ← Bestell-CSVs + Rechnungen
```

### NFS Mount
- `/mnt/shopware-export/` → Vermutlich NFS/SMB Mount zu Becker-Standort
- Bidirektional: ZumShop (ERP→Shop) + VomShop (Shop→ERP)

### Plugins (Quellcode gesichert)
- `Rdcsvimport6` → Autor: rundum.digital
- `Rdcsvexport6` → Autor: rundum.digital
- Backup: `projects/mein-schluessel/backups/2026-02-05/`
