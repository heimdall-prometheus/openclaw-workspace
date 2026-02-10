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

const batch12 = [
  // Modellbau
  'd-edition.de', 'rcfox.de', 'rcmodelle24.de', 'rc-modell-shop.de', 'derkum-modellbau.com',
  'voltmaster.de', 'rc-race-shop.de', 'mhm-modellbau.de', 'monsterhopups.de', 'modellbau-berlinski.de',
  
  // Musikinstrumente
  'musikhaus-hermann.de', 'musik-produktiv.de', 'session.de', 'musik-klier.de', 'musicstore.de',
  'kirstein.de', 'pianelli.de', 'getthesound.de',
  
  // Tabak/Pfeifen
  'tabakpfeife24.de', 'pfeifen-mehlhase.de', 'pipehouse.de', 'peterheinrichs.de',
  'pfeife-tabak-zigarre.de', 'duerninger.de', 'falkum.de', 'pfeifen-huber.de', 'pfeifen-shop-online.de',
  
  // Parfum/Kosmetik
  'flaconi.de', 'zentraldrogerie.de', 'pieper.de', 'mon-pierre.de', 'parfumdreams.de',
  'gradmann1864.de', 'topparfuemerie.de', 'parfum-zentrum.de', 'parfuemerie-godel.de',
  
  // Jagd/Angeln
  'jagd.de', 'angeln-jagen-outdoor.eu', 'rhoen-jagd.de', 'outdoordino.de', 'livingactive.de',
  'jagdwelt24.de', 'alljagd.de', 'frankonia.de', 'jvs-outdoor.de'
];

batch12.forEach(addUrl);
console.log(`Added ${added} new URLs`);
console.log(`Total: ${existing.size}`);

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify({
  deduplicated_at: new Date().toISOString(),
  count: existing.size,
  urls: [...existing].sort()
}, null, 2));
