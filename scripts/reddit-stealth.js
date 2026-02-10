#!/usr/bin/env node
/**
 * Reddit Stealth Tool
 * Uses puppeteer-extra + stealth plugin + TC21 Exit Node
 * 
 * Usage:
 *   node scripts/reddit-stealth.js login              # Login to Reddit
 *   node scripts/reddit-stealth.js profile <user>     # Check profile
 *   node scripts/reddit-stealth.js browse <subreddit> # Browse subreddit
 *   node scripts/reddit-stealth.js comment <url> <text> # Post comment
 *   node scripts/reddit-stealth.js check-ip           # Verify exit node IP
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

// Add stealth plugin
puppeteer.use(StealthPlugin());

// Config
const CONFIG = {
  username: 'kreative_mama_de',
  password: 'KreativeMama2026!',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  cookiesPath: path.join(__dirname, '../credentials/reddit-cookies.json'),
  screenshotDir: '/tmp/reddit-stealth',
};

// Ensure screenshot directory exists
if (!fs.existsSync(CONFIG.screenshotDir)) {
  fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
}

async function createBrowser() {
  console.log('🕵️ Starting Stealth Browser...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080',
      '--lang=de-DE',
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(CONFIG.userAgent);
  
  // Set German language preference
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8'
  });
  
  // Load cookies if they exist
  if (fs.existsSync(CONFIG.cookiesPath)) {
    const cookies = JSON.parse(fs.readFileSync(CONFIG.cookiesPath, 'utf8'));
    await page.setCookie(...cookies);
    console.log('🍪 Loaded saved cookies');
  }
  
  return { browser, page };
}

async function saveCookies(page) {
  const cookies = await page.cookies();
  fs.writeFileSync(CONFIG.cookiesPath, JSON.stringify(cookies, null, 2));
  console.log('🍪 Cookies saved');
}

async function checkIP() {
  const { browser, page } = await createBrowser();
  
  try {
    await page.goto('https://ipchicken.com', { waitUntil: 'networkidle2' });
    await page.waitForSelector('body');
    
    const content = await page.content();
    const ipMatch = content.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
    
    if (ipMatch) {
      console.log(`🌐 Current IP: ${ipMatch[1]}`);
      
      // Check if it's TC21 IP
      if (ipMatch[1] === '31.19.31.13') {
        console.log('✅ TC21 Exit Node ACTIVE (Residential IP)');
      } else {
        console.log('⚠️ NOT using TC21 Exit Node!');
        console.log('   Run: sudo tailscale up --exit-node=100.125.79.108 --accept-routes --exit-node-allow-lan-access --operator=heimdall --accept-risk=linux-strict-rp-filter');
      }
    }
    
    await page.screenshot({ path: `${CONFIG.screenshotDir}/ip-check.png` });
  } finally {
    await browser.close();
  }
}

async function checkProfile(username) {
  const { browser, page } = await createBrowser();
  
  try {
    const url = `https://www.reddit.com/user/${username}`;
    console.log(`📄 Checking profile: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    
    const title = await page.title();
    const content = await page.content();
    
    // Check for ban - look for specific ban page indicators
    if (content.includes('This account has been banned') || 
        content.includes('This account has been suspended') || 
        content.includes('Dieses Konto wurde gesperrt') ||
        content.includes('account is temporarily banned')) {
      console.log(`❌ Account ${username} is BANNED/SUSPENDED`);
    } else if (content.includes('blocked by network') || content.includes("You've been blocked")) {
      console.log('❌ BLOCKED by Reddit network security');
    } else {
      console.log(`✅ Profile accessible: ${title}`);
      
      // Try to extract karma
      const karmaMatch = content.match(/(\d+)\s*karma/i);
      if (karmaMatch) {
        console.log(`📊 Karma: ${karmaMatch[1]}`);
      }
    }
    
    await page.screenshot({ path: `${CONFIG.screenshotDir}/profile-${username}.png`, fullPage: true });
    console.log(`📸 Screenshot: ${CONFIG.screenshotDir}/profile-${username}.png`);
    
  } finally {
    await browser.close();
  }
}

async function login() {
  const { browser, page } = await createBrowser();
  
  try {
    console.log('🔐 Logging in to Reddit...');
    
    // Go to new reddit login
    await page.goto('https://www.reddit.com/login', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 4000));
    
    await page.screenshot({ path: `${CONFIG.screenshotDir}/login-1-page.png` });
    
    // Dismiss cookie banner if present
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')];
      const btn = btns.find(b => b.innerText.includes('Alle akzeptieren') || b.innerText.includes('Accept'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    console.log('🍪 Cookie banner handled');
    
    await page.screenshot({ path: `${CONFIG.screenshotDir}/login-2-ready.png` });
    
    // Fill form via Shadow DOM (Reddit uses faceplate-text-input web components)
    console.log('📝 Filling credentials via Shadow DOM...');
    
    const filled = await page.evaluate((username, password) => {
      const components = document.querySelectorAll('faceplate-text-input');
      let userFilled = false;
      let passFilled = false;
      
      components.forEach(comp => {
        const shadow = comp.shadowRoot;
        if (!shadow) return;
        
        const input = shadow.querySelector('input');
        if (!input) return;
        
        const name = comp.getAttribute('name') || input.name || '';
        const type = comp.getAttribute('type') || input.type || '';
        
        if (name === 'username' && !userFilled) {
          input.focus();
          input.value = username;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
          userFilled = true;
        }
        
        if ((name === 'password' || type === 'password') && !passFilled) {
          input.focus();
          input.value = password;
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
          passFilled = true;
        }
      });
      
      return { userFilled, passFilled };
    }, CONFIG.username, CONFIG.password);
    
    console.log(`📋 Fill result: user=${filled.userFilled}, pass=${filled.passFilled}`);
    
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${CONFIG.screenshotDir}/login-3-filled.png` });
    
    if (!filled.userFilled || !filled.passFilled) {
      console.log('❌ Could not fill form fields');
      await browser.close();
      return;
    }
    
    // Click login button
    console.log('🚀 Submitting...');
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')];
      const submitBtn = btns.find(b => {
        const text = b.innerText || b.textContent || '';
        return text.includes('Anmelden') || text.includes('Log In') || text.includes('Login');
      });
      if (submitBtn) submitBtn.click();
    });
    
    // Wait for navigation
    await new Promise(r => setTimeout(r, 6000));
    
    await page.screenshot({ path: `${CONFIG.screenshotDir}/login-4-result.png` });
    
    // Check if logged in
    const afterContent = await page.content();
    const currentUrl = page.url();
    
    const loggedIn = currentUrl.includes('reddit.com') && 
                     !currentUrl.includes('/login') &&
                     (afterContent.includes('logout') || 
                      afterContent.includes('Log Out') ||
                      afterContent.includes(CONFIG.username));
    
    if (loggedIn) {
      console.log('✅ Login successful!');
      await saveCookies(page);
    } else if (afterContent.includes('incorrect') || afterContent.includes('wrong') || afterContent.includes('falsch')) {
      console.log('❌ Wrong username/password');
    } else {
      console.log('❓ Login status unclear. URL:', currentUrl);
      console.log(`📸 Screenshots in: ${CONFIG.screenshotDir}/`);
    }
    
  } finally {
    await browser.close();
  }
}

async function browseSubreddit(subreddit) {
  const { browser, page } = await createBrowser();
  
  try {
    const url = `https://old.reddit.com/r/${subreddit}/new`;
    console.log(`📖 Browsing: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    
    // Extract post titles
    const posts = await page.evaluate(() => {
      const items = document.querySelectorAll('.thing.link');
      return Array.from(items).slice(0, 10).map(item => {
        const titleEl = item.querySelector('a.title');
        const authorEl = item.querySelector('.author');
        const commentsEl = item.querySelector('.comments');
        return {
          title: titleEl?.textContent?.trim() || '',
          url: titleEl?.href || '',
          author: authorEl?.textContent?.trim() || '',
          comments: commentsEl?.textContent?.trim() || ''
        };
      });
    });
    
    console.log(`\n📋 Top 10 new posts in r/${subreddit}:\n`);
    posts.forEach((post, i) => {
      console.log(`${i+1}. ${post.title}`);
      console.log(`   👤 ${post.author} | 💬 ${post.comments}`);
      console.log(`   🔗 ${post.url}\n`);
    });
    
    await page.screenshot({ path: `${CONFIG.screenshotDir}/browse-${subreddit}.png`, fullPage: true });
    
    return posts;
  } finally {
    await browser.close();
  }
}

async function postComment(postUrl, commentText) {
  const { browser, page } = await createBrowser();
  
  try {
    console.log(`💬 Posting comment to: ${postUrl}`);
    
    // Use old reddit for easier commenting
    const oldUrl = postUrl.replace('www.reddit.com', 'old.reddit.com');
    await page.goto(oldUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    
    await page.screenshot({ path: `${CONFIG.screenshotDir}/comment-1-page.png` });
    
    // Check if logged in
    const content = await page.content();
    if (!content.includes(CONFIG.username) && !content.includes('logout')) {
      console.log('❌ Not logged in! Run: node scripts/reddit-stealth.js login');
      return;
    }
    
    // Find comment textarea
    const textarea = await page.$('textarea[name="text"]');
    if (!textarea) {
      console.log('❌ Comment textarea not found');
      return;
    }
    
    // Type comment
    await textarea.type(commentText, { delay: 30 });
    await page.screenshot({ path: `${CONFIG.screenshotDir}/comment-2-typed.png` });
    
    // Click submit
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 3000));
      
      await page.screenshot({ path: `${CONFIG.screenshotDir}/comment-3-submitted.png` });
      console.log('✅ Comment submitted!');
      
      await saveCookies(page);
    } else {
      console.log('❌ Submit button not found');
    }
    
  } finally {
    await browser.close();
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'check-ip':
      await checkIP();
      break;
      
    case 'profile':
      const user = args[1] || CONFIG.username;
      await checkProfile(user);
      break;
      
    case 'login':
      await login();
      break;
      
    case 'browse':
      const subreddit = args[1] || 'Eltern';
      await browseSubreddit(subreddit);
      break;
      
    case 'comment':
      const url = args[1];
      const text = args.slice(2).join(' ');
      if (!url || !text) {
        console.log('Usage: node reddit-stealth.js comment <post-url> <comment text>');
        process.exit(1);
      }
      await postComment(url, text);
      break;
      
    default:
      console.log(`
Reddit Stealth Tool - Stealth Browser + TC21 Exit Node

Commands:
  check-ip              Verify TC21 exit node is active
  profile [username]    Check user profile (default: kreative_mama_de)
  login                 Login to Reddit (saves cookies)
  browse [subreddit]    Browse subreddit posts (default: Eltern)
  comment <url> <text>  Post a comment

Examples:
  node scripts/reddit-stealth.js check-ip
  node scripts/reddit-stealth.js profile kreative_mama_de
  node scripts/reddit-stealth.js login
  node scripts/reddit-stealth.js browse Eltern
  node scripts/reddit-stealth.js comment "https://reddit.com/r/Eltern/..." "Toller Tipp!"
`);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
