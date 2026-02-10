#!/usr/bin/env node
/**
 * EPUB 3.0 Builder for "Auf fremdem Grund" by Erik Reisig
 * Builds EPUB manually from the print interior HTML.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WORKSPACE = '/home/reisig/.openclaw/workspace';
const HTML_PATH = path.join(WORKSPACE, 'projects/heinlein-book/print/interior-illustrated.html');
const COVER_PATH = path.join(WORKSPACE, 'generated-images/book-covers/cover-v1.jpg');
const ILLUST_BASE = path.join(WORKSPACE, 'projects/heinlein-book/chapter-illustrations');
const OUTPUT_DIR = path.join(WORKSPACE, 'projects/heinlein-book/epub');
const BUILD_DIR = path.join(OUTPUT_DIR, 'build');
const EPUB_PATH = path.join(OUTPUT_DIR, 'auf-fremdem-grund-v2.epub');

// Image selections from SELECTIONS.md
const ILLUSTRATIONS = {
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

// ===========================
// Helper functions
// ===========================

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
  ensureDir(dir);
}

/**
 * Resize an image to max width while keeping aspect ratio, and limit quality.
 * Uses ImageMagick's convert if available, otherwise copies as-is.
 */
function processImage(srcPath, destPath, maxWidth = 600, quality = 75) {
  try {
    // Use ffmpeg to resize and compress JPEG
    // scale filter: -1 maintains aspect ratio, but must be even, so use scale='min(maxWidth,iw)':-2
    execSync(
      `ffmpeg -y -i "${srcPath}" -vf "scale='min(${maxWidth},iw)':-2" -q:v 4 "${destPath}"`,
      { stdio: 'pipe' }
    );
    let stat = fs.statSync(destPath);
    // If still too large, increase q:v (lower quality)
    let qv = 4;
    while (stat.size > 200 * 1024 && qv < 20) {
      qv += 1;
      execSync(
        `ffmpeg -y -i "${srcPath}" -vf "scale='min(${maxWidth},iw)':-2" -q:v ${qv} "${destPath}"`,
        { stdio: 'pipe' }
      );
      stat = fs.statSync(destPath);
    }
  } catch (e) {
    // Fallback: just copy
    console.log(`  Warning: ffmpeg failed for ${path.basename(srcPath)}, copying as-is`);
    fs.copyFileSync(srcPath, destPath);
  }
  const stat = fs.statSync(destPath);
  console.log(`  Image: ${path.basename(destPath)} → ${(stat.size / 1024).toFixed(0)} KB`);
}

// ===========================
// Parse HTML to extract chapters
// ===========================
function parseChapters(html) {
  const chapters = [];
  // Split by chapter sections
  const chapterRegex = /<section class="chapter">([\s\S]*?)<\/section>/g;
  let match;
  while ((match = chapterRegex.exec(html)) !== null) {
    const content = match[1];

    // Extract chapter number
    const numMatch = content.match(/<div class="chapter-number">(.*?)<\/div>/);
    const titleMatch = content.match(/<h2 class="chapter-title">(.*?)<\/h2>/);

    if (numMatch && titleMatch) {
      const chapNumText = numMatch[1].trim(); // e.g. "Kapitel 1"
      const chapNum = parseInt(chapNumText.replace(/\D/g, ''));
      const chapTitle = titleMatch[1].trim();

      // Extract body content: everything after the first <p> tag
      const firstPIndex = content.indexOf('<p ');
      if (firstPIndex === -1) {
        console.error(`  WARNING: No <p> found in chapter ${chapNum}`);
      }
      let bodyContent = content.substring(firstPIndex).trim();

      // Convert scene breaks: keep only one per pair (the HTML has duplicate scene-breaks)
      // Replace double scene-break with single
      bodyContent = bodyContent.replace(
        /\s*<div class="scene-break">\*&ensp;\*&ensp;\*<\/div>\s*<div class="scene-break">\*&ensp;\*&ensp;\*<\/div>\s*/g,
        '\n  <div class="scene-break">* * *</div>\n'
      );
      // Handle single scene-breaks too
      bodyContent = bodyContent.replace(
        /<div class="scene-break">\*&ensp;\*&ensp;\*<\/div>/g,
        '<div class="scene-break">* * *</div>'
      );

      chapters.push({
        num: chapNum,
        numText: chapNumText.toUpperCase(),
        title: chapTitle,
        body: bodyContent
      });
    }
  }
  return chapters;
}

// ===========================
// Generate EPUB files
// ===========================

function generateMimetype() {
  return 'application/epub+zip';
}

function generateContainerXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`;
}

function generateStylesheet() {
  return `/* EPUB Stylesheet for "Auf fremdem Grund" */

@charset "UTF-8";

