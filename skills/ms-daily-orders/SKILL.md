---
name: ms-daily-orders
description: "Daily order report for mein-schluessel.de (Shopware 6). Use when asked about orders, sales, revenue, Bestellungen, Umsatz, or Tagesreport for mein-schluessel.de. Covers order count, net/gross revenue, product breakdown with quantities."
---

# mein-schluessel.de Daily Orders Report

## Quick Use

```bash
bash skills/ms-daily-orders/scripts/daily-orders.sh [YYYY-MM-DD]
```

Default: yesterday. Output: summary (count, net, gross, avg) + product list sorted by revenue.

## Formatting for Erik

Erik wants:
- **IMMER NETTO** — keine Brutto-Werte im Bericht! (Erik-Anweisung 2026-02-08)
- **Anzahl Bestellungen**, **Gesamt netto**, **Ø pro Bestellung**
- **Produkte mit Menge und Netto-Umsatz**, sortiert nach Umsatz absteigend
- Top-Seller Highlight + kurze Einordnung (z.B. Anteil SimonsVoss am Tagesumsatz)
- **NICHT:** Kundennamen, Status pro Bestellung, Brutto-Werte

## DB Details

- **Server:** 116.202.162.231 (SSH key: `credentials/mein-schluessel/erik_id_ed25519`, user: `meinschluesselde`)
- **DB:** mysql 127.0.0.1:3307, user `mein_schluessel_prod`
- **Live version_id:** `0x0FA91CE3E96A4BC2BE4BD9CE752C3425`
- **Deduplicate:** Always filter by live version_id to avoid duplicate rows
- **Exclude:** `smst.technical_name != 'cancelled'`
- **Line items:** `oli.type = 'product'` (skip promotions/shipping)

## Date Ranges

For multi-day reports, adjust the WHERE clause:
- Week: `WHERE o.order_date_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`
- Month: `WHERE MONTH(o.order_date_time) = X AND YEAR(o.order_date_time) = Y`
