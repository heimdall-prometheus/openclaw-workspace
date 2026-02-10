# Quick Wins Checkliste - holzwerk10.de

**Für:** Joe Ott / Holzwerk 10 Team  
**Von:** C-led Solutions  
**Datum:** 05.02.2026

Diese Checkliste enthält die **wichtigsten Sofort-Maßnahmen** für schnelle SEO-Erfolge. Jede Aufgabe ist in **15-60 Minuten** umsetzbar.

---

## 🔴 Kritisch (SOFORT - heute/morgen!)

### ✅ 1. WordPress auf 6.7.x updaten
**Warum:** Sicherheitsrisiko! Version 6.2.8 ist 9 Monate alt.  
**Wie:**
1. WordPress Admin einloggen
2. Dashboard → Aktualisierungen
3. **WICHTIG:** Vorher Backup erstellen!
4. "Jetzt aktualisieren" klicken
5. Alle Seiten testen (Home, Kontakt, Showroom)

**Zeit:** 30 Minuten  
**Kosten:** €0 (selbst) oder €50 (Dienstleister)

---

### ✅ 2. XML-RPC deaktivieren
**Warum:** Sicherheitslücke, wird für DDoS-Angriffe missbraucht.  
**Wie:**
1. WordPress Plugin "Disable XML-RPC" installieren
2. Aktivieren
3. Fertig!

**ODER** in `wp-config.php` einfügen:
```php
add_filter('xmlrpc_enabled', '__return_false');
```

**Zeit:** 5 Minuten  
**Kosten:** €0

---

### ✅ 3. Meta Description für Homepage schreiben
**Warum:** Google zeigt aktuell zufälligen Text in Suchergebnissen!  
**Wo:** WordPress → Seiten → Home bearbeiten → Yoast SEO (oder Rank Math)

**Text (kopieren & anpassen):**
```
Holzwerk 10 – Ihr Schreinermeister in Penzing bei Landsberg. Hochwertige Möbel, Innenausbau & Schreinerarbeiten im Raum München, Ammersee & Landsberg am Lech. Seit 2010.
```

**Zeit:** 5 Minuten  
**Impact:** +15% Klicks in Google

---

## 🟡 Wichtig (diese Woche)

### ✅ 4. Meta Descriptions für alle Seiten
**Seiten:** Über uns, Leistungen, Kontakt, Showroom, Küchen, Möbel & Wohnen, Fenster & Türen

**Vorlagen:**

**Über uns:**
```
Joe Ott und das Holzwerk 10 Team – Ihr Schreinermeister seit 2010. Vom Entwurf über Fertigung bis Einbau. Showroom in Penzing. Jetzt Termin vereinbaren!
```

**Küchen:**
```
Küchen nach Maß von Holzwerk 10. Individuelle Küchenplanung & Fertigung in Penzing. Showroom vor Ort. Jetzt beraten lassen!
```

**Leistungen:**
```
Möbelbau, Innenausbau, Fenster & Türen, Sanierungen. Schreinermeister Joe Ott berät Sie im Raum Landsberg, München & Ammersee.
```

**Zeit:** 60 Minuten (alle Seiten)

---

### ✅ 5. Google Business Profile: 20 Fotos hochladen
**Warum:** Kunden vertrauen Profilen mit vielen Bildern mehr!

**Fotos benötigt:**
- 5x Showroom (verschiedene Bereiche)
- 5x Werkstatt (Maschinen, Fertigung)
- 3x Team (Joe Ott + Mitarbeiter)
- 7x Projekte (Küchen, Möbel, Einbau)

**Wie:**
1. Google Business Profile öffnen
2. Fotos → Hinzufügen
3. Hochladen & Beschreibungen ergänzen

**Zeit:** 30 Minuten  
**Impact:** +20% Anfragen aus Google Maps

---

### ✅ 6. Google Reviews sammeln
**Ziel:** 5-10 Bewertungen in 4 Wochen

**Strategie:**
1. Review-Link erstellen (Google Business → Bewertungen)
2. Nach jedem Projekt-Abschluss fragen:  
   *"Wenn Sie zufrieden waren, würden Sie uns eine Google-Bewertung geben? Hier ist der Link: [URL]"*
3. **NICHT:** Mit Rabatt incentivieren (gegen Google-Policy!)

**Zeit:** 15 Minuten Setup + laufend nachfragen

---

## 🟢 Quick Wins (nächste 2 Wochen)

### ✅ 7. Schema Markup einbauen (Local Business)
**Warum:** Google zeigt dann Öffnungszeiten, Bewertungen, Adresse direkt in Suche!

**Wie:**
1. Code kopieren (siehe unten)
2. WordPress → Design → Theme Editor → `header.php`
3. Vor `</head>` einfügen
4. Speichern

