#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

(async () => {
  console.log('🚀 Testing Reddit with Stealth Browser...\n');
  
  const browser = await launchStealthBrowser();
  const page = await createStealthPage(browser);
  
  console.log('📍 Navigating to Reddit...');
  await page.goto('https://www.reddit.com', { waitUntil: 'networkidle2', timeout: 30000 });
  
  await new Promise(r => setTimeout(r, 3000));
  
  const content = await page.content();
  const title = await page.title();
  
  console.log(`📄 Title: ${title}`);
  
  // Check for block
  if (content.includes('blocked by network security') || content.includes("You've been blocked")) {
    console.log('❌ BLOCKED by Reddit');
  } else if (content.includes('reddit') && !content.includes('blocked')) {
    console.log('✅ Reddit loaded successfully!');
  } else {
    console.log('⚠️ Unknown result');
  }
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/reddit-stealth-test.png', fullPage: true });
  console.log('📸 Screenshot: /tmp/reddit-stealth-test.png');
  
  await browser.close();
})();
