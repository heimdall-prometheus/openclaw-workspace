# Strategy Document Template & Tone Guide

## Tone & Voice

**Language:** German (Du-Anrede)
**Style:** Direct, honest, personal — like a knowledgeable friend giving advice over coffee. NOT corporate consulting speak.

### Do:
- "Lass mich direkt sein: Deine Website ist aus 2005."
- "Deine Kunden lieben dich — 4,8 Sterne. Das Problem: Zu wenige finden dich."
- "Dehner hat im März aufgemacht, 8 km entfernt. Das ist deine größte Bedrohung."

### Don't:
- "Im Rahmen unserer Analyse konnten wir feststellen..."
- "Es wird empfohlen, die digitale Präsenz zu optimieren..."
- "Die Implementierung einer SEO-Strategie könnte vorteilhaft sein..."

## Chapter Templates

### 1. Executive Summary (~500 words)

Start with a personal hook. Acknowledge what's good FIRST, then the honest problem, then the opportunity.

```
{Name}, lass mich direkt sein.

[What's great about the business — 2-3 sentences]

**Das Problem:** [Core digital weakness — 1-2 sentences]

[Market opportunity with numbers]

**Was diese Strategie erreichen soll:**
- [Metric 1: e.g., "+30% mehr Website-Besucher in 3 Monaten"]
- [Metric 2: e.g., "Top 3 bei Google für '[keyword]'"]
- [Metric 3: e.g., "50+ Google-Bewertungen bis Ende 2026"]
- [Metric 4: e.g., "Instagram von X auf Y Follower"]

Das Gesamtbudget: **X.000–Y.000 €** im ersten Jahr.
Erwarteter Zusatzumsatz: **XX.000–YY.000 €**.
```

### 2. Business Analysis & USPs

| Section | Content |
|---------|---------|
| Company data | Name, address, phone, email, founded, employees (est.) |
| Offering | Core products/services, specializations |
| USPs | 4-6 unique selling points (what competitors can't copy) |
| Current customers | Who buys, why, average order value if estimable |

Highlight heritage ("Seit 19XX"), unique capabilities (own production, showroom), and personal touch (owner as brand).

### 3. Market & Catchment Area

Must include:
- City/region population
- Population trend (growing/shrinking)
- Purchasing power index (vs national average)
- Catchment radius + total reachable population
- Relevant demographics (homeowners, age groups, income)

Use tables for data. Source Bertelsmann Stiftung (wegweiser-kommune.de), Statistisches Bundesamt, or IHK.

### 4. Competitor Matrix

Table format:

| Competitor | Distance | Google ⭐ | Reviews | Website | Blog | Social | Special |
|------------|----------|-----------|---------|---------|------|--------|---------|
| Name 1 | X km | 4.2 | ~50 | Gut | Nein | FB 500 | Online-Shop |
| Name 2 | X km | 3.8 | ~20 | Veraltet | Nein | - | - |
| **Target** | - | X.X | ~XX | [Score] | Nein | IG XXX | [Strength] |

After table: 2-3 paragraphs analyzing competitive position.

### 5. Digital Foundation

Score each area 1-10:

| Area | Score | Assessment |
|------|-------|------------|
| Website | X/10 | [Specific findings] |
| Google Business | X/10 | [Review count, photos, activity] |
| Instagram | X/10 | [Followers, frequency, quality] |
| Facebook | X/10 | [Likes, engagement] |
| SEO | X/10 | [Rankings, meta tags, structure] |
| **Overall** | **X/10** | [Summary] |

### 6-8. Strategy Chapters

For each strategy chapter:
1. Current state (what exists now)
2. Target state (where we want to be in 3/6/12 months)
3. Specific actions (not generic advice)
4. Effort estimate per action
5. Expected impact

### 9. Heritage/Brand Marketing

Only if business has history (>10 years). Leverage:
- Founding story, family tradition
- "Seit [year]" as trust signal
- Owner as personal brand
- Cross-marketing with related businesses

### 10. Seasonal Marketing

12-month calendar format:

| Monat | Saison | Marketing-Fokus | Aktion |
|-------|--------|----------------|--------|
| Jan | Nebensaison | Planung & Content | Blog-Artikel vorbereiten |
| Feb | Vorbereitung | Social Media Push | Frühlings-Vorschau |
| Mär | HAUPTSAISON | Vollgas | Google Ads, tägliche Posts |
| ... | | | |

### 11. 90-Day Sprint

Week-by-week breakdown:

**Woche 1-2: Foundation**
- [ ] Task 1 (X Stunden)
- [ ] Task 2 (X Stunden)
Geschätzter Aufwand: XX Stunden

**Woche 3-4: Content**
...

### 12. Budget & ROI

Two tables:

**Investment:**
| Position | Kosten |
|----------|--------|
| Item 1 | €XXX |
| Item 2 | €XXX |
| **Gesamt** | **€X.XXX** |

**Return:**
| Szenario | Zusatzumsatz | ROI |
|----------|-------------|-----|
| Konservativ | €XX.000 | X.Xx |
| Realistisch | €XX.000 | X.Xx |

Always explain the math behind ROI (additional inquiries × conversion rate × average order value).

## HTML/PDF Formatting Rules

- Professional color scheme matching the business (green for garden, wood tones for carpentry, etc.)
- No emojis in HTML/PDF (wkhtmltopdf cannot render them)
- Use ✓ / ✗ Unicode characters or text for checkmarks
- Tables with alternating row colors
- Page breaks before major chapters: `page-break-before: always`
- Header with business name + "Digitale Wachstumsstrategie {year}"
- Footer with "Erstellt von Erik Reisig Investment GmbH | {date}"
- Print-optimized (A4, proper margins)
