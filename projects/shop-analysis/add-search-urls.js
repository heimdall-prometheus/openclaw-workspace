const fs = require('fs');

// Load existing
const master = JSON.parse(fs.readFileSync('./urls/master-deduplicated.json', 'utf8'));
const existing = new Set(master.urls);
let added = 0;

function addUrl(url) {
  // Extract domain from URL
  try {
    const domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
    if (domain && domain.includes('.') && !existing.has(domain)) {
      existing.add(domain);
      added++;
      return true;
    }
  } catch(e) {}
  return false;
}

// URLs from Brave Search results
const searchUrls = [
  // Mode
  'asos.com', 'boohoo.com', 'trendyol.com', 'zalando.de', 'bonprix.de',
  'madeleine.com', 'sieh-an.de', 'dw-shop.de', 'bonita.de',
  
  // Elektronik
  'cyberport.de', 'x-kom.de', 'pearl.de', 'reichelt.de', 'alternate.de',
  'jacob.de', 'kmcomputer.de', 'computeruniverse.net', 'esm-computer.de', 'pollin.de',
  
  // Möbel
  'home24.de', 'megasb.de', 'otto.de', 'moemax.de', 'online-moebel-kaufen.de',
  'westwing.de', 'kare.de', 'sklum.com', 'moebelfirst.de', 'homedeluxe.de',
  
  // Garten
  'gartencenter-shop24.de', 'pflanzmich.de', 'meingartenshop.de', 'baldur-garten.de',
  'garten-schlueter.de', 'pflanzenheld.de', 'bakker.com', 'mein-schoener-garten.de',
  
  // Schmuck/Uhren
  'christ.de', 'juweliere-kraemer.de', 'valmano.de', 'uhrcenter.de',
  'schmuckshopping.de', 'unger-schmuck.com', 'wempe.com', 'diemer.de', 'orovivo.de'
];

searchUrls.forEach(addUrl);
console.log(`Added ${added} URLs from search batch 1`);

// Save
const updated = {
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
};
fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(updated, null, 2));
console.log(`Total URLs: ${existing.size}`);

// Batch 2 - more categories
const batch2 = [
  // Spielzeug
  'klein-toys-shop.de', 'german-toys.com', 'lobbesspielzeug.de', 'spielzeugwelten.de',
  'spielzeugsonderposten.de', 'smythstoys.com', 'vedes.com', 'bruder.de',
  
  // Sport/Fitness
  'sportlaedchen.de', 'gymshark.com', 'sport-thieme.de', 'gorillasports.de',
  'sportdeal24.de', 'fitshop.de', 'sport2000.de', 'intersport.de', 'smilodox.com',
  
  // Lebensmittel
  'edeka24.de', 'mytime.de', 'kaufland.de', 'supermarkt24h.de', 'netto-online.de',
  'eismann.de', 'motatos.de', 'rewe.de', 'goflink.com',
  
  // Tierbedarf
  'fressnapf.de', 'zooplus.de', 'zooroyal.de', 'fellby.de', 'meintierdiscount.de',
  'tiierisch.de', 'zooland.com.de', 'bitiba.de', 'zooundco.de', 'hund-katze.de',
  
  // Kosmetik/Parfüm
  'flaconi.de', 'parfum-zentrum.de', 'pieper.de', 'parfuemerie.de', 'parfumdreams.de',
  'notino.de', 'topparfuemerie.de', 'easycosmetic.de', 'douglas.de', 'schuback-parfuemerien.de'
];

batch2.forEach(addUrl);
console.log(`Added ${added} URLs total after batch 2`);

// Save
const final2 = {
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
};
fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(final2, null, 2));
console.log(`Total URLs: ${existing.size}`);

// Batch 3 - more categories
const batch3 = [
  // Bücher
  'buecher.de', 'hugendubel.de', 'deutsche-buchhandlung.de', 'genialokal.de',
  'kulturkaufhaus.de', 'buchkatalog.de', 'bookstore.de', 'osiander.de', 'ecobookstore.de',
  
  // Baumarkt/Werkzeug
  'sonderpreis-baumarkt.de', 'globus-baumarkt.de', 'rubart.de', 'baumarkteu.de',
  'bauhaus.info', 'schwan-baushop.de', 'stabilo-fachmarkt.de', 'baumarktdiscount.de',
  
  // Schuhe/Sneaker
  'afew-store.com', 'snipes.com', 'shoe4you.de', 'schuhe.de', 'everysize.com',
  '43einhalb.com', 'schuh-okay.de', 'schuhcenter.de', 'gebrueder-goetz.de',
  
  // Auto-Ersatzteile
  'pkwteile.de', 'autoteiledirekt.de', 'kfzteile24.de', 'atp-autoteile.de',
  'daparto.de', 'autoersatzteile.de', 'euautoteile.de', 'lott.de', 'autoteile24.de',
  
  // Baby/Kinder
  'baby-walz.de', 'babyonlineshop.de', 'babyone.de', 'vertbaudet.de',
  'babyartikel.de', 'babymarkt.com', 'jukki.de', 'kind-der-stadt.de', 'babykochs.de'
];

