#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function register() {
  console.log('🎭 PLAYWRIGHT V2\n');
  
  // Get latest code
  const { execSync } = require('child_process');
  const emailOut = execSync('node /home/reisig/.openclaw/workspace/skills/email/check-email.js --limit 3 --from "reddit" 2>&1').toString();
  const codeMatch = emailOut.match(/(\d{6}) is your Reddit/);
  const code = codeMatch ? codeMatch[1] : '135012';
  console.log('📧 Using code:', code);
  
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
    
    // Cookies
    try {
      await page.click('button:has-text("akzeptieren")', { timeout: 3000 });
    } catch (e) {}
    await delay(1000);
    
    // STEP 1: Email
    console.log('\n1️⃣ EMAIL...');
    // Use keyboard to type into focused element
    await page.keyboard.type(CREDS.email, { delay: 30 });
    await delay(500);
    await page.keyboard.press('Enter');
    console.log('   Typed & submitted');
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/pw2-1.png' });
    
    // STEP 2: Verification Code
    console.log('\n2️⃣ CODE:', code);
    // The code input should now be focused, just type
    await page.keyboard.type(code, { delay: 50 });
    await delay(500);
    await page.keyboard.press('Enter');
    console.log('   Typed & submitted');
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/pw2-2.png' });
    
    // STEP 3: Username + Password
    console.log('\n3️⃣ USERNAME + PASSWORD...');
    const pageContent = await page.textContent('body');
    console.log('   Page contains:', pageContent.substring(0, 100));
    
    // Username field should be focused or we need to find it
    // First clear any auto-generated username
    await page.keyboard.press('Control+a');
    await delay(100);
    await page.keyboard.type(CREDS.username, { delay: 30 });
    console.log('   Typed username');
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/pw2-3.png' });
    
    // Tab to password
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.type(CREDS.password, { delay: 30 });
    console.log('   Typed password');
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/pw2-4.png' });
    
    // Submit
    console.log('\n🚀 SUBMITTING...');
    await page.keyboard.press('Enter');
    
    await delay(10000);
    await page.screenshot({ path: '/tmp/pw2-final.png' });
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    const finalContent = await page.textContent('body');
    if (finalContent.toLowerCase().includes('welcome') || !finalUrl.includes('register')) {
      console.log('\n🎉 SUCCESS!');
    } else {
      console.log('\n📄 Final page:', finalContent.substring(0, 200));
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/pw2-error.png' });
  }
  
  await browser.close();
}

register();
