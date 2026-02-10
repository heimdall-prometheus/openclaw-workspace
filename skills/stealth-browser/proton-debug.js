#!/usr/bin/env node
const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function debugProton() {
  console.log('🔍 PROTONMAIL - Debug DOM\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://account.proton.me/signup?plan=free', { timeout: 30000 });
    await delay(5000);
    
    // Analyze username input
    const analysis = await page.evaluate(() => {
      const input = document.getElementById('username');
      if (!input) return { found: false };
      
      const rect = input.getBoundingClientRect();
      const style = window.getComputedStyle(input);
      const parent = input.parentElement;
      const parentRect = parent?.getBoundingClientRect();
      
      // Find all inputs
      const allInputs = Array.from(document.querySelectorAll('input')).map((inp, i) => ({
        index: i,
        id: inp.id,
        type: inp.type,
        rect: inp.getBoundingClientRect(),
        visible: style.display !== 'none' && style.visibility !== 'hidden',
        tabIndex: inp.tabIndex
      }));
      
      return {
        found: true,
        inputRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        parentRect: parentRect ? { x: parentRect.x, y: parentRect.y } : null,
        display: style.display,
        visibility: style.visibility,
        position: style.position,
        transform: style.transform,
        parentClass: parent?.className,
        allInputs
      };
    });
    
    console.log('Username analysis:');
    console.log(JSON.stringify(analysis, null, 2));
    
    // Try clicking the parent container instead
    if (analysis.found && analysis.parentRect) {
      console.log('\n🎯 Trying to click parent container...');
      await page.mouse.click(analysis.parentRect.x + 100, analysis.parentRect.y + 20);
      await delay(500);
      
      // Now type
      console.log('Typing username...');
      await page.keyboard.type('heimdallwatcher', { delay: 50 });
      
      await delay(1000);
      
      // Check if it worked
      const value = await page.evaluate(() => document.getElementById('username')?.value);
      console.log('Username value after typing:', value);
      
      await page.screenshot({ path: '/tmp/protond-1.png' });
    }
    
    // Also try: find visible input that's not the hidden one
    console.log('\n🔎 Looking for visible text inputs...');
    const visibleInputs = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[type="text"], input:not([type])');
      return Array.from(inputs).map(inp => {
        const rect = inp.getBoundingClientRect();
        return {
          id: inp.id,
          visible: rect.width > 0 && rect.height > 0 && rect.x >= 0,
          rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height }
        };
      });
    });
    console.log('Visible inputs:', JSON.stringify(visibleInputs, null, 2));
    
  } catch (err) {
    console.error('❌', err.message);
  }
  
  await browser.close();
}

debugProton();
