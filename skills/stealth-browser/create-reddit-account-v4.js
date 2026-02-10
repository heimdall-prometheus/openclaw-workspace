#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDENTIALS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function createRedditAccount() {
  console.log('🚀 Reddit Account Creation v4\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    console.log('📍 Opening Reddit signup...');
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(2000);
    
    // Accept cookies by clicking anywhere that says accept/akzeptieren
    console.log('🍪 Accepting cookies...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.toLowerCase().includes('akzeptieren') || 
            btn.textContent.toLowerCase().includes('accept')) {
          btn.click();
          return;
        }
      }
    });
    await delay(1500);
    
    await page.screenshot({ path: '/tmp/reddit-v4-1.png' });
    console.log('📸 Screenshot 1');
    
    // Click on the email field area (it's a div that contains the label "Mailadresse")
    console.log('\n📧 Clicking email field...');
    
    // Find and click on the email input area
    const clicked = await page.evaluate(() => {
      // Look for any element containing "Mailadresse" or "email"
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        const text = el.textContent?.toLowerCase() || '';
        const tag = el.tagName.toLowerCase();
        
        // If it's an input inside something with Mailadresse
        if (tag === 'input' && el.closest('div')?.textContent?.includes('Mailadresse')) {
          el.focus();
          el.click();
          return 'found input near Mailadresse';
        }
      }
      
      // Try clicking on any text input
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input:not([type="checkbox"]):not([type="hidden"])');
      for (const input of inputs) {
        if (input.offsetParent !== null) { // is visible
          input.focus();
          input.click();
          return 'found visible input: ' + input.name;
        }
      }
      
      // Click on div that looks like form field
      const formFields = document.querySelectorAll('div[class*="input"], div[class*="field"]');
      if (formFields.length > 0) {
        formFields[0].click();
        return 'clicked form field div';
      }
      
      return 'nothing found';
    });
    console.log('   Result:', clicked);
    
    await delay(500);
    
    // Now type the email
    console.log('   Typing email...');
    await page.keyboard.type(CREDENTIALS.email, { delay: 50 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-v4-2-email.png' });
    console.log('📸 Screenshot 2');
    
    // Click Weiter/Continue
    console.log('\n➡️ Clicking Weiter...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.trim().toLowerCase() === 'weiter' || 
            btn.textContent.trim().toLowerCase() === 'continue') {
          btn.click();
          return;
        }
      }
      // Fallback: click submit
      const submit = document.querySelector('button[type="submit"]');
      if (submit) submit.click();
    });
    
    await delay(4000);
    await page.screenshot({ path: '/tmp/reddit-v4-3-next.png' });
    console.log('📸 Screenshot 3');
    
    // Check what page we're on now
    const pageContent = await page.content();
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    // Look for username/password fields
    console.log('\n👤 Looking for username/password...');
    
    await page.evaluate((creds) => {
      const inputs = document.querySelectorAll('input');
      for (const input of inputs) {
        const name = input.name?.toLowerCase() || '';
        const type = input.type?.toLowerCase() || '';
        const placeholder = input.placeholder?.toLowerCase() || '';
        
        if (name.includes('username') || placeholder.includes('username')) {
          input.focus();
          input.value = creds.username;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (type === 'password' || name.includes('password')) {
          input.focus();
          input.value = creds.password;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }, CREDENTIALS);
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/reddit-v4-4-filled.png' });
    console.log('📸 Screenshot 4');
    
    // Submit
    console.log('\n🚀 Submitting...');
    await page.evaluate(() => {
      const submit = document.querySelector('button[type="submit"]');
      if (submit) submit.click();
    });
    
    await delay(6000);
    await page.screenshot({ path: '/tmp/reddit-v4-5-result.png' });
    console.log('📸 Final screenshot');
    
    console.log('\n📍 Final URL:', page.url());
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-v4-error.png' });
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

createRedditAccount();
