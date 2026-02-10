#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function getMagicLink() {
  console.log('🔗 Getting magic link via email (v2)...\n');
  
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
    
    // Screenshot initial state
    await page.screenshot({ path: '/tmp/magic2-1.png' });
    
    // Find and click magic link button by looking for link icon button
    console.log('1️⃣ Clicking magic link button...');
    const clicked = await page.evaluate(() => {
      // Look for all buttons/clickable elements
      const allButtons = document.querySelectorAll('button, [role="button"], a');
      for (const el of allButtons) {
        const text = el.textContent?.trim() || '';
        // Match the exact German text
        if (text.includes('Einmaligen Link per Mail')) {
          el.click();
          return 'Found: ' + text;
        }
      }
      return null;
    });
    console.log('Clicked:', clicked);
    
    await delay(3000);
    await page.screenshot({ path: '/tmp/magic2-2.png' });
    
    // Now enter email in the magic link form
    console.log('\n2️⃣ Entering email...');
    
    // Focus the email input (should be a new form now)
    const focused = await page.evaluate(() => {
      // Try shadow DOM first
      for (const comp of document.querySelectorAll('faceplate-text-input')) {
        const input = comp.shadowRoot?.querySelector('input');
        if (input) {
          input.focus();
          input.value = 'heim.dall@prometheus-labs.io';
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return 'shadow: ' + input.placeholder;
        }
      }
      // Try regular inputs
      const inputs = document.querySelectorAll('input[type="email"], input[type="text"]');
      for (const input of inputs) {
        if (!input.type || input.type === 'text' || input.type === 'email') {
          input.focus();
          input.value = 'heim.dall@prometheus-labs.io';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          return 'regular: ' + input.placeholder;
        }
      }
      return null;
    });
    console.log('Focused:', focused);
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/magic2-3.png' });
    
    // Click send/continue button
    console.log('\n3️⃣ Clicking send...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('senden') || text.includes('send') || 
            text.includes('weiter') || text.includes('continue')) {
          if (!btn.disabled) {
            btn.click();
            return text;
          }
        }
      }
      return null;
    });
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/magic2-4.png' });
    
    const url = page.url();
    const content = await page.evaluate(() => document.body.innerText.substring(0, 500));
    console.log('\n📍 URL:', url);
    console.log('📄 Content preview:', content.substring(0, 200));
    
    console.log('\n📧 Check email now!');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/magic2-error.png' });
  }
  
  await browser.close();
}

getMagicLink();
