---
name: mein-schluessel-lager-report
description: Generate monthly Lager & Einkaufsanalyse report for mein-schluessel.de. Use when asked to create, update, or regenerate the inventory/purchasing analysis, stock report, or Lageranalyse for mein-schluessel.de. Covers inventory valuation, turnover, capital productivity, ABC analysis, stock history, reorder alerts, returns, and competitor benchmarking.
---

# mein-schluessel.de Lager & Einkaufsanalyse — Monthly Report

## Overview
Generate a comprehensive inventory and purchasing analysis PDF for mein-schluessel.de (Shopware 6). Output: Markdown report + styled PDF via Playwright.

## Connection
```
SSH_CMD="ssh -i credentials/mein-schluessel/erik_id_ed25519 -o StrictHostKeyChecking=no meinschluesselde@116.202.162.231"
DB_CMD="mysql -h 127.0.0.1 -P 3307 -u mein_schluessel_prod -p'UJHnY5X4ALsy377cnW6HZP5xGrcKetH3' mein_schluessel_prod"
```

## Critical Query Rules (Shopware 6)
1. **Live version only:** `version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')`
2. **German translations:** `language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')`
3. **Parent products only:** `parent_id IS NULL`
4. **Exclude cancelled orders:** JOIN `state_machine_state smst ON o.state_id = smst.id` then `smst.technical_name != 'cancelled'`
5. **Revenue = PAID only:** JOIN `order_transaction ot ON o.id = ot.order_id AND ot.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')` then JOIN `state_machine_state pay_sms ON ot.state_id = pay_sms.id` then `pay_sms.technical_name = 'paid'`. This matches Shopware Analytics exactly.
6. **Exclude Konfigurator:** `pt.name NOT LIKE 'Individuelle Schließanlage%' AND pt.name NOT LIKE 'Individuelle Schliessanlage%'` (870 virtual config products, stock=1 each, not real inventory)
7. **Deduplicate line items:** `GROUP BY li.id` with `MAX(li.total_price)` before summing
8. **Include inactive products** in revenue — products may be deactivated but had historical sales
9. **NO JSON field `o.state_machine_state`** — use JOIN to `state_machine_state` table
10. **NO field `order_customer_id`** — doesn't exist in this Shopware version

## Product Classification (NEW!)
**File:** `projects/mein-schluessel/product-classification.json`
**Doc:** `projects/mein-schluessel/PRODUCT-GROUPS.md`

965 products classified into 8 Warengruppen (L1) and ~60 Produktgruppen (L2):
- `schliesszylinder` — Doppel-, Knauf-, Halb-, Profilzylinder
- `elektronische_schliesstechnik` — E-Zylinder, Transponder, Programmiergeräte, Wandleser, Identmedien
- `einsteckschloesser` — Rohrrahmen-, Zimmer-, Haus-, Panik-, Riegel-
- `tuerbeschlaege` — Schutzbeschläge, Garnituren, Drücker
- `tuertechnik` — Schließer, Öffner, Feststeller, Fluchtweg
- `schloesser_sicherung` — Hang-, Kabel-, Ketten-, Bügel-, Rahmen-, Fahrrad-
- `aufbewahrung_tresore` — Schlüsselboxen, Tresore, Geldkassetten
- `zubehoer_sonstiges` — Schlüssel, Pflege, Vierkantstifte, CTS, Befestigung

### Using Classification in Queries
Load JSON, lookup product_number → warengruppe + produktgruppe. 
For SQL: join classification data after query results (in Python/Node processing step).
Report must show analysis BOTH at Hersteller AND Warengruppe/Produktgruppe level.

## Report Sections (in order)

Run each query via SSH. See `references/queries.md` for all SQL templates.

### 1. Executive Summary
Key KPIs: Total products, products with sales, annual revenue (PAID only), capital tied up (VK), stock/revenue ratio, dead stock count + value.

