const https = require('https');
const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('urls/batch-2.json', 'utf8'));
const shopUrls = new Set(existing.urls);
console.log(`Starting with: ${shopUrls.size} URLs\n`);

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractDomains(html) {
  const regex = /(?:https?:\/\/)?(?:www\.)?([a-z0-9][a-z0-9-]*[a-z0-9]?\.(de|com|net|org|shop|online|eu|at|ch))/gi;
  const matches = html.match(regex) || [];
  const blacklist = ['trustedshops', 'geizhals', 'idealo', 'google', 'facebook', 
                     'instagram', 'twitter', 'amazon', 'ebay', 'youtube', 'linkedin'];
  
  return matches
    .map(m => m.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0])
    .filter(d => !blacklist.some(b => d.includes(b)) && d.length > 3);
}

async function scrapeMoreCategories() {
  // Scrape more Trusted Shops categories that might have been missed
  const moreCategories = [
    'geschenke', 'erotik', 'energie', 'consulting', 'kunst', 'antiquitaeten',
    'briefmarken', 'muenzen', 'wein', 'spirituosen', 'kaffee', 'tee',
    'heimtextilien', 'bettwaesche', 'handtuecher', 'gardinen', 'teppiche',
    'lampen', 'leuchten', 'elektrowerkzeuge', 'handwerkzeuge', 'maschinen',
    'arbeitskleidung', 'sicherheitsschuhe', 'werkstattbedarf', 'industriebedarf'
  ];
  
  for (const cat of moreCategories) {
    try {
      const url = `https://www.trustedshops.de/shops/${cat}/`;
      const html = await fetchUrl(url);
      const domains = extractDomains(html);
      domains.forEach(d => shopUrls.add(d));
      console.log(`${cat}: +${domains.filter(d => !existing.urls.includes(d)).length} new`);
      await new Promise(r => setTimeout(r, 150));
    } catch (e) {}
  }
}

async function scrapeIdealoShops() {
  console.log('\nScraping Idealo shops...');
  const categories = [
    'computer-zubehoer', 'haushalt', 'garten', 'baumarkt', 'werkzeug',
    'auto-motorrad', 'sport-outdoor', 'spielzeug', 'baby-kind', 'mode-accessoires',
    'schmuck-uhren', 'beauty-gesundheit', 'haus-garten', 'lebensmittel-getraenke'
  ];
  
  for (const cat of categories) {
    try {
      const url = `https://www.idealo.de/preisvergleich/ProductCategory/${cat}.html`;
      const html = await fetchUrl(url);
      const domains = extractDomains(html);
      domains.forEach(d => shopUrls.add(d));
      await new Promise(r => setTimeout(r, 100));
    } catch (e) {}
  }
}

