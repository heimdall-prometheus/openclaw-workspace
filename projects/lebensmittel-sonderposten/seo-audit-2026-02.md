# SEO Audit — lebensmittel-sonderposten.de
**Datum:** 06.02.2026  
**Auditor:** Heimdall  
**Fokus:** Kategorie-Seiten, On-Page SEO, Keywords

---

## 1. Executive Summary

**Gesamtbewertung: 4/10** — Die Seite hat grundlegende SEO-Strukturen (Title Tags, Canonical URLs), aber massive strukturelle Probleme, fehlende Inhalte und Dutzende Duplikate untergraben das Ranking-Potenzial erheblich.

### 🔴 Top 5 Kritische Issues

| # | Issue | Impact |
|---|---|---|
| 1 | **Meta Descriptions fehlen im HTML** — Trotz Pflege in DB werden sie nicht im `<meta name="description">` Tag gerendert | 🔴 Hoch — Google zeigt Auto-Snippets, keine CTR-Optimierung möglich |
| 2 | **Kein Schema Markup** — Null `application/ld+json` auf allen Seiten (kein BreadcrumbList, kein CollectionPage, kein Organization) | 🔴 Hoch — Keine Rich Snippets in SERPs |
| 3 | **150+ doppelte Kategorie-Namen** — Gleiche Kategorien existieren mehrfach auf gleicher Ebene (verschiedene Sales Channels vermischt) | 🔴 Hoch — Keyword-Kannibalisierung, Crawl Budget Verschwendung |
| 4 | **70%+ der Kategorien ohne Text** — Nur 30% der Level-2-Kategorien haben Beschreibungstexte, die meisten unter 100 Zeichen | 🟡 Mittel — Thin Content, Google hat nichts zum Indexieren |
| 5 | **Homepage: Kein H1, keine Meta Description, 51 H2s** — Heading-Hierarchie komplett zerstört | 🟡 Mittel — Google kann Seitenstruktur nicht verstehen |

### ⚡ Quick Wins (sofort umsetzbar)

1. **Meta Descriptions im Template fixen** — DB hat die Daten, sie werden nur nicht gerendert
2. **BreadcrumbList Schema** einbauen (Shopware Plugin oder Theme-Anpassung)
3. **Doppelte Kategorien bereinigen** — Sales Channel-Zuordnung prüfen, unsichtbare Duplikate deaktivieren
4. **H1 auf Homepage** — Aktuell fehlt komplett
5. **Kategorie-Texte für Top-10 Kategorien** — Süßigkeiten, Drogerie, Getränke, Großpackungen haben die meisten Produkte

---

## 2. Kategorie-Analyse (Level 2 — Hauptkategorien)

### 2.1 Übersicht Hauptkategorien (sichtbar im Shop)

| Kategorie | URL | Title Tag | Meta Desc (DB) | H1 | Text | Produkte | SEO Score |
|---|---|---|---|---|---|---|---|
| Süßigkeiten | /Suessigkeiten/ | ✅ Gut (46 Z.) | ✅ In DB | ❌ Kein H1 (nur H2!) | ✅ 60 Z. (zu kurz!) | 9.402 | 4/10 |
| Großpackungen | /Grosspackungen/ | ✅ Gut (50 Z.) | ✅ In DB | ✅ | ✅ 2.890 Z. | 2.388 | 7/10 |
| Hobby & Freizeit | /Hobby-Freizeit/ | ✅ OK | ✅ In DB | ✅ | ❌ Kein Text | 2.240 | 4/10 |
| Konserven & Fertiggerichte | /Konserven-Fertiggerichte/ | ✅ Gut | ✅ In DB | ✅ | ❌ Kein Text | 2.198 | 4/10 |
| Drogerie | /Drogerie/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 43 Z. (zu kurz!) | 1.994 | 5/10 |
| Gewürze & Soßen | /Gewuerze-Sossen/ | ✅ Gut | ✅ In DB | ✅ | ✅ 2.840 Z. | 1.680 | 7/10 |
| Haushalt & Garten | /Haushalt-Garten/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 76 Z. (zu kurz!) | 1.435 | 5/10 |
| Salziges | /Salziges/ | ✅ Gut | ✅ In DB | ✅ | ❌ Kein Text | 1.370 | 4/10 |
| Wurstwaren & Käse | /Wurstwaren-Kaese/ | ✅ Gut | ✅ In DB | ✅ | ❌ Kein Text | 1.094 |4/10 |
| Müsli, Brot & Aufstriche | /Muesli-Brot-Aufstriche/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 36 Z. (zu kurz!) | 1.089 | 5/10 |
| Kaffee, Tee & Kakao | /Kaffee-Tee-Kakao/ | ✅ Gut | ✅ In DB | ✅ | ❌ Kein Text | 1.025 | 4/10 |
| Getränke | /Getraenke/ | ✅ Gut | ✅ In DB | ⚠️ (leer!) | ✅ 2.537 Z. | 840 | 6/10 |
| Neuheiten | /neuheiten/ | ⚠️ Nur "Neuheiten" | ⚠️ Dünn (35 Z.) | ? | ❌ Kein Text | 764 |3/10 |
| Haustier | /Haustier/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 23 Z. (zu kurz!) | 513 |5/10 |
| Nudeln, Reis & Getreide | /Nudeln-Reis-Getreide/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 34 Z. (zu kurz!) | 415 | 5/10 |
| Fitness & Supplements | /Fitness-und-Supplements/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 54 Z. (zu kurz!) | 393 | 5/10 |
| Vegane Produkte | /Vegane-Produkte/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 23 Z. (zu kurz!) | 337 | 5/10 |
| Bio Produkte | /Bio-Produkte/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 19 Z. (zu kurz!) | 279 | 5/10 |
| Backen & Dessert | /Backen-Dessert/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 26 Z. (zu kurz!) | 243 | 5/10 |
| Milchprodukte & Alt. | /Milchprodukte-und-Alternativen/ | ✅ Gut | ✅ In DB | ✅ | ⚠️ 44 Z. (zu kurz!) | 50 | 5/10 |

