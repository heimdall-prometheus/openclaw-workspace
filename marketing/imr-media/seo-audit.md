# SEO Audit: imr-media.de
**Datum:** 2026-01-31
**Analyst:** Heimdall (Subagent)

---

## Executive Summary

Die Website imr-media.de hat eine **solide technische SEO-Basis**, zeigt aber **kritische Indexierungsprobleme** und Optimierungspotenzial bei Content und lokaler SEO.

### Gesamt-Score: 65/100

| Kategorie | Score | Status |
|-----------|-------|--------|
| Technische SEO | 75/100 | ✅ Gut |
| On-Page SEO | 70/100 | ⚠️ Verbesserungsbedarf |
| Indexierung | 30/100 | 🔴 Kritisch |
| Content | 55/100 | ⚠️ Ausbaufähig |
| Lokale SEO | 80/100 | ✅ Gut |

---

## 1. Technische SEO Analyse

### ✅ Positiv

| Element | Status | Details |
|---------|--------|---------|
| HTTPS | ✅ | Vollständig implementiert |
| Canonical Tags | ✅ | Auf allen geprüften Seiten vorhanden |
| robots.txt | ✅ | Korrekt konfiguriert, Sitemap verlinkt |
| sitemap.xml | ✅ | Vorhanden, 12 URLs gelistet |
| Mobile Viewport | ✅ | `width=device-width, initial-scale=1.0` |
| Schema Markup | ✅ | Organization + LocalBusiness implementiert |
| Bilder Alt-Tags | ✅ | 100% der Bilder haben Alt-Attribute |

### ⚠️ Verbesserungsbedarf

| Element | Issue | Empfehlung |
|---------|-------|------------|
| JavaScript-Rendering | Seiten sind JS-basiert | SSR/Prerendering für bessere Crawlability |
| Page Speed | Nicht gemessen | Lighthouse-Test durchführen |
| Core Web Vitals | Nicht gemessen | Google Search Console prüfen |

---

## 2. On-Page SEO Analyse

### Homepage (imr-media.de)

| Element | Wert | Bewertung |
|---------|------|-----------|
| **Title** | "In Medias Reh - Webdesign Agentur für Ihr Unternehmen \| In Medias Reh" | ⚠️ Duplikat "In Medias Reh", 67 Zeichen |
| **Meta Description** | "Professionelles Webdesign, E-Commerce & Social Media Marketing aus einer Hand. Ihre komplette Webseite in 7 Tagen zum Festpreis ab 1.299 €." | ✅ 142 Zeichen, CTA enthalten |
| **H1** | "Ihre maßgeschneiderte Webseite – direkt, kreativ, erfolgreich." | ✅ 1x H1, klar |
| **H2s** | 5 Stück, gut strukturiert | ✅ |
| **OG Tags** | Vollständig (Title, Desc, Image) | ✅ |
| **Twitter Card** | summary_large_image | ✅ |

### Webdesign-Seite (/webdesign)

| Element | Wert | Bewertung |
|---------|------|-----------|
| **Title** | "Professionelles Webdesign für Ihr Unternehmen \| In Medias Reh" | ✅ 60 Zeichen |
| **Meta Description** | Identisch mit Homepage | 🔴 Dupliziert! |
| **H1** | "Professionelles Webdesign" | ✅ |
| **Schema** | Service-Schema mit Preis | ✅ Sehr gut |

---

## 3. Indexierungsproblem 🔴 KRITISCH

**Ergebnis site:imr-media.de bei Brave Search: 0 Treffer**

### Mögliche Ursachen:
1. Website ist noch relativ neu
2. Nicht in Google Search Console verifiziert
3. JS-Rendering blockiert Crawler
4. Cloudflare Bot-Blocking (robots.txt zeigt viele Disallow)

### Sofortmaßnahmen:
- [ ] Google Search Console einrichten
- [ ] Sitemap manuell einreichen
- [ ] Bing Webmaster Tools einrichten
- [ ] Server-Side Rendering prüfen

---

## 4. Content-Analyse

### Vorhandene Seiten (lt. Sitemap)
1. Homepage
2. /webdesign
3. /ecommerce
4. /social-media
5. /social-media-setup
6. /geschaeftsunterlagen
7. /softwareentwicklung
8. /kontakt
9. /ueber-uns
10. /portfolio
11. /impressum, /datenschutz, /agb

### Content-Gaps
| Fehlendes Element | Empfehlung |
|-------------------|------------|
| Blog/Ratgeber | 🔴 Keine Blog-Sektion vorhanden! |
| FAQ | Sollte pro Service-Seite existieren |
| Case Studies | Portfolio sollte detaillierte Cases haben |
| Testimonials | Kundenbewertungen mit Schema Markup |
| Preisübersicht | Dedizierte Preisseite oder Tabellen |

---

## 5. Schema Markup Analyse

### Implementiert ✅

```json
{
  "@type": "Organization",
  "name": "In Medias Reh - IMR Media",
  "legalName": "JF Invest GmbH",
  "telephone": "+49 1556 333 91 22",
  "email": "info@imr-media.de",
  "address": {
    "streetAddress": "Untere Lettenbergstraße 1",
    "addressLocality": "Diedorf",
    "postalCode": "86420",
    "addressRegion": "Bayern"
  }
}
```

```json
{
  "@type": "LocalBusiness",
  "priceRange": "€€",
  "geo": {
    "latitude": 48.3564,
    "longitude": 10.7842
  },
  "areaServed": "Germany",
  "serviceArea": {"geoRadius": "100000"}
}
```

```json
{
  "@type": "Service",
  "name": "Webdesign",
  "offers": {
    "price": "1299",
    "priceCurrency": "EUR"
  }
}
```

