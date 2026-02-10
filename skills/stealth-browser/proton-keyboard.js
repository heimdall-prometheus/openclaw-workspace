#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdallwatcher',  // No dots - simpler
  password: 'Prometheus2026Secure!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL - Click + Keyboard\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    locale: 'de-DE',
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { timeout: 30000, waitUntil: 'load' });
    await delay(5000);
    
    console.log('Page loaded');
    await page.screenshot({ path: '/tmp/protonk-1.png' });
    
    // Click on username field using coordinates
    console.log('\n1️⃣ Clicking username field...');
    // Find the input and get its bounding box
    const usernameBox = await page.evaluate(() => {
      const input = document.getElementById('username');
      if (input) {
        const rect = input.getBoundingClientRect();
        return { x: rect.x + rect.width/2, y: rect.y + rect.height/2, found: true };
      }
      return { found: false };
    });
    console.log('Username box:', usernameBox);
    
    if (usernameBox.found) {
      await page.mouse.click(usernameBox.x, usernameBox.y);
      await delay(500);
      
      console.log('   Typing username...');
      await page.keyboard.type(IDENTITY.username, { delay: 50 });
      await delay(500);
    }
    
    await page.screenshot({ path: '/tmp/protonk-2.png' });
    
    // Tab to password or click it
    console.log('\n2️⃣ Moving to password...');
    const passwordBox = await page.evaluate(() => {
      const input = document.getElementById('password');
      if (input) {
        const rect = input.getBoundingClientRect();
        return { x: rect.x + rect.width/2, y: rect.y + rect.height/2, found: true };
      }
      return { found: false };
    });
    console.log('Password box:', passwordBox);
    
    if (passwordBox.found) {
      await page.mouse.click(passwordBox.x, passwordBox.y);
      await delay(500);
      
      console.log('   Typing password...');
      await page.keyboard.type(IDENTITY.password, { delay: 30 });
      await delay(500);
    }
    
    // Check for confirm password
    const confirmBox = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[type="password"]');
      if (inputs[1]) {
        const rect = inputs[1].getBoundingClientRect();
        return { x: rect.x + rect.width/2, y: rect.y + rect.height/2, found: true };
      }
      return { found: false };
    });
    
    if (confirmBox.found) {
      console.log('\n3️⃣ Confirm password...');
      await page.mouse.click(confirmBox.x, confirmBox.y);
      await delay(500);
      await page.keyboard.type(IDENTITY.password, { delay: 30 });
    }
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protonk-3.png' });
    
    // Check values
    const values = await page.evaluate(() => {
      return {
        username: document.getElementById('username')?.value,
        password: document.getElementById('password')?.value
      };
    });
    console.log('\nValues:', values);
    
    // Submit
    console.log('\n🚀 Clicking submit...');
    const submitBox = await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        return { x: rect.x + rect.width/2, y: rect.y + rect.height/2, found: true, text: btn.textContent };
      }
      return { found: false };
    });
    console.log('Submit button:', submitBox);
    
    if (submitBox.found) {
      await page.mouse.click(submitBox.x, submitBox.y);
    }
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/protonk-4.png' });
    
    const url = page.url();
    const content = await page.textContent('body').catch(() => '');
    console.log('\n📍 URL:', url);
    console.log('📄 Content:', content?.substring(0, 200));
    
    if (content?.toLowerCase().includes('captcha') || content?.toLowerCase().includes('human')) {
      console.log('\n⚠️ CAPTCHA DETECTED');
    } else if (!url.includes('signup')) {
      console.log('\n🎉 POSSIBLE SUCCESS!');
    }
    
  } catch (err) {
    console.error('❌', err.message);
    await page.screenshot({ path: '/tmp/protonk-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

registerProton();
