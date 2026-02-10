# SQL Query Templates — mein-schluessel.de Lager Report

All queries via SSH: `$SSH_CMD "$DB_CMD -e \"...\""` 

Replace `DATE_SUB(NOW(), INTERVAL 12 MONTH)` with appropriate range.

## 1. Revenue per Manufacturer (Annual, deduplicated)
```sql
SELECT COALESCE(pmt.name, 'Ohne') AS hersteller, ROUND(SUM(sales.umsatz), 0) AS total
FROM (
  SELECT li.id, COALESCE(prod.parent_id, li.product_id) AS parent_id, MAX(li.total_price) AS umsatz
  FROM order_line_item li
  JOIN `order` o ON o.id = li.order_id AND o.version_id = li.order_version_id
  JOIN state_machine_state sms ON sms.id = o.state_id
  JOIN state_machine_state_translation smst ON smst.state_machine_state_id = sms.id 
    AND smst.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
  JOIN product prod ON prod.id = li.product_id AND prod.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
  WHERE li.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
    AND li.type = 'product' AND smst.name != 'Abgebrochen'
    AND o.order_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
  GROUP BY li.id
) sales
JOIN product p ON p.id = sales.parent_id AND p.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
JOIN product_translation pt ON pt.product_id = p.id 
  AND pt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b') 
  AND pt.product_version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
LEFT JOIN product_manufacturer_translation pmt ON pmt.product_manufacturer_id = p.product_manufacturer_id 
  AND pmt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
WHERE pt.name NOT LIKE 'Individuelle Schließanlage%' 
  AND pt.name NOT LIKE 'Individuelle Schliessanlage%'
GROUP BY pmt.name ORDER BY total DESC;
```

## 2. Inventory Valuation per Manufacturer (VK)
```sql
SELECT COALESCE(pmt.name, 'Ohne') AS hersteller,
  COUNT(*) AS parents,
  SUM(CASE WHEN p.stock > 0 THEN p.stock ELSE 0 END) AS bestand_stk,
  ROUND(SUM(CASE WHEN p.stock > 0 THEN p.stock * 
    JSON_UNQUOTE(JSON_EXTRACT(pp.price, '$[0].gross')) ELSE 0 END), 0) AS bestandswert_vk
FROM product p
JOIN product_translation pt ON pt.product_id = p.id 
  AND pt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b') 
  AND pt.product_version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
LEFT JOIN product_manufacturer_translation pmt ON pmt.product_manufacturer_id = p.product_manufacturer_id 
  AND pmt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
WHERE p.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
  AND p.parent_id IS NULL
  AND pt.name NOT LIKE 'Individuelle Schließanlage%'
  AND pt.name NOT LIKE 'Individuelle Schliessanlage%'
GROUP BY pmt.name ORDER BY bestandswert_vk DESC;
```
**Note:** Price JSON key may be currency-based: `$.cb7d2554b0ce847cd82f3ac9bd1c0dfca.gross` — verify with `SELECT price FROM product LIMIT 1`.

## 3. Turnover (Units sold / Stock)
```sql
SELECT COALESCE(pmt.name, 'Ohne') AS hersteller,
  SUM(sales.qty) AS verkauft_12m,
  SUM(CASE WHEN p.stock > 0 THEN p.stock ELSE 0 END) AS bestand,
  ROUND(SUM(sales.qty) / NULLIF(SUM(CASE WHEN p.stock > 0 THEN p.stock ELSE 0 END), 0), 1) AS umschlag
FROM (
  SELECT COALESCE(prod.parent_id, li.product_id) AS parent_id, SUM(li.quantity) AS qty
  FROM order_line_item li
  JOIN `order` o ON o.id = li.order_id AND o.version_id = li.order_version_id
  JOIN state_machine_state sms ON sms.id = o.state_id
  JOIN state_machine_state_translation smst ON smst.state_machine_state_id = sms.id 
    AND smst.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
  JOIN product prod ON prod.id = li.product_id AND prod.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
  WHERE li.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
    AND li.type = 'product' AND smst.name != 'Abgebrochen'
    AND o.order_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
  GROUP BY COALESCE(prod.parent_id, li.product_id)
) sales
JOIN product p ON p.id = sales.parent_id AND p.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
JOIN product_translation pt ON pt.product_id = p.id 
  AND pt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b') 
  AND pt.product_version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
LEFT JOIN product_manufacturer_translation pmt ON pmt.product_manufacturer_id = p.product_manufacturer_id 
  AND pmt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
WHERE pt.name NOT LIKE 'Individuelle Schließanlage%'
GROUP BY pmt.name ORDER BY umschlag DESC;
```

## 4. Dead Stock (stock > 0, zero sales 12M)
```sql
SELECT pt.name, COALESCE(pmt.name,'Ohne') AS hersteller, p.stock, 
  ROUND(p.stock * JSON_UNQUOTE(JSON_EXTRACT(pp.price, '$[0].gross')), 2) AS wert_vk
FROM product p
JOIN product_translation pt ON pt.product_id = p.id 
  AND pt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b') 
  AND pt.product_version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
LEFT JOIN product_manufacturer_translation pmt ON pmt.product_manufacturer_id = p.product_manufacturer_id 
  AND pmt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
WHERE p.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
  AND p.parent_id IS NULL AND p.active = 1 AND p.stock > 0
  AND pt.name NOT LIKE 'Individuelle Schließanlage%'
  AND p.id NOT IN (
    SELECT DISTINCT COALESCE(prod.parent_id, li.product_id)
    FROM order_line_item li
    JOIN `order` o ON o.id = li.order_id AND o.version_id = li.order_version_id
    JOIN state_machine_state sms ON sms.id = o.state_id
    JOIN state_machine_state_translation smst ON smst.state_machine_state_id = sms.id 
      AND smst.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
    JOIN product prod ON prod.id = li.product_id AND prod.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
    WHERE li.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
      AND li.type = 'product' AND smst.name != 'Abgebrochen'
      AND o.order_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
  )
ORDER BY wert_vk DESC LIMIT 30;
```

