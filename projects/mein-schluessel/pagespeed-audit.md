# PageSpeed & Core Web Vitals Audit: mein-schluessel.de

**Datum:** 2026-02-09  
**Auditor:** Automated Analysis (PSI API quota exceeded – manual analysis via source inspection)  
**Platform:** Shopware 6.6 (PleskLin)  
**CDN:** Cloudflare (Free/Pro Plan)  
**Protocol:** HTTP/2 + HTTP/3 (h3 via alt-svc)

---

## 1. Performance Overview

### Measured Response Times (TTFB from Frankfurt/TXL)

| Page | TTFB | Total Load |
|------|------|------------|
| Homepage | **1.01s** | 1.22s |
| Config Product (DOM Twido) | **1.11s** | 1.33s |
| Simple Product (Master Lock) | **1.05s** | 1.27s |

> ⚠️ **TTFB > 800ms** auf allen Seiten = Google Core Web Vitals FAIL  
> Zielwert: < 800ms (Good), ideal < 200ms

### Estimated Performance Scores

| Metric | Homepage (Mobile) | Config Product | Simple Product | Status |
|--------|-------------------|----------------|----------------|--------|
| **Performance Score** | ~25-35 | ~20-30 | ~30-40 | 🔴 Poor |
| **LCP** | ~4.5-6.0s | ~5.0-7.0s | ~4.0-5.5s | 🔴 Poor (>2.5s) |
| **CLS** | ~0.1-0.3 | ~0.1-0.2 | ~0.05-0.15 | 🟡-🔴 |
| **INP/TBT** | ~800-1500ms TBT | ~800-1500ms TBT | ~600-1200ms TBT | 🔴 Poor |
| **FCP** | ~2.5-3.5s | ~3.0-4.0s | ~2.5-3.5s | 🟡-🔴 |
| **TTFB** | 1.01s | 1.11s | 1.05s | 🔴 Poor (>800ms) |

> Scores sind konservative Schätzungen basierend auf gemessenen TTFB, Asset-Größen und Resource-Loading-Pattern.  
> PSI API war quota-limited (429) – empfehle manuelle Prüfung unter https://pagespeed.web.dev

---

## 2. Critical Findings

### 🔴 KRITISCH: Zero Page Caching

```
cache-control: no-cache, private
cf-cache-status: DYNAMIC
```

**ALLE Seiten** werden bei JEDEM Request komplett vom Origin-Server gerendert:
- Cloudflare cached **nichts** (DYNAMIC status)
- Jeder User-Request → voller Shopware-Render-Cycle (~1s TTFB)
- Bei Traffic-Spikes → Server-Überlastung garantiert

**Impact:** Größtes einzelnes Performance-Problem. TTFB allein macht guten LCP unmöglich.

### 🔴 KRITISCH: Broken Thumbnail/Srcset System

```html
srcset="...pngSlider-Familie_1280px-Breite.png 1920w,
        ...pngSlider-Familie_1280px-Breite.png 800w,
        ...pngSlider-Familie_1280px-Breite.png 400w"
```

**Alle srcset-Einträge zeigen auf DIESELBE Datei!** Shopware Thumbnails sind nicht generiert oder falsch konfiguriert:
- Mobile-User laden das 1920w-Bild (499 KB PNG!) auch auf einem 400px Screen
- **Kein Größen-Vorteil** durch responsive images

### 🔴 KRITISCH: Oversized Images (PNG statt WebP/AVIF)

| Bild | Format | Größe | WebP geschätzt | Ersparnis |
|------|--------|-------|----------------|-----------|
| pngSlider-Familie_1280px-Breite.png | PNG | **499 KB** | ~60 KB | -88% |
| Schliessanlage1000.png | PNG | **763 KB** | ~90 KB | -88% |
| slider-familie-mobil.jpg | JPEG | 164 KB | ~40 KB | -76% |
| 25+ Brand-Logos | PNG | ~5-20 KB each | ~2-5 KB each | -60% |

Cloudflare Polish aktiv aber meldet `format_not_supported` für PNGs → **Kein automatisches WebP!**

### 🔴 Massive JavaScript Payload

**21 separate JS-Dateien** geladen, davon viele unnötig auf allen Seiten:

