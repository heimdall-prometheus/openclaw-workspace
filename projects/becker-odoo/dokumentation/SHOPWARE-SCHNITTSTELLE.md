# Odoo ↔ Shopware 6 Schnittstelle

## Kontext

mein-schluessel.de ist ein Joint Venture von Erik Reisig (22,5%) und Uwe Becker / Becker Sicherheitstechnik GmbH (77,5%). Der Shopware 6 Online-Shop (www.mein-schluessel.de) ist aktuell über CSV-Dateien mit dem ERP-System **UserSoft** verbunden.

**Ziel:** UserSoft wird durch **Odoo 17** (Becker Projekt) ersetzt. Odoo muss alle bestehenden Datenflüsse zwischen ERP und Shopware 6 übernehmen.

## Aktuelle Architektur (UserSoft)

```
┌─────────────────┐    CSV/rsync (5 Min)    ┌──────────────┐    NFS Mount    ┌──────────────┐
│  Shopware 6.6.9 │ ◄─────────────────────► │  Hetzner NFS │ ◄────────────► │  UserSoft ERP │
│  (mein-schluessel│    bidirektional         │  (/mnt/)     │                │  (Becker)     │
│  .de)            │                          └──────────────┘                └──────────────┘
└─────────────────┘
     Port 3307 MySQL
     Port 9020 OpenSearch
     Plesk, PHP 8.2
```

## Ziel-Architektur (Odoo)

```
┌─────────────────┐    REST API / XML-RPC    ┌──────────────┐
│  Shopware 6.6.9 │ ◄──────────────────────► │  Odoo 17     │
│  (mein-schluessel│                           │  (Becker)    │
│  .de)            │                           │  100.71.171.30│
└─────────────────┘                           └──────────────┘
     116.202.162.231                            Tailscale VPN
```

**Empfehlung:** API-basierte Integration statt CSV. Moderner, Echtzeit-fähig, weniger fehleranfällig.

---

## Datenfluss 1: Lagerbestand (ERP → Shopware)

### Aktuell (UserSoft)
- **Plugin:** `Rdcsvimport6` (Autor: rundum.digital)
- **Frequenz:** Alle 5 Minuten (Cron)
- **Transport:** NFS Mount → rsync → lokales Verzeichnis
- **Befehl:** `rd:csv:import:stock /path/to/ZumShop lager`

### CSV-Format
```
ArtikelNr;Bestand
Silca-HF75R;150
DOM-DM3X;45
```
- **Separator:** Semikolon (`;`)
- **Spalte 0:** Shopware `productNumber`
- **Spalte 1:** Lagerbestand (Integer)
- **Dateiname:** `lager{YYYYMMDDHHmmss}.csv`
- **Verarbeitung:** `.done` Marker nach Import

### Logik
1. Verzeichnis scannen nach Dateien mit Prefix `lager` + Extension `.csv`
2. `.done` Dateien überspringen
3. Für jede CSV-Zeile: Produkt per `productNumber` suchen
4. Batch-Update via Shopware DAL (`productRepository->update()`)
5. `.done` Marker setzen

### Odoo-Implementierung (Optionen)

**Option A: CSV-Kompatibel (schnellste Migration)**
- Odoo Custom Module: Lagerbestand-Export als CSV im gleichen Format
- Cron in Odoo: Alle 5 Min CSV generieren
- Transport: Tailscale + rsync (oder SFTP)
- Vorteil: Kein Shopware-Plugin-Umbau nötig
- Nachteil: Nicht Echtzeit, Fehleranfällig

**Option B: Shopware Admin API (empfohlen)**
- Odoo Custom Module: REST-Client für Shopware 6 Admin API
- Endpoint: `PATCH /api/product/{id}` mit `{"stock": 150}`
- Auth: OAuth2 (Integration in Shopware Admin)
- Trigger: Odoo Stock Move Webhook oder Cron
- Vorteil: Echtzeit möglich, kein Dateisystem nötig
- Nachteil: Neues Odoo-Modul erforderlich