batch3.forEach(addUrl);
console.log(`Added ${added} URLs total after batch 3`);

// Save
const final3 = {
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
};
fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(final3, null, 2));
console.log(`Total URLs: ${existing.size}`);

// Batch 4 - more categories
const batch4 = [
  // Wein/Spirituosen
  'weinquelle.com', 'weisshaus.de', 'vomfass.de', 'weinfreunde.de', 'hawesko.de',
  'pieroth.de', 'ludwig-von-kapff.de', 'moevenpick-wein.de',
  
  // Fahrrad/E-Bike
  'fahrrad-xxl.de', 'bikeexchange.de', 'fahrrad.de', 'lucky-bike.de', 'radonline.de',
  'biketech24.de', 'staterabikes.de', 'zweirad-stadler.de',
  
  // Drogerie
  'rossmann.de', 'dm.de', 'budni.de',
  
  // Camping/Outdoor
  'camping-outdoorshop.de', 'fritz-berger.de', 'evocamp.de', 'obelink.de',
  'campingwagner.de', 'freizeitwelt.de', 'travel-wheels.de', 'outdoorfan.de', 'campingshop-24.de',
  
  // Büro/Schreibwaren
  'bueroshop24.de', 'viking.de', 'otto-office.com', 'buero-schreibwaren-foerster.de',
  'saueracker.de', 'bueroschaal.de', 'buero-weiss.de', 'paper-markt.de', 'office-discount.de'
];

batch4.forEach(addUrl);
console.log(`Added ${added} URLs total after batch 4`);

// Save
const final4 = {
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
};
fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(final4, null, 2));
console.log(`Total URLs: ${existing.size}`);

// Batch 5 - more niche categories
const batch5 = [
  // Teppich/Gardinen
  'ttl-ttm.de', 'kibek.de', 'vossberg.de', 'teppichboden.de', 'gardinen-sauer.de',
  
  // Musik
  'musicstore.de', 'musik-produktiv.de', 'musikland-online.de', 'musikhaus-hermann.de',
  'der-gitarrenladen.de', 'session.de', 'station-musicshop.de',
  
  // Druck
  'flyeralarm.com', 'wir-machen-druck.de', 'onlineprinters.de', 'saxoprint.de',
  'unitedprint.de', 'lead-print.com',
  
  // Handarbeiten/Wolle
  'wolleunddesign.de', 'handarbeitswaren.de', 'handarbeiten.de', 'buttinette.com',
  'junghanswolle.de', 'fischer-wolle.de', 'sabines-handarbeitsshop.de',
  'kunstpark-shop.de', 'flinkenadel-shop.de',
  
  // Trachten
  'schoeneberger-trachten.de', 'alpenclassics.de', 'daller-tracht.de', 'trachtl.de',
  'krueger-dirndl.de', 'trachten-werner.de', 'trachten24.eu', 'stockerpoint.de',
  'trachtenhof.de', 'allgaeulilie-shop.de'
];

batch5.forEach(addUrl);
console.log(`Added ${added} URLs total after batch 5`);

// Save
const final5 = {
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
};
fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(final5, null, 2));
console.log(`Total URLs: ${existing.size}`);

// Batch 6 - niche hobbies
const batch6 = [
  // Modellbau
  'mein-rc-shop.de', 'd-edition.de', 'rc-modell-shop.de', 'bullet-rc.de',
  'rc-race-shop.de', 'rcmodelle24.de', 'mhm-modellbau.de', 'derkum-modellbau.com',
  'tamiya.de', 'premium-modellbau.de',
  
  // Angeln/Jagd
  'angeln-jagen-outdoor.eu', 'outdoordino.de', 'jagido.de', 'pareyshop.de',
  'rhoen-jagd.de', 'deranglershop.de',
  
  // Foto/Kamera
  'foto-erhardt.de', 'foto-mundus.de', 'calumet.de', 'fotokoch.de',
  'fotobantle.de', 'kamera-express.de', 'sigma-foto.de', 'foto-leistenschneider.de',
  'fotosiegl.de', 'digitfoto.de',
  
  // Reitsport
  'reitshop24.de', 'loesdau.de', 'reiterladen24.de', 'lepona.de', 'kavalio.de',
  'kraemer.de', 'horze.de', 'fundis-reitsport.de', 'equiva.com', 'reitsportpfer.de',
  
  // Aquaristik/Terraristik
  'interaquaristik.de', 'fish-fever.de', 'sera.de', 'fische-aquaristik.de',
  'masterfisch.de', 'aquaristik-shop.eu', 'jbl.de', 'terra-tropiczoo.de', 'zierfischtreff.de'
];

batch6.forEach(addUrl);
console.log(`Added ${added} URLs total after batch 6`);

// Save
const final6 = {
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
};
fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(final6, null, 2));
console.log(`Total URLs: ${existing.size}`);
