# WCAG 2.2 AA Audit Report — mein-schluessel.de

**Datum:** 2026-02-07  
**Tool:** axe-core 4.x via Playwright (WCAG 2.0 A, AA + WCAG 2.1 A, AA + WCAG 2.2 AA)  
**Standard:** WCAG 2.2 Level AA  
**Kontext:** Shopware 6 E-Commerce, BFSG-pflichtig seit 28.06.2025  

---

## Übersicht aller Seiten

| # | Seite | URL | Score | Violations | Betroffene Elemente |
|---|-------|-----|-------|------------|---------------------|
| 1 | Startseite | mein-schluessel.de | **77/100** | 9 | 59 |
| 2 | Kategorie (Schließzylinder) | .../sicherheitstechnik/schliesszylinder/ | **89/100** | 4 | 23 |
| 3 | Produktdetail (DOM ix Twido) | .../624/dom-ix-twido-doppelzylinder | **85/100** | 6 | 21 |
| 4 | Suche ("dom") | .../search?search=dom | **89/100** | 4 | 38 |
| 5 | Warenkorb | .../checkout/cart | **88/100** | 4 | 11 |
| 6 | Impressum | .../shop-service/impressum/ | **88/100** | 4 | 11 |
| 7 | Konfigurator | .../schliessanlagen-designer | **84/100** | 6 | 33 |
| 8 | Login/Registrierung | .../account/login | **86/100** | 5 | 12 |

---

## 1. Startseite — Score: 77/100
**URL:** `https://www.mein-schluessel.de`

### Kritische Issues (Blocker)

- **[WCAG 4.1.2] ARIA-Attribute auf falscher Rolle** — 2 Elemente  
  Footer-Spalten (`#collapseFooterNewsletterTitle`, `div[data-bs-target="#collapseFooterTitle1"]`) nutzen `aria-expanded` und `aria-controls` auf `<div>`-Elementen ohne passende Rolle.  
  → **Fix:** `role="button"` hinzufügen oder auf `<button>` umstellen.  
  → **Shopware:** Footer-Template `storefront/layout/footer/footer.html.twig` anpassen.

- **[WCAG 1.3.1] ARIA-Kindrollen fehlen** — 2 Elemente  
  `#footerColumnsNewsletter` und `#footerColumns` haben `role="list"`, aber die Kind-Elemente haben nicht `role="listitem"`.  
  → **Fix:** `role="listitem"` zu den direkten Kind-`<div>`s der Footer-Spalten hinzufügen oder `role="list"` entfernen.  
  → **Shopware:** Footer-Template anpassen.

- **[WCAG 4.1.2] Buttons ohne erkennbaren Text** — 4 Elemente  
  Slider-Navigationstasten (Prev/Next) der Produkt-Slider haben keinen sichtbaren oder per ARIA zugänglichen Text.  
  Selektoren: `.base-slider-controls-prev`, `.base-slider-controls-next`  
  → **Fix:** `aria-label="Vorheriges Produkt"` / `aria-label="Nächstes Produkt"` hinzufügen.  
  → **Shopware:** `storefront/component/product/slider/` Templates anpassen.

- **[WCAG 1.1.1] Bilder ohne Alt-Text** — 6 Elemente  
  Hero-Slider-Bilder (`#tns1-item0` etc.) und CMS-Bilder (Konfigurator-Link, Briefkasten) haben kein `alt`-Attribut.  
  → **Fix:** Alt-Texte im Shopware-Admin unter "Erlebniswelten" → Bild-Elemente pflegen.  
  → **Shopware:** Alt-Text-Felder in CMS-Bild-Elementen befüllen.

### Hohe Issues (Serious)

- **[WCAG 4.1.2] Fokussierbare Elemente in aria-hidden** — 28 Elemente  
  Geklonte Slider-Items (`.tns-slide-cloned[aria-hidden="true"]`) sind mit `tabindex="-1"` zwar nicht per Tab erreichbar, enthalten aber fokussierbare Links/Buttons.  
  → **Fix:** Alle interaktiven Elemente innerhalb geklonter Slides ebenfalls `tabindex="-1"` und `aria-hidden="true"` setzen, oder Slider-Library auf eine a11y-konforme Alternative wechseln (z.B. Splide.js).  
  → **Shopware:** Tiny Slider (tns) Plugin/Theme-Integration prüfen.

