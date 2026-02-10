const https = require('https');
const fs = require('fs');

const shopUrls = new Set();

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Extract domains from HTML text (simple regex approach)
function extractDomains(html) {
  const domains = new Set();
  
  // Match .de domains
  const regex = /([a-z0-9-]+\.(de|com|net|org|shop|online|eu))/gi;
  const matches = html.match(regex) || [];
  
  matches.forEach(domain => {
    domain = domain.toLowerCase().trim();
    // Filter out common non-shop domains
    if (!domain.includes('trustedshops') && 
        !domain.includes('geizhals') &&
        !domain.includes('idealo') &&
        !domain.includes('google') &&
        !domain.includes('facebook') &&
        !domain.includes('instagram') &&
        !domain.includes('twitter') &&
        !domain.includes('amazon') &&
        !domain.includes('ebay') &&
        domain.length > 3) {
      domains.add(domain);
    }
  });
  
  return Array.from(domains);
}

async function main() {
  console.log('Collecting shop URLs...\n');
  
  // Trusted Shops categories
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
  
  for (const cat of tsCategories) {
    try {
      const url = `https://www.trustedshops.de/shops/${cat}/`;
      console.log(`Fetching: ${cat}...`);
      const html = await fetchUrl(url);
      const domains = extractDomains(html);
      domains.forEach(d => shopUrls.add(d));
      console.log(`  + ${domains.length} domains`);
      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      console.log(`  Error: ${err.message}`);
    }
  }
  
  // Save results
  const urlList = Array.from(shopUrls).sort();
  const output = {
    urls: urlList,
    count: urlList.length,
    collectedAt: new Date().toISOString(),
    source: 'Trusted Shops Kategorien'
  };
  
  fs.mkdirSync('urls', { recursive: true });
  fs.writeFileSync('urls/batch-2.json', JSON.stringify(output, null, 2));
  
  console.log(`\n✅ Collected ${urlList.length} shop URLs`);
  console.log(`   Saved to: urls/batch-2.json`);
}

main().catch(console.error);
