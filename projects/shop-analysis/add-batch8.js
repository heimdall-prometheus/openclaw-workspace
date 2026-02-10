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

const batch8 = [
  // Vitamine/Supplements
  'vitaminversand24.com', 'sunday.de', 'naturtreu.de', 'shop-naturpur.de', 'nemshop.de',
  'lebenskraftpur.de', 'iherb.com', 'herbafit.de', 'medicom.de', 'feelgood-shop.com',
  
  // Optiker/Brillen
  'optilens.de', 'misterspex.de', 'alensa.de', 'fielmann.de', 'abele-optik.de',
  'apollo.de', 'brille24.de', 'matt.de',
  
  // Hochzeit/Braut
  'braut-boutique.com', 'noni-mode.de', 'hochzeitshaus.berlin', 'brautly.de',
  'hochzeitsrausch.com', 'beautifulbrideshop.de', 'andcompliments.com', 'wedding-shop24.de',
  
  // Grill/BBQ
  'thebbqshop.de', 'grillfuerst.de', 'santosgrills.de', 'grillstar.de', 'grillgoods.de',
  'bbq-toro.de', 'bbq24.de', 'grillarena.de', 'babossa-bbq.de', 'barbequer.de',
  
  // Golf/Tennis
  'golfshop.de', 'sportshop-direct.de', 'wilson.com', 'planetgolf.de', 'tennistown.de',
  'arcadia-golf.de', 'golfundguenstig.de', 'tennis-point.de', 'tennis-world.de', 'sportspar.de'
];

batch8.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
