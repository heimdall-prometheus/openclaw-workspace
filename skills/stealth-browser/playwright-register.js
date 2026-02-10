#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo',
  code: '135012'  // Latest code
};

async function register() {
  console.log('🎭 PLAYWRIGHT APPROACH\n');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'de-DE'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle' });
    await delay(3000);
    
    // Accept cookies
    const acceptBtn = page.locator('button:has-text("akzeptieren"), button:has-text("Accept")').first();
    if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptBtn.click();
      await delay(1000);
    }
    
    await page.screenshot({ path: '/tmp/pw-1.png' });
    console.log('📸 1. Initial page');
    
    // Step 1: Email - use Playwright's fill which handles Shadow DOM
    console.log('\n1️⃣ EMAIL...');
    
    // Find input in shadow DOM using Playwright's pierce selector
    const emailInput = page.locator('faceplate-text-input input').first();
    await emailInput.fill(CREDS.email);
    console.log('   Filled email');
    
    await delay(500);
    
    // Click continue
    await page.locator('button:has-text("Weiter"), button:has-text("Continue")').first().click();
    console.log('   Clicked continue');
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/pw-2.png' });
    console.log('📸 2. After email');
    
    // Step 2: Verification code
    console.log('\n2️⃣ CODE:', CREDS.code);
    const codeInput = page.locator('faceplate-text-input input').first();
    await codeInput.fill(CREDS.code);
    
    await page.locator('button:has-text("Weiter"), button:has-text("Continue")').first().click();
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/pw-3.png' });
    console.log('📸 3. After code');
    
    // Step 3: Username + Password
    console.log('\n3️⃣ USERNAME + PASSWORD...');
    
    // Get all inputs
    const inputs = page.locator('faceplate-text-input input');
    const count = await inputs.count();
    console.log('   Found', count, 'inputs');
    
    // Username should be first non-password input
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const type = await input.getAttribute('type');
      console.log(`   Input ${i}: type=${type}`);
      
      if (type !== 'password') {
        // This is username - clear and fill
        await input.click();
        await input.fill('');  // Clear
        await input.fill(CREDS.username);
        console.log('   Set username to:', CREDS.username);
      } else {
        // Password
        await input.fill(CREDS.password);
        console.log('   Set password');
      }
    }
    
    await delay(3000);
    await page.screenshot({ path: '/tmp/pw-4.png' });
    console.log('📸 4. After username/password');
    
    // Check if username is available
    const pageText = await page.textContent('body');
    if (pageText.toLowerCase().includes('available')) {
      console.log('   ✅ Username available!');
    } else if (pageText.toLowerCase().includes('taken') || pageText.toLowerCase().includes('vergeben')) {
      console.log('   ❌ Username taken!');
    }
    
    // Submit
    console.log('\n🚀 SUBMITTING...');
    await page.locator('button:has-text("Weiter"), button:has-text("Continue"), button:has-text("Sign Up")').first().click();
    
    await delay(10000);
    await page.screenshot({ path: '/tmp/pw-final.png' });
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    if (!finalUrl.includes('register')) {
      console.log('\n🎉🎉🎉 SUCCESS! Account created! 🎉🎉🎉');
    } else {
      console.log('\n⚠️ Still on register page');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/pw-error.png' });
  }
  
  await browser.close();
}

register();
