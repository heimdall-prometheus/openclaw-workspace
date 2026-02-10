#!/usr/bin/env node
/**
 * Stealth Browser - Anti-Detection Puppeteer Setup
 * Uses puppeteer-extra with stealth plugin to avoid headless detection
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Add stealth plugin
puppeteer.use(StealthPlugin());

async function main() {
  const url = process.argv[2] || 'https://bot.sannysoft.com';
  const screenshotPath = process.argv[3] || '/tmp/stealth-test.png';
  
  console.log(`🕵️ Stealth Browser - Opening: ${url}`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080',
    ]
  });
  
  const page = await browser.newPage();
  
  // Set realistic viewport
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Set realistic user agent (not headless)
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
  
  // Navigate
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait a bit for dynamic content
  await new Promise(r => setTimeout(r, 3000));
  
  // Take screenshot
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 Screenshot saved: ${screenshotPath}`);
  
  // Get page title
  const title = await page.title();
  console.log(`📄 Title: ${title}`);
  
  // Check if blocked
  const content = await page.content();
  if (content.includes('blocked') || content.includes('Blocked')) {
    console.log('❌ BLOCKED detected in page content');
  } else {
    console.log('✅ No obvious block detected');
  }
  
  await browser.close();
  console.log('🏁 Done');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
