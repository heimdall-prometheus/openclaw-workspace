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

const batch16 = [
  // Kinder
  'kleineskarussell.de', 'vertbaudet.de', 'korbmayer.de', 'primark.com', 'jollyroom.de',
  'liewood.de', 'c-and-a.com', 'houseofkids.de', 'little-department-store.de',
  
  // Wein/Spirituosen
  'banneke.com', 'weinquelle.com', 'weisshaus.de', 'beowein.de', 'weinfreunde.de',
  'ceres-getraenke.de', 'moevenpick-wein.de', 'hawesko.de', 'spirituosen-wolf.de',
  
  // Schuhe
  'stiefelparadies.de', 'skechers.de', 'schuhcenter.de', 'thomas-schuhe.de',
  'schuhmuecke.de', 'gebrueder-goetz.de', 'deichmann.com', 'reno.de',
  
  // Deko/Geschenke
  'wohnhaus-welten.de', 'nanu-nana.de', 'gildehandwerk.com', 'cramershop.com',
  'michaelnoll.de', 'schoener-leben-shop.de', 'fiolini.de', 'andreas-gmbh.de', 'posten-boerse.de',
  
  // Lederwaren
  'hodalump-ratschkatl.de', 'braun-bueffel.com', 'manufactum.de', 'hpc-leder.de',
  'ackermann-leder.de', 'leas-leder.de', 'almadih.com', 'matador-case.de', 'thejoriginal.com'
];

batch16.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
