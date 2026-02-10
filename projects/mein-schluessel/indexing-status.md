# mein-schluessel.de — Indexing Status Report

**Date:** 2026-02-09 17:12 UTC  
**Checked by:** Automated indexing audit

---

## 1. Sitemap Ping Results

| Engine | Endpoint | Status |
|--------|----------|--------|
| **Google** | `google.com/ping?sitemap=...` | ⚠️ **DEPRECATED** — Google retired sitemap ping in June 2023. Returns 404. Google now discovers sitemaps solely via robots.txt and Google Search Console. |
| **Bing** | `bing.com/ping?sitemap=...` | ✅ Pinged (no error response) |

### Action Required — Google
Since Google's sitemap ping is deprecated, ensure:
- `robots.txt` includes `Sitemap: https://www.mein-schluessel.de/sitemap.xml`
- Sitemap is submitted in Google Search Console
- Use the URL Inspection API or manual "Request Indexing" for priority pages

---

## 2. Sitemap Analysis

The sitemap index contains **4 gzipped sitemap files**:

| Sitemap | URL Count |
|---------|-----------|
| sitemap-1 | 49,999 |
| sitemap-2 | 49,999 |
| sitemap-3 | 49,999 |
| sitemap-4 | 22,734 |
| **Total** | **172,731** |

**Last modified:** 2026-02-09T17:12:12+00:00 (freshly generated!)

### ⚠️ CRITICAL: Massive URL Count
172K+ URLs is extremely high for a security hardware shop. The bulk consists of **product variant SKUs** (e.g., hundreds of RS8-Knaufzylinder variants differing only by dimension codes). This is a **significant indexing problem**:
- Google's crawl budget is finite — most of these will never get indexed
- Thin/duplicate content risk (identical product descriptions, just different SKU)
- Dilutes crawl priority from important category & landing pages

---

## 3. Search Engine Visibility (via Brave Search `site:` operator)

### General Indexing
| Query | Results Found | Notes |
|-------|--------------|-------|
| `site:mein-schluessel.de` | **10 results returned** (Brave limit) | Homepage, categories, key pages visible |
| `site:mein-schluessel.de "kaufen"` | **10 results** | Good — CTA keyword present in many indexed pages |
| `site:mein-schluessel.de intitle:"mein-schluessel.de"` | **0 results** | Brand name not in page titles (OK — they use "Mein Schlüssel" instead) |

### Key Pages Confirmed Indexed
- ✅ Homepage (`/`)
- ✅ Sicherheitstechnik category (`/sicherheitstechnik/`)
- ✅ Schlüsselaufbewahrung (`/sicherheitstechnik/schluesselaufbewahrung/`)
- ✅ Schlüsselrohlinge (`/sicherheitstechnik/schluesselrohlinge/`)
- ✅ Einsteckschlösser (`/sicherheitstechnik/einsteckschloesser/`)
- ✅ Schlüsselschränke (`/sicherheitstechnik/schluesselaufbewahrung/schluesselschraenke/`)
- ✅ Angebote (`/angebote/`)
- ✅ Schließanlagen-Designer (`/schliessanlagen-designer`)
- ✅ Über uns (`/shop-service/ueber-uns/`)

---

## 4. Key Product Pages — Indexing Status

### DOM ix Twido ✅ EXCELLENT
| Page | Indexed? |
|------|----------|
| Schließsystem DOM ix Twido (category) | ✅ |
| DOM ix Twido Doppelzylinder | ✅ |
| DOM ix Twido Halbzylinder | ✅ |
| DOM ix Twido Knaufzylinder | ✅ |
| Individuelle Schließanlage DOM ix Twido (multiple configs) | ✅ (6H2H3, KA2DI, CIEID, A2VER, BHD70) |
| DOM Hersteller page | ✅ |

**Verdict:** DOM ix Twido is very well indexed — category page, individual products, AND custom Schließanlage configurations all appearing.

### Individuelle Schließanlage ✅ GOOD
| Page | Indexed? |
|------|----------|
| Schließanlagen-Designer | ✅ |
| Schließanlage Konfigurator | ✅ |
| Händler-Zugang | ✅ |
| Multiple individual config pages | ✅ |

