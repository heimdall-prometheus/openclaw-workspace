#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');
const { execSync } = require('child_process');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function finalAttempt() {
  console.log('🎯 FINAL ATTEMPT - Stealth + VPN\n');
  
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
    await page.screenshot({ path: '/tmp/final-0.png' });
    
    // STEP 1: Email via Shadow DOM
    console.log('1️⃣ EMAIL:', CREDS.email);
    await page.evaluate((email) => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type !== 'password') {
          input.focus();
          input.value = email;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
          return true;
        }
      }
      return false;
    }, CREDS.email);
    
    await delay(1000);
    
    // Click Weiter button
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') {
          b.click();
          return true;
        }
      }
      return false;
    });
    
    console.log('   Clicked Weiter');
    await delay(6000);
    await page.screenshot({ path: '/tmp/final-1.png' });
    
    // Check if we're on verification code page
    const content1 = await page.evaluate(() => document.body.innerText);
    if (content1.includes('Verifizierungscode') || content1.includes('verification')) {
      console.log('   ✅ On verification page!');
    } else {
      console.log('   ⚠️ Page content:', content1.substring(0, 100));
    }
    
    // STEP 2: Get and enter latest code
    console.log('\n2️⃣ GETTING LATEST CODE...');
    await delay(3000); // Wait for email to arrive
    
    const emailOut = execSync('node /home/reisig/.openclaw/workspace/skills/email/check-email.js --limit 1 --from "reddit" 2>&1').toString();
    const codeMatch = emailOut.match(/(\d{6}) is your Reddit/);
    const code = codeMatch ? codeMatch[1] : null;
    
    if (!code) {
      console.log('   ❌ No code found!');
      await browser.close();
      return;
    }
    console.log('   Code:', code);
    
    // Enter code
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) {
          input.focus();
          return true;
        }
      }
    });
    await page.keyboard.type(code, { delay: 80 });
    
    await delay(1000);
    
    // Click Weiter
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') {
          b.click();
          return true;
        }
      }
    });
    
    console.log('   Submitted code');
    await delay(6000);
    await page.screenshot({ path: '/tmp/final-2.png' });
    
    // STEP 3: Username - CRITICAL PART
    console.log('\n3️⃣ USERNAME:', CREDS.username);
    
    // Find username input (non-password, non-email)
    const inputs = await page.evaluate(() => {
      const results = [];
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) {
          results.push({ type: input.type, value: input.value, placeholder: input.placeholder });
        }
      }
      return results;
    });
    console.log('   Found inputs:', JSON.stringify(inputs));
    
    // Triple-click to select all, then type
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input && input.type !== 'password') {
          input.focus();
          input.select();
          return true;
        }
      }
    });
    
    await page.keyboard.type(CREDS.username, { delay: 50 });
    console.log('   Typed username');
    
    await delay(3000);
    await page.screenshot({ path: '/tmp/final-3.png' });
    
    // Check availability
    const content3 = await page.evaluate(() => document.body.innerText.toLowerCase());
    if (content3.includes('available') || content3.includes('verfügbar')) {
      console.log('   ✅ Username available!');
    } else {
      console.log('   ⚠️ Username status unclear');
    }
    
    // STEP 4: Password
    console.log('\n4️⃣ PASSWORD...');
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
    await page.screenshot({ path: '/tmp/final-4.png' });
    
    // SUBMIT
    console.log('\n🚀 FINAL SUBMIT...');
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'weiter') {
          b.click();
          return true;
        }
      }
    });
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/final-done.png' });
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    if (!finalUrl.includes('register')) {
      console.log('\n🎉🎉🎉 ACCOUNT CREATED!!! 🎉🎉🎉');
    } else {
      const finalContent = await page.evaluate(() => document.body.innerText);
      console.log('\n📄 Final page:', finalContent.substring(0, 300));
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/final-error.png' });
  }
  
  await browser.close();
}

finalAttempt();
