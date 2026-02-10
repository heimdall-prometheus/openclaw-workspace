#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function tryLogin() {
  console.log('🔐 Trying to login...\n');
  
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
    
    await page.screenshot({ path: '/tmp/login-1.png' });
    console.log('📸 Screenshot 1 saved');
    
    // Type username
    console.log('Typing username...');
    await page.keyboard.type('heim.dall@prometheus-labs.io', { delay: 50 });
    await delay(500);
    await page.keyboard.press('Tab');
    await delay(300);
    
    // Type password
    console.log('Typing password...');
    await page.keyboard.type('5XqNz7S5aAGfkrZqwlpo', { delay: 50 });
    await delay(1000);
    
    await page.screenshot({ path: '/tmp/login-2.png' });
    console.log('📸 Screenshot 2 saved');
    
    // Click login button
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('log in') || text.includes('anmelden') || text.includes('einloggen')) {
          btn.click();
          return true;
        }
      }
      // Try pressing Enter as fallback
      return false;
    });
    
    await page.keyboard.press('Enter');
    await delay(8000);
    
    await page.screenshot({ path: '/tmp/login-3.png' });
    console.log('📸 Screenshot 3 saved');
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    // Check if we're logged in
    const pageContent = await page.content();
    if (!finalUrl.includes('login') && !pageContent.includes('incorrect')) {
      console.log('\n✅ LOGIN SUCCESSFUL!');
      
      // Get username
      await page.goto('https://www.reddit.com/settings', { waitUntil: 'networkidle2' });
      await delay(3000);
      await page.screenshot({ path: '/tmp/login-settings.png' });
      console.log('📸 Settings screenshot saved');
    } else {
      console.log('\n❌ Login failed or account does not exist');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/login-error.png' });
  }
  
  await browser.close();
}

tryLogin();