### Fehlend ⚠️
- [ ] BreadcrumbList
- [ ] FAQPage (wenn FAQ erstellt wird)
- [ ] Review/AggregateRating
- [ ] WebSite mit SearchAction

---

## 6. Lokale SEO

### ✅ Gut implementiert
- Vollständige Adresse in Schema
- Geo-Koordinaten vorhanden
- Service-Area definiert (100km Radius)
- Telefonnummer im E.164 Format

### ⚠️ Fehlt
- [ ] Google Business Profile Verlinkung
- [ ] Lokale Keywords in Titles ("Webdesign Augsburg", "E-Commerce Agentur Bayern")
- [ ] Lokale Landing Pages

---

## 7. Wettbewerbsanalyse (Augsburg)

### Hauptkonkurrenten
| Agentur | Stärken |
|---------|---------|
| coalo.de | 2x Agenturpreis, Google Partner |
| imagewunder.de | Gute SEO-Referenzen |
| wydn.de | E-Commerce Spezialist, Shopware |
| codeblick.de | B2B Fokus |
| mxp.digital | Shopware/Magento |

### Differenzierungspotenzial IMR Media
- **Festpreis ab 1.299€** (viele Konkurrenten zeigen keine Preise)
- **7-Tage-Lieferung** (USP!)
- **Kostenloser Entwurf** (Risikofrei-Argument)

---

## 8. Priorisierte Handlungsempfehlungen

### 🔴 Sofort (diese Woche)
1. **Google Search Console einrichten** und Sitemap einreichen
2. **Meta Descriptions differenzieren** - jede Seite braucht unique Description
3. **Lokale Keywords in Titles** - z.B. "Webdesign Augsburg & Bayern | In Medias Reh"

### 🟡 Kurzfristig (2-4 Wochen)
4. **Blog-Sektion erstellen** - Content Marketing starten
5. **FAQ-Sektion** pro Service-Seite mit FAQPage Schema
6. **Testimonials** sammeln und mit Review-Schema einbinden
7. **Lokale Landing Pages** - "/webdesign-augsburg", "/ecommerce-bayern"

### 🟢 Mittelfristig (1-3 Monate)
8. **Regelmäßiger Blog-Content** (2-4 Artikel/Monat)
9. **Backlink-Aufbau** über lokale Verzeichnisse, Gastbeiträge
10. **Google Business Profile** optimieren und verknüpfen

---

## 9. Quick Wins für Server-Implementierung

Falls SSH-Zugang funktioniert, diese Änderungen direkt umsetzen:

### Meta Description Fix (unique pro Seite)

| Seite | Neue Meta Description |
|-------|----------------------|
| /webdesign | "Professionelles Webdesign in Augsburg & Bayern. Ihre Website in 7 Tagen zum Festpreis ab 1.299€. ✓ Responsive ✓ SEO-optimiert ✓ Kostenloser Entwurf" |
| /ecommerce | "Online-Shop erstellen lassen - E-Commerce Agentur Augsburg. Shopify, WooCommerce & mehr. Festpreise ab 2.499€. Jetzt kostenlosen Entwurf anfordern!" |
| /social-media | "Social Media Marketing Augsburg. Wir übernehmen Ihr Social Media - Content, Strategie & Ads. Starten Sie mit einem kostenlosen Beratungsgespräch." |

### Title-Tag Optimierungen

| Seite | Neuer Title |
|-------|-------------|
| Homepage | "Webdesign Agentur Augsburg \| Website in 7 Tagen ab 1.299€ \| IMR Media" |
| /webdesign | "Webdesign Augsburg & Bayern \| Responsive Websites ab 1.299€ \| IMR Media" |
| /ecommerce | "Online-Shop erstellen lassen \| E-Commerce Agentur Augsburg \| IMR Media" |

---

## 10. Dateien auf dem Server

**Git Repo:** `git@github.com:InMediasReh/homepage.git`
**Server Path:** `/var/www/imr-media/IMR_Media-main`
**SSH:** `heimdall@100.67.243.6`

### ⚠️ SSH-Zugang Status

```
SSH-Test: Permission denied (publickey,password)
Status: NICHT MÖGLICH
```

**Manuelle Aktion erforderlich:**
1. SSH-Key für Heimdall auf Server hinzufügen
2. Oder: Änderungen via Git Repository pushen

### Zu prüfende Dateien:
- `src/app/layout.tsx` (Next.js Metadata)
- `src/app/page.tsx` (Homepage)
- `src/app/webdesign/page.tsx`
- `next.config.js` (SEO-relevante Konfiguration)

### Empfohlene Code-Änderungen (für manuelle Implementierung)

**1. Unique Meta Descriptions pro Seite:**
In Next.js App Router, in jeder `page.tsx`:

```typescript
// /webdesign/page.tsx
export const metadata = {
  title: 'Webdesign Augsburg & Bayern | Responsive Websites ab 1.299€ | IMR Media',
  description: 'Professionelles Webdesign in Augsburg & Bayern. Ihre Website in 7 Tagen zum Festpreis ab 1.299€. ✓ Responsive ✓ SEO-optimiert ✓ Kostenloser Entwurf',
  alternates: {
    canonical: 'https://imr-media.de/webdesign',
  },
}
```

**2. Homepage Title optimieren:**
```typescript
// Homepage page.tsx
export const metadata = {
  title: 'Webdesign Agentur Augsburg | Website in 7 Tagen ab 1.299€ | IMR Media',
  // ... rest
}
```

---

*Report erstellt am 2026-01-31 von Heimdall Subagent*