### SimonsVoss ✅ EXCELLENT
| Page | Indexed? |
|------|----------|
| SimonsVoss Hersteller page | ✅ |
| SimonsVoss Schließsysteme (category) | ✅ |
| SimonsVoss Aktiv-Technologie | ✅ |
| SimonsVoss Transponder (category) | ✅ |
| SimonsVoss Transponder 3064 G2 | ✅ |
| SimonsVoss Transponder TRA2.G2.ROT | ✅ |
| SimonsVoss SmartRelais 3063 | ✅ |
| SimonsVoss MobileKey Starter-Set | ✅ |
| SimonsVoss SmartBridge MobileKey | ✅ |
| SimonsVoss Digitaler Schließzylinder 3061 | ✅ |

**Verdict:** SimonsVoss has outstanding indexing — 10+ pages found including categories, products, and brand pages.

---

## 5. Identified Gaps & Issues

### 🔴 Critical: Crawl Budget Waste from 172K Product Variant URLs
- The sitemap contains ~172,000 URLs, but the vast majority are trivial product variants (same product, different dimensions)
- Google will likely only index a fraction of these
- **Risk:** Important pages (landing pages, categories, blog) get deprioritized

### 🟡 Medium: Google Sitemap Ping Deprecated
- The old `google.com/ping` method no longer works
- Must rely on Google Search Console + robots.txt for sitemap discovery

### 🟡 Medium: No Blog/Content Marketing Pages Visible
- No blog articles or informational content appeared in search results
- Content marketing pages (guides, comparisons, how-tos) would improve organic reach

### 🟢 Low: Brand Name in Titles
- "Mein Schlüssel" appears in titles (good), but the domain form "mein-schluessel.de" does not appear in `intitle:` searches
- This is actually fine — the brand is consistent

---

## 6. Recommendations

### Immediate Actions
1. **Verify sitemap in Google Search Console** — Don't rely on ping; submit sitemap directly
2. **Check robots.txt** has `Sitemap: https://www.mein-schluessel.de/sitemap.xml`
3. **Submit key pages via URL Inspection** in Google Search Console for priority crawling

### Short-term (1-2 weeks)
4. **Reduce sitemap bloat** — Consider splitting into:
   - `sitemap-categories.xml` (~50-100 URLs) — HIGH priority
   - `sitemap-products.xml` (~2,000-5,000 core products) — MEDIUM priority
   - `sitemap-variants.xml` (remaining SKU variants) — LOW priority
5. **Add `<priority>` differentiation** — Currently all URLs have priority 0.5; categories should be 0.8-1.0
6. **Use canonical URLs** for product variants that share the same description page

### Medium-term (1-3 months)
7. **Create informational content** (blog, guides, FAQs) targeting keywords like:
   - "Schließanlage planen"
   - "Schließzylinder Länge messen"
   - "SimonsVoss vs. SALTO Vergleich"
   - "Sicherheitsstufen Schließzylinder"
8. **Add structured data** (Product schema, FAQ schema) to improve SERP appearance
9. **Build internal linking** from category pages to key products

### Long-term
10. **Monitor in Google Search Console** — Track Coverage report for indexed vs. excluded pages
11. **Consider IndexNow** (bing.com/indexnow) for instant Bing/Yandex notification
12. **Set up regular indexing audits** (monthly)

---

## Summary

| Metric | Status |
|--------|--------|
| **Sitemap URLs** | 172,731 (⚠️ very high — mostly product variants) |
| **Key categories indexed** | ✅ Yes |
| **DOM ix Twido indexed** | ✅ Excellent |
| **Individuelle Schließanlage indexed** | ✅ Good |
| **SimonsVoss indexed** | ✅ Excellent |
| **Google sitemap ping** | ❌ Deprecated |
| **Bing sitemap ping** | ✅ Sent |
| **Content/blog pages** | ❌ Not found |
| **Overall health** | 🟡 **Good for products, needs content strategy & sitemap optimization** |
