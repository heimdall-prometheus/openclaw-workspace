# Shop Analysis Project

**Ziel:** 10.000 deutsche E-Commerce Shops analysieren

## Datenstruktur pro Shop

```json
{
  "url": "example-shop.de",
  "tech": {
    "platform": "shopware6|shopware5|woocommerce|magento|shopify|prestashop|other",
    "ssl": true,
    "mobile_friendly": true,
    "performance_score": 75
  },
  "business": {
    "branche": "fashion|electronics|home|food|...",
    "product_count_estimate": "small|medium|large",
    "payment_providers": ["paypal", "klarna", "stripe"],
    "has_blog": false,
    "social_links": ["instagram", "facebook"]
  },
  "contact": {
    "email": "info@example.de",
    "phone": "+49...",
    "impressum_complete": true
  },
  "signals": {
    "outdated_tech": true,
    "migration_candidate": true,
    "growth_potential": "high"
  },
  "approach_angles": ["sw5-migration", "performance", "mobile"]
}
```

## Sub-Agent Aufteilung

- Agent 1-3: Shop-URLs sammeln (verschiedene Quellen)
- Agent 4-6: Tech-Stack Detection
- Agent 7-9: Business & Contact Extraction
- Agent 10: Aggregation & Scoring

## Quellen für Shop-Listen
- Google "site:*.de inurl:shop"
- Branchenverzeichnisse
- IHK Listen
- Handelsregister
- Trusted Shops Verzeichnis
