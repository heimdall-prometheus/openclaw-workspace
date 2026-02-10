#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdallwatcher',
  password: 'Prometheus2026Secure!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL - Final attempt\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US'  // English for simpler form
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { timeout: 30000 });
    await delay(5000);
    
    console.log('Page loaded');
    await page.screenshot({ path: '/tmp/protonf-1.png' });
    
    // Get exact position of visible username field by looking at its visible wrapper
    const fieldPos = await page.evaluate(() => {
      // Find visible input wrapper (the one with border)
      const wrappers = document.querySelectorAll('[class*="input-container"], [class*="InputField"], .field-two-container');
      for (const w of wrappers) {
        const rect = w.getBoundingClientRect();
        if (rect.x > 0 && rect.y > 0 && rect.y < 400 && rect.width > 200) {
          return { x: rect.x + rect.width/2, y: rect.y + rect.height/2, found: true };
        }
      }
      
      // Alternative: find the email-input-field class element's parent container
      const emailField = document.querySelector('.email-input-field, [data-testid*="input"]');
      if (emailField) {
        let parent = emailField.closest('[class*="container"], [class*="field"]');
        if (parent) {
          const rect = parent.getBoundingClientRect();
          if (rect.x > 0) return { x: rect.x + rect.width/2, y: rect.y + rect.height/2, found: true };
        }
      }
      
      return { found: false };
    });
    
    console.log('Field position:', fieldPos);
    
    // Click directly on username area (from screenshot: around y=308, x=582 center)
    console.log('\n1️⃣ Clicking username field...');
    await page.mouse.click(582, 308);
    await delay(500);
    
    console.log('   Typing username...');
    await page.keyboard.type(IDENTITY.username, { delay: 50 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protonf-2.png' });
    
    // Check if username was entered
    const usernameVal = await page.evaluate(() => {
      const input = document.getElementById('username') || document.querySelector('[id*="email"], [name*="email"]');
      return input?.value || '';
    });
    console.log('   Username value:', usernameVal);
    
    // Click password field (from screenshot: around y=397)
    console.log('\n2️⃣ Clicking password field...');
    await page.mouse.click(582, 397);
    await delay(500);
    
    console.log('   Typing password...');
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protonf-3.png' });
    
    // Check values
    const vals = await page.evaluate(() => ({
      username: document.getElementById('username')?.value || '',
      password: document.getElementById('password')?.value?.length || 0
    }));
    console.log('   Values:', vals);
    
    // Click submit button (from screenshot: around y=446)
    console.log('\n🚀 Clicking submit...');
    await page.mouse.click(582, 446);
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/protonf-4.png' });
    
    const url = page.url();
    const body = await page.textContent('body').catch(() => '');
    console.log('\n📍 URL:', url);
    
    if (body?.toLowerCase().includes('captcha') || body?.toLowerCase().includes('human')) {
      console.log('⚠️ CAPTCHA detected!');
    } else if (body?.toLowerCase().includes('taken') || body?.toLowerCase().includes('already')) {
      console.log('⚠️ Username taken');
    } else if (!url.includes('signup')) {
      console.log('\n🎉🎉🎉 SUCCESS! 🎉🎉🎉');
      console.log('Email:', IDENTITY.username + '@proton.me');
      console.log('Password:', IDENTITY.password);
    } else {
      console.log('📄 Body:', body?.substring(0, 200));
    }
    
  } catch (err) {
    console.error('❌', err.message);
    await page.screenshot({ path: '/tmp/protonf-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

registerProton();
