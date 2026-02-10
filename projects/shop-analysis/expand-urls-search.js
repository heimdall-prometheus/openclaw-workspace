const fs = require('fs');

// Load existing
const master = JSON.parse(fs.readFileSync('./urls/master-deduplicated.json', 'utf8'));
const existing = new Set(master.urls);
const newUrls = [];

function normalize(url) {
  return url.toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .trim();
}

function addUrl(url) {
  const norm = normalize(url);
  if (norm && norm.length > 3 && !existing.has(norm) && norm.includes('.')) {
    existing.add(norm);
    newUrls.push(norm);
  }
}

// German shop domain patterns - common TLDs and patterns
const germanShopPatterns = [
  // Common shop domain patterns from known directories
  'shop-apotheke.at', 'medikamente-per-klick.de', 'apo-discounter.de',
  'versandapotheke.de', 'zur-rose.de', 'sanicare.de', 'vitalsana.de',
  
  // More electronics
  'caseking.de', 'hardwarecamp.de', 'arlt.com', 'atelco.de', 'k-m.de',
  'musikhaus-korn.de', 'justmusic.de', 'session.de', 'music-store.de',
  
  // More fashion
  'dress-for-less.de', 'outletcity.com', 'brands4friends.de', 
  'veepee.de', 'bestsecret.com', 'fashionette.de', 'wardow.com',
  'koffer-direkt.de', 'kofferworld.de', 'titan-koffer.de',
  'samsonite.de', 'rimowa.com', 'bric.it', 'stratic.de',
  
  // Shoes
  'goertz.de', 'görtz.de', 'reno.de', 'schuhcenter.de', 'shoe4you.com',
  'schuhe24.de', 'mirapodo.de', 'sarenza.de', 'spartoo.de', 'schuhhaus-siemes.de',
  'humanic.net', 'dosenbach.ch', 'ochsner-shoes.ch', 'snipes.de',
  'footlocker.de', 'jdsports.de', 'sizeer.de', 'runnerinn.com',
  
  // Sports
  'sport-schuster.de', 'sporthaus.de', 'keller-sports.de', 
  'ballside.com', 'kickz.com', 'basketballshop24.de',
  'tennis-point.de', 'tennis-warehouse.de', 'racket-star.de',
  'golf-shop.de', 'golfhouse.de', 'par71.de', 'trendgolf.de',
  'angelsport.de', 'angel-domaene.de', 'angelplatz.de', 'am-angelsport.de',
  'camping-outdoorshop.de', 'fritz-berger.de', 'campingshop-24.de',
  'obelink.de', 'campingwagner.de', 'camping-kaufhaus.com',
  
  // Home & Living
  'waeschekrone.de', 'bettwaren-shop.de', 'bettenwelt.de', 'schlafwelt.de',
  'allnatura.de', 'dormando.de', 'bettenrid.de', 'matratzen-concord.de',
  'schlafwelt.de', 'emma-matratze.de', 'bett1.de', 'casper.com',
  'lampenwelt.de', 'lampe.de', 'leuchtenzentrale.de', 'leuchten-direkt.de',
  'design-bestseller.de', 'connox.de', 'ambientedirect.com', 'cairo.de',
  'goodform.ch', 'smow.de', 'designfunktion.de', 'markanto.de',
  
  // Kitchen & Household
  'springlane.de', 'kochform.de', 'kuechenprofi.de', 'wmf.com',
  'fissler.com', 'silit.de', 'staub.de', 'lecreuset.com',
  'wesco.de', 'brabantia.com', 'hailo.de', 'koziol.de',
  'manufactum.de', 'torquato.de', 'hagen-grote.de', 'proidee.de',
  
  // DIY & Tools
  'toolineo.de', 'svh24.de', 'toolnation.de', 'werkzeugstore24.de',
  'werkzeug-shop.de', 'contorion.de', 'dictum.com', 'feinewerkzeuge.de',
  'sautershop.de', 'hoffmann-group.com', 'screwfix.de', 'fixings.de',
  
  // Garden
  'poetschke.de', 'baldur-garten.de', 'bakker.com', 'tom-garten.de',
  'native-plants.de', 'pflanzmich.de', 'einhell.de', 'al-ko.com',
  'gardena.com', 'stihl.de', 'husqvarna.com', 'wolf-garten.com',
  
  // Jewelry & Watches
  'christ.de', 'juwelier-kraemer.de', 'bijou-brigitte.com',
  'schmuck-laden.de', 'silber.de', 'trauringshop24.de', 'verdera.de',
  'uhrcenter.de', 'zeitlounge.de', 'uhren4you.de', 'askari-uhren.de',
  
  // Toys & Games
  'spielemax.de', 'smyths-toys.de', 'rofu.de', 'galeria-kaufhof.de',
  'hugendubel.de', 'buecher.de', 'weltbild.de', 'bol.de',
  'spiele-offensive.de', 'fantasywelt.de', 'brettspielwelt.de',
  
  // Music & Instruments  
  'musicstore.de', 'musik-produktiv.de', 'kirstein.de', 'gear4music.de',
  'jpc.de', 'bear-family.de', 'hhv.de', 'juno.co.uk',
  
  // Office & Business
  'buero-discount.de', 'bueromarkt-ag.de', 'office-discount.de',
  'otto-office.com', 'schaefer-shop.de', 'gaerner.de', 'certeo.de',
  'kaiser-kraft.de', 'seton.de', 'jungheinrich-profishop.de',
  
  // Auto & Motorcycle
  'kfzteile24.de', 'autoteile24.de', 'daparto.de', 'pkwteile.de',
  'motointegrator.de', 'tirendo.de', 'reifen.com', 'reifendirekt.de',
  'pneus-online.de', 'goodwheel.de', 'felgenshop.de', 'felgenoutlet.de',
  'polo-motorrad.de', 'louis.de', 'fc-moto.de', 'motoin.de',
  
  // Crafts & Hobby
  'hobbyking.de', 'modellsport-schweighofer.at', 'miniplanes.de',
  'lindinger.at', 'premium-modellbau.de', 'conrad-modellbau.de',
  'stickerei.de', 'button-king.de', 'namensbaender.de', 'etiketten.de'
];

