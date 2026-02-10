const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Illustration mapping
const illustrations = {
  1: 'kap01-flux/v4.jpg',
  2: 'kap02-flux/v2b.jpg',
  3: 'kap03-flux/v6.jpg',
  4: 'kap04-flux/v3.jpg',
  5: 'kap05-flux/v4.jpg',
  6: 'kap06-flux/v7.jpg',
  7: 'kap07-flux/v1.jpg',
  8: 'kap08-flux/v4.jpg',
  9: 'kap09-flux/v2.jpg',
  10: 'kap10-flux/v3.jpg',
  11: 'kap11-flux/v2.jpg',
  12: 'kap12-flux/v1.jpg',
  13: 'kap13-flux/v1.jpg',
  14: 'kap14-flux/v1.jpg',
};

const BASE_DIR = path.resolve(__dirname, '..');
const ILLUST_DIR = path.join(BASE_DIR, 'chapter-illustrations');

// Read the original HTML
let html = fs.readFileSync(path.join(__dirname, 'interior.html'), 'utf8');

// ============================================================
// 1. Add CSS for illustration pages + blank spacer pages
// ============================================================
const extraCSS = `
/* Illustration full-page */
@page illustration {
  margin: 0;
  @bottom-center { content: none; }
}

@page illustration-spacer {
  margin: 0;
  @bottom-center { content: none; }
}

.illustration-page {
  page: illustration;
  break-before: right; /* Force onto recto */
  break-after: always;
  width: 145mm;
  height: 220mm;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 23mm 20mm 27mm 25mm; /* Match recto margins */
  box-sizing: border-box;
}

.illustration-page img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

/* Blank spacer after illustration (verso) - no page number */
.illustration-spacer {
  page: illustration-spacer;
  break-after: always;
  height: 100vh;
}
`;

// Inject CSS before </style>
html = html.replace('</style>', extraCSS + '\n</style>');

// ============================================================
// 2. Modify chapter sections: remove break-before: right from
//    chapters (the illustration page already forces recto), and
//    instead use a named page for chapter-start (no page number)
// ============================================================

// We need the chapter to start on recto. The illustration is break-before: right (recto),
// then a spacer (verso), then the chapter. That means chapter lands on recto naturally.
// But we need break-before on the chapter to be 'always' not 'right' since we control paging.
// Actually, let's keep break-before: right on chapter - it ensures recto start regardless.

// ============================================================
// 3. Insert illustration + spacer before each <section class="chapter">
// ============================================================

// Find all chapter sections and insert illustration pages before them
let chapterIndex = 0;
const chapterRegex = /<section class="chapter">/g;
let match;
const insertions = [];

while ((match = chapterRegex.exec(html)) !== null) {
  chapterIndex++;
  insertions.push({
    index: match.index,
    chapter: chapterIndex
  });
}

console.log(`Found ${insertions.length} chapters`);

// Process from end to start so indices don't shift
for (let i = insertions.length - 1; i >= 0; i--) {
  const ins = insertions[i];
  const chapNum = ins.chapter;
  const illustFile = illustrations[chapNum];
  
  if (!illustFile) {
    console.warn(`No illustration for chapter ${chapNum}`);
    continue;
  }
  
  const imgPath = path.join(ILLUST_DIR, illustFile);
  if (!fs.existsSync(imgPath)) {
    console.error(`Missing file: ${imgPath}`);
    continue;
  }
  
  // Convert to absolute file:// path for the HTML
  const absImgPath = path.resolve(imgPath);
  
  const illustrationHTML = `
<!-- Illustration for Kapitel ${chapNum} -->
<div class="illustration-page">
  <img src="file://${absImgPath}" alt="Illustration Kapitel ${chapNum}">
</div>

<!-- Blank verso after illustration -->
<div class="illustration-spacer"></div>

`;
  
  html = html.slice(0, ins.index) + illustrationHTML + html.slice(ins.index);
}

// ============================================================
// 4. Verify critical content
// ============================================================
const widmungCheck = html.includes('Für Klaus und Sophia.');
const imprintCheck = html.includes('Erik Reisig &amp; Heimdall');
const imprintCheck2 = html.includes('Keiner von beiden hätte es allein gekonnt.');

console.log('=== VALIDATION ===');
console.log(`Widmung "Für Klaus und Sophia.": ${widmungCheck ? '✅' : '❌'}`);
console.log(`Imprint "Erik Reisig & Heimdall": ${imprintCheck ? '✅' : '❌'}`);
console.log(`Imprint "Keiner von beiden...": ${imprintCheck2 ? '✅' : '❌'}`);

if (!widmungCheck || !imprintCheck || !imprintCheck2) {
  console.error('CRITICAL: Validation failed!');
  process.exit(1);
}

// Write the illustrated HTML
const outHtmlPath = path.join(__dirname, 'interior-illustrated.html');
fs.writeFileSync(outHtmlPath, html, 'utf8');
console.log(`\nWrote: ${outHtmlPath}`);
console.log(`HTML size: ${(html.length / 1024).toFixed(0)} KB`);

// ============================================================
// 5. Generate PDF
// ============================================================
(async () => {
  console.log('\nLaunching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });
  
  const page = await browser.newPage();
  
  // Load the HTML
  const fileUrl = `file://${outHtmlPath}`;
  console.log(`Loading: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 120000 });
  
  // Wait a bit for fonts to load
  await new Promise(r => setTimeout(r, 3000));
  
  const pdfPath = path.join(__dirname, 'interior-illustrated.pdf');
  console.log('Generating PDF...');
  
  await page.pdf({
    path: pdfPath,
    width: '145mm',
    height: '220mm',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    timeout: 300000,
  });
  
  // Check page count
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfSizeKB = (pdfBuffer.length / 1024).toFixed(0);
  const pdfSizeMB = (pdfBuffer.length / (1024 * 1024)).toFixed(1);
  
  // Count pages by looking for /Type /Page entries (rough count)
  const pdfText = pdfBuffer.toString('latin1');
  const pageMatches = pdfText.match(/\/Type\s*\/Page[^s]/g);
  const roughPageCount = pageMatches ? pageMatches.length : 'unknown';
  
  console.log(`\n=== PDF GENERATED ===`);
  console.log(`Path: ${pdfPath}`);
  console.log(`Size: ${pdfSizeMB} MB (${pdfSizeKB} KB)`);
  console.log(`Approx pages: ${roughPageCount}`);
  
  if (typeof roughPageCount === 'number') {
    const remainder = roughPageCount % 4;
    console.log(`Divisible by 4: ${remainder === 0 ? '✅ Yes' : `❌ No (remainder ${remainder}, need ${4 - remainder} more pages)`}`);
  }
  
  await browser.close();
  console.log('Done!');
})();
