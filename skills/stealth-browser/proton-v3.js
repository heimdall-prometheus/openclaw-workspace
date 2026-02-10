#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdall.watcher',
  password: 'Pr0m3th3us_W4tch3r_2026!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL V3 - Click approach\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  page.setDefaultTimeout(60000);
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await delay(5000);
    
    console.log('Page loaded');
    await page.screenshot({ path: '/tmp/proton3-1.png' });
    
    // Click on username input explicitly
    console.log('\n1️⃣ Clicking username field...');
    await page.click('input#email, input[name="email"], input[placeholder*="name"], input[type="text"]', { timeout: 10000 }).catch(() => {
      console.log('   Direct selector failed, trying evaluate...');
    });
    
    // Find and click via evaluate
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input');
      for (const input of inputs) {
        if (input.type === 'text' || input.type === 'email' || !input.type) {
          input.click();
          input.focus();
          return true;
        }
      }
      return false;
    });
    
    await delay(500);
    
    // Type username character by character using page.type which is more reliable
    console.log('   Typing username:', IDENTITY.username);
    for (const char of IDENTITY.username) {
      await page.keyboard.press(char === '.' ? 'Period' : `Key${char.toUpperCase()}`).catch(() => {
        // Fallback for special chars
        return page.keyboard.type(char);
      });
      await delay(50);
    }
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/proton3-2.png' });
    
    // Click password field
    console.log('\n2️⃣ Clicking password field...');
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[type="password"]');
      if (inputs[0]) {
        inputs[0].click();
        inputs[0].focus();
        return true;
      }
      return false;
    });
    
    await delay(500);
    
    // Type password
    console.log('   Typing password...');
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/proton3-3.png' });
    
    // Click submit button
    console.log('\n3️⃣ Clicking submit...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Beginne') || btn.textContent?.includes('Create') ||
            btn.textContent?.includes('Start') || btn.type === 'submit') {
          btn.click();
          return btn.textContent;
        }
      }
      return null;
    });
    
    await delay(10000);
    await page.screenshot({ path: '/tmp/proton3-4.png' });
    
    // Check result
    const finalUrl = page.url();
    const content = await page.evaluate(() => document.body?.innerText?.substring(0, 500) || '');
    
    console.log('\nFinal URL:', finalUrl);
    console.log('Content:', content.substring(0, 200));
    
    if (content.toLowerCase().includes('captcha') || content.toLowerCase().includes('verification')) {
      console.log('\n⚠️ CAPTCHA required');
    } else if (content.toLowerCase().includes('already') || content.toLowerCase().includes('exists')) {
      console.log('\n⚠️ Username taken');
    } else if (!finalUrl.includes('signup')) {
      console.log('\n🎉 Possible success!');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/proton3-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

registerProton();
