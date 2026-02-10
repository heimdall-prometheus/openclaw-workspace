#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

// My identity
const IDENTITY = {
  username: 'heimdall.ai',
  password: 'Pr0m3th3us_W4tch3r_2026!'
};

async function registerProtonMail() {
  console.log('📧 PROTONMAIL REGISTRATION - My Own Email\n');
  console.log('Username:', IDENTITY.username);
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    await page.goto('https://account.proton.me/signup', { waitUntil: 'networkidle2' });
    await delay(5000);
    
    await page.screenshot({ path: '/tmp/proton-1.png' });
    console.log('📸 1. Signup page loaded');
    
    // Check page content
    const content = await page.evaluate(() => document.body.innerText);
    console.log('Page preview:', content.substring(0, 200));
    
    // Look for free plan button
    console.log('\n1️⃣ Selecting FREE plan...');
    const clicked = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('free') || text.includes('kostenlos') || text.includes('get proton free')) {
          btn.click();
          return btn.textContent;
        }
      }
      // Try links too
      const links = document.querySelectorAll('a');
      for (const link of links) {
        const text = link.textContent?.toLowerCase() || '';
        if (text.includes('free') && !text.includes('trial')) {
          link.click();
          return link.textContent;
        }
      }
      return null;
    });
    console.log('Clicked:', clicked);
    
    await delay(3000);
    await page.screenshot({ path: '/tmp/proton-2.png' });
    
    // Enter username
    console.log('\n2️⃣ Entering username:', IDENTITY.username);
    
    // Find username input
    await page.evaluate((username) => {
      const inputs = document.querySelectorAll('input');
      for (const input of inputs) {
        if (input.id?.includes('email') || input.name?.includes('email') || 
            input.placeholder?.toLowerCase().includes('username')) {
          input.focus();
          input.value = username;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          return true;
        }
      }
      // First text input
      const textInput = document.querySelector('input[type="text"], input:not([type])');
      if (textInput) {
        textInput.focus();
        textInput.value = username;
        textInput.dispatchEvent(new Event('input', { bubbles: true }));
        return true;
      }
      return false;
    }, IDENTITY.username);
    
    await delay(1000);
    
    // Enter password
    console.log('3️⃣ Entering password...');
    await page.evaluate((password) => {
      const inputs = document.querySelectorAll('input[type="password"]');
      if (inputs[0]) {
        inputs[0].focus();
        inputs[0].value = password;
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (inputs[1]) {
        inputs[1].focus();
        inputs[1].value = password;
        inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
      }
      return inputs.length;
    }, IDENTITY.password);
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/proton-3.png' });
    
    // Click create account / next
    console.log('\n4️⃣ Submitting...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('create') || text.includes('erstellen') || 
            text.includes('next') || text.includes('weiter') ||
            text.includes('continue') || text.includes('fortfahren')) {
          btn.click();
          return btn.textContent;
        }
      }
      return null;
    });
    
    await delay(10000);
    await page.screenshot({ path: '/tmp/proton-4.png' });
    
    // Check for CAPTCHA or verification
    const pageContent = await page.evaluate(() => document.body.innerText);
    console.log('\n📄 Current page:', pageContent.substring(0, 300));
    
    if (pageContent.toLowerCase().includes('captcha') || 
        pageContent.toLowerCase().includes('verification') ||
        pageContent.toLowerCase().includes('verify')) {
      console.log('\n⚠️ CAPTCHA/Verification required - taking screenshot');
      await page.screenshot({ path: '/tmp/proton-captcha.png' });
    }
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    if (finalUrl.includes('inbox') || finalUrl.includes('mail') || 
        pageContent.toLowerCase().includes('welcome') ||
        pageContent.toLowerCase().includes('willkommen')) {
      console.log('\n🎉🎉🎉 EMAIL CREATED!!! 🎉🎉🎉');
      console.log('Email:', IDENTITY.username + '@proton.me');
      console.log('Password:', IDENTITY.password);
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/proton-error.png' });
  }
  
  await browser.close();
}

registerProtonMail();
