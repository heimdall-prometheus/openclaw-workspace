#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDENTIALS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function createRedditAccount() {
  console.log('🚀 Reddit Account Creation - Shadow DOM Edition\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    console.log('📍 Opening Reddit signup...');
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    // Accept cookies
    console.log('🍪 Accepting cookies...');
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
      });
    });
    await delay(2000);
    
    // SHADOW DOM APPROACH
    console.log('\n🔮 Accessing Shadow DOM...');
    
    // Find and interact with the email input inside shadow DOM
    const emailEntered = await page.evaluate((email) => {
      // Find the FACEPLATE-TEXT-INPUT element
      const textInputs = document.querySelectorAll('faceplate-text-input');
      
      for (const component of textInputs) {
        // Check if this is the email input (look for type="email" or label contains mail)
        const shadowRoot = component.shadowRoot;
        if (!shadowRoot) continue;
        
        // Find the actual input inside the shadow root
        const input = shadowRoot.querySelector('input');
        if (input) {
          // Check if it's email type or the first text input
          if (input.type === 'email' || input.type === 'text') {
            // Focus and set value
            input.focus();
            input.value = email;
            
            // Dispatch events to trigger React/Vue updates
            input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
            input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
            input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, composed: true }));
            
            return { success: true, inputType: input.type, inputName: input.name };
          }
        }
      }
      
      return { success: false, error: 'No suitable input found in shadow DOM' };
    }, CREDENTIALS.email);
    
    console.log('   Email result:', JSON.stringify(emailEntered));
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-shadow-1.png' });
    console.log('📸 Screenshot 1');
    
    // Click continue button
    console.log('\n➡️ Clicking Continue...');
    const continueClicked = await page.evaluate(() => {
      // Find button in main DOM or shadow DOM
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent?.trim().toLowerCase();
        if (text === 'weiter' || text === 'continue') {
          btn.click();
          return { success: true, buttonText: btn.textContent };
        }
      }
      
      // Try finding in shadow roots
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        if (el.shadowRoot) {
          const shadowButtons = el.shadowRoot.querySelectorAll('button');
          for (const btn of shadowButtons) {
            const text = btn.textContent?.trim().toLowerCase();
            if (text === 'weiter' || text === 'continue') {
              btn.click();
              return { success: true, buttonText: btn.textContent, inShadow: true };
            }
          }
        }
      }
      
      return { success: false };
    });
    console.log('   Continue result:', JSON.stringify(continueClicked));
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-shadow-2.png' });
    console.log('📸 Screenshot 2');
    
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    // Check if we moved to username step or got verification
    const pageState = await page.evaluate(() => {
      const content = document.body.innerText.toLowerCase();
      return {
        hasUsername: content.includes('username') || content.includes('benutzername'),
        hasVerify: content.includes('verify') || content.includes('verifizieren') || content.includes('code'),
        hasPassword: content.includes('password') || content.includes('passwort'),
        hasCaptcha: content.includes('captcha') || content.includes('robot')
      };
    });
    console.log('📊 Page state:', JSON.stringify(pageState));
    
    if (pageState.hasVerify) {
      console.log('\n📧 Email verification required! Checking inbox...');
      // TODO: Check email for verification code
    }
    
    if (pageState.hasUsername) {
      console.log('\n👤 Entering username...');
      await page.evaluate((username) => {
        const textInputs = document.querySelectorAll('faceplate-text-input');
        for (const component of textInputs) {
          const shadowRoot = component.shadowRoot;
          if (!shadowRoot) continue;
          const input = shadowRoot.querySelector('input');
          if (input && (input.name?.includes('username') || input.placeholder?.toLowerCase().includes('username'))) {
            input.focus();
            input.value = username;
            input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          }
        }
      }, CREDENTIALS.username);
    }
    
    if (pageState.hasPassword) {
      console.log('\n🔐 Entering password...');
      await page.evaluate((password) => {
        const textInputs = document.querySelectorAll('faceplate-text-input');
        for (const component of textInputs) {
          const shadowRoot = component.shadowRoot;
          if (!shadowRoot) continue;
          const input = shadowRoot.querySelector('input[type="password"], input');
          if (input && input.type === 'password') {
            input.focus();
            input.value = password;
            input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          }
        }
      }, CREDENTIALS.password);
    }
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/reddit-shadow-3.png' });
    console.log('📸 Screenshot 3');
    
    // Final submit
    if (pageState.hasUsername || pageState.hasPassword) {
      console.log('\n🚀 Submitting...');
      await page.evaluate(() => {
        const buttons = document.querySelectorAll('button[type="submit"], button');
        for (const btn of buttons) {
          const text = btn.textContent?.trim().toLowerCase();
          if (text.includes('weiter') || text.includes('continue') || text.includes('sign up') || text.includes('registrieren')) {
            btn.click();
            break;
          }
        }
      });
      
      await delay(6000);
      await page.screenshot({ path: '/tmp/reddit-shadow-final.png' });
      console.log('📸 Final screenshot');
    }
    
    console.log('\n📍 Final URL:', page.url());
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-shadow-error.png' });
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

createRedditAccount();
