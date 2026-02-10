# Legacy ERP Datenbank-Analyse: Becker Sicherheitstechnik

**Quelle:** `USBackup.gbk` (1,1 GB Interbase Backup)  
**Original-Pfad:** `F:\Programme\uswBS\DBMD01\USDB.GDB`  
**Backup erstellt:** 10. Feb 2026, 15:01 Uhr  
**ERP-System:** uswBS (vermutlich us-wärmetechnik / Branchensoftware)  
**Datenbank:** Embarcadero InterBase (transportables Backup, Version 6)  
**Analyse:** 10. Feb 2026 (Restore via Firebird 4.0 nach Mapping-Patch)

---

## 📊 Überblick

| Kennzahl | Wert |
|----------|------|
| **Tabellen gesamt** | 378 (davon 151 SQL-Datentabellen) |
| **Aufträge/Belege** | 270.533 |
| **Positionen** | 917.937 |
| **Artikel/Produkte** | 83.121 |
| **Adressen** | 34.075 |
| **Kontaktpersonen** | 20.851 |
| **Buchungssätze** | 175.389 |
| **Buchdaten** | 138.326 |
| **Shop-Bestellungen** | 18.085 |
| **Lager-Einträge** | 7.553 |
| **Mitarbeiter** | 20 |
| **Daten seit** | 2010 (April) |

---

## 💰 Umsatzentwicklung (nur Ausgangsrechnungen: SR, TR, SW, SH, BR, KR)

| Jahr | Belege | Netto (€) | Brutto (€) |
|------|--------|-----------|------------|
| **2026** (bis Feb) | 1.486 | 391.155 | 464.236 |
| **2025** | 13.403 | 4.045.447 | 4.789.962 |
| **2024** | 11.170 | 3.952.364 | 4.675.435 |
| **2023** | 10.323 | 3.776.229 | 4.453.188 |
| **2022** | 8.820 | 2.905.463 | 3.405.197 |
| **2021** | 7.215 | 2.431.704 | 2.855.231 |
| **2020** | 7.288 | 2.816.442 | 3.285.241 |
| **2019** | 7.037 | 2.114.266 | 2.483.823 |
| **2018** | 6.862 | 1.822.478 | 2.163.494 |
| **2017** | 7.360 | 1.716.142 | 2.028.163 |
| **2016** | 6.645 | 1.452.013 | 1.728.048 |
| **2015** | 5.134 | 1.321.696 | 1.537.468 |
| **2014** | 4.464 | 1.127.697 | 1.338.885 |
| **2013** | 4.283 | 819.575 | 966.504 |
| **2012** | 4.160 | 863.020 | 1.022.093 |
| **2011** | 3.839 | 813.620 | 961.428 |

**Trend:** Stetiges Wachstum von ~960k€ (2011) auf ~4,8M€ (2025) = **5x Wachstum in 14 Jahren** 📈

---

## 📋 Belegarten (Dokumenttypen)

### Umsatzrelevant (Ausgangsbelege)
| Code | Bezeichnung | Anzahl |
|------|-------------|--------|
| LS | Lieferschein normal | 34.426 |
| SR | Sofortrechnung Ausgang | 25.820 |
| TR | Teilrechnung Ausgang | 29.065 |
| BR | Barrechnung Ausgang | 21.617 |
| SH | Shopware Rechnung | 19.190 |
| LI | Lieferschein normal | 14.056 |
| AB | Auftragsbestätigung | 14.031 |
| AN | Angebot | 10.103 |
| SW | Sofortrechnung Ausg. WTB | 8.500 |
| KR | Kartenrechnung | 5.834 |

### Eingangsbelege
| Code | Bezeichnung | Anzahl |
|------|-------------|--------|
| ER | Eingangsrechnung | 34.099 |
| EL | Eingangs-Lieferschein | 10.386 |
| BP | Bestellung mit Preis | 30.656 |
| BS | Bestellung ohne Preis | 4.195 |

### Shop-Integration
| Code | Bezeichnung | Anzahl |
|------|-------------|--------|
| SH | Shopware Rechnung | 19.190 |
| SB | Shopware Auftragsbestätigung | 59 |
| SF | Shopware Fehler-Rechnung | 7 |
| AS | Angebot Shop | 164 |

---

## 👥 Adress-Typen

| Code | Vermutete Bedeutung | Anzahl |
|------|---------------------|--------|
| S | Sachkonto / System | 17.335 |
| A | Adresse (Allgemein) | 13.232 |
| D | Debitor (Kunde) | 1.524 |
| P | Person | 674 |
| C | Auftraggeber/Kontakt | 423 |
| L | Lieferant | 348 |
| B | Bank | 245 |
| F | Filiale | 136 |
| E | Eigentümer | 98 |

---

## 👨‍💼 Mitarbeiter (20 aktiv im System)

| Nr | Name | Email | Umsatz lfd. Jahr |
|----|------|-------|-----------------|
| 001 | Michael Richter | m.richter@becker-sicherheit.de | 10.698.893 € |
| 005 | Andreas Bethge | a.bethge@becker-sicherheit.de | 6.877.253 € |
| 002 | Steffi Weber-Bethge | s.weber@becker-sicherheit.de | 1.383.627 € |

*(Top 3 gezeigt, 17 weitere im System)*

---

## 🏭 Tabellen-Übersicht nach Kategorie

