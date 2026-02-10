const https = require('https');
const fs = require('fs');

const shopUrls = new Set();

// Load existing URLs
try {
  const existing = JSON.parse(fs.readFileSync('urls/batch-2.json', 'utf8'));
  existing.urls.forEach(url => shopUrls.add(url));
  console.log(`Loaded ${shopUrls.size} existing URLs\n`);
} catch (e) {}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractDomains(html) {
  const domains = new Set();
  const regex = /(?:https?:\/\/)?(?:www\.)?([a-z0-9][a-z0-9-]*[a-z0-9]?\.(de|com|net|org|shop|online|eu|at|ch))/gi;
  const matches = html.match(regex) || [];
  
  matches.forEach(match => {
    let domain = match.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .trim();
    
    const blacklist = ['trustedshops', 'geizhals', 'idealo', 'google', 'facebook', 
                       'instagram', 'twitter', 'amazon', 'ebay', 'paypal', 'stripe',
                       'youtube', 'linkedin', 'xing', 'etrusted', 'cloudflare'];
    
    if (!blacklist.some(b => domain.includes(b)) && domain.length > 3) {
      domains.add(domain.split('/')[0]);
    }
  });
  
  return Array.from(domains);
}

async function scrapeTrustedShopsPages(category, maxPages = 10) {
  console.log(`Scraping Trusted Shops: ${category} (multiple pages)...`);
  let total = 0;
  
  for (let page = 1; page <= maxPages; page++) {
    try {
      const url = `https://www.trustedshops.de/shops/${category}/?page=${page}`;
      const html = await fetchUrl(url);
      
      // Check if there's content
      if (!html.includes('Ergebnisse') && page > 1) break;
      
      const domains = extractDomains(html);
      domains.forEach(d => shopUrls.add(d));
      total += domains.length;
      
      await new Promise(r => setTimeout(r, 150));
    } catch (err) {
      console.log(`  Page ${page} error: ${err.message}`);
      break;
    }
  }
  
  console.log(`  Total: ${total} domains from ${category}`);
}

async function scrapeGeizhalsSimple() {
  console.log('\nScraping Geizhals merchants...');
  
  // Try different approaches
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  for (const letter of letters) {
    try {
      const url = `https://geizhals.de/merchants?letter=${letter}`;
      const html = await fetchUrl(url);
      const domains = extractDomains(html);
      domains.forEach(d => shopUrls.add(d));
      console.log(`  ${letter}: +${domains.length} domains`);
      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      console.log(`  ${letter}: error`);
    }
  }
}

async function scrapeCheck24() {
  console.log('\nScraping Check24 partners...');
  
  const categories = [
    'strom', 'gas', 'versicherungen', 'kredite', 'konto', 
    'reisen', 'hotels', 'mietwagen', 'fluege'
  ];
  
  for (const cat of categories) {
    try {
      const url = `https://www.check24.de/${cat}/`;
      const html = await fetchUrl(url);
      const domains = extractDomains(html);
      domains.forEach(d => shopUrls.add(d));
      console.log(`  ${cat}: +${domains.length} domains`);
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {}
  }
}

async function main() {
  console.log('=== MASSIVE SHOP COLLECTION ===\n');
  
  // Expanded Trusted Shops categories with pagination
  const tsCategories = [
    'bucher', 'bekleidung', 'computer_unterhaltungselektronik_zubehor',
    'baumarkt', 'drogerieartikel_kosmetik', 'sportartikel', 'schuhe',
    'mobel_dekorationsartikel', 'tierbedarf', 'lebensmittel',
    'haushaltswaren_haushaltsgerate', 'schmuck_uhren', 'optiker',
    'auto_motorrad_zubehor', 'gartenbedarf', 'spielwaren_baby_kind',
    'hobby_sammeln_freizeitartikel', 'musik_film', 'foto_druck_book_on_demand',
    'karneval_kostume', 'floristik', 'genussmittel', 'erotik', 'energie',
    'tickets', 'reisen_hotels', 'telekommunikation', 'medikamente',
    'koffer_taschen_lederwaren', 'consulting', 'finanzen_versicherungen'
  ];
  
  console.log('== TRUSTED SHOPS (with pagination) ==');
  for (const cat of tsCategories) {
    await scrapeTrustedShopsPages(cat, 20); // Check up to 20 pages per category
  }
  
  console.log('\n== GEIZHALS ==');
  await scrapeGeizhalsSimple();
  
  console.log('\n== CHECK24 ==');
  await scrapeCheck24();
  
  // Save results
  const urlList = Array.from(shopUrls).sort();
  const output = {
    urls: urlList,
    count: urlList.length,
    collectedAt: new Date().toISOString(),
    sources: ['Trusted Shops (mit Pagination)', 'Geizhals', 'Check24']
  };
  
  fs.writeFileSync('urls/batch-2.json', JSON.stringify(output, null, 2));
  
  console.log(`\n✅ COLLECTION COMPLETE`);
  console.log(`   Total shops: ${urlList.length}`);
  console.log(`   Saved to: urls/batch-2.json`);
}

main().catch(console.error);
