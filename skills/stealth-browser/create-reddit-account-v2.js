#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDENTIALS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function createRedditAccount() {
  console.log('🚀 Creating Reddit Account with Stealth Browser...\n');
  console.log(`   Email: ${CREDENTIALS.email}`);
  console.log(`   Username: ${CREDENTIALS.username}`);
  console.log('');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    // Go to Reddit signup
    console.log('📍 Navigating to Reddit signup...');
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/reddit-reg-1.png', fullPage: true });
    console.log('📸 Screenshot 1: /tmp/reddit-reg-1.png');
    
    // Check if actually blocked (network security message)
    const content = await page.content();
    if (content.includes('blocked by network security')) {
      console.log('❌ BLOCKED by network security - Cannot proceed');
      await browser.close();
      return false;
    }
    
    // Accept cookies first
    console.log('\n🍪 Handling cookie consent...');
    try {
      const acceptBtn = await page.$('button:has-text("Alle akzeptieren")');
      if (acceptBtn) {
        await acceptBtn.click();
        console.log('   Clicked "Alle akzeptieren"');
        await delay(1000);
      }
    } catch (e) {
      // Try alternative
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await btn.evaluate(el => el.textContent);
        if (text && (text.includes('akzeptieren') || text.includes('Accept'))) {
          await btn.click();
          console.log('   Accepted cookies');
          await delay(1000);
          break;
        }
      }
    }
    
    // Step 1: Enter email
    console.log('\n📧 Step 1: Entering email...');
    
    // Find email input
    const emailInput = await page.$('input[type="email"], input[name="email"], input[placeholder*="ail"]');
    if (emailInput) {
      await emailInput.click();
      await delay(300);
      await page.keyboard.type(CREDENTIALS.email, { delay: 30 });
      console.log('   ✅ Email entered');
    } else {
      console.log('   ⚠️ Email field not found, trying to click in form area...');
      // Click on the form area
      await page.click('input');
      await page.keyboard.type(CREDENTIALS.email, { delay: 30 });
    }
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-reg-2-email.png', fullPage: true });
    
    // Click Continue/Weiter
    console.log('\n➡️ Clicking Continue...');
    const continueBtn = await page.$('button:has-text("Weiter"), button:has-text("Continue"), button[type="submit"]');
    if (continueBtn) {
      await continueBtn.click();
      console.log('   Clicked continue');
    } else {
      // Try pressing Enter
      await page.keyboard.press('Enter');
      console.log('   Pressed Enter');
    }
    
    await delay(3000);
    await page.screenshot({ path: '/tmp/reddit-reg-3-after-email.png', fullPage: true });
    console.log('📸 Screenshot 3: /tmp/reddit-reg-3-after-email.png');
    
    // Step 2: Username & Password (usually on next screen)
    console.log('\n👤 Step 2: Looking for username/password fields...');
    
    const usernameInput = await page.$('input[name="username"], input[placeholder*="sername"]');
    if (usernameInput) {
      await usernameInput.click();
      await delay(300);
      await page.keyboard.type(CREDENTIALS.username, { delay: 30 });
      console.log('   ✅ Username entered');
    }
    
    await delay(500);
    
    const passwordInput = await page.$('input[type="password"], input[name="password"]');
    if (passwordInput) {
      await passwordInput.click();
      await delay(300);
      await page.keyboard.type(CREDENTIALS.password, { delay: 30 });
      console.log('   ✅ Password entered');
    }
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-reg-4-filled.png', fullPage: true });
    console.log('📸 Screenshot 4: /tmp/reddit-reg-4-filled.png');
    
    // Submit
    console.log('\n🚀 Submitting...');
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      console.log('   Clicked submit');
    } else {
      await page.keyboard.press('Enter');
    }
    
    await delay(5000);
    await page.screenshot({ path: '/tmp/reddit-reg-5-result.png', fullPage: true });
    console.log('📸 Final: /tmp/reddit-reg-5-result.png');
    
    const finalUrl = page.url();
    const finalContent = await page.content();
    console.log(`\n📍 Final URL: ${finalUrl}`);
    
    if (finalContent.includes('captcha') || finalContent.includes('CAPTCHA') || finalContent.includes('robot')) {
      console.log('⚠️ CAPTCHA required - needs manual completion');
    } else if (finalUrl.includes('onboarding') || finalContent.includes('interests') || finalContent.includes('Welcome')) {
      console.log('🎉 SUCCESS! Account appears to be created!');
    } else if (finalContent.includes('verify') || finalContent.includes('email')) {
      console.log('📧 Email verification may be required');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-reg-error.png', fullPage: true });
  }
  
  // Keep browser open for a moment to see result
  await delay(2000);
  await browser.close();
  console.log('\n🏁 Done');
}

createRedditAccount();
