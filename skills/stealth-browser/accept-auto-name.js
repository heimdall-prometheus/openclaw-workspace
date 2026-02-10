#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');
const { execSync } = require('child_process');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'heim.dall@prometheus-labs.io',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function acceptAutoName() {
  console.log('🎯 ACCEPTING AUTO-NAME\n');
  
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
    console.log('1️⃣ EMAIL');
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
    
    // STEP 2: Code
    console.log('2️⃣ CODE');
    await delay(2000);
    const emailOut = execSync('node /home/reisig/.openclaw/workspace/skills/email/check-email.js --limit 1 --from "reddit" 2>&1').toString();
    const codeMatch = emailOut.match(/(\d{6}) is your Reddit/);
    const code = codeMatch ? codeMatch[1] : null;
    console.log('   Using:', code);
    
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) { input.focus(); return true; }
      }
    });
    await page.keyboard.type(code, { delay: 80 });
    await delay(500);
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); return true; }
      }
    });
    
    await delay(6000);
    
    // STEP 3: ACCEPT AUTO-NAME, just fill password
    console.log('3️⃣ ACCEPTING AUTO-NAME, filling password only');
    
    // Get auto-generated username
    const autoName = await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type === 'text' && input.value) {
          return input.value;
        }
      }
      return null;
    });
    console.log('   Auto username:', autoName);
    
    // Fill password
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
    }, CREDS.password);
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/auto-1.png' });
    
    // SUBMIT
    console.log('\n🚀 SUBMITTING...');
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') { b.click(); return true; }
      }
    });
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/auto-final.png' });
    
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
    await page.screenshot({ path: '/tmp/auto-error.png' });
  }
  
  await browser.close();
}

acceptAutoName();