// Add more specific German shop domains
function addKnownShops() {
  const knownShops = [
    // Regional / Small chains
    'manufactum.de', 'gefu.de', 'zwilling.com', 'wmf.com', 'fissler.de',
    'silit.de', 'rösle.de', 'schulte-ufer.de', 'kopschitz-kerzen.de',
    'kahla-porzellan.com', 'seltmann-weiden.de', 'villeroy-boch.de',
    'rosenthal.de', 'meissen.com', 'hutschenreuther.de', 'arzberg.de',
    
    // Outdoor & Camping
    'outdoor-renner.de', 'outdoor-broker.de', 'campingwagner.de', 'fritz-berger.de',
    'obelink.de', 'camping-shop24.de', 'berger-camping.de', 'campingshop-24.de',
    'frankana.de', 'campingwelt.de', 'campz.de', 'doorout.com', 'tapir.de',
    
    // Handwerk & Werkzeug
    'contorion.de', 'toolineo.de', 'svh24.de', 'werkzeugstore24.de', 'westfalia.de',
    'manomano.de', 'wiltec.de', 'zgonc.at', 'bauking.de', 'holzprofi24.de',
    
    // Auto & Motorrad
    'autoteile24.de', 'kfzteile24.de', 'autodoc.de', 'pkwteile.de', 'motointegrator.de',
    'louis.de', 'polo-motorrad.de', 'fc-moto.de', 'motea.com', 'xlmoto.de',
    'polo.de', 'atu.de', 'heycar.de', 'mobile.de', 'autoscout24.de',
    
    // Fahrrad
    'bike24.de', 'bike-components.de', 'bike-discount.de', 'chainreactioncycles.com',
    'wiggle.de', 'bike-mailorder.de', 'hibike.de', 'lucky-bike.de', 'rabe-bike.de',
    
    // Elektronik spezialisiert
    'cyberport.at', 'gravis.de', 'arlt.com', 'notebookgalerie.de', 'one.de',
    'mobilcom-debitel.de', 'smartphonepiloten.de', 'handyflash.de', 'asgoodasnew.de',
    
    // Haustier spezialisiert
    'hundeland.de', 'hundeshop.de', 'katzen-markt.de', 'futter-fundgrube.de',
    'aquasabi.de', 'aquaristikshop.com', 'zoo-zajac.de', 'zooschmiede.de',
    
    // Garten spezialisiert
    'pötschke.de', 'as-garten.de', 'flora-toskana.de', 'lubera.com', 'gärtner-pötschke.de',
    'native-plants.de', 'gartenxxl.de', 'garten-schlueter.de', 'bakker.com',
    
    // Hobby & Basteln
    'buttinette.de', 'vbs-hobby.com', 'creativ-discount.de', 'idee-shop.com',
    'boesner.com', 'modulor.de', 'kunstpark.de', 'kunstloft.de', 'karin-krause.de',
    
    // Musik
    'thomann.de', 'musicstore.de', 'session.de', 'justmusic.de', 'kirstein.de',
    'pianelli.de', 'music-shop.eu', 'musikhaus-korn.de', 'musik-produktiv.de',
    
    // Büro
    'viking.de', 'officepartner.de', 'bueroboss.de', 'bueroshop24.de', 'mcbuero.de',
    'avery-zweckform.com', 'soennecken.com', 'lyreco.de', 'printus.de',
    
    // Wein & Spirituosen
    'weinfreunde.de', 'hawesko.de', 'vicampo.de', 'wirwinzer.de', 'weinclub.de',
    'jacques.de', 'the-whisky-store.de', 'banneke.de', 'rumundco.de', 'kirsch-import.de',
    
    // Kaffee & Tee
    'kaffeezentrale.de', 'roastmarket.de', 'coffee-circle.com', 'playground-coffee.com',
    'teegschwendner.de', 'ronnefeldt.com', 'teaworld.de', 'teehaus-bachfischer.de',
    
    // Uhren spezialisiert
    'uhrzeit.org', 'chrono24.de', 'watchmaster.de', 'uhrinstinkt.de', 'chronext.de',
    'uhren4you.de', 'zeitlounge.com', 'klepsydra.de', 'uhrencenter.de',
    
    // Brillen online
    'edel-optics.com', 'my-spexx.de', 'brillen.de', 'brille.de', 'lenstore.de',
    'misterspex.at', 'apollo-optik.de', 'smartbuyglasses.de', 'visilab.ch',
    
    // Matratzen & Betten
    'matratzen-concord.de', 'betten-abc.de', 'bettzeit.de', 'schlafwelt.de',
    'dormando.de', 'bruno.de', 'casper.de', 'emma-matratze.de', 'muun.co',
    
    // Küchengeräte
    'springlane.de', 'eujuicers.de', 'vitamix.de', 'klaibermarkt.de', 'kuechen-fee.de',
    'gastro24.de', 'hotelwaesche.de', 'gastrotiger.de', 'gastrohome.de',
    
    // Wohntextilien
    'urbanara.de', 'waschbaer.de', 'hessnatur.com', 'kivanta.de', 'carpe-sonno.de',
    'schlafgut.com', 'schlafwelt.de', 'bettwaren-shop.de', 'paradies-betten.de',
    
    // Schreibwaren
    'papier-direkt.de', 'paper-markt.de', 'gerstaecker.de', 'boesner.com',
    'jackson-art.com', 'künstlershop-manthey.de', 'kunstblick.de',
    
    // Taschen & Koffer
    'koffer.com', 'koffermarkt.com', 'kofferworld.de', 'taschenkaufhaus.de',
    'lederwaren-fellmer.de', 'eastpak.com', 'samsonite.de', 'rimowa.com',
    
    // Parfümerie
    'parfum.de', 'duftgarten.de', 'mehr-parfum.de', 'parfuemerie.de',
    'import-parfumerie.de', 'der-duft.de', 'easycosmetic.de', 'cocopanda.de'
  ];
  
  knownShops.forEach(url => shopUrls.add(url.toLowerCase()));
  console.log(`\nAdded ${knownShops.length} known specialist shops`);
}

async function main() {
  await scrapeMoreCategories();
  await scrapeIdealoShops();
  addKnownShops();
  
  const urlList = Array.from(shopUrls)
    .filter(url => url.length > 3 && url.includes('.') && !url.startsWith('-'))
    .sort();
  
  const output = {
    urls: urlList,
    count: urlList.length,
    collectedAt: new Date().toISOString(),
    sources: [
      'Trusted Shops (50+ Kategorien mit Pagination)',
      'Geizhals Händlerverzeichnis (A-Z)',
      'Check24 Partner',
      'Idealo Shops',
      'EHI Top 100',
      'Manual Expert Additions (300+ Specialist Shops)'
    ]
  };
  
  fs.writeFileSync('urls/batch-2.json', JSON.stringify(output, null, 2));
  
  console.log(`\n✅ FINAL COLLECTION`);
  console.log(`   Total: ${urlList.length} shop URLs`);
  console.log(`   Saved: urls/batch-2.json`);
}

main().catch(console.error);
