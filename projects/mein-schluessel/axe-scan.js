const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');
const fs = require('fs');

const CHROME_PATH = '/home/reisig/.cache/puppeteer/chrome/linux-144.0.7559.96/chrome-linux64/chrome';

const pages = [
  { name: 'Startseite', url: 'https://www.mein-schluessel.de' },
  { name: 'Kategorie (Sicherheitstechnik)', url: 'https://www.mein-schluessel.de/sicherheitstechnik/' },
  { name: 'Produktdetail (Aufschraubschloss)', url: 'https://www.mein-schluessel.de/Aufschraubschloss-PZ-gelocht-Breite-95-mm-Hoehe-177-mm-links-rechts-verwendbar/Schn-WA093PZW' },
  { name: 'Suche', url: 'https://www.mein-schluessel.de/search?search=dom' },
  { name: 'Warenkorb', url: 'https://www.mein-schluessel.de/checkout/cart' },
  { name: 'Impressum', url: 'https://www.mein-schluessel.de/shop-service/impressum/' },
  { name: 'Login', url: 'https://www.mein-schluessel.de/account/login' },
  { name: 'Schließanlagen Designer', url: 'https://www.mein-schluessel.de/schliessanlagen-designer' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const allResults = [];

  for (const pg of pages) {
    console.error(`\n🔍 Scanning: ${pg.name} — ${pg.url}`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      await page.goto(pg.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait a bit for JS-rendered content
      await new Promise(r => setTimeout(r, 2000));

      const results = await new AxePuppeteer(page)
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze();

      const entry = {
        name: pg.name,
        url: pg.url,
        finalUrl: page.url(),
        totalViolations: results.violations.length,
        totalNodes: results.violations.reduce((sum, v) => sum + v.nodes.length, 0),
        violations: results.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          help: v.help,
          helpUrl: v.helpUrl,
          tags: v.tags.filter(t => t.startsWith('wcag')),
          nodes: v.nodes.map(n => ({
            html: n.html.substring(0, 200),
            target: n.target,
            failureSummary: n.failureSummary,
          })),
        })),
      };
      
      allResults.push(entry);
      console.error(`   ✅ ${results.violations.length} violations (${entry.totalNodes} elements)`);
      await page.close();
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
      allResults.push({ name: pg.name, url: pg.url, error: err.message });
    }
  }

  await browser.close();
  
  // Output JSON
  console.log(JSON.stringify(allResults, null, 2));
})();
