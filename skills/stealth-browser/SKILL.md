# Stealth Browser Skill

Undetectable browser automation using Puppeteer with stealth plugins.

## Purpose
Bypass bot detection on sites like Reddit, Twitter, etc. that block HeadlessChrome.

## Usage

### Quick Test (Bot Detection Check)
```bash
node skills/stealth-browser/test-stealth.js
```

### Launch Stealth Browser
```javascript
const { launchStealthBrowser } = require('./skills/stealth-browser/stealth-browser.js');

const browser = await launchStealthBrowser({
  headless: true,  // or 'new' for new headless mode
  proxy: null,     // optional: 'socks5://127.0.0.1:1080'
});

const page = await browser.newPage();
await page.goto('https://reddit.com');
```

### With VPN (Residential IP)
```bash
# First connect VPN
sudo vpnc /etc/vpnc/fritzbox-test.conf

# Disable IPv6 (VPN is IPv4 only)
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1

# Then run stealth browser
node skills/stealth-browser/stealth-browser.js --url https://reddit.com
```

## Stealth Features
- Patches `navigator.webdriver`
- Spoofs `chrome.runtime`
- Realistic `navigator.plugins`
- Proper `navigator.languages`
- WebGL vendor/renderer spoofing
- Passes most bot detection tests

## Testing
- https://bot.sannysoft.com - Comprehensive bot test
- https://arh.antoinevastel.com/bots/areyouheadless - Headless detection
- https://infosimples.github.io/detect-headless - Another test

## Created
2026-02-02
