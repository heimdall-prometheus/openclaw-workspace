# mein-schluessel.de — WCAG 2.2 AA Audit-Plan

## 📋 Rechtlicher Hintergrund
- **BFSG** (Barrierefreiheitsstärkungsgesetz) gilt seit **28.06.2025** für E-Commerce
- **Standard:** WCAG 2.2 Level AA
- **Pflicht für:** Alle Online-Shops (B2C), unabhängig von Unternehmensgröße
- **Bußgeld:** Bis 100.000 € bei Verstößen
- **mein-schluessel.de Status:** Noch nicht geprüft → Audit dringend nötig

## 🔍 Phase 1: Automatisierter Audit (1-2h)

### Tools
| Tool | Was es prüft | Wie |
|------|-------------|-----|
| **axe DevTools** | ~57 WCAG-Regeln automatisch | Browser Extension auf Key-Pages |
| **Lighthouse Accessibility** | Score 0-100 + Issues | Chrome DevTools |
| **WAVE** | Visuelle Overlay der Probleme | wave.webaim.org |
| **Pa11y** | CLI-basiert, CI-integrierbar | `pa11y https://www.mein-schluessel.de` |

### Zu prüfende Seiten (Priorität)
1. **Startseite** — erster Eindruck, Navigation
2. **Kategorieseite** (z.B. Schließanlagen)
3. **Produktdetailseite** (z.B. SimonsVoss MobileKey)
4. **Warenkorb**
5. **Checkout** (Registrierung → Bezahlung → Bestätigung)
6. **Suche + Suchergebnisse**
7. **Kontakt / Impressum**
8. **Konfigurator** (Schließanlagen — komplex!)

### Automatisch prüfbare Kriterien (~30% der WCAG)
- Farbkontraste (4.5:1 Text, 3:1 große Text/UI)
- Alt-Texte für Bilder
- Formular-Labels
- Heading-Hierarchie (h1 → h2 → h3)
- ARIA-Attribute korrekt
- Link-Texte aussagekräftig (nicht "hier klicken")
- Fokus-Reihenfolge (Tab-Navigation)
- Sprache im HTML-Tag

## 🖐️ Phase 2: Manueller Audit (4-6h)

### Tastatur-Navigation (WCAG 2.1.1, 2.1.2)
- [ ] Alle interaktiven Elemente per Tab erreichbar?
- [ ] Fokus sichtbar? (kein `outline: none`!)
- [ ] Mega-Menu per Tastatur bedienbar?
- [ ] Konfigurator per Tastatur nutzbar?
- [ ] Modal/Overlay: Fokus-Trap korrekt?
- [ ] Skip-Link vorhanden? ("Zum Inhalt springen")

### Screenreader-Test (WCAG 1.3.1, 4.1.2)
- [ ] Seitenstruktur: Landmarks (header, nav, main, footer)
- [ ] Produktbilder: Alt-Texte beschreiben das Produkt
- [ ] Preis-Darstellung: Screenreader liest korrekt vor
- [ ] Warenkorb-Updates: Live-Region (aria-live)
- [ ] Fehlermeldungen: Programmatisch zugeordnet

### Formulare (WCAG 1.3.1, 3.3.1-3.3.4)
- [ ] Alle Inputs haben Labels (nicht nur Placeholder!)
- [ ] Pflichtfelder gekennzeichnet (aria-required)
- [ ] Fehlermeldungen spezifisch + bei Element
- [ ] Checkout: Fehlerkorrektur möglich vor Absenden

### Medien & Inhalte
- [ ] Videos: Untertitel vorhanden?
- [ ] PDFs (Datenblätter, Anleitungen): Barrierefrei?
- [ ] Bilder mit Text: Alternative vorhanden?

## 📊 Phase 3: Report & Priorisierung (2h)

### Report-Struktur
```
Pro Issue:
- WCAG-Kriterium (z.B. 1.4.3 Kontrast)
- Schweregrad: Kritisch / Hoch / Mittel / Niedrig
- Betroffene Seiten
- Screenshot / Code-Snippet
- Lösungsvorschlag
- Aufwand (S/M/L)
```

### Priorisierung
1. **Kritisch** — Checkout/Warenkorb nicht nutzbar → sofort
2. **Hoch** — Navigation, Suche, Produktseiten → Sprint 1
3. **Mittel** — Kontrastprobleme, fehlende Alt-Texte → Sprint 2
4. **Niedrig** — Nice-to-have, Best Practices → Backlog

## 🛠️ Phase 4: Umsetzungs-Workflow (noch zu definieren)

### Offene Fragen
- **Theme-Zugriff:** Wie kommen wir ans Shopware Theme? (Deployer, Git Repo?)
- **Custom Plugins:** Eriks eigene Plugins → brauchen eigenen A11y-Check
- **Konfigurator:** Wahrscheinlich größter Aufwand — komplex, interaktiv
- **Shopware Updates:** Bringt SW 6.6+ eigene A11y-Verbesserungen mit?

### Mögliche Ansätze
| Ansatz | Pro | Contra |
|--------|-----|--------|
| Theme-Anpassungen (SCSS/Twig) | Volle Kontrolle | Aufwändig, Update-Konflikte |
| Shopware A11y Plugin | Schnell, Standardlösung | Evtl. nicht ausreichend |
| Overlay-Tool (z.B. UserWay) | Sofort live | Gilt NICHT als BFSG-konform! |
| Kombination Theme + Plugin | Best of both | Mittlerer Aufwand |

⚠️ **WARNUNG:** Overlay-Tools (AccessiBe, UserWay, etc.) sind KEINE Lösung! 
Sie erfüllen nicht das BFSG und werden von der A11y-Community abgelehnt.

## ⏱️ Geschätzter Gesamtaufwand
| Phase | Aufwand |
|-------|---------|
| Automatisierter Audit | 1-2h |
| Manueller Audit | 4-6h |
| Report & Priorisierung | 2h |
| Umsetzung (geschätzt) | 15-30h je nach Ergebnis |
| **Gesamt bis Report** | **~8-10h** |

## 🚀 Nächster Schritt
→ Workflow definieren (Theme-Zugriff klären)
→ Dann Phase 1 starten (automatisierter Audit)
