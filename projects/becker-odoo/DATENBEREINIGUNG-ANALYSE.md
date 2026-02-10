# Datenbereinigung Legacy-DB: Becker Sicherheitstechnik

**Datum:** 10. Februar 2026  
**Zweck:** Identifikation von Bereinigungs-Kandidaten vor Odoo-Migration  
**Datenquelle:** USBackup.gbk (InterBase, Stand 10.02.2026)

---

## 1. Zusammenfassung

| Bereich | Gesamt | Aktiv (2024+) | Bereinigbar | Reduktion |
|---------|--------|---------------|-------------|-----------|
| **Artikel** | 83.121 | 4.620 | ~76.000 | **91%** |
| **Adressen** (D/A/L) | 15.104 | 2.485 | ~8.429 | **56%** |
| **Positionen** | 917.937 | — | historisch | — |
| **Aufträge** | 270.533 | — | historisch | — |

**Kernaussage:** Durch Bereinigung können ~91% der Artikel und ~56% der Adressen vor der Migration entfernt werden. Statt 83.000 Artikel müssen nur ~5.000-8.000 nach Odoo überführt werden.

---

## 2. Artikelstamm (SQLARTIKEL): 83.121 Datensätze

### 2.1 Verteilung nach letzter Verkaufs-/Lagerbewegung

| Letzte Aktivität | Artikel | davon mit Lagerbestand | Stück im Lager | Bewertung |
|-----------------|---------|----------------------|---------------|-----------|
| **2025-2026** (aktiv) | 3.696 | 2.216 | 282.836 | 🟢 Migrieren |
| **2024** | 924 | 403 | 42.759 | 🟢 Migrieren |
| **2023** | 696 | 211 | 21.099 | 🟡 Prüfen (ggf. migrieren) |
| **2022** | 521 | 121 | 36.551 | 🟡 Prüfen |
| **2020-2021** | 1.112 | 220 | 14.333 | 🟠 Nur mit Bestand migrieren |
| **2015-2019** | 2.376 | 343 | 33.689 | 🟠 Nur mit Bestand migrieren |
| **Vor 2015** | 2.112 | 30 | 110 | 🔴 Löschen |
| **NIE bewegt** | **71.684** | 195 | 13.909 | 🔴 Löschen |
| **GESAMT** | **83.121** | **3.739** | **445.286** | |

### 2.2 Die 71.684 "Toten" Artikel im Detail

Diese Artikel hatten **nie** einen Verkauf, eine Lieferung oder eine Lagerbewegung.

| Eigenschaft | Anzahl | Prozent |
|-------------|--------|---------|
| Ohne VK-Preis | 45.261 | 63% |
| Mit VK-Preis (aber nie verkauft) | 26.423 | 37% |
| Status = 0 (aktiv im System) | 71.684 | 100% |

**Anlage-Zeitraum der toten Artikel:**

| Angelegt | Anzahl | Vermutung |
|----------|--------|-----------|
| Vor 2010 | 69.562 | Initialer Katalog-Import bei System-Einführung |
| 2010-2014 | 316 | Einzelanlage, nie genutzt |
| 2015-2019 | 555 | Einzelanlage, nie genutzt |
| 2020+ | 1.251 | Neuere Lieferanten-Imports |

**Fazit:** Die 69.562 Artikel vor 2010 sind mit hoher Wahrscheinlichkeit ein **Bulk-Katalogimport** bei der ERP-Einführung. Sie wurden seitdem nie angefasst.

### 2.3 Marken-Analyse: Aktiv vs. Tot

**Aktive Artikel (2025-2026) — Top 10 Marken:**

| Marke | Aktive Artikel |
|-------|---------------|
| DOM | 188 |
| Master Lock | 149 |
| Fuchs+Sanders | 105 |
| BMH | 85 |
| Wilka | 80 |
| BOHRCRAFT | 75 |
| IKON | 67 |
| Silca | 53 |
| Nordwest | 48 |
| Hoppe | 39 |

**Nie bewegte Artikel — Top 10 Marken:**

| Marke | Tote Artikel |
|-------|-------------|
| DOM | 398 |
| Winkhaus | 163 |
| IKON | 99 |
| Master Lock | 28 |
| STOYEFuchs+Sanders | 27 |
| STOYEBOHRCRAFT | 24 |
| ecos | 22 |
| Salto | 17 |
| STOYEFUCHS | 13 |
| STOYEFACETT | 13 |

**Auffällig:** "STOYE"-Prefix bei toten Artikeln deutet auf einen alten Lieferanten/Katalog-Import hin.

### 2.4 Lagerleichen (Bestand > 0, aber lange nicht bewegt)

| Letzte Bewegung | Artikel mit Bestand | Stück | Handlungsbedarf |
|----------------|--------------------:|------:|-----------------|
| 2015-2019 | 343 | 33.689 | ⚠️ Inventur-Prüfung empfohlen |
| 2020-2021 | 220 | 14.333 | ⚠️ Stichproben-Prüfung |
| NIE bewegt | 195 | 13.909 | ⚠️ Geister-Bestände? |
| Vor 2015 | 30 | 110 | 🔴 Abschreiben |

**→ 788 Artikel mit zusammen 62.041 Stück** zeigen Lagerbestand, wurden aber seit >4 Jahren nicht bewegt. Empfehlung: **physische Inventur** dieser Positionen vor Migration.

