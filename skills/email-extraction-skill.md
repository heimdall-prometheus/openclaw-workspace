# Email Extraction Skill

## Trigger
Wenn der User eine Email-Adresse von einer Website extrahieren möchte:
- "Extrahiere Email von [URL]"
- "Finde Kontakt-Email für [Firma/URL]"
- "Email-Extraktion für [URL]"

## Beschreibung
Dieser Skill extrahiert Kontakt-Emails von Websites mit Playwright und intelligenter Analyse. Er kann schwierige Fälle wie Cloudflare-geschützte Sites, Cookie-Banner und versteckte Kontaktdaten handhaben.

## Vorgehen

### 1. Setup Playwright mit Consumer User-Agent

```typescript
import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: [
    '--disable-blink-features=AutomationControlled',
    '--disable-features=IsolateOrigins,site-per-process',
  ]
});

const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  // Consumer User-Agent (Chrome auf Windows)
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  // Wichtig: SSL-Fehler ignorieren
  ignoreHTTPSErrors: true,
  // Locale für deutsche Websites
  locale: 'de-DE',
  // Extra Headers um wie echter Browser zu wirken
  extraHTTPHeaders: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
  },
});

// WebDriver-Detection umgehen
await context.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  // Chrome-spezifische Properties
  (window as any).chrome = { runtime: {} };
});

const page = await context.newPage();
```

### 2. URL-Varianten probieren

```typescript
function getUrlVariants(url: string): string[] {
  let cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const withWww = cleanUrl.startsWith('www.') ? cleanUrl : `www.${cleanUrl}`;
  const withoutWww = cleanUrl.replace(/^www\./, '');

  return [
    `https://${withWww}`,
    `https://${withoutWww}`,
    `http://${withWww}`,
    `http://${withoutWww}`,
  ].filter((v, i, arr) => arr.indexOf(v) === i);
}

// Navigation mit Retry
async function navigateWithRetry(page, url: string): Promise<boolean> {
  for (const variant of getUrlVariants(url)) {
    try {
      await page.goto(variant, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });
      return true;
    } catch (e) {
      continue;
    }
  }
  return false;
}
```

### 3. Cloudflare/Cookie-Banner behandeln

```typescript
async function handleBlockers(page): Promise<void> {
  // Warte auf mögliche Cloudflare Challenge
  const content = await page.content();
  if (content.includes('Verifying you are human') ||
      content.includes('cf-browser-verification') ||
      content.includes('Just a moment')) {
    console.log('Cloudflare detected - waiting...');
    // Warte bis zu 15 Sekunden auf Weiterleitung
    await page.waitForTimeout(15000);
    // Prüfe ob wir durchgekommen sind
    const newContent = await page.content();
    if (newContent.includes('Verifying you are human')) {
      throw new Error('CLOUDFLARE_BLOCKED: Site requires manual verification');
    }
  }

  // Cookie-Banner wegklicken
  const cookieSelectors = [
    'button:has-text("Akzeptieren")',
    'button:has-text("Alle akzeptieren")',
    'button:has-text("Alle Cookies akzeptieren")',
    'button:has-text("Accept")',
    'button:has-text("Accept all")',
    'button:has-text("Einverstanden")',
    'button:has-text("OK")',
    '[class*="cookie"] button:has-text("OK")',
    '[class*="consent"] button',
    '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
    '.cc-btn.cc-allow',
    '[data-testid="cookie-accept"]',
  ];

  for (const selector of cookieSelectors) {
    try {
      const btn = await page.$(selector);
      if (btn && await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(500);
        break;
      }
    } catch {
      continue;
    }
  }
}
```

### 4. Kontaktseiten finden und besuchen

```typescript
async function findContactPages(page): Promise<{impressum?: string, kontakt?: string}> {
  const links = await page.$$eval('a', anchors =>
    anchors.map(a => ({
      href: a.href,
      text: (a.textContent || '').toLowerCase().trim()
    }))
  );

  const baseHost = new URL(page.url()).hostname;

  const impressumLink = links.find(l =>
    (l.href.includes(baseHost)) && (
      /impressum|imprint|legal/i.test(l.text) ||
      /impressum|imprint|legal/i.test(l.href)
    )
  );

  const kontaktLink = links.find(l =>
    (l.href.includes(baseHost)) && (
      /kontakt|contact|ansprechpartner/i.test(l.text) ||
      /kontakt|contact/i.test(l.href)
    )
  );

  return {
    impressum: impressumLink?.href,
    kontakt: kontaktLink?.href,
  };
}
```

### 5. Email-Extraktion (Multi-Methode)

```typescript
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// ROT13 Decoder
function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

