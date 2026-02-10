#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function getMagicLink() {
  console.log('🔗 Getting magic link via email...\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    await page.goto('https://www.reddit.com/login', { waitUntil: 'networkidle2' });
    await delay(3000);
    
    // Accept cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('akzeptieren') || 
            b.textContent.toLowerCase().includes('accept')) b.click();
      });
    });
    await delay(2000);
    
    await page.screenshot({ path: '/tmp/magic-1.png' });
    
    // Click "Einmaligen Link per Mail erhalten"
    console.log('Clicking magic link button...');
    const clicked = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Einmaligen Link') || 
            btn.textContent?.includes('magic link') ||
            btn.textContent?.includes('email')) {
          btn.click();
          return btn.textContent;
        }
      }
      return null;
    });
    console.log('Clicked:', clicked);
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/magic-2.png' });
    
    // Now we need to enter email - find the input and type
    console.log('Looking for email input...');
    
    // Try to find and focus email input in shadow DOM
    await page.evaluate(() => {
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) {
          input.focus();
          return true;
        }
      }
      // Fallback: regular inputs
      const regularInput = document.querySelector('input[type="email"], input[type="text"]');
      if (regularInput) {
        regularInput.focus();
        return true;
      }
      return false;
    });
    
    await delay(500);
    await page.keyboard.type('heim.dall@prometheus-labs.io', { delay: 50 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/magic-3.png' });
    
    // Click continue/submit
    console.log('Clicking submit...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('weiter') || text.includes('continue') || text.includes('send')) {
          btn.click();
          return true;
        }
      }
      return false;
    });
    
    await page.keyboard.press('Enter');
    await delay(5000);
    
    await page.screenshot({ path: '/tmp/magic-4.png' });
    console.log('📸 Screenshots saved to /tmp/magic-*.png');
    console.log('\n📧 Check email for magic link!');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/magic-error.png' });
  }
  
  await browser.close();
}

getMagicLink();