**Option C: Shopware Store API + Custom Endpoint**
- Custom Shopware-Plugin mit API-Endpoint für Batch-Stock-Updates
- Odoo sendet JSON-Array: `[{"productNumber": "X", "stock": 150}, ...]`
- Vorteil: Effizient (ein Request statt N)
- Nachteil: Beide Seiten brauchen Custom Code

### Mapping-Anforderung
| UserSoft Feld | Shopware Feld | Odoo Feld |
|---------------|--------------|-----------|
| ArtikelNr | `product.productNumber` | `product.default_code` oder Custom |
| Bestand | `product.stock` | `product.qty_available` |

**KRITISCH:** Artikelnummern müssen 1:1 matchen! Odoo muss die gleichen Artikelnummern wie Shopware verwenden.

---

## Datenfluss 2: Bestellungen (Shopware → ERP)

### Aktuell (UserSoft)
- **Plugin:** `Rdcsvexport6` (Autor: rundum.digital)
- **Trigger:** `CheckoutOrderPlacedEvent` (bei jeder Bestellung)
- **Sync:** Cron alle 5 Min (`rd:csv:export:sync`)
- **Transport:** Lokales Verzeichnis → rsync → NFS Mount

### Erzeugte Dateien pro Bestellung

#### {orderNr}_order.csv – Bestelldaten

**Header (SatzArt "A"):**
| Feld | Typ | Beschreibung | Beispiel |
|------|-----|-------------|---------|
| SatzArt | String | "A" = Auftragsheader | "A" |
| Belegart | String | Immer "A" | "A" |
| orderID_Shopware | UUID | Shopware Order ID | "019c2f5e..." |
| BelegNr | String | Rechnungsnummer | "38105" |
| Belegdatum | Date | YYYY-MM-DD | "2026-02-05" |
| KundenNr | String | Shopware Kundennummer | "39731" |
| ZahlungsKZ | String | Zahlungsart | "PayPal" |
| BezahltAm | DateTime | YYYY-MM-DD HH:mm:ss | "2026-02-05 19:54:26" |
| NettoPreis | Decimal | Netto Gesamtbetrag | 111.39 |
| BruttoPreis | Decimal | Brutto Gesamtbetrag | 132.60 |
| NamePDF | String | Rechnungs-PDF Dateiname | "38905_rechnung.pdf" |
| BezahlStatus | String | Zahlungsstatus | "open" / "paid" |
| DokumenteDrucken | String | Custom Field | "" |

**Positionen (SatzArt "B"):**
| Feld | Typ | Beschreibung | Beispiel |
|------|-----|-------------|---------|
| SatzArt | String | "B" = Bestellposition | "B" |
| ArtikelNr | String | Shopware productNumber | "Silca-HF75R" |
| Menge | Integer | Bestellmenge | 10 |
| Mengeneinheit | String | Immer "Stk" | "Stk" |
| EPreis | Decimal | Einzelpreis | 0.40 |
| PosPreis | Decimal | Positionspreis | 4.00 |
| HerstellerNr | String | Manufacturer Number | "" |
| VariantenArtikel | String | = productNumber | "Silca-HF75R" |
| Bezeichnung | String | Artikelname | "Silca Rohling HF75R" |

**Versand (SatzArt "V"):**
| Feld | Typ | Beschreibung | Beispiel |
|------|-----|-------------|---------|
| SatzArt | String | "V" = Versandkosten | "V" |
| ArtikelNr | String | Immer "VERSAND" | "VERSAND" |
| Menge | Integer | Immer 1 | 1 |
| Mengeneinheit | String | "Stk" | "Stk" |
| EPreis | Decimal | Versandkosten | 5.90 |
| PosPreis | Decimal | = EPreis | 5.90 |

**Sonderregel:** Bundle-Container mit `dvsnSetConfigurator=true` und `totalPrice < 0.01` werden übersprungen (Shopware Bundle-Plugin Eigenart).

