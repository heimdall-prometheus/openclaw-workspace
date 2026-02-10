#!/usr/bin/env node
/**
 * Generate print-ready interior HTML for "Auf fremdem Grund"
 * Converts Markdown chapters to professionally typeset HTML
 * for wkhtmltopdf conversion.
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');
const OUTPUT_HTML = path.join(__dirname, 'interior.html');

// Read all chapter files in order
const chapterFiles = [];
for (let i = 1; i <= 14; i++) {
  const num = String(i).padStart(2, '0');
  const files = fs.readdirSync(CHAPTERS_DIR).filter(f => f.startsWith(`kapitel-${num}-`));
  if (files.length > 0) {
    chapterFiles.push(path.join(CHAPTERS_DIR, files[0]));
  }
}

function parseMarkdownToHTML(md) {
  // Remove the chapter heading (we handle it separately)
  const lines = md.split('\n');
  let bodyStart = 0;
  let chapterTitle = '';
  
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^#\s+Kapitel\s+(\d+):\s+(.+)/);
    if (match) {
      chapterTitle = { number: parseInt(match[1]), title: match[2].trim() };
      bodyStart = i + 1;
      break;
    }
  }
  
  // Skip empty lines after heading
  while (bodyStart < lines.length && lines[bodyStart].trim() === '') {
    bodyStart++;
  }
  
  const bodyLines = lines.slice(bodyStart);
  
  // Convert markdown to HTML paragraphs
  let html = '';
  let currentParagraph = '';
  let isFirstParagraph = true;
  
  for (const line of bodyLines) {
    const trimmed = line.trim();
    
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      // Scene break
      if (currentParagraph) {
        html += formatParagraph(currentParagraph, isFirstParagraph);
        isFirstParagraph = false;
        currentParagraph = '';
      }
      html += '<div class="scene-break">⁂</div>\n';
      isFirstParagraph = true; // First para after scene break has no indent
    } else if (trimmed === '') {
      // End of paragraph
      if (currentParagraph) {
        html += formatParagraph(currentParagraph, isFirstParagraph);
        isFirstParagraph = false;
        currentParagraph = '';
      }
    } else {
      // Continue paragraph
      if (currentParagraph) {
        currentParagraph += ' ' + trimmed;
      } else {
        currentParagraph = trimmed;
      }
    }
  }
  
  // Flush last paragraph
  if (currentParagraph) {
    html += formatParagraph(currentParagraph, isFirstParagraph);
  }
  
  return { chapterTitle, html };
}

function formatParagraph(text, isFirst) {
  // Convert markdown inline formatting
  // Bold: **text** or __text__
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
  // Italic: *text* or _text_
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Don't convert underscores in the middle of words
  text = text.replace(/(?<!\w)_(.+?)_(?!\w)/g, '<em>$1</em>');
  // Em-dash
  text = text.replace(/---/g, '—');
  text = text.replace(/--/g, '–');
  // Typographic quotes (German)
  // „text" is already in the source, leave as-is
  
  const cls = isFirst ? 'first-paragraph' : '';
  return `<p${cls ? ` class="${cls}"` : ''}>${text}</p>\n`;
}

// Build complete HTML
function buildHTML(chapters) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<style>
@page {
  size: 135mm 210mm;
  margin: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'EB Garamond', 'Liberation Serif', 'Georgia', serif;
  font-size: 10.5pt;
  line-height: 1.45;
  color: #000;
  -webkit-font-smoothing: antialiased;
  widows: 2;
  orphans: 2;
}

/* Page container - simulates the trimmed page */
.page {
  width: 135mm;
  height: 210mm;
  position: relative;
  overflow: hidden;
  page-break-after: always;
  page-break-inside: avoid;
}

/* Content area within margins */
.page-content {
  position: absolute;
  top: 18mm;
  bottom: 22mm;
  overflow: hidden;
}

.page-content.recto {
  left: 20mm;  /* Bundsteg (inner) */
  right: 15mm; /* Outer */
}

.page-content.verso {
  left: 15mm;  /* Outer */
  right: 20mm; /* Bundsteg (inner) */
}

/* ==================== TITELEI ==================== */

/* Seite 1: Schmutztitel */
.schmutztitel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.schmutztitel h1 {
  font-size: 16pt;
  font-weight: normal;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
}

/* Seite 2: Leer */
.blank-page {
  /* intentionally blank */
}

/* Seite 3: Haupttitel */
.haupttitel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.haupttitel h1 {
  font-size: 24pt;
  font-weight: normal;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8mm;
  line-height: 1.2;
}

.haupttitel .subtitle {
  font-size: 12pt;
  font-style: italic;
  margin-bottom: 15mm;
  letter-spacing: 0.05em;
}

.haupttitel .author {
  font-size: 14pt;
  letter-spacing: 0.1em;
  margin-bottom: 25mm;
}