body {
  font-family: "EB Garamond", "Georgia", "Times New Roman", serif;
  font-size: 1em;
  line-height: 1.5;
  color: #1a1a1a;
  margin: 0;
  padding: 0;
  text-rendering: optimizeLegibility;
  -webkit-hyphens: auto;
  hyphens: auto;
}

/* Cover */
.cover-page {
  text-align: center;
  padding: 0;
  margin: 0;
  height: 100%;
}

.cover-page img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Title page */
.title-page {
  text-align: center;
  padding-top: 25%;
  page-break-after: always;
}

.title-page .title {
  font-size: 2em;
  font-weight: normal;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.3;
  margin-bottom: 1.5em;
}

.title-page .subtitle {
  font-size: 1.1em;
  font-style: italic;
  letter-spacing: 0.05em;
  margin-bottom: 2.5em;
}

.title-page .author {
  font-size: 1.2em;
  letter-spacing: 0.1em;
  margin-bottom: 4em;
}

.title-page .publisher {
  font-size: 0.8em;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* Impressum */
.impressum-page {
  padding-top: 60%;
  font-size: 0.85em;
  line-height: 1.8;
  page-break-after: always;
}

.impressum-page p {
  text-indent: 0 !important;
  margin: 0.2em 0;
}

.impressum-page .spacer {
  height: 0.8em;
}

.impressum-page .imprint {
  font-style: italic;
}

/* Dedication */
.dedication-page {
  text-align: center;
  padding-top: 35%;
  font-size: 1.15em;
  font-style: italic;
  letter-spacing: 0.03em;
  page-break-after: always;
}

/* Table of Contents */
.toc-page {
  page-break-after: always;
}

.toc-page h2 {
  text-align: center;
  font-size: 1.3em;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 2em;
}

.toc-page ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-page li {
  margin: 0.6em 0;
  font-size: 1em;
}

.toc-page li a {
  text-decoration: none;
  color: #1a1a1a;
}

.toc-page .toc-chapnum {
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  display: block;
  margin-bottom: 0.1em;
  color: #666;
}

.toc-page .toc-title {
  font-size: 1.05em;
}

/* Chapter illustration */
.illustration-page {
  text-align: center;
  padding: 0;
  margin: 0;
  page-break-after: always;
}

.illustration-page img {
  max-width: 100%;
  max-height: 95%;
  object-fit: contain;
  margin: auto;
}

/* Chapter */
.chapter-header {
  text-align: center;
  padding-top: 20%;
  margin-bottom: 2em;
  page-break-after: avoid;
}

.chapter-number {
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  margin-bottom: 0.5em;
  font-weight: normal;
}

.chapter-title {
  font-size: 1.6em;
  font-weight: normal;
  line-height: 1.3;
  letter-spacing: 0.02em;
  margin: 0;
}

/* Body text */
p {
  text-align: justify;
  text-indent: 1.5em;
  margin: 0;
  widows: 2;
  orphans: 2;
}

p.no-indent {
  text-indent: 0;
}

/* Scene break */
.scene-break {
  text-align: center;
  margin: 1.5em 0;
  font-size: 1em;
  letter-spacing: 0.3em;
}

/* Danksagung */
.danksagung-page {
  text-align: center;
  padding-top: 25%;
  page-break-before: always;
}

.danksagung-title {
  font-size: 1.6em;
  font-weight: normal;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 3em;
}

.danksagung-text {
  font-style: italic;
  text-align: center;
  text-indent: 0 !important;
  line-height: 1.7;
}

/* Emphasis */
em {
  font-style: italic;
}

strong {
  font-weight: bold;
}
`;
}

function generateContentOpf(chapters) {
  const items = [];
  const spine = [];

  // Fixed items
  items.push('    <item id="style" href="style.css" media-type="text/css"/>');
  items.push('    <item id="cover-image" href="images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>');
  items.push('    <item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>');
  items.push('    <item id="titlepage" href="titlepage.xhtml" media-type="application/xhtml+xml"/>');
  items.push('    <item id="impressum" href="impressum.xhtml" media-type="application/xhtml+xml"/>');
  items.push('    <item id="dedication" href="dedication.xhtml" media-type="application/xhtml+xml"/>');
  items.push('    <item id="toc-page" href="toc.xhtml" media-type="application/xhtml+xml"/>');
  items.push('    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>');
  items.push('    <item id="danksagung" href="danksagung.xhtml" media-type="application/xhtml+xml"/>');

  spine.push('    <itemref idref="cover" linear="yes"/>');
  spine.push('    <itemref idref="titlepage"/>');
  spine.push('    <itemref idref="impressum"/>');
  spine.push('    <itemref idref="dedication"/>');
  spine.push('    <itemref idref="toc-page"/>');

  for (const ch of chapters) {
    const padNum = String(ch.num).padStart(2, '0');
    items.push(`    <item id="illust${padNum}" href="images/kap${padNum}.jpg" media-type="image/jpeg"/>`);
    items.push(`    <item id="chapter${padNum}" href="chapter${padNum}.xhtml" media-type="application/xhtml+xml"/>`);
    spine.push(`    <itemref idref="chapter${padNum}"/>`);
  }

  spine.push('    <itemref idref="danksagung"/>');

  const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');

  return `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid" xml:lang="de">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uid">urn:uuid:a8f3e4c2-7b1d-4e5f-9a2c-3d6e8f0b1c4a</dc:identifier>
    <dc:title>Auf fremdem Grund</dc:title>
    <dc:creator>Erik Reisig</dc:creator>
    <dc:language>de</dc:language>
    <dc:publisher>TANSTAAFL Press</dc:publisher>
    <dc:date>2026</dc:date>
    <dc:rights>© 2026 Erik Reisig. Alle Rechte vorbehalten.</dc:rights>
    <dc:description>Ein Roman</dc:description>
    <meta property="dcterms:modified">${now}</meta>
  </metadata>
  <manifest>
${items.join('\n')}
  </manifest>
  <spine>
${spine.join('\n')}
  </spine>
</package>`;
}

function generateNav(chapters) {
  let tocItems = '';
  for (const ch of chapters) {
    const padNum = String(ch.num).padStart(2, '0');
    tocItems += `        <li><a href="chapter${padNum}.xhtml">${ch.numText}: ${ch.title}</a></li>\n`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="de" lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>Inhaltsverzeichnis</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h2>Inhaltsverzeichnis</h2>
    <ol>
${tocItems}    </ol>
  </nav>
</body>
</html>`;
}