- **[WCAG 4.1.2] Unzulässige ARIA-Attribute** — 2 Elemente  
  `.base-slider-controls` Divs haben `aria-label`, was auf generischem `<div>` unzulässig ist.  
  → **Fix:** `role="group"` oder `role="toolbar"` hinzufügen.

- **[WCAG 1.4.3] Farbkontrast unzureichend** — 11 Elemente  
  Hauptsächlich betroffen:  
  - **"Topseller"-Badges** (`.badge.bg-success`) — weißer Text auf grünem Hintergrund  
  - **Newsletter-Footer** — heller Text auf dunklem Hintergrund  
  → **Fix:** Grünton abdunkeln oder Text vergrößern. Kontrastverhältnis muss ≥ 4.5:1 sein.  
  → **Shopware:** SCSS-Variable `$success` anpassen (z.B. `#155724` statt Standard-Grün).

- **[WCAG 2.4.4 / 4.1.2] Links ohne erkennbaren Text** — 3 Elemente  
  Bild-Links (`.image-slider-link`, `.cms-image-link`) enthalten nur ein Bild ohne Alt-Text.  
  → **Fix:** Alt-Text auf dem verlinkten Bild pflegen ODER `aria-label` auf dem Link.

- **[WCAG 2.5.8] Touch-Ziel zu klein** — 1 Element  
  Newsletter-Datenschutz-Checkbox (`#form-privacy-opt-in-`) ist kleiner als 24×24px.  
  → **Fix:** Checkbox mit CSS vergrößern: `min-width: 24px; min-height: 24px;`

### Prüfung erforderlich (Needs Review)
- ARIA-prohibited-attr: 5 Elemente (manuell prüfen)
- aria-valid-attr-value: 2 Elemente (Footer-Collapse IDs prüfen)

---

## 2. Kategorie (Schließzylinder) — Score: 89/100
**URL:** `https://www.mein-schluessel.de/sicherheitstechnik/schliesszylinder/`

### Kritische Issues (Blocker)

- **[WCAG 4.1.2] ARIA-Attribute auf falscher Rolle** — 2 Elemente  
  Identisch mit Startseite (Footer-Spalten). → Globaler Footer-Fix.

- **[WCAG 1.3.1] ARIA-Kindrollen fehlen** — 2 Elemente  
  Identisch mit Startseite (Footer). → Globaler Footer-Fix.

### Hohe Issues (Serious)

- **[WCAG 1.4.3] Farbkontrast unzureichend** — 18 Elemente  
  Massiv betroffen:
  - **"Topseller"-Badges** auf allen Produktkarten  
  - **"In den Warenkorb"-Buttons** (`.btn-buy`) — wahrscheinlich weißer Text auf zu hellem Primärfarbton  
  - **"Weiterlesen"-Button** (`.btn-secbg`) — Sekundärfarbe mit zu wenig Kontrast  
  → **Fix:** Shopware SCSS-Variablen für `$primary`, `$secondary`, `$success` überarbeiten.

- **[WCAG 2.5.8] Touch-Ziel zu klein** — 1 Element  
  Newsletter-Checkbox (gleich wie Startseite).

### Prüfung erforderlich
- aria-prohibited-attr: 12 Elemente (Produkt-Karten)
- frame-title-unique: 8 iFrames mit identischem Titel

---

## 3. Produktdetail (DOM ix Twido Doppelzylinder) — Score: 85/100
**URL:** `https://www.mein-schluessel.de/sicherheitstechnik/schliesszylinder/mechanische-profilzylinder/624/dom-ix-twido-doppelzylinder`

### Kritische Issues (Blocker)

- **[WCAG 4.1.2] ARIA-Attribute auf falscher Rolle** — 2 Elemente  
  Footer (global). → Globaler Fix.

- **[WCAG 1.3.1] ARIA-Kindrollen fehlen** — 2 Elemente  
  Footer (global). → Globaler Fix.

- **[WCAG 4.1.2] Select-Elemente ohne Label** — 2 Elemente  
  Zubehör-Auswahl (`#dvsn-product-accessory--select-loop-0-0`, `#dvsn-product-accessory--select-loop-0-1`) haben keinen zugänglichen Namen.  
  → **Fix:** `aria-label="Menge"` oder `<label>` hinzufügen.  
  → **Shopware:** Plugin "dvsn Product Accessories" — Template anpassen.

### Hohe Issues (Serious)

