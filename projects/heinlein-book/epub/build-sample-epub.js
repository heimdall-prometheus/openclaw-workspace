#!/usr/bin/env node
/**
 * Sample EPUB Builder - Chapters 1-3 only + teaser page
 * Based on full build-epub.js
 */
const fs = require('fs');
const path = require('path');

// Load and modify the full builder
const WORKSPACE = '/home/reisig/.openclaw/workspace';
const FULL_SCRIPT = path.join(WORKSPACE, 'projects/heinlein-book/epub/build-epub.js');

// Read the full script content and eval relevant functions
const fullCode = fs.readFileSync(FULL_SCRIPT, 'utf8');

// We'll require the full module by modifying the build
const SAMPLE_CHAPTERS = 3;
const EPUB_PATH = path.join(WORKSPACE, 'projects/heinlein-book/epub/auf-fremdem-grund-leseprobe.epub');

// Patch: override the main build to filter chapters
const HTML_PATH = path.join(WORKSPACE, 'projects/heinlein-book/print/interior-illustrated.html');
const COVER_PATH = path.join(WORKSPACE, 'generated-images/book-covers/cover-v1.jpg');
const ILLUST_BASE = path.join(WORKSPACE, 'projects/heinlein-book/chapter-illustrations');
const BUILD_DIR = path.join(WORKSPACE, 'projects/heinlein-book/epub/build-sample');

const ILLUSTRATIONS = {
  1: 'kap01-flux/v4.jpg',
  2: 'kap02-flux/v2b.jpg',
  3: 'kap03-flux/v6.jpg',
};

// Extract functions from the full script by evaluating
// Instead, let's just use a simplified approach

const { execSync } = require('child_process');

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function cleanDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
  ensureDir(dir);
}

function processImage(srcPath, destPath, maxWidth = 600) {
  try {
    execSync(`ffmpeg -y -i "${srcPath}" -vf "scale='min(${maxWidth},iw)':-2" -q:v 4 "${destPath}"`, { stdio: 'pipe' });
  } catch (e) {
    fs.copyFileSync(srcPath, destPath);
  }
}

function parseChapters(html) {
  const chapters = [];
  const chapterRegex = /<section class="chapter">([\s\S]*?)<\/section>/g;
  let match;
  while ((match = chapterRegex.exec(html)) !== null) {
    const content = match[1];
    const numMatch = content.match(/<div class="chapter-number">(.*?)<\/div>/);
    const titleMatch = content.match(/<h2 class="chapter-title">(.*?)<\/h2>/);
    if (numMatch && titleMatch) {
      const chapNum = parseInt(numMatch[1].trim().replace(/\D/g, ''));
      if (chapNum > SAMPLE_CHAPTERS) continue; // ONLY first 3
      const chapTitle = titleMatch[1].trim();
      const firstPIndex = content.indexOf('<p ');
      let bodyContent = content.substring(firstPIndex).trim();
      bodyContent = bodyContent.replace(
        /\s*<div class="scene-break">\*&ensp;\*&ensp;\*<\/div>\s*<div class="scene-break">\*&ensp;\*&ensp;\*<\/div>\s*/g,
        '\n  <div class="scene-break">* * *</div>\n'
      );
      bodyContent = bodyContent.replace(/<div class="scene-break">\*&ensp;\*&ensp;\*<\/div>/g, '<div class="scene-break">* * *</div>');
      chapters.push({ num: chapNum, numText: numMatch[1].trim().toUpperCase(), title: chapTitle, body: bodyContent });
    }
  }
  return chapters;
}

