#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function completeRegistration() {
  console.log('🏁 FINAL STEP: Username & Submit\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    // Get fresh verification code
    console.log('📧 Checking for latest verification code...');
    const { execSync } = require('child_process');
    const emailOutput = execSync('node /home/reisig/.openclaw/workspace/skills/email/check-email.js --limit 3 2>&1').toString();
    
    // Extract latest Reddit code
    const codeMatch = emailOutput.match(/(\d{6}) is your Reddit verification code/);
    const verificationCode = codeMatch ? codeMatch[1] : null;
    console.log('   Latest code:', verificationCode || 'NOT FOUND');
    
    if (!verificationCode) {
      console.log('❌ No verification code found!');
      await browser.close();
      return;
    }
    
    // Start registration flow
    console.log('\n📍 Starting registration...');
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    // Accept cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
      });
    });
    await delay(2000);
    
    // Step 1: Email
    console.log('\n📧 Entering email...');
    await page.evaluate((email) => {
      const inputs = document.querySelectorAll('faceplate-text-input');
      for (const comp of inputs) {
        if (!comp.shadowRoot) continue;
        const input = comp.shadowRoot.querySelector('input');
        if (input && (input.type === 'email' || input.type === 'text')) {
          input.focus();
          input.value = email;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          break;
        }
      }
    }, CREDS.email);
    await delay(500);
    
    // Click continue
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent?.trim().toLowerCase() === 'weiter') b.click();
      });
    });
    await delay(5000);
    
    // Step 2: Verification code
    console.log('🔑 Entering verification code:', verificationCode);
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('faceplate-text-input');
      for (const comp of inputs) {
        if (!comp.shadowRoot) continue;
        const input = comp.shadowRoot.querySelector('input');
        if (input) {
          input.focus();
          break;
        }
      }
    });
    await page.keyboard.type(verificationCode, { delay: 100 });
    await delay(500);
    
    // Click continue
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent?.trim().toLowerCase() === 'weiter') b.click();
      });
    });
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-complete-1.png' });
    
    // Step 3: Username - clear the auto-suggested one and enter ours
    console.log('\n👤 Entering username: erik_builds');
    
    // Clear and enter username
    await page.evaluate((username) => {
      const inputs = document.querySelectorAll('faceplate-text-input');
      for (const comp of inputs) {
        if (!comp.shadowRoot) continue;
        const input = comp.shadowRoot.querySelector('input');
        if (input && input.type !== 'password') {
          input.focus();
          input.select(); // Select all text
          input.value = username;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return true;
        }
      }
      return false;
    }, CREDS.username);
    
    await delay(2000);
    
    // Check username availability
    const usernameStatus = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return {
        available: text.includes('available'),
        taken: text.includes('taken') || text.includes('vergeben'),
        content: text.substring(0, 500)
      };
    });
    console.log('   Username status:', usernameStatus.available ? '✅ Available' : (usernameStatus.taken ? '❌ Taken' : '⚠️ Unknown'));
    
    // Enter password
    console.log('🔐 Entering password...');
    await page.evaluate((password) => {
      const inputs = document.querySelectorAll('faceplate-text-input');
      for (const comp of inputs) {
        if (!comp.shadowRoot) continue;
        const input = comp.shadowRoot.querySelector('input[type="password"]');
        if (input) {
          input.focus();
          input.value = password;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return true;
        }
      }
      return false;
    }, CREDS.password);
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/reddit-complete-2.png' });
    
    // Final submit
    console.log('\n🚀 FINAL SUBMIT...');
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        const text = b.textContent?.trim().toLowerCase();
        if (text === 'weiter' || text === 'continue' || text.includes('sign up')) {
          b.click();
        }
      });
    });
    
    await delay(10000);
    await page.screenshot({ path: '/tmp/reddit-complete-final.png' });
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    // Check if we succeeded
    if (finalUrl.includes('onboarding') || !finalUrl.includes('register')) {
      console.log('\n🎉🎉🎉 SUCCESS! ACCOUNT CREATED! 🎉🎉🎉');
      console.log('   Username: erik_builds');
      console.log('   Email: ' + CREDS.email);
    } else {
      console.log('\n⚠️ Still on register page - check screenshot');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-complete-error.png' });
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

completeRegistration();
