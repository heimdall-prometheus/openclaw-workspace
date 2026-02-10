const fs = require('fs');
const path = require('path');

// Load existing URLs
const urlDir = './urls';
const existingUrls = new Set();

fs.readdirSync(urlDir).filter(f => f.endsWith('.json')).forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(urlDir, file), 'utf8'));
    const urls = data.urls || data;
    if (Array.isArray(urls)) {
      urls.forEach(u => existingUrls.add(u.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')));
    }
  } catch(e) {}
});

console.log(`Existing URLs: ${existingUrls.size}`);

// Add known German shops from various sources
const newUrls = [
  // Top 100 from ecommercegermany.com
  'chefkoch.de', 'spiegel.de', 'hugoboss.com', 'bmw.de', 'getyourguide.de',
  'otto.de', 'paperlike.com', 'volkswagen.de', 'impericon.com', 'canyon.com',
  'elgato.com', 'mouser.de', 'mytheresa.com', 'carhartt.com', 'visitberlin.de',
  'brabus.com', 'zwilling.com', 'mpb.com', 'adidas.de', 'liebherr.com',
  'taschen.com', 'bequiet.com', 'liqui-moly.com', 'nuerburgring.de',
  'asphaltgold.de', 'miele.de', 'qiagen.com', 'lillydoo.com', 'c-und-a.com',
  'eppendorf.com', 'zugspitze.de', 'cherry.de', 'thalia.de', 'womanizer.com',
  'interrail.eu', 'wago.com', 'hornbach.de', 'thomann.de', 'leica-camera.com',
  'yt-industries.com', 'heise.de', 'braun.de', 'deuter.com', 'thomassabo.com',
  'sartorius.com', 'stabilo.com', '1und1.de', 'purelei.com', 'mueller.de',
  'stern.de', 'ticketmaster.de', 'tropical-islands.de', 'lamy.com',
  'junghans.de', 'galeria.de', 'werder.de', 'snipes.com', 'maskworld.com',
  'kik.de', 'thunderbike.de', 'autodoc.de', 'peek-cloppenburg.de',
  'toom.de', 'einhell.de', 'boker.de', 'breuninger.com', 'baur.de',
  'rebelle.com', 'lidl.de', 'deichmann.com', 'jochen-schweizer.de',
  'o2online.de', 'labymod.net', 'bauerfeind.de', 'schwalbe.com',
  'medimops.de', 'toyota.de', 'zooroyal.de', 'bergzeit.de', 'structurae.net',
  'carlroth.com', 'gerryweber.com', 'verivox.de', 'mydays.de',
  'avantgarde.net', 'uhrzeit.org', 'engelbert-strauss.de', 'wempe.com',
  'ernstings-family.de', 'whitewall.com', 'bonprix.de', 'vaude.com',
  'wildling.shoes', 'bike24.de',
  
  // Common German shop patterns
  'aboutyou.de', 'zalando.de', 'amazon.de', 'ebay.de', 'mediamarkt.de',
  'saturn.de', 'notebooksbilliger.de', 'cyberport.de', 'alternate.de',
  'mindfactory.de', 'computeruniverse.net', 'jacob.de', 'proshop.de',
  'reichelt.de', 'voelkner.de', 'conrad.de', 'pollin.de', 'elv.de',
  'pearl.de', 'westfalia.de', 'svh24.de', 'contorion.de', 'toolineo.de',
  'toolnation.de', 'zoro.de', 'smdv.de', 'bueroshop24.de', 'viking.de',
  'staples.de', 'printus.de', 'memo.de', 'schaefer-shop.de',
  
  // Fashion
  'asos.de', 'hm.com', 'zara.com', 'mango.com', 'esprit.de', 's.oliver.de',
  'tom-tailor.de', 'marc-o-polo.com', 'boss.com', 'tommy.com',
  'lacoste.com', 'levis.com', 'diesel.com', 'replay.it', 'guess.eu',
  'gstar.com', 'jack-wolfskin.de', 'mammut.com', 'fjallraven.com',
  'patagonia.com', 'northface.de', 'columbia.com', 'salomon.com',
  'asics.com', 'newbalance.de', 'puma.com', 'reebok.de', 'under-armour.de',
  'skechers.de', 'ecco.com', 'clarks.de', 'birkenstock.com', 'tamaris.com',
  'gabor.de', 'lloyd.com', 'bugatti-fashion.com', 'camel-active.de',
  
  // Home & Garden
  'ikea.com', 'hoeffner.de', 'xxxlutz.de', 'poco.de', 'roller.de',
  'moebel-kraft.de', 'segmueller.de', 'porta.de', 'momax.de',
  'home24.de', 'wayfair.de', 'westwing.de', 'made.com', 'sklum.com',
  'vidaxl.de', 'beliani.de', 'lomado.de', 'moebel-eins.de',
  'gartenxxl.de', 'hagebau.de', 'bauhaus.info', 'obi.de', 'hellweg.de',
  'globus-baumarkt.de', 'baywa.de', 'dehner.de', 'gartencenter.de',
  
  // Sports
  'decathlon.de', 'intersport.de', 'sportscheck.com', 'karstadt-sports.de',
  'fahrrad.de', 'bikeunit.de', 'bruegelmann.de', 'bike-discount.de',
  'bike-components.de', 'rosebikes.de', 'lucky-bike.de', 'radon-bikes.de',
  'canyon.com', 'cube.eu', 'specialized.com', 'trek.com', 'giant-bicycles.com',
  'kicker.de', 'fanatics.de', 'fanshop.de',
  
  // Electronics
  'expert.de', 'euronics.de', 'ep.de', 'medimax.de', 'technikdirekt.de',
  'ao.de', 'coolblue.de', 'galaxus.de', 'digitalo.de', 'getgoods.de',
  'preis24.de', 'handyflash.de', 'sparhandy.de', 'deinhandy.de',
  'mobilcom-debitel.de', 'klarmobil.de', 'congstar.de', 'blau.de',
  'simyo.de', 'yourfone.de', 'drillisch-online.de',
  
  // Health & Beauty  
  'douglas.de', 'flaconi.de', 'parfumdreams.de', 'parfuemerie.de',
  'notino.de', 'lookfantastic.de', 'sephora.de', 'marionnaud.de',
  'rossmann.de', 'dm.de', 'budni.de', 'mueller-drogerie.de',
  'docmorris.de', 'shop-apotheke.com', 'medpex.de', 'aponeo.de',
  'apotal.de', 'mycare.de', 'versandapo.de', 'apo-rot.de',
  
  // Food & Drinks
  'rewe.de', 'edeka24.de', 'bringmeister.de', 'allyouneedfresh.de',
  'mytime.de', 'getnow.de', 'flink.com', 'gorillas.io', 'picnic.de',
  'getir.de', 'knuspr.de', 'bofrost.de', 'eismann.de', 'hellofresh.de',
  'marleyspoon.de', 'kochhaus.de', 'gourmondo.de', 'delinero.de',
  'coffeecircle.com', 'roastmarket.de', 'kaffee24.de', 'tchibo.de',
  'jacobs.de', 'lavazza.de', 'illy.com',
  
  // Pet supplies
  'fressnapf.de', 'zooplus.de', 'tiierisch.de', 'bitiba.de',
  'petshop.de', 'zoo24.de', 'zooroyal.de', 'futterhaus.de',
  'das-futterhaus.de', 'petspremium.de', 'alsa-hundewelt.de',
  
  // Baby & Kids
  'baby-walz.de', 'babymarkt.de', 'babyartikel.de', 'windeln.de',
  'kinderbutt.de', 'jako-o.de', 'mytoys.de', 'limango.de', 'tausendkind.de',
  'vertbaudet.de', 'kidswoodlove.de', 'smallable.com',
  
  // DIY & Crafts
  'buttinette.com', 'stfrenz.de', 'stoffe.de', 'stoffkontor.de',
  'snaply.de', 'makerist.de', 'burda-style.com', 'rico-design.de',
  'idee-shop.com', 'vbs-hobby.com', 'basteln-de.buttinette.com'
];

// Add to set
let added = 0;
newUrls.forEach(url => {
  const normalized = url.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!existingUrls.has(normalized)) {
    existingUrls.add(normalized);
    added++;
  }
});

console.log(`Added ${added} new URLs`);
console.log(`Total URLs now: ${existingUrls.size}`);

// Save as new batch
const batch4 = {
  source: 'manual-collection-top100-categories',
  collected_at: new Date().toISOString(),
  urls: [...existingUrls].sort()
};

fs.writeFileSync('./urls/batch-4-expanded.json', JSON.stringify(batch4, null, 2));
console.log(`Saved to batch-4-expanded.json`);
