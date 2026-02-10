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

const batch14 = [
  // Shisha/Vape
  'paradise-shisha.de', 'aladin-shishashop.de', 'shisharia.de', 'dampflager.de',
  'shisha-nil.de', 'bulletshopberlin.de', 'shisha-world.com', 'house-of-vape.de',
  
  // Uhren
  'wempe.com', 'uhrinstinkt.de', 'pfandhaus-schumachers.de', 'uhren4you.de',
  'uhren-miquel.de', 'chronext.de', 'brinckmann-lange.de', 'umr-ruhla.de',
  
  // Foto/Kamera
  'kamera-express.de', 'foto-leistenschneider.de', 'foto-erhardt.de', 'fotobrenner.de',
  'calumet.de', 'enjoyyourcamera.com', 'fotopro24.de',
  
  // Künstlerbedarf
  'kunstpark-shop.de', 'idee-shop.com', 'gerstaecker.de', 'kreativ.de',
  'boesner.com', 'malstoff.de', 'modulor.de', 'staffeleien-shop.de',
  
  // Brautmode/Herrenmode
  'biancas-brautmoden.de', 'liebreiz-brautmode.de', 'hochzeitshaus-frankfurt.de',
  'hockerty.de', 'adornia-brautmode.de', 'brautmoden-walter.de', 'anna-moda.com', 'brand-moden.de'
];

batch14.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
