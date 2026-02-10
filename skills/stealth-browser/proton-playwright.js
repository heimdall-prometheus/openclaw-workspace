#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdall.watcher',
  password: 'Pr0m3th3us_W4tch3r_2026!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL - Playwright\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    locale: 'de-DE'
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { timeout: 30000 });
    await delay(3000);
    
    console.log('Page loaded:', await page.title());
    await page.screenshot({ path: '/tmp/protonpw-1.png' });
    
    // Fill username using Playwright's fill (handles React etc)
    console.log('\n1️⃣ Filling username...');
    await page.locator('input').first().fill(IDENTITY.username);
    console.log('   Done');
    
    await delay(500);
    
    // Fill password
    console.log('2️⃣ Filling password...');
    await page.locator('input[type="password"]').first().fill(IDENTITY.password);
    console.log('   Done');
    
    await delay(500);
    
    // Fill confirm password
    console.log('3️⃣ Filling confirm password...');
    await page.locator('input[type="password"]').nth(1).fill(IDENTITY.password);
    console.log('   Done');
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protonpw-2.png' });
    
    // Submit
    console.log('\n🚀 Clicking submit...');
    await page.locator('button:has-text("Beginne"), button:has-text("Create"), button[type="submit"]').first().click();
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/protonpw-3.png' });
    
    const url = page.url();
    const content = await page.textContent('body');
    
    console.log('\n📍 URL:', url);
    console.log('📄 Content:', content?.substring(0, 200));
    
    if (content?.toLowerCase().includes('captcha') || content?.toLowerCase().includes('verification')) {
      console.log('\n⚠️ CAPTCHA required!');
    } else if (!url.includes('signup')) {
      console.log('\n🎉 SUCCESS!');
    }
    
  } catch (err) {
    console.error('❌', err.message);
    await page.screenshot({ path: '/tmp/protonpw-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

registerProton();
