#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdallwatcher',
  password: 'Prometheus2026Secure!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL - Custom element approach\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { timeout: 30000 });
    await delay(5000);
    
    console.log('Page loaded');
    
    // Find the visible username container (the custom input)
    const customInput = await page.evaluate(() => {
      // Look for the wrapper that contains the hidden input
      const hiddenInput = document.getElementById('username');
      if (!hiddenInput) return null;
      
      // Go up to find the clickable wrapper
      let el = hiddenInput.parentElement;
      while (el) {
        const rect = el.getBoundingClientRect();
        if (rect.x > 0 && rect.y > 0 && rect.width > 100) {
          return {
            tag: el.tagName,
            class: el.className,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
          };
        }
        el = el.parentElement;
      }
      
      // Alternative: find by aria-label or placeholder text area
      const allDivs = document.querySelectorAll('[contenteditable], [role="textbox"], .email-input-field');
      for (const div of allDivs) {
        const rect = div.getBoundingClientRect();
        if (rect.x > 0 && rect.y > 0) {
          return {
            tag: div.tagName,
            class: div.className,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
          };
        }
      }
      
      return null;
    });
    
    console.log('Custom input found:', customInput);
    
    // Find ALL clickable elements near the username label
    const nearLabel = await page.evaluate(() => {
      // Find "Benutzername" label
      const labels = document.querySelectorAll('label, .label, [class*="label"]');
      for (const label of labels) {
        if (label.textContent?.includes('Benutzername') || label.textContent?.includes('Username')) {
          const rect = label.getBoundingClientRect();
          // Find clickable sibling or nearby element
          const parent = label.parentElement;
          const clickables = parent?.querySelectorAll('input, div, span, [tabindex]');
          return {
            labelRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            siblings: Array.from(clickables || []).map(el => ({
              tag: el.tagName,
              rect: el.getBoundingClientRect()
            }))
          };
        }
      }
      return null;
    });
    
    console.log('Near label:', JSON.stringify(nearLabel, null, 2));
    
    // Click below the "Benutzername" label
    console.log('\n1️⃣ Clicking username area...');
    // Based on screenshot, username field is around y=350 (below "Erstelle dein Proton-Konto")
    await page.mouse.click(583, 351); // Center of visible username field
    await delay(500);
    
    // Type username
    console.log('   Typing...');
    await page.keyboard.type(IDENTITY.username, { delay: 50 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protonc-1.png' });
    
    // Check value
    const val1 = await page.evaluate(() => document.getElementById('username')?.value);
    console.log('   Value:', val1);
    
    // Password
    console.log('\n2️⃣ Clicking password...');
    await page.mouse.click(583, 440);
    await delay(500);
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    
    // Confirm password
    console.log('3️⃣ Confirm password...');
    await page.mouse.click(583, 473);
    await delay(500);
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    
    await delay(1000);
    await page.screenshot({ path: '/tmp/protonc-2.png' });
    
    // Submit
    console.log('\n🚀 Submit...');
    await page.mouse.click(583, 517);
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/protonc-3.png' });
    
    const url = page.url();
    const body = await page.textContent('body').catch(() => '');
    console.log('\n📍 URL:', url);
    console.log('📄 Body:', body?.substring(0, 200));
    
    if (!url.includes('signup')) {
      console.log('\n🎉 SUCCESS!');
    } else if (body?.toLowerCase().includes('captcha')) {
      console.log('\n⚠️ CAPTCHA');
    }
    
  } catch (err) {
    console.error('❌', err.message);
  }
  
  await browser.close();
}

registerProton();
