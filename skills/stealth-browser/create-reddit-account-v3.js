#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDENTIALS = {
  email: 'heim.dall@prometheus-labs.io',
  username: 'erik_builds',
  password: '5XqNz7S5aAGfkrZqwlpo'
};

async function findButtonByText(page, texts) {
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await btn.evaluate(el => el.textContent?.toLowerCase() || '');
    for (const searchText of texts) {
      if (text.includes(searchText.toLowerCase())) {
        return btn;
      }
    }
  }
  return null;
}

async function createRedditAccount() {
  console.log('🚀 Creating Reddit Account with Stealth Browser...\n');
  console.log(`   Email: ${CREDENTIALS.email}`);
  console.log(`   Username: ${CREDENTIALS.username}`);
  console.log('');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  try {
    console.log('📍 Navigating to Reddit signup...');
    await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    await page.screenshot({ path: '/tmp/reddit-v3-1.png', fullPage: true });
    console.log('📸 Screenshot 1');
    
    // Check if blocked
    const content = await page.content();
    if (content.includes('blocked by network security')) {
      console.log('❌ BLOCKED');
      await browser.close();
      return;
    }
    
    // Accept cookies
    console.log('\n🍪 Handling cookies...');
    const acceptBtn = await findButtonByText(page, ['akzeptieren', 'accept all', 'accept']);
    if (acceptBtn) {
      await acceptBtn.click();
      console.log('   ✅ Cookies accepted');
      await delay(1500);
    }
    
    // Enter email
    console.log('\n📧 Entering email...');
    
    // Look for all inputs and find the email one
    const inputs = await page.$$('input');
    console.log(`   Found ${inputs.length} input fields`);
    
    for (const input of inputs) {
      const type = await input.evaluate(el => el.type);
      const name = await input.evaluate(el => el.name);
      const placeholder = await input.evaluate(el => el.placeholder || '');
      console.log(`   Input: type=${type}, name=${name}, placeholder=${placeholder}`);
      
      if (type === 'email' || name === 'email' || placeholder.toLowerCase().includes('mail')) {
        await input.click();
        await delay(200);
        await input.type(CREDENTIALS.email, { delay: 40 });
        console.log('   ✅ Email entered');
        break;
      }
    }
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-v3-2.png', fullPage: true });
    
    // Click continue
    console.log('\n➡️ Clicking continue...');
    const continueBtn = await findButtonByText(page, ['weiter', 'continue', 'next']);
    if (continueBtn) {
      await continueBtn.click();
      console.log('   ✅ Clicked continue');
    } else {
      // Try submit button
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        console.log('   ✅ Clicked submit');
      }
    }
    
    await delay(4000);
    await page.screenshot({ path: '/tmp/reddit-v3-3.png', fullPage: true });
    console.log('📸 Screenshot 3');
    
    // Now look for username/password
    console.log('\n👤 Looking for username field...');
    const inputs2 = await page.$$('input');
    
    for (const input of inputs2) {
      const type = await input.evaluate(el => el.type);
      const name = await input.evaluate(el => el.name);
      const id = await input.evaluate(el => el.id);
      const placeholder = await input.evaluate(el => el.placeholder || '');
      
      if (name === 'username' || id.includes('username') || placeholder.toLowerCase().includes('username')) {
        await input.click();
        await delay(200);
        await input.type(CREDENTIALS.username, { delay: 40 });
        console.log('   ✅ Username entered');
      }
      
      if (type === 'password' || name === 'password') {
        await input.click();
        await delay(200);
        await input.type(CREDENTIALS.password, { delay: 40 });
        console.log('   ✅ Password entered');
      }
    }
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/reddit-v3-4.png', fullPage: true });
    console.log('📸 Screenshot 4');
    
    // Final submit
    console.log('\n🚀 Final submit...');
    const finalSubmit = await page.$('button[type="submit"]');
    if (finalSubmit) {
      await finalSubmit.click();
      console.log('   ✅ Submitted');
    }
    
    await delay(6000);
    await page.screenshot({ path: '/tmp/reddit-v3-5-final.png', fullPage: true });
    
    const finalUrl = page.url();
    const finalContent = await page.content();
    
    console.log(`\n📍 Final URL: ${finalUrl}`);
    
    if (finalContent.includes('captcha') || finalContent.includes('robot')) {
      console.log('⚠️ CAPTCHA detected');
    } else if (finalContent.includes('verify')) {
      console.log('📧 Email verification needed');
    } else if (finalUrl.includes('onboarding') || finalContent.includes('welcome')) {
      console.log('🎉 SUCCESS!');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: '/tmp/reddit-v3-error.png', fullPage: true });
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

createRedditAccount();
