#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdallwatcher',
  password: 'Prometheus2026Secure!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL - Tab navigation\n');
  
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
    
    // Scroll form into view
    await page.evaluate(() => {
      const form = document.querySelector('form') || document.querySelector('[class*="form"]');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await delay(1000);
    
    await page.screenshot({ path: '/tmp/protont-1.png' });
    
    // Focus body first, then tab to username
    console.log('\n1️⃣ Tab to username field...');
    await page.keyboard.press('Tab');
    await delay(300);
    // Might need more tabs to reach the input
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.press('Tab');
    await delay(500);
    
    console.log('   Typing username...');
    await page.keyboard.type(IDENTITY.username, { delay: 50 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protont-2.png' });
    
    // Tab to password
    console.log('\n2️⃣ Tab to password...');
    await page.keyboard.press('Tab');
    await delay(300);
    
    console.log('   Typing password...');
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    
    // Tab to confirm password
    console.log('\n3️⃣ Tab to confirm password...');
    await page.keyboard.press('Tab');
    await delay(300);
    
    console.log('   Typing confirm password...');
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protont-3.png' });
    
    // Check values
    const values = await page.evaluate(() => {
      return {
        username: document.getElementById('username')?.value || '',
        password: document.getElementById('password')?.value?.length || 0
      };
    });
    console.log('\nValues:', values);
    
    // Submit with Enter
    console.log('\n🚀 Pressing Enter...');
    await page.keyboard.press('Enter');
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/protont-4.png' });
    
    const url = page.url();
    const bodyText = await page.evaluate(() => document.body?.innerText?.substring(0, 500) || '');
    console.log('\n📍 URL:', url);
    console.log('📄 Body:', bodyText.substring(0, 200));
    
    if (bodyText.toLowerCase().includes('captcha') || bodyText.toLowerCase().includes('verification')) {
      console.log('\n⚠️ CAPTCHA/Verification required');
    } else if (!url.includes('signup')) {
      console.log('\n🎉🎉🎉 SUCCESS! 🎉🎉🎉');
      console.log('Email:', IDENTITY.username + '@proton.me');
    }
    
  } catch (err) {
    console.error('❌', err.message);
    await page.screenshot({ path: '/tmp/protont-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

registerProton();