#### {orderNr}_customer.csv – Kundendaten

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| KundenNr | String | Shopware Kundennummer |
| Rechnung_Anrede | String | "Herr", "Frau", "Keine Angabe" |
| Rechnung_Name | String | Vorname + Nachname |
| Rechnung_Firma | String | Firmenname (leer bei B2C) |
| Rechnung_Strasse | String | Straße + Hausnummer |
| Rechnung_PLZ | String | Postleitzahl |
| Rechnung_Ort | String | Stadt |
| Rechnung_TelefonNr | String | Telefon |
| Liefer_Anrede | String | Lieferadresse Anrede |
| Liefer_Name | String | Lieferadresse Name |
| Liefer_Name2 | String | Firma (Lieferadresse) |
| Liefer_Strasse | String | Lieferadresse Straße |
| Liefer_PLZ | String | Lieferadresse PLZ |
| Liefer_Ort | String | Lieferadresse Stadt |
| Liefer_TelefonNr | String | Lieferadresse Telefon |
| Email | String | E-Mail-Adresse |
| MWStPflicht | Int | 0 = Brutto, 1 = Netto |
| ZahlungsKZ | String | Zahlungsart |
| KundenArt | String | "B2B" oder "B2C" |
| registriert | String | "ja" oder "nein" (Gastkunde) |
| UStIdNr | String | USt-ID (falls vorhanden) |
| SteuerNr | String | Steuernummer |
| Kundengruppe | String | "Shopkunden", "Händler", etc. |

#### {orderNr}_rechnung.pdf – Rechnungsdokument
- Automatisch generiert via Shopware Document Generator
- Format: Shopware Standard-Rechnung
- Wird mit Order-CSV zusammen übertragen

### Odoo-Implementierung (Optionen)

**Option A: CSV-Kompatibel**
- Odoo Custom Module: CSV-Importer im UserSoft-Format
- Gleicher rsync/NFS Mechanismus
- Vorteil: Kein Shopware-Änderung
- Nachteil: Veraltet

**Option B: Shopware Webhook → Odoo API (empfohlen)**
- Shopware Flow Builder: Bei Bestellung → Webhook an Odoo
- Odoo REST Endpoint empfängt Order-Daten als JSON
- Odoo erstellt automatisch: Verkaufsauftrag + Kunde + Rechnung
- Vorteil: Echtzeit, kein Dateisystem

**Option C: Odoo holt Bestellungen (Pull)**
- Odoo Cron: Alle 5 Min Shopware Admin API abfragen
- `GET /api/order?filter[...]` für neue Bestellungen
- Vorteil: Odoo hat Kontrolle
- Nachteil: Nicht Echtzeit

### Mapping Shopware → Odoo

| Shopware Feld | Odoo Modul | Odoo Feld |
|---------------|-----------|-----------|
| Order | sale.order | Verkaufsauftrag |
| Order.orderNumber | sale.order | name / client_order_ref |
| Order.lineItems | sale.order.line | Auftragspositionen |
| Order.customer | res.partner | Kontakt |
| Order.billingAddress | res.partner | invoice_address |
| Order.shippingAddress | res.partner | delivery_address |
| Order.totalAmount | sale.order | amount_total |
| Order.paymentMethod | account.payment.method | Zahlungsart |
| Order.shippingCosts | sale.order.line | Versandposition |
| Invoice PDF | account.move | Rechnung (Anlage) |

---

## Datenfluss 3: Artikel-Stammdaten (ERP → Shopware)

### Aktuell (UserSoft)
- **Script:** `cron_artikel.sh`
- **Quelle:** `https://artikel.meinschluessel.er-investment.de/Csv/Download`
- **Auth:** Basic Auth
- **Frequenz:** Alle 5 Minuten

### Odoo-Implementierung
- Odoo ist Master für Artikeldaten
- Sync zu Shopware: Preise, Beschreibungen, Kategorien, Bilder
- **Empfehlung:** Shopware Admin API für Artikel-Updates
- **Felder:** `productNumber`, `name`, `price`, `description`, `categories`, `media`

