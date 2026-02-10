#!/usr/bin/env node
/**
 * Shop Analyzer - Einzelne Shop-URL analysieren
 * Usage: node analyze-shop.js https://example-shop.de
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const TECH_SIGNATURES = {
  shopware6: [
    'sw-page', 'shopware-pwa', '/widgets/checkout', 'shopware.config',
    'sw-cms', 'shopware/storefront', 'swag'
  ],
  shopware5: [
    'engine/Shopware', '/themes/Frontend/', 'shopware.js', 
    'shopware-ui', 'emotion--wrapper'
  ],
  woocommerce: [
    'woocommerce', 'wp-content', 'add_to_cart', 'wc-add-to-cart',
    '/wp-json/wc/', 'is-woocommerce'
  ],
  magento: [
    'Magento', 'mage-', 'requirejs-config', 'MAGEMOJO',
    '/static/version', 'checkout/onepage'
  ],
  shopify: [
    'cdn.shopify.com', 'Shopify.theme', 'myshopify.com',
    'shopify-section', '/cart.js'
  ],
  prestashop: [
    'prestashop', 'presta-', 'PrestaShop', 
    'blockcart', '/themes/default-bootstrap'
  ],
  jtl: [
    'jtl-shop', 'JTL', 'jtl_token'
  ],
  gambio: [
    'gambio', 'GXEngine', 'gx-', 'gambio_'
  ],
  oxid: [
    'oxid', 'oxideshop', 'OXID'
  ]
};

const PAYMENT_SIGNATURES = {
  paypal: ['paypal', 'PayPal', 'pp-', 'braintree'],
  klarna: ['klarna', 'Klarna'],
  stripe: ['stripe', 'Stripe', 'js.stripe.com'],
  mollie: ['mollie', 'Mollie'],
  amazon_pay: ['amazonpay', 'amazon-pay'],
  apple_pay: ['apple-pay', 'ApplePay'],
  google_pay: ['google-pay', 'googlepay']
};

async function fetchPage(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ShopAnalyzer/1.0)',
        'Accept': 'text/html',
        'Accept-Language': 'de-DE,de;q=0.9'
      },
      timeout: timeout
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : new URL(res.headers.location, url).href;
        fetchPage(redirectUrl, timeout).then(resolve).catch(reject);
        return;
      }
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        status: res.statusCode,
        headers: res.headers,
        body: data.substring(0, 500000) // Limit to 500KB
      }));
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

function detectTech(html, headers) {
  const detected = [];
  const htmlLower = html.toLowerCase();
  
  for (const [tech, signatures] of Object.entries(TECH_SIGNATURES)) {
    for (const sig of signatures) {
      if (htmlLower.includes(sig.toLowerCase())) {
        detected.push(tech);
        break;
      }
    }
  }
  
  // Check headers
  const serverHeader = headers['x-powered-by'] || headers['server'] || '';
  if (serverHeader.toLowerCase().includes('shopware')) detected.push('shopware');
  
  return [...new Set(detected)];
}

function detectPayments(html) {
  const detected = [];
  const htmlLower = html.toLowerCase();
  
  for (const [payment, signatures] of Object.entries(PAYMENT_SIGNATURES)) {
    for (const sig of signatures) {
      if (htmlLower.includes(sig.toLowerCase())) {
        detected.push(payment);
        break;
      }
    }
  }
  
  return [...new Set(detected)];
}

function extractContact(html) {
  const emailMatch = html.match(/[\w.-]+@[\w.-]+\.\w{2,}/g);
  const phoneMatch = html.match(/(\+49|0)[0-9\s/-]{8,}/g);
  
  return {
    emails: emailMatch ? [...new Set(emailMatch)].slice(0, 5) : [],
    phones: phoneMatch ? [...new Set(phoneMatch)].slice(0, 3) : []
  };
}

function detectSocial(html) {
  const social = [];
  if (html.includes('instagram.com') || html.includes('instagram')) social.push('instagram');
  if (html.includes('facebook.com') || html.includes('fb.com')) social.push('facebook');
  if (html.includes('twitter.com') || html.includes('x.com')) social.push('twitter');
  if (html.includes('linkedin.com')) social.push('linkedin');
  if (html.includes('youtube.com')) social.push('youtube');
  if (html.includes('tiktok.com')) social.push('tiktok');
  if (html.includes('pinterest.com')) social.push('pinterest');
  return social;
}

function detectBranche(html, url) {
  const htmlLower = html.toLowerCase();
  const urlLower = url.toLowerCase();
  
  const branchenKeywords = {
    fashion: ['mode', 'fashion', 'kleidung', 'textil', 'outfit', 'wear', 'bekleidung'],
    electronics: ['elektronik', 'technik', 'computer', 'handy', 'smartphone', 'hardware'],
    home: ['möbel', 'wohnen', 'einrichtung', 'küche', 'bad', 'garten', 'haus'],
    beauty: ['kosmetik', 'beauty', 'pflege', 'parfum', 'makeup'],
    food: ['lebensmittel', 'food', 'delikatessen', 'bio', 'wein', 'kaffee'],
    sport: ['sport', 'fitness', 'outdoor', 'fahrrad', 'bike'],
    toys: ['spielzeug', 'spielwaren', 'kinder', 'baby'],
    pets: ['tier', 'hund', 'katze', 'pet', 'futter'],
    health: ['gesundheit', 'apotheke', 'medizin', 'nahrungsergänzung'],
    auto: ['auto', 'kfz', 'motorrad', 'reifen', 'ersatzteil']
  };
  
  for (const [branche, keywords] of Object.entries(branchenKeywords)) {
    for (const kw of keywords) {
      if (htmlLower.includes(kw) || urlLower.includes(kw)) {
        return branche;
      }
    }
  }
  return 'other';
}

function calculateApproachAngles(analysis) {
  const angles = [];
  
  // SW5 -> SW6 Migration
  if (analysis.tech.includes('shopware5')) {
    angles.push('sw5-migration');
  }
  
  // Outdated tech
  if (analysis.tech.includes('magento') || analysis.tech.includes('prestashop')) {
    angles.push('platform-modernization');
  }
  
  // Missing payments
  if (!analysis.payments.includes('klarna') && !analysis.payments.includes('paypal')) {
    angles.push('payment-optimization');
  }
  
  // No social
  if (analysis.social.length < 2) {
    angles.push('social-marketing');
  }
  
  // SSL issues would be detected separately
  
  return angles;
}

async function analyzeShop(url) {
  // Ensure URL has protocol
  if (!url.startsWith('http')) {
    url = 'https://' + url;
  }
  
  const result = {
    url: url,
    analyzed_at: new Date().toISOString(),
    status: 'pending',
    tech: [],
    payments: [],
    contact: { emails: [], phones: [] },
    social: [],
    branche: 'unknown',
    ssl: url.startsWith('https'),
    approach_angles: [],
    error: null
  };
  
  try {
    const response = await fetchPage(url);
    
    if (response.status !== 200) {
      result.status = 'error';
      result.error = `HTTP ${response.status}`;
      return result;
    }
    
    result.status = 'ok';
    result.tech = detectTech(response.body, response.headers);
    result.payments = detectPayments(response.body);
    result.contact = extractContact(response.body);
    result.social = detectSocial(response.body);
    result.branche = detectBranche(response.body, url);
    result.approach_angles = calculateApproachAngles(result);
    
  } catch (err) {
    result.status = 'error';
    result.error = err.message;
  }
  
  return result;
}

// Main
if (require.main === module) {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: node analyze-shop.js <url>');
    process.exit(1);
  }
  
  analyzeShop(url).then(result => {
    console.log(JSON.stringify(result, null, 2));
  });
}

module.exports = { analyzeShop };
