#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdall.watcher',
  password: 'Pr0m3th3us_W4tch3r_2026!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL V4 - All fields\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  page.setDefaultTimeout(60000);
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });
    await delay(5000);
    
    console.log('Page loaded');
    
    // Get all inputs
    const inputInfo = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      return inputs.map((inp, i) => ({
        index: i,
        type: inp.type,
        name: inp.name,
        id: inp.id,
        placeholder: inp.placeholder
      }));
    });
    console.log('Inputs found:', JSON.stringify(inputInfo, null, 2));
    
    // FIELD 1: Username - first input (text or no type)
    console.log('\n1️⃣ USERNAME...');
    const usernameSet = await page.evaluate((username) => {
      const inputs = document.querySelectorAll('input');
      for (const input of inputs) {
        if (input.type === 'text' || input.type === '' || !input.type || 
            input.id?.includes('email') || input.name?.includes('email')) {
          input.focus();
          input.value = username;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          return { success: true, value: input.value };
        }
      }
      return { success: false };
    }, IDENTITY.username);
    console.log('Username result:', usernameSet);
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/proton4-1.png' });
    
    // FIELD 2: Password - first password input
    console.log('\n2️⃣ PASSWORD...');
    const pwdSet = await page.evaluate((password) => {
      const inputs = document.querySelectorAll('input[type="password"]');
      if (inputs[0]) {
        inputs[0].focus();
        inputs[0].value = password;
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
        return { success: true, index: 0 };
      }
      return { success: false };
    }, IDENTITY.password);
    console.log('Password result:', pwdSet);
    
    await delay(500);
    
    // FIELD 3: Confirm Password - second password input
    console.log('\n3️⃣ CONFIRM PASSWORD...');
    const confirmSet = await page.evaluate((password) => {
      const inputs = document.querySelectorAll('input[type="password"]');
      if (inputs[1]) {
        inputs[1].focus();
        inputs[1].value = password;
        inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
        return { success: true, index: 1 };
      }
      return { success: false };
    }, IDENTITY.password);
    console.log('Confirm result:', confirmSet);
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/proton4-2.png' });
    
    // Check current values
    const values = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      return inputs.map(inp => ({ type: inp.type, value: inp.value?.substring(0, 20) }));
    });
    console.log('\nCurrent values:', JSON.stringify(values));
    
    // SUBMIT
    console.log('\n🚀 SUBMITTING...');
    const submitResult = await page.evaluate(() => {
      // Find the submit button
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('beginne') || text.includes('create') || 
            text.includes('start') || text.includes('verwenden')) {
          btn.click();
          return { clicked: true, text: btn.textContent };
        }
      }
      // Try form submit
      const form = document.querySelector('form');
      if (form) {
        form.submit();
        return { clicked: true, method: 'form' };
      }
      return { clicked: false };
    });
    console.log('Submit result:', submitResult);
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/proton4-3.png' });
    
    const finalUrl = page.url();
    const content = await page.evaluate(() => document.body?.innerText?.substring(0, 500) || '');
    
    console.log('\n📍 Final URL:', finalUrl);
    console.log('📄 Content:', content.substring(0, 300));
    
    if (content.toLowerCase().includes('captcha') || content.toLowerCase().includes('verify')) {
      console.log('\n⚠️ CAPTCHA/Verification required');
      await page.screenshot({ path: '/tmp/proton4-captcha.png' });
    } else if (content.toLowerCase().includes('taken') || content.toLowerCase().includes('already')) {
      console.log('\n⚠️ Username taken - try another');
    } else if (!finalUrl.includes('signup')) {
      console.log('\n🎉🎉🎉 POSSIBLE SUCCESS! 🎉🎉🎉');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/proton4-error.png' }).catch(() => {});
  }
  
  await browser.close();
}

registerProton();