| Bundle | Uncompressed | Brotli | Benötigt auf Homepage? |
|--------|-------------|--------|----------------------|
| storefront.js | 221 KB | 68 KB | ✅ Ja |
| **moorl-foundation.js** | **312 KB** | **86 KB** | ❓ Teilweise |
| jquery-3.5.1.slim.min.js | 70 KB | 23 KB | ❌ **Render-blocking!** |
| swag-amazon-pay.js | 20 KB | ~6 KB | ❌ Nur Checkout |
| klarna-payment.js | 20 KB | ~6 KB | ❌ Nur Checkout |
| swag-pay-pal.js | 4 KB | ~2 KB | ❌ Nur Checkout |
| pickware-dhl.js | ~10 KB | ~3 KB | ❌ Nie im Frontend |
| neon6-configurator.js | 6 KB | ~2 KB | ❌ Nur Config-Produkte |
| **Gesamt** | **~850 KB** | **~280 KB** | |

**jQuery ist das einzige render-blocking Script** (kein `defer`/`async`)!

### 🟡 Monolithischer CSS-Bundle

| Datei | Uncompressed | Brotli |
|-------|-------------|--------|
| all.css | **679 KB** | 78 KB |
| animate.css | 83 KB (709 Klassen!) | 4 KB |
| **Gesamt** | **762 KB** | **82 KB** |

- `animate.css` hat 709 CSS-Klassen, vermutlich werden <10 genutzt
- CSS wird **nicht** code-split – alle Plugin-Styles in einem Bundle

### 🟡 Font-Overload

**46 woff2-Dateien** referenziert in CSS (Inter font mit allen Varianten):

| Font-Variante | Größe |
|--------------|-------|
| Inter-Regular-Roman.woff2 | 105 KB |
| Inter-SemiBold-Roman.woff2 | 108 KB |
| Inter-Bold-Roman.woff2 | 108 KB |
| Inter-Variable-Roman-Latin.woff2 | 32 KB |
| + 42 weitere Varianten | ~50-110 KB each |

- `font-display: fallback` (20x) und `font-display: swap` (12x) → OK, kein FOIT
- Aber: Cyrillic, Greek, Vietnamese Varianten werden geladen obwohl nur DE/Latin benötigt
- **Keine Preloads** für kritische Fonts!

### 🟡 Oversized HTML Documents

| Seite | HTML-Größe (unkomprimiert) | Brotli |
|-------|---------------------------|--------|
| Homepage | 524 KB | 36 KB |
| Config Product | 494 KB | ~34 KB |
| Simple Product | 331 KB | ~23 KB |

- 13 Inline-Scripts im `<head>` (dataLayer, GTM, Consent, Analytics)
- Viel redundanter SVG-Code (Icons inline statt sprite/symbol)

### 🟡 Fehlende Resource Hints

```html
<!-- FEHLT komplett: -->
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="preload" href="/font/Inter-Regular-Roman.woff2" as="font" crossorigin>
<link rel="preload" href="/css/all.css" as="style">
```

Aktuell: **Null** `preload`, `preconnect`, `dns-prefetch`, oder `prefetch` Tags.

---

## 3. Positive Findings ✅

- ✅ HTTP/2 + HTTP/3 (alt-svc: h3) via Cloudflare
- ✅ Brotli-Kompression aktiv für HTML/CSS/JS
- ✅ HSTS aktiv (max-age=31536000)
- ✅ `loading="lazy"` auf 38 Images, `loading="eager"` auf 11
- ✅ Alle Theme-JS-Dateien haben `defer` (außer jQuery!)
- ✅ Font-Display: fallback/swap (kein unsichtbarer Text)
- ✅ Logo bereits als WebP
- ✅ Security Headers gesetzt (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- ✅ Static Assets haben Cache-Headers (max-age: 14 Tage)

---

## 4. Top 5 Opportunities – Ranked by Impact

### #1: 🔴 Server-Side + Edge Caching einrichten
**Geschätzter Impact: +20-30 Performance-Punkte (TTFB: 1s → 100ms)**

**Problem:** `cache-control: no-cache, private` auf allen Seiten → Cloudflare cached nichts.

**Fix-Optionen (von einfach bis komplex):**

a) **Shopware HTTP Cache aktivieren** (Einfachste Lösung)
   ```
   # .env
   SHOPWARE_HTTP_CACHE_ENABLED=1
   SHOPWARE_HTTP_DEFAULT_TTL=3600
   ```
   → Setzt public Cache-Headers, Cloudflare cached automatisch

