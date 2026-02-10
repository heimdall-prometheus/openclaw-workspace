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

const batch13 = [
  // Garten/Pool
  'gartenhausfabrik.de', 'karibu.de', 'pooltotal.com', 'akeliagarden.de',
  'heimwerker-direkt.de', 'mein-gartenshop24.de', 'tradeinn.com',
  
  // Reitsport
  'kraemer.de', 'reitshop24.de', 'fundis-reitsport.de', 'reiterladen24.de',
  'horze.de', 'lepona.de', 'equiva.com', 'kavalio.de', 'horse-shop.net',
  
  // Drohnen/FPV
  'fpv24.com', 'flyingmachines.de', 'rctech.de', 'rotorama.de', 'fpvcopter.de',
  'n-factory.de', 'copterfarm.de',
  
  // Schreibwaren/Papeterie
  'fueller.de', 'thoerner.de', 'staehlin.de', 'buero-sutter.de',
  'papeterie-berlin.de', 'buero-eisenhauer.de', 'shop-pbs.de', 'ortloff.de', 'merkbuero.de',
  
  // Reifen/Felgen
  'felgenshop.de', 'felgenoutlet.de', 'reifen.com', 'premio.de',
  'reifenleader.de', 'kfzparts24.de', 'reifen-felgen.de', 'felgenshop-xxl.de', 'felgenfactory.de'
];

batch13.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