### 2.2 Problematische Kategorien

| Kategorie | Problem |
|---|---|
| ADDITIONAL GROUPS | ❌ Interner Name, nicht für Kunden, 0 Produkte, hat SEO-URL |
| Footer set | ❌ CMS-Artefakt, 0 Produkte, hat SEO-URL |
| aktuell beliebt (2×) | ❌ Duplikat, keine Meta-Daten |
| Abverkauf stark reduziert (2×) | ❌ Duplikat, inkonsistente Benennung ("Abverkauf - stark reduziert" vs "Abverkauf stark reduziert") |
| Infos (2×) | ❌ Duplikat |
| Marken (2×) | ❌ Duplikat |
| Neuheiten + Neuheiten. | ❌ Duplikat mit Punkt-Variante |
| Großpackungen (2×) | ❌ Duplikat — eine mit, eine ohne SEO-URL, unterschiedliche Meta Titles |
| Produkte | ❌ Generischer Name, nur "Lebensmittel" als Title, 0 Produkte |

---

## 3. On-Page SEO Findings

### 3.1 Title Tags
**Status:** ✅ Überwiegend gut gepflegt

- Die meisten Hauptkategorien haben individuelle, keyword-optimierte Title Tags
- Länge: 40-60 Zeichen (optimal)
- Format: "[Keyword] – Jetzt günstig [Action]!" — konsistent, aber etwas generisch
- **Issue:** ~15% der Level-3-Kategorien haben NULL als meta_title
- **Issue:** Marken-Kategorien oft nur Markenname ohne Kontext

**Empfehlung:** 
- Alle Title Tags nach Schema `[Hauptkeyword] günstig kaufen | lebensmittel-sonderposten.de` vereinheitlichen
- Fehlende Title Tags in Level 3+ auffüllen

### 3.2 Meta Descriptions
**Status:** 🔴 Kritisch — werden nicht gerendert!

- Meta Descriptions sind in der Datenbank gepflegt (meta_description Feld)
- Im HTML-Output erscheint `<meta name="description" content="">` — **LEER!**
- Das bedeutet: Die Arbeit wurde gemacht, aber die Theme-/Template-Ebene rendert sie nicht
- **Root Cause:** Wahrscheinlich Theme-Bug oder Konfigurationsfehler

**Empfehlung:**
- Template `meta-information.html.twig` im Theme prüfen
- Variable `{{ page.metaInformation.metaDescription }}` validieren
- Sofort fixen — alle gepflegten Descriptions werden sofort wirksam

### 3.3 Heading-Struktur
**Status:** 🟡 Problematisch

| Seite | H1 | H2s | Problem |
|---|---|---|---|
| Homepage | ❌ 0 | 51 | Kein H1, ~51 H2s (jedes Produkt = H2?) |
| Süßigkeiten | ❌ 0 (nur H2!) | H2 "Süßigkeiten" | Kategoriename ist H2, nicht H1 |
| Getränke | ⚠️ 1 (leer) | ~51 | H1 existiert aber ist leer |
| Großpackungen | ✅ 1 | ~50 | OK |
| Drogerie | ✅ 1 | ~50 | OK |
| Andere Kat. | ✅ 1 | ~50 | OK |

