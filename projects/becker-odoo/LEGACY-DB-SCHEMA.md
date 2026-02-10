# Legacy-Datenbank Schema — Becker Sicherheitstechnik

> **Generiert:** 2026-02-10 15:33 UTC
> **Datenbank:** InterBase → Firebird 4.0 (`USDB.fdb`)
> **Tabellen:** 149 SQL-Tabellen
> **Spalten:** 3378 Gesamt
> **Datensätze:** 3,770,278 Gesamt

---

## Inhaltsverzeichnis

- [Stammdaten](#stammdaten) (28 Tabellen, 656,733 Datensätze)
- [Aufträge/Belege](#aufträge-belege) (7 Tabellen, 300,006 Datensätze)
- [Positionen](#positionen) (3 Tabellen, 1,901,351 Datensätze)
- [Finanzen/Buchhaltung](#finanzen-buchhaltung) (19 Tabellen, 488,506 Datensätze)
- [Lager](#lager) (10 Tabellen, 399,441 Datensätze)
- [Produktion](#produktion) (20 Tabellen, 229 Datensätze)
- [Projekt](#projekt) (8 Tabellen, 13 Datensätze)
- [Personal/Zeiterfassung](#personal-zeiterfassung) (7 Tabellen, 29 Datensätze)
- [Shop/E-Commerce](#shop-e-commerce) (2 Tabellen, 18,085 Datensätze)
- [Dokumente](#dokumente) (3 Tabellen, 60 Datensätze)
- [Wartung/Service](#wartung-service) (6 Tabellen, 1,216 Datensätze)
- [System/Konfiguration](#system-konfiguration) (17 Tabellen, 4,585 Datensätze)
- [Bonuswesen](#bonuswesen) (15 Tabellen, 0 Datensätze)
- [Inventur](#inventur) (3 Tabellen, 24 Datensätze)
- [Sonstige](#sonstige) (1 Tabellen, 0 Datensätze)

---

## Zusammenfassung nach Kategorie

| Kategorie | Tabellen | Datensätze | Aktiv genutzt |
|-----------|----------|------------|---------------|
| Stammdaten | 28 | 656,733 | 17/28 |
| Aufträge/Belege | 7 | 300,006 | 4/7 |
| Positionen | 3 | 1,901,351 | 3/3 |
| Finanzen/Buchhaltung | 19 | 488,506 | 13/19 |
| Lager | 10 | 399,441 | 4/10 |
| Produktion | 20 | 229 | 4/20 |
| Projekt | 8 | 13 | 3/8 |
| Personal/Zeiterfassung | 7 | 29 | 4/7 |
| Shop/E-Commerce | 2 | 18,085 | 1/2 |
| Dokumente | 3 | 60 | 2/3 |
| Wartung/Service | 6 | 1,216 | 3/6 |
| System/Konfiguration | 17 | 4,585 | 10/17 |
| Bonuswesen | 15 | 0 | 0/15 |
| Inventur | 3 | 24 | 1/3 |
| Sonstige | 1 | 0 | 0/1 |

---

## Stammdaten

### SQLADRESSE 🟢

**Beschreibung:** Kunden-, Lieferanten- und Adressstammdaten. Zentrale Adresstabelle für alle Geschäftspartner.
**Datensätze:** 34,075 | **Spalten:** 86

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ADRESSNR` | VARCHAR(12) | ✅ |
| 2 | `MATCHCODE` | VARCHAR(15) |  |
| 3 | `ADRESSART` | VARCHAR(1) |  |
| 4 | `ANREDE` | VARCHAR(40) |  |
| 5 | `NAME` | VARCHAR(40) | ✅ |
| 6 | `NAME2` | VARCHAR(40) |  |
| 7 | `STRASSE` | VARCHAR(40) |  |
| 8 | `PLZ` | VARCHAR(15) | ✅ |
| 9 | `ORT` | VARCHAR(40) | ✅ |
| 10 | `LANDKZ` | VARCHAR(5) |  |
| 11 | `TELEFON` | VARCHAR(20) |  |
| 12 | `TELEFON2` | VARCHAR(20) |  |
| 13 | `FUNKTELEFON` | VARCHAR(20) |  |
| 14 | `FAX` | VARCHAR(20) |  |
| 15 | `VORWAHL` | VARCHAR(20) |  |
| 16 | `BANKNAME` | VARCHAR(30) |  |
| 17 | `BLZ` | VARCHAR(10) |  |
| 18 | `KONTO` | VARCHAR(10) |  |
| 19 | `REGION` | VARCHAR(10) |  |
| 20 | `VERTRETER` | VARCHAR(30) |  |
| 21 | `PKZ` | VARCHAR(1) | ✅ |
| 22 | `RABATTSTAFFEL` | VARCHAR(2) | ✅ |
| 23 | `RABATT` | VARCHAR(6) | ✅ |
| 24 | `KREDITLIMIT` | FLOAT |  |
| 25 | `ZAHLUNGSZIEL` | VARCHAR(2) | ✅ |
| 26 | `UMSATZLFDMONAT` | FLOAT |  |
| 27 | `UMSATZVORMONAT` | FLOAT |  |
| 28 | `UMSATZLFDJAHR` | FLOAT |  |
| 29 | `UMSATZVORJAHR` | FLOAT |  |
| 30 | `SALDO` | FLOAT |  |
| 31 | `SPERRE` | VARCHAR(1) | ✅ |
| 32 | `ZUSATZDRUCKE` | VARCHAR(1) | ✅ |
| 33 | `WERBEKZ` | VARCHAR(5) |  |
| 34 | `FREI1` | VARCHAR(20) |  |
| 35 | `FREI2` | VARCHAR(20) |  |
| 36 | `FREI3` | VARCHAR(20) |  |
| 37 | `FREI4` | VARCHAR(20) |  |
| 38 | `FREI5` | VARCHAR(20) |  |
| 39 | `FREI6` | VARCHAR(20) |  |
| 40 | `FREI7` | VARCHAR(20) |  |
| 41 | `FREI8` | VARCHAR(20) |  |
| 42 | `FREI9` | VARCHAR(20) |  |
| 43 | `FREI10` | VARCHAR(20) |  |
| 44 | `BESTELLWERT` | FLOAT |  |
| 45 | `KDNRLIEFERANT` | VARCHAR(20) |  |
| 46 | `INFOTEXT` | BLOB |  |
| 47 | `EMAIL` | VARCHAR(80) |  |
| 48 | `INTERNET` | VARCHAR(120) |  |
| 49 | `VERSANDART` | VARCHAR(2) |  |
| 50 | `MWSTPFLICHT` | VARCHAR(1) | ✅ |
| 51 | `WAEHRUNG` | VARCHAR(5) |  |
| 52 | `DATUM` | DATE |  |
| 53 | `USTIDNR` | VARCHAR(20) |  |
| 54 | `AUSGABEOUTLOOK` | VARCHAR(1) |  |
| 55 | `AUSGABEAVM` | VARCHAR(1) |  |
| 56 | `MALETZTEAENDG` | VARCHAR(3) |  |
| 57 | `BESTELLKZ` | VARCHAR(2) |  |
| 58 | `MAHNSCHL` | VARCHAR(1) |  |
| 59 | `STEUERNR` | VARCHAR(15) |  |
| 60 | `HRNR` | VARCHAR(10) |  |
| 61 | `HRNAME` | VARCHAR(30) |  |
| 62 | `LIMIT` | FLOAT |  |
| 63 | `NAME3` | VARCHAR(40) |  |
| 64 | `VERTRETER2` | VARCHAR(3) |  |
| 65 | `FREIGABE` | VARCHAR(1) |  |
| 66 | `RECHNUNGSKZ` | VARCHAR(2) |  |
| 67 | `NRKREDITVERS` | VARCHAR(10) |  |
| 68 | `BONITAET` | VARCHAR(10) |  |
| 69 | `ZAHLZIELBAR` | VARCHAR(20) |  |
| 70 | `REPERMAIL` | VARCHAR(1) |  |
| 71 | `REMAIL` | VARCHAR(50) |  |
| 72 | `IBANNR` | VARCHAR(40) |  |
| 73 | `BICNR` | VARCHAR(11) |  |
| 74 | `RECHADR` | VARCHAR(12) |  |
| 75 | `FIBUKONTO` | VARCHAR(12) |  |
| 76 | `GLAEUBIGERID` | VARCHAR(20) |  |
| 77 | `MANDATSDATUM` | VARCHAR(10) |  |
| 78 | `MANDATREF` | VARCHAR(30) |  |
| 79 | `KONTAKTVORLAGE` | VARCHAR(3) |  |
| 80 | `RECHART` | VARCHAR(3) |  |
| 81 | `NEUERVORGANG` | VARCHAR(1) |  |
| 82 | `NEUERVORGEIG` | VARCHAR(10) |  |
| 83 | `DSGVOCHECK` | VARCHAR(10) |  |
| 84 | `SHOPADRNR` | VARCHAR(12) |  |
| 85 | `XRECHNUNG` | VARCHAR(1) | ✅ |
| 86 | `LEITWEGID` | VARCHAR(25) |  |

### SQLARTEIG 🟢

**Beschreibung:** Artikeleigenschaften — Zusätzliche technische Eigenschaften pro Artikel.
**Datensätze:** 189 | **Spalten:** 51

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `LABEL01` | VARCHAR(25) |  |
| 3 | `LABEL02` | VARCHAR(25) |  |
| 4 | `LABEL03` | VARCHAR(25) |  |
| 5 | `LABEL04` | VARCHAR(25) |  |
| 6 | `LABEL05` | VARCHAR(25) |  |
| 7 | `LABEL06` | VARCHAR(25) |  |
| 8 | `LABEL07` | VARCHAR(25) |  |
| 9 | `LABEL08` | VARCHAR(25) |  |
| 10 | `LABEL09` | VARCHAR(25) |  |
| 11 | `LABEL10` | VARCHAR(25) |  |
| 12 | `LABEL11` | VARCHAR(25) |  |
| 13 | `LABEL12` | VARCHAR(25) |  |
| 14 | `LABEL13` | VARCHAR(25) |  |
| 15 | `LABEL14` | VARCHAR(25) |  |
| 16 | `LABEL15` | VARCHAR(25) |  |
| 17 | `LABEL16` | VARCHAR(25) |  |
| 18 | `LABEL17` | VARCHAR(25) |  |
| 19 | `LABEL18` | VARCHAR(25) |  |
| 20 | `LABEL19` | VARCHAR(25) |  |
| 21 | `LABEL20` | VARCHAR(25) |  |
| 22 | `LABEL21` | VARCHAR(25) |  |
| 23 | `LABEL22` | VARCHAR(25) |  |
| 24 | `LABEL23` | VARCHAR(25) |  |
| 25 | `LABEL24` | VARCHAR(25) |  |
| 26 | `LABEL25` | VARCHAR(25) |  |
| 27 | `EIGEN01` | VARCHAR(30) |  |
| 28 | `EIGEN02` | VARCHAR(30) |  |
| 29 | `EIGEN03` | VARCHAR(30) |  |
| 30 | `EIGEN04` | VARCHAR(30) |  |
| 31 | `EIGEN05` | VARCHAR(30) |  |
| 32 | `EIGEN06` | VARCHAR(30) |  |
| 33 | `EIGEN07` | VARCHAR(30) |  |
| 34 | `EIGEN08` | VARCHAR(30) |  |
| 35 | `EIGEN09` | VARCHAR(30) |  |
| 36 | `EIGEN10` | VARCHAR(30) |  |
| 37 | `EIGEN11` | VARCHAR(30) |  |
| 38 | `EIGEN12` | VARCHAR(30) |  |
| 39 | `EIGEN13` | VARCHAR(30) |  |
| 40 | `EIGEN14` | VARCHAR(30) |  |
| 41 | `EIGEN15` | VARCHAR(30) |  |
| 42 | `EIGEN16` | VARCHAR(30) |  |
| 43 | `EIGEN17` | VARCHAR(30) |  |
| 44 | `EIGEN18` | VARCHAR(30) |  |
| 45 | `EIGEN19` | VARCHAR(30) |  |
| 46 | `EIGEN20` | VARCHAR(30) |  |
| 47 | `EIGEN21` | VARCHAR(30) |  |
| 48 | `EIGEN22` | VARCHAR(30) |  |
| 49 | `EIGEN23` | VARCHAR(30) |  |
| 50 | `EIGEN24` | VARCHAR(30) |  |
| 51 | `EIGEN25` | VARCHAR(30) |  |

### SQLARTFILTERVORL ⚪

**Beschreibung:** Artikelfilter-Vorlagen — Gespeicherte Filtereinstellungen für die Artikelsuche.
**Datensätze:** 0 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTKATEGORIE` | VARCHAR(180) | ✅ |
| 2 | `FILTERBEZ` | VARCHAR(40) | ✅ |
| 3 | `PARAMNR` | VARCHAR(3) | ✅ |
| 4 | `PARAMS` | VARCHAR(60) |  |

### SQLARTIKEL 🟢

**Beschreibung:** Artikelstammdaten mit Preisen, Warengruppen, EAN-Codes. Haupttabelle für alle Produkte und Dienstleistungen (Schlüssel, Schlösser, Zylinder, Sicherheitstechnik).
**Datensätze:** 83,121 | **Spalten:** 136

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `ARTIKELNRBARCODE` | VARCHAR(15) |  |
| 3 | `ARTIKELMATCH` | VARCHAR(20) |  |
| 4 | `HERSTELLERNR` | VARCHAR(20) |  |
| 5 | `KURZTEXT1` | VARCHAR(40) | ✅ |
| 6 | `KURZTEXT2` | VARCHAR(40) |  |
| 7 | `KURZTEXT3` | VARCHAR(40) |  |
| 8 | `KURZTEXT4` | VARCHAR(40) |  |
| 9 | `KURZTEXT5` | VARCHAR(40) |  |
| 10 | `MWST` | DOUBLE |  |
| 11 | `WARENGRUPPE` | VARCHAR(5) |  |
| 12 | `MENGENEINHEIT` | VARCHAR(8) |  |
| 13 | `STATUS` | VARCHAR(1) |  |
| 14 | `NEUEARTIKELNR` | VARCHAR(15) |  |
| 15 | `DATUM` | DATE |  |
| 16 | `LANGTEXT1` | BLOB |  |
| 17 | `LANGTEXT2` | BLOB |  |
| 18 | `SERIENNR` | VARCHAR(1) |  |
| 19 | `STUECKLISTE` | VARCHAR(15) |  |
| 20 | `DEKNETTO` | DOUBLE |  |
| 21 | `DEKBRUTTO` | DOUBLE |  |
| 22 | `FRACHTEK` | DOUBLE |  |
| 23 | `MONTAGEEK` | DOUBLE |  |
| 24 | `VKP0` | DOUBLE |  |
| 25 | `VKP1` | DOUBLE |  |
| 26 | `VKP2` | DOUBLE |  |
| 27 | `VKP3` | DOUBLE |  |
| 28 | `FRACHTVK` | DOUBLE |  |
| 29 | `MONTAGEVK` | DOUBLE |  |
| 30 | `VERSCHNITTP` | VARCHAR(6) |  |
| 31 | `VERSCHNITTME` | VARCHAR(6) |  |
| 32 | `KAUTIONSWERT` | VARCHAR(10) |  |
| 33 | `LAGERGESAMT` | VARCHAR(10) |  |
| 34 | `LAGERMIN` | VARCHAR(10) |  |
| 35 | `LAGERMAX` | VARCHAR(10) |  |
| 36 | `MENGEBEAUFTRAGT` | VARCHAR(10) |  |
| 37 | `MENGEBESTELLT` | VARCHAR(10) |  |
| 38 | `DURCHSCHNITT` | DOUBLE |  |
| 39 | `VERPEINH` | VARCHAR(8) |  |
| 40 | `MASSE` | VARCHAR(8) |  |
| 41 | `ARTIKELINFO` | BLOB |  |
| 42 | `PREISEINHEIT` | VARCHAR(10) |  |
| 43 | `ERLOESKONTO` | VARCHAR(8) |  |
| 44 | `KOSTENKONTO` | VARCHAR(8) |  |
| 45 | `CUBASIS` | VARCHAR(10) |  |
| 46 | `CUZAHL` | VARCHAR(10) |  |
| 47 | `PREISMATRIX` | VARCHAR(8) |  |
| 48 | `PREISBERECHNUNG` | VARCHAR(3) |  |
| 49 | `WAEHRUNG` | VARCHAR(5) |  |
| 50 | `GARANTIE` | VARCHAR(10) |  |
| 51 | `INTERNETAUSGABE` | VARCHAR(1) |  |
| 52 | `KATEGORIEISHOP` | VARCHAR(120) |  |
| 53 | `HTTPADRESSE` | VARCHAR(30) |  |
| 54 | `PROVISIONSSATZ1` | VARCHAR(10) |  |
| 55 | `PROVISIONSSATZ2` | VARCHAR(10) |  |
| 56 | `PROVISIONSART` | VARCHAR(1) |  |
| 57 | `POSITIONSKENNZ` | VARCHAR(1) |  |
| 58 | `LADUNGSTRAEGERNR` | VARCHAR(30) |  |
| 59 | `ANZTEILEIMLT` | VARCHAR(5) |  |
| 60 | `ZUSATZ1` | VARCHAR(20) |  |
| 61 | `ZUSATZ2` | VARCHAR(20) |  |
| 62 | `ZUSATZ3` | VARCHAR(20) |  |
| 63 | `ZUSATZ4` | VARCHAR(20) |  |
| 64 | `ZUSATZ5` | VARCHAR(20) |  |
| 65 | `ANLAGEDATUM` | DATE |  |
| 66 | `VORZUGLAGER` | VARCHAR(2) |  |
| 67 | `MALETZTEAENDG` | VARCHAR(3) |  |
| 68 | `MONTAGEZEITMIN` | VARCHAR(5) |  |
| 69 | `LOHNGRUPPEMONTAGE` | VARCHAR(2) |  |
| 70 | `BDEANZEIGE` | VARCHAR(1) |  |
| 71 | `KATALOGBILD` | INTEGER |  |
| 72 | `ALTTEIL` | VARCHAR(1) |  |
| 73 | `LAGERJA` | VARCHAR(1) |  |
| 74 | `ARTART` | VARCHAR(1) |  |
| 75 | `MONTKOSTEN` | DOUBLE |  |
| 76 | `SCHNITTSTELLE` | VARCHAR(5) |  |
| 77 | `ZUSATZ6` | VARCHAR(40) |  |
| 78 | `ZUSATZ7` | VARCHAR(40) |  |
| 79 | `ZUSATZ8` | VARCHAR(40) |  |
| 80 | `ZUSATZ9` | VARCHAR(40) |  |
| 81 | `ZUSATZ10` | VARCHAR(40) |  |
| 82 | `ZUSATZ11` | VARCHAR(40) |  |
| 83 | `ZUSATZ12` | VARCHAR(40) |  |
| 84 | `ZUSATZ13` | VARCHAR(40) |  |
| 85 | `ZUSATZ14` | VARCHAR(40) |  |
| 86 | `ZUSATZ15` | VARCHAR(40) |  |
| 87 | `EINSATZGEWICHT` | VARCHAR(8) |  |
| 88 | `KALKGEWICHT` | VARCHAR(8) |  |
| 89 | `GEWICHTSEINH` | VARCHAR(5) |  |
| 90 | `TAZEIT` | VARCHAR(10) |  |
| 91 | `TSZEIT` | VARCHAR(10) |  |
| 92 | `ZEICHNUNGSNR` | VARCHAR(50) |  |
| 93 | `ZEICHNUNGSIDX` | VARCHAR(10) |  |
| 94 | `EKLISTE` | DOUBLE |  |
| 95 | `MARKE` | VARCHAR(20) |  |
| 96 | `KATEGORIE1` | VARCHAR(20) |  |
| 97 | `KATEGORIE2` | VARCHAR(20) |  |
| 98 | `KATEGORIE3` | VARCHAR(20) |  |
| 99 | `MENGEKOMM` | VARCHAR(10) |  |
| 100 | `LEK` | FLOAT |  |
| 101 | `MENGERESERVIERT` | VARCHAR(10) |  |
| 102 | `MFAK2` | VARCHAR(10) |  |
| 103 | `MEINH2` | VARCHAR(8) |  |
| 104 | `LOSGROESSE` | VARCHAR(10) |  |
| 105 | `SONDERPREIS` | FLOAT |  |
| 106 | `KASSENPREIS` | FLOAT |  |
| 107 | `GRUNDPREIS` | FLOAT |  |
| 108 | `SPERRKZ` | VARCHAR(1) |  |
| 109 | `MATZUSCHW` | FLOAT |  |
| 110 | `MATZUSCHEINH` | VARCHAR(6) |  |
| 111 | `LEGZUSCHW` | FLOAT |  |
| 112 | `LEGZUSCHEINH` | VARCHAR(6) |  |
| 113 | `SCHZUSCHW` | FLOAT |  |
| 114 | `SCHZUSCHEINH` | VARCHAR(6) |  |
| 115 | `MINBESTELLMENGE` | VARCHAR(8) |  |
| 116 | `ARTNRROHTEIL` | VARCHAR(15) |  |
| 117 | `ARTNRFTEIL` | VARCHAR(15) |  |
| 118 | `CHARGENMENGE` | VARCHAR(5) |  |
| 119 | `MEINHEINKAUF` | VARCHAR(8) |  |
| 120 | `MEINHLAGER` | VARCHAR(8) |  |
| 121 | `DEKNETTOEK` | FLOAT |  |
| 122 | `DEKBRUTTOEK` | FLOAT |  |
| 123 | `PEINHMEINH` | VARCHAR(5) |  |
| 124 | `VERPEINHMEINH` | VARCHAR(5) |  |
| 125 | `GRUNDPREISMENGE` | VARCHAR(10) |  |
| 126 | `GRUNDPREISMEINH` | VARCHAR(5) |  |
| 127 | `MATERIAL` | VARCHAR(30) |  |
| 128 | `DOKNRZEICHNG` | INTEGER |  |
| 129 | `ARTPARTSCOUNTER` | VARCHAR(2) |  |
| 130 | `LASTPARTSCOUNTER` | VARCHAR(12) |  |
| 131 | `GRUNDBAUGRUPPE` | VARCHAR(1) |  |
| 132 | `LSTGKZ` | VARCHAR(2) |  |
| 133 | `SKONTOFAEHIG` | VARCHAR(1) |  |
| 134 | `LASTSALES` | DATE |  |
| 135 | `BESCHAFFUNGSZEIT` | VARCHAR(3) |  |
| 136 | `MINBERECHNUNG` | VARCHAR(10) |  |

### SQLARTIKEL2 ⚪

**Beschreibung:** Erweiterte Artikeldaten (Zusatzfelder, die nicht in SQLARTIKEL passen).
**Datensätze:** 0 | **Spalten:** 117

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `ARTIKELNRBARCODE` | VARCHAR(15) |  |
| 3 | `ARTIKELMATCH` | VARCHAR(20) |  |
| 4 | `HERSTELLERNR` | VARCHAR(20) |  |
| 5 | `KURZTEXT1` | VARCHAR(40) | ✅ |
| 6 | `KURZTEXT2` | VARCHAR(40) |  |
| 7 | `KURZTEXT3` | VARCHAR(40) |  |
| 8 | `KURZTEXT4` | VARCHAR(40) |  |
| 9 | `KURZTEXT5` | VARCHAR(40) |  |
| 10 | `MWST` | FLOAT |  |
| 11 | `WARENGRUPPE` | VARCHAR(5) |  |
| 12 | `MENGENEINHEIT` | VARCHAR(8) |  |
| 13 | `STATUS` | VARCHAR(1) |  |
| 14 | `NEUEARTIKELNR` | VARCHAR(15) |  |
| 15 | `DATUM` | DATE |  |
| 16 | `LANGTEXT1` | BLOB |  |
| 17 | `LANGTEXT2` | BLOB |  |
| 18 | `SERIENNR` | VARCHAR(1) |  |
| 19 | `STUECKLISTE` | VARCHAR(15) |  |
| 20 | `DEKNETTO` | FLOAT |  |
| 21 | `DEKBRUTTO` | FLOAT |  |
| 22 | `FRACHTEK` | FLOAT |  |
| 23 | `MONTAGEEK` | FLOAT |  |
| 24 | `VKP0` | FLOAT |  |
| 25 | `VKP1` | FLOAT |  |
| 26 | `VKP2` | FLOAT |  |
| 27 | `VKP3` | FLOAT |  |
| 28 | `FRACHTVK` | FLOAT |  |
| 29 | `MONTAGEVK` | FLOAT |  |
| 30 | `VERSCHNITTP` | VARCHAR(6) |  |
| 31 | `VERSCHNITTME` | VARCHAR(6) |  |
| 32 | `KAUTIONSWERT` | VARCHAR(10) |  |
| 33 | `LAGERGESAMT` | VARCHAR(10) |  |
| 34 | `LAGERMIN` | VARCHAR(10) |  |
| 35 | `LAGERMAX` | VARCHAR(10) |  |
| 36 | `MENGEBEAUFTRAGT` | VARCHAR(10) |  |
| 37 | `MENGEBESTELLT` | VARCHAR(10) |  |
| 38 | `DURCHSCHNITT` | FLOAT |  |
| 39 | `VERPEINH` | VARCHAR(8) |  |
| 40 | `MASSE` | VARCHAR(8) |  |
| 41 | `ARTIKELINFO` | BLOB |  |
| 42 | `PREISEINHEIT` | VARCHAR(10) |  |
| 43 | `ERLOESKONTO` | VARCHAR(5) |  |
| 44 | `KOSTENKONTO` | VARCHAR(5) |  |
| 45 | `CUBASIS` | VARCHAR(10) |  |
| 46 | `CUZAHL` | VARCHAR(10) |  |
| 47 | `PREISMATRIX` | VARCHAR(8) |  |
| 48 | `PREISBERECHNUNG` | VARCHAR(3) |  |
| 49 | `WAEHRUNG` | VARCHAR(5) |  |
| 50 | `GARANTIE` | VARCHAR(10) |  |
| 51 | `INTERNETAUSGABE` | VARCHAR(1) |  |
| 52 | `KATEGORIEISHOP` | VARCHAR(10) |  |
| 53 | `HTTPADRESSE` | VARCHAR(30) |  |
| 54 | `PROVISIONSSATZ1` | VARCHAR(10) |  |
| 55 | `PROVISIONSSATZ2` | VARCHAR(10) |  |
| 56 | `PROVISIONSART` | VARCHAR(1) |  |
| 57 | `POSITIONSKENNZ` | VARCHAR(1) |  |
| 58 | `LADUNGSTRAEGERNR` | VARCHAR(15) |  |
| 59 | `ANZTEILEIMLT` | VARCHAR(5) |  |
| 60 | `ZUSATZ1` | VARCHAR(20) |  |
| 61 | `ZUSATZ2` | VARCHAR(20) |  |
| 62 | `ZUSATZ3` | VARCHAR(20) |  |
| 63 | `ZUSATZ4` | VARCHAR(20) |  |
| 64 | `ZUSATZ5` | VARCHAR(20) |  |
| 65 | `ANLAGEDATUM` | DATE |  |
| 66 | `VORZUGLAGER` | VARCHAR(2) |  |
| 67 | `MALETZTEAENDG` | VARCHAR(3) |  |
| 68 | `MONTAGEZEITMIN` | VARCHAR(5) |  |
| 69 | `LOHNGRUPPEMONTAGE` | VARCHAR(2) |  |
| 70 | `BDEANZEIGE` | VARCHAR(1) |  |
| 71 | `KATALOGBILD` | INTEGER |  |
| 72 | `ALTTEIL` | VARCHAR(1) |  |
| 73 | `LAGERJA` | VARCHAR(1) |  |
| 74 | `ARTART` | VARCHAR(1) |  |
| 75 | `MONTKOSTEN` | FLOAT |  |
| 76 | `SCHNITTSTELLE` | VARCHAR(5) |  |
| 77 | `ZUSATZ6` | VARCHAR(40) |  |
| 78 | `ZUSATZ7` | VARCHAR(40) |  |
| 79 | `ZUSATZ8` | VARCHAR(40) |  |
| 80 | `ZUSATZ9` | VARCHAR(40) |  |
| 81 | `ZUSATZ10` | VARCHAR(40) |  |
| 82 | `ZUSATZ11` | VARCHAR(40) |  |
| 83 | `ZUSATZ12` | VARCHAR(40) |  |
| 84 | `ZUSATZ13` | VARCHAR(40) |  |
| 85 | `ZUSATZ14` | VARCHAR(40) |  |
| 86 | `ZUSATZ15` | VARCHAR(40) |  |
| 87 | `EINSATZGEWICHT` | VARCHAR(8) |  |
| 88 | `KALKGEWICHT` | VARCHAR(8) |  |
| 89 | `GEWICHTSEINH` | VARCHAR(5) |  |
| 90 | `TAZEIT` | VARCHAR(10) |  |
| 91 | `TSZEIT` | VARCHAR(10) |  |
| 92 | `ZEICHNUNGSNR` | VARCHAR(50) |  |
| 93 | `ZEICHNUNGSIDX` | VARCHAR(10) |  |
| 94 | `EKLISTE` | FLOAT |  |
| 95 | `MARKE` | VARCHAR(20) |  |
| 96 | `KATEGORIE1` | VARCHAR(20) |  |
| 97 | `KATEGORIE2` | VARCHAR(20) |  |
| 98 | `KATEGORIE3` | VARCHAR(20) |  |
| 99 | `MENGEKOMM` | VARCHAR(10) |  |
| 100 | `LEK` | FLOAT |  |
| 101 | `MENGERESERVIERT` | VARCHAR(10) |  |
| 102 | `MFAK2` | VARCHAR(10) |  |
| 103 | `MEINH2` | VARCHAR(8) |  |
| 104 | `LOSGROESSE` | VARCHAR(10) |  |
| 105 | `SONDERPREIS` | FLOAT |  |
| 106 | `KASSENPREIS` | FLOAT |  |
| 107 | `GRUNDPREIS` | FLOAT |  |
| 108 | `Q1BREITE` | FLOAT |  |
| 109 | `Q1DICKE` | FLOAT |  |
| 110 | `Q2BREITE` | FLOAT |  |
| 111 | `Q2DICKE` | FLOAT |  |
| 112 | `LAENGENTABELLE` | VARCHAR(5) |  |
| 113 | `MASSEINHQUER` | VARCHAR(5) |  |
| 114 | `LAENGE` | FLOAT |  |
| 115 | `MASSEINHLAENGE` | VARCHAR(5) |  |
| 116 | `MASSEINHDIM` | VARCHAR(5) |  |
| 117 | `SPERRKZ` | VARCHAR(1) |  |

### SQLARTIKELDIMS ⚪

**Beschreibung:** Artikeldimensionen — Maße, Gewichte, Abmessungen von Artikeln.
**Datensätze:** 0 | **Spalten:** 23

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `ARTDIM` | VARCHAR(5) | ✅ |
| 3 | `BESCHREIBUNG` | VARCHAR(50) | ✅ |
| 4 | `BREITE` | VARCHAR(10) |  |
| 5 | `DICKE` | VARCHAR(10) |  |
| 6 | `MASSEINHQ` | VARCHAR(5) |  |
| 7 | `LAENGE` | VARCHAR(10) |  |
| 8 | `MASSEINHL` | VARCHAR(5) |  |
| 9 | `LAGERMENGE` | VARCHAR(10) |  |
| 10 | `ARTMEINH` | VARCHAR(5) |  |
| 11 | `MENGE1` | VARCHAR(10) |  |
| 12 | `MEINH1` | VARCHAR(5) |  |
| 13 | `MENGE2` | VARCHAR(10) |  |
| 14 | `MEINH2` | VARCHAR(5) |  |
| 15 | `MENGE3` | VARCHAR(10) |  |
| 16 | `MEINH3` | VARCHAR(5) |  |
| 17 | `MENGE4` | VARCHAR(10) |  |
| 18 | `MEINH4` | VARCHAR(5) |  |
| 19 | `MENGE5` | VARCHAR(10) |  |
| 20 | `MEINH5` | VARCHAR(5) |  |
| 21 | `GEWICHT` | VARCHAR(10) |  |
| 22 | `GEWICHTEINH` | VARCHAR(5) |  |
| 23 | `FARBCODE` | VARCHAR(20) |  |

### SQLARTIKELKALKULATION 🟡

**Beschreibung:** Artikel-Kalkulationsdaten — Kalkulationsschema pro Artikel.
**Datensätze:** 72 | **Spalten:** 74

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `KALKDATUM` | DATE | ✅ |
| 3 | `MANR` | VARCHAR(3) | ✅ |
| 4 | `EKLISTE` | DOUBLE | ✅ |
| 5 | `EKRABMULTI` | VARCHAR(1) | ✅ |
| 6 | `EKRMBETRAG` | DOUBLE | ✅ |
| 7 | `EKRMPLUSMINUS` | VARCHAR(1) | ✅ |
| 8 | `EKABSCHP1` | VARCHAR(8) | ✅ |
| 9 | `EKABSCHP2` | VARCHAR(8) | ✅ |
| 10 | `EKABSCHP3` | VARCHAR(8) | ✅ |
| 11 | `EKFRACHT` | DOUBLE | ✅ |
| 12 | `EKMONTAGE` | DOUBLE | ✅ |
| 13 | `EKMATGMK` | VARCHAR(8) | ✅ |
| 14 | `EKZWS1` | DOUBLE | ✅ |
| 15 | `EKTAZEIT` | VARCHAR(10) | ✅ |
| 16 | `EKTSZEIT` | VARCHAR(10) | ✅ |
| 17 | `LGFEST` | VARCHAR(1) | ✅ |
| 18 | `EKLOHNGR` | VARCHAR(2) | ✅ |
| 19 | `EKFESTPR` | VARCHAR(10) | ✅ |
| 20 | `EKAPLANKOSTEN` | DOUBLE | ✅ |
| 21 | `EKMASCHINE` | DOUBLE | ✅ |
| 22 | `EKFREMD1` | DOUBLE | ✅ |
| 23 | `EKFREMD2` | DOUBLE | ✅ |
| 24 | `EKFREMD3` | DOUBLE | ✅ |
| 25 | `EKLSTGMK` | VARCHAR(8) | ✅ |
| 26 | `EKZWS2` | DOUBLE | ✅ |
| 27 | `EKKOSTEN` | DOUBLE | ✅ |
| 28 | `ABLISTE` | DOUBLE | ✅ |
| 29 | `ABABSCHP1` | VARCHAR(8) | ✅ |
| 30 | `ABABSCHP2` | VARCHAR(8) | ✅ |
| 31 | `ABABSCHP3` | VARCHAR(8) | ✅ |
| 32 | `ABFRACHT` | DOUBLE | ✅ |
| 33 | `ABMONTAGE` | DOUBLE | ✅ |
| 34 | `ABMATGMK` | VARCHAR(8) | ✅ |
| 35 | `ABZWS1` | DOUBLE | ✅ |
| 36 | `ABDBEURO` | DOUBLE | ✅ |
| 37 | `ABDBPROZ` | VARCHAR(8) | ✅ |
| 38 | `ABAUFPROZ` | VARCHAR(8) | ✅ |
| 39 | `ABABPROZ` | VARCHAR(8) | ✅ |
| 40 | `ZULISTE` | DOUBLE | ✅ |
| 41 | `ZUABSCHP1` | VARCHAR(8) | ✅ |
| 42 | `ZUABSCHP2` | VARCHAR(8) | ✅ |
| 43 | `ZUABSCHP3` | VARCHAR(8) | ✅ |
| 44 | `ZUFRACHT` | DOUBLE | ✅ |
| 45 | `ZUMONTAGE` | DOUBLE | ✅ |
| 46 | `ZUMATGMK` | VARCHAR(8) | ✅ |
| 47 | `ZUZWS1` | DOUBLE | ✅ |
| 48 | `ZUDBEURO` | DOUBLE | ✅ |
| 49 | `ZUDBPROZ` | VARCHAR(8) | ✅ |
| 50 | `ZUAUFPROZ` | VARCHAR(8) | ✅ |
| 51 | `ZUABPROZ` | VARCHAR(8) | ✅ |
| 52 | `PREISFORMEL` | VARCHAR(3) | ✅ |
| 53 | `FRAMONUEBER` | VARCHAR(1) | ✅ |
| 54 | `EKPREISGROUP` | VARCHAR(1) | ✅ |
| 55 | `DEKPREISGROUP` | VARCHAR(1) | ✅ |
| 56 | `VK0PREISGROUP` | VARCHAR(1) | ✅ |
| 57 | `VK1PREISGROUP` | VARCHAR(1) | ✅ |
| 58 | `VK2PREISGROUP` | VARCHAR(1) | ✅ |
| 59 | `VK3PREISGROUP` | VARCHAR(1) | ✅ |
| 60 | `MATEKART` | VARCHAR(2) |  |
| 61 | `MATERIALMENGE` | VARCHAR(10) |  |
| 62 | `MATERIALEINH` | VARCHAR(10) |  |
| 63 | `NAMEEKABSCHP1` | VARCHAR(20) |  |
| 64 | `NAMEEKABSCHP2` | VARCHAR(20) |  |
| 65 | `NAMEEKABSCHP3` | VARCHAR(20) |  |
| 66 | `NAMEEKFREMD1` | VARCHAR(20) |  |
| 67 | `NAMEEKFREMD2` | VARCHAR(20) |  |
| 68 | `NAMEEKFREMD3` | VARCHAR(20) |  |
| 69 | `NAMEABABSCHP1` | VARCHAR(20) |  |
| 70 | `NAMEABABSCHP2` | VARCHAR(20) |  |
| 71 | `NAMEABABSCHP3` | VARCHAR(20) |  |
| 72 | `NAMEZUABSCHP1` | VARCHAR(20) |  |
| 73 | `NAMEZUABSCHP2` | VARCHAR(20) |  |
| 74 | `NAMEZUABSCHP3` | VARCHAR(20) |  |

### SQLARTIKELLANG ⚪

**Beschreibung:** Artikel-Langtexte — Ausführliche Beschreibungen, Artikeltexte für Dokumente.
**Datensätze:** 0 | **Spalten:** 17

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `IDENTNR` | VARCHAR(5) | ✅ |
| 2 | `NAME` | VARCHAR(30) | ✅ |
| 3 | `ART` | VARCHAR(2) | ✅ |
| 4 | `MASSEINH` | VARCHAR(5) |  |
| 5 | `RASTERBEGINN` | VARCHAR(10) |  |
| 6 | `RASTERENDE` | VARCHAR(10) |  |
| 7 | `RASTERSCHRITT` | VARCHAR(10) |  |
| 8 | `LAENGE01` | VARCHAR(10) |  |
| 9 | `LAENGE02` | VARCHAR(10) |  |
| 10 | `LAENGE03` | VARCHAR(10) |  |
| 11 | `LAENGE04` | VARCHAR(10) |  |
| 12 | `LAENGE05` | VARCHAR(10) |  |
| 13 | `LAENGE06` | VARCHAR(10) |  |
| 14 | `LAENGE07` | VARCHAR(10) |  |
| 15 | `LAENGE08` | VARCHAR(10) |  |
| 16 | `LAENGE09` | VARCHAR(10) |  |
| 17 | `LAENGE10` | VARCHAR(10) |  |

### SQLARTIKELME ⚪

**Beschreibung:** Artikel-Mengeneinheiten — Umrechnungsfaktoren zwischen verschiedenen Einheiten.
**Datensätze:** 0 | **Spalten:** 6

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `ZNR` | VARCHAR(2) | ✅ |
| 3 | `GRUNDMENGE` | VARCHAR(15) |  |
| 4 | `GRUNDMEINH` | VARCHAR(10) |  |
| 5 | `ENTSPRICHTMENGE` | VARCHAR(15) |  |
| 6 | `ENTSPRICHTMEINH` | VARCHAR(10) |  |

### SQLARTIKELPARAMS ⚪

**Beschreibung:** Artikel-Parameter — Konfigurierbare Eigenschaften pro Artikel (z.B. Farbe, Material).
**Datensätze:** 0 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `PCOUNTER` | VARCHAR(3) | ✅ |
| 3 | `PARAMS` | VARCHAR(40) |  |
| 4 | `INHALT` | VARCHAR(60) |  |

### SQLARTIKELPARBEZ ⚪

**Beschreibung:** Artikel-Parameter-Bezeichnungen — Definiert die möglichen Parameter-Kategorien.
**Datensätze:** 0 | **Spalten:** 2

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZNR` | VARCHAR(3) | ✅ |
| 2 | `PARAMS` | VARCHAR(40) |  |

### SQLARTKSPREIS 🟢

**Beschreibung:** Artikel-Kundenspezifische Preise — Sonderpreise pro Kunde/Artikel-Kombination.
**Datensätze:** 50,100 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTNR` | VARCHAR(15) | ✅ |
| 2 | `ADRNR` | VARCHAR(12) | ✅ |
| 3 | `PREIS` | VARCHAR(10) |  |
| 4 | `ADRNAME` | VARCHAR(40) |  |

### SQLARTLEASING ⚪

**Beschreibung:** Artikel-Leasing — Leasingverträge für Artikel an Kunden.
**Datensätze:** 0 | **Spalten:** 8

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(40) | ✅ |
| 2 | `ADRESSNR` | VARCHAR(20) | ✅ |
| 3 | `ZAEHLER` | VARCHAR(2) | ✅ |
| 4 | `NAME` | VARCHAR(12) | ✅ |
| 5 | `MINWERT` | VARCHAR(12) |  |
| 6 | `MAXWERT` | VARCHAR(12) |  |
| 7 | `LAUFZEIT` | VARCHAR(3) |  |
| 8 | `FAKTOR` | VARCHAR(6) |  |

### SQLARTSTAFF 🟡

**Beschreibung:** Artikel-Staffelpreise — Mengenabhängige Preisstaffelungen.
**Datensätze:** 4 | **Spalten:** 7

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTNR` | VARCHAR(15) | ✅ |
| 2 | `MENGE` | VARCHAR(10) | ✅ |
| 3 | `PREIS0` | VARCHAR(10) |  |
| 4 | `PREIS1` | VARCHAR(10) |  |
| 5 | `PREIS2` | VARCHAR(10) |  |
| 6 | `PREIS3` | VARCHAR(10) |  |
| 7 | `DEKP` | VARCHAR(10) |  |

### SQLARTSTAT 🟢

**Beschreibung:** Artikelstatistik — Umsatz- und Bewegungsdaten pro Artikel/Beleg.
**Datensätze:** 467,685 | **Spalten:** 32

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BELEGNR` | VARCHAR(12) | ✅ |
| 2 | `BELEGART` | VARCHAR(2) | ✅ |
| 3 | `KZ` | FLOAT | ✅ |
| 4 | `KUNDENNR` | VARCHAR(12) | ✅ |
| 5 | `VORGANG` | VARCHAR(16) | ✅ |
| 6 | `BELEGDATUM` | DATE | ✅ |
| 7 | `MITARBEITER` | VARCHAR(3) | ✅ |
| 8 | `POSIDENT` | VARCHAR(15) | ✅ |
| 9 | `POSART` | VARCHAR(1) |  |
| 10 | `MENGE` | VARCHAR(10) |  |
| 11 | `PREISKZ` | VARCHAR(1) |  |
| 12 | `LISTENP` | FLOAT |  |
| 13 | `VKP` | FLOAT |  |
| 14 | `EKP` | FLOAT |  |
| 15 | `LAGERBUCHUNG` | VARCHAR(2) |  |
| 16 | `PEINH` | VARCHAR(10) |  |
| 17 | `MEINH` | VARCHAR(5) |  |
| 18 | `WAEHRUNG` | VARCHAR(5) |  |
| 19 | `ARTBEZ` | VARCHAR(40) |  |
| 20 | `KOSTST` | VARCHAR(8) |  |
| 21 | `PROJNR` | VARCHAR(20) |  |
| 22 | `PROVISION` | VARCHAR(10) |  |
| 23 | `ARTBEZ2` | VARCHAR(40) |  |
| 24 | `ARTBEZ3` | VARCHAR(40) |  |
| 25 | `ARTBEZ4` | VARCHAR(40) |  |
| 26 | `ARTBEZ5` | VARCHAR(40) |  |
| 27 | `LANGTEXT` | BLOB |  |
| 28 | `SERIALNO` | VARCHAR(40) |  |
| 29 | `LOSGROESSE` | VARCHAR(10) |  |
| 30 | `LOSMEINH` | VARCHAR(8) |  |
| 31 | `GRUNDMEINH` | VARCHAR(8) |  |
| 32 | `UMRECHNUNGSFAKTOR` | VARCHAR(10) |  |

### SQLLIEFERANT 🟢

**Beschreibung:** Lieferanten-Artikel-Zuordnung — Welcher Lieferant liefert welchen Artikel zu welchem Preis.
**Datensätze:** 448 | **Spalten:** 21

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `LIEFERNR` | VARCHAR(2) | ✅ |
| 3 | `STAMMNR` | VARCHAR(12) | ✅ |
| 4 | `LIEFERNAME` | VARCHAR(30) |  |
| 5 | `MENGE1` | VARCHAR(10) | ✅ |
| 6 | `PREIS1` | FLOAT | ✅ |
| 7 | `MENGE2` | VARCHAR(10) | ✅ |
| 8 | `PREIS2` | FLOAT | ✅ |
| 9 | `MENGE3` | VARCHAR(10) | ✅ |
| 10 | `PREIS3` | FLOAT | ✅ |
| 11 | `ARTNRLIEFER` | VARCHAR(15) |  |
| 12 | `EMPFOHLENERVK` | FLOAT |  |
| 13 | `EKRABATT` | VARCHAR(5) |  |
| 14 | `TRANSPORTGEB` | FLOAT |  |
| 15 | `WAEHRUNGSSYMBOL` | VARCHAR(5) | ✅ |
| 16 | `LIEFERZEIT` | VARCHAR(3) |  |
| 17 | `LETZTEREK` | FLOAT |  |
| 18 | `DATUM` | DATE |  |
| 19 | `BESTELLUNG` | VARCHAR(2) |  |
| 20 | `WARENGRUPPE` | VARCHAR(5) |  |
| 21 | `RABATTGRUPPE` | VARCHAR(5) |  |

### SQLMEINH 🟡

**Beschreibung:** Mengeneinheiten-Stamm — Definition aller verwendeten Mengeneinheiten (Stk, m, kg, etc.).
**Datensätze:** 11 | **Spalten:** 3

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `MEINHEIT` | VARCHAR(5) | ✅ |
| 2 | `BESCHREIBUNG` | VARCHAR(40) |  |
| 3 | `PRICATME` | VARCHAR(5) |  |

### SQLMITARB 🟡

**Beschreibung:** Mitarbeiterstammdaten — Interne Mitarbeiter mit Kürzel, Name, Berechtigungen.
**Datensätze:** 20 | **Spalten:** 41

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `MITARBNR` | VARCHAR(3) | ✅ |
| 2 | `NAME` | VARCHAR(30) | ✅ |
| 3 | `ADRNR` | VARCHAR(12) |  |
| 4 | `ZUGEBENE` | VARCHAR(3) |  |
| 5 | `UMSLFDMON` | DOUBLE |  |
| 6 | `UMSVORMON` | DOUBLE |  |
| 7 | `UMSLFDJAHR` | DOUBLE |  |
| 8 | `UMSVORJAHR` | DOUBLE |  |
| 9 | `PROVEBENE` | VARCHAR(3) |  |
| 10 | `PERSONALNR` | VARCHAR(10) |  |
| 11 | `BESCHAEFTIGT` | VARCHAR(30) |  |
| 12 | `BEGINN` | DATE |  |
| 13 | `ENDE` | DATE |  |
| 14 | `KARTENNR` | VARCHAR(25) |  |
| 15 | `WAEHRUNG` | VARCHAR(5) |  |
| 16 | `LOHNGR` | VARCHAR(2) |  |
| 17 | `INTMAIL` | VARCHAR(60) |  |
| 18 | `MAILVERT` | VARCHAR(50) |  |
| 19 | `SMTPHOST` | VARCHAR(30) |  |
| 20 | `POPHOST` | VARCHAR(30) |  |
| 21 | `BENUTZER` | VARCHAR(50) |  |
| 22 | `PASSWORT` | VARCHAR(25) |  |
| 23 | `STRASSE` | VARCHAR(40) |  |
| 24 | `PLZ` | VARCHAR(15) |  |
| 25 | `ORT` | VARCHAR(40) |  |
| 26 | `FONGESCH` | VARCHAR(30) |  |
| 27 | `FONPRIVAT` | VARCHAR(30) |  |
| 28 | `FAXGESCH` | VARCHAR(30) |  |
| 29 | `FAXPRIVAT` | VARCHAR(30) |  |
| 30 | `EMAILGESCH` | VARCHAR(30) |  |
| 31 | `EMAILPRIVAT` | VARCHAR(30) |  |
| 32 | `FUNKGESCH` | VARCHAR(30) |  |
| 33 | `FUNKPRIVAT` | VARCHAR(30) |  |
| 34 | `LOGINPW` | VARCHAR(15) |  |
| 35 | `PDMENUEAUS` | VARCHAR(1) |  |
| 36 | `MENUENAME` | VARCHAR(10) |  |
| 37 | `CALENDERVIEW` | VARCHAR(1) |  |
| 38 | `TEAMNAME` | VARCHAR(20) |  |
| 39 | `WTPLAN` | VARCHAR(30) |  |
| 40 | `WTHOLIDAYYEAR` | VARCHAR(3) |  |
| 41 | `WTHOLIDAYTAKEN` | VARCHAR(3) |  |

### SQLMWST 🟡

**Beschreibung:** Mehrwertsteuersätze — Konfiguration der verschiedenen MwSt-Schlüssel.
**Datensätze:** 7 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `SCHLNR` | VARCHAR(2) | ✅ |
| 2 | `RECHENWERT` | VARCHAR(5) | ✅ |
| 3 | `STEUERTEXT` | VARCHAR(20) | ✅ |
| 4 | `FIBUSCHL` | VARCHAR(2) |  |

### SQLOBJEKT ⚪

**Beschreibung:** Objekte — Verwaltung von Gebäuden/Anlagen/Schließanlagen bei Kunden.
**Datensätze:** 0 | **Spalten:** 28

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | INTEGER | ✅ |
| 2 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 3 | `SERIENNR` | VARCHAR(40) | ✅ |
| 4 | `MITARB` | VARCHAR(3) | ✅ |
| 5 | `VORGART` | VARCHAR(10) |  |
| 6 | `INFO` | VARCHAR(60) |  |
| 7 | `DOKUNR` | INTEGER |  |
| 8 | `DATUM` | DATE |  |
| 9 | `Z1` | VARCHAR(10) |  |
| 10 | `Z2` | VARCHAR(10) |  |
| 11 | `Z3` | VARCHAR(10) |  |
| 12 | `Z4` | VARCHAR(10) |  |
| 13 | `Z5` | VARCHAR(10) |  |
| 14 | `SNRBAUGR` | VARCHAR(40) |  |
| 15 | `SNRBGRALT` | VARCHAR(40) |  |
| 16 | `SNRBGRNEU` | VARCHAR(40) |  |
| 17 | `PARAM01` | VARCHAR(20) |  |
| 18 | `PARAM02` | VARCHAR(20) |  |
| 19 | `PARAM03` | VARCHAR(20) |  |
| 20 | `PARAM04` | VARCHAR(20) |  |
| 21 | `PARAM05` | VARCHAR(20) |  |
| 22 | `BELEGART` | VARCHAR(2) |  |
| 23 | `BELEGNR` | VARCHAR(6) |  |
| 24 | `KOSTENART` | VARCHAR(10) |  |
| 25 | `ARTNR` | VARCHAR(15) |  |
| 26 | `MENGE` | VARCHAR(10) |  |
| 27 | `EEKP` | VARCHAR(10) |  |
| 28 | `EVKP` | VARCHAR(10) |  |

### SQLOBJHISTART ⚪

**Beschreibung:** Objekt-Historienarten — Typen von Einträgen in der Objekthistorie.
**Datensätze:** 0 | **Spalten:** 2

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PHARTKZ` | VARCHAR(3) | ✅ |
| 2 | `PHARTBEZ` | VARCHAR(30) | ✅ |

### SQLPERSON 🟢

**Beschreibung:** Ansprechpartner/Kontaktpersonen — Zu Adressen gehörende Personen (Name, Telefon, Email, Funktion).
**Datensätze:** 20,851 | **Spalten:** 22

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ADRESSNR` | VARCHAR(12) | ✅ |
| 2 | `LFDNR` | VARCHAR(3) | ✅ |
| 3 | `MATCHCODE` | VARCHAR(15) |  |
| 4 | `RANG` | VARCHAR(5) |  |
| 5 | `ANREDE` | VARCHAR(40) |  |
| 6 | `NAME` | VARCHAR(40) | ✅ |
| 7 | `NAME2` | VARCHAR(40) |  |
| 8 | `STRASSE` | VARCHAR(40) |  |
| 9 | `PLZ` | VARCHAR(15) |  |
| 10 | `ORT` | VARCHAR(40) |  |
| 11 | `VORWAHL` | VARCHAR(20) |  |
| 12 | `TELEFON` | VARCHAR(20) |  |
| 13 | `TELEFAX` | VARCHAR(20) |  |
| 14 | `FUNK` | VARCHAR(20) |  |
| 15 | `DURCHWAHL` | VARCHAR(15) |  |
| 16 | `GEBURTSTAG` | VARCHAR(10) |  |
| 17 | `EMAIL` | VARCHAR(80) |  |
| 18 | `INTERNET` | VARCHAR(120) |  |
| 19 | `AUSGABEOUTLOOK` | VARCHAR(1) |  |
| 20 | `DATUM` | DATE |  |
| 21 | `BNAME` | VARCHAR(30) |  |
| 22 | `PW` | VARCHAR(20) |  |

### SQLREGIONS ⚪

**Beschreibung:** Regionen/Gebiete — Geografische Zuordnung für Vertreter/Touren.
**Datensätze:** 0 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `REGIONS` | VARCHAR(10) | ✅ |
| 2 | `KZ` | VARCHAR(3) | ✅ |
| 3 | `ANZCAL` | VARCHAR(1) | ✅ |
| 4 | `BESCHREIBUNG` | VARCHAR(50) |  |

### SQLSERIENNR 🟡

**Beschreibung:** Seriennummern — Tracking von Seriennummern für bestimmte Artikel.
**Datensätze:** 35 | **Spalten:** 61

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `LFDNR` | VARCHAR(5) | ✅ |
| 3 | `SERIENNR` | VARCHAR(40) | ✅ |
| 4 | `SERIENNRBAR` | VARCHAR(40) |  |
| 5 | `ARTIKELNRBAR` | VARCHAR(15) |  |
| 6 | `ARTIKELBEZ` | VARCHAR(40) |  |
| 7 | `KUNDENNR` | VARCHAR(12) |  |
| 8 | `KUNDENNAME` | VARCHAR(30) |  |
| 9 | `DATUMAUS` | DATE |  |
| 10 | `BELEGARTAUS` | VARCHAR(2) |  |
| 11 | `BELEGNRAUS` | VARCHAR(12) |  |
| 12 | `LIEFERNR` | VARCHAR(12) |  |
| 13 | `LIEFERNAME` | VARCHAR(30) |  |
| 14 | `DATUMEIN` | DATE |  |
| 15 | `BELEGARTEIN` | VARCHAR(2) |  |
| 16 | `BELEGNREIN` | VARCHAR(12) |  |
| 17 | `GARANTIEEIN` | VARCHAR(10) |  |
| 18 | `GARANTIEAUS` | VARCHAR(10) |  |
| 19 | `SNRAUSIDENT` | VARCHAR(25) |  |
| 20 | `SNREINIDENT` | VARCHAR(25) |  |
| 21 | `LEASINGNR` | VARCHAR(12) |  |
| 22 | `LEASINGNAME` | VARCHAR(30) |  |
| 23 | `BEMERKUNG` | VARCHAR(80) |  |
| 24 | `WARTGZYKLUS` | VARCHAR(10) |  |
| 25 | `DATUM1` | VARCHAR(10) |  |
| 26 | `DATUM2` | VARCHAR(10) |  |
| 27 | `DATUM3` | VARCHAR(10) |  |
| 28 | `DATUM4` | VARCHAR(10) |  |
| 29 | `DATUM5` | VARCHAR(10) |  |
| 30 | `DATUM6` | VARCHAR(10) |  |
| 31 | `BESITZART` | VARCHAR(10) |  |
| 32 | `GERAETEART` | VARCHAR(20) |  |
| 33 | `FREI01` | VARCHAR(20) |  |
| 34 | `FREI02` | VARCHAR(20) |  |
| 35 | `FREI03` | VARCHAR(20) |  |
| 36 | `FREI04` | VARCHAR(20) |  |
| 37 | `FREI05` | VARCHAR(20) |  |
| 38 | `FREI06` | VARCHAR(20) |  |
| 39 | `FREI07` | VARCHAR(20) |  |
| 40 | `FREI08` | VARCHAR(20) |  |
| 41 | `FREI09` | VARCHAR(20) |  |
| 42 | `FREI10` | VARCHAR(20) |  |
| 43 | `EIGNERNR` | VARCHAR(12) |  |
| 44 | `EIGNERNAME` | VARCHAR(30) |  |
| 45 | `VERTRAGSART` | VARCHAR(10) |  |
| 46 | `VERTRAGSNR` | VARCHAR(10) |  |
| 47 | `VERTRAGSBEG` | DATE |  |
| 48 | `VERTRAGSEND` | DATE |  |
| 49 | `VERTRAGLABR` | DATE |  |
| 50 | `VERTABRZYK` | VARCHAR(1) |  |
| 51 | `NUMWERT1` | VARCHAR(10) |  |
| 52 | `NUMWERT2` | VARCHAR(10) |  |
| 53 | `NUMWERT3` | VARCHAR(10) |  |
| 54 | `MONATLGPEK` | VARCHAR(10) |  |
| 55 | `MONATLGPVK` | VARCHAR(10) |  |
| 56 | `PREIS1EK` | VARCHAR(10) |  |
| 57 | `PREIS1VK` | VARCHAR(10) |  |
| 58 | `PREIS2EK` | VARCHAR(10) |  |
| 59 | `PREIS2VK` | VARCHAR(10) |  |
| 60 | `PREIS3EK` | VARCHAR(10) |  |
| 61 | `PREIS3VK` | VARCHAR(10) |  |

### SQLVERSAND 🟡

**Beschreibung:** Versandarten — Definition der Versandmethoden (Post, Spedition, Selbstabholung).
**Datensätze:** 2 | **Spalten:** 3

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `VARTNR` | VARCHAR(2) | ✅ |
| 2 | `VARTTEXT` | VARCHAR(40) | ✅ |
| 3 | `VARTKZ` | VARCHAR(2) | ✅ |

### SQLWAEHRG 🟡

**Beschreibung:** Währungen — Währungsstammdaten mit Umrechnungskursen.
**Datensätze:** 2 | **Spalten:** 10

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `NUMMER` | VARCHAR(3) | ✅ |
| 2 | `SYMBOL` | VARCHAR(5) | ✅ |
| 3 | `BEZEICHNUNG` | VARCHAR(40) | ✅ |
| 4 | `EINGABEMASKE` | VARCHAR(20) | ✅ |
| 5 | `DEZSTELLENINT` | VARCHAR(2) | ✅ |
| 6 | `UMRECHGART` | VARCHAR(1) | ✅ |
| 7 | `UMRECHNUNG` | VARCHAR(10) | ✅ |
| 8 | `FUNKTION` | VARCHAR(2) | ✅ |
| 9 | `LETZTEAENDG` | DATE | ✅ |
| 10 | `GRUNDWAEHRUNG` | VARCHAR(1) | ✅ |

### SQLWGR 🟡

**Beschreibung:** Warengruppen — Kategorisierung der Artikel in Warengruppen pro Lieferant.
**Datensätze:** 58 | **Spalten:** 12

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LIEFERANTNR` | VARCHAR(12) | ✅ |
| 2 | `WARENGRUPPE` | VARCHAR(5) | ✅ |
| 3 | `WGBEZEICHNUNG` | VARCHAR(40) | ✅ |
| 4 | `UNTERWG` | VARCHAR(5) |  |
| 5 | `KOSTENKONTO` | VARCHAR(8) |  |
| 6 | `ERLOESKONTO` | VARCHAR(8) |  |
| 7 | `RABATTBASIS` | VARCHAR(1) |  |
| 8 | `RABSTAFF01` | VARCHAR(5) |  |
| 9 | `RABSTAFF02` | VARCHAR(5) |  |
| 10 | `RABSTAFF03` | VARCHAR(5) |  |
| 11 | `RABSTAFF04` | VARCHAR(5) |  |
| 12 | `RABSTAFF05` | VARCHAR(5) |  |

### SQLZAHLBED 🟡

**Beschreibung:** Zahlungsbedingungen — Zahlungsziele, Skonto-Staffeln.
**Datensätze:** 53 | **Spalten:** 6

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZZNR` | VARCHAR(2) | ✅ |
| 2 | `ZZTEXT` | VARCHAR(40) | ✅ |
| 3 | `ZZSKONTOP` | INTEGER | ✅ |
| 4 | `FAELLIGNETTO` | INTEGER | ✅ |
| 5 | `FAELLIGSKONTO` | INTEGER | ✅ |
| 6 | `ZZART` | VARCHAR(5) |  |

---

## Aufträge/Belege

### SQLAUFMASS ⚪

**Beschreibung:** Aufmaße — Aufmaßvorgänge bei Baustellenarbeiten.
**Datensätze:** 0 | **Spalten:** 15

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `VORGANG` | VARCHAR(8) | ✅ |
| 2 | `KZINT` | DOUBLE | ✅ |
| 3 | `SATZNR` | VARCHAR(3) | ✅ |
| 4 | `BEZEICHNUNG` | VARCHAR(50) | ✅ |
| 5 | `ART` | VARCHAR(2) | ✅ |
| 6 | `MENGE` | DOUBLE | ✅ |
| 7 | `F1` | DOUBLE | ✅ |
| 8 | `F2` | DOUBLE | ✅ |
| 9 | `F3` | DOUBLE | ✅ |
| 10 | `F4` | DOUBLE | ✅ |
| 11 | `F5` | DOUBLE | ✅ |
| 12 | `FORMEL` | VARCHAR(50) |  |
| 13 | `MG` | DOUBLE | ✅ |
| 14 | `ABZUG` | DOUBLE | ✅ |
| 15 | `RMG` | DOUBLE | ✅ |

### SQLAUFMASSP 🟡

**Beschreibung:** Aufmaß-Positionen — Einzelpositionen zu Aufmaßvorgängen.
**Datensätze:** 7 | **Spalten:** 27

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `VORGANG` | VARCHAR(16) | ✅ |
| 2 | `KZINT` | FLOAT | ✅ |
| 3 | `STLPOS` | VARCHAR(5) | ✅ |
| 4 | `ARTNR` | VARCHAR(15) |  |
| 5 | `ARTDIM` | VARCHAR(5) |  |
| 6 | `AMENGE` | VARCHAR(10) |  |
| 7 | `AMEINH` | VARCHAR(6) |  |
| 8 | `BESCHREIBUNG` | VARCHAR(50) |  |
| 9 | `BERECHNUNGSART` | VARCHAR(2) |  |
| 10 | `FORMEL` | VARCHAR(50) |  |
| 11 | `PMENGE` | VARCHAR(10) |  |
| 12 | `PMEINH` | VARCHAR(6) |  |
| 13 | `ABZUG` | VARCHAR(10) |  |
| 14 | `MASSEINHABZUG` | VARCHAR(6) |  |
| 15 | `GMENGE` | VARCHAR(10) |  |
| 16 | `GMEINH` | VARCHAR(6) |  |
| 17 | `LMM` | VARCHAR(10) |  |
| 18 | `LMEINH` | VARCHAR(6) |  |
| 19 | `BMM` | VARCHAR(10) |  |
| 20 | `BMEINH` | VARCHAR(6) |  |
| 21 | `HMM` | VARCHAR(10) |  |
| 22 | `HMEINH` | VARCHAR(6) |  |
| 23 | `TU1` | VARCHAR(10) |  |
| 24 | `TU2` | VARCHAR(10) |  |
| 25 | `TU3` | VARCHAR(10) |  |
| 26 | `TU4` | VARCHAR(10) |  |
| 27 | `UMFBER` | VARCHAR(10) |  |

### SQLAUFTRAG 🟢

**Beschreibung:** Belegköpfe — Zentrale Tabelle für ALLE Belegarten (Angebote, Aufträge, Lieferscheine, Rechnungen, Gutschriften, etc.). Die BELEGART bestimmt den Typ.
**Datensätze:** 270,533 | **Spalten:** 99

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `VORGANG` | VARCHAR(16) | ✅ |
| 2 | `BELEGART` | VARCHAR(2) | ✅ |
| 3 | `MATCHCODE` | VARCHAR(50) |  |
| 4 | `MITARB` | VARCHAR(3) | ✅ |
| 5 | `ADRESSNR` | VARCHAR(12) | ✅ |
| 6 | `ADRESSNAME` | VARCHAR(30) |  |
| 7 | `LIEFERANSCHRIFT` | VARCHAR(4) |  |
| 8 | `BELEGNR` | VARCHAR(12) |  |
| 9 | `BELEGDATUM` | DATE |  |
| 10 | `BEZUG` | BLOB |  |
| 11 | `ZAHLGSZIEL` | VARCHAR(2) |  |
| 12 | `PKZ` | VARCHAR(1) |  |
| 13 | `RABATTSTAFFEL` | VARCHAR(2) |  |
| 14 | `RABATTGESAMT` | VARCHAR(6) |  |
| 15 | `ANFRAGEDATUM` | DATE |  |
| 16 | `AUFTRAGSDATUM` | DATE |  |
| 17 | `WIEDERVORLAGE` | DATE |  |
| 18 | `LIEFERDATUM` | DATE |  |
| 19 | `BINDUNGSFRIST` | DATE |  |
| 20 | `LAGERBUCHUNG` | VARCHAR(2) |  |
| 21 | `VERSANDART` | VARCHAR(2) |  |
| 22 | `GESAMTNETTO` | DOUBLE |  |
| 23 | `GESAMTBRUTTO` | DOUBLE |  |
| 24 | `SKONTOWERT` | DOUBLE |  |
| 25 | `ANZAHLPOS` | VARCHAR(4) |  |
| 26 | `ANZAHLLS` | VARCHAR(6) |  |
| 27 | `ANZHLTR` | VARCHAR(6) |  |
| 28 | `ANZAHLAR` | VARCHAR(6) |  |
| 29 | `GESAMTHMWST` | DOUBLE |  |
| 30 | `GESAMTVMWST` | DOUBLE |  |
| 31 | `INTKZ` | FLOAT |  |
| 32 | `ZUHAENDEN` | VARCHAR(30) |  |
| 33 | `LETZTERUBELEG` | VARCHAR(2) |  |
| 34 | `DATENBLATTDRUCK` | VARCHAR(1) |  |
| 35 | `GEWAEHRLEISTGP` | DOUBLE |  |
| 36 | `GEWAEHRLEISTGW` | DOUBLE |  |
| 37 | `LIEFERKW` | VARCHAR(5) |  |
| 38 | `KOSTENST` | VARCHAR(8) |  |
| 39 | `ERLOESKONTO` | VARCHAR(8) |  |
| 40 | `DOKUNR` | VARCHAR(20) |  |
| 41 | `WAEHRUNG` | VARCHAR(5) |  |
| 42 | `ZUSATZ01` | VARCHAR(20) |  |
| 43 | `ZUSATZ02` | VARCHAR(20) |  |
| 44 | `ZUSATZ03` | VARCHAR(20) |  |
| 45 | `ZUSATZ04` | VARCHAR(20) |  |
| 46 | `ZUSATZ05` | VARCHAR(20) |  |
| 47 | `ZUSATZ06` | VARCHAR(20) |  |
| 48 | `ZUSATZ07` | VARCHAR(20) |  |
| 49 | `ZUSATZ08` | VARCHAR(20) |  |
| 50 | `ZUSATZ09` | VARCHAR(20) |  |
| 51 | `ZUSATZ10` | VARCHAR(20) |  |
| 52 | `AUFTRAGFERTIG` | DATE |  |
| 53 | `AUFTRAGGEBUCHT` | DATE |  |
| 54 | `MWSTPFLICHT` | VARCHAR(1) |  |
| 55 | `WAEHRG2` | VARCHAR(5) |  |
| 56 | `NETTO2` | DOUBLE |  |
| 57 | `BRUTTO2` | DOUBLE |  |
| 58 | `SKONTO2` | DOUBLE |  |
| 59 | `KOSTENKONTO` | VARCHAR(8) |  |
| 60 | `LIEFERADRESSE` | VARCHAR(12) |  |
| 61 | `DRUCKDATUM` | DATE |  |
| 62 | `DRUCKMITARB` | VARCHAR(3) |  |
| 63 | `ANZAHLDRUCKE` | INTEGER |  |
| 64 | `VERBUCHT` | VARCHAR(1) |  |
| 65 | `FREMDSTAT` | VARCHAR(5) |  |
| 66 | `PRODGEBUCHT` | VARCHAR(1) |  |
| 67 | `LIEFSCHNR` | VARCHAR(12) |  |
| 68 | `LIEFDATUM` | VARCHAR(10) |  |
| 69 | `DRUCKLANGTEXT` | VARCHAR(1) |  |
| 70 | `AENDDATUM` | DATE |  |
| 71 | `AENDMITARB` | VARCHAR(3) |  |
| 72 | `MWSTK` | VARCHAR(2) |  |
| 73 | `MWSTH` | VARCHAR(2) |  |
| 74 | `MWSTV` | VARCHAR(2) |  |
| 75 | `LISCHEINGEBUCHT` | VARCHAR(1) |  |
| 76 | `BELEGFREIGABE` | VARCHAR(1) |  |
| 77 | `FUSSTEXT` | BLOB |  |
| 78 | `OHNEMWST` | VARCHAR(1) |  |
| 79 | `GESAMTGEWICHT` | VARCHAR(10) |  |
| 80 | `KOMSCHEIN` | VARCHAR(1) |  |
| 81 | `VSTSCHERLOESE` | VARCHAR(5) |  |
| 82 | `VSTSCHKOSTEN` | VARCHAR(5) |  |
| 83 | `KURZBEZEICHNUNG` | VARCHAR(30) |  |
| 84 | `BEMERKUNG` | VARCHAR(150) |  |
| 85 | `AUFTRAGSNRKD` | VARCHAR(25) |  |
| 86 | `LSTGVON` | DATE |  |
| 87 | `LSTGBIS` | DATE |  |
| 88 | `PROJEKTLEDIGT` | VARCHAR(1) |  |
| 89 | `MWSTH2` | VARCHAR(2) |  |
| 90 | `MWSTV2` | VARCHAR(2) |  |
| 91 | `GESAMTHMWST2` | DOUBLE |  |
| 92 | `GESAMTVMWST2` | DOUBLE |  |
| 93 | `GNETTOK` | DOUBLE |  |
| 94 | `GNETTOH` | DOUBLE |  |
| 95 | `GNETTOV` | DOUBLE |  |
| 96 | `GNETTOH2` | DOUBLE |  |
| 97 | `GNETTOV2` | DOUBLE |  |
| 98 | `ORGBELEGNR` | VARCHAR(20) |  |
| 99 | `ORGBELEGDATUM` | DATE |  |

### SQLBELEGART 🟡

**Beschreibung:** Belegarten-Definition — Konfiguration aller Belegtypen (AN=Angebot, AB=Auftrag, LS=Lieferschein, BR=Rechnung, etc.).
**Datensätze:** 88 | **Spalten:** 93

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BELEGART` | VARCHAR(2) | ✅ |
| 2 | `NAME` | VARCHAR(30) | ✅ |
| 3 | `ANZAUFTRAG` | VARCHAR(1) | ✅ |
| 4 | `ANZKASSE` | VARCHAR(1) | ✅ |
| 5 | `ANZABK` | VARCHAR(1) | ✅ |
| 6 | `ANZLSTLISTE` | VARCHAR(1) | ✅ |
| 7 | `ANZARTLISTE` | VARCHAR(1) | ✅ |
| 8 | `ANZZAHLVERK` | VARCHAR(1) | ✅ |
| 9 | `ANZRECHEING` | VARCHAR(1) | ✅ |
| 10 | `ANZPRODUKT` | VARCHAR(1) | ✅ |
| 11 | `KASSEBUCHEN` | VARCHAR(1) | ✅ |
| 12 | `DRUCKINLL` | VARCHAR(1) | ✅ |
| 13 | `DRUCKOPTION` | VARCHAR(1) | ✅ |
| 14 | `MEHRFDRUCK` | VARCHAR(1) | ✅ |
| 15 | `DRUCKBRIEFK` | VARCHAR(1) | ✅ |
| 16 | `ARTINKONTO` | VARCHAR(1) | ✅ |
| 17 | `LIEFERDLG` | VARCHAR(1) | ✅ |
| 18 | `MAHNUNG` | VARCHAR(1) | ✅ |
| 19 | `LAGERABB` | VARCHAR(1) | ✅ |
| 20 | `SERIENNR` | VARCHAR(1) | ✅ |
| 21 | `STATISTIK` | VARCHAR(1) | ✅ |
| 22 | `BELEGNRFELD` | VARCHAR(2) | ✅ |
| 23 | `KASSENBUCH` | VARCHAR(1) | ✅ |
| 24 | `RABUCH` | VARCHAR(1) | ✅ |
| 25 | `REBUCH` | VARCHAR(1) | ✅ |
| 26 | `UMSATZADR` | VARCHAR(1) | ✅ |
| 27 | `KONTOLISTE` | VARCHAR(1) | ✅ |
| 28 | `UMSSTATIST` | VARCHAR(1) | ✅ |
| 29 | `BUCHFIBUAUS` | VARCHAR(1) |  |
| 30 | `DRUCKAUFBUCH` | VARCHAR(1) |  |
| 31 | `FORMNRKOPF1` | VARCHAR(3) | ✅ |
| 32 | `FORMNRKOPF2` | VARCHAR(3) | ✅ |
| 33 | `FORMNRPOS` | VARCHAR(3) | ✅ |
| 34 | `FORMNRSW` | VARCHAR(3) | ✅ |
| 35 | `FORMNREND` | VARCHAR(3) | ✅ |
| 36 | `BELEGABLEITG` | VARCHAR(15) |  |
| 37 | `BELEGWANDELSPERR` | VARCHAR(1) |  |
| 38 | `FORMNRLTEXT` | VARCHAR(3) |  |
| 39 | `FORMNRPOS2` | VARCHAR(3) |  |
| 40 | `ABRECHART` | VARCHAR(1) |  |
| 41 | `DRUCKERNAME` | VARCHAR(25) |  |
| 42 | `DRUCKORIENT` | VARCHAR(1) |  |
| 43 | `DRUCKSEITEGR` | VARCHAR(15) |  |
| 44 | `DRUCKOBRAND` | VARCHAR(5) |  |
| 45 | `DRUCKSWRAND` | VARCHAR(5) |  |
| 46 | `DRUCKUNRAND` | VARCHAR(5) |  |
| 47 | `BELEGKAT` | VARCHAR(3) | ✅ |
| 48 | `DRUCKSCHACHT` | INTEGER |  |
| 49 | `SCHACHTWECHS` | VARCHAR(1) | ✅ |
| 50 | `FORMNRSONDER` | VARCHAR(3) |  |
| 51 | `FORMNRAUFMASS` | VARCHAR(3) |  |
| 52 | `FORMNRSTL` | VARCHAR(3) |  |
| 53 | `VDA4906` | VARCHAR(1) |  |
| 54 | `BELEGLOESCHEN` | VARCHAR(1) |  |
| 55 | `BUCHGLOESCHEN` | VARCHAR(1) |  |
| 56 | `ZUGRIFFSEBENE` | VARCHAR(3) | ✅ |
| 57 | `DRUCKFUNKTION` | VARCHAR(3) | ✅ |
| 58 | `AUTOLIEFERBUCHG` | VARCHAR(1) | ✅ |
| 59 | `PDFDRUCK` | VARCHAR(1) |  |
| 60 | `PDFVERZ` | VARCHAR(5) |  |
| 61 | `BUCHKONTENBLATT` | VARCHAR(1) |  |
| 62 | `DEKPBERECHNEN` | VARCHAR(1) |  |
| 63 | `OHNEMWST` | VARCHAR(1) |  |
| 64 | `AGBFORM` | VARCHAR(3) |  |
| 65 | `ANZUEBERWEISG` | VARCHAR(1) |  |
| 66 | `STORNOBELEGART` | VARCHAR(2) |  |
| 67 | `DLGZAHLBELEGANL` | VARCHAR(2) |  |
| 68 | `ZAHLFORM` | VARCHAR(3) |  |
| 69 | `CHARGENBILDEN` | VARCHAR(1) |  |
| 70 | `CHARGENLISTE` | VARCHAR(1) |  |
| 71 | `CHARGENLAGER` | VARCHAR(1) |  |
| 72 | `CHARGEBUCHENAUF` | VARCHAR(1) |  |
| 73 | `MAILEXPORT` | VARCHAR(1) |  |
| 74 | `BARTFIBUEXP` | VARCHAR(2) |  |
| 75 | `ALTERFRMKOPF` | VARCHAR(3) |  |
| 76 | `ALTERFRMFUSS` | VARCHAR(3) |  |
| 77 | `BARTABCOPY` | VARCHAR(1) |  |
| 78 | `PDFVERSAND` | VARCHAR(1) |  |
| 79 | `SIGNIEREN` | VARCHAR(1) |  |
| 80 | `DLGZAHLART` | VARCHAR(1) |  |
| 81 | `BELEGART2` | VARCHAR(2) |  |
| 82 | `ADRFOLDER` | VARCHAR(1) |  |
| 83 | `STEUERART` | VARCHAR(2) |  |
| 84 | `BRIEFKOPF1` | VARCHAR(5) |  |
| 85 | `BRIEFKOPF2` | VARCHAR(5) |  |
| 86 | `BRIEFFUSS1` | VARCHAR(5) |  |
| 87 | `BRIEFFUSS2` | VARCHAR(5) |  |
| 88 | `ECBUCHEN` | VARCHAR(1) |  |
| 89 | `BELEGSCHLIESSEN` | VARCHAR(1) |  |
| 90 | `LAGRESERV` | VARCHAR(1) | ✅ |
| 91 | `ARCHIVIEREN` | VARCHAR(1) | ✅ |
| 92 | `DRUCKBRIEFPDF` | VARCHAR(1) | ✅ |
| 93 | `XRECHNUNG` | VARCHAR(1) | ✅ |

### SQLBELEGKATEG ⚪

**Beschreibung:** Beleg-Kategorien — Gruppierung von Belegarten in übergeordnete Kategorien.
**Datensätze:** 0 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZAEHLER` | VARCHAR(3) | ✅ |
| 2 | `BELKATEG` | VARCHAR(3) | ✅ |
| 3 | `STDBELART` | VARCHAR(3) |  |
| 4 | `KATEGBEZ` | VARCHAR(40) |  |

### SQLMAHNUNG ⚪

**Beschreibung:** Mahnungen — Mahnwesen für offene Rechnungen (Mahnstufen, Fristen).
**Datensätze:** 0 | **Spalten:** 13

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BELEGART` | VARCHAR(2) | ✅ |
| 2 | `BELEGNR` | VARCHAR(12) | ✅ |
| 3 | `UBELEGNR` | VARCHAR(1) | ✅ |
| 4 | `ADRESSNR` | VARCHAR(15) |  |
| 5 | `ADRESSNAME` | VARCHAR(50) |  |
| 6 | `MAHNSTUFE` | VARCHAR(1) |  |
| 7 | `PLUSMINUS` | VARCHAR(1) |  |
| 8 | `NETTO` | VARCHAR(10) |  |
| 9 | `BRUTTO` | VARCHAR(10) |  |
| 10 | `TEILZ` | VARCHAR(10) |  |
| 11 | `WAEHRUNG` | VARCHAR(5) |  |
| 12 | `REDATUM` | VARCHAR(10) |  |
| 13 | `FAELLIG` | VARCHAR(10) |  |

### SQLTEILRECH 🟢

**Beschreibung:** Teilrechnungen — Verknüpfung von Teilrechnungen/Abschlagsrechnungen zu Aufträgen.
**Datensätze:** 29,378 | **Spalten:** 8

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `VORGANG` | VARCHAR(16) | ✅ |
| 2 | `BELEGART` | VARCHAR(2) | ✅ |
| 3 | `BELEGNR` | VARCHAR(12) | ✅ |
| 4 | `BELEGDATUM` | DATE |  |
| 5 | `GESAMTNETTO` | FLOAT |  |
| 6 | `GESAMTBRUTTO` | FLOAT |  |
| 7 | `SKONTO` | FLOAT |  |
| 8 | `WAEHRUNG` | VARCHAR(5) |  |

---

## Positionen

### SQLPOSART 🟡

**Beschreibung:** Positionsarten — Definition der möglichen Positionstypen (Normal, Text, Summe, etc.).
**Datensätze:** 6 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PART` | VARCHAR(1) | ✅ |
| 2 | `PARTTEXT` | VARCHAR(25) | ✅ |
| 3 | `ANZEIGEN` | VARCHAR(1) | ✅ |
| 4 | `WERTIGKEIT` | INTEGER |  |

### SQLPOSITION 🟢

**Beschreibung:** Belegpositionen — Einzelpositionen aller Belege (Artikel, Menge, Preis, Rabatt).
**Datensätze:** 917,937 | **Spalten:** 73

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `VORGANG` | VARCHAR(16) | ✅ |
| 2 | `POSNR` | VARCHAR(5) | ✅ |
| 3 | `POSIDENT` | VARCHAR(15) | ✅ |
| 4 | `AUSSCHREIBGNR` | VARCHAR(15) |  |
| 5 | `POSART` | VARCHAR(1) | ✅ |
| 6 | `KURZTEXT1` | VARCHAR(40) | ✅ |
| 7 | `KURZTEXT2` | VARCHAR(40) |  |
| 8 | `KURZTEXT3` | VARCHAR(40) |  |
| 9 | `KURZTEXT4` | VARCHAR(40) |  |
| 10 | `KURZTEXT5` | VARCHAR(40) |  |
| 11 | `MEINH` | VARCHAR(5) |  |
| 12 | `MENGEGESAMT` | VARCHAR(10) | ✅ |
| 13 | `MENGEGELIEFERT` | VARCHAR(10) |  |
| 14 | `MWST` | VARCHAR(2) | ✅ |
| 15 | `LAGERBUCHUNG` | VARCHAR(2) | ✅ |
| 16 | `RABATTOFFEN` | VARCHAR(6) |  |
| 17 | `BILDDRUCKEN` | VARCHAR(4) |  |
| 18 | `NETTOPREIS` | DOUBLE |  |
| 19 | `NETTOINCLRAB` | DOUBLE |  |
| 20 | `BRUTTOPREIS` | DOUBLE |  |
| 21 | `ALTERNATIV` | VARCHAR(1) |  |
| 22 | `OPTION` | VARCHAR(1) |  |
| 23 | `SKZ` | VARCHAR(2) |  |
| 24 | `KURZLANGTEXT` | VARCHAR(1) |  |
| 25 | `LOHNMATERIAL` | VARCHAR(1) |  |
| 26 | `LIEFERDATUM` | DATE |  |
| 27 | `LANGTEXT1` | BLOB |  |
| 28 | `LANGTEXT2` | BLOB |  |
| 29 | `KZINT` | FLOAT |  |
| 30 | `MENGELS` | VARCHAR(10) |  |
| 31 | `GESAMTNETTO` | DOUBLE |  |
| 32 | `GESAMTBRUTTO` | DOUBLE |  |
| 33 | `PEINH` | VARCHAR(10) |  |
| 34 | `GESAMTHMWST` | DOUBLE |  |
| 35 | `GESAMTVMWST` | DOUBLE |  |
| 36 | `WAEHRUNG` | VARCHAR(5) |  |
| 37 | `FUELLMENGELT` | VARCHAR(10) |  |
| 38 | `ERLEDIGT` | DATE |  |
| 39 | `POSIDENTLIEFER` | VARCHAR(15) |  |
| 40 | `ERLOESKONTO` | VARCHAR(8) |  |
| 41 | `KOSTENST` | VARCHAR(8) |  |
| 42 | `KOSTENKONTO` | VARCHAR(8) |  |
| 43 | `SONDER01` | VARCHAR(5) |  |
| 44 | `SONDER02` | VARCHAR(5) |  |
| 45 | `SONDER03` | VARCHAR(5) |  |
| 46 | `SONDER04` | VARCHAR(5) |  |
| 47 | `SONDER05` | VARCHAR(5) |  |
| 48 | `SONDER06` | VARCHAR(5) |  |
| 49 | `SONDER07` | VARCHAR(5) |  |
| 50 | `SONDER08` | VARCHAR(5) |  |
| 51 | `SONDER09` | VARCHAR(5) |  |
| 52 | `SONDER10` | VARCHAR(5) |  |
| 53 | `STLDRUCKEN` | VARCHAR(1) |  |
| 54 | `AUFMASSDRUCK` | VARCHAR(1) |  |
| 55 | `SONDERDRUCK` | VARCHAR(1) |  |
| 56 | `MITARBEITER` | VARCHAR(3) |  |
| 57 | `SERIENNR` | VARCHAR(40) |  |
| 58 | `EGEWICHT` | VARCHAR(10) |  |
| 59 | `GGEWICHT` | VARCHAR(10) |  |
| 60 | `KOMSCHEIN` | VARCHAR(1) |  |
| 61 | `MATOK` | VARCHAR(10) |  |
| 62 | `WZOK` | VARCHAR(10) |  |
| 63 | `LOSGROESSE` | VARCHAR(10) |  |
| 64 | `LOSMEINH` | VARCHAR(8) |  |
| 65 | `PKZ` | VARCHAR(1) |  |
| 66 | `VERPEINH` | VARCHAR(8) |  |
| 67 | `VSTSCHERLOESE` | VARCHAR(5) |  |
| 68 | `VSTSCHKOSTEN` | VARCHAR(5) |  |
| 69 | `SKONTOFAEHIG` | VARCHAR(1) |  |
| 70 | `PRODGEBUCHT` | VARCHAR(1) |  |
| 71 | `LAGERABBGSTL` | VARCHAR(1) |  |
| 72 | `SNCOUNTAT` | VARCHAR(20) |  |
| 73 | `SNCOUNTTO` | VARCHAR(20) |  |

### SQLPOSKALK 🟢

**Beschreibung:** Positionskalkulationen — Detaillierte Kalkulation pro Position (EK, VK, Marge, Zuschläge).
**Datensätze:** 983,408 | **Spalten:** 56

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `VORGANG` | VARCHAR(16) | ✅ |
| 2 | `KZINT` | FLOAT | ✅ |
| 3 | `KALKNR` | VARCHAR(1) | ✅ |
| 4 | `MENGE` | FLOAT | ✅ |
| 5 | `EKPNETTO` | DOUBLE |  |
| 6 | `EKPBRUTTO` | DOUBLE |  |
| 7 | `FRACHTEK` | DOUBLE |  |
| 8 | `MONTAGEEK` | DOUBLE |  |
| 9 | `VKPNETTO` | DOUBLE |  |
| 10 | `FRACHTVK` | DOUBLE |  |
| 11 | `MONTAGEVK` | DOUBLE |  |
| 12 | `PAUFSCHLEK` | DOUBLE |  |
| 13 | `PAUFSCHLFR` | DOUBLE |  |
| 14 | `PAUFSCHLMO` | DOUBLE |  |
| 15 | `SAUFSCHLEK` | DOUBLE |  |
| 16 | `SAUFSCHLFR` | DOUBLE |  |
| 17 | `SAUFSCHLMO` | DOUBLE |  |
| 18 | `VERSCHNITTP` | VARCHAR(6) |  |
| 19 | `VERSCHNITTME` | VARCHAR(6) |  |
| 20 | `VERSCHNPREIS` | DOUBLE |  |
| 21 | `PEINH` | VARCHAR(10) |  |
| 22 | `CUBASIS` | VARCHAR(10) |  |
| 23 | `CUZAHL` | VARCHAR(10) |  |
| 24 | `CUNOTRG` | VARCHAR(6) |  |
| 25 | `CUPREIS` | FLOAT |  |
| 26 | `ARTMONTAGEMIN` | VARCHAR(10) |  |
| 27 | `ARTLG` | VARCHAR(2) |  |
| 28 | `ARTMONTKOSTEN` | DOUBLE |  |
| 29 | `ARTGESAMT` | DOUBLE |  |
| 30 | `MASCHKOSTMIN` | DOUBLE |  |
| 31 | `MASCHKOSTME` | DOUBLE |  |
| 32 | `TAZEITMIN` | DOUBLE |  |
| 33 | `TALG` | VARCHAR(2) |  |
| 34 | `TAKOSTEN` | DOUBLE |  |
| 35 | `LSTZEITME` | VARCHAR(6) |  |
| 36 | `LSTLG` | VARCHAR(2) |  |
| 37 | `LSTKOSTENME` | DOUBLE |  |
| 38 | `LSTAUFSCHLP` | VARCHAR(6) |  |
| 39 | `LSTGESAMT` | DOUBLE |  |
| 40 | `LSTMATERIAL` | DOUBLE |  |
| 41 | `LSTFREMD` | DOUBLE |  |
| 42 | `LSTSONSTIGE` | DOUBLE |  |
| 43 | `GESAMTPREIS` | DOUBLE |  |
| 44 | `GEMEINKOSTENP` | VARCHAR(6) |  |
| 45 | `RABATT` | VARCHAR(6) |  |
| 46 | `WAEHRUNG` | VARCHAR(5) |  |
| 47 | `ROHTEILGEWICHT` | VARCHAR(10) |  |
| 48 | `MATZUSCHW` | DOUBLE |  |
| 49 | `MATZUSCHEINH` | VARCHAR(6) |  |
| 50 | `MATZUSCHCURR` | DOUBLE |  |
| 51 | `LEGZUSCHW` | DOUBLE |  |
| 52 | `LEGZUSCHEINH` | VARCHAR(6) |  |
| 53 | `LEGZUSCHCURR` | DOUBLE |  |
| 54 | `SCHZUSCHW` | DOUBLE |  |
| 55 | `SCHZUSCHEINH` | VARCHAR(6) |  |
| 56 | `SCHZUSCHCURR` | DOUBLE |  |

---

## Finanzen/Buchhaltung

### SQLADRESSKONTO 🟡

**Beschreibung:** Adressen-Kontobuchungen — Buchungen auf Personenkonten (Debitoren/Kreditoren).
**Datensätze:** 9 | **Spalten:** 13

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BELEGART` | VARCHAR(2) | ✅ |
| 2 | `BELEGNR` | VARCHAR(10) | ✅ |
| 3 | `LFDBUCHNR` | FLOAT | ✅ |
| 4 | `UBELEGNR` | VARCHAR(1) |  |
| 5 | `BELEGDATUM` | DATE |  |
| 6 | `MATCH` | VARCHAR(20) |  |
| 7 | `BRUTTO` | FLOAT |  |
| 8 | `SKONTO` | FLOAT |  |
| 9 | `PM` | VARCHAR(1) |  |
| 10 | `BUCHART` | VARCHAR(5) |  |
| 11 | `BUCHDATUM` | DATE |  |
| 12 | `BUCHTEXT` | VARCHAR(50) |  |
| 13 | `DSQUELLE` | VARCHAR(1) |  |

### SQLADRRECHART ⚪

**Beschreibung:** Adressen-Rechnungsarten — Konfiguration verschiedener Rechnungsarten pro Adresse.
**Datensätze:** 0 | **Spalten:** 5

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZNR` | VARCHAR(3) | ✅ |
| 2 | `BEZEICHNUNG` | VARCHAR(30) | ✅ |
| 3 | `FUSSTEXTNAME` | VARCHAR(30) |  |
| 4 | `KONTO` | VARCHAR(8) |  |
| 5 | `KOSTST` | VARCHAR(6) |  |

### SQLBANK ⚪

**Beschreibung:** Bankbuchungen — Bankkonten-Buchungen, Kontoauszüge.
**Datensätze:** 0 | **Spalten:** 24

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `KONTO` | VARCHAR(8) | ✅ |
| 2 | `PERIODE` | VARCHAR(6) | ✅ |
| 3 | `BUCHNR` | INTEGER | ✅ |
| 4 | `BENENNUNG` | VARCHAR(30) |  |
| 5 | `BUCHDATUM` | DATE |  |
| 6 | `MITARB` | VARCHAR(3) |  |
| 7 | `WAEHRUNG` | VARCHAR(5) |  |
| 8 | `UMSATZ` | VARCHAR(15) |  |
| 9 | `SOLLHABEN` | VARCHAR(1) |  |
| 10 | `STSCHL` | VARCHAR(2) |  |
| 11 | `GEGENKONTO` | VARCHAR(8) |  |
| 12 | `BELEGFELD1` | VARCHAR(16) |  |
| 13 | `BELEGFELD2` | VARCHAR(16) |  |
| 14 | `BELEGDATUM` | DATE |  |
| 15 | `KOSTST` | VARCHAR(8) |  |
| 16 | `SKONTO` | VARCHAR(15) |  |
| 17 | `BUCHTEXT` | VARCHAR(120) |  |
| 18 | `BANKAUSZUG` | VARCHAR(30) |  |
| 19 | `KONTOSTANDBEG` | VARCHAR(15) |  |
| 20 | `KONTOSTANDEND` | VARCHAR(15) |  |
| 21 | `KONTOSTANDKUM` | VARCHAR(15) |  |
| 22 | `OPGEBUCHT` | VARCHAR(5) |  |
| 23 | `DATEVEXP` | VARCHAR(2) |  |
| 24 | `ABGESCHLOSSEN` | VARCHAR(2) |  |

### SQLBDEBUCHUNG 🟡

**Beschreibung:** BDE-Buchungen — Betriebsdatenerfassung-Buchungen.
**Datensätze:** 3 | **Spalten:** 45

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `SATZNR` | INTEGER | ✅ |
| 2 | `VORGANG` | VARCHAR(8) | ✅ |
| 3 | `ETNR` | VARCHAR(5) | ✅ |
| 4 | `MATCHCODE` | VARCHAR(50) |  |
| 5 | `MITARB` | VARCHAR(3) | ✅ |
| 6 | `POSIDENT` | VARCHAR(15) |  |
| 7 | `KTEXT1` | VARCHAR(40) |  |
| 8 | `KTEXT2` | VARCHAR(40) |  |
| 9 | `KOSTST` | VARCHAR(8) |  |
| 10 | `MEINH` | VARCHAR(5) |  |
| 11 | `BUCHART` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | DATE |  |
| 13 | `ZEIT` | TIME |  |
| 14 | `BEMERKUNG` | VARCHAR(60) |  |
| 15 | `GERAET` | VARCHAR(10) |  |
| 16 | `BEGINNZ` | VARCHAR(8) |  |
| 17 | `ENDEZ` | VARCHAR(8) |  |
| 18 | `GEBRAUCHTZ` | VARCHAR(8) |  |
| 19 | `LAGERNR` | VARCHAR(2) |  |
| 20 | `MENGE` | VARCHAR(10) |  |
| 21 | `SCHRANK` | VARCHAR(5) |  |
| 22 | `FACH` | VARCHAR(5) |  |
| 23 | `DEKP` | DOUBLE |  |
| 24 | `EIGADR` | VARCHAR(6) |  |
| 25 | `MASCHINE` | VARCHAR(20) |  |
| 26 | `WAEHRUNG` | VARCHAR(5) |  |
| 27 | `ABRECHART` | VARCHAR(5) |  |
| 28 | `LSTGART` | VARCHAR(1) |  |
| 29 | `BEGDATUM` | VARCHAR(10) |  |
| 30 | `ENDDATUM` | VARCHAR(10) |  |
| 31 | `FERTIGSTCK` | VARCHAR(10) |  |
| 32 | `LOSNR` | VARCHAR(5) |  |
| 33 | `AUSSCHSTCK` | VARCHAR(10) |  |
| 34 | `LOHNGR` | VARCHAR(4) |  |
| 35 | `ABWADR` | VARCHAR(6) |  |
| 36 | `GEFKM` | VARCHAR(5) |  |
| 37 | `MASCHNR` | VARCHAR(10) |  |
| 38 | `WERT1` | VARCHAR(10) |  |
| 39 | `WERT2` | VARCHAR(10) |  |
| 40 | `WERT3` | VARCHAR(10) |  |
| 41 | `WERT4` | VARCHAR(10) |  |
| 42 | `WERT5` | VARCHAR(10) |  |
| 43 | `FREIGABE` | VARCHAR(1) |  |
| 44 | `AGNR` | VARCHAR(5) |  |
| 45 | `ETIDENT` | VARCHAR(15) |  |

### SQLBUCHDATEN 🟢

**Beschreibung:** Buchungsdaten — FiBu-Buchungssätze (Konto, Gegenkonto, Beträge, Kostenstelle).
**Datensätze:** 138,326 | **Spalten:** 26

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZNR` | DOUBLE | ✅ |
| 2 | `BUCHART` | VARCHAR(5) | ✅ |
| 3 | `BELEGART` | VARCHAR(2) | ✅ |
| 4 | `BELEGNR` | VARCHAR(10) | ✅ |
| 5 | `UBELEGNR` | VARCHAR(2) | ✅ |
| 6 | `BUCHDATUM` | DATE | ✅ |
| 7 | `ORGBELEGNR` | VARCHAR(20) |  |
| 8 | `ORGBELEGDATUM` | DATE |  |
| 9 | `ADRESSNR` | VARCHAR(6) | ✅ |
| 10 | `KONTO` | VARCHAR(6) |  |
| 11 | `GKONTO` | VARCHAR(6) |  |
| 12 | `KOSTST` | VARCHAR(6) |  |
| 13 | `MANR` | VARCHAR(3) |  |
| 14 | `MATCH` | VARCHAR(30) |  |
| 15 | `NETTOK` | DOUBLE | ✅ |
| 16 | `NETTOH` | DOUBLE | ✅ |
| 17 | `NETTOV` | DOUBLE | ✅ |
| 18 | `NETTOG` | DOUBLE | ✅ |
| 19 | `MWSTHALB` | DOUBLE | ✅ |
| 20 | `MWSTVOLL` | DOUBLE | ✅ |
| 21 | `BRUTTO` | DOUBLE | ✅ |
| 22 | `SKONTO` | DOUBLE | ✅ |
| 23 | `BESTANDVOR` | DOUBLE | ✅ |
| 24 | `BESTANDNACH` | DOUBLE | ✅ |
| 25 | `FIBUAUS` | VARCHAR(1) | ✅ |
| 26 | `VORSTEUERSCHL` | VARCHAR(2) |  |

### SQLBUCHTEXT 🟡

**Beschreibung:** Buchungstexte — Vordefinierte Buchungstexte/Textbausteine.
**Datensätze:** 3 | **Spalten:** 7

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `TEXTNR` | VARCHAR(3) | ✅ |
| 2 | `BUCHGTEXT` | VARCHAR(80) | ✅ |
| 3 | `KZFIBU` | VARCHAR(5) | ✅ |
| 4 | `BUCHGART` | VARCHAR(1) | ✅ |
| 5 | `VKONTO` | VARCHAR(8) |  |
| 6 | `VKOST` | VARCHAR(8) |  |
| 7 | `VORSTEUERSCHL` | VARCHAR(5) |  |

### SQLFBUCH ⚪

**Beschreibung:** Forderungs-/Finanzbuch — Weitere Finanzbuchungen.
**Datensätze:** 0 | **Spalten:** 24

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | INTEGER | ✅ |
| 2 | `FAHRZEUG` | VARCHAR(20) |  |
| 3 | `MANR` | VARCHAR(3) | ✅ |
| 4 | `MANAME` | VARCHAR(30) |  |
| 5 | `ART` | VARCHAR(10) |  |
| 6 | `KMVOR` | VARCHAR(8) |  |
| 7 | `KMNACH` | VARCHAR(8) |  |
| 8 | `KMGEFAHREN` | VARCHAR(8) |  |
| 9 | `DATUMBEGINN` | DATE | ✅ |
| 10 | `ZEITBEGINN` | VARCHAR(5) |  |
| 11 | `DATUMENDE` | DATE | ✅ |
| 12 | `ZEITENDE` | VARCHAR(5) |  |
| 13 | `ZIELADRNR` | VARCHAR(12) |  |
| 14 | `ZIELNAME` | VARCHAR(50) |  |
| 15 | `ZIELSTRASSE` | VARCHAR(50) |  |
| 16 | `ZIELPLZORT` | VARCHAR(50) |  |
| 17 | `GRUND` | VARCHAR(200) |  |
| 18 | `BEMERKUNG` | VARCHAR(200) |  |
| 19 | `KOSTENART` | VARCHAR(5) |  |
| 20 | `LITER` | VARCHAR(7) |  |
| 21 | `PREIS` | VARCHAR(10) |  |
| 22 | `REISEKOSTEN` | VARCHAR(10) |  |
| 23 | `KOPIERVORL` | VARCHAR(1) |  |
| 24 | `GEBUCHTAM` | DATE | ✅ |

### SQLKASBER 🟡

**Beschreibung:** Kassenberichte — Kassenabschlüsse/Tagesberichte.
**Datensätze:** 2 | **Spalten:** 20

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `NR` | VARCHAR(2) | ✅ |
| 2 | `ZUSTAND` | VARCHAR(1) | ✅ |
| 3 | `DATUM` | DATE | ✅ |
| 4 | `ANFANGBAR` | DOUBLE | ✅ |
| 5 | `ANFANGSCHECK` | DOUBLE | ✅ |
| 6 | `EINNAHMEBAR` | DOUBLE | ✅ |
| 7 | `EINNAHMESCHECK` | DOUBLE | ✅ |
| 8 | `AUSGABEBAR` | DOUBLE | ✅ |
| 9 | `AUSGABESCHECK` | DOUBLE | ✅ |
| 10 | `GEZAEHLTBAR` | DOUBLE | ✅ |
| 11 | `GEZAEHLTSCHECK` | DOUBLE | ✅ |
| 12 | `ENDEBAR` | DOUBLE | ✅ |
| 13 | `ENDESCHECK` | DOUBLE | ✅ |
| 14 | `MITARB` | VARCHAR(3) | ✅ |
| 15 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 16 | `KASSENNAME` | VARCHAR(20) |  |
| 17 | `KAKTONR` | VARCHAR(8) |  |
| 18 | `ECKTONR` | VARCHAR(8) |  |
| 19 | `KACOUNTER` | VARCHAR(5) |  |
| 20 | `ECCOUNTER` | VARCHAR(5) |  |

### SQLKASJB 🟡

**Beschreibung:** Kassen-Jahresbuch — Jährliche Kassenübersicht.
**Datensätze:** 3 | **Spalten:** 15

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `JAHR` | VARCHAR(4) | ✅ |
| 2 | `ANFANG` | VARCHAR(10) | ✅ |
| 3 | `JAN` | VARCHAR(10) | ✅ |
| 4 | `FEB` | VARCHAR(10) | ✅ |
| 5 | `MAE` | VARCHAR(10) | ✅ |
| 6 | `APR` | VARCHAR(10) | ✅ |
| 7 | `MAI` | VARCHAR(10) | ✅ |
| 8 | `JUN` | VARCHAR(10) | ✅ |
| 9 | `JUL` | VARCHAR(10) | ✅ |
| 10 | `AUG` | VARCHAR(10) | ✅ |
| 11 | `SEP` | VARCHAR(10) | ✅ |
| 12 | `OKT` | VARCHAR(10) | ✅ |
| 13 | `NOV` | VARCHAR(10) | ✅ |
| 14 | `DEZ` | VARCHAR(10) | ✅ |
| 15 | `ENDE` | VARCHAR(10) | ✅ |

### SQLKASSEHIST 🟡

**Beschreibung:** Kassenhistorie — Protokoll aller Kassenvorgänge.
**Datensätze:** 47 | **Spalten:** 33

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `KANR` | VARCHAR(2) | ✅ |
| 2 | `DATUM` | VARCHAR(8) | ✅ |
| 3 | `ZEIT` | VARCHAR(8) | ✅ |
| 4 | `ANFANGBAR` | FLOAT | ✅ |
| 5 | `ANFANGEC` | FLOAT | ✅ |
| 6 | `EINNAHMEBAR` | FLOAT | ✅ |
| 7 | `EINNAHMEEC` | FLOAT | ✅ |
| 8 | `AUSGABEBAR` | FLOAT | ✅ |
| 9 | `AUSGABEEC` | FLOAT | ✅ |
| 10 | `GEZAEHLTBAR` | FLOAT | ✅ |
| 11 | `GEZAEHLTEC` | FLOAT | ✅ |
| 12 | `ENDEBAR` | FLOAT | ✅ |
| 13 | `ENDEEC` | FLOAT | ✅ |
| 14 | `MITARB` | VARCHAR(3) | ✅ |
| 15 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 16 | `KASSENNAME` | VARCHAR(20) |  |
| 17 | `KAKTONR` | VARCHAR(8) |  |
| 18 | `ECKTONR` | VARCHAR(8) |  |
| 19 | `MW1C` | INTEGER |  |
| 20 | `MW2C` | INTEGER |  |
| 21 | `MW5C` | INTEGER |  |
| 22 | `MW10C` | INTEGER |  |
| 23 | `MW20C` | INTEGER |  |
| 24 | `MW50C` | INTEGER |  |
| 25 | `MW1E` | INTEGER |  |
| 26 | `MW2E` | INTEGER |  |
| 27 | `MW5E` | INTEGER |  |
| 28 | `MW10E` | INTEGER |  |
| 29 | `MW20E` | INTEGER |  |
| 30 | `MW50E` | INTEGER |  |
| 31 | `MW100E` | INTEGER |  |
| 32 | `MW200E` | INTEGER |  |
| 33 | `MW500E` | INTEGER |  |

### SQLKONTO 🟡

**Beschreibung:** Kontenplan — Sachkonten der Finanzbuchhaltung.
**Datensätze:** 24 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `KONTO` | VARCHAR(8) | ✅ |
| 2 | `BESCHREIBUNG` | VARCHAR(40) |  |
| 3 | `STEUERSCHLUESSEL` | VARCHAR(5) |  |
| 4 | `KONTOART` | VARCHAR(5) |  |

### SQLKOSTST 🟡

**Beschreibung:** Kostenstellen — Kostenstellenstammdaten.
**Datensätze:** 6 | **Spalten:** 2

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `KOSTENSTELLE` | VARCHAR(6) | ✅ |
| 2 | `BESCHREIBUNG` | VARCHAR(40) |  |

### SQLRABATTGR ⚪

**Beschreibung:** Rabattgruppen — Lieferanten-Rabattgruppen-Zuordnung.
**Datensätze:** 0 | **Spalten:** 10

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LIEFERANT` | VARCHAR(6) | ✅ |
| 2 | `RABGR` | VARCHAR(4) | ✅ |
| 3 | `RABKZ` | VARCHAR(1) | ✅ |
| 4 | `RABSATZ` | DOUBLE | ✅ |
| 5 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 6 | `HSPVKP0` | VARCHAR(6) |  |
| 7 | `HSPVKP1` | VARCHAR(6) |  |
| 8 | `HSPVKP2` | VARCHAR(6) |  |
| 9 | `HSPVKP3` | VARCHAR(6) |  |
| 10 | `PFORMEL` | VARCHAR(3) |  |

### SQLRBUCH 🟢

**Beschreibung:** Rechnungsbuch — Offene Posten, Rechnungsausgangsbuch. Jede Rechnung/Gutschrift mit Zahlstatus.
**Datensätze:** 175,389 | **Spalten:** 64

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BELEGART` | VARCHAR(2) | ✅ |
| 2 | `BELEGNR` | VARCHAR(12) | ✅ |
| 3 | `UBELEGNR` | VARCHAR(1) | ✅ |
| 4 | `BUCHDATUM` | DATE | ✅ |
| 5 | `ORGBELEGNR` | VARCHAR(20) |  |
| 6 | `ORGBELEGDATUM` | DATE |  |
| 7 | `ADRESSNR` | VARCHAR(12) |  |
| 8 | `ADRESSNAME` | VARCHAR(30) |  |
| 9 | `NETTOWERT` | FLOAT | ✅ |
| 10 | `MWSTHALB` | FLOAT | ✅ |
| 11 | `MWSTVOLL` | FLOAT | ✅ |
| 12 | `BRUTTOWERT` | FLOAT | ✅ |
| 13 | `SKONTOWERT` | FLOAT |  |
| 14 | `ZAHLGSB` | VARCHAR(6) | ✅ |
| 15 | `TEILZAHLG` | FLOAT |  |
| 16 | `ZAHLGRUND` | VARCHAR(80) | ✅ |
| 17 | `FAELLIG` | DATE |  |
| 18 | `BEZAHLTJN` | VARCHAR(4) |  |
| 19 | `BEZAHLTAM` | DATE |  |
| 20 | `MAHNUNG1` | VARCHAR(4) | ✅ |
| 21 | `MAHNG1AM` | DATE |  |
| 22 | `MAHNUNG2` | VARCHAR(4) | ✅ |
| 23 | `MAHNG2AM` | DATE |  |
| 24 | `MAHNUNG3` | VARCHAR(4) | ✅ |
| 25 | `MAHNG3AM` | DATE |  |
| 26 | `KOSTSTNR` | VARCHAR(5) |  |
| 27 | `KOSTSTNAME` | VARCHAR(30) |  |
| 28 | `KONTONR` | VARCHAR(8) |  |
| 29 | `KONTONAME` | VARCHAR(30) |  |
| 30 | `MATCH` | VARCHAR(50) |  |
| 31 | `HMWSTS` | VARCHAR(2) | ✅ |
| 32 | `VMWSTS` | VARCHAR(2) | ✅ |
| 33 | `NETTOK` | FLOAT | ✅ |
| 34 | `NETTOH` | FLOAT | ✅ |
| 35 | `NETTOV` | FLOAT | ✅ |
| 36 | `SKONTOP` | FLOAT | ✅ |
| 37 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 38 | `FIBUAUSG` | VARCHAR(1) |  |
| 39 | `FIBUBEZ` | VARCHAR(1) |  |
| 40 | `ZAHLUNGSART` | VARCHAR(2) |  |
| 41 | `MANR` | VARCHAR(3) |  |
| 42 | `BANKAUSZUG` | VARCHAR(30) |  |
| 43 | `PROVISION` | DATE |  |
| 44 | `FAELLIGSKO` | DATE |  |
| 45 | `RECHART` | VARCHAR(1) |  |
| 46 | `WAEHRG2` | VARCHAR(5) |  |
| 47 | `NETTO2` | FLOAT |  |
| 48 | `BRUTTO2` | FLOAT |  |
| 49 | `SKONTO2` | FLOAT |  |
| 50 | `ALTTEILST` | FLOAT |  |
| 51 | `ALTTEILBETR` | FLOAT |  |
| 52 | `VDA4906` | VARCHAR(1) |  |
| 53 | `LSNR` | VARCHAR(12) |  |
| 54 | `LSDATUM` | DATE |  |
| 55 | `ZAHLGKONTO` | VARCHAR(8) |  |
| 56 | `BESTANDVOR` | FLOAT | ✅ |
| 57 | `BESTANDNACH` | FLOAT | ✅ |
| 58 | `VORSTEUERSCHL` | VARCHAR(5) |  |
| 59 | `KASSENNR` | VARCHAR(2) |  |
| 60 | `RECHGSART` | VARCHAR(3) |  |
| 61 | `EINKAUF` | VARCHAR(12) |  |
| 62 | `ROHERTRAG` | VARCHAR(12) |  |
| 63 | `PROZUMSATZ` | VARCHAR(12) |  |
| 64 | `ADRESSART` | VARCHAR(1) |  |

### SQLRBUCH2 🟢

**Beschreibung:** Rechnungsbuch 2 — Erweiterte Rechnungsbuchdaten (Zusatzfelder).
**Datensätze:** 174,684 | **Spalten:** 64

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BELEGART` | VARCHAR(2) | ✅ |
| 2 | `BELEGNR` | VARCHAR(12) | ✅ |
| 3 | `UBELEGNR` | VARCHAR(1) | ✅ |
| 4 | `BUCHDATUM` | DATE | ✅ |
| 5 | `ORGBELEGNR` | VARCHAR(20) |  |
| 6 | `ORGBELEGDATUM` | DATE |  |
| 7 | `ADRESSNR` | VARCHAR(12) |  |
| 8 | `ADRESSNAME` | VARCHAR(30) |  |
| 9 | `NETTOWERT` | FLOAT | ✅ |
| 10 | `MWSTHALB` | FLOAT | ✅ |
| 11 | `MWSTVOLL` | FLOAT | ✅ |
| 12 | `BRUTTOWERT` | FLOAT | ✅ |
| 13 | `SKONTOWERT` | FLOAT |  |
| 14 | `ZAHLGSB` | VARCHAR(6) | ✅ |
| 15 | `TEILZAHLG` | FLOAT |  |
| 16 | `ZAHLGRUND` | VARCHAR(80) | ✅ |
| 17 | `FAELLIG` | DATE |  |
| 18 | `BEZAHLTJN` | VARCHAR(4) |  |
| 19 | `BEZAHLTAM` | DATE |  |
| 20 | `MAHNUNG1` | VARCHAR(4) | ✅ |
| 21 | `MAHNG1AM` | DATE |  |
| 22 | `MAHNUNG2` | VARCHAR(4) | ✅ |
| 23 | `MAHNG2AM` | DATE |  |
| 24 | `MAHNUNG3` | VARCHAR(4) | ✅ |
| 25 | `MAHNG3AM` | DATE |  |
| 26 | `KOSTSTNR` | VARCHAR(5) |  |
| 27 | `KOSTSTNAME` | VARCHAR(30) |  |
| 28 | `KONTONR` | VARCHAR(8) |  |
| 29 | `KONTONAME` | VARCHAR(30) |  |
| 30 | `MATCH` | VARCHAR(50) |  |
| 31 | `HMWSTS` | VARCHAR(2) | ✅ |
| 32 | `VMWSTS` | VARCHAR(2) | ✅ |
| 33 | `NETTOK` | FLOAT | ✅ |
| 34 | `NETTOH` | FLOAT | ✅ |
| 35 | `NETTOV` | FLOAT | ✅ |
| 36 | `SKONTOP` | FLOAT | ✅ |
| 37 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 38 | `FIBUAUSG` | VARCHAR(1) |  |
| 39 | `FIBUBEZ` | VARCHAR(1) |  |
| 40 | `ZAHLUNGSART` | VARCHAR(2) |  |
| 41 | `MANR` | VARCHAR(3) |  |
| 42 | `BANKAUSZUG` | VARCHAR(30) |  |
| 43 | `PROVISION` | DATE |  |
| 44 | `FAELLIGSKO` | DATE |  |
| 45 | `RECHART` | VARCHAR(1) |  |
| 46 | `WAEHRG2` | VARCHAR(5) |  |
| 47 | `NETTO2` | FLOAT |  |
| 48 | `BRUTTO2` | FLOAT |  |
| 49 | `SKONTO2` | FLOAT |  |
| 50 | `ALTTEILST` | FLOAT |  |
| 51 | `ALTTEILBETR` | FLOAT |  |
| 52 | `VDA4906` | VARCHAR(1) |  |
| 53 | `LSNR` | VARCHAR(12) |  |
| 54 | `LSDATUM` | DATE |  |
| 55 | `ZAHLGKONTO` | VARCHAR(8) |  |
| 56 | `BESTANDVOR` | FLOAT | ✅ |
| 57 | `BESTANDNACH` | FLOAT | ✅ |
| 58 | `VORSTEUERSCHL` | VARCHAR(5) |  |
| 59 | `KASSENNR` | VARCHAR(2) |  |
| 60 | `RECHGSART` | VARCHAR(3) |  |
| 61 | `EINKAUF` | VARCHAR(12) |  |
| 62 | `ROHERTRAG` | VARCHAR(12) |  |
| 63 | `PROZUMSATZ` | VARCHAR(12) |  |
| 64 | `ADRESSART` | VARCHAR(1) |  |

### SQLSEPAS ⚪

**Beschreibung:** SEPA-Lastschriften — SEPA-Mandatsverwaltung und Lastschriftdaten.
**Datensätze:** 0 | **Spalten:** 29

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | INTEGER | ✅ |
| 2 | `AUFTRAGSID` | VARCHAR(20) |  |
| 3 | `LFDID` | VARCHAR(20) |  |
| 4 | `ART` | VARCHAR(1) | ✅ |
| 5 | `MANDANTENID` | VARCHAR(40) |  |
| 6 | `AGNR` | VARCHAR(12) |  |
| 7 | `AGNAME` | VARCHAR(27) |  |
| 8 | `AGIBAN` | VARCHAR(34) |  |
| 9 | `AGBIC` | VARCHAR(11) |  |
| 10 | `EMPNR` | VARCHAR(12) |  |
| 11 | `EMPNAME` | VARCHAR(27) |  |
| 12 | `EMPIBAN` | VARCHAR(34) |  |
| 13 | `EMPBIC` | VARCHAR(11) |  |
| 14 | `BETRAG` | VARCHAR(11) |  |
| 15 | `ZGRUND1` | VARCHAR(35) |  |
| 16 | `ZGRUND2` | VARCHAR(35) |  |
| 17 | `AUSFUEHRUNGSTERMIN` | VARCHAR(10) |  |
| 18 | `AUSFUEHRUNGSTAGE` | VARCHAR(5) |  |
| 19 | `BELEGDATUM` | VARCHAR(10) |  |
| 20 | `LASTSCHRIFTMANDAT` | VARCHAR(35) |  |
| 21 | `LASTSCHRIFTART` | VARCHAR(10) |  |
| 22 | `MANDATSDATUM` | VARCHAR(10) |  |
| 23 | `GLAEUBIGERID` | VARCHAR(20) |  |
| 24 | `FREIGABE` | VARCHAR(1) |  |
| 25 | `ANLAGEDATUM` | VARCHAR(10) |  |
| 26 | `AUSGEFUEHRT` | VARCHAR(10) |  |
| 27 | `WAEHRUNG` | VARCHAR(10) |  |
| 28 | `ZGRUND3` | VARCHAR(35) |  |
| 29 | `ZGRUND4` | VARCHAR(35) |  |

### SQLUMSATZ 🟡

**Beschreibung:** Umsatzstatistik — Jährliche Umsatzübersichten.
**Datensätze:** 7 | **Spalten:** 92

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `JAHR` | VARCHAR(4) | ✅ |
| 2 | `M01UMS` | VARCHAR(15) |  |
| 3 | `M01SKO` | VARCHAR(15) |  |
| 4 | `M01RET` | VARCHAR(15) |  |
| 5 | `M01PRZ` | VARCHAR(15) |  |
| 6 | `M02UMS` | VARCHAR(15) |  |
| 7 | `M02SKO` | VARCHAR(15) |  |
| 8 | `M02RET` | VARCHAR(15) |  |
| 9 | `M02PRZ` | VARCHAR(15) |  |
| 10 | `M03UMS` | VARCHAR(15) |  |
| 11 | `M03SKO` | VARCHAR(15) |  |
| 12 | `M03RET` | VARCHAR(15) |  |
| 13 | `M03PRZ` | VARCHAR(15) |  |
| 14 | `M04UMS` | VARCHAR(15) |  |
| 15 | `M04SKO` | VARCHAR(15) |  |
| 16 | `M04RET` | VARCHAR(15) |  |
| 17 | `M04PRZ` | VARCHAR(15) |  |
| 18 | `M05UMS` | VARCHAR(15) |  |
| 19 | `M05SKO` | VARCHAR(15) |  |
| 20 | `M05RET` | VARCHAR(15) |  |
| 21 | `M05PRZ` | VARCHAR(15) |  |
| 22 | `M06UMS` | VARCHAR(15) |  |
| 23 | `M06SKO` | VARCHAR(15) |  |
| 24 | `M06RET` | VARCHAR(15) |  |
| 25 | `M06PRZ` | VARCHAR(15) |  |
| 26 | `M07UMS` | VARCHAR(15) |  |
| 27 | `M07SKO` | VARCHAR(15) |  |
| 28 | `M07RET` | VARCHAR(15) |  |
| 29 | `M07PRZ` | VARCHAR(15) |  |
| 30 | `M08UMS` | VARCHAR(15) |  |
| 31 | `M08SKO` | VARCHAR(15) |  |
| 32 | `M08RET` | VARCHAR(15) |  |
| 33 | `M08PRZ` | VARCHAR(15) |  |
| 34 | `M09UMS` | VARCHAR(15) |  |
| 35 | `M09SKO` | VARCHAR(15) |  |
| 36 | `M09RET` | VARCHAR(15) |  |
| 37 | `M09PRZ` | VARCHAR(15) |  |
| 38 | `M10UMS` | VARCHAR(15) |  |
| 39 | `M10SKO` | VARCHAR(15) |  |
| 40 | `M10RET` | VARCHAR(15) |  |
| 41 | `M10PRZ` | VARCHAR(15) |  |
| 42 | `M11UMS` | VARCHAR(15) |  |
| 43 | `M11SKO` | VARCHAR(15) |  |
| 44 | `M11RET` | VARCHAR(15) |  |
| 45 | `M11PRZ` | VARCHAR(15) |  |
| 46 | `M12UMS` | VARCHAR(15) |  |
| 47 | `M12SKO` | VARCHAR(15) |  |
| 48 | `M12RET` | VARCHAR(15) |  |
| 49 | `M12PRZ` | VARCHAR(15) |  |
| 50 | `GESUMS` | VARCHAR(15) |  |
| 51 | `GESSKO` | VARCHAR(15) |  |
| 52 | `GESRET` | VARCHAR(15) |  |
| 53 | `GESPRZ` | VARCHAR(15) |  |
| 54 | `LAKT` | VARCHAR(10) |  |
| 55 | `M01KUM` | VARCHAR(15) |  |
| 56 | `M02KUM` | VARCHAR(15) |  |
| 57 | `M03KUM` | VARCHAR(15) |  |
| 58 | `M04KUM` | VARCHAR(15) |  |
| 59 | `M05KUM` | VARCHAR(15) |  |
| 60 | `M06KUM` | VARCHAR(15) |  |
| 61 | `M07KUM` | VARCHAR(15) |  |
| 62 | `M08KUM` | VARCHAR(15) |  |
| 63 | `M09KUM` | VARCHAR(15) |  |
| 64 | `M10KUM` | VARCHAR(15) |  |
| 65 | `M11KUM` | VARCHAR(15) |  |
| 66 | `M12KUM` | VARCHAR(15) |  |
| 67 | `M01EIN` | VARCHAR(15) |  |
| 68 | `M02EIN` | VARCHAR(15) |  |
| 69 | `M03EIN` | VARCHAR(15) |  |
| 70 | `M04EIN` | VARCHAR(15) |  |
| 71 | `M05EIN` | VARCHAR(15) |  |
| 72 | `M06EIN` | VARCHAR(15) |  |
| 73 | `M07EIN` | VARCHAR(15) |  |
| 74 | `M08EIN` | VARCHAR(15) |  |
| 75 | `M09EIN` | VARCHAR(15) |  |
| 76 | `M10EIN` | VARCHAR(15) |  |
| 77 | `M11EIN` | VARCHAR(15) |  |
| 78 | `M12EIN` | VARCHAR(15) |  |
| 79 | `GESEIN` | VARCHAR(15) |  |
| 80 | `M01GEW` | VARCHAR(15) |  |
| 81 | `M02GEW` | VARCHAR(15) |  |
| 82 | `M03GEW` | VARCHAR(15) |  |
| 83 | `M04GEW` | VARCHAR(15) |  |
| 84 | `M05GEW` | VARCHAR(15) |  |
| 85 | `M06GEW` | VARCHAR(15) |  |
| 86 | `M07GEW` | VARCHAR(15) |  |
| 87 | `M08GEW` | VARCHAR(15) |  |
| 88 | `M09GEW` | VARCHAR(15) |  |
| 89 | `M10GEW` | VARCHAR(15) |  |
| 90 | `M11GEW` | VARCHAR(15) |  |
| 91 | `M12GEW` | VARCHAR(15) |  |
| 92 | `GESGEW` | VARCHAR(15) |  |

### SQLVORSTSCHL 🟡

**Beschreibung:** Vorsteuerschlüssel — Konfiguration der Vorsteuer-/Umsatzsteuersätze.
**Datensätze:** 3 | **Spalten:** 2

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `VSTSCHL` | VARCHAR(5) | ✅ |
| 2 | `VSTBEZ` | VARCHAR(30) |  |

### SQLZAHLUNG ⚪

**Beschreibung:** Zahlungen — Zahlungseingänge/-ausgänge.
**Datensätze:** 0 | **Spalten:** 25

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | INTEGER | ✅ |
| 2 | `EMPNR` | VARCHAR(6) | ✅ |
| 3 | `EMPNAME` | VARCHAR(40) | ✅ |
| 4 | `EMPKONTO` | VARCHAR(20) | ✅ |
| 5 | `EMPBLZ` | VARCHAR(20) | ✅ |
| 6 | `EMPBANK` | VARCHAR(40) | ✅ |
| 7 | `ABSNR` | VARCHAR(6) | ✅ |
| 8 | `ABSNAME` | VARCHAR(40) | ✅ |
| 9 | `ABSKONTO` | VARCHAR(20) | ✅ |
| 10 | `ABSBLZ` | VARCHAR(20) | ✅ |
| 11 | `ABSBANK` | VARCHAR(40) | ✅ |
| 12 | `BETRAGBRUTTO` | VARCHAR(10) |  |
| 13 | `BETRAGSKONTO` | VARCHAR(10) |  |
| 14 | `BRUTTOSKONTO` | VARCHAR(1) |  |
| 15 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 16 | `ZAHLBETRAG` | VARCHAR(10) | ✅ |
| 17 | `ZGRUND1` | VARCHAR(30) | ✅ |
| 18 | `ZGRUND2` | VARCHAR(30) |  |
| 19 | `ZGRUND3` | VARCHAR(30) |  |
| 20 | `UEBART` | VARCHAR(5) | ✅ |
| 21 | `SAMMLER` | VARCHAR(10) |  |
| 22 | `FREIGABE` | VARCHAR(1) | ✅ |
| 23 | `FAELLIGBRUTTO` | DATE |  |
| 24 | `FAELLIGSKONTO` | DATE |  |
| 25 | `AUSGEFUEHRT` | VARCHAR(10) |  |

---

## Lager

### SQLKSLAGART ⚪

**Beschreibung:** Konsignationslager-Arten — Arten von Konsignationslagern bei Kunden.
**Datensätze:** 0 | **Spalten:** 3

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `KDNR` | VARCHAR(6) | ✅ |
| 2 | `LAGNR` | VARCHAR(3) | ✅ |
| 3 | `NAME` | VARCHAR(30) | ✅ |

### SQLKSLAGER ⚪

**Beschreibung:** Konsignationslager — Bestände in Konsignationslagern bei Kunden.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTNR` | VARCHAR(15) | ✅ |
| 2 | `KDNR` | VARCHAR(6) | ✅ |
| 3 | `LAGNR` | VARCHAR(3) | ✅ |
| 4 | `LNAME` | VARCHAR(30) | ✅ |
| 5 | `ORTIMLAGER` | VARCHAR(30) |  |
| 6 | `LAGERMENGE` | VARCHAR(10) |  |
| 7 | `DATUM` | DATE |  |
| 8 | `MINMENGE` | VARCHAR(10) |  |
| 9 | `MAXMENGE` | VARCHAR(10) |  |
| 10 | `SCHRANK` | VARCHAR(5) |  |
| 11 | `FACH` | VARCHAR(5) |  |
| 12 | `ORGART` | VARCHAR(5) |  |
| 13 | `EIGADR` | VARCHAR(5) |  |
| 14 | `BDEBESTMENGE` | VARCHAR(10) |  |

### SQLLAGER 🟢

**Beschreibung:** Lagerbestände — Aktueller Bestand pro Artikel und Lagerort.
**Datensätze:** 7,553 | **Spalten:** 21

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `LAGERNR` | VARCHAR(2) | ✅ |
| 3 | `LAGERNAME` | VARCHAR(30) |  |
| 4 | `ORTIMLAGER` | VARCHAR(30) |  |
| 5 | `LAGERMENGE` | VARCHAR(10) |  |
| 6 | `DATUM` | DATE |  |
| 7 | `MINMENGE` | VARCHAR(10) |  |
| 8 | `MAXMENGE` | VARCHAR(10) |  |
| 9 | `SCHRANK` | VARCHAR(5) |  |
| 10 | `FACH` | VARCHAR(5) |  |
| 11 | `ORGART` | VARCHAR(5) |  |
| 12 | `EIGADR` | VARCHAR(12) |  |
| 13 | `BDEBESTMENGE` | VARCHAR(10) |  |
| 14 | `KASSETTE` | VARCHAR(5) |  |
| 15 | `ABSBESTAND` | VARCHAR(10) |  |
| 16 | `ABSDATUM` | VARCHAR(10) |  |
| 17 | `ABSPEINH` | VARCHAR(5) |  |
| 18 | `ABSPREIS` | FLOAT |  |
| 19 | `ABSMEINH` | VARCHAR(5) |  |
| 20 | `LAGERMEINH` | VARCHAR(8) |  |
| 21 | `RESERVIERTMENGE` | VARCHAR(10) |  |

### SQLLAGERART 🟡

**Beschreibung:** Lagerarten/Lagerorte — Definition der verschiedenen Lager (Hauptlager, Fahrzeuglager, etc.).
**Datensätze:** 4 | **Spalten:** 5

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LAGERNR` | VARCHAR(2) | ✅ |
| 2 | `NAME` | VARCHAR(40) | ✅ |
| 3 | `ORTIMLAGER` | VARCHAR(40) |  |
| 4 | `LAGERARTKZ` | VARCHAR(2) |  |
| 5 | `LAGERARTNAME` | VARCHAR(30) |  |

### SQLLAGERRESVG ⚪

**Beschreibung:** Lager-Reservierungsvorgänge — Reservierungsinformationen.
**Datensätze:** 0 | **Spalten:** 10

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | INTEGER | ✅ |
| 2 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 3 | `LAGERNR` | VARCHAR(2) | ✅ |
| 4 | `MITARB` | VARCHAR(3) |  |
| 5 | `MENGE` | VARCHAR(10) |  |
| 6 | `MEINH` | VARCHAR(6) |  |
| 7 | `RESWER` | VARCHAR(6) |  |
| 8 | `RESFUER` | VARCHAR(6) |  |
| 9 | `BELEGID` | VARCHAR(15) |  |
| 10 | `RESDATUM` | DATE |  |

### SQLLAGERSNR ⚪

**Beschreibung:** Lager-Seriennummern — Seriennummern im Lager.
**Datensätze:** 0 | **Spalten:** 13

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `LGNR` | VARCHAR(2) | ✅ |
| 3 | `SERIALNO` | VARCHAR(40) | ✅ |
| 4 | `ARTDIM` | VARCHAR(5) |  |
| 5 | `MENGE` | VARCHAR(10) |  |
| 6 | `BELEGART` | VARCHAR(2) |  |
| 7 | `BELEGNR` | VARCHAR(12) |  |
| 8 | `BELEGDATUM` | VARCHAR(10) |  |
| 9 | `ME` | VARCHAR(8) |  |
| 10 | `MENGEVERL` | VARCHAR(10) |  |
| 11 | `TEXT1` | VARCHAR(40) |  |
| 12 | `TEXT2` | VARCHAR(40) |  |
| 13 | `WARENGR` | VARCHAR(10) |  |

### SQLLAGMINMAX 🟢

**Beschreibung:** Lager Min/Max — Mindest- und Maximalbestände, Bestellpunkte, Dispositionsdaten.
**Datensätze:** 82,263 | **Spalten:** 10

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFNDNR` | INTEGER | ✅ |
| 2 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 3 | `VORGANG` | VARCHAR(8) |  |
| 4 | `DATUM` | DATE |  |
| 5 | `MINMENGE` | VARCHAR(10) |  |
| 6 | `MAXMENGE` | VARCHAR(10) |  |
| 7 | `AKTMENGE` | VARCHAR(10) |  |
| 8 | `KURZTEXT1` | VARCHAR(40) |  |
| 9 | `BELEGNR` | VARCHAR(8) |  |
| 10 | `BELEGART` | VARCHAR(2) |  |

### SQLLAGRESVG ⚪

**Beschreibung:** Lager-Reservierungen — Aktive Reservierungen auf Lagerbeständen.
**Datensätze:** 0 | **Spalten:** 12

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `CREATETIME` | VARCHAR(20) | ✅ |
| 2 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 3 | `LAGERNR` | VARCHAR(2) | ✅ |
| 4 | `MITARB` | VARCHAR(3) |  |
| 5 | `MENGE` | VARCHAR(10) |  |
| 6 | `MEINH` | VARCHAR(6) |  |
| 7 | `RESVORGNR` | VARCHAR(12) |  |
| 8 | `RESBART` | VARCHAR(3) |  |
| 9 | `RESBELEGID` | VARCHAR(15) |  |
| 10 | `RESADRNR` | VARCHAR(10) |  |
| 11 | `RESADRNAME` | VARCHAR(50) |  |
| 12 | `RESDATUM` | DATE |  |

### SQLLAGSTAT 🟢

**Beschreibung:** Lagerstatistik — Bewegungshistorie, Ein-/Ausgänge pro Artikel.
**Datensätze:** 309,621 | **Spalten:** 24

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFNDNR` | INTEGER | ✅ |
| 2 | `LAGERNR` | VARCHAR(2) |  |
| 3 | `BELEGART` | VARCHAR(2) |  |
| 4 | `BELEGNR` | VARCHAR(12) |  |
| 5 | `AUFTRAGNR` | VARCHAR(50) |  |
| 6 | `GRUND` | VARCHAR(40) |  |
| 7 | `MITARB` | VARCHAR(3) | ✅ |
| 8 | `DATUM` | DATE | ✅ |
| 9 | `MENGE` | VARCHAR(12) | ✅ |
| 10 | `MEINH` | VARCHAR(10) |  |
| 11 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 12 | `KURZTEXT1` | VARCHAR(40) |  |
| 13 | `DEKP` | DOUBLE | ✅ |
| 14 | `VKP` | DOUBLE |  |
| 15 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 16 | `LAGERVOR` | VARCHAR(10) |  |
| 17 | `LAGERNACH` | VARCHAR(10) |  |
| 18 | `PEINH` | VARCHAR(5) |  |
| 19 | `FKTART` | VARCHAR(5) |  |
| 20 | `BELEGID` | VARCHAR(16) |  |
| 21 | `LOSNR` | VARCHAR(8) |  |
| 22 | `AGNR` | VARCHAR(8) |  |
| 23 | `ADRNR` | VARCHAR(12) |  |
| 24 | `ADRNAME` | VARCHAR(40) |  |

### SQLMENGENKONTRAKT ⚪

**Beschreibung:** Mengenkontrakts-Verwaltung — Rahmenverträge über feste Mengen.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(40) | ✅ |
| 2 | `ARTIKELBEZ` | VARCHAR(60) | ✅ |
| 3 | `LAGERNR` | VARCHAR(2) | ✅ |
| 4 | `LIEFERANTNR` | VARCHAR(12) | ✅ |
| 5 | `LIEFERANTNAME` | VARCHAR(60) |  |
| 6 | `KONTRAKTNR` | VARCHAR(40) |  |
| 7 | `KONTRAKTVON` | DATE |  |
| 8 | `KONTRAKTBIS` | DATE |  |
| 9 | `KONTRAKTMENGE` | VARCHAR(20) |  |
| 10 | `MENGELAGERZUB` | VARCHAR(20) |  |
| 11 | `MENGELAGERABB` | VARCHAR(20) |  |
| 12 | `AKTMENGE` | VARCHAR(20) |  |
| 13 | `MINMENGE` | VARCHAR(20) |  |
| 14 | `MAXMENGE` | VARCHAR(20) |  |

---

## Produktion

### SQLARTLOSMESSPLAN ⚪

**Beschreibung:** Artikel-Los-Messpläne — Qualitäts-Messpläne für Fertigungslose.
**Datensätze:** 0 | **Spalten:** 124

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PRODNR` | VARCHAR(8) | ✅ |
| 2 | `ETNR` | VARCHAR(8) | ✅ |
| 3 | `LOSNR` | VARCHAR(5) | ✅ |
| 4 | `TEILNR` | VARCHAR(25) | ✅ |
| 5 | `CHARGE` | VARCHAR(25) | ✅ |
| 6 | `ARTNR` | VARCHAR(25) | ✅ |
| 7 | `MPLNR` | VARCHAR(25) | ✅ |
| 8 | `ZEICHNUNGSNR` | VARCHAR(30) | ✅ |
| 9 | `ZEICHNUNGSIX` | VARCHAR(30) |  |
| 10 | `KTEXT1` | VARCHAR(50) |  |
| 11 | `KTEXT2` | VARCHAR(50) |  |
| 12 | `TRANSPORTBEH` | VARCHAR(30) |  |
| 13 | `MTEXT1` | BLOB |  |
| 14 | `MTEXT2` | BLOB |  |
| 15 | `MTEXT3` | BLOB |  |
| 16 | `MAERSTELLT` | VARCHAR(3) |  |
| 17 | `DATUMERSTELLT` | VARCHAR(10) |  |
| 18 | `MAGEMESSEN` | VARCHAR(3) |  |
| 19 | `DATUMGEMESSEN` | VARCHAR(10) |  |
| 20 | `ANZMPUNKT` | VARCHAR(3) |  |
| 21 | `PKTGEMESSEN` | VARCHAR(3) |  |
| 22 | `DOCLINK` | VARCHAR(120) |  |
| 23 | `MPUNKT001` | VARCHAR(15) |  |
| 24 | `SOLLMASS001` | VARCHAR(25) |  |
| 25 | `TOLERANZ001` | VARCHAR(25) |  |
| 26 | `MESSMNR001` | VARCHAR(25) |  |
| 27 | `ISTMASS001` | VARCHAR(25) |  |
| 28 | `MPUNKT002` | VARCHAR(15) |  |
| 29 | `SOLLMASS002` | VARCHAR(25) |  |
| 30 | `TOLERANZ002` | VARCHAR(25) |  |
| 31 | `MESSMNR002` | VARCHAR(25) |  |
| 32 | `ISTMASS002` | VARCHAR(25) |  |
| 33 | `MPUNKT003` | VARCHAR(15) |  |
| 34 | `SOLLMASS003` | VARCHAR(25) |  |
| 35 | `TOLERANZ003` | VARCHAR(25) |  |
| 36 | `MESSMNR003` | VARCHAR(25) |  |
| 37 | `ISTMASS003` | VARCHAR(25) |  |
| 38 | `MPUNKT004` | VARCHAR(15) |  |
| 39 | `SOLLMASS004` | VARCHAR(25) |  |
| 40 | `TOLERANZ004` | VARCHAR(25) |  |
| 41 | `MESSMNR004` | VARCHAR(25) |  |
| 42 | `ISTMASS004` | VARCHAR(25) |  |
| 43 | `MPUNKT005` | VARCHAR(15) |  |
| 44 | `SOLLMASS005` | VARCHAR(25) |  |
| 45 | `TOLERANZ005` | VARCHAR(25) |  |
| 46 | `MESSMNR005` | VARCHAR(25) |  |
| 47 | `ISTMASS005` | VARCHAR(25) |  |
| 48 | `MPUNKT006` | VARCHAR(15) |  |
| 49 | `SOLLMASS006` | VARCHAR(25) |  |
| 50 | `TOLERANZ006` | VARCHAR(25) |  |
| 51 | `MESSMNR006` | VARCHAR(25) |  |
| 52 | `ISTMASS006` | VARCHAR(25) |  |
| 53 | `MPUNKT007` | VARCHAR(15) |  |
| 54 | `SOLLMASS007` | VARCHAR(25) |  |
| 55 | `TOLERANZ007` | VARCHAR(25) |  |
| 56 | `MESSMNR007` | VARCHAR(25) |  |
| 57 | `ISTMASS007` | VARCHAR(25) |  |
| 58 | `MPUNKT008` | VARCHAR(15) |  |
| 59 | `SOLLMASS008` | VARCHAR(25) |  |
| 60 | `TOLERANZ008` | VARCHAR(25) |  |
| 61 | `MESSMNR008` | VARCHAR(25) |  |
| 62 | `ISTMASS008` | VARCHAR(25) |  |
| 63 | `MPUNKT009` | VARCHAR(15) |  |
| 64 | `SOLLMASS009` | VARCHAR(25) |  |
| 65 | `TOLERANZ009` | VARCHAR(25) |  |
| 66 | `MESSMNR009` | VARCHAR(25) |  |
| 67 | `ISTMASS009` | VARCHAR(25) |  |
| 68 | `MPUNKT010` | VARCHAR(15) |  |
| 69 | `SOLLMASS010` | VARCHAR(25) |  |
| 70 | `TOLERANZ010` | VARCHAR(25) |  |
| 71 | `MESSMNR010` | VARCHAR(25) |  |
| 72 | `ISTMASS010` | VARCHAR(25) |  |
| 73 | `MPUNKT011` | VARCHAR(15) |  |
| 74 | `SOLLMASS011` | VARCHAR(25) |  |
| 75 | `TOLERANZ011` | VARCHAR(25) |  |
| 76 | `MESSMNR011` | VARCHAR(25) |  |
| 77 | `ISTMASS011` | VARCHAR(25) |  |
| 78 | `MPUNKT012` | VARCHAR(15) |  |
| 79 | `SOLLMASS012` | VARCHAR(25) |  |
| 80 | `TOLERANZ012` | VARCHAR(25) |  |
| 81 | `MESSMNR012` | VARCHAR(25) |  |
| 82 | `ISTMASS012` | VARCHAR(25) |  |
| 83 | `MPUNKT013` | VARCHAR(15) |  |
| 84 | `SOLLMASS013` | VARCHAR(25) |  |
| 85 | `TOLERANZ013` | VARCHAR(25) |  |
| 86 | `MESSMNR013` | VARCHAR(25) |  |
| 87 | `ISTMASS013` | VARCHAR(25) |  |
| 88 | `MPUNKT014` | VARCHAR(15) |  |
| 89 | `SOLLMASS014` | VARCHAR(25) |  |
| 90 | `TOLERANZ014` | VARCHAR(25) |  |
| 91 | `MESSMNR014` | VARCHAR(25) |  |
| 92 | `ISTMASS014` | VARCHAR(25) |  |
| 93 | `MPUNKT015` | VARCHAR(15) |  |
| 94 | `SOLLMASS015` | VARCHAR(25) |  |
| 95 | `TOLERANZ015` | VARCHAR(25) |  |
| 96 | `MESSMNR015` | VARCHAR(25) |  |
| 97 | `ISTMASS015` | VARCHAR(25) |  |
| 98 | `MPUNKT016` | VARCHAR(15) |  |
| 99 | `SOLLMASS016` | VARCHAR(25) |  |
| 100 | `TOLERANZ016` | VARCHAR(25) |  |
| 101 | `MESSMNR016` | VARCHAR(25) |  |
| 102 | `ISTMASS016` | VARCHAR(25) |  |
| 103 | `MPUNKT017` | VARCHAR(15) |  |
| 104 | `SOLLMASS017` | VARCHAR(25) |  |
| 105 | `TOLERANZ017` | VARCHAR(25) |  |
| 106 | `MESSMNR017` | VARCHAR(25) |  |
| 107 | `ISTMASS017` | VARCHAR(25) |  |
| 108 | `MPUNKT018` | VARCHAR(15) |  |
| 109 | `SOLLMASS018` | VARCHAR(25) |  |
| 110 | `TOLERANZ018` | VARCHAR(25) |  |
| 111 | `MESSMNR018` | VARCHAR(25) |  |
| 112 | `ISTMASS018` | VARCHAR(25) |  |
| 113 | `MPUNKT019` | VARCHAR(15) |  |
| 114 | `SOLLMASS019` | VARCHAR(25) |  |
| 115 | `TOLERANZ019` | VARCHAR(25) |  |
| 116 | `MESSMNR019` | VARCHAR(25) |  |
| 117 | `ISTMASS019` | VARCHAR(25) |  |
| 118 | `MPUNKT020` | VARCHAR(15) |  |
| 119 | `SOLLMASS020` | VARCHAR(25) |  |
| 120 | `TOLERANZ020` | VARCHAR(25) |  |
| 121 | `MESSMNR020` | VARCHAR(25) |  |
| 122 | `ISTMASS020` | VARCHAR(25) |  |
| 123 | `ZEITGEMESSEN` | VARCHAR(8) |  |
| 124 | `BEWERTUNG` | VARCHAR(5) |  |

### SQLARTPPLAN ⚪

**Beschreibung:** Artikel-Prüfpläne — Qualitätsprüfpläne pro Artikel.
**Datensätze:** 0 | **Spalten:** 20

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTNR` | VARCHAR(25) | ✅ |
| 2 | `PPLNR` | VARCHAR(25) | ✅ |
| 3 | `PRUEFAGNR` | VARCHAR(5) | ✅ |
| 4 | `IDENT` | VARCHAR(15) |  |
| 5 | `KTEXT1` | VARCHAR(50) |  |
| 6 | `KTEXT2` | VARCHAR(50) |  |
| 7 | `KTEXT3` | VARCHAR(50) |  |
| 8 | `KTEXT4` | VARCHAR(50) |  |
| 9 | `KTEXT5` | VARCHAR(50) |  |
| 10 | `KZ` | VARCHAR(5) |  |
| 11 | `BEMERKG` | VARCHAR(50) |  |
| 12 | `DOKUNR` | INTEGER |  |
| 13 | `LANGTEXT` | BLOB |  |
| 14 | `MLINK` | VARCHAR(120) |  |
| 15 | `ZEIT1` | VARCHAR(5) |  |
| 16 | `ZEIT2` | VARCHAR(5) |  |
| 17 | `ZEITEINH` | VARCHAR(5) |  |
| 18 | `PRUEFDRUCK` | VARCHAR(5) |  |
| 19 | `PRUEFAGART` | VARCHAR(5) |  |
| 20 | `ANZTEILE` | VARCHAR(3) |  |

### SQLARTSTAMMMESSPLAN ⚪

**Beschreibung:** Artikel-Stamm-Messpläne — Standard-Messpläne pro Artikel.
**Datensätze:** 0 | **Spalten:** 116

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTNR` | VARCHAR(25) | ✅ |
| 2 | `MPLNR` | VARCHAR(25) | ✅ |
| 3 | `ZEICHNUNGSNR` | VARCHAR(30) | ✅ |
| 4 | `ZEICHNUNGSIX` | VARCHAR(30) |  |
| 5 | `KTEXT1` | VARCHAR(50) |  |
| 6 | `KTEXT2` | VARCHAR(50) |  |
| 7 | `TRANSPORTBEH` | VARCHAR(30) |  |
| 8 | `MTEXT1` | BLOB |  |
| 9 | `MTEXT2` | BLOB |  |
| 10 | `MTEXT3` | BLOB |  |
| 11 | `MAERSTELLT` | VARCHAR(3) |  |
| 12 | `DATUMERSTELLT` | VARCHAR(10) |  |
| 13 | `MESSMITTELNR` | VARCHAR(25) |  |
| 14 | `MESSMITTELBEZ` | VARCHAR(60) |  |
| 15 | `ANZMPUNKT` | VARCHAR(3) |  |
| 16 | `DOCLINK` | VARCHAR(120) |  |
| 17 | `MPUNKT001` | VARCHAR(15) |  |
| 18 | `SOLLMASS001` | VARCHAR(25) |  |
| 19 | `TOLERANZ001` | VARCHAR(25) |  |
| 20 | `MPUNKT002` | VARCHAR(15) |  |
| 21 | `SOLLMASS002` | VARCHAR(25) |  |
| 22 | `TOLERANZ002` | VARCHAR(25) |  |
| 23 | `MPUNKT003` | VARCHAR(15) |  |
| 24 | `SOLLMASS003` | VARCHAR(25) |  |
| 25 | `TOLERANZ003` | VARCHAR(25) |  |
| 26 | `MPUNKT004` | VARCHAR(15) |  |
| 27 | `SOLLMASS004` | VARCHAR(25) |  |
| 28 | `TOLERANZ004` | VARCHAR(25) |  |
| 29 | `MPUNKT005` | VARCHAR(15) |  |
| 30 | `SOLLMASS005` | VARCHAR(25) |  |
| 31 | `TOLERANZ005` | VARCHAR(25) |  |
| 32 | `MPUNKT006` | VARCHAR(15) |  |
| 33 | `SOLLMASS006` | VARCHAR(25) |  |
| 34 | `TOLERANZ006` | VARCHAR(25) |  |
| 35 | `MPUNKT007` | VARCHAR(15) |  |
| 36 | `SOLLMASS007` | VARCHAR(25) |  |
| 37 | `TOLERANZ007` | VARCHAR(25) |  |
| 38 | `MPUNKT008` | VARCHAR(15) |  |
| 39 | `SOLLMASS008` | VARCHAR(25) |  |
| 40 | `TOLERANZ008` | VARCHAR(25) |  |
| 41 | `MPUNKT009` | VARCHAR(15) |  |
| 42 | `SOLLMASS009` | VARCHAR(25) |  |
| 43 | `TOLERANZ009` | VARCHAR(25) |  |
| 44 | `MPUNKT010` | VARCHAR(15) |  |
| 45 | `SOLLMASS010` | VARCHAR(25) |  |
| 46 | `TOLERANZ010` | VARCHAR(25) |  |
| 47 | `MPUNKT011` | VARCHAR(15) |  |
| 48 | `SOLLMASS011` | VARCHAR(25) |  |
| 49 | `TOLERANZ011` | VARCHAR(25) |  |
| 50 | `MPUNKT012` | VARCHAR(15) |  |
| 51 | `SOLLMASS012` | VARCHAR(25) |  |
| 52 | `TOLERANZ012` | VARCHAR(25) |  |
| 53 | `MPUNKT013` | VARCHAR(15) |  |
| 54 | `SOLLMASS013` | VARCHAR(25) |  |
| 55 | `TOLERANZ013` | VARCHAR(25) |  |
| 56 | `MPUNKT014` | VARCHAR(15) |  |
| 57 | `SOLLMASS014` | VARCHAR(25) |  |
| 58 | `TOLERANZ014` | VARCHAR(25) |  |
| 59 | `MPUNKT015` | VARCHAR(15) |  |
| 60 | `SOLLMASS015` | VARCHAR(25) |  |
| 61 | `TOLERANZ015` | VARCHAR(25) |  |
| 62 | `MPUNKT016` | VARCHAR(15) |  |
| 63 | `SOLLMASS016` | VARCHAR(25) |  |
| 64 | `TOLERANZ016` | VARCHAR(25) |  |
| 65 | `MPUNKT017` | VARCHAR(15) |  |
| 66 | `SOLLMASS017` | VARCHAR(25) |  |
| 67 | `TOLERANZ017` | VARCHAR(25) |  |
| 68 | `MPUNKT018` | VARCHAR(15) |  |
| 69 | `SOLLMASS018` | VARCHAR(25) |  |
| 70 | `TOLERANZ018` | VARCHAR(25) |  |
| 71 | `MPUNKT019` | VARCHAR(15) |  |
| 72 | `SOLLMASS019` | VARCHAR(25) |  |
| 73 | `TOLERANZ019` | VARCHAR(25) |  |
| 74 | `MPUNKT020` | VARCHAR(15) |  |
| 75 | `SOLLMASS020` | VARCHAR(25) |  |
| 76 | `TOLERANZ020` | VARCHAR(25) |  |
| 77 | `MESSMNR001` | VARCHAR(25) |  |
| 78 | `MESSMBEZ001` | VARCHAR(60) |  |
| 79 | `MESSMNR002` | VARCHAR(25) |  |
| 80 | `MESSMBEZ002` | VARCHAR(60) |  |
| 81 | `MESSMNR003` | VARCHAR(25) |  |
| 82 | `MESSMBEZ003` | VARCHAR(60) |  |
| 83 | `MESSMNR004` | VARCHAR(25) |  |
| 84 | `MESSMBEZ004` | VARCHAR(60) |  |
| 85 | `MESSMNR005` | VARCHAR(25) |  |
| 86 | `MESSMBEZ005` | VARCHAR(60) |  |
| 87 | `MESSMNR006` | VARCHAR(25) |  |
| 88 | `MESSMBEZ006` | VARCHAR(60) |  |
| 89 | `MESSMNR007` | VARCHAR(25) |  |
| 90 | `MESSMBEZ007` | VARCHAR(60) |  |
| 91 | `MESSMNR008` | VARCHAR(25) |  |
| 92 | `MESSMBEZ008` | VARCHAR(60) |  |
| 93 | `MESSMNR009` | VARCHAR(25) |  |
| 94 | `MESSMBEZ009` | VARCHAR(60) |  |
| 95 | `MESSMNR010` | VARCHAR(25) |  |
| 96 | `MESSMBEZ010` | VARCHAR(60) |  |
| 97 | `MESSMNR011` | VARCHAR(25) |  |
| 98 | `MESSMBEZ011` | VARCHAR(60) |  |
| 99 | `MESSMNR012` | VARCHAR(25) |  |
| 100 | `MESSMBEZ012` | VARCHAR(60) |  |
| 101 | `MESSMNR013` | VARCHAR(25) |  |
| 102 | `MESSMBEZ013` | VARCHAR(60) |  |
| 103 | `MESSMNR014` | VARCHAR(25) |  |
| 104 | `MESSMBEZ014` | VARCHAR(60) |  |
| 105 | `MESSMNR015` | VARCHAR(25) |  |
| 106 | `MESSMBEZ015` | VARCHAR(60) |  |
| 107 | `MESSMNR016` | VARCHAR(25) |  |
| 108 | `MESSMBEZ016` | VARCHAR(60) |  |
| 109 | `MESSMNR017` | VARCHAR(25) |  |
| 110 | `MESSMBEZ017` | VARCHAR(60) |  |
| 111 | `MESSMNR018` | VARCHAR(25) |  |
| 112 | `MESSMBEZ018` | VARCHAR(60) |  |
| 113 | `MESSMNR019` | VARCHAR(25) |  |
| 114 | `MESSMBEZ019` | VARCHAR(60) |  |
| 115 | `MESSMNR020` | VARCHAR(25) |  |
| 116 | `MESSMBEZ020` | VARCHAR(60) |  |

### SQLCNCPROG ⚪

**Beschreibung:** CNC-Programme — CNC-Maschinenprogramme (z.B. für Schlüsselfräsmaschinen).
**Datensätze:** 0 | **Spalten:** 12

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `MASCHINENNR` | VARCHAR(20) | ✅ |
| 3 | `PROGRAMMNR` | VARCHAR(50) | ✅ |
| 4 | `BESCHREIBUNG` | VARCHAR(50) |  |
| 5 | `SPEICHERORT` | VARCHAR(127) |  |
| 6 | `EINSTELLBLATT` | BLOB |  |
| 7 | `WERKZEUGLISTE` | BLOB |  |
| 8 | `VORRICHTUNG` | VARCHAR(15) |  |
| 9 | `VORBZEIT` | VARCHAR(10) |  |
| 10 | `STCKZEIT` | VARCHAR(10) |  |
| 11 | `TEILEVORR` | VARCHAR(3) |  |
| 12 | `ABSCHZEIT` | VARCHAR(10) |  |

### SQLCNCWERKZEUG ⚪

**Beschreibung:** CNC-Werkzeuge — Werkzeugverwaltung für CNC-Maschinen.
**Datensätze:** 0 | **Spalten:** 7

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(15) | ✅ |
| 2 | `MASCHINENNR` | VARCHAR(5) | ✅ |
| 3 | `PROGRAMMNR` | VARCHAR(50) | ✅ |
| 4 | `LFDNR` | DOUBLE | ✅ |
| 5 | `WZARTIKELNR` | VARCHAR(15) |  |
| 6 | `KURZTEXT1` | VARCHAR(40) |  |
| 7 | `MENGE` | DOUBLE |  |

### SQLFASTMAPLAN ⚪

**Beschreibung:** Fast-Messpläne — Vereinfachte Schnell-Messpläne.
**Datensätze:** 0 | **Spalten:** 21

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTNR` | VARCHAR(25) | ✅ |
| 2 | `FPLNR` | VARCHAR(25) | ✅ |
| 3 | `AGNR` | VARCHAR(5) | ✅ |
| 4 | `IDENT` | VARCHAR(15) |  |
| 5 | `KT1` | VARCHAR(40) |  |
| 6 | `TA` | VARCHAR(10) |  |
| 7 | `TS` | VARCHAR(10) |  |
| 8 | `BEMERKG` | VARCHAR(50) |  |
| 9 | `KTEXT1` | VARCHAR(50) |  |
| 10 | `KTEXT2` | VARCHAR(50) |  |
| 11 | `KTEXT3` | VARCHAR(50) |  |
| 12 | `KTEXT4` | VARCHAR(50) |  |
| 13 | `KTEXT5` | VARCHAR(50) |  |
| 14 | `INTKZ` | VARCHAR(5) |  |
| 15 | `MASCHINENNR` | VARCHAR(20) |  |
| 16 | `PROGRAMMNR` | VARCHAR(50) |  |
| 17 | `VORRICHTUNG` | VARCHAR(25) |  |
| 18 | `SPANNFAKTOR` | VARCHAR(2) |  |
| 19 | `PRUEFPLAN` | VARCHAR(25) |  |
| 20 | `MESSPLAN` | VARCHAR(25) |  |
| 21 | `DOKNRVORSCHRIFT` | INTEGER |  |

### SQLMASCHINE ⚪

**Beschreibung:** Maschinen — Maschinenstammdaten.
**Datensätze:** 0 | **Spalten:** 17

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `MASCHNR` | VARCHAR(6) | ✅ |
| 2 | `BESCHREIBUNG` | VARCHAR(40) | ✅ |
| 3 | `KOSTST` | VARCHAR(6) |  |
| 4 | `KONTO` | VARCHAR(8) |  |
| 5 | `INVNR` | VARCHAR(10) |  |
| 6 | `BAUJAHR` | VARCHAR(4) |  |
| 7 | `NEUWERT` | DOUBLE |  |
| 8 | `ADATUM` | DATE |  |
| 9 | `ABSCHREIBG` | DOUBLE |  |
| 10 | `ABSCHREIBGP` | DOUBLE |  |
| 11 | `PREISSTD` | DOUBLE |  |
| 12 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 13 | `BEMERKUNG` | VARCHAR(40) |  |
| 14 | `MASCHAZPLAN` | VARCHAR(10) |  |
| 15 | `ANZFBUCH` | VARCHAR(1) |  |
| 16 | `ANZBDE` | VARCHAR(1) |  |
| 17 | `UVPROTOKOLLE` | VARCHAR(120) |  |

### SQLMESSMITTEL ⚪

**Beschreibung:** Messmittel — Verwaltung von Messmitteln/Prüfmitteln.
**Datensätze:** 0 | **Spalten:** 17

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTIKELNR` | VARCHAR(25) | ✅ |
| 2 | `MMSERNR` | VARCHAR(40) | ✅ |
| 3 | `MMIDENT` | VARCHAR(40) |  |
| 4 | `MMBEZ1` | VARCHAR(40) |  |
| 5 | `MMBEZ2` | VARCHAR(40) |  |
| 6 | `MMBEZ3` | VARCHAR(40) |  |
| 7 | `MMDIM` | VARCHAR(40) |  |
| 8 | `PRUEFZYKLUS` | VARCHAR(10) |  |
| 9 | `LETZTEPRUEF` | DATE |  |
| 10 | `NAECHSTEPRUEF` | DATE |  |
| 11 | `PRUEFADRNR` | VARCHAR(12) |  |
| 12 | `PRUEFADRNAME` | VARCHAR(40) |  |
| 13 | `ANSCHAFFUNG` | VARCHAR(10) |  |
| 14 | `STANDORT` | VARCHAR(40) |  |
| 15 | `MANR` | VARCHAR(6) |  |
| 16 | `MANAME` | VARCHAR(40) |  |
| 17 | `DOKPFAD` | VARCHAR(10) |  |

### SQLPABK ⚪

**Beschreibung:** Produktions-Arbeitsbescheinigungen — Abnahmen/Bescheinigungen für Fertigungslose.
**Datensätze:** 0 | **Spalten:** 35

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PRODNR` | VARCHAR(8) | ✅ |
| 2 | `ETNR` | VARCHAR(5) | ✅ |
| 3 | `LOSNR` | VARCHAR(5) | ✅ |
| 4 | `ARTNR` | VARCHAR(15) | ✅ |
| 5 | `AGNR` | VARCHAR(5) | ✅ |
| 6 | `KZ` | VARCHAR(1) |  |
| 7 | `IDENT` | VARCHAR(15) |  |
| 8 | `KT1` | VARCHAR(40) |  |
| 9 | `TA` | VARCHAR(10) |  |
| 10 | `TS` | VARCHAR(10) |  |
| 11 | `BEMERKG` | VARCHAR(50) |  |
| 12 | `KTEXT1` | VARCHAR(50) |  |
| 13 | `KTEXT2` | VARCHAR(50) |  |
| 14 | `KTEXT3` | VARCHAR(50) |  |
| 15 | `KTEXT4` | VARCHAR(50) |  |
| 16 | `KTEXT5` | VARCHAR(50) |  |
| 17 | `INTKZ` | VARCHAR(5) |  |
| 18 | `MASCHINENNR` | VARCHAR(20) |  |
| 19 | `PROGRAMMNR` | VARCHAR(50) |  |
| 20 | `VORRICHTUNG` | VARCHAR(25) |  |
| 21 | `LAGERABB` | VARCHAR(2) |  |
| 22 | `LAGERZUB` | VARCHAR(2) |  |
| 23 | `DATUMBEG` | VARCHAR(10) |  |
| 24 | `ZEITBEG` | VARCHAR(8) |  |
| 25 | `DATUMEND` | VARCHAR(10) |  |
| 26 | `ZEITEND` | VARCHAR(8) |  |
| 27 | `LOGVZEIT` | VARCHAR(10) |  |
| 28 | `EFFZEIT` | VARCHAR(10) |  |
| 29 | `FERTIGMENGE` | VARCHAR(10) |  |
| 30 | `FERTIG` | VARCHAR(10) |  |
| 31 | `SCHNITTSTELLE` | VARCHAR(5) |  |
| 32 | `KOSTST` | VARCHAR(8) |  |
| 33 | `LOHNGR` | VARCHAR(4) |  |
| 34 | `PRUEFPLAN` | VARCHAR(25) |  |
| 35 | `DOKNRVORSCHRIFT` | INTEGER |  |

### SQLPRDET ⚪

**Beschreibung:** Produktions-Einzelteile — Stücklisten-Auflösung für Produktion.
**Datensätze:** 0 | **Spalten:** 26

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PRODNR` | VARCHAR(8) | ✅ |
| 2 | `ETNR` | VARCHAR(5) | ✅ |
| 3 | `PROJEKTNR` | VARCHAR(50) | ✅ |
| 4 | `POSNR` | VARCHAR(5) | ✅ |
| 5 | `POSART` | VARCHAR(1) | ✅ |
| 6 | `POSIDENT` | VARCHAR(15) | ✅ |
| 7 | `KTEXT1` | VARCHAR(40) | ✅ |
| 8 | `KTEXT2` | VARCHAR(40) |  |
| 9 | `MEINH` | VARCHAR(5) | ✅ |
| 10 | `MENGE` | VARCHAR(10) | ✅ |
| 11 | `LGABB` | VARCHAR(2) |  |
| 12 | `LIEFERDATUM` | DATE |  |
| 13 | `KOSTST` | VARCHAR(5) |  |
| 14 | `KZBESTELL` | VARCHAR(1) |  |
| 15 | `MENGELGABB` | VARCHAR(10) |  |
| 16 | `LIEFERKW` | VARCHAR(5) |  |
| 17 | `FERTIG` | DATE |  |
| 18 | `MAFERTIG` | VARCHAR(3) |  |
| 19 | `ARTART` | VARCHAR(1) |  |
| 20 | `TEILNRZEICHNG` | VARCHAR(10) |  |
| 21 | `GRUNDBAUGRUPPE` | VARCHAR(1) |  |
| 22 | `LGBUCHART` | VARCHAR(5) |  |
| 23 | `LGFEHLBESTAND` | VARCHAR(10) |  |
| 24 | `AKTLGBESTAND` | VARCHAR(10) |  |
| 25 | `MINLGBESTAND` | VARCHAR(10) |  |
| 26 | `AUFTRAGSMENGE` | VARCHAR(10) | ✅ |

### SQLPRDKOPF 🟡

**Beschreibung:** Produktionsauftrags-Kopf — Fertigungsaufträge (z.B. Schlüsselkopie-Fertigung).
**Datensätze:** 28 | **Spalten:** 34

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PRODNR` | VARCHAR(8) | ✅ |
| 2 | `BELEGART` | VARCHAR(2) | ✅ |
| 3 | `MITARB` | VARCHAR(3) | ✅ |
| 4 | `KDNR` | VARCHAR(12) |  |
| 5 | `KDNAME` | VARCHAR(40) |  |
| 6 | `BELEGNR` | VARCHAR(6) |  |
| 7 | `BELEGDATUM` | DATE |  |
| 8 | `BEZUG` | BLOB |  |
| 9 | `ANFRAGEDATUM` | DATE |  |
| 10 | `AUFTRAGDATUM` | DATE |  |
| 11 | `VORLAGEDATUM` | DATE |  |
| 12 | `LIEFERDATUM` | DATE |  |
| 13 | `LGBUCH` | VARCHAR(2) |  |
| 14 | `ANZPOS` | VARCHAR(4) |  |
| 15 | `KZ` | FLOAT |  |
| 16 | `ZUHAENDEN` | VARCHAR(30) |  |
| 17 | `PROJEKTNR` | VARCHAR(50) |  |
| 18 | `LIEFERKW` | VARCHAR(5) |  |
| 19 | `KOSTST` | VARCHAR(5) |  |
| 20 | `DOKNR` | VARCHAR(30) |  |
| 21 | `FERTIG` | DATE |  |
| 22 | `MAFERTIG` | VARCHAR(3) |  |
| 23 | `KURZNAME` | VARCHAR(20) |  |
| 24 | `VORGANG` | VARCHAR(8) |  |
| 25 | `ZUSATZ01` | VARCHAR(20) |  |
| 26 | `ZUSATZ02` | VARCHAR(20) |  |
| 27 | `ZUSATZ03` | VARCHAR(20) |  |
| 28 | `ZUSATZ04` | VARCHAR(20) |  |
| 29 | `ZUSATZ05` | VARCHAR(20) |  |
| 30 | `ZUSATZ06` | VARCHAR(20) |  |
| 31 | `ZUSATZ07` | VARCHAR(20) |  |
| 32 | `ZUSATZ08` | VARCHAR(20) |  |
| 33 | `ZUSATZ09` | VARCHAR(20) |  |
| 34 | `ZUSATZ10` | VARCHAR(20) |  |

### SQLPRDLOS ⚪

**Beschreibung:** Produktions-Lose — Losverwaltung für Serienfertigung.
**Datensätze:** 0 | **Spalten:** 25

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PRODNR` | VARCHAR(8) | ✅ |
| 2 | `ETNR` | VARCHAR(5) | ✅ |
| 3 | `LOSNR` | VARCHAR(5) | ✅ |
| 4 | `POSNR` | VARCHAR(5) | ✅ |
| 5 | `ARTNR` | VARCHAR(15) | ✅ |
| 6 | `MEINH` | VARCHAR(5) | ✅ |
| 7 | `LOSMENGE` | VARCHAR(10) | ✅ |
| 8 | `FERTIGMENGE` | VARCHAR(10) | ✅ |
| 9 | `PRODBEGINN` | DATE |  |
| 10 | `PRODFERTIG` | DATE |  |
| 11 | `MAFERTIG` | VARCHAR(3) |  |
| 12 | `PRIORITY` | VARCHAR(10) |  |
| 13 | `LIEFERDATUM` | DATE | ✅ |
| 14 | `AUSSCHMENGE` | VARCHAR(10) |  |
| 15 | `AUSSCHPRUEF` | VARCHAR(1) |  |
| 16 | `LUMBFERTIG` | VARCHAR(10) |  |
| 17 | `LUMBAUSSCH` | VARCHAR(10) |  |
| 18 | `PRODENDDATUM` | DATE |  |
| 19 | `PRODENDZEIT` | TIME |  |
| 20 | `LGABB` | VARCHAR(2) |  |
| 21 | `KTEXT1` | VARCHAR(40) |  |
| 22 | `KTEXT2` | VARCHAR(40) |  |
| 23 | `PARTSCOUNTERAT` | VARCHAR(20) |  |
| 24 | `PARTSCOUNTERTO` | VARCHAR(20) |  |
| 25 | `CHECKLOS` | VARCHAR(1) |  |

### SQLPRDPOS 🟢

**Beschreibung:** Produktionsauftrags-Positionen — Material und Arbeitsschritte pro Produktionsauftrag.
**Datensätze:** 175 | **Spalten:** 20

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PRODNR` | VARCHAR(8) | ✅ |
| 2 | `POSNR` | VARCHAR(5) | ✅ |
| 3 | `POSIDENT` | VARCHAR(15) | ✅ |
| 4 | `POSART` | VARCHAR(1) | ✅ |
| 5 | `KTEXT1` | VARCHAR(40) | ✅ |
| 6 | `KTEXT2` | VARCHAR(40) |  |
| 7 | `KTEXT3` | VARCHAR(40) |  |
| 8 | `KTEXT4` | VARCHAR(40) |  |
| 9 | `KTEXT5` | VARCHAR(40) |  |
| 10 | `MEINH` | VARCHAR(5) | ✅ |
| 11 | `MENGE` | VARCHAR(10) | ✅ |
| 12 | `LGABB` | VARCHAR(2) |  |
| 13 | `LIEFERDATUM` | DATE |  |
| 14 | `STL` | VARCHAR(20) |  |
| 15 | `KZ` | DOUBLE | ✅ |
| 16 | `MENGELGZUB` | VARCHAR(10) |  |
| 17 | `LIEFERKW` | VARCHAR(5) |  |
| 18 | `FERTIG` | DATE |  |
| 19 | `MAFERTIG` | VARCHAR(3) |  |
| 20 | `ARTART` | VARCHAR(1) |  |

### SQLPRDQS ⚪

**Beschreibung:** Produktions-Qualitätssicherung — QS-Daten zu Produktionslosen.
**Datensätze:** 0 | **Spalten:** 22

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PRODNR` | VARCHAR(8) | ✅ |
| 2 | `ETNR` | VARCHAR(8) | ✅ |
| 3 | `LOSNR` | VARCHAR(5) | ✅ |
| 4 | `ARTNR` | VARCHAR(15) | ✅ |
| 5 | `AGNR` | VARCHAR(5) | ✅ |
| 6 | `ZNR` | VARCHAR(3) | ✅ |
| 7 | `AKTION` | VARCHAR(5) | ✅ |
| 8 | `VORSCHRIFT` | VARCHAR(20) |  |
| 9 | `MASCHNR` | VARCHAR(20) |  |
| 10 | `MASCHNAME` | VARCHAR(30) |  |
| 11 | `DATUM` | DATE |  |
| 12 | `ZEIT` | TIME |  |
| 13 | `BEFUND` | VARCHAR(10) |  |
| 14 | `QSBEARBNR` | VARCHAR(3) | ✅ |
| 15 | `QSBEARBNAME` | VARCHAR(40) |  |
| 16 | `WERKERNR` | VARCHAR(3) |  |
| 17 | `WERKERNAME` | VARCHAR(40) |  |
| 18 | `BEMERKUNG1` | VARCHAR(120) |  |
| 19 | `BEMERKUNG2` | VARCHAR(120) |  |
| 20 | `ANZEIGEN` | VARCHAR(1) |  |
| 21 | `ZEICHNUNGSNR` | VARCHAR(50) |  |
| 22 | `SCHNITTSTELLE` | VARCHAR(5) |  |

### SQLPRODDOC ⚪

**Beschreibung:** Produktionsdokumente — Dokumente zu Produktionsaufträgen.
**Datensätze:** 0 | **Spalten:** 9

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PRODNR` | VARCHAR(8) | ✅ |
| 2 | `BELEGART` | VARCHAR(2) | ✅ |
| 3 | `DOKUNR` | INTEGER | ✅ |
| 4 | `ZEIGEBDE` | VARCHAR(1) |  |
| 5 | `ZEIGEPROD` | VARCHAR(1) |  |
| 6 | `ZEIGEADR` | VARCHAR(1) |  |
| 7 | `DOKBESCHR` | VARCHAR(120) |  |
| 8 | `DATEINAME` | VARCHAR(80) |  |
| 9 | `MITARB` | VARCHAR(3) | ✅ |

### SQLPRUEFABL ⚪

**Beschreibung:** Prüfabläufe — QS-Prüfabläufe und -Ergebnisse.
**Datensätze:** 0 | **Spalten:** 35

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTNR` | VARCHAR(15) | ✅ |
| 2 | `CHARGENNR` | VARCHAR(20) | ✅ |
| 3 | `TEILNR` | VARCHAR(5) | ✅ |
| 4 | `PPLNR` | VARCHAR(25) | ✅ |
| 5 | `PRUEFAGNR` | VARCHAR(5) | ✅ |
| 6 | `PRODNR` | VARCHAR(8) |  |
| 7 | `LOSNR` | VARCHAR(5) |  |
| 8 | `AGNR` | VARCHAR(5) |  |
| 9 | `IDENT` | VARCHAR(15) |  |
| 10 | `KTEXT1` | VARCHAR(50) |  |
| 11 | `KTEXT2` | VARCHAR(50) |  |
| 12 | `KTEXT3` | VARCHAR(50) |  |
| 13 | `KTEXT4` | VARCHAR(50) |  |
| 14 | `KTEXT5` | VARCHAR(50) |  |
| 15 | `KZ` | VARCHAR(5) |  |
| 16 | `BEMERKG` | VARCHAR(50) |  |
| 17 | `DOKUNR` | INTEGER |  |
| 18 | `LANGTEXT` | BLOB |  |
| 19 | `MLINK` | VARCHAR(120) |  |
| 20 | `ZEIT1` | VARCHAR(5) |  |
| 21 | `ZEIT2` | VARCHAR(5) |  |
| 22 | `ZEITEINH` | VARCHAR(5) |  |
| 23 | `PRUEFDRUCK` | VARCHAR(5) |  |
| 24 | `MITARB` | VARCHAR(3) |  |
| 25 | `MITNAME` | VARCHAR(30) |  |
| 26 | `DATUM` | VARCHAR(10) |  |
| 27 | `ZEIT` | VARCHAR(5) |  |
| 28 | `ZEIT1IST` | VARCHAR(5) |  |
| 29 | `ZEIT2IST` | VARCHAR(5) |  |
| 30 | `ISTDRUCK` | VARCHAR(5) |  |
| 31 | `PRUEFAGART` | VARCHAR(5) |  |
| 32 | `TEILEKENNZEICHNUNG` | VARCHAR(25) |  |
| 33 | `ANZTEILE` | VARCHAR(3) |  |
| 34 | `PRUEFERG` | VARCHAR(10) |  |
| 35 | `PRUEFTEXT` | VARCHAR(60) |  |

### SQLREZEPTKOPF ⚪

**Beschreibung:** Rezept-Köpfe — Fertigungsrezepte/Arbeitspläne.
**Datensätze:** 0 | **Spalten:** 11

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `IDNR` | VARCHAR(25) | ✅ |
| 2 | `ZNR` | VARCHAR(3) | ✅ |
| 3 | `MATCH` | VARCHAR(30) |  |
| 4 | `KURZTEXT` | VARCHAR(80) | ✅ |
| 5 | `BESCHREIBUNG` | VARCHAR(80) |  |
| 6 | `STATUS` | VARCHAR(5) |  |
| 7 | `ERSTANLAGE` | VARCHAR(10) |  |
| 8 | `ERSTMA` | VARCHAR(5) |  |
| 9 | `AENDERUNG` | VARCHAR(10) |  |
| 10 | `AENDMA` | VARCHAR(5) |  |
| 11 | `LANGTEXT` | BLOB |  |

### SQLREZEPTPOS ⚪

**Beschreibung:** Rezept-Positionen — Einzelschritte in Rezepten.
**Datensätze:** 0 | **Spalten:** 9

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `IDNR` | VARCHAR(25) | ✅ |
| 2 | `ZNR` | VARCHAR(3) | ✅ |
| 3 | `POSNR` | VARCHAR(5) | ✅ |
| 4 | `POSIDENT` | VARCHAR(15) |  |
| 5 | `KURZTEXT1` | VARCHAR(80) | ✅ |
| 6 | `KURZTEXT2` | VARCHAR(80) |  |
| 7 | `KURZTEXT3` | VARCHAR(80) |  |
| 8 | `MENGEPROZ` | VARCHAR(10) |  |
| 9 | `MEINH` | VARCHAR(5) |  |

### SQLSTLK 🟡

**Beschreibung:** Stücklisten-Köpfe — Definition von Stücklisten (z.B. Schließanlage = Zylinder + Schlüssel).
**Datensätze:** 16 | **Spalten:** 16

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `STLNR` | VARCHAR(15) | ✅ |
| 2 | `STLBARCODE` | VARCHAR(15) |  |
| 3 | `STLMATCH` | VARCHAR(15) |  |
| 4 | `STLNAME` | VARCHAR(40) |  |
| 5 | `ANZAHLPOS` | VARCHAR(3) |  |
| 6 | `DATUM` | DATE |  |
| 7 | `VKNETTO` | DOUBLE |  |
| 8 | `VKBRUTTO` | DOUBLE |  |
| 9 | `EKNETTO` | DOUBLE |  |
| 10 | `WAEHRUNG` | VARCHAR(5) |  |
| 11 | `AENDINDEX` | VARCHAR(10) |  |
| 12 | `PRODKZ` | VARCHAR(1) |  |
| 13 | `BEMERK1` | VARCHAR(50) |  |
| 14 | `VKP1` | DOUBLE |  |
| 15 | `VKP2` | DOUBLE |  |
| 16 | `GEWICHT` | VARCHAR(10) |  |

### SQLSTLP 🟡

**Beschreibung:** Stücklisten-Positionen — Einzelteile einer Stückliste.
**Datensätze:** 10 | **Spalten:** 13

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `STLNR` | VARCHAR(15) | ✅ |
| 2 | `POSNR` | VARCHAR(3) | ✅ |
| 3 | `POSART` | VARCHAR(1) | ✅ |
| 4 | `POSIDENT` | VARCHAR(15) | ✅ |
| 5 | `KURZTEXT1` | VARCHAR(40) | ✅ |
| 6 | `MENGE` | VARCHAR(12) | ✅ |
| 7 | `MEINH` | VARCHAR(10) |  |
| 8 | `SKZ` | VARCHAR(2) |  |
| 9 | `PKZ` | VARCHAR(1) |  |
| 10 | `GUELTIGAB` | TIMESTAMP |  |
| 11 | `PRODKZ` | VARCHAR(1) |  |
| 12 | `BEMERK` | VARCHAR(30) |  |
| 13 | `TEILNRZEICHNG` | VARCHAR(10) |  |

---

## Projekt

### SQLPROJANSPRP 🟡

**Beschreibung:** Projekt-Ansprechpartner — Ansprechpartner pro Projekt.
**Datensätze:** 5 | **Spalten:** 11

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PROJEKTNR` | VARCHAR(25) | ✅ |
| 2 | `ZAEHLER` | VARCHAR(3) | ✅ |
| 3 | `ADRESSNR` | VARCHAR(12) | ✅ |
| 4 | `PERSONENNR` | VARCHAR(10) |  |
| 5 | `ANSPRNAME` | VARCHAR(40) |  |
| 6 | `ANSPRFUNKTION` | VARCHAR(50) |  |
| 7 | `ANSPRTEL` | VARCHAR(40) |  |
| 8 | `ANSPRFAX` | VARCHAR(40) |  |
| 9 | `ANSPRFUNK` | VARCHAR(40) |  |
| 10 | `ANSPRMAIL` | VARCHAR(50) |  |
| 11 | `BEMERKUNG` | VARCHAR(60) |  |

### SQLPROJECT ⚪

**Beschreibung:** Projekte (alternativ) — Weitere Projekttabelle (ggf. andere Projektart).
**Datensätze:** 0 | **Spalten:** 34

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PROJECTNR` | VARCHAR(20) | ✅ |
| 2 | `PROJECTSTATUS` | VARCHAR(2) | ✅ |
| 3 | `MATCH` | VARCHAR(20) | ✅ |
| 4 | `PROJECTBARCODE` | VARCHAR(40) |  |
| 5 | `BESCHREIBUNG1` | VARCHAR(40) | ✅ |
| 6 | `BESCHREIBUNG2` | VARCHAR(40) |  |
| 7 | `BESCHREIBUNG3` | VARCHAR(40) |  |
| 8 | `AUFTRAGGEBERNR` | VARCHAR(6) | ✅ |
| 9 | `AUFTRAGGEBERNAME` | VARCHAR(30) |  |
| 10 | `BEARBEITERNR` | VARCHAR(3) |  |
| 11 | `BEARBEITERNAME` | VARCHAR(30) |  |
| 12 | `ANLAGEDATUM` | DATE | ✅ |
| 13 | `LETZTEAENDERG` | DATE | ✅ |
| 14 | `MALETZTEAEND` | VARCHAR(3) | ✅ |
| 15 | `KOSTSTELLE` | VARCHAR(6) |  |
| 16 | `ZUGRIFFEBENE` | VARCHAR(3) | ✅ |
| 17 | `PROJECTBEGINN` | DATE | ✅ |
| 18 | `PROJECTENDE` | DATE |  |
| 19 | `EMPFEHLUNG` | VARCHAR(30) |  |
| 20 | `ANDATUMERST` | DATE |  |
| 21 | `AUSEING` | DATE |  |
| 22 | `ANDATUMAUS` | DATE |  |
| 23 | `SUBMISSION` | DATE |  |
| 24 | `AUSFUEHRUNG` | VARCHAR(10) |  |
| 25 | `ZUSCHLAGFRIST` | DATE |  |
| 26 | `ZUSCHLAG` | VARCHAR(6) |  |
| 27 | `ZUSCHLGRUND` | VARCHAR(30) |  |
| 28 | `AGBESTELLNR` | VARCHAR(30) |  |
| 29 | `AGBEARBNAME` | VARCHAR(30) |  |
| 30 | `GESAMTWERT` | VARCHAR(10) |  |
| 31 | `NACHKALKW` | VARCHAR(15) |  |
| 32 | `KAUFMVORG` | VARCHAR(8) |  |
| 33 | `APLANVORG` | VARCHAR(8) |  |
| 34 | `APLANART` | VARCHAR(15) |  |

### SQLPROJEKT 🟡

**Beschreibung:** Projekte — Projektverwaltung (z.B. Schließanlagen-Projekte, Bauprojekte).
**Datensätze:** 7 | **Spalten:** 53

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PROJEKTNR` | VARCHAR(25) | ✅ |
| 2 | `PROJEKTSTATUS` | VARCHAR(2) |  |
| 3 | `PROJEKTMATCH` | VARCHAR(50) |  |
| 4 | `BESCHREIBUNG1` | VARCHAR(40) |  |
| 5 | `BESCHREIBUNG2` | VARCHAR(40) |  |
| 6 | `BESCHREIBUNG3` | VARCHAR(40) |  |
| 7 | `PRORTNAME` | VARCHAR(40) |  |
| 8 | `PRORTSTRASSE` | VARCHAR(40) |  |
| 9 | `PRORTPLZ` | VARCHAR(25) |  |
| 10 | `PRORTORT` | VARCHAR(40) |  |
| 11 | `AUFTRAGGEBERNR` | VARCHAR(12) |  |
| 12 | `AUFTRAGGEBERNAME` | VARCHAR(40) |  |
| 13 | `BEARBNRAG` | VARCHAR(30) |  |
| 14 | `BEARBEITERAG` | VARCHAR(40) |  |
| 15 | `BEARBTELAG` | VARCHAR(40) |  |
| 16 | `BEARBEMAILAG` | VARCHAR(40) |  |
| 17 | `BEARBNRAN` | VARCHAR(30) |  |
| 18 | `BEARBEITERAN` | VARCHAR(40) |  |
| 19 | `BEARBTELAN` | VARCHAR(40) |  |
| 20 | `BEARBEMAILAN` | VARCHAR(40) |  |
| 21 | `PROJKOSTST` | VARCHAR(8) |  |
| 22 | `PROJGESAMTWERT` | FLOAT |  |
| 23 | `PROJNACHKALKWERT` | FLOAT |  |
| 24 | `PROJDATUMANG` | DATE |  |
| 25 | `PROJDATUMEAUS` | DATE |  |
| 26 | `PROJDATUMABAUS` | DATE |  |
| 27 | `PROJDATUMSUBM` | DATE |  |
| 28 | `PROJDATUMZUSCH` | DATE |  |
| 29 | `PROJAUSFZEIT` | VARCHAR(10) |  |
| 30 | `PROJDATUMERST` | DATE |  |
| 31 | `PROJDATUMAEND` | DATE |  |
| 32 | `MALAEND` | VARCHAR(10) |  |
| 33 | `PROJDATAUFTRAG` | DATE |  |
| 34 | `PROJDATUMBEG` | DATE |  |
| 35 | `PROJDATUMEND` | DATE |  |
| 36 | `PROJDATPLAN` | DATE |  |
| 37 | `PROJDATPRODB` | DATE |  |
| 38 | `PROJDATMONT` | DATE |  |
| 39 | `PROJDATLADEN` | DATE |  |
| 40 | `KAUFMVORGSOLL` | VARCHAR(10) |  |
| 41 | `APLANVORG` | VARCHAR(10) |  |
| 42 | `APLANART` | VARCHAR(15) |  |
| 43 | `BEARBEITERAN1` | VARCHAR(40) |  |
| 44 | `BEARBTELAN1` | VARCHAR(40) |  |
| 45 | `BEARBEMAILAN1` | VARCHAR(40) |  |
| 46 | `WERT1` | VARCHAR(15) |  |
| 47 | `WERT2` | VARCHAR(15) |  |
| 48 | `WERT3` | VARCHAR(15) |  |
| 49 | `LDOKNR` | VARCHAR(5) |  |
| 50 | `INFOTEXT` | BLOB |  |
| 51 | `VIEWCAL` | VARCHAR(1) |  |
| 52 | `ERLEDIGT` | VARCHAR(1) |  |
| 53 | `LIDATUMKUNDE` | VARCHAR(10) |  |

### SQLPROJHOTEL ⚪

**Beschreibung:** Projekt-Hotel — Hotelunterkünfte bei Außenprojekten.
**Datensätze:** 0 | **Spalten:** 19

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PROJEKTNR` | VARCHAR(25) | ✅ |
| 2 | `ZAEHLER` | VARCHAR(5) | ✅ |
| 3 | `HOTELNR` | VARCHAR(12) | ✅ |
| 4 | `HOTELNAME` | VARCHAR(40) |  |
| 5 | `HOTELSTRASSE` | VARCHAR(40) |  |
| 6 | `HOTELPLZ` | VARCHAR(15) |  |
| 7 | `HOTELORT` | VARCHAR(40) |  |
| 8 | `HOTELTEL` | VARCHAR(30) |  |
| 9 | `HOTELFAX` | VARCHAR(40) |  |
| 10 | `HOTELEMAIL` | VARCHAR(40) |  |
| 11 | `BESTELLTAM` | DATE |  |
| 12 | `BESTELLTWER` | VARCHAR(3) |  |
| 13 | `BUCHNR` | VARCHAR(20) |  |
| 14 | `BEMERKUNG` | VARCHAR(60) |  |
| 15 | `BESTELLTVOM` | DATE |  |
| 16 | `BESTELLTBIS` | DATE |  |
| 17 | `ANZAHLPERSONEN` | VARCHAR(3) |  |
| 18 | `PREIS` | VARCHAR(8) |  |
| 19 | `STORNO` | VARCHAR(8) |  |

### SQLPROJMASCH ⚪

**Beschreibung:** Projekt-Maschinen — Zuordnung von Maschinen zu Projekten.
**Datensätze:** 0 | **Spalten:** 17

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PROJEKTNR` | VARCHAR(25) | ✅ |
| 2 | `ZAEHLER` | VARCHAR(5) | ✅ |
| 3 | `MASCHNR` | VARCHAR(10) | ✅ |
| 4 | `PROJMASCHBEZ1` | VARCHAR(40) |  |
| 5 | `BESTELLTAM` | DATE |  |
| 6 | `BESTELLTWER` | VARCHAR(3) |  |
| 7 | `BESTELLTWO` | VARCHAR(40) |  |
| 8 | `STORNO` | VARCHAR(8) |  |
| 9 | `MASCHKZ` | VARCHAR(20) |  |
| 10 | `GELIEFERTAM` | DATE |  |
| 11 | `GELIEFERTUM` | VARCHAR(5) |  |
| 12 | `ABHOLUNGAM` | DATE |  |
| 13 | `ABHOLUNGUM` | VARCHAR(5) |  |
| 14 | `ZUSTELLUNGAM` | DATE |  |
| 15 | `ZUSTELLUNGUM` | VARCHAR(5) |  |
| 16 | `RUECKGABEAM` | DATE |  |
| 17 | `RUECKGABEUM` | VARCHAR(5) |  |

### SQLPROJMITARB ⚪

**Beschreibung:** Projekt-Mitarbeiter — Zuordnung von Mitarbeitern zu Projekten.
**Datensätze:** 0 | **Spalten:** 8

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PROJEKTNR` | VARCHAR(25) | ✅ |
| 2 | `ZAEHLER` | VARCHAR(5) | ✅ |
| 3 | `MANR` | VARCHAR(3) | ✅ |
| 4 | `MANAME` | VARCHAR(40) |  |
| 5 | `VONDATUM` | DATE |  |
| 6 | `BISDATUM` | DATE |  |
| 7 | `EINSATZALS` | VARCHAR(50) |  |
| 8 | `BEMERKUNG` | VARCHAR(60) |  |

### SQLPROJPLAN ⚪

**Beschreibung:** Projektplan — Planungsdaten/Meilensteine zu Projekten.
**Datensätze:** 0 | **Spalten:** 27

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PROJEKTNR` | VARCHAR(25) | ✅ |
| 2 | `ZAEHLER` | VARCHAR(5) | ✅ |
| 3 | `PROJPLANART` | VARCHAR(5) |  |
| 4 | `PROJPLANMATCH` | VARCHAR(50) |  |
| 5 | `PROJPLANTEXT1` | VARCHAR(40) |  |
| 6 | `PROJPLANTEXT2` | VARCHAR(40) |  |
| 7 | `VONDATUM` | DATE |  |
| 8 | `VONZEIT` | VARCHAR(8) |  |
| 9 | `BISDATUM` | DATE |  |
| 10 | `BISZEIT` | VARCHAR(8) |  |
| 11 | `ANZMITARB` | VARCHAR(3) |  |
| 12 | `ANZGERAET` | VARCHAR(3) |  |
| 13 | `ANZHOTEL` | VARCHAR(3) |  |
| 14 | `BEMERKUNG` | VARCHAR(60) |  |
| 15 | `PLARTCOLOR` | INTEGER |  |
| 16 | `KALKART` | VARCHAR(5) |  |
| 17 | `WERT1` | VARCHAR(15) |  |
| 18 | `WERT2` | VARCHAR(15) |  |
| 19 | `WERT3` | VARCHAR(15) |  |
| 20 | `FAKTOR1` | FLOAT |  |
| 21 | `FAKTOR2` | FLOAT |  |
| 22 | `FAKTOR3` | FLOAT |  |
| 23 | `MAVERANT` | VARCHAR(3) |  |
| 24 | `MABUCHG` | VARCHAR(3) |  |
| 25 | `BUCHDATUM` | DATE |  |
| 26 | `BUCHZEIT` | VARCHAR(8) |  |
| 27 | `AKTIV` | VARCHAR(1) |  |

### SQLPROJPLART 🟡

**Beschreibung:** Projektplan-Arten — Typen von Planungseinträgen.
**Datensätze:** 1 | **Spalten:** 8

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PROJPLANART` | VARCHAR(5) | ✅ |
| 2 | `PLANARTBEZ` | VARCHAR(40) | ✅ |
| 3 | `PLANARTMATCH` | VARCHAR(30) |  |
| 4 | `PLANARTCOLOR` | INTEGER |  |
| 5 | `KALKART` | VARCHAR(5) |  |
| 6 | `FAKTOR1VG` | FLOAT |  |
| 7 | `FAKTOR2VG` | FLOAT |  |
| 8 | `FAKTOR3VG` | FLOAT |  |

---

## Personal/Zeiterfassung

### SQLAZPLAN ⚪

**Beschreibung:** Arbeitszeitpläne — Arbeitszeitmodelle für Mitarbeiter.
**Datensätze:** 0 | **Spalten:** 15

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `AZPID` | VARCHAR(10) | ✅ |
| 2 | `AZPABNR` | VARCHAR(5) | ✅ |
| 3 | `AZPBEZ` | VARCHAR(40) | ✅ |
| 4 | `AZPART` | VARCHAR(5) | ✅ |
| 5 | `AZPWTAG` | VARCHAR(8) | ✅ |
| 6 | `AZPBEG` | VARCHAR(8) | ✅ |
| 7 | `AZPEND` | VARCHAR(8) | ✅ |
| 8 | `AZPVZEIT1MIN` | VARCHAR(5) | ✅ |
| 9 | `AZPVZEIT1BEZ` | VARCHAR(25) | ✅ |
| 10 | `AZPVZEIT2MIN` | VARCHAR(5) | ✅ |
| 11 | `AZPVZEIT2BEZ` | VARCHAR(25) | ✅ |
| 12 | `AZPVZEIT3MIN` | VARCHAR(5) | ✅ |
| 13 | `AZPVZEIT3BEZ` | VARCHAR(25) | ✅ |
| 14 | `AZPGZEITMIN` | VARCHAR(5) | ✅ |
| 15 | `AZPEFFZEITMIN` | VARCHAR(5) | ✅ |

### SQLCALENDAR 🟡

**Beschreibung:** Kalender — Betriebskalender (Feiertage, Betriebsferien, Schichtpläne).
**Datensätze:** 24 | **Spalten:** 12

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `JJJJMMTT` | VARCHAR(8) | ✅ |
| 2 | `MITARB` | VARCHAR(3) | ✅ |
| 3 | `REGION` | VARCHAR(10) | ✅ |
| 4 | `MASCHINE` | VARCHAR(10) | ✅ |
| 5 | `COLOR1` | FLOAT |  |
| 6 | `COLOR2` | FLOAT |  |
| 7 | `COLOR3` | FLOAT |  |
| 8 | `EIGENSCHAFT` | VARCHAR(3) |  |
| 9 | `EIGENSCHAFT2` | VARCHAR(3) |  |
| 10 | `EIGENSCHAFT3` | VARCHAR(3) |  |
| 11 | `ZAHL1` | VARCHAR(3) |  |
| 12 | `GEBIET` | VARCHAR(10) |  |

### SQLCALPOS ⚪

**Beschreibung:** Kalender-Positionen — Einzelne Kalendereinträge.
**Datensätze:** 0 | **Spalten:** 13

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `JJJJMMTT` | VARCHAR(8) | ✅ |
| 2 | `MITARB` | VARCHAR(3) | ✅ |
| 3 | `REGION` | VARCHAR(10) | ✅ |
| 4 | `MASCHINE` | VARCHAR(10) | ✅ |
| 5 | `STMIN` | VARCHAR(6) | ✅ |
| 6 | `BEARBSTAND` | VARCHAR(3) |  |
| 7 | `ART` | VARCHAR(3) | ✅ |
| 8 | `SCHLUESSEL` | VARCHAR(30) |  |
| 9 | `AUFGABE` | VARCHAR(50) |  |
| 10 | `MAEINTRAG` | VARCHAR(3) | ✅ |
| 11 | `DATUMEINTRAG` | VARCHAR(10) |  |
| 12 | `STDMINBIS` | VARCHAR(5) |  |
| 13 | `TEXT` | BLOB |  |

### SQLLOHNGR 🟡

**Beschreibung:** Lohngruppen — Lohngruppen-Definitionen.
**Datensätze:** 1 | **Spalten:** 6

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LOHNGRUPPE` | VARCHAR(2) | ✅ |
| 2 | `BESCHREIBUNG` | VARCHAR(40) |  |
| 3 | `PREISMIN` | DOUBLE |  |
| 4 | `PREISSTD` | DOUBLE |  |
| 5 | `AUFSCHLAGP` | DOUBLE |  |
| 6 | `WAEHRUNG` | VARCHAR(5) | ✅ |

### SQLPWTER 🟡

**Beschreibung:** Passwort-/Terminal-Daten — Passwörter für Mitarbeiter-Terminals (BDE/PZE).
**Datensätze:** 1 | **Spalten:** 2

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `MITARBNR` | VARCHAR(3) | ✅ |
| 2 | `PASSWORT` | VARCHAR(20) |  |

### SQLREBUCHERFA 🟡

**Beschreibung:** Reisebuch-Erfassung — Reisekostenerfassung für Mitarbeiter.
**Datensätze:** 3 | **Spalten:** 37

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `MITARBEITER` | VARCHAR(3) | ✅ |
| 2 | `BELEGART` | VARCHAR(2) | ✅ |
| 3 | `BELEGNR` | VARCHAR(12) | ✅ |
| 4 | `UBELEGNR` | VARCHAR(2) | ✅ |
| 5 | `BUCHDATUM` | DATE |  |
| 6 | `ORGBELEGNR` | VARCHAR(20) |  |
| 7 | `ORGBELEGDATUM` | DATE |  |
| 8 | `ADRESSNR` | VARCHAR(12) |  |
| 9 | `ADRESSNAME` | VARCHAR(30) |  |
| 10 | `MATCH` | VARCHAR(20) |  |
| 11 | `ZAHLGRUND` | VARCHAR(40) |  |
| 12 | `LSNR` | VARCHAR(12) |  |
| 13 | `LSDATUM` | DATE |  |
| 14 | `ZAHLUNGSART` | VARCHAR(2) |  |
| 15 | `FAELLIG` | DATE |  |
| 16 | `FAELLIGSKO` | DATE |  |
| 17 | `KONTONR` | VARCHAR(8) |  |
| 18 | `ZAHLGKONTO` | VARCHAR(8) |  |
| 19 | `KOSTSTNR` | VARCHAR(6) |  |
| 20 | `WAEHRUNG` | VARCHAR(5) |  |
| 21 | `NETTOK` | FLOAT |  |
| 22 | `NETTOH` | FLOAT |  |
| 23 | `NETTOV` | FLOAT |  |
| 24 | `MWSTHALB` | FLOAT |  |
| 25 | `MWSTVOLL` | FLOAT |  |
| 26 | `HMWSTS` | VARCHAR(2) |  |
| 27 | `VMWSTS` | VARCHAR(2) |  |
| 28 | `NETTOWERT` | FLOAT |  |
| 29 | `BRUTTOWERT` | FLOAT |  |
| 30 | `SKONTOWERT` | FLOAT |  |
| 31 | `SKONTOP` | FLOAT |  |
| 32 | `ZAHLGSB` | VARCHAR(6) |  |
| 33 | `ALTTEILBETR` | FLOAT |  |
| 34 | `ALTTEILST` | FLOAT |  |
| 35 | `RECHART` | VARCHAR(1) |  |
| 36 | `VORSTEUERSCHL` | VARCHAR(5) |  |
| 37 | `KASSENNR` | VARCHAR(2) |  |

### SQLTEAMNAMES ⚪

**Beschreibung:** Team-Namen — Definition von Teams/Abteilungen.
**Datensätze:** 0 | **Spalten:** 3

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `NAMENO` | VARCHAR(3) | ✅ |
| 2 | `NAME` | VARCHAR(20) |  |
| 3 | `TEAMCODE` | VARCHAR(5) |  |

---

## Shop/E-Commerce

### SQLORDERLIST ⚪

**Beschreibung:** Bestelllisten — Bestellvorschläge/Einkaufslisten.
**Datensätze:** 0 | **Spalten:** 35

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `CREATETIME` | VARCHAR(20) | ✅ |
| 2 | `STATUS` | VARCHAR(5) | ✅ |
| 3 | `PROJEKTNR` | VARCHAR(25) |  |
| 4 | `VORGANGNR` | VARCHAR(25) |  |
| 5 | `BESTELLNR` | VARCHAR(25) |  |
| 6 | `AUFTRAGGEBERNR` | VARCHAR(12) |  |
| 7 | `AUFTRAGGEBERNAME` | VARCHAR(40) |  |
| 8 | `AUFTRAGSDATUM` | VARCHAR(10) |  |
| 9 | `ARTNR` | VARCHAR(150) |  |
| 10 | `KURZBEZ` | VARCHAR(150) |  |
| 11 | `AUFTRAGSMENGE` | VARCHAR(10) |  |
| 12 | `ABKUNDE` | VARCHAR(30) |  |
| 13 | `BSLIEFERER` | VARCHAR(30) |  |
| 14 | `LAGROHTEILE` | VARCHAR(12) |  |
| 15 | `PRODFREIGABE` | VARCHAR(5) |  |
| 16 | `PRODAUFTRAG` | VARCHAR(16) |  |
| 17 | `MENGEFERTIG` | VARCHAR(12) |  |
| 18 | `MENGEGEL` | VARCHAR(13) |  |
| 19 | `BEMERK1` | VARCHAR(150) |  |
| 20 | `BEMERK2` | VARCHAR(150) |  |
| 21 | `BEMERK3` | VARCHAR(150) |  |
| 22 | `FERTIG` | VARCHAR(10) |  |
| 23 | `VERFUEGBAR` | VARCHAR(10) |  |
| 24 | `LETZTERLINR` | VARCHAR(10) |  |
| 25 | `LETZTERLID` | VARCHAR(10) |  |
| 26 | `LAGFERTIGTEILE` | VARCHAR(12) |  |
| 27 | `LIDATUMKUNDE` | VARCHAR(10) |  |
| 28 | `LAGPRODTEILE` | VARCHAR(12) |  |
| 29 | `LAGFREMDTEILE` | VARCHAR(12) |  |
| 30 | `LAGFASTTEILE` | VARCHAR(12) |  |
| 31 | `DATEFERTIG` | DATE |  |
| 32 | `DATELIDATUMKUNDE` | DATE |  |
| 33 | `COLORAG` | INTEGER |  |
| 34 | `COLORACHTUNG` | INTEGER |  |
| 35 | `RTRESERVIERT` | VARCHAR(12) |  |

### SQLSHOPORDERS 🟢

**Beschreibung:** Shop-Bestellungen — Online-Shop-Bestellungen (mein-schluessel.de) mit Zahlstatus und Versanddaten.
**Datensätze:** 18,085 | **Spalten:** 22

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARCHIV` | VARCHAR(1) | ✅ |
| 2 | `IDSHOP` | VARCHAR(30) | ✅ |
| 3 | `BELEGART` | VARCHAR(5) | ✅ |
| 4 | `BELEGNR` | VARCHAR(12) | ✅ |
| 5 | `BELEGDATUM` | VARCHAR(10) |  |
| 6 | `VORGANGNR` | VARCHAR(16) |  |
| 7 | `ADRESSNR` | VARCHAR(12) |  |
| 8 | `ADRESSNAME` | VARCHAR(30) |  |
| 9 | `KDART` | VARCHAR(5) |  |
| 10 | `ZAHLKZ` | VARCHAR(20) |  |
| 11 | `ZAHLSTATUS` | VARCHAR(20) |  |
| 12 | `BEZAHLTAM` | VARCHAR(10) |  |
| 13 | `FREIGABE` | VARCHAR(1) |  |
| 14 | `VERSPAPIER` | VARCHAR(1) |  |
| 15 | `VERSAM` | VARCHAR(10) |  |
| 16 | `VERSMIT` | VARCHAR(20) |  |
| 17 | `TRACKINGNO` | VARCHAR(30) |  |
| 18 | `COLOR` | INTEGER |  |
| 19 | `REPERMAIL` | VARCHAR(10) |  |
| 20 | `SHOPADRNR` | VARCHAR(12) |  |
| 21 | `VERSANDGEWICHT` | VARCHAR(12) |  |
| 22 | `SELEKTION` | VARCHAR(2) |  |

---

## Dokumente

### SQLDOKUMENT 🟡

**Beschreibung:** Dokumente — Dokumentenverwaltung (Zeichnungen, Anleitungen, Zertifikate).
**Datensätze:** 58 | **Spalten:** 23

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `DOKUNR` | INTEGER | ✅ |
| 2 | `DOKUART` | VARCHAR(3) | ✅ |
| 3 | `BELEGART` | VARCHAR(10) |  |
| 4 | `BELEGNR` | VARCHAR(12) |  |
| 5 | `PROJEKTNR` | VARCHAR(20) |  |
| 6 | `VORGANGNR` | VARCHAR(16) |  |
| 7 | `ADRESSNR` | VARCHAR(12) |  |
| 8 | `ARTIKELNR` | VARCHAR(15) |  |
| 9 | `LEISTUNGNR` | VARCHAR(15) |  |
| 10 | `GERAETENR` | VARCHAR(25) |  |
| 11 | `DOKBESCHR` | VARCHAR(120) |  |
| 12 | `DATEINAME` | VARCHAR(80) |  |
| 13 | `DATEIVERZ` | VARCHAR(250) |  |
| 14 | `MITARB` | VARCHAR(3) | ✅ |
| 15 | `ERSTELLT` | DATE | ✅ |
| 16 | `GEAENDERT` | DATE | ✅ |
| 17 | `AUFRUFSCHUTZ` | VARCHAR(10) |  |
| 18 | `ZUGEBENE` | VARCHAR(3) | ✅ |
| 19 | `VORLAGEDATUM` | DATE |  |
| 20 | `SONDERBEH` | VARCHAR(5) |  |
| 21 | `MATCH` | VARCHAR(5) |  |
| 22 | `PRODUKTIONNR` | VARCHAR(12) |  |
| 23 | `SHOPDOKUMENT` | VARCHAR(2) |  |

### SQLDOKUSTRUK 🟡

**Beschreibung:** Dokumentenstruktur — Hierarchische Gliederung des Dokumentenbaums.
**Datensätze:** 2 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | INTEGER | ✅ |
| 2 | `ORDNERNAME` | VARCHAR(50) | ✅ |
| 3 | `PFADNAME` | VARCHAR(150) | ✅ |
| 4 | `ZUGRIFFSEBENE` | VARCHAR(5) | ✅ |

### SQLDOKUVERZ ⚪

**Beschreibung:** Dokumentenverzeichnis — Verzeichnisse/Ordner für Dokumente.
**Datensätze:** 0 | **Spalten:** 11

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `DV_KZ` | VARCHAR(10) | ✅ |
| 2 | `DV_NAME` | VARCHAR(40) | ✅ |
| 3 | `DV_STLW` | VARCHAR(20) |  |
| 4 | `DV_VERZ` | VARCHAR(250) |  |
| 5 | `DV_ZGKZ` | VARCHAR(25) |  |
| 6 | `DV_ANZEIGE` | VARCHAR(3) |  |
| 7 | `DV_MEBENE1` | VARCHAR(30) |  |
| 8 | `DV_MEBENE2` | VARCHAR(30) |  |
| 9 | `DV_MEBENE3` | VARCHAR(30) |  |
| 10 | `DV_MEBENE4` | VARCHAR(30) |  |
| 11 | `DV_MEBENE5` | VARCHAR(30) |  |

---

## Wartung/Service

### SQLWARTGZAEHL ⚪

**Beschreibung:** Wartungs-Zähler — Zähler für wartungsrelevante Kennzahlen.
**Datensätze:** 0 | **Spalten:** 21

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNRZ` | VARCHAR(5) | ✅ |
| 2 | `LFDNRWV` | VARCHAR(5) | ✅ |
| 3 | `VORGANG` | VARCHAR(8) | ✅ |
| 4 | `ADRNR` | VARCHAR(12) | ✅ |
| 5 | `ADRNAME` | VARCHAR(40) |  |
| 6 | `GERAETENR` | VARCHAR(80) | ✅ |
| 7 | `GERAETENAME` | VARCHAR(80) |  |
| 8 | `STICHTAG` | DATE |  |
| 9 | `GRUNDPREISEK` | VARCHAR(10) |  |
| 10 | `GRUNDPREISVK` | VARCHAR(10) |  |
| 11 | `SWKOPEK` | VARCHAR(10) |  |
| 12 | `SWKOPVK` | VARCHAR(10) |  |
| 13 | `COLKOPEK` | VARCHAR(10) |  |
| 14 | `COLKOPVK` | VARCHAR(10) |  |
| 15 | `SWFREI` | VARCHAR(10) |  |
| 16 | `COLFREI` | VARCHAR(10) |  |
| 17 | `ANSPRECHPARTNER` | VARCHAR(40) |  |
| 18 | `TELEFON` | VARCHAR(40) |  |
| 19 | `ABLESEDATUM` | VARCHAR(10) |  |
| 20 | `CLICKSW` | VARCHAR(12) |  |
| 21 | `CLICKCOL` | VARCHAR(12) |  |

### SQLWARTUNG ⚪

**Beschreibung:** Wartungsaufträge — Wartungs- und Serviceverträge für Schließanlagen/Sicherheitstechnik.
**Datensätze:** 0 | **Spalten:** 17

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | VARCHAR(5) | ✅ |
| 2 | `VORGANG` | VARCHAR(8) | ✅ |
| 3 | `ADRESSE` | VARCHAR(12) |  |
| 4 | `ADRESSNAME` | VARCHAR(40) |  |
| 5 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 6 | `STICHTAG` | DATE |  |
| 7 | `ZAHLWEISE` | VARCHAR(1) |  |
| 8 | `BEMERKUNG` | VARCHAR(50) |  |
| 9 | `ABLAUF` | DATE |  |
| 10 | `BEGINN` | DATE |  |
| 11 | `ANSPRECHPARTNER` | VARCHAR(40) |  |
| 12 | `TELEFON` | VARCHAR(40) |  |
| 13 | `EMAIL` | VARCHAR(120) |  |
| 14 | `VERTRAGSART` | VARCHAR(1) |  |
| 15 | `LETZTEABFRAGE` | VARCHAR(10) |  |
| 16 | `RBELEGART` | VARCHAR(2) |  |
| 17 | `FREIGABE` | VARCHAR(1) |  |

### SQLWTLBOOK 🟢

**Beschreibung:** Wartungsbuch — Protokoll durchgeführter Wartungen.
**Datensätze:** 456 | **Spalten:** 21

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `IDNO` | VARCHAR(20) | ✅ |
| 2 | `VALITITYDAY` | DATE | ✅ |
| 3 | `USERNR` | VARCHAR(5) | ✅ |
| 4 | `USERNAME` | VARCHAR(50) | ✅ |
| 5 | `COMEBOOKART` | VARCHAR(3) | ✅ |
| 6 | `COMEDATE` | DATE |  |
| 7 | `COMETIME` | TIME |  |
| 8 | `COMETIMEVALUE` | TIME |  |
| 9 | `GOBOOKART` | VARCHAR(3) | ✅ |
| 10 | `GODATE` | DATE |  |
| 11 | `GOTIME` | TIME |  |
| 12 | `GOTIMEVALUE` | TIME |  |
| 13 | `SUMTIMEMINWOSHIFT` | VARCHAR(5) |  |
| 14 | `TIMEADDSHIFTMIN` | VARCHAR(5) |  |
| 15 | `TIMEADDHOLIDAYMIN` | VARCHAR(5) |  |
| 16 | `SUMTIMEMINWITHSHIFT` | VARCHAR(5) |  |
| 17 | `USERNOMODIFY` | VARCHAR(5) |  |
| 18 | `USERNAMEMODIFY` | VARCHAR(50) |  |
| 19 | `DATEMODIFY` | DATE |  |
| 20 | `TIMEMODIFY` | TIME |  |
| 21 | `BOOKINGART` | VARCHAR(5) |  |

### SQLWTLDATA 🟢

**Beschreibung:** Wartungsdaten — Detaildaten zu Wartungsvorgängen.
**Datensätze:** 756 | **Spalten:** 9

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BUCHGNR` | VARCHAR(20) | ✅ |
| 2 | `BUCHGTAG` | DATE | ✅ |
| 3 | `BUCHGZEIT` | TIME | ✅ |
| 4 | `BUCHGART` | VARCHAR(3) | ✅ |
| 5 | `BUCHGAUF` | VARCHAR(5) |  |
| 6 | `BUCHGKARTE` | VARCHAR(20) |  |
| 7 | `BUCHGMANR` | VARCHAR(5) | ✅ |
| 8 | `BUCHGMANAME` | VARCHAR(50) | ✅ |
| 9 | `VERARBEITET` | VARCHAR(5) |  |

### SQLWTLPLANING ⚪

**Beschreibung:** Wartungsplanung — Zukünftige Wartungstermine.
**Datensätze:** 0 | **Spalten:** 35

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `WTLPID` | VARCHAR(20) | ✅ |
| 2 | `WTLUSERNO` | VARCHAR(3) | ✅ |
| 3 | `WTLPNAME` | VARCHAR(30) | ✅ |
| 4 | `WTLPNO` | VARCHAR(10) | ✅ |
| 5 | `WTPLAN01` | VARCHAR(20) |  |
| 6 | `WTPLAN02` | VARCHAR(20) |  |
| 7 | `WTPLAN03` | VARCHAR(20) |  |
| 8 | `WTPLAN04` | VARCHAR(20) |  |
| 9 | `WTPLAN05` | VARCHAR(20) |  |
| 10 | `WTPLAN06` | VARCHAR(20) |  |
| 11 | `WTPLAN07` | VARCHAR(20) |  |
| 12 | `WTPLAN08` | VARCHAR(20) |  |
| 13 | `WTPLAN09` | VARCHAR(20) |  |
| 14 | `WTPLAN10` | VARCHAR(20) |  |
| 15 | `WTPLAN11` | VARCHAR(20) |  |
| 16 | `WTPLAN12` | VARCHAR(20) |  |
| 17 | `WTPLAN13` | VARCHAR(20) |  |
| 18 | `WTPLAN14` | VARCHAR(20) |  |
| 19 | `WTPLAN15` | VARCHAR(20) |  |
| 20 | `WTPLAN16` | VARCHAR(20) |  |
| 21 | `WTPLAN17` | VARCHAR(20) |  |
| 22 | `WTPLAN18` | VARCHAR(20) |  |
| 23 | `WTPLAN19` | VARCHAR(20) |  |
| 24 | `WTPLAN20` | VARCHAR(20) |  |
| 25 | `WTPLAN21` | VARCHAR(20) |  |
| 26 | `WTPLAN22` | VARCHAR(20) |  |
| 27 | `WTPLAN23` | VARCHAR(20) |  |
| 28 | `WTPLAN24` | VARCHAR(20) |  |
| 29 | `WTPLAN25` | VARCHAR(20) |  |
| 30 | `WTPLAN26` | VARCHAR(20) |  |
| 31 | `WTPLAN27` | VARCHAR(20) |  |
| 32 | `WTPLAN28` | VARCHAR(20) |  |
| 33 | `WTPLAN29` | VARCHAR(20) |  |
| 34 | `WTPLAN30` | VARCHAR(20) |  |
| 35 | `WTPLAN31` | VARCHAR(20) |  |

### SQLWTPLAN 🟡

**Beschreibung:** Wartungspläne — Regelmäßige Wartungspläne.
**Datensätze:** 4 | **Spalten:** 12

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `WTPLAN` | VARCHAR(20) | ✅ |
| 2 | `WTTIMEDAILY` | TIME |  |
| 3 | `WTDAYBEGIN` | TIME |  |
| 4 | `WTDAYEND` | TIME |  |
| 5 | `WTROUNDOFFMIN` | VARCHAR(3) |  |
| 6 | `WTBREAKFAST` | TIME |  |
| 7 | `WTLUNCH` | TIME |  |
| 8 | `WTADDSATURDAY` | FLOAT |  |
| 9 | `WTADDSUNDAY` | FLOAT |  |
| 10 | `WTADDHOLIDAY` | FLOAT |  |
| 11 | `WTSHORTCUT` | VARCHAR(5) |  |
| 12 | `WTCOLOR` | FLOAT |  |

---

## System/Konfiguration

### SQLDRUCKER 🟡

**Beschreibung:** Drucker — Druckerkonfiguration pro Belegart.
**Datensätze:** 10 | **Spalten:** 9

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BELEGART` | VARCHAR(2) | ✅ |
| 2 | `BSNR` | VARCHAR(2) | ✅ |
| 3 | `NAME` | VARCHAR(60) |  |
| 4 | `PAPIERSTEUERUNG` | VARCHAR(1) |  |
| 5 | `DUPLEX` | VARCHAR(1) |  |
| 6 | `SCHACHT1` | VARCHAR(10) |  |
| 7 | `SCHACHT2` | VARCHAR(10) |  |
| 8 | `SCHACHTBU` | VARCHAR(1) |  |
| 9 | `DRUCKDLG` | VARCHAR(1) |  |

### SQLDRUCKFUNKTS ⚪

**Beschreibung:** Druckfunktionen — Erweiterte Druckfunktionen.
**Datensätze:** 0 | **Spalten:** 5

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | INTEGER | ✅ |
| 2 | `BELKATEG` | VARCHAR(3) | ✅ |
| 3 | `TABNR` | VARCHAR(3) |  |
| 4 | `SQLTABNAME` | VARCHAR(30) |  |
| 5 | `TABBEZ` | VARCHAR(50) |  |

### SQLEREIGNISSE ⚪

**Beschreibung:** Ereignisse — Systemereignisse/Workflow-Trigger.
**Datensätze:** 0 | **Spalten:** 8

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZNR` | VARCHAR(10) | ✅ |
| 2 | `DATUM` | DATE |  |
| 3 | `ZEIT` | VARCHAR(8) |  |
| 4 | `ART` | VARCHAR(5) |  |
| 5 | `MA` | VARCHAR(3) |  |
| 6 | `FKT` | VARCHAR(20) |  |
| 7 | `ERRNR` | VARCHAR(10) |  |
| 8 | `BESCHREIBUNG` | VARCHAR(250) |  |

### SQLETIKFORMS 🟡

**Beschreibung:** Etiketten-Formulare — Etikettenformate für Barcode-/Preisauszeichnung.
**Datensätze:** 2 | **Spalten:** 8

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | VARCHAR(3) | ✅ |
| 2 | `BEZEICHNUNG` | VARCHAR(50) | ✅ |
| 3 | `DATENART` | VARCHAR(1) | ✅ |
| 4 | `DRUCKFORMULAR` | VARCHAR(4) | ✅ |
| 5 | `ETIKETTENFORMULAR` | VARCHAR(3) | ✅ |
| 6 | `HOCHQUER` | VARCHAR(1) |  |
| 7 | `DRUCKER` | VARCHAR(80) |  |
| 8 | `DRUCKSCHACHT` | VARCHAR(5) |  |

### SQLETIKPAPIER 🟡

**Beschreibung:** Etiketten-Papier — Papierformate für Etikettendrucker.
**Datensätze:** 2 | **Spalten:** 12

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFDNR` | VARCHAR(3) | ✅ |
| 2 | `BEZEICHNUNG` | VARCHAR(50) | ✅ |
| 3 | `SPALTEN` | VARCHAR(2) | ✅ |
| 4 | `ZEILEN` | VARCHAR(3) | ✅ |
| 5 | `OBERRAND` | VARCHAR(5) | ✅ |
| 6 | `SEITENRAND` | VARCHAR(5) | ✅ |
| 7 | `VERTIKALABSTAND` | VARCHAR(5) | ✅ |
| 8 | `HORIZONTALABSTAND` | VARCHAR(5) | ✅ |
| 9 | `ETIKHOEHE` | VARCHAR(5) | ✅ |
| 10 | `ETIKBREITE` | VARCHAR(5) | ✅ |
| 11 | `SEITENFORMAT` | VARCHAR(30) | ✅ |
| 12 | `DRUCKERNR` | VARCHAR(5) |  |

### SQLETIKSTEUER 🟢

**Beschreibung:** Etiketten-Steuerung — Steuerungsdaten für Etikettendruck.
**Datensätze:** 598 | **Spalten:** 7

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `IDENT` | VARCHAR(15) | ✅ |
| 2 | `MENGE` | VARCHAR(5) | ✅ |
| 3 | `ART` | VARCHAR(1) | ✅ |
| 4 | `AUSFUEHREN` | VARCHAR(1) | ✅ |
| 5 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 6 | `FREITEXT1` | VARCHAR(50) |  |
| 7 | `FREITEXT2` | VARCHAR(50) |  |

### SQLFORMULAR 🟢

**Beschreibung:** Formulare — Formulardefinitionen (Report-Layout, Druckvorlagen).
**Datensätze:** 3,720 | **Spalten:** 20

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LFNDNR` | INTEGER | ✅ |
| 2 | `DEZSTELLEN` | VARCHAR(1) |  |
| 3 | `FORMNR` | VARCHAR(3) | ✅ |
| 4 | `FORMBEZ` | VARCHAR(40) | ✅ |
| 5 | `TABELLE` | VARCHAR(20) | ✅ |
| 6 | `FELDNAME` | VARCHAR(30) | ✅ |
| 7 | `FONTNAME` | VARCHAR(30) | ✅ |
| 8 | `FONTSIZE` | VARCHAR(3) | ✅ |
| 9 | `FONTSTYLE` | VARCHAR(2) | ✅ |
| 10 | `BILDBREITE` | VARCHAR(4) |  |
| 11 | `BILDHOEHE` | VARCHAR(4) |  |
| 12 | `XPOS` | VARCHAR(5) |  |
| 13 | `YPOS` | VARCHAR(5) |  |
| 14 | `FARBE` | VARCHAR(10) |  |
| 15 | `BILDNAME` | VARCHAR(20) |  |
| 16 | `TEXT` | VARCHAR(150) |  |
| 17 | `AUSRICHTG` | VARCHAR(1) |  |
| 18 | `FELDTYP` | VARCHAR(1) |  |
| 19 | `DRUCKBEDINGUNG` | VARCHAR(5) |  |
| 20 | `SUCHIDX01` | VARCHAR(15) |  |

### SQLHLTEMP 🟢

**Beschreibung:** Hilfstabelle temporär — Temporäre Arbeitstabelle (z.B. für Berechnungen).
**Datensätze:** 174 | **Spalten:** 2

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `KDNR` | VARCHAR(6) | ✅ |
| 2 | `UMSATZ` | DOUBLE | ✅ |

### SQLINFO 🟡

**Beschreibung:** System-Informationen — Systemmeldungen, Programmversion.
**Datensätze:** 2 | **Spalten:** 7

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `INFONR` | DOUBLE | ✅ |
| 2 | `DESK01` | VARCHAR(10) |  |
| 3 | `DESK02` | VARCHAR(10) |  |
| 4 | `DESK03` | VARCHAR(10) |  |
| 5 | `DESK04` | VARCHAR(10) |  |
| 6 | `DESK05` | VARCHAR(10) |  |
| 7 | `TEXT` | BLOB |  |

### SQLKONTAKTVOR ⚪

**Beschreibung:** Kontaktvorlagen — Vorlagen für Serienbriefe/Kontaktaktionen.
**Datensätze:** 0 | **Spalten:** 13

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZNR` | VARCHAR(3) | ✅ |
| 2 | `BEZEICHNUNG` | VARCHAR(30) | ✅ |
| 3 | `ART` | VARCHAR(5) |  |
| 4 | `MON` | VARCHAR(5) |  |
| 5 | `DIE` | VARCHAR(5) |  |
| 6 | `MIT` | VARCHAR(5) |  |
| 7 | `DON` | VARCHAR(5) |  |
| 8 | `FRE` | VARCHAR(5) |  |
| 9 | `SAM` | VARCHAR(5) |  |
| 10 | `SON` | VARCHAR(5) |  |
| 11 | `DAT1` | VARCHAR(5) |  |
| 12 | `DAT2` | VARCHAR(5) |  |
| 13 | `DAT3` | VARCHAR(5) |  |

### SQLLIEFERBED ⚪

**Beschreibung:** Lieferbedingungen — Lieferkondition-Stammdaten.
**Datensätze:** 0 | **Spalten:** 3

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `LBEDNR` | VARCHAR(2) | ✅ |
| 2 | `LBEDTEXT` | VARCHAR(50) | ✅ |
| 3 | `LBEDKZ` | VARCHAR(2) | ✅ |

### SQLMANDANT 🟡

**Beschreibung:** Mandant — Mandantenstammdaten (Firmenname, Adresse, USt-ID).
**Datensätze:** 1 | **Spalten:** 76

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `MANDNR` | VARCHAR(3) | ✅ |
| 2 | `VERSION` | VARCHAR(20) | ✅ |
| 3 | `NAME` | VARCHAR(30) | ✅ |
| 4 | `ZNAME` | VARCHAR(30) |  |
| 5 | `PW` | VARCHAR(20) |  |
| 6 | `FIBUART` | VARCHAR(15) | ✅ |
| 7 | `BUCHART` | VARCHAR(1) | ✅ |
| 8 | `SKDEB` | VARCHAR(8) |  |
| 9 | `SKKRED` | VARCHAR(8) |  |
| 10 | `STDERLOES` | VARCHAR(8) |  |
| 11 | `STDKOST` | VARCHAR(8) |  |
| 12 | `STDKASSE` | VARCHAR(8) |  |
| 13 | `STDBANK` | VARCHAR(8) |  |
| 14 | `SKTERLOES` | VARCHAR(8) |  |
| 15 | `SKTKOST` | VARCHAR(8) |  |
| 16 | `GMKPROZ` | VARCHAR(5) |  |
| 17 | `Z01` | VARCHAR(16) |  |
| 18 | `Z02` | VARCHAR(16) |  |
| 19 | `Z03` | VARCHAR(16) |  |
| 20 | `Z04` | VARCHAR(16) |  |
| 21 | `Z05` | VARCHAR(16) |  |
| 22 | `Z06` | VARCHAR(16) |  |
| 23 | `Z07` | VARCHAR(16) |  |
| 24 | `Z08` | VARCHAR(16) |  |
| 25 | `Z09` | VARCHAR(16) |  |
| 26 | `Z10` | VARCHAR(16) |  |
| 27 | `Z11` | VARCHAR(16) |  |
| 28 | `Z12` | VARCHAR(16) |  |
| 29 | `Z13` | VARCHAR(16) |  |
| 30 | `Z14` | VARCHAR(16) |  |
| 31 | `Z15` | VARCHAR(16) |  |
| 32 | `Z16` | VARCHAR(16) |  |
| 33 | `Z17` | VARCHAR(16) |  |
| 34 | `Z18` | VARCHAR(16) |  |
| 35 | `Z19` | VARCHAR(16) |  |
| 36 | `Z20` | VARCHAR(16) |  |
| 37 | `Z21` | VARCHAR(16) |  |
| 38 | `Z22` | VARCHAR(16) |  |
| 39 | `Z23` | VARCHAR(16) |  |
| 40 | `Z24` | VARCHAR(16) |  |
| 41 | `Z25` | VARCHAR(16) |  |
| 42 | `DBDVERZ` | VARCHAR(20) | ✅ |
| 43 | `MWSTK` | VARCHAR(2) |  |
| 44 | `MWSTH` | VARCHAR(2) |  |
| 45 | `MWSTV` | VARCHAR(2) |  |
| 46 | `WAEHRG` | VARCHAR(5) | ✅ |
| 47 | `RBUCHRECH` | INTEGER |  |
| 48 | `Z26` | VARCHAR(16) |  |
| 49 | `SKERLKASSE` | VARCHAR(8) |  |
| 50 | `SKKOSKASSE` | VARCHAR(8) |  |
| 51 | `KTOERLAUSL` | VARCHAR(8) |  |
| 52 | `KTOKOSAUSL` | VARCHAR(8) |  |
| 53 | `KTOERL13B` | VARCHAR(8) |  |
| 54 | `KTOKOS13B` | VARCHAR(8) |  |
| 55 | `STRASSE` | VARCHAR(50) |  |
| 56 | `PLZORT` | VARCHAR(60) |  |
| 57 | `STEUERNR` | VARCHAR(20) |  |
| 58 | `USTID` | VARCHAR(20) |  |
| 59 | `MAILARCHIVAUS` | VARCHAR(100) |  |
| 60 | `MAILARCHIVEIN` | VARCHAR(100) |  |
| 61 | `GMKMATPROZ` | VARCHAR(5) |  |
| 62 | `MWSTH2` | VARCHAR(2) |  |
| 63 | `MWSTV2` | VARCHAR(2) |  |
| 64 | `ENERZPREISIDX` | VARCHAR(8) |  |
| 65 | `ENNORMWERT` | VARCHAR(8) |  |
| 66 | `CUDAYRATE` | VARCHAR(12) |  |
| 67 | `SMTPSERVER` | VARCHAR(50) |  |
| 68 | `SMTPPORT` | VARCHAR(6) |  |
| 69 | `SMTPUSER` | VARCHAR(50) |  |
| 70 | `SMTPPASSW` | VARCHAR(50) |  |
| 71 | `MAILARCHIVKAS` | VARCHAR(100) |  |
| 72 | `MAILARCHIVBST` | VARCHAR(100) |  |
| 73 | `Z27` | VARCHAR(10) |  |
| 74 | `Z28` | VARCHAR(10) |  |
| 75 | `Z29` | VARCHAR(10) |  |
| 76 | `Z30` | VARCHAR(10) |  |

### SQLMETRICS ⚪

**Beschreibung:** Metriken — Systemmetriken/Statistiken.
**Datensätze:** 0 | **Spalten:** 10

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZNR` | VARCHAR(5) | ✅ |
| 2 | `ZIELME` | VARCHAR(5) | ✅ |
| 3 | `ART` | VARCHAR(5) | ✅ |
| 4 | `WERT01` | VARCHAR(20) |  |
| 5 | `WERT02` | VARCHAR(20) |  |
| 6 | `WERT03` | VARCHAR(20) |  |
| 7 | `WERT04` | VARCHAR(20) |  |
| 8 | `WERT05` | VARCHAR(20) |  |
| 9 | `QUELLME` | VARCHAR(5) |  |
| 10 | `WERTEME` | VARCHAR(5) |  |

### SQLPFORMEL 🟡

**Beschreibung:** Preisformeln — Konfiguration von Preisberechnungsformeln.
**Datensätze:** 1 | **Spalten:** 9

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PFNR` | VARCHAR(3) | ✅ |
| 2 | `BESCHREIBG` | VARCHAR(30) | ✅ |
| 3 | `FORMEL1` | VARCHAR(30) | ✅ |
| 4 | `FORMEL2` | VARCHAR(30) | ✅ |
| 5 | `FORMEL3` | VARCHAR(30) | ✅ |
| 6 | `FORMEL4` | VARCHAR(30) | ✅ |
| 7 | `FORMEL5` | VARCHAR(30) | ✅ |
| 8 | `FORMEL6` | VARCHAR(30) |  |
| 9 | `FORMEL7` | VARCHAR(30) |  |

### SQLPRFORMEL ⚪

**Beschreibung:** Preis-Formeldetails — Detailschritte in Preisformeln.
**Datensätze:** 0 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `PREISFNR` | VARCHAR(3) | ✅ |
| 2 | `PREISFZN` | VARCHAR(2) | ✅ |
| 3 | `PREISFBEZ` | VARCHAR(30) |  |
| 4 | `PREISFORMEL` | VARCHAR(40) |  |

### SQLRECMASSES ⚪

**Beschreibung:** Rechenmaße — Maßeinheiten-Umrechnungstabelle.
**Datensätze:** 0 | **Spalten:** 9

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `IDNO` | VARCHAR(20) | ✅ |
| 2 | `LOADDATE` | DATE |  |
| 3 | `USERNO` | VARCHAR(3) | ✅ |
| 4 | `USERNAME` | VARCHAR(40) | ✅ |
| 5 | `CARNO` | VARCHAR(30) |  |
| 6 | `LOAD` | VARCHAR(1) |  |
| 7 | `MASSES` | VARCHAR(12) |  |
| 8 | `DRIVERNO` | VARCHAR(3) |  |
| 9 | `DRIVERNAME` | VARCHAR(40) |  |

### SQLZUGRIFF 🟡

**Beschreibung:** Zugriffsrechte — Benutzerberechtigungen pro Formular/Funktion.
**Datensätze:** 75 | **Spalten:** 23

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ZNR` | VARCHAR(3) | ✅ |
| 2 | `PROGRAMMFUNKTION` | VARCHAR(50) | ✅ |
| 3 | `000` | VARCHAR(1) | ✅ |
| 4 | `001` | VARCHAR(1) | ✅ |
| 5 | `002` | VARCHAR(1) | ✅ |
| 6 | `003` | VARCHAR(1) | ✅ |
| 7 | `004` | VARCHAR(1) | ✅ |
| 8 | `005` | VARCHAR(1) | ✅ |
| 9 | `006` | VARCHAR(1) | ✅ |
| 10 | `007` | VARCHAR(1) | ✅ |
| 11 | `008` | VARCHAR(1) | ✅ |
| 12 | `009` | VARCHAR(1) | ✅ |
| 13 | `010` | VARCHAR(1) | ✅ |
| 14 | `011` | VARCHAR(1) | ✅ |
| 15 | `012` | VARCHAR(1) | ✅ |
| 16 | `013` | VARCHAR(1) | ✅ |
| 17 | `014` | VARCHAR(1) | ✅ |
| 18 | `015` | VARCHAR(1) | ✅ |
| 19 | `016` | VARCHAR(1) | ✅ |
| 20 | `017` | VARCHAR(1) | ✅ |
| 21 | `018` | VARCHAR(1) | ✅ |
| 22 | `019` | VARCHAR(1) | ✅ |
| 23 | `020` | VARCHAR(1) | ✅ |

---

## Bonuswesen

### SQLBON0101 ⚪

**Beschreibung:** Bonus-Tabelle 0101 — Bonus-/Provisionsabrechnung (Typ 01, Variante 01).
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0102 ⚪

**Beschreibung:** Bonus-Tabelle 0102 — Bonus-Konfiguration Variante 02.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0103 ⚪

**Beschreibung:** Bonus-Tabelle 0103 — Bonus-Konfiguration Variante 03.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0104 ⚪

**Beschreibung:** Bonus-Tabelle 0104 — Bonus-Konfiguration Variante 04.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0105 ⚪

**Beschreibung:** Bonus-Tabelle 0105 — Bonus-Konfiguration Variante 05.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0106 ⚪

**Beschreibung:** Bonus-Tabelle 0106 — Bonus-Konfiguration Variante 06.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0107 ⚪

**Beschreibung:** Bonus-Tabelle 0107 — Bonus-Konfiguration Variante 07.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0108 ⚪

**Beschreibung:** Bonus-Tabelle 0108 — Bonus-Konfiguration Variante 08.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0109 ⚪

**Beschreibung:** Bonus-Tabelle 0109 — Bonus-Konfiguration Variante 09.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0110 ⚪

**Beschreibung:** Bonus-Tabelle 0110 — Bonus-Konfiguration Variante 10.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0111 ⚪

**Beschreibung:** Bonus-Tabelle 0111 — Bonus-Konfiguration Variante 11.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0121 ⚪

**Beschreibung:** Bonus-Tabelle 0121 — Bonus-Konfiguration Variante 21.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0122 ⚪

**Beschreibung:** Bonus-Tabelle 0122 — Bonus-Konfiguration Variante 22.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBON0131 ⚪

**Beschreibung:** Bonus-Tabelle 0131 — Bonus-Konfiguration Variante 31.
**Datensätze:** 0 | **Spalten:** 14

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `POS` | INTEGER | ✅ |
| 2 | `ARTIKEL` | VARCHAR(15) |  |
| 3 | `BEZEICHNUNG` | VARCHAR(40) |  |
| 4 | `MENGE` | VARCHAR(12) | ✅ |
| 5 | `EINHEIT` | VARCHAR(5) |  |
| 6 | `NETTOBETRAG` | VARCHAR(12) | ✅ |
| 7 | `HALBEMWST` | VARCHAR(12) | ✅ |
| 8 | `VOLLEMWST` | VARCHAR(12) | ✅ |
| 9 | `BRUTTOBETRAG` | VARCHAR(12) | ✅ |
| 10 | `GESAMT` | VARCHAR(12) |  |
| 11 | `MWSTSCHL` | VARCHAR(1) | ✅ |
| 12 | `DATUM` | VARCHAR(10) |  |
| 13 | `WAEHRUNG` | VARCHAR(5) | ✅ |
| 14 | `PE` | VARCHAR(10) |  |

### SQLBONRAB ⚪

**Beschreibung:** Bonus-Rabatte — Rabatt-Zuordnung für Bonusabrechnungen.
**Datensätze:** 0 | **Spalten:** 4

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `BONNR` | VARCHAR(6) | ✅ |
| 2 | `MITARBEITER` | VARCHAR(3) | ✅ |
| 3 | `RABATT` | VARCHAR(10) | ✅ |
| 4 | `RABATTGRUND` | VARCHAR(40) | ✅ |

---

## Inventur

### SQLINVELK ⚪

**Beschreibung:** Inventur-Einzelkontrolle — Detailprüfungen bei Inventuren.
**Datensätze:** 0 | **Spalten:** 19

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `KDNR` | VARCHAR(6) | ✅ |
| 2 | `INVNR` | VARCHAR(25) | ✅ |
| 3 | `PRUEFID` | VARCHAR(10) | ✅ |
| 4 | `PRUEFDATUM` | VARCHAR(10) |  |
| 5 | `PRUEFER` | VARCHAR(30) |  |
| 6 | `SCHUTZKLASSE` | VARCHAR(10) |  |
| 7 | `SICHT01` | VARCHAR(10) |  |
| 8 | `SICHT02` | VARCHAR(10) |  |
| 9 | `SICHT03` | VARCHAR(10) |  |
| 10 | `SICHT04` | VARCHAR(10) |  |
| 11 | `SICHT05` | VARCHAR(10) |  |
| 12 | `MESSWERT01` | VARCHAR(10) |  |
| 13 | `MESSWERT02` | VARCHAR(10) |  |
| 14 | `MESSWERT03` | VARCHAR(10) |  |
| 15 | `MESSWERT04` | VARCHAR(10) |  |
| 16 | `MESSWERT05` | VARCHAR(10) |  |
| 17 | `INORDNUNG` | VARCHAR(10) |  |
| 18 | `NPRUEF` | VARCHAR(10) |  |
| 19 | `BEMERK` | VARCHAR(100) |  |

### SQLINVENTAR ⚪

**Beschreibung:** Inventar — Inventargegenstände (Anlagevermögen).
**Datensätze:** 0 | **Spalten:** 17

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `KDNR` | VARCHAR(6) | ✅ |
| 2 | `INVNR` | VARCHAR(25) | ✅ |
| 3 | `GART` | VARCHAR(5) |  |
| 4 | `GERAETENR` | VARCHAR(40) |  |
| 5 | `BEZEICHNUNG1` | VARCHAR(40) | ✅ |
| 6 | `BEZEICHNUNG2` | VARCHAR(40) |  |
| 7 | `STANDORT` | VARCHAR(50) |  |
| 8 | `RAUM` | VARCHAR(20) |  |
| 9 | `BAUJAHR` | VARCHAR(10) |  |
| 10 | `AKTDATUM` | VARCHAR(10) |  |
| 11 | `KAUFDATUM` | VARCHAR(10) |  |
| 12 | `KAUFBELEG` | VARCHAR(10) |  |
| 13 | `ANSCHWERT` | VARCHAR(10) |  |
| 14 | `ABSCHRJAHRE` | VARCHAR(10) |  |
| 15 | `ABSCHRWERT` | VARCHAR(10) |  |
| 16 | `KAUFART` | VARCHAR(10) |  |
| 17 | `KDNAME` | VARCHAR(50) |  |

### SQLINVENTUR 🟡

**Beschreibung:** Inventur — Inventurstammdaten (Inventurnummer, Datum, Status).
**Datensätze:** 24 | **Spalten:** 17

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `INVNR` | VARCHAR(13) | ✅ |
| 2 | `NAME` | VARCHAR(40) |  |
| 3 | `INVDATUM` | VARCHAR(10) | ✅ |
| 4 | `LGNR` | VARCHAR(2) | ✅ |
| 5 | `MAERST` | VARCHAR(3) | ✅ |
| 6 | `ARTZLERST` | VARCHAR(3) |  |
| 7 | `LBESTGEZAEHLT` | VARCHAR(1) |  |
| 8 | `AKTZL` | VARCHAR(10) |  |
| 9 | `WAEHRG` | VARCHAR(5) |  |
| 10 | `INVNEU` | VARCHAR(1) |  |
| 11 | `INVEZL` | VARCHAR(1) |  |
| 12 | `INVDZL` | VARCHAR(1) |  |
| 13 | `INVDRU` | VARCHAR(1) |  |
| 14 | `INVEIN` | VARCHAR(1) |  |
| 15 | `INVABS` | VARCHAR(1) |  |
| 16 | `INVEEK` | VARCHAR(1) |  |
| 17 | `WGR` | VARCHAR(5) |  |

---

## Sonstige

### SQLAPSK ⚪

**Beschreibung:** Unklassifizierte Tabelle — Funktion aus Spaltennamen ableitbar.
**Datensätze:** 0 | **Spalten:** 26

| # | Spalte | Datentyp | NOT NULL |
|---|--------|----------|----------|
| 1 | `ARTNR` | VARCHAR(15) | ✅ |
| 2 | `AGNR` | VARCHAR(5) | ✅ |
| 3 | `KZ` | VARCHAR(1) |  |
| 4 | `IDENT` | VARCHAR(15) |  |
| 5 | `KT1` | VARCHAR(40) |  |
| 6 | `TA` | VARCHAR(10) |  |
| 7 | `TS` | VARCHAR(10) |  |
| 8 | `BEMERKG` | VARCHAR(50) |  |
| 9 | `KTEXT1` | VARCHAR(50) |  |
| 10 | `KTEXT2` | VARCHAR(50) |  |
| 11 | `KTEXT3` | VARCHAR(50) |  |
| 12 | `KTEXT4` | VARCHAR(50) |  |
| 13 | `KTEXT5` | VARCHAR(50) |  |
| 14 | `INTKZ` | VARCHAR(5) |  |
| 15 | `MASCHINENNR` | VARCHAR(20) |  |
| 16 | `PROGRAMMNR` | VARCHAR(50) |  |
| 17 | `VORRICHTUNG` | VARCHAR(25) |  |
| 18 | `LAGERABB` | VARCHAR(2) |  |
| 19 | `LAGERZUB` | VARCHAR(2) |  |
| 20 | `SCHNITTSTELLE` | VARCHAR(5) |  |
| 21 | `KOSTST` | VARCHAR(8) |  |
| 22 | `LOHNGR` | VARCHAR(4) |  |
| 23 | `PRUEFPLAN` | VARCHAR(25) |  |
| 24 | `DOKNRVORSCHRIFT` | INTEGER |  |
| 25 | `MESSPLAN` | VARCHAR(25) |  |
| 26 | `FASTMPLAN` | VARCHAR(25) |  |

---
