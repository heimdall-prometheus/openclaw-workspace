#!/usr/bin/env node
const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function debugRedditForm() {
  console.log('🔬 Deep-diving Reddit form structure...\n');
  
  const browser = await launchStealthBrowser({ headless: 'new' });
  const page = await createStealthPage(browser);
  
  await page.goto('https://www.reddit.com/register', { waitUntil: 'networkidle2', timeout: 30000 });
  await delay(3000);
  
  // Accept cookies
  await page.evaluate(() => {
    document.querySelectorAll('button').forEach(b => {
      if (b.textContent.toLowerCase().includes('akzeptieren')) b.click();
    });
  });
  await delay(2000);
  
  // Deep analysis of the form
  console.log('📊 Analyzing DOM structure around Mailadresse...\n');
  
  const analysis = await page.evaluate(() => {
    const results = {
      allInputs: [],
      mailRelated: [],
      contentEditables: [],
      textareas: [],
      divInputs: [],
      shadowRoots: []
    };
    
    // Find all inputs
    document.querySelectorAll('input').forEach(el => {
      results.allInputs.push({
        type: el.type,
        name: el.name,
        id: el.id,
        placeholder: el.placeholder,
        ariaLabel: el.getAttribute('aria-label'),
        role: el.getAttribute('role')
      });
    });
    
    // Find contenteditable elements
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
      results.contentEditables.push({
        tag: el.tagName,
        class: el.className,
        text: el.textContent?.substring(0, 50)
      });
    });
    
    // Find textareas
    document.querySelectorAll('textarea').forEach(el => {
      results.textareas.push({
        name: el.name,
        placeholder: el.placeholder
      });
    });
    
    // Find elements with role="textbox"
    document.querySelectorAll('[role="textbox"]').forEach(el => {
      results.divInputs.push({
        tag: el.tagName,
        class: el.className,
        ariaLabel: el.getAttribute('aria-label')
      });
    });
    
    // Find the Mailadresse field specifically
    const allElements = document.querySelectorAll('*');
    for (const el of allElements) {
      if (el.textContent?.includes('Mailadresse') && el.textContent?.length < 100) {
        const parent = el.parentElement;
        const siblings = parent ? Array.from(parent.children).map(c => ({
          tag: c.tagName,
          class: c.className?.substring(0, 30),
          type: c.type,
          role: c.getAttribute('role'),
          contentEditable: c.contentEditable
        })) : [];
        
        results.mailRelated.push({
          element: el.tagName,
          text: el.textContent?.substring(0, 50),
          parent: parent?.tagName,
          parentClass: parent?.className?.substring(0, 50),
          siblings: siblings
        });
      }
    }
    
    // Check for shadow roots
    document.querySelectorAll('*').forEach(el => {
      if (el.shadowRoot) {
        results.shadowRoots.push({
          tag: el.tagName,
          class: el.className
        });
      }
    });
    
    return results;
  });
  
  console.log('All Inputs:', JSON.stringify(analysis.allInputs, null, 2));
  console.log('\nContentEditables:', JSON.stringify(analysis.contentEditables, null, 2));
  console.log('\nRole=textbox:', JSON.stringify(analysis.divInputs, null, 2));
  console.log('\nMail-related elements:', JSON.stringify(analysis.mailRelated, null, 2));
  console.log('\nShadow Roots:', JSON.stringify(analysis.shadowRoots, null, 2));
  
  // Try to find the actual input by looking at the full HTML around Mailadresse
  console.log('\n\n📝 HTML around Mailadresse field:');
  const htmlSnippet = await page.evaluate(() => {
    const labels = document.querySelectorAll('*');
    for (const el of labels) {
      if (el.textContent === 'Mailadresse*') {
        // Get grandparent HTML
        const grandparent = el.parentElement?.parentElement;
        if (grandparent) {
          return grandparent.outerHTML.substring(0, 2000);
        }
      }
    }
    return 'Not found';
  });
  console.log(htmlSnippet);
  
  await browser.close();
}

debugRedditForm();
