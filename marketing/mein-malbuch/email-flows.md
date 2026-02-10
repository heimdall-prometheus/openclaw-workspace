# mein-malbuch.com - Email Marketing Flows
**Erstellt:** 2026-01-31
**Tech Stack:** Benötigt ESP (z.B. Mailchimp, Klaviyo, SendGrid)

---

## 🎯 Overview

| Flow | Emails | Trigger | Ziel | Priorität |
|------|--------|---------|------|-----------|
| Welcome Series | 3 | Newsletter Signup | Engagement + Erstkauf | High |
| Abandoned Cart | 3 | Cart verlassen (>30 min) | Checkout abschließen | High |
| Post-Purchase UGC | 2 | Bestellung versandt | UGC sammeln | Medium |

---

## ✉️ Flow 1: Welcome Series (Newsletter Signup)

**Trigger:** User meldet sich für Newsletter an (ohne Kauf)  
**Ziel:** Marke kennenlernen, erste Bestellung  
**Länge:** 3 Emails über 7 Tage  
**Exit Condition:** Bestellung abgeschlossen  

---

### Email 1: Welcome + Quick Win (Immediate)

**Subject:** 🎨 Willkommen bei Mein-Malbuch! (+ 10% Rabatt)  
**Preview:** Dein Foto wird zum personalisierten Malbuch — so geht's...  
**Send:** Sofort nach Signup  

**Body:**
```
Hallo [Vorname],

willkommen bei Mein-Malbuch! 👋

Du hast gerade den ersten Schritt gemacht, um einzigartige Momente 
in kreative Beschäftigung zu verwandeln.

🎁 **Dein Willkommensgeschenk:**
Als Dankeschön bekommst du 10% Rabatt auf deine erste Bestellung:

[BUTTON: Jetzt Malbuch erstellen] 
Code: WILLKOMMEN10

📸 **So einfach geht's:**
1. Lieblingsfoto hochladen
2. Unsere KI wandelt es in Ausmalbilder um
3. Fertig — Lieferung in 3-5 Tagen

💡 **Beliebte Motive:**
→ Familienfotos vom Urlaub
→ Haustiere
→ Geschwister zusammen
→ Oma & Opa

Die meisten Kunden sind überrascht, wie gut normale Smartphone-Fotos 
als Malbuch funktionieren!

Viel Spaß beim Entdecken,
Das Mein-Malbuch Team

P.S. Fragen? Einfach auf diese Email antworten — wir helfen gerne!
```

**CTA:** "Jetzt Malbuch erstellen" → https://mein-malbuch.com/?utm_source=email&utm_campaign=welcome1

**Tracking:**
- UTM: `?utm_source=email&utm_medium=welcome&utm_campaign=welcome1`
- Conversion Goal: Kauf innerhalb 24h

---

### Email 2: How-To + Social Proof (Day 3)

**Subject:** 📸 Welche Fotos eignen sich am besten?  
**Preview:** 3 Foto-Typen, die immer funktionieren + echte Beispiele  
**Send:** 3 Tage nach Email 1 (wenn kein Kauf)  

**Body:**
```
Hey [Vorname],

wir bekommen oft die Frage: "Welche Fotos funktionieren am besten?"

Hier die Antwort:

✅ **Diese Foto-Typen sind perfekt:**

1. **Familienfotos mit klaren Gesichtern**
   → Strandurlaub, Geburtstag, Weihnachten
   
2. **Haustiere in Action**
   → Hund beim Spielen, Katze auf dem Sofa
   
3. **Besondere Momente**
   → Erstes Schuljahr, Baby-Foto, Hochzeit

🎨 **So sieht's aus:**
[Vorher/Nachher Beispiel-Bild einfügen]

❤️ **Was unsere Kunden sagen:**

"Mein Sohn (5) hat sein Malbuch geliebt! Er hat sich selbst 
beim Strandurlaub ausgemalt — stundenlange Beschäftigung ohne Bildschirm."
— Lisa M., München

"Perfektes Geschenk für Oma! Sie war zu Tränen gerührt."
— Thomas K., Berlin

[BUTTON: Mein Foto hochladen]

💰 **Dein 10% Rabatt wartet noch:**
Code: WILLKOMMEN10 (noch 4 Tage gültig)

Liebe Grüße,
Das Mein-Malbuch Team
```

**CTA:** "Mein Foto hochladen" → https://mein-malbuch.com/upload?utm_source=email&utm_campaign=welcome2

**Tracking:**
- UTM: `?utm_source=email&utm_medium=welcome&utm_campaign=welcome2`
- Click-to-open Rate Benchmark: >3%

---

### Email 3: Urgency + Last Chance (Day 7)

