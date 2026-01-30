# Skill: Kundenanalyse & Onboarding

Wiederverwendbarer Workflow für neue Kunden-Onboardings bei IMR Media.

## Trigger-Phrasen

- "Neuer Kunde [URL]"
- "Analysiere [URL] für Onboarding"
- "Kundenanalyse für [URL]"
- "Onboarding für [Kundenname]"

## Inputs

| Parameter | Erforderlich | Beschreibung |
|-----------|--------------|--------------|
| `url` | Ja | Website-URL des Kunden |
| `kundenname` | Optional | Kurzname für Ordner (wird aus URL abgeleitet falls nicht angegeben) |
| `video_kategorie` | Optional | Produktkategorie für Erklärvideo |

## Workflow

### Phase 1: Website-Analyse (Playwright)

**1.1 Homepage Screenshot**
```typescript
// Via Playwright MCP
browser_navigate({ url: "https://www.kundenwebsite.de" });
browser_take_screenshot({ filename: "homepage-screenshot.png", fullPage: true });
```

**1.2 Brand-Extraktion**
```typescript
// Farben extrahieren
browser_evaluate({
  function: `() => {
    const styles = getComputedStyle(document.body);
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button, .btn');
    return {
      bodyColor: styles.color,
      bodyBg: styles.backgroundColor,
      linkColor: links[0] ? getComputedStyle(links[0]).color : null,
      buttonBg: buttons[0] ? getComputedStyle(buttons[0]).backgroundColor : null,
      fontFamily: styles.fontFamily
    };
  }`
});
```

**1.3 Logo-Extraktion**
```typescript
// Logo-URL finden
browser_evaluate({
  function: `() => {
    const logo = document.querySelector('header img, .logo img, [class*="logo"] img, nav img');
    return logo ? logo.src : null;
  }`
});
```

**1.4 Impressum-Parsing**
```typescript
// Zu Impressum navigieren
browser_navigate({ url: "https://www.kundenwebsite.de/impressum" });
browser_snapshot(); // Für Textextraktion
```

Zu extrahierende Daten:
- Firmenname
- Geschäftsführer
- Adresse
- Telefon
- E-Mail
- USt-IdNr
- Handelsregister

### Phase 2: Ordnerstruktur anlegen

```bash
KUNDE="kundenname"
mkdir -p /root/lead-generator/client-assets/$KUNDE/{logos,screenshots,products}
```

**Struktur:**
```
client-assets/
└── kundenname/
    ├── logos/
    │   └── logo.webp
    ├── screenshots/
    │   └── homepage-screenshot.png
    └── products/
        └── (Produktbilder für Videos)
```

### Phase 3: Assets herunterladen

```bash
# Logo herunterladen
curl -o client-assets/$KUNDE/logos/logo.webp "LOGO_URL"

# Screenshot verschieben (falls via Playwright erstellt)
mv .playwright-mcp/*.png client-assets/$KUNDE/screenshots/
```

### Phase 4: Brandkit erstellen

**Datei:** `/root/lead-generator/brandkits/{kundenname}-brandkit.md`

**Template:**
```markdown
# Brand Kit: {kundenname}

## Firmendaten
| Feld | Wert |
|------|------|
| **Firma** | {firma} |
| **Geschäftsführer** | {gf} |
| **Adresse** | {adresse} |
| **Telefon** | {telefon} |
| **E-Mail** | {email} |
| **Website** | {url} |

## Farbpalette
| Name | Hex | Verwendung |
|------|-----|------------|
| **Primärfarbe** | {primary_color} | Buttons, Links, Headlines |
| **Hintergrund** | {bg_color} | Background |

## Typografie
- **Font:** {font_family}

## Logo
- **URL:** {logo_url}
- **Lokal:** client-assets/{kundenname}/logos/logo.webp

## Quick Reference (TypeScript)
\`\`\`typescript
export const {KUNDE_CAPS}_BRAND = {
  colors: {
    primary: "{primary_color}",
    background: "{bg_color}",
  },
  fonts: {
    family: "{font_family}",
  },
  logo: {
    url: "{logo_url}",
    local: "client-assets/{kundenname}/logos/logo.webp",
  },
} as const;
\`\`\`
```

### Phase 5: Video-Projekt anlegen (optional)

Falls `video_kategorie` angegeben:

```bash
PROJEKT="$KUNDE-$KATEGORIE"
mkdir -p /root/lead-generator/video-assets/$PROJEKT/{02-scripts,03-avatars,04-audio,05-remotion,06-final}
```

**Briefing erstellen:** `video-assets/$PROJEKT/01-briefing.md`

## Checkpoints (User-Validierung)

### Checkpoint 1: Nach Website-Analyse
Zeige dem User:
- [ ] Extrahierte Firmendaten (korrekt?)
- [ ] Gefundene Farben (Primärfarbe stimmt?)
- [ ] Logo-URL (richtig?)
- [ ] Tech-Stack (falls erkennbar)

### Checkpoint 2: Nach Brandkit
- [ ] Brandkit zur Überprüfung vorlegen
- [ ] Fehlende Infos ergänzen lassen

### Checkpoint 3: Video-Konzept (falls Video geplant)
- [ ] Zielgruppe bestätigen
- [ ] Video-Typ wählen (UGC, Animation, Mix)
- [ ] Avatar-Stil festlegen
- [ ] Skript-Entwurf genehmigen

## Outputs

| Output | Pfad |
|--------|------|
| **Brandkit** | `brandkits/{kundenname}-brandkit.md` |
| **Logo** | `client-assets/{kundenname}/logos/logo.webp` |
| **Screenshots** | `client-assets/{kundenname}/screenshots/` |
| **Video-Briefing** | `video-assets/{projekt}/01-briefing.md` |

## Beispiel-Aufruf

```
User: "Neuer Kunde www.beispiel-shop.de - analysieren und Brandkit erstellen"

Claude:
1. Nutzt Playwright für Website-Analyse
2. Extrahiert Brand-Infos (Farben, Logo, Impressum)
3. Legt Ordnerstruktur an
4. Lädt Assets herunter
5. Erstellt Brandkit
6. [Checkpoint] Zeigt Ergebnis zur Validierung
```

## Wichtige Hinweise

### Cloudflare-Schutz
Manche Websites blockieren Playwright. Lösung:
1. Server-IP herausfinden: `curl -4 ifconfig.me`
2. User bitten, IP in Cloudflare zu whitelisten
3. Erneut versuchen

### Shop-Systeme erkennen
- **Shopware:** `<meta name="generator" content="Shopware"`
- **WooCommerce:** `/wp-content/plugins/woocommerce/`
- **Shopify:** `cdn.shopify.com`
- **Magento:** `/static/version` oder `Mage.Cookies`

### Video-Konzept: Keine Preise!
Preise ändern sich zu schnell - **niemals Preise in Videos einbauen**.
Stattdessen: Features, Vergleiche, Entscheidungshilfen.

---

*Skill erstellt: 2026-01-24*
*Basierend auf: mein-schluessel.de Onboarding*