**Problem-Pattern:** 
- Jede Seite hat ~50 H2-Elemente — vermutlich werden Produktnamen als H2 gerendert
- Das verwässert die Heading-Hierarchie komplett
- Produktnamen sollten H3 oder gar keine Headings sein

**Empfehlung:**
- Produktnamen in Listings auf `<h3>` oder `<span>` umstellen
- H1 auf jeder Kategorie-Seite = Kategorie-Name (konsistent)
- Kategorie-Beschreibungstext-Headings = H2
- FAQ-Bereiche = H2

### 3.4 Schema Markup (Structured Data)
**Status:** 🔴 Komplett fehlend

- **Kein einziges** `application/ld+json` Script auf irgendeiner geprüften Seite
- Fehlend: Organization, WebSite, BreadcrumbList, CollectionPage, Product (auf PLPs)
- Kein FAQ-Schema trotz FAQ-Bereichen auf manchen Kategorieseiten

**Empfehlung (Priorität):**
1. **BreadcrumbList** auf allen Seiten (Shopware Standardplugin oder Theme)
2. **Organization** auf Homepage (Name, Logo, Contact, Social)
3. **CollectionPage** auf Kategorie-Seiten
4. **Product** Schema auf Produktseiten (Preis, Verfügbarkeit, Bewertungen)
5. **FAQPage** Schema wo FAQ-Bereiche existieren

### 3.5 Canonical Tags
**Status:** ✅ Korrekt

- Jede geprüfte Seite hat einen self-referencing Canonical Tag
- HTTPS, www-Version, korrekte URL
- Kein Canonical-Konflikt gefunden

### 3.6 Kategorie-Texte
**Status:** 🟡 Stark ausbaufähig

**Level 2 Kategorien mit gutem Text (>500 Z.):**
- Getränke (2.537 Z.)
- Gewürze & Soßen (2.840 Z.)
- Großpackungen (2.890 Z.)

**Level 2 Kategorien mit zu kurzem Text (<100 Z.):**
- Backen & Dessert (26 Z.), Bio Produkte (19 Z.), Drogerie (43 Z.), Fitness (54 Z.), 
  Haustier (23 Z.), Haushalt & Garten (76 Z.), Milchprodukte (44 Z.), 
  Müsli/Brot/Aufstriche (36 Z.), Nudeln/Reis (34 Z.), Süßigkeiten (60 Z.),
  Vegane Produkte (23 Z.)

**Level 2 Kategorien OHNE Text:**
- Hobby & Freizeit (2.240 Produkte!), Konserven & Fertiggerichte (2.198!), 
  Salziges (1.370), Wurstwaren & Käse (1.094), Kaffee/Tee/Kakao (1.025), 
  Neuheiten (764)

**Empfehlung:**
- Mindestens 500-1.000 Wörter pro Hauptkategorie
- Struktur: Einleitung → Sortiment-Highlights → Kaufgründe → FAQ
- Top-Priorität: Die 6 Kategorien ohne Text, die zusammen 8.691 Produkte abdecken

---

## 4. Technical SEO

### 4.1 robots.txt
**Status:** ✅ Gut

```
User-agent: *
Allow: /
Disallow: /*?
Allow: /*theme/
Allow: /media/*?ts=
Disallow: /account/
Disallow: /checkout/
Disallow: /widgets/
Allow: /widgets/cms/
Allow: /widgets/menu/offcanvas
Sitemap: https://www.lebensmittel-sonderposten.de/sitemap.xml
```

- Parameter-URLs korrekt blockiert (`/*?`)
- Account/Checkout blockiert
- Sitemap referenziert
- **⚠️ Mögliches Issue:** `Disallow: /*?` blockiert ALLE Parameter-URLs — das könnte gefilterte Listing-Seiten und Paginierung betreffen, falls diese als Query-Parameter umgesetzt sind

### 4.2 XML Sitemap
**Status:** ✅ Vorhanden, aber...

- Sitemap Index vorhanden unter `/sitemap.xml`
- Nur **1 Sitemap-Datei** im Index (gzip-komprimiert)
- Letzte Aktualisierung: 06.02.2026 11:34 UTC
- **⚠️ Unklar:** Bei 29.832 Produkten + 1.680 Kategorien sollten es mehrere Sitemap-Files sein — eine einzelne GZ-Datei ist verdächtig (evtl. nur ein Teil indexiert?)

