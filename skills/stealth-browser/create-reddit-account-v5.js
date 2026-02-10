#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDENTIALS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function createRedditAccount() {
  console.log('🚀 Reddit Account Creation v5 (Direct Input)\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    console.log('📍 Opening Reddit signup...');
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    // Accept cookies
    console.log('🍪 Accepting cookies...');
    try {
      await page.click('button[aria-label*="akzeptieren"], button[aria-label*="accept"]');
    } catch (e) {
      await page.evaluate(() => {
        document.querySelectorAll('button').forEach(b => {
          if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
        });
      });
    }
    await delay(2000);
    
    // Debug: List all inputs
    console.log('\n🔍 Analyzing form...');
    const formInfo = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      return inputs.map(i => ({
        type: i.type,
        name: i.name,
        id: i.id,
        placeholder: i.placeholder,
        class: i.className.substring(0, 50),
        visible: i.offsetParent !== null
      }));
    });
    console.log('   Inputs found:', JSON.stringify(formInfo, null, 2));
    
    // Try clicking directly on the Mailadresse container, then tab into it
    console.log('\n📧 Attempting email input...');
    
    // Click somewhere in the email field container
    const emailClicked = await page.evaluate(() => {
      // Reddit uses a specific structure - find the label and click near it
      const labels = document.querySelectorAll('label, span, div');
      for (const el of labels) {
        if (el.textContent === 'Mailadresse*' || el.textContent === 'Email*') {
          // Click on parent or sibling input
          const parent = el.closest('fieldset') || el.closest('div');
          if (parent) {
            const input = parent.querySelector('input');
            if (input) {
              input.focus();
              return 'Found input in parent: ' + input.id;
            }
          }
          el.click();
          return 'Clicked label: ' + el.textContent;
        }
      }
      return 'Label not found';
    });
    console.log('   Click result:', emailClicked);
    
    await delay(500);
    
    // Try using keyboard TAB to navigate to the email field
    console.log('   Trying TAB navigation...');
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.press('Tab');
    await delay(300);
    
    // Now type email
    console.log('   Typing email...');
    await page.keyboard.type(CREDENTIALS.email, { delay: 30 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-v5-email.png' });
    console.log('📸 Screenshot after email');
    
    // Press Enter or click Weiter
    console.log('\n➡️ Submitting email...');
    await page.keyboard.press('Tab'); // Move to button
    await delay(200);
    await page.keyboard.press('Enter');
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-v5-step2.png' });
    console.log('📸 Screenshot step 2');
    
    // Check URL
    console.log('📍 URL:', page.url());
    
    // If we got to username step
    console.log('\n👤 Username step...');
    await page.keyboard.type(CREDENTIALS.username, { delay: 30 });
    await delay(1000);
    
    await page.keyboard.press('Tab');
    await delay(200);
    await page.keyboard.type(CREDENTIALS.password, { delay: 30 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-v5-filled.png' });
    console.log('📸 Screenshot filled');
    
    // Submit
    console.log('\n🚀 Final submit...');
    await page.keyboard.press('Enter');
    
    await delay(8000);
    await page.screenshot({ path: '/tmp/reddit-v5-final.png' });
    console.log('📸 Final screenshot');
    console.log('📍 Final URL:', page.url());
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-v5-error.png' });
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

createRedditAccount();
