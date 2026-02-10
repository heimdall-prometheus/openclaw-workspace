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

const batch10 = [
  // Medien
  'jpc.de', 'petershop.com', 'secondhandcds.de', 'verleihshop.de', 'momox.de',
  
  // Smart Home/Elektro
  'voltus.de', 'easy-smarthome.de', 'elektroshopwagner.de', 'easy-smarthome-shop.de', 'elv.com',
  'druckerzubehoer.de',
  
  // Wassersport/Boote
  'svb.de', 'compass24.de', 'marinawassersport.de', 'gruendl.de', 'schiffsladen.at',
  'marina-shop.de', 'wellenshop.de', 'sea-sports.de', 'boot24.com', 'bootshop-online.shop',
  
  // Motorrad
  'motorradbekleidung.de', 'cs-bikewear.de', 'moto24.de', 'motoport.de', 'xlmoto.de',
  'polo-motorrad.com', 'moto-discount.de', 'touratech.de', 'bikeroutfit.de', '1000ps.de',
  
  // Ski/Snowboard
  'glisshop.de', 'snowshop.de', 'snowleader.de', 'warehouse-one.de', 'ridestore.de',
  'sport-bittl.com', 'bergruft.de', 'snowbitch.de', 'ski-shop-charlottenburg.de'
];

batch10.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