### 2. Umsatz & Kapitalproduktivität nach Warengruppe (NEW!)
**Primary view: 8 Warengruppen** with revenue, stock value, €/€ productivity, turnover.
For each Warengruppe with >5k€ revenue OR >3k€ stock: drill-down to **Produktgruppen**.
Flag: 🟢 >2.0 €/€, 🟡 1.0-2.0, 🔴 <1.0

### 3. Kapitalproduktivität nach Hersteller
**€ Umsatz / € Lager** per manufacturer, with "Daten seit" column for data quality.
- Include all manufacturers with >500€ annual revenue
- Query first sale date per manufacturer for data quality assessment
- Flag: ✅ Voll (12M+), 🟡 Eingeschränkt (6-12M), ⚠️ Zu kurz (<6M)

### 4. Hersteller × Warengruppe Matrix (NEW!)
For top 10 manufacturers: show revenue split across Warengruppen.
Highlights where a manufacturer has dead stock in one group but strong sales in another (like Salto: Neo Zylinder vs MIFARE Keytags).

### 5. Umschlagshäufigkeit (Turnover Rate)
Units sold (12M) / current positive stock. Flag <1x as 🔴.
**NEW: Show per Warengruppe AND per Hersteller.**

### 6. ABC-Analyse
A: >3k€/year, B: 1-3k€, C: <1k€, Ø: no sales.
**NEW: ABC distribution per Warengruppe** (how many A/B/C/Ø in each group).

### 7. Bestandshistorie (Stock History)
Query SQLite DB: `/var/www/vhosts/mein-schluessel.de/lager-history.db`
```sql
SELECT article_nr, date, stock FROM stock_history WHERE article_nr = ? ORDER BY date DESC LIMIT 365
```
Show OOS rates, trends, batch patterns for top sellers.

### 8. Reichweite-Analyse (Weeks of Supply)
Current stock / weekly sales rate. Flag <4 weeks as 🔴 SOFORT bestellen.

### 9. Ladenhüter nach Warengruppe (Dead Stock, enhanced)
Active products with stock >0 but zero sales in 12M.
**NEW: Grouped by Warengruppe** with subtotals. Top 5 per group by VK value.

### 10. Strategische Empfehlungen
Sofort / Kurzfristig / Mittelfristig actions based on data.
**NEW: Per-Warengruppe recommendations** where applicable.

### 11. Retouren-Analyse (Returns)
Query delivery states "Retour" + "Teilretour". Calculate return rate and value per manufacturer.

## PDF Generation Pipeline

### Step 1: Write Markdown
Save to `projects/mein-schluessel/LAGER-ANALYSE.md`

### Step 2: Convert to HTML
Run: `python3 scripts/md-to-html.py` (resolves relative to skill dir)
- Input: `projects/mein-schluessel/LAGER-ANALYSE.md`
- Output: `/tmp/lager-analyse.html`
- Uses `markdown` Python lib with `tables` + `fenced_code` extensions

### Step 3: Generate PDF via Playwright
```bash
cd /tmp && python3 -m http.server 8766 &
sleep 1
node skills/mein-schluessel-lager-report/scripts/gen-pdf.js
pkill -f "http.server 8766"
```
Output: `projects/mein-schluessel/Lager-Einkaufsanalyse-YYYY-MM.pdf`

## Quality Checklist
Before sending to Erik:
- [ ] All revenue figures cross-checked (total must match SUM of all manufacturers)
- [ ] Konfigurator products excluded (870 parents)
- [ ] "12M" replaced with actual date range (e.g., "Feb 2025 – Jan 2026")
- [ ] No "Erstellt von" attribution
- [ ] Each manufacturer has "Daten seit" for data quality assessment
- [ ] Negative stock explained (UserSoft intentional, is_closeout=0)
- [ ] VK-based values noted (real EK = 40-60% of VK)

## Delivery
- Erik only (Telegram 1424138659) — he is gatekeeper for Uwe Becker
- German language
- PDF attachment with brief summary caption