- **[WCAG 1.4.3] Farbkontrast unzureichend** — 9 Elemente  
  Betroffen:
  - **"In den Warenkorb"-Button** (`.btn-buy.btn-primary`) — Primärfarbe zu hell  
  - **Produktinfos-Text** (`.text-info > span`) — Info-Farbe zu hell  
  - **Produkteigenschaften-Tabelle** (`th`) — Überschriften mit zu wenig Kontrast  
  - **Footer-Newsletter** (global)  
  → **Fix:** SCSS-Variablen `$primary` und `$info` abdunkeln.

- **[WCAG 2.4.4] Link ohne Text** — 1 Element  
  Link zu "Mehrschlüssel" enthält nur ein `<br>` als Inhalt — komplett unsichtbar und unbrauchbar.  
  → **Fix:** Linktext oder `aria-label` hinzufügen.  
  → **Shopware:** Im CMS-Inhalt/Produktbeschreibung den leeren Link korrigieren.

- **[WCAG 2.5.8] Touch-Ziele zu klein** — 5 Elemente  
  Zubehör-Checkboxen und Select-Felder + Newsletter-Checkbox.  
  → **Fix:** Formularelemente auf min. 24×24px vergrößern.

### Prüfung erforderlich
- aria-prohibited-attr: 14 Elemente
- color-contrast: 10 weitere Elemente (manuell prüfen)

---

## 4. Suche ("dom") — Score: 89/100
**URL:** `https://www.mein-schluessel.de/search?search=dom`

### Kritische Issues (Blocker)

- **[WCAG 4.1.2] ARIA-Attribute auf falscher Rolle** — 2 Elemente  
  Footer (global).

- **[WCAG 1.3.1] ARIA-Kindrollen fehlen** — 2 Elemente  
  Footer (global).

### Hohe Issues (Serious)

- **[WCAG 1.4.3] Farbkontrast unzureichend** — 33 Elemente  
  Höchste Anzahl aller Seiten! Betroffen:
  - **"Topseller"-Badges** auf vielen Suchergebnissen  
  - **"In den Warenkorb"-Buttons** auf allen Produktkarten  
  - **Footer-Newsletter**  
  → Gleiche Fixes wie Kategorie-Seite. Besonders auffällig wegen vieler Produkte auf einer Seite.

- **[WCAG 2.5.8] Touch-Ziel zu klein** — 1 Element  
  Newsletter-Checkbox (global).

### Prüfung erforderlich
- aria-prohibited-attr: 25 Elemente (Produktkarten-Badges)
- frame-title-unique: 21 iFrames (YouTube-Embeds in Produkten?)

---

## 5. Warenkorb — Score: 88/100
**URL:** `https://www.mein-schluessel.de/checkout/cart`

### Kritische Issues (Blocker)

- **[WCAG 4.1.2] ARIA-Attribute auf falscher Rolle** — 2 Elemente  
  Footer (global).

- **[WCAG 1.3.1] ARIA-Kindrollen fehlen** — 2 Elemente  
  Footer (global).

### Hohe Issues (Serious)

- **[WCAG 1.4.3] Farbkontrast unzureichend** — 6 Elemente  
  - **Footer-Newsletter-Überschrift und Text**  
  - **Datenschutz/AGB-Links** in der Newsletter-Checkbox  
  → **Fix:** Footer-Newsletter-Farben anpassen.

- **[WCAG 2.5.8] Touch-Ziel zu klein** — 1 Element  
  Newsletter-Checkbox (global).

### Hinweis
Der leere Warenkorb hat vergleichsweise wenige Issues. **ACHTUNG:** Warenkorb mit Produkten und Checkout-Prozess müssen separat manuell getestet werden!

---

## 6. Impressum — Score: 88/100
**URL:** `https://www.mein-schluessel.de/shop-service/impressum/`

### Kritische Issues (Blocker)

- **[WCAG 4.1.2] ARIA-Attribute auf falscher Rolle** — 2 Elemente  
  Footer (global).

- **[WCAG 1.3.1] ARIA-Kindrollen fehlen** — 2 Elemente  
  Footer (global).

### Hohe Issues (Serious)

- **[WCAG 1.4.3] Farbkontrast unzureichend** — 6 Elemente  
  Ausschließlich Footer-Newsletter-Bereich (global).

- **[WCAG 2.5.8] Touch-Ziel zu klein** — 1 Element  
  Newsletter-Checkbox (global).

### Hinweis
Impressum ist eine einfache Content-Seite. Alle Issues kommen aus dem globalen Layout (Footer).

---

## 7. Konfigurator (Schließanlagen-Designer) — Score: 84/100
**URL:** `https://www.mein-schluessel.de/schliessanlagen-designer`