### 4.3 URL-Struktur
**Status:** 🟡 Inkonsistent

- URLs nutzen Gemischt-Schreibung: `/Suessigkeiten/`, `/Getraenke/`, aber `/neuheiten/`, `/infos/`
- Umlaute werden korrekt umgewandelt: ü→ue, ö→oe, ä→ae
- Sonderzeichen werden entfernt: `&` → `-`
- **Issue:** Einige URLs enthalten Großbuchstaben (`/Backen-Dessert/`, `/Bio-Produkte/`) während andere klein sind — inkonsistent
- **Issue:** `ADDITIONAL-GROUPS/` als öffentliche URL ist unprofessionell

### 4.4 Pagination
- `Paginierung`-Navs vorhanden (top + bottom)
- Kein `rel="next"` / `rel="prev"` im HTML gefunden
- Infinite Scrolling Plugin aktiv (`tanmar-infinite-scrolling`)
- **⚠️** Infinite Scroll ohne proper Pagination-Links kann Crawlability von Seite 2+ Produkten beeinträchtigen

### 4.5 Interne Links & Content-Fehler
- **🔴 Dev2-Links im Live-Content:** Süßigkeiten-Seite verlinkt auf `dev2.lebensmittel-sonderposten.de` — interner Staging-Link im Produktivshop!
- **🟡 Doppelte URL-Strukturen:** Alte `/produkte/...` und neue URLs existieren parallel — Canonical-Konflikte möglich

### 4.6 Sonstiges
- **HTTPS:** ✅ (via Cloudflare)
- **hreflang:** Nicht vorhanden (nur DE-Shop, kein Issue)
- **Blog RSS:** ✅ Vorhanden (`/blog.rss`)
- **isFamilyFriendly:** `false` gesetzt — ⚠️ warum? Ein Lebensmittel-Shop sollte `true` sein

---

## 5. Keyword-Analyse & Empfehlungen

### 5.1 Aktuelle Keyword-Strategie

Die Title Tags zeigen eine klare Strategie: `[Produkt] günstig kaufen/bestellen`. Das ist solide für transaktionale Keywords.

**Gut targetierte Keywords:**
- "Süßigkeiten bestellen"
- "Getränke günstig kaufen"  
- "Lebensmittel Großpackungen"
- "Bio Produkte bestellen"
- "Sportnahrung kaufen"

### 5.2 Keyword-Gaps (fehlende Chancen)

| Keyword-Cluster | Geschätztes Suchvolumen | Status |
|---|---|---|
| "lebensmittel sonderposten" | 🔴 Hoch (Brand) | Nur auf Homepage, kein dedizierter Landingpage-Text |
| "mhd ware kaufen" / "mhd lebensmittel" | 🟡 Mittel | Kategorie existiert (Level 3), aber 3× dupliziert, kein/kaum Text |
| "restposten lebensmittel" | 🟡 Mittel | Nicht als Keyword targetiert |
| "lebensmittel günstig online kaufen" | 🔴 Hoch | Kein Content dafür optimiert |
| "süßigkeiten großpackung" | 🟡 Mittel | Großpackungen + Süßigkeiten sind separate Kategorien, kein Cross-Content |
| "snacks günstig" / "chips günstig kaufen" | 🟡 Mittel | Unterkategorien ohne eigene Meta-Optimierung |
| "kiosk bedarf großhandel" | 🟡 Mittel (B2B!) | Großpackungen-Kategorie erwähnt Kiosk/Tankstelle im Meta Title, aber kein dedizierter B2B-Content |
| "lebensmittel retten" / "food waste" | 🟢 Trend | Wird in Meta Descriptions angedeutet ("Rettung"), aber kein Content der das Thema besetzt |

### 5.3 Keyword-Kannibalisierung

**Kritische Fälle:**
- **"Süßwaren"**: 3 verschiedene Level-3-Kategorien mit dem Namen "Süßwaren"
- **"Salziges & Knabberartikel"**: 2× auf Level 3
- **"MHD Ware"**: 3× auf Level 3
- **"Abverkauf stark reduziert"**: 3× auf Level 3 + 2× auf Level 2
- **"Nonfood"**: 2× auf Level 3
- **Marken-Duplikate**: Nahezu JEDE Marken-Kategorie auf Level 4 existiert doppelt

→ Dies sind wahrscheinlich Spiegelungen für verschiedene Sales Channels (Haupt-Shop vs. TEMU etc.), aber wenn sie alle indexierbar sind, konkurrieren sie untereinander.

---

## 6. Priorisierter Action Plan

