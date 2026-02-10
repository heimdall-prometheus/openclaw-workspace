const fs = require('fs');

// Read TSV files
const productsRaw = fs.readFileSync('projects/mein-schluessel/ms-products-export.tsv', 'utf8');
const categoriesRaw = fs.readFileSync('projects/mein-schluessel/ms-categories.tsv', 'utf8');

// Parse products
const products = productsRaw.trim().split('\n').map(line => {
  const [product_id, product_name, manufacturer, current_meta_title, current_meta_description, description_preview, desc_length] = line.split('\t');
  return { product_id, product_name, manufacturer, current_meta_title, current_meta_description, description_preview: description_preview || '', desc_length: parseInt(desc_length) || 0 };
});

// Parse categories
const categoryMap = {};
categoriesRaw.trim().split('\n').forEach(line => {
  const [product_id, category_path] = line.split('\t');
  categoryMap[product_id] = category_path;
});

console.log(`Total products: ${products.length}`);
console.log(`Products needing meta_title: ${products.filter(p => !p.current_meta_title).length}`);
console.log(`Products needing meta_description: ${products.filter(p => !p.current_meta_description).length}`);

const SUFFIX = ' | mein-schluessel.de';  // 21 chars
const MAX_TITLE = 60;
const MAX_DESC = 155;

// Strip HTML tags
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').trim();
}

// Shorten product name for title
function shortenName(name, maxLen) {
  let short = name;
  
  // Remove "bei Erstbestellung"
  short = short.replace(/\s*bei Erstbestellung\s*/gi, ' ').trim();
  
  // Remove "günstig kaufen" or "kaufen" at the end
  short = short.replace(/\s+günstig\s+kaufen\s*$/i, '').trim();
  short = short.replace(/\s+kaufen\s*$/i, '').trim();
  
  // Remove "online bestellen" at the end
  short = short.replace(/\s+online\s+bestellen\s*$/i, '').trim();
  
  // Remove trailing comma-separated details if still too long
  // But keep at least the first 2 comma-parts (usually name + model)
  if (short.length > maxLen) {
    const parts = short.split(',').map(p => p.trim());
    while (parts.length > 2 && parts.join(', ').length > maxLen) {
      parts.pop();
    }
    // If 2 parts still too long, try just 1
    if (parts.join(', ').length > maxLen && parts.length > 1) {
      parts.pop();
    }
    short = parts.join(', ').trim();
  }
  
  // Remove content in parentheses if still too long
  if (short.length > maxLen) {
    short = short.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
  }
  
  // Aggressively remove descriptor phrases in order of importance (least important first)
  const removals = [
    /,\s*\d+\s*Stück\s+gleichschlie[ßs]end$/i,   // ", 4 Stück gleichschließend"
    /\s+aus\s+.+$/i,                                // "aus vernickeltem Massivmessing"
    /\s+zur\s+.+$/i,                                // "zur Verwendung..."
    /\s+mit\s+.+$/i,                                // "mit verdecktem Bügel"
    /\s+inkl\.\s+.+$/i,                             // "inkl. 2 Schlüssel"
    /\s+für\s+.+$/i,                                // "für Menschen mit..."
  ];
  
  for (const regex of removals) {
    if (short.length > maxLen) {
      short = short.replace(regex, '').trim();
    }
  }

  // If still too long, truncate intelligently at word boundary
  if (short.length > maxLen) {
    short = short.substring(0, maxLen);
    const lastSpace = short.lastIndexOf(' ');
    if (lastSpace > maxLen * 0.5) {
      short = short.substring(0, lastSpace);
    }
  }
  
  // Remove trailing prepositions/articles that look broken
  short = short.replace(/\s+(für|mit|von|und|bei|in|aus|ab|an|auf|zum|zur|das|die|der|den|dem|des|ein|eine|einem|einer)\s*$/i, '').trim();
  
  return short.trim();
}

