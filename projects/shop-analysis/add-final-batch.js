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

// Final batch - bekannte deutsche E-Commerce Domains
const finalBatch = [
  // Große Shops die eventuell noch fehlen
  'amazon.de', 'ebay.de', 'otto.de', 'zalando.de', 'mediamarkt.de', 'saturn.de',
  'notebooksbilliger.de', 'mindfactory.de', 'jacob-elektronik.de', 'computeruniverse.net',
  'lidl.de', 'aldi-onlineshop.de', 'kaufland.de', 'real.de', 'netto-online.de',
  'dm.de', 'rossmann.de', 'mueller.de', 'budni.de',
  'thalia.de', 'weltbild.de', 'hugendubel.de', 'ebook.de',
  'shop-apotheke.com', 'docmorris.de', 'apo-rot.de', 'medpex.de', 'sanicare.de',
  'mytoys.de', 'jako-o.de', 'baby-walz.de', 'baby-markt.de', 'windeln.de',
  'tchibo.de', 'bonprix.de', 'heine.de', 's.oliver.de', 'esprit.de',
  'peek-cloppenburg.de', 'breuninger.com', 'engelhorn.de', 'lodenfrey.com', 'ansons.de',
  'snipes.com', 'footlocker.de', 'jdsports.de', 'def-shop.com', 'hhv.de',
  'galaxus.de', 'cyberport.de', 'proshop.de', 'arlt.com', 'computerbase.de',
  'hornbach.de', 'bauhaus.info', 'obi.de', 'toom.de', 'hagebau.de',
  'westwing.de', 'home24.de', 'moebel.de', 'wayfair.de', 'xxxlutz.de',
  'kika.at', 'hoeffner.de', 'roller.de', 'momax.de', 'segmueller.de',
  'parfumdreams.de', 'notino.de', 'easycosmetik.de', 'flaconi.de',
  'fressnapf.de', 'zooplus.de', 'zooroyal.de', 'petshop.de', 'tiierisch.de',
  'reichelt.de', 'voelkner.de', 'pollin.de', 'exp-tech.de', 'distrelec.de',
  'büroshop24.de', 'printus.de', 'viking.de', 'staples.de', 'office-discount.de',
  'mytheresa.com', 'farfetch.com', 'ssense.com', 'stylebop.com', 'yoox.com',
  'asos.de', 'aboutyou.de', 'fashionid.de', 'outletcity.com', 'bestsecret.de',
  'campz.de', 'bergzeit.de', 'bergfreunde.de', 'sport-schuster.de', 'sportcheck.de',
  'decathlon.de', 'intersport.de', 'karstadt-sports.de', 'bike24.de', 'bike-discount.de',
  'fahrrad.de', 'fahrrad-xxl.de', 'lucky-bike.de', 'rosebikes.de', 'boc24.de',
  'keller-sports.de', 'sport-thieme.de', 'teamsport-philipp.de', 'handball-world.com',
  'elternstolz.de', 'kinnings.de', 'kleine-fabriek.com', 'kidswoodlove.de',
  'goertz.de', 'schuhhaus-siemes.de', 'schuh-germann.de', 'mirapodo.de', 'salamander.de',
  'just-taste.de', 'american-candy.de', 'world-of-sweets.de', 'candy-shop.de'
];

finalBatch.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
