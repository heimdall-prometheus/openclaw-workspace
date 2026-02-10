# Kundenanalyse Legacy-DB: Becker Sicherheitstechnik

**Datum:** 10. Februar 2026  
**Datenquelle:** USBackup.gbk (InterBase, Stand 10.02.2026)

---

## 1. Überblick

| Kennzahl | Wert |
|----------|------|
| **Adressen gesamt** | 34.075 |
| **davon Debitoren (D)** | 1.524 |
| **davon Allgemein (A)** | 13.232 |
| **davon Lieferanten (L)** | 348 |
| **Ansprechpartner (SQLPERSON)** | 20.851 |
| **Kunden mit Umsatz > 0** | 12.789 |
| **Kunden mit Auftrag 2024+** | 2.370 |
| **Kunden ohne jeden Auftrag** | 3.559 |

---

## 2. Kunden nach Umsatzklasse (D + A)

| Umsatzklasse | Kunden | Umsatz lfd. Jahr | Offener Saldo |
|-------------|--------|-------------------|---------------|
| **> 50.000 €** | 194 | 30.224.738 € | 27.513.136 € |
| **10.000 - 50.000 €** | 400 | 8.921.933 € | 7.768.650 € |
| **5.000 - 10.000 €** | 296 | 2.146.079 € | 1.717.341 € |
| **1.000 - 5.000 €** | 984 | 2.232.646 € | 1.829.169 € |
| **1 - 1.000 €** | 10.915 | 1.447.957 € | 1.143.127 € |
| **Kein Umsatz** | 1.967 | -2.410 € | -57.277 € |
| **GESAMT** | **14.756** | **44.970.943 €** | **39.914.146 €** |

**Pareto-Effekt:** Die Top 594 Kunden (4%) machen 39,1 Mio € Umsatz (87%). Die 10.915 Kleinkunden (74%) machen nur 1,4 Mio € (3%).

---

## 3. Kunden nach letzter Aktivität × Umsatz

| Aktivität | Umsatz >10k | 1k-10k | 1-1000 | Null | **Total** |
|-----------|------------|--------|--------|------|-----------|
| **Aktiv (2024+)** | 381 | 558 | 1.371 | 58 | **2.370** |
| **Recent (2022-23)** | 59 | 192 | 1.278 | 38 | **1.569** |
| **Alt (2020-21)** | 35 | 131 | 2.358 | 62 | **2.587** |
| **Inaktiv (<2020)** | 64 | 290 | 4.170 | 146 | **4.671** |
| **Kein Auftrag** | 55 | 107 | 1.733 | 1.664 | **3.559** |

### Bereinigungs-Empfehlung

| Aktion | Kunden | Kriterium |
|--------|--------|-----------|
| 🟢 **Migrieren** | ~2.370 | Aktiv 2024+ |
| 🟡 **Migrieren (prüfen)** | ~1.569 | Letzter Auftrag 2022-2023 |
| 🟠 **Nur mit offenem Saldo** | ~2.587 | 2020-2021, offene Posten |
| 🔴 **Nicht migrieren** | ~8.230 | Inaktiv <2020 + ohne Auftrag + Saldo 0 |

---

## 4. Regionale Verteilung (Top 15 PLZ-Gebiete)

| PLZ | Region | Kunden | Umsatz lfd. Jahr |
|-----|--------|--------|-----------------|
| **06** | **Halle/Dessau** | **4.933** | **23.687.077 €** |
| 10 | Berlin (Mitte) | 201 | 3.255.064 € |
| 04 | Leipzig | 373 | 2.405.832 € |
| 39 | Magdeburg | 346 | 1.803.833 € |
| 13 | Berlin (Nord) | 131 | 998.893 € |
| 14 | Potsdam | 253 | 896.878 € |
| 15 | Frankfurt/Oder | 114 | 888.694 € |
| 38 | Braunschweig | 150 | 792.673 € |
| 07 | Gera/Jena | 93 | 637.204 € |
| 12 | Berlin (Süd) | 179 | 614.455 € |
| 01 | Dresden | 190 | 554.648 € |
| 21 | Lüneburg/Hamburg | 141 | 531.263 € |
| 40 | Düsseldorf | 108 | 507.009 € |
| 85 | München Umland | 118 | 457.081 € |
| 22 | Hamburg | 190 | 437.060 € |