async function build() {
  console.log('Building SAMPLE EPUB (Chapters 1-3)...\n');
  
  cleanDir(BUILD_DIR);
  ensureDir(path.join(BUILD_DIR, 'META-INF'));
  ensureDir(path.join(BUILD_DIR, 'OEBPS', 'images'));
  
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const chapters = parseChapters(html);
  console.log(`Parsed ${chapters.length} chapters`);

  // Cover image
  processImage(COVER_PATH, path.join(BUILD_DIR, 'OEBPS', 'images', 'cover.jpg'), 800);
  
  // Chapter illustrations (1-3 only)
  for (const ch of chapters) {
    const srcFile = ILLUSTRATIONS[ch.num];
    if (!srcFile) continue;
    const padNum = String(ch.num).padStart(2, '0');
    processImage(path.join(ILLUST_BASE, srcFile), path.join(BUILD_DIR, 'OEBPS', 'images', `kap${padNum}.jpg`), 600);
  }

  // mimetype
  fs.writeFileSync(path.join(BUILD_DIR, 'mimetype'), 'application/epub+zip');
  
  // container.xml
  fs.writeFileSync(path.join(BUILD_DIR, 'META-INF', 'container.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

  // content.opf
  let manifest = `    <item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>
    <item id="titlepage" href="titlepage.xhtml" media-type="application/xhtml+xml"/>
    <item id="dedication" href="dedication.xhtml" media-type="application/xhtml+xml"/>
    <item id="toc" href="toc.xhtml" media-type="application/xhtml+xml"/>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="style" href="style.css" media-type="text/css"/>
    <item id="cover-image" href="images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>
    <item id="teaser" href="teaser.xhtml" media-type="application/xhtml+xml"/>`;
  let spine = `    <itemref idref="cover" linear="no"/>
    <itemref idref="titlepage"/>
    <itemref idref="dedication"/>
    <itemref idref="toc"/>`;
  
  for (const ch of chapters) {
    const p = String(ch.num).padStart(2, '0');
    manifest += `\n    <item id="illust${p}" href="images/kap${p}.jpg" media-type="image/jpeg"/>`;
    manifest += `\n    <item id="chapter${p}" href="chapter${p}.xhtml" media-type="application/xhtml+xml"/>`;
    spine += `\n    <itemref idref="chapter${p}"/>`;
  }
  spine += `\n    <itemref idref="teaser"/>`;

  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'content.opf'), `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uid">urn:isbn:000-0-00-000000-0</dc:identifier>
    <dc:title>Auf fremdem Grund — Leseprobe</dc:title>
    <dc:creator>Erik Reisig</dc:creator>
    <dc:language>de</dc:language>
    <dc:publisher>TANSTAAFL Press</dc:publisher>
    <dc:date>2026</dc:date>
    <dc:description>Leseprobe — Kapitel 1 bis 3</dc:description>
    <meta property="dcterms:modified">2026-02-08T00:00:00Z</meta>
  </metadata>
  <manifest>
${manifest}
  </manifest>
  <spine>
${spine}
  </spine>
</package>`);

  // nav.xhtml
  let navItems = '';
  for (const ch of chapters) {
    const p = String(ch.num).padStart(2, '0');
    navItems += `      <li><a href="chapter${p}.xhtml">${ch.numText} — ${ch.title}</a></li>\n`;
  }
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'nav.xhtml'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="de">
<head><title>Navigation</title></head>
<body>
  <nav epub:type="toc" id="toc">
    <ol>
${navItems}    </ol>
  </nav>
</body></html>`);

  // Stylesheet (minimal)
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'style.css'), `
body { font-family: Georgia, 'EB Garamond', serif; line-height: 1.6; margin: 1em; color: #1a1a1a; }
h2 { font-size: 1.4em; text-align: center; margin: 2em 0 1em; letter-spacing: 0.15em; font-weight: normal; }
p { text-indent: 1.5em; margin: 0.3em 0; text-align: justify; }
.chapter-header { margin-top: 20%; text-align: center; margin-bottom: 2em; }
.chapter-number { font-size: 0.85em; letter-spacing: 0.3em; color: #666; margin-bottom: 0.5em; }
.chapter-title { font-size: 1.6em; font-style: italic; }
.scene-break { text-align: center; margin: 1.5em 0; color: #999; letter-spacing: 0.5em; }
.illustration { text-align: center; margin: 2em 0; page-break-before: always; }
.illustration img { max-width: 100%; height: auto; }
.first-paragraph { text-indent: 0; }
.first-paragraph::first-letter { font-size: 3em; float: left; line-height: 0.8; margin: 0.1em 0.1em 0 0; font-weight: bold; }
img.cover { max-width: 100%; height: auto; }
.teaser { text-align: center; margin-top: 20%; }
.teaser h2 { font-size: 1.3em; letter-spacing: 0.2em; }
.teaser p { text-indent: 0; text-align: center; font-style: italic; margin: 1em 0; }
.teaser .cta { display: inline-block; margin-top: 2em; padding: 0.8em 2em; border: 2px solid #1a1a1a; font-size: 0.9em; letter-spacing: 0.15em; text-decoration: none; color: #1a1a1a; }
`);

  // Cover page
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'cover.xhtml'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de"><head><title>Cover</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body style="text-align:center; margin:0; padding:0;"><img class="cover" src="images/cover.jpg" alt="Auf fremdem Grund"/></body></html>`);

  // Title page
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'titlepage.xhtml'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de"><head><title>Titelseite</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<div style="margin-top:30%; text-align:center;">
  <p style="font-size:0.8em; letter-spacing:0.3em; color:#666;">LESEPROBE</p>
  <h1 style="font-size:2em; letter-spacing:0.15em; margin:0.5em 0;">AUF FREMDEM GRUND</h1>
  <p style="font-style:italic; font-size:1.1em;">Ein Roman</p>
  <p style="margin-top:2em; font-size:0.9em; letter-spacing:0.2em;">ERIK REISIG</p>
  <p style="margin-top:3em; font-size:0.75em; letter-spacing:0.2em; color:#999;">TANSTAAFL PRESS</p>
</div>
</body></html>`);

  // Dedication
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'dedication.xhtml'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de"><head><title>Widmung</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body><div style="margin-top:35%; text-align:center; font-style:italic;">Für Klaus und Sophia.</div></body></html>`);

  // TOC page
  let tocHtml = '';
  for (const ch of chapters) {
    tocHtml += `<p style="margin:0.8em 0;"><a href="chapter${String(ch.num).padStart(2,'0')}.xhtml" style="text-decoration:none; color:#1a1a1a;">${ch.numText} — ${ch.title}</a></p>\n`;
  }
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'toc.xhtml'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de"><head><title>Inhalt</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<div style="margin-top:15%; text-align:center;">
  <h2 style="font-size:1em; letter-spacing:0.3em; margin-bottom:2em;">INHALT</h2>
  ${tocHtml}
</div>
</body></html>`);

  // Chapter files
  for (const ch of chapters) {
    const p = String(ch.num).padStart(2, '0');
    fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', `chapter${p}.xhtml`), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de"><head><title>${ch.numText} — ${ch.title}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<div class="illustration"><img src="images/kap${p}.jpg" alt="Illustration zu ${ch.title}"/></div>
<div class="chapter-header">
  <div class="chapter-number">${ch.numText}</div>
  <h2 class="chapter-title">${ch.title}</h2>
</div>
${ch.body}
</body></html>`);
  }

  // TEASER page (after chapter 3)
  fs.writeFileSync(path.join(BUILD_DIR, 'OEBPS', 'teaser.xhtml'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de"><head><title>Weiterlesen</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<div class="teaser">
  <p style="font-size:0.8em; letter-spacing:0.3em; color:#666; margin-bottom:2em;">ENDE DER LESEPROBE</p>
  <h2>Die Geschichte geht weiter.</h2>
  <p>Noch 11 Kapitel voller Geopolitik,<br/>Ingenieurskunst und menschlicher Abgründe.</p>
  <p style="margin-top:2em; font-style:normal; font-size:0.85em;">
    Die Vollversion ist erhältlich als<br/>
    <strong>Hardcover</strong> (fadengenheftet, 312 Seiten)<br/>
    und als <strong>E-Book</strong>.
  </p>
  <p style="margin-top:2em;">
    <a class="cta" href="https://erikreisig.de">JETZT BESTELLEN</a>
  </p>
  <p style="margin-top:3em; font-size:0.75em; letter-spacing:0.2em; color:#999;">TANSTAAFL PRESS · 2026</p>
</div>
</body></html>`);

  // Package as ZIP
  const archiver = require('archiver');
  if (fs.existsSync(EPUB_PATH)) fs.unlinkSync(EPUB_PATH);
  
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(EPUB_PATH);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => {
      const size = (fs.statSync(EPUB_PATH).size / 1024).toFixed(0);
      console.log(`\n✅ Sample EPUB: ${EPUB_PATH} (${size} KB)`);
      resolve();
    });
    archive.on('error', reject);
    archive.pipe(output);
    archive.append('application/epub+zip', { name: 'mimetype', store: true });
    archive.directory(path.join(BUILD_DIR, 'META-INF'), 'META-INF');
    archive.directory(path.join(BUILD_DIR, 'OEBPS'), 'OEBPS');
    archive.finalize();
  });
}

build().then(() => console.log('Done!')).catch(e => { console.error(e); process.exit(1); });
