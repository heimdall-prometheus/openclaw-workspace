const fs = require('fs');
const path = require('path');

// Load all URLs from all batch files
const urlDir = './urls';
const allUrls = new Map(); // domain -> source file

fs.readdirSync(urlDir).filter(f => f.endsWith('.json')).forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(urlDir, file), 'utf8'));
    const urls = data.urls || data;
    if (Array.isArray(urls)) {
      urls.forEach(u => {
        // Normalize: lowercase, strip protocol, strip www., strip trailing slash
        const normalized = u.toLowerCase()
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')
          .replace(/\/$/, '')
          .trim();
        
        if (normalized && normalized.length > 3) {
          if (!allUrls.has(normalized)) {
            allUrls.set(normalized, file);
          }
        }
      });
    }
  } catch(e) {
    console.error(`Error loading ${file}:`, e.message);
  }
});

console.log(`Total unique URLs (deduplicated): ${allUrls.size}`);

// Save deduplicated master list
const masterList = {
  deduplicated_at: new Date().toISOString(),
  count: allUrls.size,
  urls: [...allUrls.keys()].sort()
};

fs.writeFileSync('./urls/master-deduplicated.json', JSON.stringify(masterList, null, 2));
console.log('Saved to master-deduplicated.json');

// Show sample
console.log('\nSample URLs:');
[...allUrls.keys()].slice(0, 10).forEach(u => console.log(`  ${u}`));