.haupttitel .publisher {
  font-size: 10pt;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Seite 4: Impressum */
.impressum {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 5mm;
}

.impressum p {
  font-size: 8pt;
  line-height: 1.5;
  margin-bottom: 2mm;
  text-indent: 0 !important;
}

.impressum .imprint-text {
  font-style: italic;
  margin-top: 4mm;
  margin-bottom: 4mm;
}

/* Seite 5: Widmung */
.widmung {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.widmung p {
  font-size: 12pt;
  font-style: italic;
  text-align: center;
  text-indent: 0 !important;
}

/* ==================== KAPITEL ==================== */

.chapter-start {
  padding-top: 50mm;
}

.chapter-number {
  font-size: 10pt;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  text-align: center;
  margin-bottom: 3mm;
  font-weight: normal;
}

.chapter-title {
  font-size: 18pt;
  font-weight: normal;
  text-align: center;
  margin-bottom: 12mm;
  line-height: 1.3;
}

.chapter-body p {
  text-align: justify;
  text-indent: 5mm;
  margin-bottom: 0;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.chapter-body p.first-paragraph {
  text-indent: 0;
}

.scene-break {
  text-align: center;
  margin: 5mm 0;
  font-size: 12pt;
  letter-spacing: 0.5em;
}

/* ==================== SEITENZAHLEN ==================== */

.page-number {
  position: absolute;
  bottom: 8mm;
  font-size: 9pt;
  font-variant-numeric: oldstyle-nums;
}

.page-number.recto {
  right: 15mm;
}

.page-number.verso {
  left: 15mm;
}

.page-number.center {
  left: 0;
  right: 0;
  text-align: center;
}

/* Running header */
.running-header {
  position: absolute;
  top: 10mm;
  font-size: 8pt;
  letter-spacing: 0.05em;
  font-variant: small-caps;
}

.running-header.recto {
  right: 15mm;
}

.running-header.verso {
  left: 15mm;
}

</style>
</head>
<body>

${chapters}

</body>
</html>`;
}

// Build pages
let pages = [];
let currentPage = 1;

// Helper to add a page
function addPage(content, options = {}) {
  const { noPageNumber, isRecto, pageNum, runningHeader, isChapterStart } = options;
  const side = isRecto !== undefined ? (isRecto ? 'recto' : 'verso') : (currentPage % 2 === 1 ? 'recto' : 'verso');
  
  let pageHTML = `<div class="page">\n`;
  
  // Running header (not on titelei, not on chapter start pages)
  if (runningHeader && !isChapterStart) {
    pageHTML += `  <div class="running-header ${side}">${runningHeader}</div>\n`;
  }
  
  pageHTML += `  <div class="page-content ${side}">\n`;
  pageHTML += `    ${content}\n`;
  pageHTML += `  </div>\n`;
  
  // Page number
  if (!noPageNumber) {
    pageHTML += `  <div class="page-number center">${pageNum || currentPage}</div>\n`;
  }
  
  pageHTML += `</div>\n`;
  
  pages.push(pageHTML);
  currentPage++;
}

// === TITELEI ===

// Seite 1: Schmutztitel (recto, ungerade, keine Seitenzahl)
addPage(`<div class="schmutztitel"><h1>Auf fremdem Grund</h1></div>`, { noPageNumber: true });

// Seite 2: Leer (verso)
addPage(`<div class="blank-page"></div>`, { noPageNumber: true });

// Seite 3: Haupttitel (recto)
addPage(`<div class="haupttitel">
  <h1>Auf fremdem<br>Grund</h1>
  <div class="subtitle">Ein Roman</div>
  <div class="author">Erik Reisig</div>
  <div class="publisher">TANSTAAFL Press</div>
</div>`, { noPageNumber: true });

// Seite 4: Impressum (verso)
addPage(`<div class="impressum">
  <p><strong>Auf fremdem Grund</strong></p>
  <p>Erik Reisig</p>
  <p>&nbsp;</p>
  <p>TANSTAAFL Press</p>
  <p>Ein Imprint der Erik Reisig Investment GmbH</p>
  <p>&nbsp;</p>
  <p class="imprint-text">Dieses Buch wurde von einem Menschen erdacht und mit einer Maschine geschrieben. Keiner von beiden hätte es allein gekonnt.<br>Erik Reisig &amp; Heimdall</p>
  <p>&nbsp;</p>
  <p>© 2026 Erik Reisig</p>
  <p>Alle Rechte vorbehalten.</p>
  <p>&nbsp;</p>
  <p>Druck: Drukatava</p>
  <p>Printed in the EU</p>
</div>`, { noPageNumber: true });

// Seite 5: Widmung (recto)
addPage(`<div class="widmung"><p>Für Klaus und Sophia.</p></div>`, { noPageNumber: true });

// Seite 6: Leer (verso)
addPage(`<div class="blank-page"></div>`, { noPageNumber: true });

// === KAPITEL ===
// Seite 7 = start of chapter content, recto (ungerade) ✓
// Page numbering starts at 7

let chapterPageNumber = 7;

for (const chapterFile of chapterFiles) {
  const md = fs.readFileSync(chapterFile, 'utf-8');
  const { chapterTitle, html } = parseMarkdownToHTML(md);
  
  // Ensure chapter starts on recto (odd page)
  if (currentPage % 2 === 0) {
    // We're on a verso page position, need to add blank verso first
    addPage(`<div class="blank-page"></div>`, { noPageNumber: true });
    chapterPageNumber++;
  }
  
  // Chapter start page (recto, no page number per convention)
  const chapterContent = `<div class="chapter-start">
  <div class="chapter-number">Kapitel ${chapterTitle.number}</div>
  <h2 class="chapter-title">${chapterTitle.title}</h2>
  <div class="chapter-body">
${html}
  </div>
</div>`;
  
  // For the chapter, we output it as one continuous flow
  // wkhtmltopdf will handle the page breaks within the chapter
  addPage(chapterContent, { 
    noPageNumber: true, // Chapter start page has no number
    isChapterStart: true,
    runningHeader: chapterTitle.title
  });
  
  chapterPageNumber++;
}

// Pad to multiple of 4
while (currentPage % 4 !== 1) {
  addPage(`<div class="blank-page"></div>`, { noPageNumber: true });
}

const fullHTML = buildHTML(pages.join('\n'));
fs.writeFileSync(OUTPUT_HTML, fullHTML, 'utf-8');
console.log(`Generated ${OUTPUT_HTML}`);
console.log(`Total pages: ${currentPage - 1}`);
