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

const batch15 = [
  // Handy/Smartphone
  'hulle24.de', 'coolgadget.de', 'shop.telekom.de', 'meinonlinelager.de',
  'handytreff.de', 'wigento.de', 'pearl.de', 'mobiltec24.de', 'gomibo.de',
  
  // Gardinen/Teppich
  'kibek.de', 'ttl-ttm.de', 'nordicnest.de', 'mein-gardinenshop.de',
  'poco.de', 'gardinenbox.de', 'shopping24.de', 'tedox.de',
  
  // Betten/Matratzen
  'betten.de', 'bett1.de', 'jysk.de', 'betten-abc.de', 'belama.de', 'alles-zum-schlafen.de',
  
  // Sanitär/Heizung
  'weinmann-schanz.de', 'schwarte-shop.de', 'emax-haustechnik.de', 'heunert.de',
  'heima24.de', 'heizung-badezimmer.com', 'klempnerladen24.de', 'gep24.de',
  
  // Laufen/Fitness
  'sport-mueller.de', 'running-point.de', 'i-run.de', 'lauf-bar.de',
  'sportfits.de', 'shop4runners.com', 'sportler.com', 'bunert.de', 'lunge.de'
];

batch15.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
