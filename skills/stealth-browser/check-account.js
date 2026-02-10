#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function checkAccount() {
  console.log('🔍 Checking if account exists...\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    // Try password reset - this will tell us if account exists
    await page.goto('https://www.reddit.com/password', { waitUntil: 'networkidle2' });
    await delay(3000);
    
    // Accept cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
      });
    });
    await delay(2000);
    
    await page.screenshot({ path: '/tmp/check-1.png' });
    console.log('📸 Password reset page loaded');
    
    // Find email input and enter email
    await page.evaluate((email) => {
      // Shadow DOM
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) {
          input.focus();
          input.value = email;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return 'shadow';
        }
      }
      // Regular
      const input = document.querySelector('input[type="email"], input[type="text"]');
      if (input) {
        input.value = email;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        return 'regular';
      }
      return null;
    }, 'heim.dall@prometheus-labs.io');
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/check-2.png' });
    
    // Click reset button
    await page.evaluate(() => {
      for (const btn of document.querySelectorAll('button')) {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('reset') || text.includes('zurücksetzen') || text.includes('senden')) {
          btn.click();
          return text;
        }
      }
    });
    
    await page.keyboard.press('Enter');
    await delay(5000);
    
    await page.screenshot({ path: '/tmp/check-3.png' });
    
    const content = await page.evaluate(() => document.body.innerText);
    console.log('\n📄 Page content:', content.substring(0, 500));
    
    if (content.toLowerCase().includes('email sent') || 
        content.toLowerCase().includes('gesendet') ||
        content.toLowerCase().includes('check your')) {
      console.log('\n✅ ACCOUNT EXISTS! Password reset email sent.');
    } else if (content.toLowerCase().includes('not found') || 
               content.toLowerCase().includes('nicht gefunden')) {
      console.log('\n❌ Account does NOT exist.');
    } else {
      console.log('\n🤔 Unclear - check screenshots');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  await browser.close();
}

checkAccount();
