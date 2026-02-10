#!/usr/bin/env node
/**
 * Build interior HTML for "Auf fremdem Grund"
 * Generates HTML with professional typesetting
 * Then uses Puppeteer for PDF generation with proper page support
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');
const OUTPUT_HTML = path.join(__dirname, 'interior.html');
const OUTPUT_PDF = path.join(__dirname, 'interior.pdf');

// ============================================================
// STEP 1: Read and parse all chapters
// ============================================================

function readChapters() {
  const chapters = [];
  for (let i = 1; i <= 14; i++) {
    const num = String(i).padStart(2, '0');
    const files = fs.readdirSync(CHAPTERS_DIR).filter(f => f.startsWith(`kapitel-${num}-`) && f.endsWith('.md'));
    if (files.length > 0) {
      const content = fs.readFileSync(path.join(CHAPTERS_DIR, files[0]), 'utf-8');
      chapters.push(content);
    }
  }
  return chapters;
}

function inlineFormat(text) {
  // Bold: **text**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
  // Italic: *text* (but not **text**)
  text = text.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
  text = text.replace(/(?<!\w)_([^_]+?)_(?!\w)/g, '<em>$1</em>');
  // Dashes
  text = text.replace(/ --- /g, ' — ');
  text = text.replace(/ -- /g, ' – ');
  text = text.replace(/---/g, '—');
  text = text.replace(/--/g, '–');
  // Proper German quotes are already in source
  return text;
}

function parseChapter(md) {
  const lines = md.split('\n');
  let number = 0, title = '';
  let bodyStart = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+Kapitel\s+(\d+):\s+(.+)/);
    if (m) {
      number = parseInt(m[1]);
      title = m[2].trim();
      bodyStart = i + 1;
      break;
    }
  }
  
  while (bodyStart < lines.length && lines[bodyStart].trim() === '') bodyStart++;
  
  const elements = [];
  let currentPara = '';
  let isFirst = true;
  
  function flushPara() {
    if (currentPara) {
      elements.push({ type: 'paragraph', text: inlineFormat(currentPara), isFirst });
      isFirst = false;
      currentPara = '';
    }
  }
  
  for (let i = bodyStart; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushPara();
      elements.push({ type: 'scene-break' });
      isFirst = true;
    } else if (trimmed === '') {
      flushPara();
    } else {
      currentPara = currentPara ? currentPara + ' ' + trimmed : trimmed;
    }
  }
  flushPara();
  
  return { number, title, elements };
}

// ============================================================
// STEP 2: Build HTML
// ============================================================

function chapterHTML(ch) {
  let html = `<section class="chapter">\n`;
  html += `  <div class="chapter-header">\n`;
  html += `    <div class="chapter-number">Kapitel ${ch.number}</div>\n`;
  html += `    <h2 class="chapter-title">${ch.title}</h2>\n`;
  html += `  </div>\n`;
  
  for (const el of ch.elements) {
    if (el.type === 'scene-break') {
      html += `  <div class="scene-break">*&ensp;*&ensp;*</div>\n`;
    } else {
      const cls = el.isFirst ? ' class="no-indent"' : '';
      html += `  <p${cls}>${el.text}</p>\n`;
    }
  }
  
  html += `</section>\n`;
  return html;
}

function buildDocument(parsedChapters) {
  const chaptersHTML = parsedChapters.map(ch => chapterHTML(ch)).join('\n');
  
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Auf fremdem Grund – Erik Reisig</title>
<style>
/* ============================
   PAGE SETUP
   Trimmed size: 135mm × 210mm
   With bleed: 145mm × 220mm (5mm each side)
   ============================ */

@page {
  size: 145mm 220mm;
  margin: 0;
}

