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
    
    // Take screenshot of initial page
    await page.screenshot({ path: '/tmp/reddit-signup-1-initial.png', fullPage: true });
    console.log('📸 Screenshot: /tmp/reddit-signup-1-initial.png');
    
    // Check if blocked
    const content = await page.content();
    if (content.includes('blocked')) {
      console.log('❌ BLOCKED - Cannot proceed');
      await browser.close();
      return false;
    }
    
    // Reddit signup flow - Step 1: Email
    console.log('\n📧 Step 1: Entering email...');
    
    // Try different selectors for email field
    const emailSelectors = [
      'input[name="email"]',
      'input[type="email"]',
      '#regEmail',
      'input[placeholder*="email"]',
      'input[autocomplete="email"]'
    ];
    
    let emailField = null;
    for (const selector of emailSelectors) {
      emailField = await page.$(selector);
      if (emailField) {
        console.log(`   Found email field: ${selector}`);
        break;
      }
    }
    
    if (emailField) {
      await emailField.click();
      await delay(500);
      await emailField.type(CREDENTIALS.email, { delay: 50 });
      console.log('   ✅ Email entered');
      
      // Look for continue/next button
      await delay(1000);
      await page.screenshot({ path: '/tmp/reddit-signup-2-email.png', fullPage: true });
      
      // Try to click continue
      const continueSelectors = [
        'button[type="submit"]',
        'button:has-text("Continue")',
        'button:has-text("Weiter")',
        'button:has-text("Next")',
        '[data-testid="signup-form-submit"]'
      ];
      
      for (const selector of continueSelectors) {
        try {
          const btn = await page.$(selector);
          if (btn) {
            await btn.click();
            console.log(`   Clicked: ${selector}`);
            break;
          }
        } catch (e) {}
      }
      
      await delay(3000);
      await page.screenshot({ path: '/tmp/reddit-signup-3-after-email.png', fullPage: true });
      console.log('📸 Screenshot: /tmp/reddit-signup-3-after-email.png');
    } else {
      console.log('   ⚠️ Could not find email field');
      console.log('   Trying alternative approach...');
      
      // Maybe it's a different flow - take screenshot for analysis
      await page.screenshot({ path: '/tmp/reddit-signup-alternate.png', fullPage: true });
    }
    
    // Step 2: Username (if we got past email)
    console.log('\n👤 Step 2: Looking for username field...');
    await delay(2000);
    
    const usernameSelectors = [
      'input[name="username"]',
      '#regUsername',
      'input[placeholder*="username"]',
      'input[placeholder*="Username"]'
    ];
    
    let usernameField = null;
    for (const selector of usernameSelectors) {
      usernameField = await page.$(selector);
      if (usernameField) {
        console.log(`   Found username field: ${selector}`);
        await usernameField.click();
        await delay(500);
        await usernameField.type(CREDENTIALS.username, { delay: 50 });
        console.log('   ✅ Username entered');
        break;
      }
    }
    
    // Step 3: Password
    console.log('\n🔐 Step 3: Looking for password field...');
    
    const passwordSelectors = [
      'input[name="password"]',
      'input[type="password"]',
      '#regPassword'
    ];
    
    let passwordField = null;
    for (const selector of passwordSelectors) {
      passwordField = await page.$(selector);
      if (passwordField) {
        console.log(`   Found password field: ${selector}`);
        await passwordField.click();
        await delay(500);
        await passwordField.type(CREDENTIALS.password, { delay: 50 });
        console.log('   ✅ Password entered');
        break;
      }
    }
    
    await delay(2000);
    await page.screenshot({ path: '/tmp/reddit-signup-4-filled.png', fullPage: true });
    console.log('📸 Screenshot: /tmp/reddit-signup-4-filled.png');
    
    // Final submit
    console.log('\n🚀 Submitting registration...');
    
    // Look for submit button
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      console.log('   Clicked submit');
      await delay(5000);
    }
    
    await page.screenshot({ path: '/tmp/reddit-signup-5-result.png', fullPage: true });
    console.log('📸 Final screenshot: /tmp/reddit-signup-5-result.png');
    
    // Check result
    const finalContent = await page.content();
    const finalUrl = page.url();
    
    console.log(`\n📍 Final URL: ${finalUrl}`);
    
    if (finalUrl.includes('register') && finalContent.includes('captcha')) {
      console.log('⚠️ CAPTCHA detected - may need manual completion');
    } else if (finalUrl.includes('onboarding') || finalUrl.includes('home')) {
      console.log('🎉 SUCCESS! Account created!');
    } else {
      console.log('⚠️ Unknown result - check screenshots');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-signup-error.png', fullPage: true });
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

createRedditAccount();
