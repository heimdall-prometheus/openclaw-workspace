#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');
const { execSync } = require('child_process');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function finishRegistration() {
  console.log('🏁 FINISHING REGISTRATION\n');
  
  // Get fresh code
  const emailOut = execSync('node /home/reisig/.openclaw/workspace/skills/email/check-email.js --limit 5 2>&1').toString();
  const codes = emailOut.match(/(\d{6}) is your Reddit verification code/g);
  const latestCode = codes ? codes[codes.length - 1].match(/\d{6}/)[0] : null;
  console.log('Latest verification code:', latestCode);
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2' });
    await delay(3000);
    
    // Cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
      });
    });
    await delay(2000);
    
    // Email
    console.log('\n1️⃣ Email...');
    await page.evaluate((email) => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type !== 'password') {
          input.focus();
          input.value = email;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          break;
        }
      }
    }, CREDS.email);
    await delay(500);
    
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); break; }
      }
    });
    await delay(5000);
    
    // Verification code
    console.log('2️⃣ Code:', latestCode);
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) { input.focus(); break; }
      }
    });
    await page.keyboard.type(latestCode, { delay: 80 });
    await delay(500);
    
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); break; }
      }
    });
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-finish-1.png' });
    
    // Username - TRIPLE CLEAR then type
    console.log('3️⃣ Username: erik_builds');
    
    // Method: Focus, select all with Ctrl+A, then type to replace
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type !== 'password') {
          input.focus();
          input.select();
          return true;
        }
      }
      return false;
    });
    
    // Select all and type to replace
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.up('Control');
    await delay(100);
    await page.keyboard.type(CREDS.username, { delay: 50 });
    
    console.log('   Typed username via keyboard');
    await delay(3000); // Wait for availability check
    await page.screenshot({ path: '/tmp/reddit-finish-2.png' });
    
    // Check availability
    const available = await page.evaluate(() => {
      return document.body.innerText.toLowerCase().includes('available');
    });
    console.log('   Available:', available ? '✅' : '❌');
    
    // Password - should already be empty or we need to fill it
    console.log('4️⃣ Password...');
    await page.evaluate((pwd) => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input[type="password"]');
        if (input) {
          input.focus();
          input.value = pwd;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return true;
        }
      }
      return false;
    }, CREDS.password);
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-finish-3.png' });
    
    // SUBMIT!
    console.log('\n🚀 SUBMITTING...');
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') {
          console.log('Clicking:', b.textContent);
          b.click();
          break;
        }
      }
    });
    
    // Also try pressing Enter
    await delay(500);
    await page.keyboard.press('Enter');
    
    await delay(10000);
    await page.screenshot({ path: '/tmp/reddit-finish-final.png' });
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    if (!finalUrl.includes('register')) {
      console.log('\n🎉🎉🎉 ACCOUNT CREATED! 🎉🎉🎉');
    }
    
  } catch (err) {
    console.error('❌', err.message);
    await page.screenshot({ path: '/tmp/reddit-finish-error.png' });
  }
  
  await browser.close();
}

finishRegistration();
