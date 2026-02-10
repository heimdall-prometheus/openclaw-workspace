#!/usr/bin/env node
/**
 * Generate SEO-optimized German product descriptions for mein-schluessel.de
 * Reads ms-short-products.tsv and outputs description-updates.json
 */

const fs = require('fs');
const path = require('path');

const tsvPath = path.join(__dirname, 'ms-short-products.tsv');
const outputPath = path.join(__dirname, 'description-updates.json');

const tsv = fs.readFileSync(tsvPath, 'utf-8').trim();
const lines = tsv.split('\n');

const products = lines.map(line => {
  const [product_id, product_name, manufacturer, properties] = line.split('\t');
  return { product_id, product_name, manufacturer: manufacturer || '', properties: properties === 'NULL' ? '' : (properties || '') };
});

function parseProperties(propStr) {
  if (!propStr) return {};
  const props = {};
  propStr.split(' | ').forEach(p => {
    const idx = p.indexOf(':');
    if (idx > -1) {
      props[p.substring(0, idx).trim()] = p.substring(idx + 1).trim();
    }
  });
  return props;
}

function stripMM(val) {
  return val.replace(/\s*mm$/i, '').trim();
}

function generateDescription(product) {
  const { product_name, manufacturer, properties } = product;
  const props = parseProperties(properties);
  const name = product_name.trim();
  const mfr = manufacturer.trim();

  // --- MEHRSCHLÜSSEL ---
  if (name.toLowerCase().includes('mehrschlüssel')) {
    const system = props['Schließsystem'] || '';
    let systemName = '';
    if (name.includes('ix Twinstar')) systemName = 'DOM ix Twinstar';
    else if (name.includes('ix Twido')) systemName = 'DOM ix Twido';
    else if (name.includes('smartkey expert plus')) systemName = 'Dormakaba smartkey expert plus';
    else if (name.includes('Wilka 1400')) systemName = 'Wilka 1400';
    else if (name.includes('RN')) systemName = 'DOM RN';
    else systemName = system || mfr;

    return `<p>Zusätzlicher Schlüssel für das Schließsystem ${systemName}. Dieser Mehrschlüssel kann ausschließlich bei Erstbestellung eines passenden Zylinders mitbestellt werden und wird werkseitig passend zum bestellten Schließsystem gefertigt.</p><p>Ideal, wenn Sie von Anfang an weitere Schlüssel für Familienmitglieder, Mitarbeiter oder als Reserve benötigen.</p>`;
  }

  // --- SILCA ROHLINGE ---
  if (name.toLowerCase().includes('silca rohling') || (mfr === 'Silca' && name.toLowerCase().includes('rohling'))) {
    const rohlingFuer = props['Rohling für ...'] || '';
    const rohlingName = name.replace(/^Silca Rohling\s*/i, '').replace(/^für\s*/i, '').trim();
    
    let targetBrands = rohlingFuer ? rohlingFuer.split(' | Rohling für ...: ').join(', ') : '';
    
    if (targetBrands) {
      return `<p>Hochwertiger Silca Schlüsselrohling ${rohlingName}, passend für ${targetBrands} Schließsysteme. Dieser Rohling dient als Grundlage für die professionelle Schlüsselanfertigung und wird aus widerstandsfähigem Material gefertigt.</p><p>Geeignet für Schlüsseldienste und Fachhändler zur Anfertigung von Nachschlüsseln für ${targetBrands} Zylinder.</p>`;
    } else {
      return `<p>Hochwertiger Silca Schlüsselrohling ${rohlingName}. Dieser universelle Rohling dient als Grundlage für die professionelle Schlüsselanfertigung und wird aus widerstandsfähigem Material gefertigt.</p><p>Geeignet für Schlüsseldienste und Fachhändler zur Anfertigung von Nachschlüsseln.</p>`;
    }
  }

  // --- ALUMINIUM-RUNDROSETTEN ---
  if (name.toLowerCase().includes('aluminium-rundrosetten')) {
    let typ = '';
    let lochung = '';
    let finish = '';
    if (name.includes('BB-Rosettenpaar')) { typ = 'BB-Rosettenpaar'; lochung = 'Buntbart (BB)'; }
    else if (name.includes('PZ-Rosettenpaar')) { typ = 'PZ-Rosettenpaar'; lochung = 'Profilzylinder (PZ)'; }
    else if (name.includes('WC-Rosettenpaar')) { typ = 'WC-Rosettenpaar'; lochung = 'Bad/WC'; }
    else if (name.includes('Blindrosettenpaar')) { typ = 'Blindrosettenpaar'; lochung = ''; }
    else if (name.includes('Drückerrosettenpaar')) { typ = 'Drückerrosettenpaar'; lochung = ''; }

    if (name.includes('F1 Natur')) finish = 'Aluminium F1 Natur eloxiert';
    else if (name.includes('F2 Neusilber')) finish = 'Aluminium F2 Neusilber eloxiert';

    let desc = `<p>Aluminium-Rundrosetten als ${typ} von ${mfr}. Gefertigt aus hochwertigem Aluminium in der Oberfläche ${finish || 'Aluminium eloxiert'}.`;
    if (lochung) desc += ` Geeignet für Türen mit ${lochung}-Lochung.`;
    desc += `</p><p>Die Rosetten überzeugen durch ihre schlichte, runde Formgebung und eignen sich ideal für den Einsatz an Innentüren im Wohn- und Objektbereich.</p>`;
    return desc;
  }

  // --- EDELSTAHL-RUNDROSETTEN ---
  if (name.toLowerCase().includes('edelstahl-rundrosetten')) {
    let typ = '';
    let lochung = '';
    if (name.includes('BB-Rosettenpaar')) { typ = 'BB-Rosettenpaar'; lochung = 'Buntbart (BB)'; }
    else if (name.includes('PZ-Rosettenpaar')) { typ = 'PZ-Rosettenpaar'; lochung = 'Profilzylinder (PZ)'; }
    else if (name.includes('WC-Rosettenpaar')) { typ = 'WC-Rosettenpaar'; lochung = 'Bad/WC'; }
    else if (name.includes('Blindrosettenpaar')) { typ = 'Blindrosettenpaar'; lochung = ''; }

    let desc = `<p>Edelstahl-Rundrosetten als ${typ} von ${mfr}. Gefertigt aus robustem Edelstahl für langlebige und korrosionsbeständige Anwendungen.`;
    if (lochung) desc += ` Passend für Türen mit ${lochung}-Lochung.`;
    desc += `</p><p>Dank des zeitlosen Edelstahl-Designs eignen sich diese Rosetten sowohl für den Einsatz im Wohnbereich als auch im Objektbau.</p>`;
    return desc;
  }

  // --- ROSETTENGARNITUR ---
  if (name.toLowerCase().includes('rosettengarnitur')) {
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    let lochung = '';
    let drueckerForm = '';
    
    if (name.includes('BAD/WC')) lochung = 'Bad/WC';
    else if (name.includes(', BB,') || name.includes(', BB ') || name.endsWith(', BB')) lochung = 'Buntbart (BB)';
    else if (name.includes(', PZ,') || name.includes(', PZ ') || name.endsWith(', PZ')) lochung = 'Profilzylinder (PZ)';

    if (name.includes('U-Form-Drücker')) drueckerForm = ' mit U-Form-Drücker';
    else if (name.includes('L-Form-Drücker')) drueckerForm = ' mit L-Form-Drücker';

    let material = '';
    if (name.includes('Edelstahl')) material = 'aus Edelstahl';
    else if (name.includes('F1')) material = 'in Aluminium F1 Natur';
    else if (name.includes('F2')) material = 'in Aluminium F2 Neusilber';

    // Extract series name
    let series = '';
    const quoteMatch = name.match(/"([^"]+)"/);
    if (quoteMatch) series = quoteMatch[1];

    let desc = `<p>Rosettengarnitur${series ? ` "${series}"` : ''} von ${mfr}${drueckerForm}${material ? ', ' + material : ''}.`;
    if (lochung) desc += ` Ausführung für ${lochung}-Lochung.`;
    if (nuss) desc += ` Nuss: ${nuss}.`;
    desc += `</p><p>Hochwertige Türdrückergarnitur mit Rosettenausführung – ideal für Innentüren im modernen Wohn- und Objektbereich. Einfache Montage durch verdeckte Verschraubung.</p>`;
    return desc;
  }

  // --- SCHUTZ-DRÜCKERGARNITUR / SCHUTZ-WECHSELGARNITUR ---
  if (name.toLowerCase().includes('schutz-drückergarnitur') || name.toLowerCase().includes('schutz-wechselgarnitur')) {
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const lsRos = props['Langschild / Rosette'] || '';
    const isWechsel = name.toLowerCase().includes('wechselgarnitur');
    const typ = isWechsel ? 'Schutz-Wechselgarnitur' : 'Schutz-Drückergarnitur';

    let series = '';
    const quoteMatch = name.match(/"([^"]+)"/);
    if (quoteMatch) series = quoteMatch[1];

    let pzEntf = '';
    if (name.includes('72 mm PZ')) pzEntf = '72 mm';
    else if (name.includes('92 mm PZ')) pzEntf = '92 mm';

    let material = '';
    if (name.includes('Edelstahl')) material = 'aus Edelstahl';
    else if (name.includes('F1')) material = 'in Aluminium F1 Natur';
    else if (name.includes('F2')) material = 'in Aluminium F2 Neusilber';

    let desc = `<p>${typ}${series ? ` "${series}"` : ''} von ${mfr}${material ? ', ' + material : ''}.`;
    if (pzEntf) desc += ` Für Profilzylinder mit ${pzEntf} Entfernung.`;
    if (nuss) desc += ` Nuss: ${nuss}.`;
    desc += `</p><p>Sicherheitsbeschlag mit Schutzlangschild und Zylinderabdeckung – bietet zuverlässigen Schutz gegen Aufbohr- und Abreißversuche. ${isWechsel ? 'Außenseite mit Knauf, Innenseite mit Drücker.' : 'Beidseitig mit Drücker.'} Ideal für Haus- und Wohnungseingangstüren.</p>`;
    return desc;
  }

  // --- ZIMMERTÜRGARNITUR ---
  if (name.toLowerCase().includes('zimmertürgarnitur')) {
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    
    let lochung = '';
    if (name.includes('BAD/WC') || name.includes('78 mm BAD/WC')) lochung = 'Bad/WC';
    else if (name.includes(' BB,') || name.includes(' BB ') || name.includes('72 mm BB')) lochung = 'Buntbart (BB)';
    else if (name.includes(' PZ,') || name.includes(' PZ ') || name.includes('72 mm PZ')) lochung = 'Profilzylinder (PZ)';

    let series = '';
    const quoteMatch = name.match(/"([^"]+)"/);
    if (quoteMatch) series = quoteMatch[1];

    let material = '';
    if (name.includes('F1')) material = 'Aluminium F1 Natur';
    else if (name.includes('F2')) material = 'Aluminium F2 Neusilber';

    let desc = `<p>Zimmertürgarnitur${series ? ` "${series}"` : ''} von ${mfr} mit Langschild${material ? ' in ' + material : ''}.`;
    if (lochung) desc += ` Ausführung für ${lochung}-Lochung.`;
    if (nuss) desc += ` Nuss: ${nuss}.`;
    desc += `</p><p>Hochwertige Drückergarnitur für Innentüren – zeitloses Design, komfortable Bedienung und einfache Montage. Geeignet für den Wohn- und Objektbereich.</p>`;
    return desc;
  }

  // --- SCHMALRAHMEN-GARNITUREN ---
  if (name.toLowerCase().includes('schmalrahmen-drückergarnitur') || name.toLowerCase().includes('schmalrahmen-wechselgarnitur')) {
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const isWechsel = name.toLowerCase().includes('wechselgarnitur');

    let series = '';
    const quoteMatch = name.match(/"([^"]+)"/);
    if (quoteMatch) series = quoteMatch[1];

    let material = '';
    if (name.includes('F1')) material = 'in Aluminium F1 Natur';
    else if (name.includes('F2')) material = 'in Aluminium F2 Neusilber';
    else if (name.includes('Edelstahl')) material = 'aus Edelstahl';

    const typ = isWechsel ? 'Schmalrahmen-Wechselgarnitur' : 'Schmalrahmen-Drückergarnitur';
    let desc = `<p>${typ}${series ? ` "${series}"` : ''} von ${mfr}${material ? ', ' + material : ''}. Speziell für Profilrahmentüren (Rohrrahmen) konzipiert.`;
    if (entf) desc += ` Entfernung: ${entf}.`;
    if (nuss) desc += ` Nuss: ${nuss}.`;
    desc += `</p><p>Schlanke Profiltürgarnitur für schmale Rahmenprofile – ideal für Aluminium-, Stahl- und Kunststoff-Profilrahmentüren im gewerblichen und privaten Bereich.</p>`;
    return desc;
  }

  // --- EDI SCHUTZGARNITUR ---
  if (name.toLowerCase().includes('edi schutzgarnitur')) {
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    
    let series = '';
    const quoteMatch = name.match(/"([^"]+)"/);
    if (quoteMatch) series = quoteMatch[1];

    return `<p>EDI Schutzgarnitur${series ? ` "${series}"` : ''} aus Edelstahl.${entf ? ` Entfernung: ${entf}.` : ''}${nuss ? ` Nuss: ${nuss}.` : ''} Für Türstärken 35–45 mm geeignet.</p><p>Sicherheitsbeschlag mit integriertem Ziehschutz – bietet effektiven Schutz gegen gewaltsame Zylinderdemontage. Ideal für Haus- und Wohnungseingangstüren.</p>`;
  }

  // --- EDI FENSTERGRIFF ---
  if (name.toLowerCase().includes('edi fenstergriff') || name.toLowerCase().includes('fenstergriff')) {
    let series = '';
    const quoteMatch = name.match(/"([^"]+)"/);
    if (quoteMatch) series = quoteMatch[1];

    let material = '';
    if (name.includes('Aluminium') || name.includes('Alu')) material = 'aus Aluminium';
    
    let finish = '';
    if (name.includes('F9016') || name.includes('verkehrsweiß')) finish = 'in Verkehrsweiß (ähnlich RAL 9016)';
    else if (name.includes('F12')) finish = 'in F12/Verkehrsweiß';

    return `<p>EDI Fenstergriff${series ? ` "${series}"` : ''} ${material}${finish ? ' ' + finish : ''}. Stiftlänge 35 mm (Standard). Hochwertiger Fenstergriff für Dreh- und Dreh-Kipp-Fenster.</p><p>Ergonomische Formgebung für komfortables Öffnen und Schließen. Einfache Montage auf handelsüblichen Fensterprofilen. Geeignet für den Wohn- und Objektbereich.</p>`;
  }

  // --- BKS PANIK SCHLÖSSER ---
  if (name.toLowerCase().includes('panik') && (name.includes('BKS') || mfr === 'BKS')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const anschlag = props['Anschlagrichtung'] || '';
    const panikFkt = props['Panikfunktion'] || '';

    let schlossTyp = 'Panik-Rohrrahmenschloss';
    const numMatch = name.match(/\b(1826|1916|1316)\b/);
    const schlossNr = numMatch ? numMatch[1] : '';

    let features = [];
    if (panikFkt) features.push(`Panikfunktion: ${panikFkt}`);
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>BKS ${schlossTyp}${schlossNr ? ' ' + schlossNr : ''} – Panikschloss für Flucht- und Rettungswege in Rohrrahmentüren.${panikFkt ? ` Ausgestattet mit ${panikFkt} für sichere Notöffnung.` : ''}</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Geeignet für den Einsatz in Flucht- und Rettungswegen gemäß DIN EN 179/1125.</p>';
    return desc;
  }

  // --- BMH PANIK-EINSTECKSCHLOSS ---
  if (name.toLowerCase().includes('panik') && (name.includes('BMH') || mfr === 'BMH')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const anschlag = props['Anschlagrichtung'] || '';
    const panikFkt = props['Panikfunktion'] || '';

    let features = [];
    if (panikFkt) features.push(`Panikfunktion: ${panikFkt}`);
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB) features.push(`Stulpbreite: ${stulpB}${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>BMH Panik-Einsteckschloss für Flucht- und Rettungswege.${panikFkt ? ` Ausgestattet mit ${panikFkt} für die sichere Notöffnung.` : ''} Geeignet für den Einbau in Innentüren und Fluchtwegtüren.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Für den Einsatz in Flucht- und Rettungswegen gemäß DIN EN 179/1125 konzipiert.</p>';
    return desc;
  }

  // --- HAUSTÜR-EINSTECKSCHLOSS ---
  if (name.toLowerCase().includes('haustür-einsteckschloss')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const lochung = props['Lochung'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (lochung) features.push(`Lochung: ${lochung}`);
    if (anschlag) features.push(`Anschlag: ${anschlag}`);

    let desc = `<p>BMH Haustür-Einsteckschloss Nr. 34 – robustes Einsteckschloss speziell für Haustüren.${lochung ? ` Mit ${lochung}-Lochung.` : ''} Zuverlässige Verriegelung für maximale Sicherheit an Hauseingangstüren.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    return desc;
  }

  // --- ZIMMERTÜR-EINSTECKSCHLOSS ---
  if (name.toLowerCase().includes('zimmertür-einsteckschloss')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const lochung = props['Lochung'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let lochungText = '';
    if (lochung.includes('PZ') || lochung.includes('Profilzylinder')) lochungText = 'Profilzylinder (PZ)';
    else if (lochung.includes('BB') || lochung.includes('Buntbart')) lochungText = 'Buntbart (BB)';
    else if (lochung.includes('BAD') || lochung.includes('WC')) lochungText = 'Bad/WC';
    else if (name.includes('BAD/WC')) lochungText = 'Bad/WC';
    else if (name.includes('BB gelocht')) lochungText = 'Buntbart (BB)';
    else if (name.includes('PZ gelocht')) lochungText = 'Profilzylinder (PZ)';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlag: ${anschlag}`);

    let nr = '';
    if (name.includes('Nr. 1')) nr = 'Nr. 1';
    else if (name.includes('Nr. 2')) nr = 'Nr. 2';

    let desc = `<p>BMH Zimmertür-Einsteckschloss${nr ? ' ' + nr : ''} – zuverlässiges Einsteckschloss für Innentüren.${lochungText ? ` Ausführung mit ${lochungText}-Lochung.` : ''}</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Solide Verarbeitung für den täglichen Einsatz an Zimmertüren im Wohn- und Objektbereich.</p>';
    return desc;
  }

  // --- OBJEKT-EINSTECKSCHLOSS BMH ---
  if (name.toLowerCase().includes('objekt-einsteckschloss') && (mfr === 'BMH' || name.includes('BMH'))) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const lochung = props['Lochung'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (lochung) features.push(`Lochung: ${lochung}`);
    if (anschlag) features.push(`Anschlag: ${anschlag}`);

    let artNr = '';
    const artMatch = name.match(/0\d{3}\.\d{6}/);
    if (artMatch) artNr = artMatch[0];

    let desc = `<p>BMH Objekt-Einsteckschloss${artNr ? ' (Art. ' + artNr + ')' : ''} – professionelles Einsteckschloss für den Objektbau.${lochung ? ` Mit ${lochung}-Lochung.` : ''}</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Robustes Schloss für Innentüren in Bürogebäuden, Hotels, Krankenhäusern und öffentlichen Einrichtungen.</p>';
    return desc;
  }

  // --- GLASTÜR-EINSTECKSCHLOSS ---
  if (name.toLowerCase().includes('glastür-einsteckschloss')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const lochung = props['Lochung'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlag: ${anschlag}`);

    let artNr = '';
    const artMatch = name.match(/Nr\.\s*(\d+)/);
    if (artMatch) artNr = artMatch[1];

    let desc = `<p>BKS Glastür-Einsteckschloss${artNr ? ' (Art. ' + artNr + ')' : ''} – speziell für Glastüren konzipiertes Einsteckschloss mit Profilzylinder-Lochung. Filigrane Bauweise für rahmenlose und gerahmte Glastüren.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Hochwertige BKS-Qualität für den Einsatz in Büro- und Geschäftsräumen.</p>';
    return desc;
  }

  // --- ROHRRAHMEN-EINSTECKSCHLOSS (Bever) ---
  if (name.toLowerCase().includes('rohrrahmen-einsteckschloss') && (mfr === 'Bever' || name.includes('Bever'))) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>Bever Rohrrahmen-Einsteckschloss Nr. 1004 – robustes Einsteckschloss für Aluminium- und Stahlrohrrahmentüren. Mit Profilzylinder-Lochung und links/rechts verwendbar.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Bewährte Bever-Qualität für den Einsatz in Profilrahmentüren im gewerblichen und privaten Bereich.</p>';
    return desc;
  }

  // --- ROHRRAHMEN-EINSTECKSCHLOSS (BKS) ---
  if (name.toLowerCase().includes('rohrrahmen-einsteckschloss') && (mfr === 'BKS' || name.includes('BKS'))) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>BKS Rohrrahmen-Einsteckschloss Nr. 1314 – hochwertiges Einsteckschloss für Profilrahmentüren aus Aluminium und Stahl. Mit Profilzylinder-Lochung.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Zuverlässige BKS-Qualität für den professionellen Einsatz in Rohrrahmentüren.</p>';
    return desc;
  }

  // --- BKS ROHRRAHMEN-RIEGELSCHLOSS ---
  if (name.toLowerCase().includes('rohrrahmen-riegelschloss') && (mfr === 'BKS' || name.includes('BKS'))) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>BKS Rohrrahmen-Riegelschloss 1308 – Zusatzschloss mit Riegelfunktion für Rohrrahmentüren. Bietet zusätzliche Verriegelung und Sicherheit an Profilrahmentüren.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Ideal als Ergänzung zum Hauptschloss für erhöhte Sicherheit an Aluminium- und Stahlrahmentüren.</p>';
    return desc;
  }

  // --- EINSTECK-RIEGELSCHLOSS (Bever) ---
  if (name.toLowerCase().includes('einsteck-riegelschloss')) {
    const dorn = props['Dornmaß'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const lochung = props['Lochung'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (lochung) features.push(`Lochung: ${lochung}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>Bever Einsteck-Riegelschloss 286 – kompaktes Riegelschloss mit Profilzylinder-Lochung. Bietet eine zusätzliche Verriegelungsmöglichkeit für Türen und Tore.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Links und rechts verwendbar. Ideal als Zusatzverriegelung oder für Nebeneingangstüren.</p>';
    return desc;
  }

  // --- ROHRRAHMEN-RIEGELSCHLOSS (Bever) ---
  if (name.toLowerCase().includes('rohrrahmen-riegelschloss') && (mfr === 'Bever' || name.includes('Bever'))) {
    const dorn = props['Dornmaß'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>Bever Rohrrahmen-Riegelschloss 1011R mit Reparaturstulp – Riegelschloss für Rohrrahmentüren mit Profilzylinder-Lochung. Der verlängerte Reparaturstulp ermöglicht den Austausch bei bestehenden Ausbrüchen.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Links und rechts verwendbar. Ideal für Renovierung und Austausch an Profilrahmentüren.</p>';
    return desc;
  }

  // --- REPARATUR-ROHRRAHMENSCHLOSS ---
  if (name.toLowerCase().includes('reparatur-rohrrahmenschloss')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>Bever Reparatur-Rohrrahmenschloss Nr. 1022R – Einsteckschloss mit verlängertem Reparaturstulp (340 mm) speziell für den Austausch defekter Schlösser in Rohrrahmentüren. Der breite Stulp überdeckt vorhandene Ausbrüche.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Links und rechts verwendbar. Die ideale Lösung für Renovierung und Reparatur.</p>';
    return desc;
  }

  // --- ROHRRAHMENSCHLOSS (Bever, generic) ---
  if (name.toLowerCase().includes('rohrrahmenschloss') && !name.toLowerCase().includes('reparatur') && !name.toLowerCase().includes('riegelschloss') && (mfr === 'Bever' || name.includes('Bever'))) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>Bever Rohrrahmenschloss für Profilrahmentüren – robustes Einsteckschloss mit Profilzylinder-Lochung. Links und rechts umlegbar für flexible Montage.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Bewährte Qualität für Aluminium-, Stahl- und Kunststoff-Rohrrahmentüren.</p>';
    return desc;
  }

  // --- ROHRRAHMENSCHLOSS (KFV) ---
  if (name.toLowerCase().includes('rohrrahmenschloss') && (mfr === 'KFV' || name.includes('KFV'))) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpForm = props['Stulpform'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm${stulpForm ? ' (' + stulpForm + ')' : ''}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let desc = `<p>KFV Rohrrahmenschloss Nr. 49N PZW – hochwertiges Einsteckschloss mit Profilzylinder-Lochung und Wechselfunktion für Rohrrahmentüren. Links und rechts verwendbar.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Zuverlässige KFV-Qualität für Aluminium-, Stahl- und Kunststoff-Profilrahmentüren im Objekt- und Privatbereich.</p>';
    return desc;
  }

  // --- BEVER ROHRRAHMEN-REPARATUR-EINSTECKSCHLOSS ---
  if (name.toLowerCase().includes('rohrrahmen-reparatur-einsteckschloss')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '92 mm';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    return `<p>Bever Rohrrahmen-Reparatur-Einsteckschloss – speziell für den Austausch defekter Schlösser mit verlängertem Stulp, der bestehende Ausbrüche überdeckt. Mit PZ-Lochung und links/rechts verwendbar.</p><ul>${features.map(f => `<li>${f}</li>`).join('')}</ul><p>Ideal für schnelle Reparaturen an Aluminium- und Stahl-Rohrrahmentüren.</p>`;
  }

  // --- GEZE PRODUCTS ---
  if (mfr === 'GEZE' || name.includes('GEZE')) {
    if (name.toLowerCase().includes('obentürschließer')) {
      let model = '';
      if (name.includes('TS 5000 L')) model = 'TS 5000 L';
      else if (name.includes('TS 5000')) model = 'TS 5000';
      else if (name.includes('TS 1500')) model = 'TS 1500';
      else if (name.includes('TS 3000')) model = 'TS 3000';
      else if (name.includes('TS 4000')) model = 'TS 4000';

      let color = '';
      if (name.includes('silberfarbig EV1')) color = 'in Silber (EV1)';
      else if (name.includes('weiß')) color = 'in Weiß';

      let mitGleit = name.includes('mit Gleitschiene');
      let mitGestänge = name.includes('mit Gestänge');
      let ohneGleit = name.includes('ohne Gleitschiene');

      let accessory = '';
      if (mitGleit) accessory = 'inklusive Gleitschiene';
      else if (mitGestänge) accessory = 'inklusive Gestänge';
      else if (ohneGleit) accessory = 'ohne Gleitschiene (separat erhältlich)';

      return `<p>GEZE Obentürschließer ${model} ${color} – zuverlässiger Türschließer für den Einsatz an Innen- und Außentüren. ${accessory ? accessory.charAt(0).toUpperCase() + accessory.slice(1) + '.' : ''}</p><p>Kontrolliertes, sanftes Schließen der Tür mit einstellbarer Schließkraft und Schließgeschwindigkeit. Geeignet für den Einsatz im Wohn- und Objektbereich.</p>`;
    }
    if (name.toLowerCase().includes('gleitschiene')) {
      return `<p>${name} – Gleitschiene als Zubehör für GEZE Obentürschließer. Ermöglicht eine platzsparende, unauffällige Montage des Türschließers.</p><p>Hochwertige Verarbeitung für dauerhaft zuverlässige Funktion. Passend für die entsprechenden GEZE Türschließer-Modelle.</p>`;
    }
    if (name.toLowerCase().includes('montageplatte')) {
      let fuer = '';
      if (name.includes('Gleitschiene')) fuer = 'für Gleitschienen';
      else if (name.includes('TS 3000')) fuer = 'für den Grundkörper des TS 3000';
      else if (name.includes('TS 4000') || name.includes('TS 5000')) fuer = 'für den Grundkörper von TS 4000/5000/5000 L';
      
      return `<p>${name} – Montageplatte ${fuer} von GEZE. Ermöglicht die fachgerechte Montage auf verschiedenen Untergründen und Türprofilen.</p><p>Robuste Ausführung für langlebigen Einsatz. Erleichtert die Installation bei ungünstigen Montagebedingungen.</p>`;
    }
    if (name.toLowerCase().includes('gleitstein')) {
      return `<p>GEZE Gleitstein für Normalgleitschiene – Ersatzteil bzw. Zubehör für GEZE Gleitschienen. Der Gleitstein sorgt für die reibungslose Führung des Türschließerarms in der Gleitschiene.</p><p>Einfacher Austausch bei Verschleiß. Passend für GEZE Normalgleitschienen.</p>`;
    }
    if (name.toLowerCase().includes('feststelleinheit')) {
      return `<p>GEZE mechanische Feststelleinheit – Zubehör für GEZE Obentürschließer TS 3000, TS 5000 und TS 5000 L. Ermöglicht das Feststellen der Tür in geöffneter Position.</p><p>Praktisch für Räume mit hoher Durchgangsfrequenz. Die Feststellfunktion wird bei Auslösung der Brandmeldeanlage automatisch aufgehoben.</p>`;
    }
    if (name.toLowerCase().includes('standardgestänge')) {
      return `<p>GEZE Standardgestänge silberfarbig EV1 – Gestänge als Zubehör für GEZE Obentürschließer TS 2000 und TS 4000. Alternative zur Gleitschienenmontage.</p><p>Robuste Ausführung in Silber (EV1) für den Einsatz an Innen- und Außentüren.</p>`;
    }
  }

  // --- ASSA ABLOY PRODUCTS ---
  if (mfr === 'ASSA ABLOY' || mfr === 'IKON' || name.includes('Assa Abloy')) {
    if (name.toLowerCase().includes('gleitschiene')) {
      let color = '';
      if (name.includes('EV1')) color = 'in Silber (EV1)';
      else if (name.includes('weiß') || name.includes('RAL 9016')) color = 'in Weiß (ähnlich RAL 9016)';
      
      return `<p>${name} – Gleitschiene für ASSA ABLOY Obentürschließer ${color}. Ermöglicht eine platzsparende und optisch unauffällige Montage des Türschließers.</p><p>Hochwertige Verarbeitung für dauerhaft zuverlässigen Betrieb. Passend für die entsprechenden ASSA ABLOY Türschließer-Modelle.</p>`;
    }
    if (name.toLowerCase().includes('montageplatte')) {
      return `<p>${name} – Montageplatte für ASSA ABLOY Obentürschließer. Ermöglicht die fachgerechte Montage auf verschiedenen Untergründen und bei ungünstigen Einbausituationen.</p><p>Robuste Ausführung für einen langlebigen und sicheren Einsatz.</p>`;
    }
    if (name.toLowerCase().includes('standardgestänge')) {
      let color = '';
      if (name.includes('EV1')) color = 'in Silber (EV1)';
      return `<p>${name} – Standard-Türschließergestänge ${color} für ASSA ABLOY/IKON Obentürschließer. Alternative zur Gleitschienenmontage.</p><p>Robuste Verarbeitung für den Einsatz an Innen- und Außentüren im Wohn- und Objektbereich.</p>`;
    }
    if (name.toLowerCase().includes('standardgleitschiene')) {
      let color = '';
      if (name.includes('weiß') || name.includes('RAL 9016')) color = 'in Weiß (ähnlich RAL 9016)';
      else color = 'in Standardausführung';
      return `<p>${name} – Standardgleitschiene ${color} für ASSA ABLOY Obentürschließer. Platzsparende Montage mit sauberem, unauffälligem Erscheinungsbild.</p><p>Zuverlässige Führung des Türschließerarms für kontrolliertes Schließen der Tür.</p>`;
    }
  }

  // --- EFFEFF ELEKTRO-TÜRÖFFNER ---
  if (name.toLowerCase().includes('elektro-türöffner') || (mfr === 'effeff ASSA ABLOY' && name.toLowerCase().includes('türöffner'))) {
    let model = '';
    if (name.includes('Modellreihe 17')) model = 'Modellreihe 17';
    else if (name.includes('Modellreihe 19')) model = 'Modellreihe 19';

    let features = [];
    if (name.includes('6–12 V')) features.push('Betriebsspannung: 6–12 V AC/DC');
    if (name.includes('DIN rechts')) features.push('Anschlagrichtung: DIN rechts');
    if (name.includes('DIN links')) features.push('Anschlagrichtung: DIN links');
    if (name.includes('mechanische Entriegelung')) features.push('Mit mechanischer Entriegelung');

    let desc = `<p>effeff Elektro-Türöffner ${model} – zuverlässiger elektrischer Türöffner für den Einsatz in Zutrittskontrollsystemen und Gegensprechanlagen.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Bewährte effeff-Qualität von ASSA ABLOY für sichere und komfortable Türfreigabe in Wohn- und Gewerbeobjekten.</p>';
    return desc;
  }

  // --- FLACHSCHLIESSBLECH ---
  if (name.toLowerCase().includes('flachschließblech')) {
    return `<p>Flachschließblech für elektrische Türöffner von effeff/ASSA ABLOY. Ermöglicht die fachgerechte Montage von Elektro-Türöffnern in Standardzargen.</p><p>Passendes Zubehör für die Integration elektrischer Türöffner in Gegensprechanlagen und Zutrittskontrollsysteme.</p>`;
  }

  // --- SCHLOSSKASTEN / SCHLOSS FÜR SCHLOSSKASTEN (Bever) ---
  if (name.toLowerCase().includes('schlosskasten') || (name.toLowerCase().includes('schloss') && name.toLowerCase().includes('schlosskasten'))) {
    const dorn = props['Dornmaß'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const anschlag = props['Anschlagrichtung'] || '';
    const lochung = props['Lochung'] || '';

    let rohrDurchmesser = '';
    const rohrMatch = name.match(/für (\d+)\s*mm Rohr/);
    if (rohrMatch) rohrDurchmesser = rohrMatch[1];

    let isLose = name.toLowerCase().includes('schloss (lose)');
    let isKomplett = name.toLowerCase().includes('komplett') || name.toLowerCase().includes('kompl');

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm`);
    if (rohrDurchmesser) features.push(`Für Rohr: Ø ${rohrDurchmesser} mm`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    let typ = '';
    if (isLose) {
      typ = 'Einzelschloss (ohne Gehäuse)';
    } else if (isKomplett) {
      typ = 'Kompletter Schlosskasten mit Schloss und Gehäuse';
    } else if (name.toLowerCase().includes('schloss und gehäuse')) {
      typ = 'Schloss und Gehäuse';
    } else {
      typ = 'Schlosskasten';
    }

    let desc = `<p>Bever ${typ}${rohrDurchmesser ? ` für ${rohrDurchmesser} mm Rohr` : ''} – ${isLose ? 'Ersatzschloss für bestehende Schlosskästen' : 'Aufschraubschloss für Gartentore, Zäune und Tore'} mit Profilzylinder-Lochung.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += `<p>Robuste Ausführung für den Außenbereich. ${isLose ? 'Passend für Bever Schlosskastengehäuse.' : 'Einfache Montage auf Rund- oder Vierkantrohr.'}</p>`;
    return desc;
  }

  // --- SCHIEBETÜRSCHLOSS ---
  if (name.toLowerCase().includes('schiebetürschloss')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const stulpL = props['Stulplänge'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm`);

    let desc = `<p>Bever Schiebetürschloss mit Hakenfalle – speziell für Schiebetüren konzipiertes Einsteckschloss. Die Hakenfalle sorgt für sicheren Halt und verhindert unbeabsichtigtes Öffnen.</p>`;
    if (features.length > 0) {
      desc += '<ul>' + features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    desc += '<p>Geeignet für Holz- und Kunststoff-Schiebetüren im Innenbereich.</p>';
    return desc;
  }

  // --- EINSTECK-SCHIEBETÜRSCHLOSS ---
  if (name.toLowerCase().includes('einsteck-schiebetürschloss')) {
    const dorn = props['Dornmaß'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';
    const lochung = props['Lochung'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm`);
    if (lochung) features.push(`Lochung: ${lochung}`);

    return `<p>Bever Einsteck-Schiebetürschloss 138P55 für Holztüren – Schiebetürschloss mit Hakenfalle und Profilzylinder-Lochung. Speziell für den Einbau in Holz-Schiebetüren konzipiert.</p><ul>${features.map(f => `<li>${f}</li>`).join('')}</ul><p>Sichere Verriegelung durch Hakenfalle. Kompakte Bauweise für einfachen Einbau.</p>`;
  }

  // --- EINSTECKSCHLOSS MIT HAKENFALLE ---
  if (name.toLowerCase().includes('einsteckschloss mit hakenfalle')) {
    const dorn = props['Dornmaß'] || '';
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const stulpL = props['Stulplänge'] || '';
    const stulpB = props['Stulpbreite'] || '';

    let features = [];
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (entf) features.push(`Entfernung: ${entf}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (stulpB && stulpL) features.push(`Stulp: ${stripMM(stulpB)}x${stripMM(stulpL)} mm`);

    return `<p>BMH Einsteckschloss mit Hakenfalle – Einsteckschloss mit besonders sicherer Hakenfalle für Schiebetüren und spezielle Türkonstruktionen.</p><ul>${features.map(f => `<li>${f}</li>`).join('')}</ul><p>Die Hakenfalle bietet erhöhten Schutz gegen Aushebeln. Geeignet für den Objektbau.</p>`;
  }

  // --- AUFSCHRAUBSCHLOSS ---
  if (name.toLowerCase().includes('aufschraubschloss')) {
    const lochung = props['Lochung'] || '';
    const dorn = props['Dornmaß'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let features = [];
    if (lochung) features.push(`Lochung: ${lochung}`);
    if (dorn) features.push(`Dornmaß: ${dorn}`);
    if (nuss) features.push(`Nuss: ${nuss}`);
    if (anschlag) features.push(`Anschlagrichtung: ${anschlag}`);

    return `<p>Aufschraubschloss von ${mfr} mit Profilzylinder-Lochung – robustes Schloss zur Aufschraubmontage auf der Türinnenseite. Ideal für Nebeneingangstüren, Kellertüren und nachträgliche Sicherung.</p><ul>${features.map(f => `<li>${f}</li>`).join('')}</ul><p>Einfache Montage ohne Fräsen. Links und rechts verwendbar.</p>`;
  }

  // --- UNIVERSAL-KASTENSCHLOSS ---
  if (name.toLowerCase().includes('universal-kastenschloss')) {
    const lochung = props['Lochung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    const entf = props['Entfernung'] || '';
    const anschlag = props['Anschlagrichtung'] || '';

    let lochungText = '';
    if (lochung.includes('BB')) lochungText = 'Buntbart (BB)';
    else if (lochung.includes('PZ')) lochungText = 'Profilzylinder (PZ)';

    return `<p>Bever Universal-Kastenschloss mit hebender Falle – vielseitiges Aufschraubschloss${lochungText ? ` mit ${lochungText}-Lochung` : ''}. Links und rechts sowie einwärts und auswärts verwendbar.</p><ul>${nuss ? `<li>Nuss: ${nuss}</li>` : ''}${entf ? `<li>Entfernung: ${entf}</li>` : ''}${anschlag ? `<li>Anschlagrichtung: ${anschlag}</li>` : ''}</ul><p>Die hebende Falle erleichtert das Zuziehen der Tür. Ideal für Keller-, Nebeneingangstüren und Gartenhäuser.</p>`;
  }

  // --- BRIEFKASTENSCHLOSS ---
  if (name.toLowerCase().includes('briefkastenschloss')) {
    let inkl = name.includes('inkl. 2 Schlüssel') ? 'Inklusive 2 Schlüssel. ' : '';
    let fuer = '';
    if (name.toLowerCase().includes('für renz') || name.toLowerCase().includes('renz')) fuer = 'Passend für Renz Briefkastenanlagen. ';
    else if (name.toLowerCase().includes('für ju') || name.toLowerCase().includes(' ju')) fuer = 'Passend für JU Briefkastenanlagen. ';
    else if (name.toLowerCase().includes('metallkästen')) fuer = 'Speziell für Metallbriefkästen. ';

    let kroepfung = '';
    if (name.includes('hohe Kröpfung')) kroepfung = 'Ausführung mit hoher Kröpfung. ';

    return `<p>Briefkastenschloss von ${mfr} – hochwertiges Zylinderschloss für Briefkästen. ${fuer}${kroepfung}${inkl}</p><p>Einfacher Austausch des alten Briefkastenschlosses. Sicherer Verschluss für Ihren Briefkasten.</p>`;
  }

  // --- DOM ZYLINDER ---
  if ((mfr === 'DOM' || name.includes('DOM')) && (name.toLowerCase().includes('zylinder') || name.toLowerCase().includes('doppelzylinder') || name.toLowerCase().includes('hebelzylinder'))) {
    if (name.includes('ix7 Teco Doppelzylinder') || name.includes('ix7 Teco')) {
      return `<p>DOM ix7 Teco Doppelzylinder – Profilzylinder aus dem DOM ix7 Schließsystem. Hochwertiger Schließzylinder mit Wendeschlüssel-Technologie für komfortable Bedienung.</p><p>Der ix7 Teco bietet zuverlässigen Schutz und ist in verschiedenen Schließanlagen-Konfigurationen einsetzbar. Ideal für den Wohn- und Objektbereich.</p>`;
    }
    if (name.includes('TwinStar Hebelzylinder')) {
      return `<p>DOM TwinStar Hebelzylinder – hochwertiger Hebelzylinder aus dem DOM TwinStar Schließsystem. Speziell für den Einsatz in Briefkästen, Schaltkästen und Möbelschlössern konzipiert.</p><p>Hochsicherheits-Schließsystem mit Aufbohr- und Nachschließschutz. Integrierbar in DOM TwinStar Schließanlagen.</p>`;
    }
    if (name.includes('Außenzylinder für Kastenzusatzschloss')) {
      return `<p>DOM Außenzylinder für Kastenzusatzschloss – Profilhalbzylinder speziell für den Einsatz in Kastenzusatzschlössern. Ermöglicht die Integration des Zusatzschlosses in Ihre DOM Schließanlage.</p><p>Passend für handelsübliche Kastenzusatzschlösser. Hochwertige DOM-Qualität für langlebige Sicherheit.</p>`;
    }
  }

  // --- DREIKANT DORNSCHLÜSSEL ---
  if (name.toLowerCase().includes('dreikant dornschlüssel') || name.toLowerCase().includes('dreikant-dornschlüssel')) {
    const sizeMatch = name.match(/(\d+(?:,\d+)?)\s*mm/);
    const size = sizeMatch ? sizeMatch[1] : '';
    return `<p>Dreikant-Dornschlüssel ${size ? size + ' mm' : ''} – Spezialschlüssel mit Dreikantprofil für Absperrschieber, Hydranten, Schaltschränke und Versorgungseinrichtungen.</p><p>Robuste Ausführung aus gehärtetem Stahl. Unverzichtbares Werkzeug für Handwerker, Hausmeister und Versorgungsunternehmen.</p>`;
  }

  // --- VIERKANT DORNSCHLÜSSEL ---
  if (name.toLowerCase().includes('vierkant dornschlüssel') || name.toLowerCase().includes('vierkant-dornschlüssel')) {
    const sizeMatch = name.match(/(\d+(?:,\d+)?)\s*mm/);
    const size = sizeMatch ? sizeMatch[1] : '';
    return `<p>Vierkant-Dornschlüssel ${size ? size + ' mm' : ''} – Spezialschlüssel mit Vierkantprofil für Absperrschieber, Schaltschränke und technische Einrichtungen.</p><p>Robuste Ausführung aus gehärtetem Stahl. Unverzichtbares Werkzeug für Handwerker, Hausmeister und technisches Personal.</p>`;
  }

  // --- KURZSCHILDGARNITUR ---
  if (name.toLowerCase().includes('kurzschildgarnitur')) {
    const entf = props['Entfernung'] || '';
    const nuss = props['Vierkant / Nuss'] || '';
    let typ = '';
    if (name.includes('Drückergarnitur')) typ = 'Drückergarnitur (Drücker/Drücker)';
    else if (name.includes('Wechselgarnitur')) typ = 'Wechselgarnitur (Knauf/Drücker)';
    
    let form = '';
    if (name.includes('kantig')) form = 'in kantiger Form';
    else if (name.includes('oval')) form = 'in ovaler Form';

    return `<p>Kurzschildgarnitur in Kunststoff schwarz als ${typ} ${form}. Kompakte Alternative zum Langschild für Innentüren.${entf ? ` Entfernung: ${entf}.` : ''}${nuss ? ` Nuss: ${nuss}.` : ''}</p><p>Robuster Kunststoff in elegantem Schwarz – zeitlos und pflegeleicht. Einfache Montage durch verdeckte Verschraubung. Ideal für den Wohn- und Objektbereich.</p>`;
  }

  // --- TÜRPUFFER FSB ---
  if (name.toLowerCase().includes('türpuffer') && (mfr === 'FSB' || name.includes('FSB'))) {
    let material = '';
    if (name.includes('Aluminium F1')) material = 'aus Aluminium F1 Natur';
    else if (name.includes('Edelstahl matt')) material = 'aus matt gebürstetem Edelstahl';
    
    let model = '';
    if (name.includes('3884')) model = '3884';
    else if (name.includes('3881')) model = '3881';

    return `<p>FSB Türpuffer ${model} ${material} – hochwertiger Türstopper zum Schutz von Wänden und Möbeln vor Türanschlägen. Elegantes Design passend zu FSB Türbeschlägen.</p><p>Montage als Wand- oder Bodenpuffer möglich. Schützt Oberflächen zuverlässig und fügt sich dezent in die Raumgestaltung ein.</p>`;
  }

  // --- BODENPLATTE FÜR TÜRPUFFER ---
  if (name.toLowerCase().includes('bodenplatte für türpuffer')) {
    return `<p>Bodenplatte für FSB Türpuffer 3884 in Schwarz – Montageplatte für die Bodenmontage des FSB Türpuffers. Ermöglicht eine stabile und dauerhafte Befestigung am Boden.</p><p>Passend für den FSB Türpuffer 3884. Saubere und professionelle Montage.</p>`;
  }

  // --- TÜRFESTSTELLER MIT TRETBOLZEN ---
  if (name.toLowerCase().includes('türfeststeller mit tretbolzen')) {
    let hub = '';
    const hubMatch = name.match(/Hub (\d+) mm/);
    if (hubMatch) hub = hubMatch[1];
    
    let color = '';
    if (name.includes('silberfarbig')) color = 'silberfarbig';
    else if (name.includes('weiß')) color = 'weiß';

    return `<p>Türfeststeller mit Tretbolzen${hub ? `, Hub ${hub} mm` : ''}${color ? `, ${color}` : ''} – praktischer Bodentürfeststeller zum Arretieren von Türen in geöffneter Position. Bedienung per Fußtritt.</p><p>Einfache Bedienung: Tritt nach unten arretiert, erneuter Tritt löst. Ideal für Räume mit hoher Durchgangsfrequenz. Robuste Ausführung für den Dauereinsatz.</p>`;
  }

  // --- TORFESTSTELLER ---
  if (name.toLowerCase().includes('torfeststeller')) {
    return `<p>Torfeststeller TFS 85 von GSG – robuster Feststeller für Tore und Türen im Außenbereich. Hält Tore sicher in geöffneter Position und verhindert unkontrolliertes Zuschlagen.</p><p>Witterungsbeständige Ausführung für den Außeneinsatz. Einfache Montage am Boden. Geeignet für Gartentore, Hoftore und Garagentore.</p>`;
  }

  // --- VOLLSTIFT ---
  if (name.toLowerCase().includes('vollstift')) {
    const sizeMatch = name.match(/(\d+)x(\d+)\s*mm/);
    const vierkant = sizeMatch ? sizeMatch[1] : '';
    const laenge = sizeMatch ? sizeMatch[2] : '';
    return `<p>Vollstift ${vierkant ? vierkant + 'x' + laenge + ' mm' : ''} – Verbindungsstift für Türdrücker und Türgriffe. Verbindet die beiden Drücker durch das Schloss miteinander.</p><p>Passend für Drückergarnituren mit ${vierkant ? vierkant + ' mm' : 'passendem'} Vierkant. Standardlänge ${laenge ? laenge + ' mm' : ''} für gängige Türstärken.</p>`;
  }

  // --- PSW-SCHRAUBWECHSELSTIFT ---
  if (name.toLowerCase().includes('psw-schraubwechselstift') || name.toLowerCase().includes('schraubwechselstift')) {
    const sizeMatch = name.match(/(\d+)x(\d+)\s*mm/);
    const vierkant = sizeMatch ? sizeMatch[1] : '';
    const laenge = sizeMatch ? sizeMatch[2] : '';
    return `<p>PSW-Schraubwechselstift ${vierkant ? vierkant + 'x' + laenge + ' mm' : ''} – Wechselstift für einseitig gebohrte Türen mit Befestigungsschraube von der Vorderseite. Ermöglicht die Montage eines Drückers auf einer Seite und eines festen Knaufs auf der anderen.</p><p>Ideal für Wohnungseingangstüren und Türen, die nur von einer Seite mit einem Drücker bedient werden sollen.</p>`;
  }

  // --- EINBAUSICHERUNG ISEO ---
  if (name.toLowerCase().includes('einbausicherung') && (mfr === 'ISEO' || name.includes('ISEO'))) {
    let anzSchluessel = '';
    if (name.includes('3 Schlüssel') || name.includes('3 Stk')) anzSchluessel = '3';
    else if (name.includes('6 Schlüssel') || name.includes('6 Stk')) anzSchluessel = '6';

    let gleich = name.toLowerCase().includes('gleichschließend');
    let laenge = '';
    if (name.includes('70 mm')) laenge = '70';
    else if (name.includes('50 mm')) laenge = '50';

    let profil = '';
    if (name.includes('Profil G 20')) profil = ' mit Profil G 20';

    return `<p>ISEO Einbausicherung${laenge ? ' ' + laenge + ' mm' : ''} aus Stahl${profil}${gleich ? ', gleichschließend' : ''} – Zusatzsicherung zum Einbau in Fenster und Fenstertüren. Bietet wirksamen Schutz gegen Aufhebeln.${anzSchluessel ? ` Inklusive ${anzSchluessel} Schlüssel.` : ''}</p><p>Einfache Montage durch Einlassen in den Fensterrahmen. Effektiver Einbruchschutz für Fenster und Balkontüren.</p>`;
  }

  // --- ROHLING FÜR EINBAUSICHERUNGEN ---
  if (name.toLowerCase().includes('rohling für einbausicherungen')) {
    return `<p>ISEO Rohling für Einbausicherungen 50 mm aus Stahl – Schlüsselrohling für ISEO Einbausicherungen. Dient als Grundlage für die Anfertigung passender Schlüssel.</p><p>Geeignet für Schlüsseldienste und Fachhändler zur Nachfertigung von Schlüsseln für ISEO Fenster-Einbausicherungen.</p>`;
  }

  // --- SCHUTZROSETTE IKON ---
  if (name.toLowerCase().includes('schutzrosette')) {
    return `<p>IKON Schutzrosette 9M28 mit Zylinderabdeckung in Silberfarben (Messing, matt gebürstet) – Sicherheitsrosette zum Schutz des Profilzylinders gegen Aufbohr- und Ziehversuche.</p><p>Die drehbare Zylinderabdeckung erschwert gewaltsame Manipulationen am Schließzylinder. Hochwertige Messing-Ausführung für ansprechende Optik. Ideal für Haus- und Wohnungseingangstüren.</p>`;
  }

  // --- MASTER LOCK PRODUCTS ---
  if (mfr === 'Master Lock' || name.includes('Master Lock')) {
    if (name.toLowerCase().includes('notebook') || name.toLowerCase().includes('laptop')) {
      return `<p>Master Lock 2120EURD Notebook-Schloss mit Zahlenkombination – Kabelschloss zum Schutz von Laptops und Notebooks gegen Diebstahl. Sicherung durch individuelle 4-stellige Zahlenkombination.</p><p>Flexibles Stahlkabel zum Befestigen an festen Gegenständen. Ideal für Büro, Bibliothek, Café und unterwegs.</p>`;
    }
    if (name.toLowerCase().includes('lenkradsperre')) {
      return `<p>Master Lock 249 Lenkradsperre – mechanische Diebstahlsicherung für Pkw-Lenkräder. Schützt Ihr Fahrzeug durch Blockierung des Lenkrads gegen unbefugtes Bewegen.</p><p>Sichtbare Abschreckung gegen Autodiebstahl. Robuste Konstruktion aus gehärtetem Stahl. Universell passend für die meisten Lenkräder.</p>`;
    }
    if (name.toLowerCase().includes('schlüsselkasten') || name.toLowerCase().includes('schlüsselsafe')) {
      const verschluss = props['Verschlussart'] || '';
      return `<p>Master Lock Schlüsselkasten 5451EURD für bis zu 5 Schlüssel – kompakter Schlüsselsafe zur sicheren Aufbewahrung von Schlüsseln.${verschluss ? ` Verschluss durch ${verschluss}.` : ''}</p><p>Wetterfeste Konstruktion für Innen- und Außenmontage. Ideal für Ferienwohnungen, Büros und als Ersatzschlüssel-Depot.</p>`;
    }
  }

  // --- SCHLÜSSELSAFE KBV ---
  if (name.toLowerCase().includes('schlüsselsafe')) {
    const verschluss = props['Verschlussart'] || '';
    const typ = props['Produkttyp'] || '';
    return `<p>Schlüsselsafe von ${mfr}, vorgerichtet für Profilhalbzylinder – sicherer Aufbewahrungsort für Schlüssel.${verschluss ? ` Verschluss durch ${verschluss}.` : ''} Ermöglicht den kontrollierten Zugang zu hinterlegten Schlüsseln.</p><p>Ideal für Ferienwohnungen, Pflegedienste, Handwerker und Hausverwaltungen. Robuste Bauweise für die Wandmontage im Innen- und Außenbereich.</p>`;
  }

  // --- SIMONSSVOSS ---
  if (mfr === 'SimonsVoss' || name.includes('SimonsVoss')) {
    if (name.includes('MobileKey Starter-Set1')) {
      return `<p>SimonsVoss MobileKey Starter-Set 1 – Einstiegspaket in die digitale Schließtechnik von SimonsVoss. Enthält die Grundausstattung für den Start mit dem MobileKey-System.</p><p>Elektronische Zutrittskontrolle ohne Kabel und ohne Bohren. Verwaltung per Smartphone-App. Ideal für kleine Büros, Praxen und Privatanwender.</p>`;
    }
    if (name.includes('MobileKey Starter-Set2')) {
      return `<p>SimonsVoss MobileKey Starter-Set 2 – erweitertes Einstiegspaket in die digitale Schließtechnik von SimonsVoss. Umfangreichere Ausstattung für den Start mit dem MobileKey-System.</p><p>Kabellose elektronische Zutrittskontrolle mit Verwaltung per Smartphone-App. Ideal für kleine und mittlere Objekte im gewerblichen und privaten Bereich.</p>`;
    }
    if (name.includes('Steckernetzteil')) {
      return `<p>SimonsVoss Externes Steckernetzteil 12 VDC / 500 mA / 6 VA – Stromversorgung für SimonsVoss Komponenten, die eine externe Spannungsversorgung benötigen.</p><p>Kompaktes Steckernetzteil für die einfache Installation. Passend für verschiedene SimonsVoss Systemkomponenten.</p>`;
    }
    if (name.includes('PEGASYS E-Trim Lockbox')) {
      return `<p>SimonsVoss PEGASYS E-Trim Lockbox – Montagegehäuse für den SimonsVoss PEGASYS E-Trim elektronischen Beschlag. Schützt die Elektronik und ermöglicht eine saubere Installation.</p><p>Robustes Gehäuse für den professionellen Einsatz in Zutrittskontrollsystemen. Passend für die SimonsVoss PEGASYS Produktlinie.</p>`;
    }
    if (name.includes('Schutzgehäuse') && name.includes('SmartRelais')) {
      return `<p>SimonsVoss Schutzgehäuse für das SmartRelais 2 – schützt das SmartRelais 2 vor unbefugtem Zugriff und mechanischer Beschädigung. Für die sichere Installation in Zutrittskontrollsystemen.</p><p>Robustes Gehäuse aus hochwertigem Material. Einfache Montage. Empfohlenes Zubehör für jede SmartRelais 2 Installation.</p>`;
    }
    if (name.includes('SmartCard Leser intern')) {
      return `<p>SimonsVoss SmartCard Leser intern – internes Lesegerät für SimonsVoss SmartCards. Ermöglicht die Programmierung und Verwaltung von SmartCards über das SimonsVoss System.</p><p>Für den Einbau in Verwaltungsrechner und Programmiergeräte. Unverzichtbar für die Administration von SimonsVoss Zutrittskontrollsystemen.</p>`;
    }
  }

  // --- SALTO PRODUCTS ---
  if (mfr === 'Salto' || name.includes('SALTO') || name.includes('Salto')) {
    if (name.includes('Ersatzkabel') && name.includes('PPD')) {
      return `<p>SALTO Ersatzkabel für PPD 800 und PPD 200 – Ersatz-Anschlusskabel für SALTO Wandleser der PPD-Serie. Für den schnellen Austausch bei Kabeldefekten.</p><p>Originalzubehör von SALTO für zuverlässige Funktion Ihrer Zutrittskontrollanlage.</p>`;
    }
    if (name.includes('Gehäuseschlüssel') && name.includes('XS4 MINI')) {
      return `<p>SALTO Gehäuseschlüssel für XS4 MINI – mechanischer Schlüssel zum Öffnen des Gehäuses der SALTO XS4 MINI Beschläge. Für Wartung, Batteriewechsel und Montage.</p><p>Originalzubehör von SALTO. Unverzichtbar für die Wartung von XS4 MINI Zutrittskontrollbeschlägen.</p>`;
    }
    if (name.includes('Neo Montageschlüssel')) {
      return `<p>SALTO Neo Montageschlüssel – Spezialwerkzeug für die Montage und Demontage von SALTO Neo Beschlägen. Ermöglicht den fachgerechten Ein- und Ausbau der elektronischen Beschläge.</p><p>Original SALTO Werkzeug für Installateure und Servicetechniker.</p>`;
    }
    if (name.includes('Batteriewechsel') && name.includes('Neoxx')) {
      return `<p>SALTO Schlüssel für Batteriewechsel am SALTO Neoxx Vorhangschloss – Spezialschlüssel zum Öffnen des Batteriefachs an SALTO Neoxx elektronischen Vorhangschlössern.</p><p>Ermöglicht den schnellen und werkzeuglosen Batteriewechsel. Original SALTO Zubehör.</p>`;
    }
    if (name.includes('Ersatzkabel') && name.includes('XS4')) {
      return `<p>Salto Ersatzkabel für XS4-Beschläge – Ersatz-Verbindungskabel für SALTO XS4 elektronische Türbeschläge. Für den schnellen Austausch bei Kabeldefekten.</p><p>Originalzubehör von SALTO für die zuverlässige Funktion Ihrer elektronischen Zutrittskontrolle.</p>`;
    }
  }

  // --- TÜRSPION ---
  if (name.toLowerCase().includes('türspion') && !name.toLowerCase().includes('verlängerung')) {
    return `<p>Türspion verchromt mit 200° Weitwinkel-Sichtfeld – ermöglicht eine umfassende Sicht auf den Besucher vor der Tür. Bohrdurchmesser 14 mm, passend für Türstärken von 35 bis 60 mm.</p><p>Verchromte Oberfläche für ein elegantes Erscheinungsbild. Das 200°-Weitwinkelobjektiv bietet deutlich mehr Überblick als Standardtürspione. Einfache Montage.</p>`;
  }

  // --- TÜRSPIONVERLÄNGERUNG ---
  if (name.toLowerCase().includes('türspionverlängerung')) {
    return `<p>Türspionverlängerung 20 mm – Verlängerungsstück für Türspione bei dickeren Türen. Erweitert den Einsatzbereich Ihres Türspions um 20 mm Türstärke.</p><p>Einfach zwischen Türspion-Gehäuse und Objektiv einschrauben. Passend für handelsübliche Türspione mit Standardgewinde.</p>`;
  }

  // --- GARAGENKNEBEL ---
  if (name.toLowerCase().includes('garagenknebel')) {
    return `<p>Garagenknebel abschließbar mit 60 mm Vierkant, gleichschließend – abschließbarer Griff für Garagentore. Der Vierkant-Anschluss (60 mm) ermöglicht die Bedienung des Garagentor-Verschlusses.</p><p>Gleichschließende Ausführung für die Verwendung mehrerer Schlösser mit einem Schlüssel. Robuste Konstruktion für den täglichen Einsatz.</p>`;
  }

  // --- TORTREIBRIEGEL ---
  if (name.toLowerCase().includes('tortreibriegel')) {
    return `<p>PLANO Tortreibriegel TR 13 ohne Stange, 13 mm – Treibriegelschloss für Hoftore, Gartentore und doppelflügelige Türen. Verriegelung des Standflügels oben und unten. Ohne Stange – Stange separat nach gewünschter Länge wählbar.</p><p>Robuste Ausführung für den Außenbereich. Einfache Montage auf dem Torflügel.</p>`;
  }

  // --- WC-/BAD-MODUL ---
  if (name.toLowerCase().includes('wc-') && name.toLowerCase().includes('modul')) {
    return `<p>WC-/Bad-Modul für PZ-vorgerichtete Türen von Schnegel – ermöglicht die Umrüstung einer Profilzylinder-Tür auf WC-/Bad-Funktion ohne Austausch des Einsteckschlosses.</p><p>Einfach in den PZ-Ausschnitt einsetzen und die Tür kann mit einer WC-Drehverriegelung von innen verschlossen werden. Praktische Lösung für Bad- und WC-Türen.</p>`;
  }

  // --- RONIS HEBELZYLINDER ---
  if (name.toLowerCase().includes('ronis hebelzylinder')) {
    return `<p>RONIS Hebelzylinder inklusive 2 Schlüssel – Möbelzylinder mit Hebelfunktion für Briefkästen, Schaltkästen und Spindschlösser. Zuverlässige Verriegelung durch drehbaren Hebel.</p><p>Kompakte Bauweise für den Einbau in Möbel, Briefkästen und technische Einrichtungen. Inklusive 2 Schlüssel.</p>`;
  }

  // --- EURO LOCKS ---
  if (name.toLowerCase().includes('euro locks x58') || (name.includes('EURO') && name.includes('X58'))) {
    return `<p>EURO Locks X58 Möbelzylinder inklusive 2 Schlüssel – kompakter Zylinder für Möbel, Briefkästen und Schaltschränke. Zuverlässige Verriegelung im täglichen Einsatz.</p><p>Einfache Montage durch Standard-Einbaumaß. Inklusive 2 Schlüssel. Weit verbreitetes System für vielfältige Anwendungen.</p>`;
  }

  // --- ZYLINDERHEBELSCHLOSS ---
  if (name.toLowerCase().includes('zylinderhebelschloss')) {
    return `<p>Zylinderhebelschloss FORT F42 für Spinde, inklusive 2 Schlüssel – kompaktes Schloss für Spindtüren, Schließfächer und Möbel. Zuverlässige Verriegelung durch drehbaren Hebel.</p><p>Einfache Montage in Standard-Bohrungen. Ideal für Umkleiden, Fitnessstudios, Schulen und Betriebe.</p>`;
  }

  // --- HOPPE SCHUTZ-DRÜCKERGARNITUR New York ---
  if (name.toLowerCase().includes('schutz-drückergarnitur') && name.includes('New York') && mfr === 'Hoppe') {
    return `<p>Hoppe Schutz-Drückergarnitur "New York" 1810H/3331/3410 mit Schutzlangschild in Aluminium F1 Natur. Für Profilzylinder mit 92 mm Entfernung, Nuss 10 mm.</p><p>Sicherheitsbeschlag mit integriertem Ziehschutz – bietet zuverlässigen Schutz gegen Aufbohr- und Abreißversuche. Beidseitig mit Drücker. Ideal für Haus- und Wohnungseingangstüren.</p>`;
  }

  // --- SSF WC-EINSTECKSCHLOSS ---
  if (name.toLowerCase().includes('wc-einsteckschloss') || (mfr === 'SSF' && name.toLowerCase().includes('einsteckschloss'))) {
    return `<p>SSF WC-Einsteckschloss ES 10 – Einsteckschloss für WC- und Badezimmertüren. Dornmaß 55 mm, Entfernung 78 mm, Nuss 8 mm. Stulp 18x235 mm rund, silberfarbig. DIN Links.</p><p>Zuverlässiges Einsteckschloss mit WC-Verriegelung für den Einsatz an Innentüren im Sanitärbereich.</p>`;
  }

  // --- SCHAKE PARKPLATZSPERRE ---
  if (name.toLowerCase().includes('parkplatzsperre') || name.toLowerCase().includes('durchgangs')) {
    return `<p>Schake Durchgangs- und Parkplatzsperre 471FUB – mobile Absperrung für Parkplätze, Durchfahrten und Zugangsbereiche. Schützt reservierte Stellflächen vor Fremdparkern.</p><p>Robuste Konstruktion für den Dauereinsatz im Außenbereich. Einfache Bedienung durch umklappbaren Bügel. Ideal für Firmengelände, Privatparkplätze und Hofeinfahrten.</p>`;
  }

  // --- LIENBACHER ---
  // Already handled by Rosettengarnitur section above

  // --- HÄFELE ---
  // Already handled by Rosettengarnitur section above

  // --- GENERIC FALLBACK ---
  // For any remaining products, generate a general description
  let desc = `<p>${name}${mfr ? ' von ' + mfr : ''} – `;
  
  // Try to identify product type for generic description
  if (name.toLowerCase().includes('schloss')) {
    desc += `hochwertiges Schloss für den professionellen Einsatz in der Sicherheitstechnik.`;
  } else if (name.toLowerCase().includes('zylinder')) {
    desc += `zuverlässiger Schließzylinder für sichere Verriegelungslösungen.`;
  } else if (name.toLowerCase().includes('beschlag') || name.toLowerCase().includes('garnitur')) {
    desc += `hochwertiger Türbeschlag für den Einsatz im Wohn- und Objektbereich.`;
  } else if (name.toLowerCase().includes('schlüssel')) {
    desc += `hochwertiges Schlüsselprodukt für die professionelle Sicherheitstechnik.`;
  } else {
    desc += `hochwertiges Produkt aus dem Bereich Sicherheitstechnik und Beschlagtechnik.`;
  }
  desc += `</p>`;

  // Add properties if available
  if (properties) {
    const propList = properties.split(' | ').filter(p => p && !p.includes('NULL'));
    if (propList.length > 0) {
      desc += '<ul>' + propList.map(p => `<li>${p}</li>`).join('') + '</ul>';
    }
  }

  desc += `<p>Professionelle Qualität für den Fachhandel und den anspruchsvollen Endkunden.</p>`;
  return desc;
}

// Process all products
const results = [];
const manufacturerCounts = {};

for (const product of products) {
  const description = generateDescription(product);
  results.push({
    product_id: product.product_id,
    description: description
  });

  const mfr = product.manufacturer || '(unbekannt)';
  manufacturerCounts[mfr] = (manufacturerCounts[mfr] || 0) + 1;
}

// Validate character lengths
let tooShort = 0;
let tooLong = 0;
let good = 0;
for (const r of results) {
  const textLen = r.description.replace(/<[^>]+>/g, '').length;
  if (textLen < 200) tooShort++;
  else if (textLen > 500) tooLong++;
  else good++;
}

// Write output
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

console.log(`\n=== Description Generation Complete ===`);
console.log(`Total products processed: ${results.length}`);
console.log(`\nCharacter length validation (text only, excl. HTML):`);
console.log(`  200-500 chars (target): ${good}`);
console.log(`  < 200 chars: ${tooShort}`);
console.log(`  > 500 chars: ${tooLong}`);
console.log(`\nBreakdown by manufacturer:`);
Object.entries(manufacturerCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([mfr, count]) => {
    console.log(`  ${mfr}: ${count}`);
  });
console.log(`\nOutput written to: ${outputPath}`);