---

## Zahlungsarten in Shopware

| Zahlungsart | Plugin | Relevanz für Odoo |
|-------------|--------|------------------|
| PayPal | SwagPayPal | Zahlungsstatus tracken |
| Amazon Pay | SwagAmazonPay | Zahlungsstatus tracken |
| Klarna | KlarnaPayment | Zahlungsstatus tracken |
| DHL Versand | PickwareDhl | Tracking-Nummern → Odoo |
| GLS Versand | PickwareGls | Tracking-Nummern → Odoo |

---

## Tracking-Daten (Shopware → ERP)

Aktuell existiert ein Tracking-CSV-Export:
```
{orderNr}_tracking.csv    → Tracking-Nummer
{orderNr}_versandlabel.pdf → Versandlabel PDF
```
Diese werden aktuell per `rd:csv:export:sync` mit synchronisiert.

**Odoo:** Tracking-Nummern direkt über API in Odoo-Lieferschein eintragen.

---

## Schließanlagen-Konfigurator (Sonderfall!)

### Beschreibung
Der **Schließanlagen-Designer** ist ein Custom Shopware Plugin von Erik. Kunden können online Schließanlagen konfigurieren (Türen, Zylinder, Schlüssel).

### Relevanz für Odoo
- Konfigurierte Schließanlagen erzeugen **komplexe Bestellpositionen**
- Jede Tür hat: Zylindertyp, Länge, Schließung, Zubehör
- **Odoo muss diese Konfigurationsdaten verstehen**
- Aktuell als Bundle-Positionen im Order-CSV enthalten
- `dvsnSetConfigurator=true` markiert Bundle-Container

### Datenstruktur
```
Schliessanlage
├── System (CDU5, DSPL, DTWI, DTWS, ISK6, MW14, MW36, WXTR)
├── Tür 1
│   ├── Zylindertyp
│   ├── Außenlänge / Innenlänge
│   ├── Schließung (gleichschließend etc.)
│   └── Zubehör (Bohrschutz, etc.)
├── Tür 2 ...
└── Schlüssel (Anzahl, Typ)
```

### Preisdaten
TSV-Dateien pro System in `src/PriceData/`:
- CDU5.tsv, DSPL.tsv, DTWI.tsv, DTWS.tsv
- ISK6.tsv, MW14.tsv, MW36.tsv, WXTR.tsv

---

## Server-Details Shopware

| Eigenschaft | Wert |
|-------------|------|
| **Host** | p4x.hepinet.de |
| **IP** | 116.202.162.231 |
| **SSH User** | meinschluesselde |
| **Shopware** | 6.6.9.0 |
| **PHP** | 8.2 (Plesk) |
| **MySQL** | Port 3307 |
| **OpenSearch** | Port 9020 |
| **Git** | code.hepinet.de (Hetzner GitLab) |
| **Deployer** | v7.3+ |

## Migrations-Roadmap

### Phase 1: Parallel-Betrieb (Empfohlen)
1. Odoo-Module für Shopware-Integration entwickeln
2. Parallel zu UserSoft laufen lassen
3. Daten vergleichen (Bestellungen, Bestände)
4. Bei Übereinstimmung: UserSoft abschalten

### Phase 2: Odoo als alleiniges ERP
1. UserSoft CSV-Plugins deaktivieren
2. Cron-Jobs umstellen
3. NFS-Mount entfernen
4. Monitoring: Bestellfluss überwachen

### Aufwand-Schätzung
| Komponente | Aufwand |
|-----------|---------|
| Odoo → Shopware Bestandsync | 2-3 PT |
| Shopware → Odoo Bestellimport | 3-5 PT |
| Artikelstammdaten-Sync | 2-3 PT |
| Schließanlagen-Konfigurator Mapping | 2-3 PT |
| Test & Parallel-Betrieb | 3-5 PT |
| **Gesamt** | **12-19 PT** |