b) **Cloudflare Page Rules / Cache Rules**
   ```
   URL: www.mein-schluessel.de/*
   Cache Level: Standard
   Edge TTL: 2 hours
   Browser TTL: 5 minutes
   Bypass: Cookie "session-" contains value (logged in)
   ```

c) **Varnish/Redis Reverse Proxy** vor Shopware
   - Shopware 6 unterstützt Varnish nativ
   - TTFB → <50ms für gecachte Seiten

**Erwartete Verbesserung:**
- TTFB: 1000ms → 50-150ms (Edge Cache Hit)
- LCP: -800ms bis -1500ms
- Performance Score: +20-30 Punkte

---

### #2: 🔴 Image Optimization Pipeline
**Geschätzter Impact: +10-15 Performance-Punkte (LCP: -1-2s)**

**Problem:** PNGs (499-763 KB), kaputte Thumbnails, kein WebP/AVIF.

**Fix (3 Stufen):**

a) **Sofort: Shopware Thumbnails regenerieren**
   ```bash
   bin/console media:generate-thumbnails
   ```
   Und in Settings → Thumbnails korrekte Größen konfigurieren (400, 800, 1920)

b) **WebP-Konvertierung aktivieren**
   - Shopware 6 Plugin: "Frosh WebP" oder "FroshPlatformThumbnailProcessor"
   - Oder: Cloudflare Pro Plan → Polish mit WebP-Konvertierung
   - Oder: Cloudflare Image Resizing (Business Plan)

c) **Slider-Bilder manuell optimieren**
   ```bash
   # Beispiel: 499 KB PNG → ~60 KB WebP
   cwebp -q 80 pngSlider-Familie.png -o slider-familie.webp
   ```

**Erwartete Verbesserung:**
- Slider-LCP-Bild: 499 KB → 60 KB (-88%)
- Gesamte Image-Payload: -70-80%
- LCP: -1000-2000ms
- Mobile Score: +10-15

---

### #3: 🟠 JavaScript Cleanup & Defer
**Geschätzter Impact: +8-12 Performance-Punkte (TBT: -500ms)**

**Problem:** 850 KB JS (280 KB brotli), jQuery render-blocking, Payment-Scripts auf allen Seiten.

**Fixes:**

a) **jQuery `defer` oder entfernen**
   ```html
   <!-- Vorher (render-blocking): -->
   <script src="jquery-3.5.1.slim.min.js"></script>
   
   <!-- Nachher: -->
   <script src="jquery-3.5.1.slim.min.js" defer></script>
   ```
   → Im neon6-configurator Plugin config oder Theme anpassen

b) **Payment-Scripts nur auf Checkout laden**
   - `swag-amazon-pay.js`, `klarna-payment.js`, `swag-pay-pal.js`
   - Shopware 6: `{% block base_script_hmr %}` conditional per route
   - Oder Plugin-Settings: "Load only on checkout"

c) **moorl-foundation.js (312 KB!) analysieren**
   - Prüfen ob moorl-Plugins noch genutzt werden
   - Falls ja: Code-Split oder lazy-load

**Erwartete Verbesserung:**
- TBT: -300-600ms
- FCP: -100-200ms (jQuery defer)
- Mobile Score: +8-12

---

### #4: 🟡 Critical CSS + Resource Hints
**Geschätzter Impact: +5-8 Performance-Punkte (FCP: -500ms)**

**Problem:** 679 KB CSS monolithisch, keine Preloads, keine Preconnects.

**Fixes:**

a) **Preconnect/Preload Tags hinzufügen**
   ```html
   <head>
     <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
     <link rel="preload" href="/theme/.../font/Inter-Regular-Roman.woff2" as="font" type="font/woff2" crossorigin>
     <link rel="preload" href="/theme/.../css/all.css" as="style">
   </head>
   ```

b) **Critical CSS inlinen**
   - Above-the-fold CSS (~15 KB) inline im `<head>`
   - Rest async laden: `<link rel="stylesheet" href="all.css" media="print" onload="this.media='all'">`

c) **Unused CSS entfernen**
   - animate.css: 83 KB für vermutlich <5 genutzte Animationen → PurgeCSS
   - Shopware unused plugin styles

