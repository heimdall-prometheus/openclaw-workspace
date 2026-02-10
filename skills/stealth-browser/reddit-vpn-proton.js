#!/usr/bin/env node
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const delay = (ms) => new Promise(r => setTimeout(r, ms + Math.random() * 300));

const CREDS = {
  email: 'haimdall-waldersee@proton.me',
  password: 'HeimdallReddit2026!'
};

async function run() {
  console.log('🚀 Reddit via VPN + Stealth + ProtonMail\n');
  console.log('📧 Email:', CREDS.email);
  console.log('🔐 Password:', CREDS.password);
  console.log('');
  
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  try {
    // Step 1: Open Reddit
    console.log('📍 Opening Reddit...');
    await page.goto('https://www.reddit.com/register/', { waitUntil: 'networkidle2' });
    await delay(3000);
    
    const blocked = (await page.content()).includes("You've been blocked");
    if (blocked) { console.log('❌ BLOCKED!'); await browser.close(); return; }
    console.log('✅ Not blocked!');
    
    // Cookies
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        const t = b.textContent.toLowerCase();
        if (t.includes('accept') || t.includes('akzeptieren')) b.click();
      });
    });
    await delay(2000);
    
    // Step 2: Enter email
    console.log('\n📧 STEP 1: Email');
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
        const t = b.textContent?.trim().toLowerCase();
        if (t === 'weiter' || t === 'continue') { b.click(); return; }
      }
    });
    await delay(6000);
    await page.screenshot({ path: '/tmp/vpn-1-email.png' });
    
    // Step 3: Check for verification code
    let pageText = await page.evaluate(() => document.body.innerText);
    console.log('Page after email:', pageText.substring(0, 100));
    
    if (pageText.toLowerCase().includes('code') || pageText.toLowerCase().includes('verify')) {
      console.log('\n🔑 STEP 2: Verification Code needed!');
      console.log('📧 CHECK PROTONMAIL FOR CODE!');
      console.log('');
      console.log('Waiting 90 seconds for code...');
      
      // Wait for code to arrive
      await delay(90000);
      
      // Try to get newest code from process argument or prompt
      const code = process.argv[2];
      if (!code) {
        console.log('❌ No code provided! Run with: node reddit-vpn-proton.js CODE');
        await browser.close();
        return;
      }
      
      console.log('Entering code:', code);
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
          const t = b.textContent?.trim().toLowerCase();
          if (t === 'weiter' || t === 'continue') { b.click(); return; }
        }
      });
      await delay(6000);
    }
    
    // Step 4: Username + Password
    console.log('\n👤 STEP 3: Username + Password');
    await page.screenshot({ path: '/tmp/vpn-2-username.png' });
    
    const username = await page.evaluate(() => {
      for (const c of document.querySelectorAll('faceplate-text-input')) {
        const i = c.shadowRoot?.querySelector('input');
        if (i && i.type === 'text' && i.value) return i.value;
      }
      return null;
    });
    console.log('Auto username:', username);
    
    // Fill password
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
    await page.screenshot({ path: '/tmp/vpn-3-password.png' });
    
    // Submit
    console.log('\n🚀 STEP 4: Submit');
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button')) {
        const t = b.textContent?.trim().toLowerCase();
        if ((t === 'weiter' || t === 'continue') && !b.disabled) { b.click(); return; }
      }
    });
    await delay(15000);
    await page.screenshot({ path: '/tmp/vpn-final.png' });
    
    const finalUrl = page.url();
    console.log('\n📍 Final URL:', finalUrl);
    
    if (!finalUrl.includes('register')) {
      console.log('\n🎉🎉🎉 SUCCESS!!! 🎉🎉🎉');
      console.log('Username:', username);
      console.log('Email:', CREDS.email);
      console.log('Password:', CREDS.password);
    } else {
      console.log('\n⚠️ Still on register');
      pageText = await page.evaluate(() => document.body.innerText);
      console.log('Page:', pageText.substring(0, 300));
    }
    
  } catch (err) {
    console.error('❌', err.message);
    await page.screenshot({ path: '/tmp/vpn-error.png' });
  }
  
  await browser.close();
}

run();