**Kerngebiet:** PLZ 06 (Dessau/Halle) = **53% des Umsatzes** mit 33% der Kunden. Klarer regionaler Schwerpunkt Sachsen-Anhalt, mit Ausstrahlung nach Berlin, Leipzig, Magdeburg.

---

## 5. Top 20 Kunden nach Umsatz

| # | Kunde | Ort | Umsatz lfd. Jahr |
|---|-------|-----|-----------------|
| 1 | Zentrale Ausländerbehörde Brandenburg | Eisenhüttenstadt | 676.325 € |
| 2 | BARVERKAUF (Laufkunden) | — | 672.780 € |
| 3 | Wohnungsgenossenschaft Dessau eG | Dessau-Roßlau | 605.928 € |
| 4 | Stiftung Bauhaus Dessau | Dessau-Roßlau | 540.745 € |
| 5 | Saalfelder Str. 31 Leipzig (kfm. GF) | Leipzig | 533.887 € |
| 6 | Landesbetrieb Bau- und Liegenschaftsmgmt SA | Halberstadt | 511.225 € |
| 7 | Stadt Dessau-Roßlau (Gebäudemanagement) | Dessau-Roßlau | 469.638 € |
| 8 | SimonsVoss Technologies GmbH | Unterföhring | 429.416 € |
| 9 | Feldbinder Spezialfahrzeugwerke GmbH | Lutherstadt Wittenberg | 412.053 € |
| 10 | DB Fahrzeuginstandhaltung GmbH | Berlin | 409.784 € |
| 11 | Feldbinder Spezialfahrzeugwerke GmbH | Winsen (Luhe) | 405.610 € |
| 12 | Zentrale Beschaffungsstelle Justizvollzug SA | Halle (Saale) | 404.791 € |
| 13 | JVA Halle | Halle (Saale) | 404.791 € |
| 14 | Peik Rast Schlüsseldienst | Dessau-Roßlau | 399.219 € |
| 15 | Flughafen Leipzig/Halle GmbH | Leipzig | 389.282 € |
| 16 | Johannesstift Diakonie gAG | Berlin | 388.000 € |
| 17 | DB Fahrzeuginstandhaltung GmbH (2. Standort) | Berlin | 376.737 € |
| 18 | LB Bau- und Liegenschaftsmgmt SA | Magdeburg | 343.959 € |
| 19 | POLY-CHEM GmbH (Chemiepark) | Bitterfeld-Wolfen | 294.623 € |
| 20 | Diakonieverein e.V. | Bitterfeld-Wolfen | 288.405 € |

**Kundenprofil:** Starker B2B/B2G-Fokus — Öffentliche Hand (Justiz, Bauämter, Behörden), Wohnungsgesellschaften, Industrie (Feldbinder, Chemiepark), Dienstleister. Kein typisches B2C-Geschäft.

---

## 6. Vertriebsmitarbeiter-Zuordnung

| MA-Nr | Name | Kunden | Umsatz lfd. Jahr | Offener Saldo |
|-------|------|--------|-------------------|---------------|
| 007 | Dennis Krüger | 879 | 10.314.317 € | 10.303.775 € |
| 002 | Steffi Weber-Bethge | 2.110 | 6.442.519 € | 5.358.273 € |
| 799 | *(unbekannt)* | 239 | 6.022.925 € | 4.796.733 € |
| 001 | Michael Richter | 885 | 5.942.356 € | 4.733.741 € |
| 0799 | *(unbekannt)* | 132 | 3.666.705 € | 2.882.488 € |
| 005 | Andreas Bethge | 2.720 | 2.463.057 € | 2.257.534 € |
| 004 | Uwe Becker | 973 | 1.879.787 € | 1.655.646 € |
| 009 | Roswitha Müller | 90 | 1.274.172 € | 1.274.172 € |
| 008 | Thomas Lange | 469 | 1.141.382 € | 1.141.382 € |
| 017 | Nicole Kern | 63 | 1.101.257 € | 1.101.257 € |
| 010 | Marko Schernes | 3.704 | 1.042.811 € | 1.042.811 € |

