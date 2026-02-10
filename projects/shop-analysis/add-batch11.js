const fs = require('fs');
const master = JSON.parse(fs.readFileSync('./urls/master-deduplicated.json', 'utf8'));
const existing = new Set(master.urls);
let added = 0;

function addUrl(url) {
  const domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
  if (domain && domain.includes('.') && !existing.has(domain)) {
    existing.add(domain);
    added++;
  }
}

const batch11 = [
  // Outdoor/Camping
  'unterwegs.biz', 'evocamp.de', 'camp4.de', 'denk-outdoor.de', 'naturzeit.com',
  'bw-discount.de', 'campz.de', 'outaway.de',
  
  // Werkzeug
  'werkzeugstore24.de', 'dakl-shop.de', 'top-maschinen.de', 'toolineo.de',
  'lefeld.de', 'schwan-baushop.de', 'kleiner.de', 'festool.de',
  
  // Stoffe/Nähen
  'stoffe.de', 'stoffpalast.de', 'stoffe-hemmers.de', 'hans-textil-shop.de',
  'kattun-stoffe.de', 'stoff4you.de', 'buttinette.com', 'stoffkontor.eu',
  'der-buntspecht-shop.de', 'stoffe-werning.de',
  
  // Schmuck/Uhren
  'schmuckshopping.de', 'valmano.de', 'uhren-schmuck.de', 'uhrcenter.de',
  'mona.de', 'uhren-weiss-shop.de', 'galeria.de', 'klingel.de',
  
  // Feinkost
  'gourmet-versand.com', 'gourmemaison.de', 'leniundhans.de', 'gourmet-markt.de',
  'gourmondo.de', 'nurgutes.de', 'dallmayr-versand.de', 'michelsen-versand.de'
];

batch11.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