### Kritische Issues (Blocker)

- **[WCAG 4.1.2] ARIA-Attribute auf falscher Rolle** — 2 Elemente  
  Footer (global).

- **[WCAG 1.3.1] ARIA-Kindrollen fehlen** — 2 Elemente  
  Footer (global).

- **[WCAG 1.1.1] Bilder ohne Alt-Text** — 6 Elemente  
  Alle Objekttyp-Bilder im Konfigurator (Wohnung, Einfamilienhaus, Mehrfamilienhaus, Gewerbe, Öffentliches Gebäude + 1 weiteres) haben **keinen Alt-Text**.  
  → **Fix:** `alt="Wohnung"`, `alt="Einfamilienhaus"` etc. hinzufügen.  
  → **Shopware:** Plugin `schliessanlagendesignerplugin` — Template anpassen.

- **[WCAG 4.1.2] Formularelemente ohne Label** — 7 Elemente  
  Radio-Buttons für Objekttyp-Auswahl (`input[name="system_type"]`) und weitere Formularfelder haben **keine Labels**.  
  → **Fix:** Sichtbare `<label>` oder `aria-label` für jeden Radio-Button.  
  → **Shopware:** Konfigurator-Plugin-Templates grundlegend überarbeiten.

### Hohe Issues (Serious)

- **[WCAG 1.4.3] Farbkontrast unzureichend** — 15 Elemente  
  - **Breadcrumb-Labels** im Konfigurator (`.breadcrumb_label`)  
  - **Objekttyp-Labels** (`.select_object_type_label`) — "Wohnung", "Einfamilienhaus" etc.  
  - **Footer-Newsletter** (global)  
  → **Fix:** Konfigurator-CSS-Farben auf ausreichenden Kontrast prüfen.

- **[WCAG 2.5.8] Touch-Ziel zu klein** — 1 Element  
  Newsletter-Checkbox (global).

### ⚠️ Sonderbewertung Konfigurator
Der Konfigurator ist die **kritischste Seite** für Barrierefreiheit:
- Verwendet `onclick`-Handler auf `<div>`s statt semantische Buttons
- Radio-Buttons sind versteckt und nur über JavaScript bedienbar
- **Tastatur-Navigation ist vermutlich nicht möglich** (manueller Test nötig!)
- Kein ARIA-Pattern für die Objekttyp-Auswahl implementiert

---

## 8. Login/Registrierung — Score: 86/100
**URL:** `https://www.mein-schluessel.de/account/login`

### Kritische Issues (Blocker)

- **[WCAG 4.1.2] ARIA-Attribute auf falscher Rolle** — 2 Elemente  
  Footer (global).

- **[WCAG 1.3.1] ARIA-Kindrollen fehlen** — 2 Elemente  
  Footer (global).

- **[WCAG 1.1.1] Amazon Pay Button ohne Alt-Text** — 1 Element  
  Das Amazon-Pay-Login-Bild (`#swag-amazon-pay-button-container-account-login img`) hat keinen Alt-Text.  
  → **Fix:** `alt="Mit Amazon anmelden"` hinzufügen.  
  → **Shopware:** Amazon-Pay-Plugin (SwagAmazonPay) — Template überschreiben.

### Hohe Issues (Serious)

- **[WCAG 1.4.3] Farbkontrast unzureichend** — 6 Elemente  
  Footer-Newsletter (global).

- **[WCAG 2.5.8] Touch-Ziel zu klein** — 1 Element  
  Newsletter-Checkbox (global).

---

---

## Gesamtbewertung

### Durchschnittlicher Accessibility Score: **86/100**

| Seite | Score |
|-------|-------|
| Startseite | 77 |
| Kategorie | 89 |
| Produktdetail | 85 |
| Suche | 89 |
| Warenkorb | 88 |
| Impressum | 88 |
| Konfigurator | 84 |
| Login | 86 |
| **Durchschnitt** | **85,75 ≈ 86** |

### Kritische Issues gesamt: 36 betroffene Elemente (über alle Seiten)

### Top 5 häufigste Probleme (über alle Seiten)

| # | Problem | WCAG | Betroffene Seiten | Betroffene Elemente | Schwere |
|---|---------|------|-------------------|---------------------|---------|
| 1 | **Farbkontrast unzureichend** | 1.4.3 | 8/8 | 104 | Serious |
| 2 | **ARIA-Attribute auf falscher Rolle (Footer)** | 4.1.2 | 8/8 | 16 | Critical |
| 3 | **ARIA-Kindrollen fehlen (Footer)** | 1.3.1 | 8/8 | 16 | Critical |
| 4 | **Touch-Ziele zu klein** | 2.5.8 | 8/8 | 12 | Serious |
| 5 | **Bilder ohne Alt-Text** | 1.1.1 | 3/8 | 13 | Critical |

