---
name: local-business-analysis
description: "Create comprehensive digital growth strategies for local businesses. Use when analyzing a local business's digital presence, creating a digital strategy document, performing local SEO audits, competitor analysis, or market research for brick-and-mortar businesses. Triggers: 'analyze this business', 'digital strategy for', 'local business analysis', 'SEO audit for', 'Standortanalyse', 'Digitalstrategie', 'Geschäftsanalyse'. Covers: website audit, keyword research, Google Business Profile, social media scan, competitor matrix, market demographics, customer segmentation, content strategy, 90-day action plan, ROI calculation. Output: Professional PDF report."
---

# Local Business Analysis

Create professional digital growth strategies for local businesses. Proven methodology tested on multiple industries (carpentry, nurseries, dental, retail).

**Seller:** Erik Reisig Investment GmbH, Duringstraße 23, 82299 Türkenfeld

## Input Required

| Field | Required | Example |
|-------|----------|---------|
| `business_name` | ✅ | "Baum- und Rosenschule Rudolf Göricke" |
| `website_url` | ✅ | "baumschule-dessau.de" |
| `location` | ✅ | "Dessau-Roßlau, Waldersee" |
| `contact_person` | ✅ | "Christian Göricke" |
| `industry` | ✅ | "Baumschule / Gartencenter" |
| `phone` | Optional | "0340-2160581" |
| `email` | Optional | "info@baumschule-dessau.de" |
| `address` | Optional | "Birnbaumweg 32, 06844 Dessau-Roßlau" |
| `notes` | Optional | "Familienbetrieb seit 1934, Bruder hat Standort in Halle" |

## Workflow

### Phase 1: Research (automated)

1. **Website Audit** — Crawl all pages via `web_fetch`. Assess: page count, tech stack (WordPress/Shopify/static), mobile readiness, broken links, load speed, SSL, meta descriptions, schema markup
2. **Google Visibility** — `web_search` for "[industry] [city]", "[industry] near [city]", "[industry] [region]". Note where business ranks (or doesn't)
3. **Keyword Research** — Search for 15-20 relevant terms. Estimate monthly search volume from Google autocomplete and related searches. Map keywords to intent (transactional, informational, navigational)
4. **Google Business Profile** — Search for the business on Google Maps. Check: review count, average rating, photo count, posting activity, categories, hours, Q&A
5. **Social Media Scan** — Check Instagram, Facebook, TikTok, Pinterest, LinkedIn. Note: follower count, posting frequency, engagement, content quality
6. **Competitor Analysis** — Find 5-6 direct competitors in the area. For each: website quality (1-10), Google reviews, social media presence, content/blog, special services, online shop

Save research to: `projects/{slug}/research/markt-analyse.md`

### Phase 2: Market Analysis

7. **Demographics** — Research city/region population, growth trend, age distribution, homeownership rate (if relevant)
8. **Purchasing Power** — Find Kaufkraftindex or average income for the region. Compare to national average
9. **Catchment Area** — Estimate realistic radius and population reached
10. **Seasonality** — Identify peak/off-peak seasons for the industry. Map to marketing calendar
11. **SWOT Analysis** — Strengths, Weaknesses, Opportunities, Threats based on all research

### Phase 3: Strategy Document

Write the full strategy in Markdown. See `references/strategy-template.md` for structure and tone guidelines.

**Critical rules:**
- Du-Anrede (informal German), personal, direct — like advice from a knowledgeable friend
- Use real data from research, not generic advice
- Include actual competitor names and comparisons
- Provide specific, actionable recommendations (not "improve your SEO")
- Every claim backed by data or observation

Save to: `projects/{slug}/strategy/strategie-{year}.md`

### Phase 4: Generate Deliverables

12. **HTML Version** — Convert to professional, print-ready HTML with inline CSS. See `assets/report-template.html` for base styling. No emojis (wkhtmltopdf can't render them). Use ✓/✗ Unicode or Font Awesome
13. **PDF Generation:**
```bash
wkhtmltopdf --enable-local-file-access \
  --page-size A4 \
  --margin-top 15mm --margin-bottom 15mm \
  --margin-left 15mm --margin-right 15mm \
  strategie-{year}.html strategie-{year}.pdf
```

Save to: `projects/{slug}/strategy/strategie-{year}.pdf`

### Phase 5: Delivery

14. Send PDF to requesting user with key highlights summary (5-6 bullet points)

## Strategy Document Structure

Follow this chapter structure (details in `references/strategy-template.md`):

1. **Executive Summary** — Honest, direct assessment. What's good, what's broken, what's the opportunity
2. **Business Analysis & USPs** — What makes this business special
3. **Market & Catchment Area** — Population, purchasing power, demographics with numbers
4. **Competitor Matrix** — Table comparing 5-6 competitors across: reviews, website, content, social, special services
5. **Digital Foundation** — Honest website/tech audit (score 1-10), GMB status, social media status
6. **Local SEO Strategy** — GMB optimization, review strategy, NAP consistency, local backlinks
7. **Content Marketing** — Blog topics, content calendar, SEO-optimized article ideas
8. **Social Media Strategy** — Platform selection, posting frequency, content formats, hashtags
9. **Heritage/Brand Marketing** — How to leverage history, story, personality as differentiator
10. **Seasonal Marketing** — 12-month marketing calendar aligned to business peaks
11. **90-Day Sprint** — Week-by-week action plan, concrete tasks with effort estimates
12. **Budget & ROI** — Investment breakdown, conservative + realistic revenue projections, payback calculation

## Quality Standards

- Minimum 3,000 words strategy document
- All data sourced from actual research (no fabricated numbers)
- Competitor matrix must include real businesses found during research
- Budget estimates must be realistic for the business size
- ROI calculations must show conservative AND realistic scenarios
- PDF must be professionally formatted and print-ready