germanShopPatterns.forEach(addUrl);

console.log(`Added ${newUrls.length} new URLs`);
console.log(`Total now: ${existing.size}`);

// Save updated master
const updated = {
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
};
fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(updated, null, 2));
console.log('Updated master-deduplicated.json');

// More German shops - batch 2
const moreShops = [
  // Pharmacies & Health
  'apotheke.de', 'online-apotheke.de', 'docsimon.de', 'eurapon.de',
  'mediherz.de', 'volksversand.de', 'besamex.de', 'aliva.de',
  
  // Tech & Electronics  
  'snogard.de', 'one.de', 'hiq24.de', 'notebooksandmore.de',
  'lapstore.de', 'mysn.de', 'schenker-tech.de', 'xmg.gg',
  'tuxedocomputers.com', 'tuxedo.de', 'pcking.de',
  
  // Fashion brands DE
  'marc-cain.com', 'riani.com', 'luisa-cerano.com', 'windsor.de',
  'drykorn.com', 'closed.com', 'cinque.de', 'digel.de', 'carl-gross.de',
  'strellson.com', 'joop.com', 'baldessarini.com', 'bogner.com',
  'sportalm.at', 'airfield.at', 'marccain.de', 'betty-barclay.com',
  'gerry-weber.com', 'taifun.com', 'samoon.com', 'street-one.de',
  'cecil.de', 'comma-fashion.com', 'someday.de', 'opus-fashion.com',
  'soyaconcept.com', 'fransa.com', 'kaffe.dk', 'ichi.dk',
  
  // Outdoor & Hiking
  'bergfreunde.de', 'doorout.de', 'unterwegs.biz', 'globetrotter.de',
  'trekkingstar.de', 'outdoor-broker.de', 'sport-schuster.de',
  'denk-outdoor.de', 'tapir-store.de', 'bergsport-welt.de',
  
  // Bikes
  'bike-mailorder.de', 'hibike.de', 'jehlebikes.de', 'mtb-news.de',
  'r2-bike.com', 'boc24.de', 'radwelt-shop.de', 'stadler.de',
  'zweirad-stadler.de', 'fahrradxxl.de', 'b-o-c.de', 'bikeunit.de',
  
  // Furniture
  'moebel-boss.de', 'sb-moebel-boss.de', 'sconto.de', 'moebel-martin.de',
  'moebel-mahler.de', 'zurbrueggen.de', 'moemax.de', 'moebel-heinrich.de',
  'moebel-huebner.de', 'moebel-wikinger.de', 'massivum.de',
  'wohnsektion.de', 'moebel-ideal.de', 'moebel-fundgrube.de',
  
  // Lighting
  'lampenwelt.de', 'lampen1a.de', 'click-licht.de', 'skapetze.com',
  'lichterliebe.de', 'lenwelt.de', 'wohnlicht.com', 'light11.de',
  
  // Food & Beverage
  'dallmayr.de', 'jacobs-professional.de', 'melitta.de', 'lavazza.de',
  'segafredo.de', 'illy.de', 'nespresso.com', 'coffeefriend.de',
  'kaffee-partner.de', 'gourmesso.de', 'kaffeevorteil.de',
  'weinfreunde.de', 'hawesko.de', 'vicampo.de', 'belvini.de',
  'weinclub.ch', 'wirwinzer.de', 'vinello.de', 'silkes-weinkeller.de',
  
  // Supplements & Fitness
  'nu3.de', 'myprotein.de', 'bulk.com', 'bodylab24.de', 'esn.com',
  'fitmart.de', 'mic-bodyshop.de', 'american-supps.com', 'fitnessworld24.de',
  'zec-plus.de', 'peak.ag', 'got7nutrition.de', 'rocka-nutrition.de',
  
  // Hygiene & Cleaning
  'hygi.de', 'hygieneshop.de', 'sani-star.de', 'medishop.de',
  'sanismart.de', 'hygienevertrieb.de', 'reinigungsberater.de',
  
  // Office furniture
  'bueromoebel-experte.de', 'buero-blitz.de', 'bueromoebel-profi.de',
  'moebelshop24.de', 'yourchair.de', 'ergotopia.de', 'buerostuhl24.com',
  
  // Industrial & B2B
  'hoffmann-group.com', 'wuerth.de', 'berner.de', 'hahn-kolb.de',
  'msc-direct.de', 'stuermer.de', 'holzprofi24.de', 'metalltechnik-shop.de',
  
  // Print & Signs
  'flyeralarm.com', 'wir-machen-druck.de', 'onlineprinters.de',
  'saxoprint.de', 'unitedprint.de', 'cewe.de', 'pixum.de',
  'fotokasten.de', 'posterxxl.de', 'myposter.de', 'albelli.de',
  
  // Electronics accessories
  'arktis.de', 'gravis.de', 'comtech.de', 'macnificos.de',
  'cancom.de', 'mactrade.de', 'macerkopf.de', 'mac-shop.de'
];

moreShops.forEach(addUrl);

console.log(`Added ${newUrls.length} new URLs total`);
console.log(`Total now: ${existing.size}`);

// Save again
const final = {
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
};
fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(final, null, 2));
