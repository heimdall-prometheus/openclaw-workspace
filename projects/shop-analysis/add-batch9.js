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

const batch9 = [
  // Gaming
  'caseking.de', 'dubaro.de', 'corsair.com', 'one.de',
  
  // Tee/Kaffee
  'tee-kaffee-shop.com', 'frogcoffee.de', 'kaffee24.de', 'frischeparadies-shop.de',
  'machwitz-kaffee.de', 'eilles.de', 'kaffeeshop24.de', 'paul-schrader.de',
  'tee-peter-kaffee.de', 'coffee-perfect.de',
  
  // Bio/Naturkost
  'rapunzel.de', 'e-biomarkt.de', 'all-bio.de', 'naturkost.com', 'keimling.de',
  'davert.de', 'byodo.de', 'purenature.de',
  
  // Sicherheitstechnik
  'amg-sicherheitstechnik.de', 'blaupunkt-sicherheitssysteme.de', 'secplan.de',
  'security.abus.com', 'graef-gruppe.de', 'goliath-shop.de', 'i-alarmsysteme.de', 'verisure.de',
  
  // Vintage/Retro
  'vintagehaus.de', 'tidlos-design.de', 'freudenhaus-online.de', 'whoppah.com',
  'loberon.de', 'lagerhaus.de', 'cocoli.com', 'wohnen.de'
];

batch9.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
