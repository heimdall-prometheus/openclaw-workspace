#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');
const { execSync } = require('child_process');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'heim.dall@prometheus-labs.io',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function getLatestCode() {
  const out = execSync('node /home/reisig/.openclaw/workspace/skills/email/check-email.js --limit 1 --from "reddit" 2>&1').toString();
  const match = out.match(/"subject":\s*"(\d{6}) is your Reddit/);
  const dateMatch = out.match(/"date":\s*"([^"]+)"/);
  return {
    code: match ? match[1] : null,
    date: dateMatch ? new Date(dateMatch[1]) : null
  };
}

async function freshCode() {
  console.log('🔄 FRESH CODE APPROACH\n');
  
  // Remember current latest code
  const before = await getLatestCode();
  console.log('Current latest code:', before.code, '(from', before.date?.toISOString(), ')');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2' });
    await delay(4000);
    
    // Cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
      });
    });
    await delay(2000);
    
    // STEP 1: Email
    console.log('\n1️⃣ TRIGGERING NEW CODE...');
    await page.evaluate((email) => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type !== 'password') {
          input.focus();
          input.value = email;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return true;
        }
      }
    }, CREDS.email);
    
    await delay(500);
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); return true; }
      }
    });
    
    await delay(6000);
    await page.screenshot({ path: '/tmp/fresh-1.png' });
    
    // STEP 2: Wait for NEW code
    console.log('\n2️⃣ WAITING FOR NEW CODE...');
    let newCode = null;
    for (let i = 0; i < 12; i++) {
      await delay(5000);
      const after = await getLatestCode();
      console.log('   Check', i+1, ':', after.code, '(from', after.date?.toISOString(), ')');
      
      if (after.code && after.code !== before.code) {
        newCode = after.code;
        console.log('   ✅ NEW CODE:', newCode);
        break;
      }
    }
    
    if (!newCode) {
      console.log('   ❌ No new code arrived!');
      await browser.close();
      return;
    }
    
    // Enter code
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) { input.focus(); return true; }
      }
    });
    await page.keyboard.type(newCode, { delay: 80 });
    await delay(500);
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); return true; }
      }
    });
    
    console.log('   Code submitted!');
    await delay(6000);
    await page.screenshot({ path: '/tmp/fresh-2.png' });
    
    // STEP 3: Username + Password page
    console.log('\n3️⃣ USERNAME + PASSWORD...');
    
    // Get auto-generated username
    const autoName = await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type === 'text' && input.value && input.value.length > 6) {
          return input.value;
        }
      }
      return null;
    });
    console.log('   Auto username:', autoName);
    
    if (!autoName) {
      console.log('   ❌ Not on username page!');
      const content = await page.evaluate(() => document.body.innerText);
      console.log('   Page:', content.substring(0, 200));
      await browser.close();
      return;
    }
    
    // Tab to password and type
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.type(CREDS.password, { delay: 30 });
    console.log('   Typed password');
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/fresh-3.png' });
    
    // Submit
    console.log('\n🚀 SUBMITTING...');
    await page.keyboard.press('Enter');
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/fresh-final.png' });
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    if (!finalUrl.includes('register')) {
      console.log('\n🎉🎉🎉 ACCOUNT CREATED!!! 🎉🎉🎉');
      console.log('Username:', autoName);
      console.log('Password:', CREDS.password);
      console.log('Email:', CREDS.email);
    } else {
      const content = await page.evaluate(() => document.body.innerText);
      console.log('\n📄 Page:', content.substring(0, 300));
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/fresh-error.png' });
  }
  
  await browser.close();
}

freshCode();