## 5. Returns per Manufacturer
```sql
SELECT COALESCE(pmt.name, 'Ohne') AS hersteller,
  COUNT(DISTINCT o.id) AS orders_total,
  COUNT(DISTINCT CASE WHEN odst.name IN ('Retour','Teilretour') THEN o.id END) AS retouren,
  ROUND(COUNT(DISTINCT CASE WHEN odst.name IN ('Retour','Teilretour') THEN o.id END) 
    / COUNT(DISTINCT o.id) * 100, 1) AS retour_quote
FROM order_line_item li
JOIN `order` o ON o.id = li.order_id AND o.version_id = li.order_version_id
JOIN state_machine_state sms ON sms.id = o.state_id
JOIN state_machine_state_translation smst ON smst.state_machine_state_id = sms.id 
  AND smst.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
JOIN order_delivery od ON od.order_id = o.id AND od.order_version_id = o.version_id
JOIN state_machine_state ods ON ods.id = od.state_id
JOIN state_machine_state_translation odst ON odst.state_machine_state_id = ods.id 
  AND odst.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
JOIN product prod ON prod.id = li.product_id AND prod.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
JOIN product p ON p.id = COALESCE(prod.parent_id, prod.id) AND p.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
JOIN product_translation pt ON pt.product_id = p.id 
  AND pt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b') 
  AND pt.product_version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
LEFT JOIN product_manufacturer_translation pmt ON pmt.product_manufacturer_id = p.product_manufacturer_id 
  AND pmt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
WHERE li.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
  AND li.type = 'product' AND smst.name != 'Abgebrochen'
  AND o.order_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
  AND pt.name NOT LIKE 'Individuelle Schließanlage%'
GROUP BY pmt.name HAVING orders_total >= 10 ORDER BY retour_quote DESC;
```

## 6. Data Quality (First Sale per Manufacturer)
```sql
SELECT COALESCE(pmt.name, 'Ohne') AS hersteller,
  MIN(o.order_date) AS erster_verkauf,
  DATEDIFF(NOW(), MIN(o.order_date)) AS tage_im_sortiment,
  CASE 
    WHEN DATEDIFF(NOW(), MIN(o.order_date)) >= 365 THEN 'Vollständig (12M+)'
    WHEN DATEDIFF(NOW(), MIN(o.order_date)) >= 180 THEN 'Eingeschränkt (6-12M)'
    ELSE 'Zu kurz (<6M)'
  END AS datenqualitaet
FROM order_line_item li
JOIN `order` o ON o.id = li.order_id AND o.version_id = li.order_version_id
JOIN state_machine_state sms ON sms.id = o.state_id
JOIN state_machine_state_translation smst ON smst.state_machine_state_id = sms.id 
  AND smst.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
JOIN product prod ON prod.id = li.product_id AND prod.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
JOIN product p ON p.id = COALESCE(prod.parent_id, prod.id) AND p.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
JOIN product_translation pt ON pt.product_id = p.id 
  AND pt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b') 
  AND pt.product_version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
LEFT JOIN product_manufacturer_translation pmt ON pmt.product_manufacturer_id = p.product_manufacturer_id 
  AND pmt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
WHERE li.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
  AND li.type = 'product' AND smst.name != 'Abgebrochen'
  AND pt.name NOT LIKE 'Individuelle Schließanlage%'
GROUP BY pmt.name ORDER BY erster_verkauf DESC;
```

## 7. Stock History (SQLite on server)
```bash
$SSH_CMD "sqlite3 /var/www/vhosts/mein-schluessel.de/lager-history.db \"
  SELECT article_nr, date, stock 
  FROM stock_history 
  WHERE article_nr = 'SV-TRA2.G2' 
  ORDER BY date DESC LIMIT 30;
\""
```

## 8. Weeks of Supply (Top Sellers)
```sql
-- Combine current stock with weekly sales rate
SELECT pt.name, p.stock AS bestand,
  ROUND(SUM(li.quantity) / 52, 1) AS stk_pro_woche,
  ROUND(p.stock / NULLIF(SUM(li.quantity) / 52, 0), 1) AS wochen_reichweite
FROM product p
JOIN product_translation pt ON pt.product_id = p.id 
  AND pt.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b') 
  AND pt.product_version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
JOIN product prod ON (prod.parent_id = p.id OR prod.id = p.id) 
  AND prod.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
JOIN order_line_item li ON li.product_id = prod.id 
  AND li.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425') AND li.type = 'product'
JOIN `order` o ON o.id = li.order_id AND o.version_id = li.order_version_id
JOIN state_machine_state sms ON sms.id = o.state_id
JOIN state_machine_state_translation smst ON smst.state_machine_state_id = sms.id 
  AND smst.language_id = UNHEX('2fbb5fe2e29a4d70aa5854ce7ce3e20b')
WHERE p.version_id = UNHEX('0fa91ce3e96a4bc2be4bd9ce752c3425')
  AND p.parent_id IS NULL AND p.stock > 0
  AND smst.name != 'Abgebrochen'
  AND o.order_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY p.id HAVING stk_pro_woche > 0.5
ORDER BY wochen_reichweite ASC LIMIT 20;
```
