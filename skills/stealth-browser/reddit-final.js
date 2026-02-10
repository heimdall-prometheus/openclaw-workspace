#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDENTIALS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo',
  verificationCode: '268931'
};

async function enterTextInShadowInput(page, value, inputType = 'any') {
  return await page.evaluate((val, type) => {
    const textInputs = document.querySelectorAll('faceplate-text-input');
    for (const component of textInputs) {
      const shadowRoot = component.shadowRoot;
      if (!shadowRoot) continue;
      const input = shadowRoot.querySelector('input');
      if (input) {
        // Filter by type if specified
        if (type === 'email' && input.type !== 'email' && input.type !== 'text') continue;
        if (type === 'password' && input.type !== 'password') continue;
        
        // Set value
        input.focus();
        input.value = val;
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'a', bubbles: true, composed: true }));
        
        return { success: true, inputType: input.type };
      }
    }
    return { success: false };
  }, value, inputType);
}

async function clickButton(page, ...texts) {
  return await page.evaluate((searchTexts) => {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      const btnText = btn.textContent?.toLowerCase().trim() || '';
      for (const text of searchTexts) {
        if (btnText.includes(text.toLowerCase())) {
          btn.click();
          return { clicked: true, text: btn.textContent?.trim() };
        }
      }
    }
    return { clicked: false };
  }, texts);
}

async function completeRegistration() {
  console.log('🚀 Reddit Registration - Final Attempt\n');
  console.log('   Code:', CREDENTIALS.verificationCode);
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    // Go to register
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    // Accept cookies
    await clickButton(page, 'akzeptieren', 'accept');
    await delay(2000);
    
    // Step 1: Email
    console.log('\n📧 Step 1: Email');
    let result = await enterTextInShadowInput(page, CREDENTIALS.email, 'email');
    console.log('   Email:', result.success ? '✅' : '❌');
    await delay(500);
    
    await clickButton(page, 'weiter', 'continue');
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-final-1.png' });
    
    // Step 2: Verification Code
    console.log('\n🔑 Step 2: Verification Code');
    
    // First, let's type the code character by character using keyboard
    await page.evaluate(() => {
      const textInputs = document.querySelectorAll('faceplate-text-input');
      for (const component of textInputs) {
        const shadowRoot = component.shadowRoot;
        if (!shadowRoot) continue;
        const input = shadowRoot.querySelector('input');
        if (input) {
          input.focus();
          return true;
        }
      }
      return false;
    });
    
    // Type code slowly
    await page.keyboard.type(CREDENTIALS.verificationCode, { delay: 100 });
    console.log('   Code typed via keyboard');
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-final-2.png' });
    
    // Click continue
    await clickButton(page, 'weiter', 'continue', 'verify');
    console.log('   Clicked verify');
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-final-3.png' });
    
    // Check current state
    const state = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return {
        hasUsername: text.includes('benutzername') || text.includes('username'),
        hasPassword: text.includes('passwort') || text.includes('password'),
        hasError: text.includes('ungültig') || text.includes('invalid') || text.includes('incorrect'),
        onVerify: text.includes('verifizieren') || text.includes('verify')
      };
    });
    console.log('   State:', JSON.stringify(state));
    
    // Step 3: Username & Password (if we got there)
    if (state.hasUsername) {
      console.log('\n👤 Step 3: Username & Password');
      
      // Find username and password inputs
      const inputs = await page.evaluate(() => {
        const results = [];
        const textInputs = document.querySelectorAll('faceplate-text-input');
        for (const component of textInputs) {
          const shadowRoot = component.shadowRoot;
          if (!shadowRoot) continue;
          const input = shadowRoot.querySelector('input');
          if (input) {
            results.push({ type: input.type, name: input.name, placeholder: input.placeholder });
          }
        }
        return results;
      });
      console.log('   Found inputs:', JSON.stringify(inputs));
      
      // Enter username (first non-password input)
      await page.evaluate((username) => {
        const textInputs = document.querySelectorAll('faceplate-text-input');
        let filled = 0;
        for (const component of textInputs) {
          const shadowRoot = component.shadowRoot;
          if (!shadowRoot) continue;
          const input = shadowRoot.querySelector('input');
          if (input && input.type !== 'password' && filled === 0) {
            input.focus();
            input.value = username;
            input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
            filled++;
          }
        }
      }, CREDENTIALS.username);
      console.log('   Username entered');
      
      // Enter password
      await page.evaluate((password) => {
        const textInputs = document.querySelectorAll('faceplate-text-input');
        for (const component of textInputs) {
          const shadowRoot = component.shadowRoot;
          if (!shadowRoot) continue;
          const input = shadowRoot.querySelector('input[type="password"]');
          if (input) {
            input.focus();
            input.value = password;
            input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          }
        }
      }, CREDENTIALS.password);
      console.log('   Password entered');
      
      await delay(2000);
      await page.screenshot({ path: '/tmp/reddit-final-4.png' });
      
      // Final submit
      console.log('\n🚀 Final submit...');
      await clickButton(page, 'registrieren', 'sign up', 'weiter', 'continue');
      
      await delay(8000);
    }
    
    await page.screenshot({ path: '/tmp/reddit-final-result.png' });
    
    console.log('\n📍 Final URL:', page.url());
    
    // Check success
    const finalState = await page.content();
    if (page.url().includes('onboarding') || finalState.includes('welcome') || finalState.includes('interests')) {
      console.log('\n🎉🎉🎉 ACCOUNT CREATED SUCCESSFULLY! 🎉🎉🎉');
    } else if (page.url() !== 'https://www.reddit.com/register/') {
      console.log('\n✅ Progressed! New URL:', page.url());
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-final-error.png' });
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

completeRegistration();