**Subject:** ⏰ Dein Rabatt läuft morgen ab, [Vorname]  
**Preview:** Noch 24 Stunden für 10% auf dein erstes Malbuch  
**Send:** 7 Tage nach Email 1 (wenn kein Kauf)  

**Body:**
```
Hi [Vorname],

nur eine kurze Erinnerung:

Dein 10% Willkommensrabatt läuft **morgen um Mitternacht** ab.

⏰ **Noch 24 Stunden:**
Code: WILLKOMMEN10

Das bedeutet:
❌ Morgen: 24,90€
✅ Heute: 22,41€

[BUTTON: Jetzt 10% sparen]

🎁 **Warum Mein-Malbuch?**
→ Lieblingsfoto wird zum Ausmalbuch (20 Seiten)
→ Bildschirmfreie Beschäftigung
→ Personalisiert & einzigartig
→ Versand in 3-5 Tagen

💚 **Zufriedenheitsgarantie:**
Nicht zufrieden? Geld zurück — ohne Wenn und Aber.

Wir freuen uns auf deine Bestellung!

Das Mein-Malbuch Team

P.S. Unentschlossen? Schreib uns — wir helfen gerne bei der Foto-Auswahl!
```

**CTA:** "Jetzt 10% sparen" → https://mein-malbuch.com/?utm_source=email&utm_campaign=welcome3

**Tracking:**
- UTM: `?utm_source=email&utm_medium=welcome&utm_campaign=welcome3`
- Conversion Goal: Kauf innerhalb 24h
- Exit: Nach Kauf oder nach 7 Tagen

---

## 🛒 Flow 2: Abandoned Cart Recovery

**Trigger:** Produkt im Warenkorb, aber kein Checkout (>30 min)  
**Ziel:** Checkout abschließen  
**Länge:** 3 Emails über 3 Tage  
**Exit Condition:** Bestellung abgeschlossen  

---

### Email 1: Gentle Reminder (30 min - 1h after abandon)

**Subject:** Dein Malbuch wartet noch... 🎨  
**Preview:** Hast du es vergessen? Dein personalisiertes Malbuch ist noch da!  
**Send:** 30-60 Min nach Warenkorbabbruch  

**Body:**
```
Hi [Vorname],

du hast gerade angefangen, dein personalisiertes Malbuch zu erstellen — 
aber der letzte Schritt fehlt noch!

📸 **Dein Malbuch:**
[Thumbnail vom hochgeladenen Foto]
Personalisiertes Malbuch — 24,90€

Manchmal kommt etwas dazwischen. Kein Problem!

[BUTTON: Bestellung abschließen]

❓ **Hast du eine Frage?**
→ Versand & Lieferzeit: 3-5 Werktage
→ Bezahlung: PayPal, Kreditkarte, Klarna
→ Garantie: 100% Zufriedenheit oder Geld zurück

Wir sind hier, wenn du Hilfe brauchst!

Das Mein-Malbuch Team
```

**CTA:** "Bestellung abschließen" → Direkter Link zum Warenkorb mit Session-Recovery

**Tracking:**
- UTM: `?utm_source=email&utm_medium=cart&utm_campaign=cart1`
- Conversion Rate Benchmark: 10-15%

---

### Email 2: Address Objection + Incentive (24h after abandon)

**Subject:** 🎁 5€ Rabatt auf dein Malbuch (nur heute!)  
**Preview:** Wir schenken dir 5€ — dein Malbuch wartet noch  
**Send:** 24 Stunden nach Abbruch (wenn kein Kauf)  

**Body:**
```
Hey [Vorname],

dein personalisiertes Malbuch wartet immer noch im Warenkorb.

Vielleicht war der Preis der Grund?

Hier ist unser Angebot:

💰 **5€ RABATT — nur heute:**
Code: CART5
(Dein Preis: 19,90€ statt 24,90€)

[BUTTON: Jetzt bestellen & 5€ sparen]

✅ **100% Zufriedenheitsgarantie:**
Nicht zufrieden? Geld zurück — ohne Diskussion.

❤️ **Warum 3.847 Eltern uns vertrauen:**
→ Deutsche Qualitätsdruckerei
→ Schneller Versand (3-5 Tage)
→ Persönlicher Support

⏰ Angebot läuft ab in: 24 Stunden

Liebe Grüße,
Das Mein-Malbuch Team

P.S. Fragen zur Qualität? Schau dir unsere Beispiele an: [Link]
```

**CTA:** "Jetzt bestellen & 5€ sparen" → Warenkorb + Auto-Apply Code

**Tracking:**
- UTM: `?utm_source=email&utm_medium=cart&utm_campaign=cart2`
- Discount Code: CART5
- Conversion Rate Benchmark: 5-10%

---

### Email 3: Last Chance + Social Proof (72h after abandon)

