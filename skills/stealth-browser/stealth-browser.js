#!/usr/bin/env node
/**
 * Stealth Browser - Undetectable Puppeteer
 * 
 * Uses puppeteer-extra with stealth plugin to bypass bot detection.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Add stealth plugin with all evasions
puppeteer.use(StealthPlugin());

async function launchStealthBrowser(options = {}) {
  const defaultOptions = {
    headless: 'new', // Use new headless mode
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--disable-blink-features=AutomationControlled',
      // Realistic browser args
      '--lang=de-DE,de,en-US,en',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    ignoreHTTPSErrors: true,
  };

  // Merge options
  const finalOptions = { ...defaultOptions, ...options };
  
  // Add proxy if specified
  if (options.proxy) {
    finalOptions.args.push(`--proxy-server=${options.proxy}`);
  }

  const browser = await puppeteer.launch(finalOptions);
  return browser;
}

async function createStealthPage(browser) {
  const page = await browser.newPage();
  
  // Set realistic user agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  
  // Set realistic viewport
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Set language
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7'
  });
  
  // Override navigator properties for extra stealth
  await page.evaluateOnNewDocument(() => {
    // Override the webdriver property
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
    
    // Override plugins length
    Object.defineProperty(navigator, 'plugins', {
      get: () => [
        { name: 'Chrome PDF Plugin' },
        { name: 'Chrome PDF Viewer' },
        { name: 'Native Client' },
      ],
    });
    
    // Override languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['de-DE', 'de', 'en-US', 'en'],
    });
    
    // Add chrome object
    window.chrome = {
      runtime: {},
    };
    
    // Override permissions
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );
  });
  
  return page;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const url = args.find(a => a.startsWith('--url='))?.split('=')[1] || 'https://bot.sannysoft.com';
  const screenshotPath = args.find(a => a.startsWith('--screenshot='))?.split('=')[1];
  
  (async () => {
    console.log('🚀 Launching stealth browser...');
    const browser = await launchStealthBrowser();
    const page = await createStealthPage(browser);
    
    console.log(`📍 Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for page to fully load
    await new Promise(r => setTimeout(r, 3000));
    
    if (screenshotPath) {
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
    }
    
    // Get page title
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    // Check for common bot detection failures
    const content = await page.content();
    if (content.includes('blocked') || content.includes('banned') || content.includes('captcha')) {
      console.log('⚠️  Possible bot detection triggered');
    } else {
      console.log('✅ No obvious bot detection');
    }
    
    await browser.close();
    console.log('🏁 Done');
  })();
}

module.exports = { launchStealthBrowser, createStealthPage };
