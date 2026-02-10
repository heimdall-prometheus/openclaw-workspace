#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDENTIALS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo',
  verificationCode: '910320'
};

async function completeRedditRegistration() {
  console.log('🚀 Reddit Registration - Verification Step\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    console.log('📍 Opening Reddit signup...');
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    // Accept cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
      });
    });
    await delay(2000);
    
    // Step 1: Enter email via Shadow DOM
    console.log('📧 Entering email...');
    await page.evaluate((email) => {
      const textInputs = document.querySelectorAll('faceplate-text-input');
      for (const component of textInputs) {
        const shadowRoot = component.shadowRoot;
        if (!shadowRoot) continue;
        const input = shadowRoot.querySelector('input');
        if (input && (input.type === 'email' || input.type === 'text')) {
          input.focus();
          input.value = email;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
          break;
        }
      }
    }, CREDENTIALS.email);
    
    await delay(1000);
    
    // Click Continue
    console.log('➡️ Clicking Continue...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent?.trim().toLowerCase().includes('weiter')) {
          btn.click();
          break;
        }
      }
    });
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-verify-1.png' });
    
    // Step 2: Enter verification code
    console.log('\n🔑 Entering verification code:', CREDENTIALS.verificationCode);
    
    // Look for OTP/verification code inputs
    const codeEntered = await page.evaluate((code) => {
      // Try shadow DOM inputs first
      const textInputs = document.querySelectorAll('faceplate-text-input');
      for (const component of textInputs) {
        const shadowRoot = component.shadowRoot;
        if (!shadowRoot) continue;
        const input = shadowRoot.querySelector('input');
        if (input) {
          input.focus();
          input.value = code;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return { success: true, via: 'shadow-dom' };
        }
      }
      
      // Try regular inputs
      const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[inputmode="numeric"]');
      for (const input of inputs) {
        if (input.offsetParent !== null) {
          input.focus();
          input.value = code;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          return { success: true, via: 'regular-input' };
        }
      }
      
      return { success: false };
    }, CREDENTIALS.verificationCode);
    
    console.log('   Code entry result:', JSON.stringify(codeEntered));
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/reddit-verify-2.png' });
    
    // Click verify/continue
    console.log('\n➡️ Clicking verify...');
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent?.toLowerCase() || '';
        if (text.includes('weiter') || text.includes('continue') || text.includes('verify') || text.includes('submit')) {
          btn.click();
          break;
        }
      }
    });
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-verify-3.png' });
    
    // Check for username step
    console.log('\n📊 Checking page state...');
    const pageState = await page.evaluate(() => {
      const content = document.body.innerText.toLowerCase();
      return {
        hasUsername: content.includes('username') || content.includes('benutzername'),
        hasPassword: content.includes('password') || content.includes('passwort'),
        hasSuccess: content.includes('welcome') || content.includes('willkommen'),
        hasError: content.includes('error') || content.includes('fehler') || content.includes('invalid')
      };
    });
    console.log('   State:', JSON.stringify(pageState));
    
    // Step 3: Enter username if needed
    if (pageState.hasUsername) {
      console.log('\n👤 Entering username:', CREDENTIALS.username);
      await page.evaluate((username) => {
        const textInputs = document.querySelectorAll('faceplate-text-input');
        for (const component of textInputs) {
          const shadowRoot = component.shadowRoot;
          if (!shadowRoot) continue;
          const input = shadowRoot.querySelector('input');
          if (input && input.type !== 'password') {
            input.focus();
            input.value = username;
            input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
            break;
          }
        }
      }, CREDENTIALS.username);
      
      await delay(1000);
    }
    
    // Step 4: Enter password if needed
    if (pageState.hasPassword) {
      console.log('🔐 Entering password...');
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
      
      await delay(1000);
    }
    
    await page.screenshot({ path: '/tmp/reddit-verify-4.png' });
    
    // Final submit
    if (pageState.hasUsername || pageState.hasPassword) {
      console.log('\n🚀 Final submit...');
      await page.evaluate(() => {
        const buttons = document.querySelectorAll('button');
        for (const btn of buttons) {
          const text = btn.textContent?.toLowerCase() || '';
          if (text.includes('weiter') || text.includes('continue') || text.includes('sign up') || text.includes('registrieren')) {
            btn.click();
            break;
          }
        }
      });
      
      await delay(6000);
    }
    
    await page.screenshot({ path: '/tmp/reddit-verify-final.png' });
    console.log('\n📍 Final URL:', page.url());
    
    // Check final state
    const finalContent = await page.content();
    if (finalContent.includes('onboarding') || finalContent.includes('interests') || finalContent.includes('Welcome')) {
      console.log('\n🎉🎉🎉 SUCCESS! Account created! 🎉🎉🎉');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-verify-error.png' });
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

completeRedditRegistration();
