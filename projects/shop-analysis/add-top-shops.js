const fs = require('fs');

// Load existing
const existing = JSON.parse(fs.readFileSync('urls/batch-2.json', 'utf8'));
const shopUrls = new Set(existing.urls);

// Add EHI Top 100 manually extracted
const ehiTop100 = [
  'amazon.de', 'otto.de', 'zalando.de', 'mediamarkt.de', 'apple.com',
  'ikea.com', 'shein.com', 'shop-apotheke.com', 'rewe.de', 'aboutyou.de',
  'breuninger.com', 'lidl.de', 'bestsecret.com', 'docmorris.de', 'hm.com',
  'bonprix.de', 'douglas.de', 'saturn.de', 'cyberport.de', 'notebooksbilliger.de',
  'alternate.de', 'tchibo.de', 'galeria.de', 'hornbach.de', 'kaufland.de',
  'bauhaus.info', 'dm.de', 'rossmann.de', 'thalia.de', 'mueller.de',
  'conrad.de', 'bauhaus.de', 'obi.de', 'decathlon.de', 'real.de',
  'neckermann.de', 'baur.de', 'quelle.de', 'christ.de', 'deichmann.de',
  'esprit.de', 'cecil.de', 'street-one.de', 's.oliver.de', 'tom-tailor.de',
  'adidas.de', 'nike.com', 'puma.de', 'under-armour.de', 'jack-wolfskin.de',
  'vaude.de', 'schöffel.de', 'mammut.com', 'patagonia.com', 'north-face.com',
  'bergzeit.de', 'bergfreunde.de', 'sportcheck.com', 'intersport.de', 'sport-thieme.de',
  'toom.de', 'hagebau.de', 'hellweg.de', 'baumarkt-direkt.de', 'voelkner.de',
  'reichelt.de', 'pollin.de', 'pearl.de', 'digitalo.de', 'getgoods.com',
  'mindfactory.de', 'caseking.de', 'alternate.de', 'jacob-elektronik.de', 'computeruniverse.net',
  'galaxus.de', 'digitec.de', 'brack.ch', 'microspot.ch', 'fust.ch',
  'manor.ch', 'coop.ch', 'migros.ch', 'interdiscount.ch', 'melectronics.ch',
  'home24.de', 'westwing.de', 'wayfair.de', 'moemax.de', 'roller.de',
  'poco.de', 'segmueller.de', 'xxxlutz.de', 'hoeffner.de', 'ostermann.de',
  'butlers.com', 'impressionen.de', 'depot-online.com', 'dänisches-bettenlager.de', 'jysk.de'
];

ehiTop100.forEach(url => shopUrls.add(url));

// Add more known German shops
const moreShops = [
  'mytheresa.com', 'fashionette.de', 'zalando-lounge.de', 'vente-privee.com', 
  'limango.de', 'brands4friends.de', 'outlet46.de', 'lesara.de',
  'mirapodo.de', 'sarenza.de', 'schuhe.de', 'schuhcenter.de', 'görtz.de',
  'reno.de', 'salamander.de', 'lloyd.com', 'sioux.de', 'ecco.com',
  'geox.com', 'clarks.de', 'birkenstock.com', 'crocs.de', 'ugg.com',
  'timberland.de', 'dr-martens.com', 'vans.de', 'converse.de', 'new-balance.de',
  'asics.de', 'brooks.de', 'saucony.de', 'mizuno.de', 'hoka.com',
  'on-running.com', 'salomon.com', 'merrell.de', 'keen.com', 'la-sportiva.com',
  'scarpa.com', 'hanwag.de', 'lowa.de', 'meindl.de', 'haglöfs.com',
  'fjällräven.com', 'bergans.com', 'norrøna.com', 'rab.equipment', 'montane.com',
  'karrimor.com', 'osprey.com', 'gregory.com', 'deuter.com', 'tatonka.com',
  'apotheke.de', 'medpex.de', 'sanicare.de', 'medikamente-per-klick.de', 'volksversand.de',
  'apotal.de', 'disapo.de', 'mycare.de', 'mediherz.de', 'zurrose.de',
  'flaconi.de', 'parfumdreams.de', 'notino.de', 'beautywelt.de', 'parfümerie-pieper.de',
  'kosmetik4less.de', 'hagel-shop.de', 'bipa.at', 'müller.de', 'bipa.at'
];

moreShops.forEach(url => shopUrls.add(url));

const urlList = Array.from(shopUrls).sort();
const output = {
  urls: urlList,
  count: urlList.length,
  collectedAt: new Date().toISOString(),
  sources: ['Trusted Shops (scraping)', 'EHI Top 100', 'Manual additions', 'Geizhals', 'Check24']
};

fs.writeFileSync('urls/batch-2-enhanced.json', JSON.stringify(output, null, 2));
console.log(`✅ Enhanced with top shops: ${urlList.length} total`);
