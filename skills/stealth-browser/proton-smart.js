#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const IDENTITY = {
  username: 'heimdallwatcher',
  password: 'Prometheus2026Secure!'
};

async function registerProton() {
  console.log('📧 PROTONMAIL - Smart detection\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US'
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { timeout: 30000 });
    await delay(5000);
    
    // Find ALL interactive elements and their positions
    const elements = await page.evaluate(() => {
      const results = [];
      
      // Find all input-like elements
      const selectors = [
        'input', '[role="textbox"]', '[contenteditable]',
        '[class*="input"]', '[class*="field"]'
      ];
      
      for (const sel of selectors) {
        document.querySelectorAll(sel).forEach(el => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          if (rect.width > 50 && rect.height > 10 && rect.x > 0 && rect.y > 0) {
            results.push({
              tag: el.tagName,
              id: el.id,
              type: el.type,
              class: el.className?.substring?.(0, 50),
              x: Math.round(rect.x + rect.width/2),
              y: Math.round(rect.y + rect.height/2),
              visible: style.visibility !== 'hidden' && style.display !== 'none'
            });
          }
        });
      }
      
      return results;
    });
    
    console.log('Found elements:');
    elements.forEach(e => console.log(`  ${e.tag}#${e.id} type=${e.type} at (${e.x}, ${e.y}) visible=${e.visible}`));
    
    await page.screenshot({ path: '/tmp/protons-1.png' });
    
    // Find visible text inputs (not password, not hidden)
    const textInputs = elements.filter(e => 
      e.tag === 'INPUT' && e.type === 'text' && e.visible
    );
    const pwdInputs = elements.filter(e => 
      e.tag === 'INPUT' && e.type === 'password' && e.visible  
    );
    
    console.log('\nText inputs:', textInputs);
    console.log('Password inputs:', pwdInputs);
    
    // Use locator with force for hidden element
    console.log('\n1️⃣ Force-clicking username input...');
    await page.locator('#username').click({ force: true, timeout: 5000 }).catch(async () => {
      console.log('   Force click failed, trying coordinates...');
      if (textInputs[0]) {
        await page.mouse.click(textInputs[0].x, textInputs[0].y);
      }
    });
    
    await delay(500);
    await page.keyboard.type(IDENTITY.username, { delay: 50 });
    
    // Verify
    const val1 = await page.inputValue('#username').catch(() => '');
    console.log('   Value:', val1);
    
    await page.screenshot({ path: '/tmp/protons-2.png' });
    
    // Password
    console.log('\n2️⃣ Password...');
    await page.locator('#password').click({ force: true, timeout: 5000 }).catch(async () => {
      if (pwdInputs[0]) {
        await page.mouse.click(pwdInputs[0].x, pwdInputs[0].y);
      }
    });
    
    await delay(500);
    await page.keyboard.type(IDENTITY.password, { delay: 30 });
    
    const val2 = await page.inputValue('#password').catch(() => '');
    console.log('   Value length:', val2.length);
    
    await page.screenshot({ path: '/tmp/protons-3.png' });
    
    // Submit
    console.log('\n🚀 Submitting...');
    await page.click('button[type="submit"], button:has-text("Start using")', { timeout: 5000 }).catch(async () => {
      await page.keyboard.press('Enter');
    });
    
    await delay(15000);
    await page.screenshot({ path: '/tmp/protons-4.png' });
    
    const url = page.url();
    const body = await page.textContent('body').catch(() => '');
    
    console.log('\n📍 URL:', url);
    
    if (body?.toLowerCase().includes('captcha')) {
      console.log('⚠️ CAPTCHA');
    } else if (body?.toLowerCase().includes('taken')) {
      console.log('⚠️ Username taken - try different name');
    } else if (!url.includes('signup')) {
      console.log('\n🎉 SUCCESS!');
      console.log('Email:', IDENTITY.username + '@proton.me');
    } else {
      console.log('📄 Body:', body?.substring(0, 150));
    }
    
  } catch (err) {
    console.error('❌', err.message);
  }
  
  await browser.close();
}

registerProton();