**Erwartete Verbesserung:**
- FCP: -300-500ms
- LCP: -200-400ms
- Mobile Score: +5-8

---

### #5: 🟡 Font Subsetting & Preloading
**Geschätzter Impact: +3-5 Performance-Punkte (FCP: -200ms)**

**Problem:** 46 Font-Dateien referenziert, viele unnötige Sprach-Varianten.

**Fixes:**

a) **Nur Latin-Subset laden**
   - Inter Variable (Latin only): 32 KB statt 105 KB per weight
   - Entferne: Cyrillic, CyrillicExt, Greek, GreekExt, Vietnamese Subsets

b) **Font Preload für kritische Weights**
   ```html
   <link rel="preload" href="/font/Inter-Regular-Roman.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/font/Inter-Bold-Roman.woff2" as="font" type="font/woff2" crossorigin>
   ```

c) **Variable Font statt static fonts**
   - 1 Variable Font File (32 KB Latin) ersetzt 3 Static Files (321 KB)

**Erwartete Verbesserung:**
- Font-Download: 321 KB → 32 KB (-90%)
- FCP: -100-200ms
- CLS: verbessert (schnellerer font-swap)

---

## 5. Quick Wins (< 1 Stunde Aufwand)

| # | Fix | Aufwand | Impact |
|---|-----|---------|--------|
| 1 | Shopware HTTP Cache aktivieren | 5 min | 🔴 Hoch |
| 2 | jQuery `defer` hinzufügen | 10 min | 🟠 Mittel |
| 3 | Preconnect/Preload Tags | 15 min | 🟡 Mittel |
| 4 | Slider-Bilder als WebP re-uploaden | 30 min | 🟠 Mittel |
| 5 | `media:generate-thumbnails` ausführen | 5 min | 🟠 Mittel |

---

## 6. Server & Security Summary

| Check | Status | Anmerkung |
|-------|--------|-----------|
| HTTP/2 | ✅ | Via Cloudflare |
| HTTP/3 | ✅ | `alt-svc: h3=":443"` |
| Brotli | ✅ | HTML, CSS, JS komprimiert |
| HSTS | ✅ | 1 Jahr, includeSubDomains |
| X-Frame-Options | ⚠️ | Doppelt gesetzt (deny + SAMEORIGIN) |
| X-Content-Type-Options | ⚠️ | Doppelt gesetzt |
| Strict-Transport | ⚠️ | Doppelt gesetzt (unterschiedliche max-age) |
| X-Powered-By | ⚠️ | "PleskLin" exposiert → entfernen |
| Cache-Control | 🔴 | `no-cache, private` → Kein Edge-Cache |
| Static Asset Cache | ✅ | 14 Tage für CSS/JS/Images |
| Cloudflare Polish | ⚠️ | Aktiv aber `format_not_supported` für PNGs |
| Service Worker | ❌ | Nicht vorhanden |

---

## 7. Estimated Score After Fixes

| Maßnahme | Mobile Score Delta | Kumulativ |
|----------|-------------------|-----------|
| Ausgangswert | ~30 | 30 |
| +#1 Server Caching | +25 | ~55 |
| +#2 Image Optimization | +12 | ~67 |
| +#3 JS Cleanup | +10 | ~77 |
| +#4 Critical CSS | +7 | ~84 |
| +#5 Font Optimization | +4 | ~88 |
| **Ziel nach allen Fixes** | | **~85-90** |

> Desktop-Scores sind typischerweise 20-30 Punkte höher als Mobile.

---

## 8. Nächste Schritte

1. **Sofort (heute):** Shopware HTTP Cache aktivieren + Thumbnails regenerieren
2. **Diese Woche:** jQuery defer, Preloads, Slider-Bilder als WebP
3. **Diesen Monat:** JS-Bundle-Analyse, Critical CSS, Font Subsetting
4. **PSI erneut messen** nach jeder Änderung: https://pagespeed.web.dev
5. **CrUX-Daten beobachten:** Reale User-Metriken in Search Console → Core Web Vitals Report

---

*Hinweis: PSI API war zum Zeitpunkt des Audits quota-limited (HTTP 429). Die Scores sind konservative Schätzungen basierend auf gemessenen TTFB-Werten, Asset-Größen und Resource-Loading-Patterns. Für exakte Lighthouse-Scores: manuell unter https://pagespeed.web.dev testen.*