**Auffällig:** Vertreter 799/0799 haben zusammen 9,7 Mio € Umsatz aber keinen zugeordneten Namen → klären mit Becker.

---

## 7. Kontaktdaten-Qualität

| Feld | Vorhanden | % von 14.756 |
|------|-----------|-------------|
| Telefon | 5.081 | 34% |
| Email | 4.157 | 28% |
| Fax | 2.679 | 18% |
| Mobilnummer | 988 | 7% |
| Website | 900 | 6% |
| USt-IdNr. | 335 | 2% |
| IBAN | 738 | 5% |

**→ 72% der Kunden haben KEINE Email-Adresse.** Für Odoo (Email-basierte Kommunikation) ein Problem — Empfehlung: Email-Adressen-Kampagne nach Migration starten.

---

## 8. Ansprechpartner (SQLPERSON)

| Kundengruppe | Kunden | Ansprechpartner | Ø pro Kunde |
|-------------|--------|-----------------|-------------|
| Aktiv (2024+) | 2.370 | 949 | 0,4 |
| Recent (2022-23) | 1.569 | 216 | 0,1 |
| Inaktiv (<2022) | 7.258 | 614 | 0,1 |
| Kein Auftrag | 3.559 | 350 | 0,1 |

**Nur 2.129 Ansprechpartner** für 14.756 Kunden → dünn gepflegt. Viele Kontaktinfos stehen vermutlich in NAME2 der Adresse statt in SQLPERSON.

---

## 9. Duplikaten-Analyse

**331 potenzielle Duplikate** gefunden (gleicher Name + PLZ, mehrfach angelegt).

**Beispiele:**

| Name | PLZ | Ort | Anzahl |
|------|-----|-----|--------|
| Diringer & Scheidel | 68199 | Mannheim | 4x |
| SV Hotel Stuttgart Airport GmbH | 40233 | Düsseldorf | 4x |
| Johannesstift Diakonie gAG | 13629 | Berlin | 3x |
| Stadt Dessau-Roßlau | 06844 | Dessau-Roßlau | 3x |
| Ärzthaus Gutenbergstraße | 06842 | Dessau-Roßlau | 3x |
| Büroforum und Hotels Halle Dessau | 06844 | Dessau-Roßlau | 3x |

**→ Vor Migration:** Duplikate zusammenführen (Aufträge/Saldo auf einen Datensatz konsolidieren).

---

## 10. Migrations-Empfehlung Kunden

### Sofort migrieren (~3.500)
- Alle Kunden mit Auftrag 2024+
- Alle Kunden mit offenem Saldo > 0 und Auftrag 2022+
- Alle aktiven Lieferanten

### Mit Prüfung migrieren (~1.500)
- Kunden 2022-2023 ohne offenen Saldo (ggf. als Archiv-Kontakt)
- Kunden mit hohem historischem Umsatz (>10k) auch wenn inaktiv

### Nicht migrieren (~9.700)
- Kunden ohne Auftrag
- Kunden mit letztem Auftrag vor 2020 UND Saldo = 0
- Alle Sachkonten (S) und System-Adressen

### Bereinigung vor Migration
- [ ] 331 Duplikate auflösen (zusammenführen)
- [ ] Vertreter 799/0799 zuordnen
- [ ] Email-Adressen ergänzen (72% fehlen)
- [ ] USt-IdNr. für B2B-Kunden nachpflegen

---

*Erstellt: 2026-02-10 von Heimdall*  
*Datenstand: USBackup.gbk vom 10.02.2026, 15:01 Uhr*
