#!/usr/bin/env node
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
  
  console.log('Going to Reddit login...');
  await page.goto('https://www.reddit.com/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 5000)); // wait longer
  
  // Save HTML for inspection
  const html = await page.content();
  require('fs').writeFileSync('/tmp/reddit-login.html', html);
  console.log('Saved HTML to /tmp/reddit-login.html');
  
  // Check for iframes
  const frames = page.frames();
  console.log(`Found ${frames.length} frames`);
  
  // Look for inputs in main frame
  let inputs = await page.$$('input');
  console.log(`Found ${inputs.length} inputs in main frame`);
  
  // Try different selectors
  const selectors = [
    'input',
    'input[type="text"]',
    'input[type="password"]',
    'input[type="email"]',
    '[data-testid]',
    'faceplate-text-input',  // Reddit web component
  ];
  
  for (const sel of selectors) {
    const count = await page.$$eval(sel, els => els.length).catch(() => 0);
    console.log(`Selector "${sel}": ${count} elements`);
  }
  
  // Check for web components (custom elements)
  const customElements = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    const customs = new Set();
    all.forEach(el => {
      if (el.tagName.includes('-')) customs.add(el.tagName.toLowerCase());
    });
    return [...customs];
  });
  console.log('Custom elements found:', customElements.join(', '));
  
  await page.screenshot({ path: '/tmp/reddit-stealth/test2-page.png', fullPage: true });
  
  await browser.close();
}

main().catch(e => console.error(e));