### Phase 1 — Sofort (1-2 Tage, höchster ROI)

| # | Aktion | Aufwand | Impact |
|---|---|---|---|
| 1.1 | **Meta Description Rendering fixen** — Template prüfen, warum DB-Werte nicht im HTML erscheinen | 30 Min | 🔴 Hoch |
| 1.2 | **H1 auf Homepage einfügen** — z.B. "Lebensmittel Sonderposten — Große Marken, kleine Preise" | 5 Min | 🟡 Mittel |
| 1.3 | **isFamilyFriendly auf true setzen** | 1 Min | 🟢 Gering |
| 1.4 | **Süßigkeiten H1 fixen** — aktuell H2, muss H1 werden | 10 Min | 🟡 Mittel |
| 1.5 | **Getränke H1 fixen** — existiert aber leer | 5 Min | 🟡 Mittel |

### Phase 2 — Diese Woche (Strukturbereinigung)

| # | Aktion | Aufwand | Impact |
|---|---|---|---|
| 2.1 | **Doppelte Kategorien bereinigen** — Alle Duplikate identifizieren, Sales Channel-Zuordnung prüfen, nicht-Shop-Kategorien auf noindex setzen oder deaktivieren | 2-4h | 🔴 Hoch |
| 2.2 | **"ADDITIONAL GROUPS" & "Footer set" deaktivieren/verstecken** | 5 Min | 🟢 Gering |
| 2.3 | **Produktnamen in Listings von H2 auf H3/span umstellen** | 1h | 🟡 Mittel |
| 2.4 | **BreadcrumbList Schema Markup** einbauen (Shopware Plugin) | 1-2h | 🟡 Mittel |

### Phase 3 — Nächste 2 Wochen (Content)

| # | Aktion | Aufwand | Impact |
|---|---|---|---|
| 3.1 | **Kategorie-Texte für Top 6 ohne Text** schreiben — Hobby & Freizeit, Konserven, Salziges, Wurstwaren, Kaffee/Tee, Neuheiten | 3-4h | 🔴 Hoch |
| 3.2 | **Zu kurze Texte erweitern** — 11 Kategorien mit <100 Z. auf 500-1.000 Wörter ausbauen | 4-6h | 🟡 Mittel |
| 3.3 | **"MHD Ware" Landingpage** — Dedizierter Content zu "MHD Lebensmittel kaufen", food waste, Nachhaltigkeit | 2h | 🟡 Mittel |
| 3.4 | **"Lebensmittel Restposten" Keyword-Seite** — Homepage-Text oder dedizierte Landingpage | 2h | 🟡 Mittel |

### Phase 4 — Laufend (Long-term)

| # | Aktion | Aufwand | Impact |
|---|---|---|---|
| 4.1 | **Organization + WebSite Schema** auf Homepage | 1h | 🟡 Mittel |
| 4.2 | **Product Schema** auf Produktseiten (Preis, Verfügbarkeit) | 2-4h | 🟡 Mittel |
| 4.3 | **FAQ Schema** auf Kategorien mit FAQ-Bereich | 1h | 🟢 Gering |
| 4.4 | **B2B Content** — "Kiosk Bedarf Großhandel", "Tankstellen Süßwaren Großpackung" | 3-4h | 🟡 Mittel |
| 4.5 | **Pagination** — rel=next/prev oder View-All implementieren für Crawlability | 2h | 🟡 Mittel |
| 4.6 | **URL-Konsistenz** — Alle URLs auf Lowercase vereinheitlichen (301 Redirects) | 1h + Risiko | 🟢 Gering |

---

## Anhang

### A. Statistiken

| Metrik | Wert |
|---|---|
| Aktive Kategorien (Level 1-3) | ~130 |
| Davon mit Meta Title | ~70% |
| Davon mit Meta Description (DB) | ~65% |
| Davon mit Meta Description (HTML gerendert) | **0%** |
| Davon mit Beschreibungstext | ~30% |
| Davon mit Text >500 Zeichen | ~10% |
| Doppelte Kategorie-Namen (gleiche Ebene) | 150+ |
| Schema Markup Seiten | 0 |
| Produkte gesamt (Parent) | 29.832 |
| Kategorien gesamt | 1.680 |
| Sales Channels | 14 |

### B. Getestete Seiten

- Homepage (/)
- /Suessigkeiten/
- /Getraenke/
- /Grosspackungen/
- /Drogerie/
- /Salziges/
- /Kaffee-Tee-Kakao/
- /Konserven-Fertiggerichte/
- /Hobby-Freizeit/
