#!/usr/bin/env node
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const CONFIG = {
  username: 'kreative_mama_de',
  password: 'KreativeMama2026!'
};

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
  
  console.log('Going to Reddit login...');
  await page.goto('https://www.reddit.com/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 5000));
  
  // Dismiss cookie banner
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const btn = btns.find(b => b.innerText.includes('Alle akzeptieren') || b.innerText.includes('Accept'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Looking for faceplate-text-input elements...');
  
  // Get info about the faceplate-text-input elements
  const faceplateInfo = await page.evaluate(() => {
    const components = document.querySelectorAll('faceplate-text-input');
    return Array.from(components).map((comp, i) => {
      // Try to access shadow root
      const shadow = comp.shadowRoot;
      let inputInfo = null;
      if (shadow) {
        const input = shadow.querySelector('input');
        if (input) {
          inputInfo = {
            type: input.type,
            name: input.name,
            placeholder: input.placeholder
          };
        }
      }
      return {
        index: i,
        name: comp.getAttribute('name'),
        type: comp.getAttribute('type'),
        placeholder: comp.getAttribute('placeholder'),
        hasShadow: !!shadow,
        inputInShadow: inputInfo
      };
    });
  });
  
  console.log('Faceplate inputs:', JSON.stringify(faceplateInfo, null, 2));
  
  // Fill the form by setting values on the faceplate components
  console.log('Filling form via shadow DOM...');
  
  const filled = await page.evaluate((username, password) => {
    const components = document.querySelectorAll('faceplate-text-input');
    let userFilled = false;
    let passFilled = false;
    
    components.forEach(comp => {
      const shadow = comp.shadowRoot;
      if (!shadow) return;
      
      const input = shadow.querySelector('input');
      if (!input) return;
      
      const placeholder = comp.getAttribute('placeholder') || input.placeholder || '';
      const type = comp.getAttribute('type') || input.type || '';
      
      if ((placeholder.includes('Nutzername') || placeholder.includes('Mail') || placeholder.includes('username')) && !userFilled) {
        input.focus();
        input.value = username;
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        userFilled = true;
        console.log('Filled username');
      }
      
      if (type === 'password' && !passFilled) {
        input.focus();
        input.value = password;
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        passFilled = true;
        console.log('Filled password');
      }
    });
    
    return { userFilled, passFilled };
  }, CONFIG.username, CONFIG.password);
  
  console.log('Fill result:', filled);
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/tmp/reddit-stealth/test3-filled.png' });
  
  if (filled.userFilled && filled.passFilled) {
    console.log('Clicking submit...');
    
    // Find and click login button
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button, faceplate-button')];
      const submitBtn = btns.find(b => {
        const text = b.innerText || b.textContent || '';
        return text.includes('Anmelden') || text.includes('Log In') || text.includes('Login');
      });
      if (submitBtn) {
        console.log('Found button:', submitBtn.innerText);
        submitBtn.click();
      } else {
        // Try submitting the form
        const form = document.querySelector('faceplate-form, form');
        if (form) form.submit?.();
      }
    });
    
    await new Promise(r => setTimeout(r, 6000));
    await page.screenshot({ path: '/tmp/reddit-stealth/test3-result.png' });
    
    console.log('Final URL:', page.url());
    
    // Check if logged in
    const content = await page.content();
    if (content.includes('logout') || content.includes(CONFIG.username)) {
      console.log('✅ LOGIN SUCCESSFUL!');
    } else {
      console.log('Login may have failed, checking...');
    }
  }
  
  await browser.close();
}

main().catch(e => console.error(e));