function generateCover() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>Cover</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="cover-page">
    <img src="images/cover.jpg" alt="Auf fremdem Grund — Cover"/>
  </div>
</body>
</html>`;
}

function generateTitlePage() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>Titelseite</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="title-page">
    <div class="title">Auf fremdem<br/>Grund</div>
    <div class="subtitle">Ein Roman</div>
    <div class="author">Erik Reisig</div>
    <div class="publisher">TANSTAAFL Press</div>
  </div>
</body>
</html>`;
}

function generateImpressum() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>Impressum</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="impressum-page">
    <p><strong>Auf fremdem Grund</strong></p>
    <p>Erik Reisig</p>
    <div class="spacer"></div>
    <p>© 2026 Erik Reisig</p>
    <p>Alle Rechte vorbehalten.</p>
    <div class="spacer"></div>
    <p>TANSTAAFL Press</p>
    <p>Ein Imprint der Erik Reisig Investment GmbH</p>
    <div class="spacer"></div>
    <p>Satz und Layout: TANSTAAFL Press</p>
    <p>Druck und Bindung: Drukatava / Printed in the EU</p>
  </div>
</body>
</html>`;
}

function generateDanksagung() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>Danksagung</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="danksagung-page">
    <h2 class="danksagung-title">DANKSAGUNG</h2>
    <p class="danksagung-text">Mein Dank gilt H.D. — für die langen Nächte, die Geduld<br/>und die richtigen Fragen zur richtigen Zeit.</p>
  </div>
</body>
</html>`;
}

function generateDedication() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>Widmung</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="dedication-page">
    Für Klaus und Sophia.
  </div>
</body>
</html>`;
}

function generateTocPage(chapters) {
  let items = '';
  for (const ch of chapters) {
    const padNum = String(ch.num).padStart(2, '0');
    items += `      <li>
        <a href="chapter${padNum}.xhtml">
          <span class="toc-chapnum">${ch.numText}</span>
          <span class="toc-title">${ch.title}</span>
        </a>
      </li>\n`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>Inhaltsverzeichnis</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="toc-page">
    <h2>Inhalt</h2>
    <ol>
${items}    </ol>
  </div>
</body>
</html>`;
}