function generateMetaTitle(product) {
  const name = product.product_name;
  const mfr = product.manufacturer;
  
  // Format: [Kurzname] [Hersteller] kaufen | mein-schluessel.de
  // But if manufacturer is already in the name, don't duplicate
  
  const nameHasMfr = mfr && name.toLowerCase().includes(mfr.toLowerCase());
  
  // Pre-clean the name (remove "bei Erstbestellung" etc.)
  let cleanName = name
    .replace(/\s*bei Erstbestellung\s*/gi, ' ')
    .replace(/\s+günstig\s+kaufen\s*$/i, '')
    .replace(/\s+kaufen\s*$/i, '')
    .replace(/\s+online\s+bestellen\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // For "Individuelle Schließanlage/Schliessanlage XYZ" - shorten intelligently
  const schliesMatch = cleanName.match(/^(Individuelle\s+Schlie[ßs]+anlage)\s+(.+)$/i);
  if (schliesMatch) {
    let idPart = schliesMatch[2];
    // "DOM ix Twido Nr: CD4E2" → keep system name + Nr code for uniqueness
    // "SCMVKS" → keep the unique code
    // Replace "Nr:" with compact format
    idPart = idPart.replace(/\s*Nr:\s*/, ' ').trim();
    if (idPart) {
      cleanName = 'Schließanlage ' + idPart;
    } else {
      cleanName = 'Individuelle Schließanlage';
    }
  }
  
  let kaufenSuffix = ' kaufen' + SUFFIX;  // " kaufen | mein-schluessel.de" = 29 chars
  
  let basePart;
  if (nameHasMfr || !mfr) {
    basePart = cleanName;
  } else {
    basePart = cleanName + ' ' + mfr;
  }
  
  // Check if full version fits
  let title = basePart + kaufenSuffix;
  if (title.length <= MAX_TITLE) {
    return title;
  }
  
  // Try without "kaufen": "Name Hersteller | mein-schluessel.de"
  title = basePart + SUFFIX;
  if (title.length <= MAX_TITLE) {
    return title;
  }
  
  // Try name-only (no manufacturer) + kaufen
  if (!nameHasMfr && mfr) {
    title = cleanName + kaufenSuffix;
    if (title.length <= MAX_TITLE) {
      return title;
    }
  }
  
  // Try name-only (no manufacturer) without kaufen
  if (!nameHasMfr && mfr) {
    title = cleanName + SUFFIX;
    if (title.length <= MAX_TITLE) {
      return title;
    }
  }
  
  // Need to shorten. Multiple strategies in priority order.
  
  // If manufacturer is in name, prepare a version without mfr prefix
  let nameWithoutMfr = cleanName;
  if (nameHasMfr && mfr) {
    nameWithoutMfr = cleanName.replace(new RegExp('^' + mfr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s+', 'i'), '').trim();
    if (!nameWithoutMfr) nameWithoutMfr = cleanName;
  }
  
  let maxBase, shortened;
  
  // === WITH "kaufen" (29 chars suffix, 31 chars for base) ===
  maxBase = MAX_TITLE - kaufenSuffix.length; // 31
  
  // 1. If mfr in name, try WITHOUT mfr prefix + kaufen first (preserves model numbers better)
  if (nameHasMfr && mfr && nameWithoutMfr !== cleanName) {
    shortened = shortenName(nameWithoutMfr, maxBase);
    title = shortened + kaufenSuffix;
    if (title.length <= MAX_TITLE && shortened.length >= 8) return title;
  }
  
  // 2. Try shortening the full basePart (keeps manufacturer)
  shortened = shortenName(basePart, maxBase);
  title = shortened + kaufenSuffix;
  if (title.length <= MAX_TITLE && shortened.length >= 8) return title;
  
  // === WITHOUT "kaufen" (21 chars suffix, 39 chars for base) ===
  maxBase = MAX_TITLE - SUFFIX.length; // 39
  
  // 3. If mfr in name, try without mfr prefix (no kaufen) — preserves more detail
  if (nameHasMfr && mfr && nameWithoutMfr !== cleanName) {
    shortened = shortenName(nameWithoutMfr, maxBase);
    title = shortened + SUFFIX;
    if (title.length <= MAX_TITLE) return title;
  }
  
  // 4. Shorten full basePart without kaufen
  shortened = shortenName(basePart, maxBase);
  title = shortened + SUFFIX;
  if (title.length <= MAX_TITLE) return title;
  
  // 5. Just clean name shortened
  shortened = shortenName(cleanName, maxBase);
  title = shortened + SUFFIX;
  if (title.length <= MAX_TITLE) return title;
  
  // Absolute last resort: truncate to fit
  const availableLen = MAX_TITLE - SUFFIX.length;
  let truncated = cleanName.substring(0, availableLen);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > availableLen * 0.5) {
    truncated = truncated.substring(0, lastSpace);
  }
  return truncated + SUFFIX;
}

function generateMetaDescription(product) {
  const name = product.product_name;
  const mfr = product.manufacturer;
  const descPreview = stripHtml(product.description_preview);
  const category = categoryMap[product.product_id] || '';
  
  // Shorten name if needed for description
  let shortName = name.replace(/\s*bei Erstbestellung\s*/gi, ' ').trim();
  
  // Array of CTA options to try
  const ctas = ['Jetzt bestellen', 'Günstig kaufen', 'Online bestellen', 'Jetzt kaufen'];
  
  // Try to extract a key selling point from description
  let sellingPoint = '';
  if (descPreview && descPreview.length > 10) {
    // Clean up description
    let cleaned = descPreview
      .replace(/\s+/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .trim();
    
    // Take first meaningful sentence/phrase
    const sentences = cleaned.split(/[.!]\s/);
    if (sentences[0] && sentences[0].length > 10 && sentences[0].length < 100) {
      sellingPoint = sentences[0].replace(/\.$/, '').trim();
    }
  }
  
  // Strategy 1: Name + selling point + CTA
  if (sellingPoint && sellingPoint !== shortName) {
    // Remove product name from selling point if it's just repeating
    let point = sellingPoint;
    if (point.toLowerCase().startsWith(shortName.toLowerCase().substring(0, 15))) {
      // Selling point starts with product name, extract the rest
      point = point.substring(shortName.length).replace(/^\s*[-–:]\s*/, '').trim();
    }
    if (point && point.length > 5) {
      for (const cta of ctas) {
        const desc = `${shortName} - ${point}. ${cta}!`;
        if (desc.length <= MAX_DESC) return desc;
      }
      // Shorten point
      const availLen = MAX_DESC - shortName.length - 5 - 20; // " - " + ". " + CTA + "!"
      if (availLen > 10) {
        let shortPoint = point.substring(0, availLen);
        const ls = shortPoint.lastIndexOf(' ');
        if (ls > availLen * 0.5) shortPoint = shortPoint.substring(0, ls);
        const desc = `${shortName} - ${shortPoint}. ${ctas[0]}!`;
        if (desc.length <= MAX_DESC) return desc;
      }
    }
  }
  
  // Strategy 2: Name + manufacturer + category hint + CTA
  let mfrPart = (mfr && !shortName.toLowerCase().includes(mfr.toLowerCase())) ? ` von ${mfr}` : '';
  
  // Get main category
  let catHint = '';
  if (category) {
    const mainCat = category.split(' > ')[0];
    if (mainCat && mainCat.length < 30 && !shortName.toLowerCase().includes(mainCat.toLowerCase())) {
      catHint = mainCat;
    }
  }
  
  // Build variants and pick best
  const variants = [];
  
  if (catHint) {
    variants.push(`${shortName}${mfrPart} - ${catHint}. Jetzt günstig bei mein-schluessel.de bestellen!`);
    variants.push(`${shortName}${mfrPart} aus dem Bereich ${catHint}. Jetzt bestellen!`);
  }
  
  variants.push(`${shortName}${mfrPart} günstig kaufen bei mein-schluessel.de ✓ Schneller Versand ✓ Top Preise`);
  variants.push(`${shortName}${mfrPart} jetzt günstig online kaufen. Schneller Versand & Top Service bei mein-schluessel.de!`);
  variants.push(`${shortName}${mfrPart} kaufen bei mein-schluessel.de ✓ Günstige Preise ✓ Schneller Versand`);
  variants.push(`${shortName}${mfrPart} online bestellen. Top Preise & schneller Versand bei mein-schluessel.de!`);
  variants.push(`${shortName}${mfrPart} günstig bestellen bei mein-schluessel.de!`);
  variants.push(`${shortName}${mfrPart} jetzt bei mein-schluessel.de bestellen!`);
  
  // Pick the longest one that fits
  for (const v of variants) {
    if (v.length <= MAX_DESC) return v;
  }
  
  // Fallback: shorten name
  let sName = shortenName(shortName, 60);
  const fallback = `${sName} jetzt bei mein-schluessel.de bestellen!`;
  if (fallback.length <= MAX_DESC) return fallback;
  
  sName = shortenName(shortName, 40);
  return `${sName} bei mein-schluessel.de bestellen!`;
}

// Process all products
const updates = [];
let titleCount = 0;
let descCount = 0;
let titleOverflow = 0;
let descOverflow = 0;

for (const product of products) {
  const needsTitle = !product.current_meta_title;
  const needsDesc = !product.current_meta_description;
  
  if (!needsTitle && !needsDesc) continue;
  
  const update = { product_id: product.product_id };
  
  if (needsTitle) {
    const title = generateMetaTitle(product);
    update.meta_title = title;
    titleCount++;
    if (title.length > MAX_TITLE) {
      titleOverflow++;
      console.error(`TITLE OVERFLOW (${title.length}): ${title}`);
    }
  } else {
    update.meta_title = null;
  }
  
  if (needsDesc) {
    const desc = generateMetaDescription(product);
    update.meta_description = desc;
    descCount++;
    if (desc.length > MAX_DESC) {
      descOverflow++;
      console.error(`DESC OVERFLOW (${desc.length}): ${desc}`);
    }
  } else {
    update.meta_description = null;
  }
  
  updates.push(update);
}

console.log(`\n=== RESULTS ===`);
console.log(`Products needing updates: ${updates.length}`);
console.log(`Meta titles generated: ${titleCount}`);
console.log(`Meta descriptions generated: ${descCount}`);
console.log(`Title overflows (>60): ${titleOverflow}`);
console.log(`Description overflows (>155): ${descOverflow}`);

// Write output
fs.writeFileSync('projects/mein-schluessel/meta-updates.json', JSON.stringify(updates, null, 2));
console.log('\nWritten to projects/mein-schluessel/meta-updates.json');

// Sample output for verification
console.log('\n=== SAMPLES ===');
for (let i = 0; i < Math.min(10, updates.length); i++) {
  const u = updates[i];
  const p = products.find(p => p.product_id === u.product_id);
  console.log(`\nProduct: ${p.product_name} (${p.manufacturer})`);
  if (u.meta_title) console.log(`  Title (${u.meta_title.length}): ${u.meta_title}`);
  if (u.meta_description) console.log(`  Desc  (${u.meta_description.length}): ${u.meta_description}`);
}