**Subject:** ⚠️ Letzte Chance — dein Warenkorb wird gelöscht  
**Preview:** Nur noch 24h, dann ist dein Malbuch weg  
**Send:** 72 Stunden nach Abbruch (wenn kein Kauf)  

**Body:**
```
Hi [Vorname],

das ist unsere letzte Nachricht:

Dein Warenkorb wird in 24 Stunden automatisch gelöscht.

📸 **Dein Malbuch geht verloren:**
[Thumbnail]

Das wäre schade — vor allem, weil du schon so weit warst!

[BUTTON: Jetzt retten (19,90€ mit CART5)]

🌟 **Das sagen andere Eltern:**

"Ich war skeptisch, aber das Malbuch ist der Hammer! 
Meine Tochter (4) hat es innerhalb von 2 Tagen komplett ausgemalt."
— Sarah L., Hamburg

"Bestes Geschenk für meine Nichte. Sie hat gelacht, als sie 
sich selbst im Malbuch gesehen hat!"
— Michael T., Stuttgart

⏰ **Nur noch 24 Stunden:**
Danach ist dein Warenkorb leer.

Das Mein-Malbuch Team
```

**CTA:** "Jetzt retten" → Warenkorb mit Code CART5

**Tracking:**
- UTM: `?utm_source=email&utm_medium=cart&utm_campaign=cart3`
- Conversion Rate Benchmark: 3-5%
- Exit: Nach Kauf oder nach 96h

---

## 📦 Flow 3: Post-Purchase UGC Request

**Trigger:** Bestellung wurde versandt (Tracking-Update)  
**Ziel:** User-Generated Content sammeln (Fotos, Reviews)  
**Länge:** 2 Emails über 10 Tage  
**Exit Condition:** Foto hochgeladen oder Review abgegeben  

---

### Email 1: Delivery Confirmation + Engagement Tease (Day 1)

**Subject:** 📦 Dein Malbuch ist unterwegs!  
**Preview:** Track dein Paket + wie du mitmachen kannst bei #MeinMalbuchMoment  
**Send:** Sofort nach Versand  

**Body:**
```
Hey [Vorname],

gute Neuigkeiten: Dein personalisiertes Malbuch ist unterwegs! 🎉

📦 **Tracking:**
[BUTTON: Sendung verfolgen]

📅 **Voraussichtliche Lieferung:**
[Lieferdatum einfügen]

🎨 **Was als Nächstes passiert:**

Sobald dein Malbuch ankommt, würden wir uns riesig freuen, 
wenn du uns zeigst, wie es angekommen ist!

📸 **Teile deinen #MeinMalbuchMoment:**
→ Foto von dir oder deinem Kind mit dem Malbuch
→ Poste auf Instagram/Facebook mit #MeinMalbuchMoment
→ Tagge uns: @meinmalbuch

🎁 **Dankeschön-Bonus:**
Jeder, der ein Foto teilt, bekommt 10% Rabatt auf die nächste Bestellung!

Wir können es kaum erwarten zu sehen, wie es dir gefällt!

Das Mein-Malbuch Team
```

**CTA:** "Sendung verfolgen" → Tracking-Link

**Tracking:**
- UTM: `?utm_source=email&utm_medium=postpurchase&utm_campaign=shipped`
- Engagement Metric: Instagram Tags/Mentions

---

### Email 2: Review + UGC Request (Day 7-10 after delivery)

**Subject:** 🎨 Wie gefällt euch das Malbuch?  
**Preview:** 2 Minuten deiner Zeit für 10% Rabatt + Gewinnspiel  
**Send:** 7-10 Tage nach geschätzter Lieferung  

**Body:**
```
Hi [Vorname],

dein Malbuch sollte jetzt bei dir sein! Wie hat es dir gefallen?

Wir würden uns riesig über dein Feedback freuen:

⭐ **1-Klick-Bewertung:**
Wie zufrieden bist du? (1-5 Sterne)

[⭐] [⭐⭐] [⭐⭐⭐] [⭐⭐⭐⭐] [⭐⭐⭐⭐⭐]

📸 **Bonus: Zeig uns dein Malbuch!**
Hast du ein Foto von deinem Kind beim Ausmalen?

[BUTTON: Foto hochladen & 10% Rabatt sichern]

Wir verlosen jeden Monat 3x ein kostenloses Malbuch unter allen, 
die ihr Foto teilen!

❤️ **Vielen Dank für deine Unterstützung!**
Dein Feedback hilft anderen Eltern bei der Entscheidung.

[BUTTON: Jetzt bewerten (2 Min)]

Liebe Grüße,
Das Mein-Malbuch Team

P.S. Noch Fragen oder Probleme? Schreib uns einfach!
```

**CTA Primary:** "Foto hochladen & 10% Rabatt sichern" → Upload-Formular  
**CTA Secondary:** "Jetzt bewerten" → Review-Seite  

