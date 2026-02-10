#!/usr/bin/env node
/**
 * Test script to figure out Reddit login selectors
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const CONFIG = {
  username: 'kreative_mama_de',
  password: 'KreativeMama2026!'
};

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
  
  console.log('Going to Reddit login...');
  await page.goto('https://www.reddit.com/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));
  
  // Dismiss cookie banner
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const btn = btns.find(b => b.innerText.includes('Alle akzeptieren') || b.innerText.includes('Accept'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  
  // Get all input elements
  const inputs = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    return Array.from(inputs).map((inp, i) => ({
      index: i,
      type: inp.type,
      name: inp.name,
      id: inp.id,
      placeholder: inp.placeholder,
      className: inp.className,
      ariaLabel: inp.getAttribute('aria-label'),
    }));
  });
  
  console.log('\\nFound inputs:');
  inputs.forEach(inp => console.log(JSON.stringify(inp)));
  
  // Try to find username and password fields
  const usernameInput = inputs.find(i => 
    i.placeholder?.includes('Nutzername') || 
    i.placeholder?.includes('Mail') ||
    i.name === 'username' ||
    i.ariaLabel?.includes('username')
  );
  
  const passwordInput = inputs.find(i => i.type === 'password');
  
  console.log('\\nUsername input:', usernameInput);
  console.log('Password input:', passwordInput);
  
  if (usernameInput && passwordInput) {
    console.log('\\nTrying to fill form...');
    
    // Focus and fill username
    await page.evaluate((idx, value) => {
      const inputs = document.querySelectorAll('input');
      const input = inputs[idx];
      input.focus();
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, usernameInput.index, CONFIG.username);
    
    await new Promise(r => setTimeout(r, 500));
    
    // Focus and fill password
    await page.evaluate((idx, value) => {
      const inputs = document.querySelectorAll('input');
      const input = inputs[idx];
      input.focus();
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, passwordInput.index, CONFIG.password);
    
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: '/tmp/reddit-stealth/test-filled.png' });
    
    // Try to submit
    console.log('\\nSubmitting...');
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')];
      const submitBtn = btns.find(b => b.innerText.includes('Anmelden') || b.innerText.includes('Log In'));
      if (submitBtn) {
        console.log('Found submit button:', submitBtn.innerText);
        submitBtn.click();
      }
    });
    
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: '/tmp/reddit-stealth/test-result.png' });
    
    // Check URL
    console.log('\\nCurrent URL:', page.url());
  }
  
  await browser.close();
}

main().catch(e => console.error(e));