/* Recto pages (odd = right): Bundsteg left, outer right */
@page :right {
  margin-top: 23mm;   /* 18mm + 5mm bleed */
  margin-bottom: 27mm; /* 22mm + 5mm bleed */
  margin-left: 25mm;   /* 20mm Bundsteg + 5mm bleed */
  margin-right: 20mm;  /* 15mm outer + 5mm bleed */

  @bottom-center {
    content: counter(page);
    font-family: 'EB Garamond', 'Georgia', serif;
    font-size: 9pt;
    font-variant-numeric: oldstyle-nums;
  }
}

/* Verso pages (even = left): outer left, Bundsteg right */
@page :left {
  margin-top: 23mm;
  margin-bottom: 27mm;
  margin-left: 20mm;   /* 15mm outer + 5mm bleed */
  margin-right: 25mm;  /* 20mm Bundsteg + 5mm bleed */

  @bottom-center {
    content: counter(page);
    font-family: 'EB Garamond', 'Georgia', serif;
    font-size: 9pt;
    font-variant-numeric: oldstyle-nums;
  }
}

/* No page numbers on titelei */
@page titelei {
  margin-top: 23mm;
  margin-bottom: 27mm;
  margin-left: 25mm;
  margin-right: 20mm;

  @bottom-center {
    content: none;
  }
}

/* Chapter opening pages: named page to suppress page number */
@page chapter-opening {
  @bottom-center {
    content: none;
  }
}

/* ============================
   RESET & BASE
   ============================ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'EB Garamond', 'Georgia', 'Liberation Serif', serif;
  font-size: 10.5pt;
  line-height: 1.45;
  color: #000;
  background: #fff;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga" 1, "kern" 1;
  counter-reset: page;
}

/* ============================
   TITELEI
   ============================ */
.titelei-page {
  page: titelei;
  page-break-after: always;
  page-break-inside: avoid;
  height: 100vh;
  display: flex;
  position: relative;
}

/* Schmutztitel - S.1 (recto) */
.schmutztitel-page {
  align-items: center;
  justify-content: center;
}

.schmutztitel {
  font-size: 16pt;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
}

/* Leere Seite */
.blank-page {
  page: titelei;
  page-break-after: always;
  height: 100vh;
}

/* Haupttitel - S.3 (recto) */
.haupttitel-page {
  align-items: center;
  justify-content: center;
}

.haupttitel {
  text-align: center;
}

.ht-title {
  font-size: 26pt;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.2;
  margin-bottom: 10mm;
}

.ht-subtitle {
  font-size: 12pt;
  font-style: italic;
  letter-spacing: 0.05em;
  margin-bottom: 18mm;
}

.ht-author {
  font-size: 14pt;
  letter-spacing: 0.1em;
  margin-bottom: 35mm;
}

