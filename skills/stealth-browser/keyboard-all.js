#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');
const { execSync } = require('child_process');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'heim.dall@prometheus-labs.io',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function keyboardAll() {
  console.log('⌨️ KEYBOARD-ONLY APPROACH\n');
  
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
    
    // STEP 1: Email - focus first, then keyboard type
    console.log('1️⃣ EMAIL (keyboard)');
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type !== 'password') {
          input.focus();
          return true;
        }
      }
    });
    await page.keyboard.type(CREDS.email, { delay: 30 });
    await delay(500);
    
    // Tab to button and Enter
    await page.keyboard.press('Tab');
    await delay(200);
    await page.keyboard.press('Enter');
    console.log('   Submitted');
    
    await delay(7000);
    
    // STEP 2: Code
    console.log('2️⃣ CODE (keyboard)');
    await delay(2000);
    const emailOut = execSync('node /home/reisig/.openclaw/workspace/skills/email/check-email.js --limit 1 --from "reddit" 2>&1').toString();
    const codeMatch = emailOut.match(/(\d{6}) is your Reddit/);
    const code = codeMatch ? codeMatch[1] : null;
    console.log('   Code:', code);
    
    // Focus code input and type
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) { input.focus(); return true; }
      }
    });
    await page.keyboard.type(code, { delay: 80 });
    await delay(500);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    console.log('   Submitted');
    
    await delay(7000);
    await page.screenshot({ path: '/tmp/kb-1.png' });
    
    // STEP 3: Username page - Tab to password, type it
    console.log('3️⃣ PASSWORD (keyboard only)');
    
    // Get current username
    const autoName = await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type === 'text' && input.value) {
          return input.value;
        }
      }
    });
    console.log('   Auto username:', autoName);
    
    // Tab from username to password
    await page.keyboard.press('Tab');
    await delay(300);
    
    // Type password
    await page.keyboard.type(CREDS.password, { delay: 30 });
    console.log('   Typed password');
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/kb-2.png' });
    
    // Submit with Enter
    console.log('\n🚀 SUBMITTING (Enter)...');
    await page.keyboard.press('Enter');
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/kb-final.png' });
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    if (!finalUrl.includes('register')) {
      console.log('\n🎉🎉🎉 ACCOUNT CREATED!!! 🎉🎉🎉');
      console.log('Username:', autoName);
      console.log('Password:', CREDS.password);
    } else {
      const content = await page.evaluate(() => document.body.innerText);
      console.log('\n📄 Page:', content.substring(0, 300));
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/kb-error.png' });
  }
  
  await browser.close();
}

keyboardAll();
