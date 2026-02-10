#!/usr/bin/env node
/**
 * Reddit Registration with ProtonMail
 * Uses fresh ProtonMail address: haimdall-waldersee@proton.me
 */

const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'haimdall-waldersee@proton.me',
  password: 'heimdallseinpasswort'  // Same as ProtonMail for simplicity
};

async function registerReddit() {
  console.log('🔴 REDDIT + PROTONMAIL\n');
  console.log('Email:', CREDS.email);
  
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
    
    await page.screenshot({ path: '/tmp/reddit-pm-1.png' });
    
    // STEP 1: Email
    console.log('\n1️⃣ EMAIL:', CREDS.email);
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
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); return; }
      }
    });
    
    console.log('   Waiting for verification page...');
    await delay(8000);
    await page.screenshot({ path: '/tmp/reddit-pm-2.png' });
    
    // Check if we're on verification page
    const content = await page.evaluate(() => document.body.innerText);
    if (content.includes('Verifizierungscode') || content.includes('verification')) {
      console.log('   ✅ On verification page!');
      console.log('\n📧 CHECK PROTONMAIL FOR CODE!');
      console.log('   Run: node skills/email/check-protonmail.js');
    } else {
      console.log('   Page:', content.substring(0, 100));
    }
    
    const url = page.url();
    console.log('\n📍 URL:', url);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-pm-error.png' });
  }
  
  await browser.close();
}

registerReddit();
