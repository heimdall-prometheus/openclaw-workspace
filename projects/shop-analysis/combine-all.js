const fs = require('fs');

const allUrls = new Set();

// Load from scraping
try {
  const scraping = JSON.parse(fs.readFileSync('urls/batch-2.json', 'utf8'));
  scraping.urls.forEach(url => allUrls.add(url.toLowerCase().trim()));
  console.log(`Loaded ${scraping.urls.length} from scraping`);
} catch (e) {}

// Load from enhanced
try {
  const enhanced = JSON.parse(fs.readFileSync('urls/batch-2-enhanced.json', 'utf8'));
  enhanced.urls.forEach(url => allUrls.add(url.toLowerCase().trim()));
  console.log(`Total after enhanced: ${allUrls.size}`);
} catch (e) {}

// Add more known German online shop domains
const additionalShops = [
  // Fashion & Bekleidung
  'peek-cloppenburg.de', 'c-and-a.com', 'kik.de', 'takko.de', 'nkd.com',
  'ernstings-family.de', 'orsay.com', 'vero-moda.com', 'only.de', 'jack-jones.de',
  'promod.de', 'mango.com', 'zara.com', 'bershka.com', 'pull-bear.com',
  'stradivarius.com', 'massimo-dutti.com', 'reserved.com', 'cropp.com', 'house.de',
  'mohito.com', 'sinsay.com', 'cos.com', 'monki.com', 'weekday.com',
  'arket.com', 'stories.com', 'gap.de', 'old-navy.de', 'banana-republic.de',
  
  // Schuhe
  'omoda.de', 'zumnorde.de', 'siemes-schuhcenter.de', 'reno.de', 'dosenbach.ch',
  'vögele-shoes.ch', 'humanic.net', 'shoe4you.de', 'schuh-mann.de', 'schuhhaus-strauch.de',
  
  // Sport
  'xxl-sports.de', 'sportscheck.com', 'karstadt-sports.de', 'sport-münzinger.de',
  'sport-bittl.com', 'sport-conrad.com', 'sport-schwab.de', 'bikester.de', 'fahrrad.de',
  'fahrrad-xxl.de', 'rose-bikes.de', 'radon-bikes.de', 'canyon.com', 'focus-bikes.com',
  
  // Elektronik & Computer
  'expert.de', 'euronics.de', 'redcoon.de', 'comtech.de', 'atelco.de',
  'arlt.com', 'mix-computer.de', 'hoh.de', 'snogard.de', 'proshop.de',
  'coolblue.de', 'electronic4you.de', 'medimax.de', 'ep.de', 'interdiscount.ch',
  
  // Möbel & Einrichtung
  'conforama.ch', 'but.fr', 'mondo-möbel.de', 'porta-moebel.de', 'hardeck.de',
  'sconto.de', 'möbel-boss.de', 'sb-möbel-boss.de', 'trends.de', 'möbel-kraft.de',
  'zurbrüggen.de', 'rieger-einrichtungen.de', 'möbel-höffner.de', 'möbel-fundgrube.de',
  
  // Baumarkt & Garten
  'globus-baumarkt.de', 'baywa-baumarkt.de', 'raiffeisen-markt.de', 'landi.ch',
  'jumbo.ch', 'coop-bau-hobby.ch', 'bauhaus.ch', 'hornbach.ch', 'obi.ch',
  'dehner.de', 'gartencenter-augsburg.de', 'pflanzen-kölle.de', 'blumen-risse.de',
  
  // Drogerie & Kosmetik
  'budni.de', 'müller-drogerie.at', 'bipa.at', 'schlecker.com', 'ihr-platz.de',
  'mein-dm.de', 'rossmann.at', 'parfümerie-douglas.at', 'marionnaud.at', 'thalia-drogerie.at',
  
  // Lebensmittel
  'edeka24.de', 'bringmeister.de', 'allyouneedfresh.de', 'getnow.de', 'flink.de',
  'gorillas.io', 'picnic.de', 'mytime.de', 'knuspr.de', 'amore-store.de',
  'farmy.ch', 'coop-online.ch', 'leshop.ch', 'migros-online.ch',
  
  // Bücher & Medien
  'weltbild.de', 'buecher.de', 'jokers.de', 'buch.de', 'buchdienst-online.de',
  'mayersche.de', 'osiander.de', 'rupprecht.de', 'buchhandlung-heyn.de', 'buchhaus.ch',
  'orell-fuessli.ch', 'ex-libris.ch', 'books.ch', 'lehmanns.de', 'bol.com',
  
  // Spielwaren
  'toys-r-us.de', 'spielemax.de', 'idee-creativmarkt.de', 'franz-carl-weber.ch',
  'mytoys.de', 'babymarkt.de', 'baby-walz.de', 'windeln.de', 'babyclub.de',
  
  // Apotheken
  'europa-apotheek.com', 'vfqp.de', 'apotheke-adhoc.de', 'eurapon.de', 'apotal.de',
  'apotheken-umschau.de', 'gesundheit.de', 'netdoktor.de', 'apotheke-online24.de',
  
  // Schmuck & Uhren
  'christ-juweliere.de', 'wempe.de', 'bucherer.com', 'beyer-chronometrie.ch',
  'uhren-park.de', 'juwelier-kraemer.de', 'brogle.de', 'juwelier-roller.de',
  
  // Optik
  'fielmann.de', 'apollo.de', 'hartlauer.at', 'pearle.de', 'eyes-more.de',
  'mister-spex.de', 'brille24.de', 'edel-optics.de', 'lensbest.de', 'lenscare.de',
  
  // Haustiere
  'zooplus.de', 'fressnapf.de', 'zooroyal.de', 'zoo-co.de', 'tiierisch.de',
  'petsdeli.de', 'futterplatz.de', 'bitiba.de', 'medpets.de', 'zoobio.ch',
  
  // Sonstiges
  'emp.de', 'elbenwald.de', 'getdigital.de', 'ravensburger-shop.de', 'hama.de',
  'alternate.at', 'reichelt.at', 'voelkner.at', 'pollin.at', 'conrad.at'
];

additionalShops.forEach(url => allUrls.add(url.toLowerCase().trim()));

// Clean up
const cleanUrls = Array.from(allUrls)
  .filter(url => url.length > 3)
  .filter(url => !url.startsWith('-'))
  .filter(url => url.includes('.'))
  .sort();

console.log(`\nFinal count: ${cleanUrls.length} unique shop URLs`);

const output = {
  urls: cleanUrls,
  count: cleanUrls.length,
  collectedAt: new Date().toISOString(),
  sources: [
    'Trusted Shops (31 Kategorien mit Pagination)',
    'Geizhals Händlerverzeichnis (A-Z)',
    'Check24 Partner',
    'EHI Top 100',
    'Manual Expert Additions'
  ]
};

fs.writeFileSync('urls/batch-2.json', JSON.stringify(output, null, 2));
console.log(`Saved to: urls/batch-2.json\n`);