### Geschätzter Aufwand pro Problemkategorie

| Problem | Aufwand | Beschreibung |
|---------|---------|-------------|
| **Footer ARIA-Fehler** (2 Issues global) | **S** (1-2h) | Template-Fix in 1 Datei, wirkt auf alle Seiten |
| **Farbkontraste** (global) | **S** (2-3h) | SCSS-Variablen anpassen: `$primary`, `$success`, `$info`, Newsletter-Footer |
| **Touch-Ziele vergrößern** | **S** (1h) | CSS `min-width/height: 24px` auf Checkboxen |
| **Bilder Alt-Texte (CMS)** | **S** (1-2h) | Im Admin alt-Texte pflegen |
| **Slider A11y** (button-name, aria-hidden-focus) | **M** (4-6h) | Slider-Component überarbeiten oder Library wechseln |
| **Konfigurator komplett** (Labels, Semantik, Keyboard) | **L** (10-15h) | Plugin-Code grundlegend überarbeiten |
| **Select-Labels Produktseite** | **S** (1h) | Plugin "dvsn Product Accessories" Template anpassen |
| **Leere Links** | **S** (30min) | CMS-Inhalt korrigieren |
| **Amazon Pay Alt-Text** | **S** (30min) | Plugin-Template überschreiben |

### Empfohlene Reihenfolge der Behebung

#### Sprint 1 — Quick Wins (4-6h, größter Impact)
1. **Footer ARIA-Fix** — 2 Issues auf ALLEN 8 Seiten gleichzeitig behoben
2. **Farbkontraste SCSS** — 104 Elemente auf allen Seiten behoben
3. **Touch-Ziel Checkbox** — 1 CSS-Regel, wirkt global
4. **CMS-Bilder Alt-Texte** — Admin-Pflege, kein Code nötig

#### Sprint 2 — Mittlerer Aufwand (6-8h)
5. **Slider-Buttons Labels** — Prev/Next Buttons mit aria-label versehen
6. **Slider aria-hidden-focus** — Fokussierbare Elemente in geklonten Slides fixen
7. **Select-Labels Produktseite** — dvsn Plugin Template-Override
8. **Leere Links & Amazon Pay** — Einzelfixes

#### Sprint 3 — Konfigurator-Überarbeitung (10-15h)
9. **Konfigurator: Alt-Texte** — Bilder beschriften
10. **Konfigurator: Form-Labels** — Radio-Buttons zugänglich machen
11. **Konfigurator: Semantik** — `onclick` auf `<div>` → `<button>` oder `role="button"`
12. **Konfigurator: Tastatur-Navigation** — Fokus-Management implementieren

### ⚠️ Wichtige Hinweise

1. **Automatisierte Tests decken nur ~30% der WCAG-Kriterien ab.** Phase 2 (manueller Test) ist zwingend erforderlich für:
   - Tastatur-Navigation (vor allem Mega-Menu + Konfigurator)
   - Screenreader-Kompatibilität
   - Fokus-Management bei Modals/Overlays
   - Sinnhaftigkeit von Alt-Texten
   - Checkout-Prozess mit Produkten

2. **Globale Issues (Footer)** machen einen großen Teil der Violations aus. Ein Fix dort verbessert den Score auf allen Seiten um ~5-8 Punkte.

3. **Der Konfigurator** ist die mit Abstand problematischste Seite und erfordert die meiste Arbeit.

4. **Shopware-Theme-Basis:** Viele Issues kommen aus dem Standard-Shopware-Storefront-Theme (Slider, Footer). Ein Update auf Shopware 6.6+ könnte einige dieser Issues bereits adressieren.

5. **Plugins betroffen:**
   - `schliessanlagendesignerplugin` (Konfigurator) — Hauptproblem
   - `dvsn Product Accessories` (Produktseite) — Select-Labels fehlen
   - `SwagAmazonPay` (Login) — Alt-Text fehlt
   - `moorl/Foundation` (global) — Slider-A11y prüfen

---

*Report generiert am 2026-02-07 10:45 UTC*  
*Tool: axe-core via Playwright, Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa*  
*Vollständige JSON-Rohdaten: `/tmp/ms-wcag-results.json`*
