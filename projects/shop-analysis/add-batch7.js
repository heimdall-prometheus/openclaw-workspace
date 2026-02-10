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

const batch7 = [
  // Lampen
  'lampe.de', 'lampenundleuchten.de', 'lampenonline.de', 'lampengigant.de', 'lampenwelt.de',
  'lampify.de', 'click-licht.de', 'lampen1a.de', 'meine-wunschleuchte.de', 'led-lichtraum.de',
  
  // Sanitär/Bad
  'skybad.de', 'sanitaerdiscount24.de', 'reuter.de', 'emero.de', 'baddepot.de',
  'megabad.com', 'meinhausshop.de', 'badsanitaer.de', 'badtraum24.de',
  
  // Küche/Haushalt
  'ep.de', 'klarstein.de', 'kueche24.com', 'kuechenfachmarkt-shop.de',
  'siemens-home.bsh-group.com', 'neff-home.com',
  
  // Geschenke
  'geschenke-online.de', 'geschenke24.de', 'manufaktur-liebevoll.de', '1a-geschenkeshop.de',
  'mersor.de', 'yoursurprise.de', 'geschenkplanet.de', 'geschenke.de', 'radbag.de',
  
  // Koffer/Taschen
  'koffer.com', 'taschenparadies.de', 'markenkoffer.de', 'hausfelder.de', 'koffer24.de',
  'taschenkaufhaus.de', 'koffer-kopf.de', 'kofferexpress24.de', 'kofferworld.de'
];

batch7.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