.ht-publisher {
  font-size: 9pt;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* Impressum - S.4 (verso) */
.impressum-page {
  align-items: flex-end;
}

.impressum p {
  font-size: 8pt;
  line-height: 1.7;
  text-indent: 0 !important;
}

.imp-title {
  font-weight: bold;
}

.imp-spacer {
  height: 3mm;
}

.imp-imprint {
  font-style: italic;
}

/* Widmung - S.5 (recto) */
.widmung-page {
  align-items: center;
  justify-content: center;
}

.widmung {
  font-size: 13pt;
  font-style: italic;
  text-align: center;
  letter-spacing: 0.03em;
}

/* ============================
   CHAPTERS
   ============================ */
.chapter {
  break-before: right; /* Always start on recto (right/odd page) */
}

/* nothing here - chapter-opening handled by wrapper */

/* First chapter should not add an extra break after titelei blank page */

.chapter-header {
  padding-top: 50mm;
  margin-bottom: 14mm;
  text-align: center;
}

.chapter-number {
  font-size: 9pt;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  margin-bottom: 5mm;
  font-weight: 400;
}

.chapter-title {
  font-size: 20pt;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.02em;
}

/* Body text */
.chapter p {
  text-align: justify;
  text-indent: 5mm;
  margin: 0;
  widows: 2;
  orphans: 2;
  hyphens: auto;
  -webkit-hyphens: auto;
}

.chapter p.no-indent {
  text-indent: 0;
}

/* Scene break */
.scene-break {
  text-align: center;
  margin: 7mm 0;
  font-size: 11pt;
  letter-spacing: 0.3em;
  break-inside: avoid;
  break-after: avoid;
}

/* ============================
   CROP MARKS (via pseudo-elements on body)
   We'll add these in the PDF generation step
   ============================ */

</style>
</head>
<body>

<!-- TITELEI -->

<!-- S.1: Schmutztitel (recto) -->
<div class="titelei-page schmutztitel-page">
  <div class="schmutztitel">Auf fremdem Grund</div>
</div>

<!-- S.2: Leer (verso) -->
<div class="blank-page"></div>

<!-- S.3: Haupttitel (recto) -->
<div class="titelei-page haupttitel-page">
  <div class="haupttitel">
    <div class="ht-title">Auf fremdem<br>Grund</div>
    <div class="ht-subtitle">Ein Roman</div>
    <div class="ht-author">Erik Reisig</div>
    <div class="ht-publisher">TANSTAAFL Press</div>
  </div>
</div>

<!-- S.4: Impressum (verso) -->
<div class="titelei-page impressum-page">
  <div class="impressum">
    <p class="imp-title">Auf fremdem Grund</p>
    <p>Erik Reisig</p>
    <div class="imp-spacer"></div>
    <p>TANSTAAFL Press</p>
    <p>Ein Imprint der Erik Reisig Investment GmbH</p>
    <div class="imp-spacer"></div>
    <p class="imp-imprint">Dieses Buch wurde von einem Menschen erdacht<br>und mit einer Maschine geschrieben.<br>Keiner von beiden hätte es allein gekonnt.</p>
    <div class="imp-spacer"></div>
    <p class="imp-imprint">Erik Reisig &amp; Heimdall</p>
    <div class="imp-spacer"></div>
    <p>© 2026 Erik Reisig</p>
    <p>Alle Rechte vorbehalten.</p>
    <div class="imp-spacer"></div>
    <p>Druck und Bindung: Drukatava</p>
    <p>Printed in the EU</p>
  </div>
</div>

<!-- S.5: Widmung (recto) -->
<div class="titelei-page widmung-page">
  <div class="widmung">Für Klaus und Sophia.</div>
</div>

<!-- S.6: Leer (verso) -->
<div class="blank-page"></div>

<!-- KAPITEL -->
${chaptersHTML}

</body>
</html>`;
}

// ============================================================
// STEP 3: Generate PDF with Puppeteer
// ============================================================

async function generatePDF() {
  const puppeteer = require('puppeteer');
  
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
  });
  
  const page = await browser.newPage();
  
  // Load the HTML file
  const htmlPath = `file://${OUTPUT_HTML}`;
  console.log(`Loading ${htmlPath}...`);
  await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
  
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  console.log('Fonts loaded.');
  
  // Generate PDF
  console.log('Generating PDF...');
  await page.pdf({
    path: OUTPUT_PDF,
    width: '145mm',    // With bleed
    height: '220mm',   // With bleed
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    timeout: 300000    // 5 minutes
  });
  
  await browser.close();
  
  const stats = fs.statSync(OUTPUT_PDF);
  console.log(`\nPDF generated: ${OUTPUT_PDF}`);
  console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  // Parse chapters
  const rawChapters = readChapters();
  const parsedChapters = rawChapters.map(parseChapter);
  
  console.log('Chapters found:', parsedChapters.length);
  parsedChapters.forEach(ch => {
    console.log(`  Kapitel ${ch.number}: ${ch.title} (${ch.elements.length} elements)`);
  });
  
  // Build HTML
  const html = buildDocument(parsedChapters);
  fs.writeFileSync(OUTPUT_HTML, html, 'utf-8');
  console.log(`\nHTML generated: ${OUTPUT_HTML} (${(fs.statSync(OUTPUT_HTML).size / 1024).toFixed(1)} KB)`);
  
  // Generate PDF
  await generatePDF();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
