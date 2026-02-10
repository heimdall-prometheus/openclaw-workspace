#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

(async () => {
  console.log('🚀 Testing Reddit REGISTER with Stealth Browser...\n');
  
  const browser = await launchStealthBrowser();
  const page = await createStealthPage(browser);
  
  console.log('📍 Navigating to Reddit Register...');
  await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
  
  await new Promise(r => setTimeout(r, 3000));
  
  const content = await page.content();
  const title = await page.title();
  
  console.log(`📄 Title: ${title}`);
  
  // Check for block
  if (content.includes('blocked by network security') || content.includes("You've been blocked")) {
    console.log('❌ BLOCKED by Reddit');
  } else if (content.includes('Sign Up') || content.includes('Create') || content.includes('register') || content.includes('email')) {
    console.log('✅ Registration page loaded!');
    
    // Check for form elements
    const hasEmailField = await page.$('input[name="email"]') !== null || 
                          await page.$('input[type="email"]') !== null;
    const hasUsernameField = await page.$('input[name="username"]') !== null;
    
    console.log(`   Email field: ${hasEmailField ? '✅' : '❌'}`);
    console.log(`   Username field: ${hasUsernameField ? '✅' : '❌'}`);
  } else {
    console.log('⚠️ Unknown result - checking screenshot');
  }
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/reddit-register-stealth.png', fullPage: true });
  console.log('📸 Screenshot: /tmp/reddit-register-stealth.png');
  
  await browser.close();
})();
