#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdall.watcher',
  password: 'Pr0m3th3us_W4tch3r_2026!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL V2\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  // Longer timeout
  page.setDefaultTimeout(60000);
  page.setDefaultNavigationTimeout(60000);
  
  try {
    console.log('Loading signup page...');
    await page.goto('https://account.proton.me/signup?plan=free&ref=prctbl', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await delay(5000);
    
    await page.screenshot({ path: '/tmp/proton2-1.png' });
    console.log('📸 Page loaded');
    
    // Log what we see
    const title = await page.title();
    console.log('Title:', title);
    
    const url = page.url();
    console.log('URL:', url);
    
    // Check if blocked
    const content = await page.evaluate(() => document.body?.innerText?.substring(0, 500) || '');
    console.log('Content:', content.substring(0, 200));
    
    if (content.toLowerCase().includes('blocked') || content.toLowerCase().includes('access denied')) {
      console.log('\n❌ Blocked by ProtonMail');
      await browser.close();
      return;
    }
    
    // Try to find and fill username field
    console.log('\n1️⃣ Looking for username input...');
    
    // Use keyboard approach - tab through fields
    await page.keyboard.press('Tab');
    await delay(500);
    await page.keyboard.type(IDENTITY.username, { delay: 50 });
    console.log('Typed username');
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/proton2-2.png' });
    
    // Tab to password
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    console.log('Typed password');
    
    // Tab to confirm password
    await page.keyboard.press('Tab');
    await delay(300);
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    console.log('Typed confirm password');
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/proton2-3.png' });
    
    // Submit
    console.log('\n🚀 Submitting...');
    await page.keyboard.press('Enter');
    
    await delay(10000);
    await page.screenshot({ path: '/tmp/proton2-4.png' });
    
    const finalContent = await page.evaluate(() => document.body?.innerText || '');
    console.log('\nFinal page:', finalContent.substring(0, 300));
    
    const finalUrl = page.url();
    console.log('Final URL:', finalUrl);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/proton2-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

registerProton();