async function extractEmails(page): Promise<string[]> {
  const emails: string[] = [];

  // 1. Mailto-Links (zuverlässigste Methode)
  const mailtoEmails = await page.$$eval('a[href^="mailto:"]', els =>
    els.map(el => {
      const href = el.getAttribute('href') || '';
      return href.replace('mailto:', '').split('?')[0].trim();
    })
  );
  emails.push(...mailtoEmails);

  // 2. Text-Extraktion (ohne Script/Style)
  const text = await page.$eval('body', el => {
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('script, style, noscript, svg, path').forEach(e => e.remove());
    return clone.innerText;
  });

  const textEmails = text.match(EMAIL_REGEX) || [];
  emails.push(...textEmails);

  // 3. HTML-Source für versteckte Emails
  const html = await page.content();

  // HTML-Entity kodierte Emails (&#64; = @)
  const entityPattern = /[\w.+-]+&#64;[\w.-]+\.[\w]{2,}/gi;
  const entityEmails = (html.match(entityPattern) || []).map(e => e.replace('&#64;', '@'));
  emails.push(...entityEmails);

  // 4. ROT13 dekodieren
  const allMatches = html.match(EMAIL_REGEX) || [];
  for (const match of allMatches) {
    if (/^vasb@|^fnyrf@|^pbagnpg@|\.pbz$|\.qr$/.test(match)) {
      const decoded = rot13(match);
      if (decoded.match(EMAIL_REGEX)) {
        emails.push(decoded);
      }
    }
  }

  return [...new Set(emails)];
}
```

### 6. Email-Validierung

```typescript
function isValidBusinessEmail(email: string): boolean {
  // Grundstruktur prüfen
  if (!email.includes('@') || email.length < 6) return false;

  const [local, domain] = email.split('@');
  if (!local || !domain || !domain.includes('.')) return false;

  // False Positives filtern
  const blacklist = [
    /loc@ion/i, /navig@or/i, /st@e\./i, /anim@e/i, /templ@e/i,
    /\.(css|js|jpg|png|gif|svg)$/i,
    /@(gmail|yahoo|hotmail|web\.de|gmx)\./i,
    /noreply|no-reply|newsletter|unsubscribe/i,
    /example\.com|test\.com|localhost/i,
    /wordpress|wix|cloudflare|sentry/i,
  ];

  return !blacklist.some(p => p.test(email));
}
```

### 7. Kontaktperson extrahieren

```typescript
async function extractContactPerson(page): Promise<{name?: string, role?: string}> {
  const text = await page.$eval('body', el => el.innerText);

  // Deutsche Patterns für Geschäftsführer/Inhaber
  const patterns = [
    /(?:Geschäftsführer|Geschäftsführerin)[:\s]+([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)+)/,
    /(?:Inhaber|Inhaberin)[:\s]+([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)+)/,
    /(?:Verantwortlich)[:\s]+([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)+)/,
    /(?:Leitung)[:\s]+([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)+)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const role = pattern.source.match(/\(([^)]+)\)/)?.[1] || 'Geschäftsführer';
      return { name: match[1], role };
    }
  }

  return {};
}
```

### 8. Screenshot für visuelle Analyse (bei Problemen)

```typescript
async function takeDebugScreenshot(page, filename: string): Promise<string> {
  const screenshotPath = `/tmp/${filename}-${Date.now()}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: false });
  return screenshotPath;
}
```

## Kompletter Workflow

```typescript
async function extractContactFromWebsite(url: string) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    // ... (siehe oben für vollständige Config)
  });

  const page = await context.newPage();

  try {
    // 1. Navigieren
    const success = await navigateWithRetry(page, url);
    if (!success) {
      return { error: 'NAVIGATION_FAILED', url };
    }

    // 2. Blocker behandeln
    await handleBlockers(page);

    // 3. Emails von Hauptseite
    let emails = await extractEmails(page);
    let contactPerson = await extractContactPerson(page);

    // 4. Kontaktseiten besuchen
    const pages = await findContactPages(page);

    if (pages.impressum) {
      await page.goto(pages.impressum, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1000);
      emails.push(...await extractEmails(page));
      if (!contactPerson.name) {
        contactPerson = await extractContactPerson(page);
      }
    }

    if (pages.kontakt && pages.kontakt !== pages.impressum) {
      await page.goto(pages.kontakt, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1000);
      emails.push(...await extractEmails(page));
    }

    // 5. Validieren und Deduplizieren
    emails = [...new Set(emails)].filter(isValidBusinessEmail);

    // 6. Beste Email auswählen (info@ > kontakt@ > andere)
    const bestEmail = emails.find(e => /^info@/i.test(e)) ||
                      emails.find(e => /^kontakt@/i.test(e)) ||
                      emails.find(e => /^office@/i.test(e)) ||
                      emails[0];

    return {
      success: !!bestEmail,
      email: bestEmail,
      allEmails: emails,
      contactPerson: contactPerson.name,
      role: contactPerson.role,
      url,
    };

  } catch (error) {
    // Bei Cloudflare: Screenshot für manuelle Analyse
    if (error.message?.includes('CLOUDFLARE')) {
      const screenshot = await takeDebugScreenshot(page, 'cloudflare');
      return {
        error: 'CLOUDFLARE_BLOCKED',
        url,
        screenshot,
        message: 'Site ist durch Cloudflare geschützt - manuelle Extraktion erforderlich'
      };
    }
    return { error: error.message, url };

  } finally {
    await browser.close();
  }
}
```

## Ausgabe-Format

Bei Erfolg:
```json
{
  "success": true,
  "email": "info@example.de",
  "allEmails": ["info@example.de", "kontakt@example.de"],
  "contactPerson": "Max Mustermann",
  "role": "Geschäftsführer",
  "url": "https://example.de"
}
```

Bei Cloudflare-Blockade:
```json
{
  "error": "CLOUDFLARE_BLOCKED",
  "url": "https://example.de",
  "screenshot": "/tmp/cloudflare-123456.png",
  "message": "Site ist durch Cloudflare geschützt - manuelle Extraktion erforderlich"
}
```

## Verwendung im Lead-Generator

Nach erfolgreicher Extraktion kann das Ergebnis direkt in die Datenbank geschrieben werden:

```typescript
await prisma.lead.update({
  where: { id: leadId },
  data: {
    contactEmail: result.email,
    contactFirstName: result.contactPerson?.split(' ')[0],
    contactLastName: result.contactPerson?.split(' ').slice(1).join(' '),
    contactRole: result.role,
  }
});
```

## Limitierungen

1. **Cloudflare Challenge** - Kann nicht automatisch gelöst werden, erfordert manuelle Intervention
2. **CAPTCHA** - Keine automatische Lösung
3. **Login-geschützte Seiten** - Nicht unterstützt
4. **Rate Limiting** - Bei vielen Anfragen kann die IP blockiert werden

## Tipps

- Bei Cloudflare-Sites: Probiere zu verschiedenen Tageszeiten
- Nutze Proxies für große Batch-Extraktionen
- Speichere Screenshots bei Fehlern für Debugging