---

## 3. Adressstamm (SQLADRESSE): 34.075 Datensätze

### 3.1 Verteilung nach Adressart

| Art | Bedeutung | Anzahl |
|-----|-----------|--------|
| S | Sachkonto/System | 17.335 |
| A | Adresse (Allgemein) | 13.232 |
| D | Debitor (Kunde) | 1.524 |
| P | Person | 674 |
| C | Kontakt/Auftraggeber | 423 |
| L | Lieferant | 348 |
| B | Bank | 245 |
| Sonstige | F, E, Z, M, W, N, I | 294 |

**Für Odoo-Migration relevant:** Primär D (Debitoren), L (Lieferanten), A (Allgemein) = **15.104 Adressen**

### 3.2 Adressen nach letztem Auftrag (nur D/A/L)

| Letzte Aktivität | Adressen | davon mit Saldo ≠ 0 | Bewertung |
|-----------------|----------|---------------------|-----------|
| **2025-2026** (aktiv) | 1.690 | 1.656 | 🟢 Migrieren |
| **2024** | 795 | 772 | 🟢 Migrieren |
| **2023** | 725 | 708 | 🟡 Migrieren (recent) |
| **2022** | 859 | 840 | 🟡 Prüfen |
| **2020-2021** | 2.606 | 2.545 | 🟠 Nur mit offenem Saldo |
| **2015-2019** | 3.897 | 3.781 | 🔴 Nur mit offenem Saldo |
| **Vor 2015** | 814 | 581 | 🔴 Löschen (Saldo prüfen) |
| **Kein Auftrag** | 3.718 | 1.873 | 🔴 Löschen (Saldo prüfen) |

### 3.3 Empfehlung Adressen

| Aktion | Adressen | Kriterium |
|--------|----------|-----------|
| 🟢 Direkt migrieren | ~3.210 | Letzter Auftrag 2024+ |
| 🟡 Mit Prüfung migrieren | ~1.584 | 2022-2023, aktiver Saldo |
| 🟠 Nur Saldo migrieren | ~2.000 | 2015-2021, offene Posten |
| 🔴 Nicht migrieren | ~8.310 | Kein Auftrag oder >5 Jahre alt, Saldo 0 |

---

## 4. Weitere Bereinigungs-Kandidaten

### 4.1 Leere Tabellen (komplett löschen)

15 **Bonus-Tabellen** (SQLBON01xx) mit 0 Datensätzen — Bonuswesen wurde nie genutzt.

| Tabelle | Rows |
|---------|------|
| SQLBON0101 - SQLBON0111 | 0 |
| SQLBON0121, SQLBON0122, SQLBON0131 | 0 |
| SQLBONRAB | 0 |

Weitere leere Tabellen: SQLFBUCH, SQLZAHLUNG, SQLMAHNUNG, SQLPROJECT, SQLWTLPLANING, SQLSEPAS, SQLORDERLIST

### 4.2 Historische Bewegungsdaten

| Tabelle | Rows | Empfehlung |
|---------|------|-----------|
| SQLPOSITION | 917.937 | Nur offene Positionen migrieren |
| SQLPOSKALK | 983.408 | Nicht migrieren (Kalkulationshistorie) |
| SQLARTSTAT | 467.685 | Nicht migrieren (Statistik neu aufbauen) |
| SQLRBUCH | 175.389 | Nur offene Posten migrieren |
| SQLBUCHDATEN | 138.326 | Saldenvortrag, nicht einzeln migrieren |

---

## 5. Migrations-Empfehlung: Reihenfolge & Umfang

### Phase 1: Stammdaten (bereinigt)
1. **Artikel:** ~5.000-8.000 (aktiv 2022+ ODER mit Lagerbestand)
2. **Adressen/Kunden:** ~3.500 (aktiv 2024+ oder offener Saldo)
3. **Lieferanten:** ~200 (aktive Lieferanten)
4. **Ansprechpartner:** ~5.000 (zu migrierten Adressen)
5. **Warengruppen:** 58 → Odoo Produkt-Kategorien

### Phase 2: Offene Vorgänge
6. **Offene Posten:** Aus SQLRBUCH filtern
7. **Lagerbestände:** Aktuelle Inventur-Werte
8. **Offene Aufträge:** Laufende Vorgänge

### Phase 3: Historische Daten (optional)
9. **Auftragshistorie:** Für CRM/Analyse, nicht für operativen Betrieb
10. **Umsatzstatistik:** Aggregiert, nicht einzeln

---

## 6. Voraussetzungen vor Migration

- [ ] **Physische Inventur** der 788 Lagerleichen (Bestand >0, keine Bewegung >4 Jahre)
- [ ] **Offene-Posten-Abstimmung** mit Buchhaltung
- [ ] **Lieferanten-Prüfung** mit Einkauf (welche sind noch aktiv?)
- [ ] **Artikelstamm-Review** mit Vertrieb (Whitelist der migrierbaren Artikel)
- [ ] **Becker-Team Freigabe** für Löschkandidaten

---

*Erstellt: 2026-02-10 von Heimdall*  
*Datenstand: USBackup.gbk vom 10.02.2026, 15:01 Uhr*
