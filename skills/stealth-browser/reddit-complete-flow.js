#!/usr/bin/env node
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
puppeteer.use(StealthPlugin());

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const CREDS = {
  email: 'haimdall-waldersee@proton.me',
  password: 'HeimdallReddit2026!'
};

async function run() {
  console.log('🚀 REDDIT ACCOUNT CREATION - COMPLETE FLOW\n');
  console.log('📧', CREDS.email);
  console.log('🔐', CREDS.password);
  console.log('');
  
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  try {
    // ===== STEP 1: OPEN & EMAIL =====
    console.log('📍 STEP 1: Opening Reddit...');
    await page.goto('https://www.reddit.com/register/', { waitUntil: 'networkidle2' });
    await delay(3000);
    
    if ((await page.content()).includes("blocked")) {
      console.log('❌ BLOCKED! VPN not working?');
      await browser.close();
      return;
    }
    console.log('✅ Not blocked!');
    
    // Cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.toLowerCase().includes('accept')) b.click();
      });
    });
    await delay(2000);
    
    // Enter email
    console.log('📧 Entering email...');
    await page.evaluate((email) => {
      for (const c of document.querySelectorAll('faceplate-text-input')) {
        const i = c.shadowRoot?.querySelector('input');
        if (i && i.type !== 'password') {
          i.focus(); i.value = email;
          i.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          return;
        }
      }
    }, CREDS.email);
    await delay(1000);
    
    // Click Continue
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'continue') { b.click(); return; }
      }
    });
    await delay(6000);
    
    // ===== STEP 2: VERIFICATION CODE =====
    console.log('\n🔑 STEP 2: Verification code...');
    console.log('📧 CODE SENT TO PROTONMAIL!');
    console.log('⏳ Waiting 45 seconds for code to arrive...\n');
    
    // Write status file so we can check
    fs.writeFileSync('/tmp/reddit-status.txt', 'WAITING_FOR_CODE');
    
    await delay(45000);
    
    // Read code from file (external process will write it)
    let code = null;
    if (fs.existsSync('/tmp/reddit-code.txt')) {
      code = fs.readFileSync('/tmp/reddit-code.txt', 'utf8').trim();
    }
    
    if (!code || code.length !== 6) {
      console.log('❌ No code found in /tmp/reddit-code.txt');
      console.log('Write the 6-digit code to that file and restart');
      fs.writeFileSync('/tmp/reddit-status.txt', 'NEED_CODE');
      await browser.close();
      return;
    }
    
    console.log('✅ Got code:', code);
    fs.writeFileSync('/tmp/reddit-status.txt', 'ENTERING_CODE');
    
    // Enter code
    await page.evaluate(() => {
      for (const c of document.querySelectorAll('faceplate-text-input')) {
        const i = c.shadowRoot?.querySelector('input');
        if (i) { i.focus(); return; }
      }
    });
    await page.keyboard.type(code, { delay: 100 });
    await delay(1000);
    
    // Click Continue
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'continue') { b.click(); return; }
      }
    });
    await delay(6000);
    
    // ===== STEP 3: USERNAME & PASSWORD =====
    console.log('\n👤 STEP 3: Username & Password...');
    fs.writeFileSync('/tmp/reddit-status.txt', 'USERNAME_PASSWORD');
    
    const username = await page.evaluate(() => {
      for (const c of document.querySelectorAll('faceplate-text-input')) {
        const i = c.shadowRoot?.querySelector('input');
        if (i && i.type === 'text' && i.value) return i.value;
      }
      return null;
    });
    console.log('📛 Username:', username);
    
    // Enter password
    await page.evaluate((pwd) => {
      for (const c of document.querySelectorAll('faceplate-text-input')) {
        if (c.getAttribute('type') === 'password') {
          const i = c.shadowRoot?.querySelector('input');
          if (i) {
            i.focus(); i.value = pwd;
            i.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
            return;
          }
        }
      }
    }, CREDS.password);
    await delay(2000);
    
    // ===== STEP 4: SUBMIT =====
    console.log('\n🚀 STEP 4: Submitting...');
    fs.writeFileSync('/tmp/reddit-status.txt', 'SUBMITTING');
    
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        if (b.textContent?.trim().toLowerCase() === 'continue' && !b.disabled) {
          b.click(); return;
        }
      }
    });
    await delay(15000);
    
    // ===== RESULT =====
    const finalUrl = page.url();
    console.log('\n' + '='.repeat(50));
    console.log('📍 Final URL:', finalUrl);
    
    if (!finalUrl.includes('register')) {
      console.log('\n🎉🎉🎉 SUCCESS!!! ACCOUNT CREATED! 🎉🎉🎉\n');
      console.log('📝 CREDENTIALS:');
      console.log('   Username:', username);
      console.log('   Email:', CREDS.email);
      console.log('   Password:', CREDS.password);
      fs.writeFileSync('/tmp/reddit-status.txt', 'SUCCESS:' + username);
      
      // Save to file
      fs.writeFileSync('/tmp/reddit-account.json', JSON.stringify({
        username, email: CREDS.email, password: CREDS.password, created: new Date().toISOString()
      }, null, 2));
    } else {
      console.log('\n⚠️ Still on register page');
      const text = await page.evaluate(() => document.body.innerText);
      console.log('Page:', text.substring(0, 300));
      fs.writeFileSync('/tmp/reddit-status.txt', 'FAILED');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    fs.writeFileSync('/tmp/reddit-status.txt', 'ERROR:' + err.message);
  }
  
  await browser.close();
  console.log('\n🏁 Done');
}

run();
