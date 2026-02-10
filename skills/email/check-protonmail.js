#!/usr/bin/env node
/**
 * ProtonMail Inbox Checker
 * Uses Stealth Browser + VPN to check haimdall-waldersee@proton.me
 */

const { launchStealthBrowser, createStealthPage } = require('../stealth-browser/stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'haimdall-waldersee@proton.me',
  password: 'heimdallseinpasswort'
};

async function checkProtonMail() {
  console.log('📬 PROTONMAIL CHECK (VPN/Stealth)\n');
  console.log('Account:', CREDS.email);
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    // Go to ProtonMail login
    console.log('\n1️⃣ Loading login page...');
    await page.goto('https://mail.proton.me/login', { waitUntil: 'networkidle2', timeout: 60000 });
    await delay(5000);
    
    await page.screenshot({ path: '/tmp/proton-check-1.png' });
    
    // Enter email via keyboard (React-safe)
    console.log('2️⃣ Entering credentials via keyboard...');
    
    // Click email field
    await page.click('#username, input[name="username"]').catch(() => {});
    await delay(300);
    await page.keyboard.type(CREDS.email, { delay: 30 });
    
    await delay(500);
    
    // Click password field
    await page.click('#password, input[type="password"]').catch(() => {});
    await delay(300);
    await page.keyboard.type(CREDS.password, { delay: 30 });
    
    await delay(500);
    
    // Click login
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) btn.click();
    });
    
    console.log('3️⃣ Logging in...');
    await delay(15000);
    
    await page.screenshot({ path: '/tmp/proton-check-2.png' });
    
    const url = page.url();
    console.log('   URL:', url);
    
    if (url.includes('inbox') || url.includes('mail')) {
      console.log('   ✅ Logged in!');
      
      // Get inbox summary
      const inbox = await page.evaluate(() => {
        const items = document.querySelectorAll('[data-testid="message-item"], .item-container, [class*="conversation"]');
        const unread = document.querySelectorAll('[class*="unread"], [data-testid*="unread"]');
        return {
          total: items.length,
          unread: unread.length
        };
      });
      
      console.log('\n📧 INBOX:');
      console.log('   Total visible:', inbox.total);
      console.log('   Unread:', inbox.unread);
      
      if (inbox.unread > 0) {
        console.log('\n⚠️ NEW EMAILS DETECTED!');
      } else {
        console.log('\n✅ No new emails');
      }
      
      await page.screenshot({ path: '/tmp/proton-check-inbox.png' });
      
    } else if (url.includes('login')) {
      console.log('   ❌ Still on login page - check credentials or CAPTCHA');
      await page.screenshot({ path: '/tmp/proton-check-error.png' });
    } else {
      console.log('   🤔 Unknown page:', url);
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/proton-check-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

// Run if called directly
if (require.main === module) {
  checkProtonMail();
}

module.exports = { checkProtonMail };
