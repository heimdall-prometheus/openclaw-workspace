#!/usr/bin/env node
/**
 * Finish Reddit registration with ProtonMail code
 */

const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'haimdall-waldersee@proton.me',
  code: '366935',  // From ProtonMail inbox
  password: 'heimdallseinpasswort'
};

async function finishReddit() {
  console.log('🔴 REDDIT FINISH - ProtonMail\n');
  console.log('Email:', CREDS.email);
  console.log('Code:', CREDS.code);
  
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
    console.log('\n1️⃣ EMAIL...');
    await page.evaluate((email) => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type !== 'password') {
          input.focus();
          input.value = email;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return;
        }
      }
    }, CREDS.email);
    
    await delay(500);
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); return; }
      }
    });
    
    await delay(6000);
    await page.screenshot({ path: '/tmp/reddit-fp-1.png' });
    
    // STEP 2: Enter code
    console.log('2️⃣ CODE:', CREDS.code);
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) { input.focus(); return; }
      }
    });
    await page.keyboard.type(CREDS.code, { delay: 80 });
    
    await delay(500);
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); return; }
      }
    });
    
    await delay(6000);
    await page.screenshot({ path: '/tmp/reddit-fp-2.png' });
    
    // STEP 3: Username + Password (accept auto-generated)
    console.log('3️⃣ USERNAME + PASSWORD...');
    
    // Get auto-generated username
    const autoName = await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type === 'text' && input.value && input.value.length > 5) {
          return input.value;
        }
      }
      return null;
    });
    console.log('   Auto username:', autoName);
    
    // Tab to password and type
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.type(CREDS.password, { delay: 30 });
    console.log('   Password entered');
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/reddit-fp-3.png' });
    
    // Submit
    console.log('\n🚀 SUBMITTING...');
    await page.keyboard.press('Enter');
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/reddit-fp-final.png' });
    
    const url = page.url();
    console.log('\n📍 Final URL:', url);
    
    if (!url.includes('register')) {
      console.log('\n🎉🎉🎉 REDDIT ACCOUNT CREATED!!! 🎉🎉🎉');
      console.log('Username:', autoName);
      console.log('Email:', CREDS.email);
      console.log('Password:', CREDS.password);
    } else {
      const content = await page.evaluate(() => document.body.innerText);
      console.log('\n📄 Page:', content.substring(0, 200));
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-fp-error.png' });
  }
  
  await browser.close();
}

finishReddit();