**Tracking:**
- UTM: `?utm_source=email&utm_medium=postpurchase&utm_campaign=ugc_request`
- Conversion Goal: Review OR Foto Upload
- UGC Reward: 10% Rabatt-Code bei Upload

---

## 📊 KPIs & Benchmarks

### Welcome Series
| Metrik | Benchmark | Ziel |
|--------|-----------|------|
| Open Rate | 30-40% | >35% |
| Click Rate | 3-5% | >4% |
| Conversion Rate | 2-5% | >3% |
| Unsubscribe | <0.5% | <0.3% |

### Abandoned Cart
| Metrik | Benchmark | Ziel |
|--------|-----------|------|
| Email 1 Recovery Rate | 10-15% | >12% |
| Email 2 Recovery Rate | 5-10% | >7% |
| Email 3 Recovery Rate | 3-5% | >4% |
| Total Cart Recovery | 18-30% | >25% |

### Post-Purchase
| Metrik | Benchmark | Ziel |
|--------|-----------|------|
| Review Rate | 5-10% | >8% |
| UGC Upload Rate | 2-5% | >3% |
| Repeat Purchase (30d) | 10-15% | >12% |

---

## 🔧 Tech Implementation Notes

### ESP Requirements
- Triggered emails based on events
- Merge fields (Name, Order Details, Foto-Thumbnail)
- Conditional content (z.B. Rabatt-Code nur bei Cart >50€)
- UTM parameter auto-injection
- A/B Testing capability

### Event Triggers Needed
1. `newsletter.signup` → Welcome Series
2. `cart.abandoned` (>30 min) → Abandoned Cart
3. `order.shipped` → Post-Purchase UGC

### Integration Points
- **Shop System:** Trigger events bei Cart Abandon, Order, Shipment
- **CRM/Backend:** User Profile + Purchase History
- **UGC Platform:** Upload-Formular für Fotos + Auto-Reward

---

## 🧪 A/B Testing Roadmap

### Phase 1 (Launch)
- Baseline: Alle Emails wie oben
- Metric: Open, Click, Conversion Rates

### Phase 2 (Week 2-4)
**Test 1: Welcome Email Subject Lines**
- A: "🎨 Willkommen bei Mein-Malbuch! (+ 10% Rabatt)"
- B: "Dein erstes Malbuch: 10% geschenkt 🎁"
- C: "[Vorname], dein Foto wird zum Malbuch!"

**Test 2: Cart Email Timing**
- A: 30min / 24h / 72h (current)
- B: 1h / 12h / 48h
- C: 2h / 24h / 96h

### Phase 3 (Month 2+)
- Copy variations (emotional vs. rational)
- CTA button text
- Email length (short vs. long)
- Incentive amounts (5€ vs. 10% vs. 15%)

---

## 📝 Copy Guidelines (Brand Voice)

### Tone
- **Warm & freundlich** (nicht corporate)
- **Eltern verstehen Eltern** (authentisch)
- **Bildschirmfreie Zeit** als Wert (nicht predigen)
- **Du-Ansprache** (persönlich)

### Avoid
- ❌ "Sehr geehrte/r"
- ❌ Übertriebene Emojis (max 2-3 pro Email)
- ❌ Fake Urgency (nur echte Deadlines)
- ❌ Schuld/Druck ("Dein Kind braucht das!")

### Language Patterns
- ✅ "Wir wissen, wie schwer es ist..."
- ✅ "Andere Eltern lieben..."
- ✅ "Stell dir vor, wenn..."
- ✅ "Fragen? Einfach antworten!"

---

## 🚀 Launch Checklist

### Pre-Launch
- [ ] ESP Account + API Integration
- [ ] Email Templates im ESP erstellen
- [ ] Event Triggers implementiert (Shop → ESP)
- [ ] UTM Tracking in Google Analytics
- [ ] Test-Emails an 3-5 Personen
- [ ] Mobile Preview (>60% lesen auf Smartphone!)
- [ ] Spam-Score Check (Mail Tester)

### Launch Week
- [ ] Welcome Series aktivieren
- [ ] Abandoned Cart aktivieren (Tag 3)
- [ ] Post-Purchase aktivieren (Tag 5)
- [ ] Daily Monitoring: Open/Click Rates
- [ ] Spam-Folder Check (Gmail, Outlook)

### Post-Launch (Week 2)
- [ ] Performance Review: Alle KPIs
- [ ] A/B Test Setup (Subject Lines)
- [ ] Segment Analysis (Opener vs. Non-Opener)
- [ ] Adjust Timing if needed

---

**Status:** Ready for Implementation ✅  
**Estimated Time to Launch:** 1-2 Wochen (mit ESP Setup)  
**Expected ROI:** +15-25% Revenue (Cart Recovery) + UGC Growth
