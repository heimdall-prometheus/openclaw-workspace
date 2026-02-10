#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function resetPassword() {
  console.log('🔐 Requesting password reset...\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    await page.goto('https://www.reddit.com/password', { waitUntil: 'networkidle2' });
    await delay(3000);
    
    // Cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
      });
    });
    await delay(2000);
    
    // Enter email via shadow DOM
    console.log('1️⃣ Entering email...');
    await page.evaluate((email) => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) {
          input.focus();
          input.value = email;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return true;
        }
      }
      return false;
    }, 'heim.dall@prometheus-labs.io');
    
    await delay(1000);
    
    // Click the orange button directly
    console.log('2️⃣ Clicking reset button...');
    
    // Try clicking by finding the button with specific text
    const clicked = await page.evaluate(() => {
      // Find button with "Passwort zurücksetzen" text
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Passwort zurücksetzen') || 
            btn.textContent?.includes('Reset password')) {
          // Force click
          btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          return btn.textContent;
        }
      }
      
      // Try form submit
      const form = document.querySelector('form');
      if (form) {
        form.submit();
        return 'form submitted';
      }
      
      return null;
    });
    console.log('Clicked:', clicked);
    
    // Also try pressing Enter
    await page.keyboard.press('Enter');
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/reset-result.png' });
    
    const content = await page.evaluate(() => document.body.innerText);
    console.log('\n📄 Result:', content.substring(0, 400));
    
    // Check for password reset email
    if (content.includes('E-Mail') && content.includes('gesendet') ||
        content.includes('email') && content.includes('sent') ||
        content.includes('Check')) {
      console.log('\n✅ PASSWORD RESET EMAIL SENT! Account EXISTS!');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  await browser.close();
}

resetPassword();