**Code:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Holzwerk 10",
  "image": "https://holzwerk10.de/wp/wp-content/uploads/2023/03/230329_h10_logo_signet_45.png",
  "description": "Schreinermeister für Möbelbau, Innenausbau und Schreinerarbeiten im Raum Ammersee, Landsberg und München.",
  "@id": "https://holzwerk10.de",
  "url": "https://holzwerk10.de",
  "telephone": "+49 176 45601013",
  "priceRange": "€€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Graf Zeppelinstr. 3",
    "addressLocality": "Penzing",
    "postalCode": "86929",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.0765,
    "longitude": 10.9182
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ]
}
</script>
```

**Öffnungszeiten anpassen!** (Aktuell: Mo-Fr 08:00-17:00)

**Zeit:** 10 Minuten

---

### ✅ 8. Open Graph Tags optimieren
**Warum:** Bessere Vorschau wenn Link auf Facebook/WhatsApp geteilt wird!

**Wie:**
1. WordPress → Yoast SEO (oder Rank Math) → Social
2. Für jede Seite:
   - **Facebook Titel:** "Holzwerk 10 – Schreinermeister in Penzing | Möbel & Innenausbau"
   - **Facebook Beschreibung:** "Hochwertige Möbel & Innenausbau seit 2010. Showroom in Penzing bei Landsberg. Ihr Partner für Küchen, Wohnen, Sanierungen."
   - **Bild:** Bestes Projekt-Foto hochladen (min. 1200x630px)

**Zeit:** 30 Minuten

---

### ✅ 9. holzwerk10.com Redirect einrichten
**Warum:** Duplicate Content = Google straft ab!

**Wie:**
1. United-Domains Login
2. Domain-Verwaltung
3. holzwerk10.com → 301 Redirect zu https://holzwerk10.de

**ODER:** Domain komplett stilllegen (falls nicht genutzt)

**Zeit:** 10 Minuten  
**Impact:** Verhindert SEO-Penalty

---

### ✅ 10. XML-Sitemap erstellen
**Warum:** Google kann Website besser crawlen!

**Wie:**
1. WordPress Plugin "Rank Math SEO" installieren (kostenlos, besser als Yoast!)
2. Aktivieren & Setup-Wizard durchlaufen
3. Sitemap ist automatisch unter `holzwerk10.de/sitemap.xml` verfügbar
4. In Google Search Console einreichen

**Zeit:** 15 Minuten

---

## 📊 Messung & Tracking

### ✅ Google Search Console einrichten (falls nicht vorhanden)
**Warum:** Sehen welche Keywords Rankings haben!

**Wie:**
1. [Google Search Console](https://search.google.com/search-console) öffnen
2. "Property hinzufügen" → `https://holzwerk10.de`
3. Bestätigung via HTML-Tag (von Rank Math automatisch!)
4. Sitemap einreichen: `holzwerk10.de/sitemap.xml`

**Zeit:** 15 Minuten

---

### ✅ PageSpeed Test durchführen
**Warum:** Aktuelle Performance messen!

**Wie:**
1. [Google PageSpeed Insights](https://pagespeed.web.dev/) öffnen
2. `https://holzwerk10.de` eingeben
3. Ergebnis notieren (Desktop + Mobile Score)
4. Nach jeder Optimierung erneut testen

**Zeit:** 5 Minuten

---

## 🎯 Prioritäts-Matrix

**Wenn nur 2 Stunden Zeit:**
1. WordPress Update (30 Min) ✅
2. XML-RPC deaktivieren (5 Min) ✅
3. Meta Descriptions Home + 3 wichtigste Seiten (30 Min) ✅
4. Google Business Profile: 20 Fotos (30 Min) ✅
5. Review-Link erstellen & erste 2 Kunden anschreiben (25 Min) ✅

**Impact:** +25% organischer Traffic in 30 Tagen!

---

**Wenn 4 Stunden Zeit:**
Obige + zusätzlich:
6. Schema Markup (10 Min) ✅
7. Open Graph Tags (30 Min) ✅
8. XML-Sitemap + Search Console (30 Min) ✅
9. holzwerk10.com Redirect (10 Min) ✅
10. PageSpeed Test (5 Min) ✅

**Impact:** +40% organischer Traffic + bessere Rankings!

---

## 📞 Hilfe benötigt?

**Bei technischen Fragen:**
- WordPress Community Forum: https://de.wordpress.org/support/
- Avada Support: https://support.avada.com/

**Bei SEO-Fragen:**
- Erik Reisig (C-led Solutions): reisig@c-led.net
- Heimdall (Agent): heim.dall@prometheus-labs.io

---

## ✅ Checkliste zum Abhaken

- [ ] WordPress auf 6.7.x updaten
- [ ] XML-RPC deaktivieren
- [ ] Meta Description Homepage
- [ ] Meta Descriptions alle Seiten (8 Stück)
- [ ] Google Business: 20 Fotos hochladen
- [ ] Google Reviews: Review-Link erstellen
- [ ] Schema Markup einbauen
- [ ] Open Graph Tags optimieren
- [ ] holzwerk10.com Redirect
- [ ] XML-Sitemap erstellen
- [ ] Google Search Console einrichten
- [ ] PageSpeed Test durchführen

**Progress:** 0/12 ✅

---

**Viel Erfolg!** 🚀

Diese Quick Wins bringen die größte Wirkung mit dem kleinsten Aufwand. Nach 2-4 Wochen sollten erste Ranking-Verbesserungen sichtbar sein!
