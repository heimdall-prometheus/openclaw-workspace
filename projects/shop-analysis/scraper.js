const https = require('https');
const http = require('http');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const shopUrls = new Set();

// Helper: Fetch URL
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Extract domain from URL or text
function extractDomain(text) {
  if (!text) return null;
  
  // Remove common prefixes
  text = text.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  // Extract domain
  const match = text.match(/^([a-z0-9-]+\.[a-z]{2,})/i);
  return match ? match[1] : null;
}

// Scrape Geizhals merchants page
async function scrapeGeizhals(page) {
  const url = `https://geizhals.de/merchants?pg=${page}`;
  console.log(`Scraping Geizhals page ${page}...`);
  
  try {
    const html = await fetchUrl(url);
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // Find merchant links
    const merchantLinks = doc.querySelectorAll('a[href*="/merchants/"]');
    let count = 0;
    
    merchantLinks.forEach(link => {
      const merchantName = link.textContent.trim();
      const domain = extractDomain(merchantName);
      
      if (domain && !domain.includes('geizhals') && !domain.includes('ebay')) {
        shopUrls.add(domain);
        count++;
      }
    });
    
    console.log(`  Found ${count} shops on page ${page}`);
    return true;
  } catch (err) {
    console.error(`Error scraping page ${page}:`, err.message);
    return false;
  }
}

// Scrape Trusted Shops category
async function scrapeTrustedShops(category) {
  const url = `https://www.trustedshops.de/shops/${category}/`;
  console.log(`Scraping Trusted Shops: ${category}...`);
  
  try {
    const html = await fetchUrl(url);
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // Find shop headings (h3 with shop names)
    const shopHeadings = doc.querySelectorAll('h3');
    let count = 0;
    
    shopHeadings.forEach(h3 => {
      const shopName = h3.textContent.trim();
      const domain = extractDomain(shopName);
      
      if (domain) {
        shopUrls.add(domain);
        count++;
      }
    });
    
    console.log(`  Found ${count} shops in ${category}`);
    return true;
  } catch (err) {
    console.error(`Error scraping ${category}:`, err.message);
    return false;
  }
}

// Main execution
async function main() {
  console.log('Starting shop collection...\n');
  
  // Scrape Geizhals (all 59 pages)
  console.log('=== GEIZHALS ===');
  for (let page = 1; page <= 59; page++) {
    await scrapeGeizhals(page);
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  }
  
  // Scrape Trusted Shops categories
  console.log('\n=== TRUSTED SHOPS ===');
  const categories = [
    'bucher', 'bekleidung', 'computer_unterhaltungselektronik_zubehor',
    'baumarkt', 'drogerieartikel_kosmetik', 'sportartikel', 'schuhe',
    'mobel_dekorationsartikel', 'tierbedarf', 'lebensmittel',
    'haushaltswaren_haushaltsgerate', 'schmuck_uhren', 'optiker',
    'auto_motorrad_zubehor', 'gartenbedarf', 'spielwaren_baby_kind',
    'hobby_sammeln_freizeitartikel', 'musik_film', 'foto_druck_book_on_demand'
  ];
  
  for (const cat of categories) {
    await scrapeTrustedShops(cat);
    await new Promise(r => setTimeout(r, 300));
  }
  
  // Save results
  const urlList = Array.from(shopUrls).sort();
  const output = {
    urls: urlList,
    count: urlList.length,
    collectedAt: new Date().toISOString()
  };
  
  fs.mkdirSync('projects/shop-analysis/urls', { recursive: true });
  fs.writeFileSync(
    'projects/shop-analysis/urls/batch-2.json',
    JSON.stringify(output, null, 2)
  );
  
  console.log(`\n✅ Collection complete!`);
  console.log(`   Total shops: ${urlList.length}`);
  console.log(`   Saved to: projects/shop-analysis/urls/batch-2.json`);
}

main().catch(console.error);