function generateChapter(ch) {
  const padNum = String(ch.num).padStart(2, '0');

  // Clean body content for XHTML compatibility
  let body = ch.body;

  // Fix <br> to <br/> for XHTML
  body = body.replace(/<br>/g, '<br/>');

  // Fix &ensp; — already valid XML entity? No, use &#8194; instead
  body = body.replace(/&ensp;/g, '&#8194;');

  // Remove any file:/// references
  body = body.replace(/file:\/\/\/[^"']*/g, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>${ch.numText}: ${ch.title}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="illustration-page">
    <img src="images/kap${padNum}.jpg" alt="Illustration ${ch.numText}"/>
  </div>

  <div class="chapter-header">
    <div class="chapter-number">${ch.numText}</div>
    <h2 class="chapter-title">${ch.title}</h2>
  </div>

${body}
</body>
</html>`;
}

// ===========================
// Build EPUB
// ===========================

function buildEpub() {
  console.log('=== Building EPUB: Auf fremdem Grund ===\n');

  // Clean build directory
  cleanDir(BUILD_DIR);
  ensureDir(path.join(BUILD_DIR, 'META-INF'));
  ensureDir(path.join(BUILD_DIR, 'OEBPS'));
  ensureDir(path.join(BUILD_DIR, 'OEBPS', 'images'));

  // 1. Read and parse HTML
  console.log('1. Parsing source HTML...');
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const chapters = parseChapters(html);
  console.log(`   Found ${chapters.length} chapters:`);
  for (const ch of chapters) {
    console.log(`   ${ch.numText}: ${ch.title}`);
  }

  // 2. Process images
  console.log('\n2. Processing images...');

  // Cover
  console.log('  Cover:');
  processImage(COVER_PATH, path.join(BUILD_DIR, 'OEBPS', 'images', 'cover.jpg'), 800, 80);

  // Chapter illustrations
  console.log('  Chapter illustrations:');
  for (const ch of chapters) {
    const srcFile = ILLUSTRATIONS[ch.num];
    if (!srcFile) {
      console.error(`  ERROR: No illustration defined for chapter ${ch.num}!`);
      continue;
    }
    const srcPath = path.join(ILLUST_BASE, srcFile);
    const padNum = String(ch.num).padStart(2, '0');
    const destPath = path.join(BUILD_DIR, 'OEBPS', 'images', `kap${padNum}.jpg`);
    processImage(srcPath, destPath, 600, 70);
  }

  // 3. Write mimetype (must be first file, uncompressed)
  console.log('\n3. Writing EPUB structure...');
  fs.writeFileSync(path.join(BUILD_DIR, 'mimetype'), generateMimetype());

  // 4. container.xml
  fs.writeFileSync(path.join(BUILD_DIR, 'META-INF', 'container.xml'), generateContainerXml());

  // 5. content.opf
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'content.opf'), generateContentOpf(chapters));

  // 6. nav.xhtml (EPUB3 navigation)
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'nav.xhtml'), generateNav(chapters));

  // 7. Stylesheet
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'style.css'), generateStylesheet());

  // 8. Front matter
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'cover.xhtml'), generateCover());
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'titlepage.xhtml'), generateTitlePage());
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'impressum.xhtml'), generateImpressum());
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'dedication.xhtml'), generateDedication());
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'toc.xhtml'), generateTocPage(chapters));
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'danksagung.xhtml'), generateDanksagung());

  // 9. Chapter files
  console.log('   Writing chapter files...');
  for (const ch of chapters) {
    const padNum = String(ch.num).padStart(2, '0');
    fs.writeFileSync(
      path.join(BUILD_DIR, 'OEBPS', `chapter${padNum}.xhtml`),
      generateChapter(ch)
    );
    console.log(`   chapter${padNum}.xhtml ✓`);
  }

  // 10. Package as ZIP using archiver (EPUB = ZIP with specific structure)
  console.log('\n4. Packaging EPUB...');

  // Remove old epub if exists
  if (fs.existsSync(EPUB_PATH)) {
    fs.unlinkSync(EPUB_PATH);
  }

  return new Promise((resolve, reject) => {
    const archiver = require('archiver');
    const output = fs.createWriteStream(EPUB_PATH);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      const epubStat = fs.statSync(EPUB_PATH);
      const sizeMB = (epubStat.size / (1024 * 1024)).toFixed(2);
      console.log(`\n✅ EPUB created: ${EPUB_PATH}`);
      console.log(`   Size: ${sizeMB} MB (${epubStat.size} bytes)`);

      // File listing
      console.log('\n   Contents:');
      const files = [];
      function walk(dir, prefix) {
        for (const f of fs.readdirSync(dir)) {
          const full = path.join(dir, f);
          const rel = prefix ? prefix + '/' + f : f;
          if (fs.statSync(full).isDirectory()) walk(full, rel);
          else files.push(rel);
        }
      }
      walk(BUILD_DIR, '.');
      files.sort().forEach(f => console.log(`   ${f}`));

      resolve({ chapters, sizeMB });
    });

    archive.on('error', reject);
    archive.pipe(output);

    // EPUB spec: mimetype must be first entry, stored (not compressed)
    archive.append('application/epub+zip', { name: 'mimetype', store: true });

    // Add META-INF
    archive.directory(path.join(BUILD_DIR, 'META-INF'), 'META-INF');

    // Add OEBPS
    archive.directory(path.join(BUILD_DIR, 'OEBPS'), 'OEBPS');

    archive.finalize();
  });
}

buildEpub()
  .then(result => {
    console.log('\n=== EPUB Build Complete ===');
    console.log(`Chapters: ${result.chapters.length}`);
    console.log(`Size: ${result.sizeMB} MB`);
  })
  .catch(err => {
    console.error('ERROR:', err.message);
    console.error(err.stack);
    process.exit(1);
  });