### Stammdaten
| Tabelle | Rows | Beschreibung |
|---------|------|-------------|
| SQLARTIKEL | 83.121 | Artikelstamm (Schlösser, Zylinder, etc.) |
| SQLADRESSE | 34.075 | Kunden, Lieferanten, Kontakte |
| SQLPERSON | 20.851 | Ansprechpartner |
| SQLLAGER | 7.553 | Lagerbestände |
| SQLLIEFERANT | 448 | Lieferantenkonditionen |
| SQLWGR | 58 | Warengruppen |
| SQLMITARB | 20 | Mitarbeiter |

### Bewegungsdaten
| Tabelle | Rows | Beschreibung |
|---------|------|-------------|
| SQLPOSKALK | 983.408 | Positionskalkulationen |
| SQLPOSITION | 917.937 | Auftrags-/Belegpositionen |
| SQLARTSTAT | 467.685 | Artikelstatistik |
| SQLAUFTRAG | 270.533 | Aufträge/Belege (Kopfdaten) |
| SQLRBUCH | 175.389 | Rechnungsbuch |
| SQLBUCHDATEN | 138.326 | Buchungssätze |
| SQLARTKSPREIS | 50.100 | Artikel-Kundenspezialpreise |
| SQLSHOPORDERS | 18.085 | Shop-Bestellungen |

### Weitere
| Tabelle | Rows | Beschreibung |
|---------|------|-------------|
| SQLWTLDATA | 756 | Arbeitszeit-Daten |
| SQLWTLBOOK | 456 | Arbeitszeitbuchungen |
| SQLBELEGART | 88 | Belegarten-Definition |
| SQLARTIKELKALKULATION | 72 | Artikelkalkulationen |
| SQLKASSEHIST | 47 | Kassenhistorie |
| SQLSERIENNR | 35 | Seriennummern |

---

## 🔑 Artikel-Beispiele (Kerngeschäft: Sicherheitstechnik)

| ArtikelNr | Bezeichnung | VKP0 (€) | Marke |
|-----------|-------------|-----------|-------|
| +Cliq-531,E1/E1 | IKON Doppelzylinder +CLIQ Z531 | 601,00 | IKON |
| +Cliq-531,E1/M | IKON Doppelzylinder +CLIQ Z531 V=E1/M | 500,70 | IKON |
| +Cliq-531,M/M | IKON Doppelzylinder +CLIQ .531 V=M/M | 149,80 | IKON |
| +Cliq-532,E1 | IKON Halbzylinder +CLIQ Z53 E1 | 447,70 | IKON |

**Marken im System:** IKON, DOM, Hoppe, Fuhr, GSG, HEWI u.a.

---

## 🔗 Relevanz für Odoo-Migration

### Daten-Volumina für Import
1. **Artikelstamm:** 83.121 Artikel → Odoo Produkte
2. **Kundenstamm:** ~1.524 Debitoren + ~13.232 allgemeine Adressen → Odoo Kontakte
3. **Lieferanten:** 348 Lieferanten → Odoo Kontakte (Lieferanten-Flag)
4. **Offene Posten:** Aus SQLRBUCH filtern (175.389 Buchungen)
5. **Lagerbestände:** 7.553 Positionen → Odoo Lager
6. **Shopware-Integration:** 18.085 bestehende Shop-Bestellungen

### Besonderheiten
- **Encoding:** Windows-1252 (Umlaute als `ö` → `\xf6` etc.)
- **Belegarten-System:** 88 verschiedene Dokumenttypen → Mapping zu Odoo nötig
- **Artikelpreise:** 4 VK-Preislisten (VKP0-VKP3) + kundenspezifische Preise (50.100 Einträge)
- **Rabattstaffeln:** Rabattgruppen-System vorhanden
- **Warengruppen:** 58 Gruppen (DOM, IKON, Hoppe, Fuhr, GSG, HEWI...)
- **BDE/Zeiterfassung:** Arbeitszeitbuchungen vorhanden (SQLWTL*)
- **Kassensystem:** Kassenbuchungen + Barverkauf integriert

### Migrations-Prioritäten
1. ⚡ Artikelstamm + Preislisten
2. ⚡ Kundenstamm + Ansprechpartner
3. ⚡ Offene Posten (Debitoren + Kreditoren)
4. ⚡ Lagerbestände (Inventur-Stand)
5. 📋 Historische Aufträge (optional, für Analyse)
6. 📋 Buchungsdaten (optional, ggf. nur Salden)

---

## 🛠️ Technische Details

### Zugriff auf die restaurierte DB
```bash
# Firebird 4.0 Container starten
sudo docker run --rm -d --name fb-becker \
  -v /tmp/becker-db:/firebird/data \
  -e ISC_PASSWORD=masterkey \
  -p 3050:3050 \
  jacobalberty/firebird:4.0

# SQL-Abfragen
echo "SELECT * FROM SQLARTIKEL WHERE ARTIKELNR = '...';" | \
  sudo docker exec -i fb-becker /usr/local/firebird/bin/isql \
  -user SYSDBA -password masterkey localhost:/firebird/data/USDB.fdb

# Oder interaktiv
sudo docker exec -it fb-becker /usr/local/firebird/bin/isql \
  -user SYSDBA -password masterkey localhost:/firebird/data/USDB.fdb
```

### Restore-Prozess (reproduzierbar)
1. Mapping-Sektion aus dem gbk entfernen (Interbase→Firebird Inkompatibilität)
2. `gbak -c` mit Firebird 4.0 Docker Image
3. Restore: ~68 Sekunden, 1,4 GB Datenbank

---

*Erstellt: 2026-02-10 von Heimdall*
