#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdall.watcher',
  password: 'Pr0m3th3us_W4tch3r_2026!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL - Force mode\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    locale: 'de-DE',
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { timeout: 30000 });
    await delay(5000);
    
    console.log('Page loaded');
    
    // Scroll to form
    await page.evaluate(() => window.scrollTo(0, 300));
    await delay(500);
    
    await page.screenshot({ path: '/tmp/protonf-1.png', fullPage: true });
    
    // Fill using evaluate + force
    console.log('\n1️⃣ Username via JS...');
    await page.evaluate((username) => {
      const input = document.getElementById('username') || document.querySelector('input[id*="email"], input[data-testid*="input"]');
      if (input) {
        input.scrollIntoView();
        input.focus();
        input.value = username;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
        return true;
      }
      return false;
    }, IDENTITY.username);
    
    await delay(1000);
    
    console.log('2️⃣ Password via JS...');
    await page.evaluate((password) => {
      const inputs = document.querySelectorAll('input[type="password"]');
      inputs.forEach(input => {
        input.focus();
        input.value = password;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      return inputs.length;
    }, IDENTITY.password);
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protonf-2.png' });
    
    // Check what values we have
    const values = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('input')).map(i => ({
        id: i.id,
        type: i.type,
        value: i.value?.substring(0, 20)
      }));
    });
    console.log('Values:', JSON.stringify(values, null, 2));
    
    // Click submit
    console.log('\n🚀 Submitting...');
    await page.click('button:has-text("Beginne"), button:has-text("Create"), button[type="submit"]', { force: true, timeout: 5000 }).catch(() => {
      console.log('Click failed, trying evaluate...');
      return page.evaluate(() => {
        const btn = document.querySelector('button[type="submit"], button.button-large');
        if (btn) btn.click();
        return !!btn;
      });
    });
    
    await delay(10000);
    await page.screenshot({ path: '/tmp/protonf-3.png' });
    
    const url = page.url();
    console.log('\n📍 URL:', url);
    
  } catch (err) {
    console.error('❌', err.message);
    await page.screenshot({ path: '/tmp/protonf-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

registerProton();
