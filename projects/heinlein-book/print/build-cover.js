#!/usr/bin/env node
/**
 * Build cover spread PDF for "Auf fremdem Grund"
 * Layout: Back Cover | Spine | Front Cover
 * With 5mm bleed on all sides
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// ============================================================
// DIMENSIONS (all in mm)
// ============================================================
const TRIM_W = 135;      // Trimmed cover width
const TRIM_H = 210;      // Trimmed cover height
const BLEED = 5;          // Bleed on all sides
const SPINE_W = 22;       // Spine width (284 pages, 80g cream, hardcover)

// Full spread dimensions with bleed
const FRONT_W = TRIM_W + BLEED; // 140mm (bleed only on outer edge, spine edge is exact)
const BACK_W = TRIM_W + BLEED;  // 140mm
const TOTAL_W = BLEED + TRIM_W + SPINE_W + TRIM_W + BLEED; // 5+135+22+135+5 = 302mm  
const TOTAL_H = TRIM_H + 2 * BLEED; // 220mm

const COVER_IMG = path.resolve(__dirname, 'cover-v1-upscaled.png');
const COVER_IMG_FALLBACK = path.resolve(__dirname, '..', '..', 'generated-images', 'book-covers', 'cover-v1.jpg');
const OUTPUT_HTML = path.join(__dirname, 'cover-spread.html');
const OUTPUT_PDF = path.join(__dirname, 'cover-spread.pdf');

// Use upscaled if available, otherwise original
const coverImg = fs.existsSync(COVER_IMG) ? COVER_IMG : COVER_IMG_FALLBACK;
console.log(`Using cover image: ${coverImg}`);

const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<style>
@page {
  size: ${TOTAL_W}mm ${TOTAL_H}mm;
  margin: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: 'EB Garamond';
  src: local('EB Garamond');
}

body {
  width: ${TOTAL_W}mm;
  height: ${TOTAL_H}mm;
  position: relative;
  overflow: hidden;
  font-family: 'EB Garamond', 'Georgia', serif;
  color: #fff;
}

/* ============================
   BACKGROUND
   ============================ */

/* Dark sea-blue background for back cover and spine */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0a1628;
}

/* Front cover image */
.front-cover-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: ${TRIM_W + BLEED}mm; /* front cover + right bleed */
  height: 100%;
  background-image: url('file://${coverImg}');
  background-size: cover;
  background-position: center;
}

/* Gradient overlay on front cover for text readability */
.front-cover-gradient {
  position: absolute;
  top: 0;
  right: 0;
  width: ${TRIM_W + BLEED}mm;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.6) 0%,
    rgba(0,0,0,0.1) 25%,
    rgba(0,0,0,0.0) 40%,
    rgba(0,0,0,0.0) 70%,
    rgba(0,0,0,0.5) 90%,
    rgba(0,0,0,0.7) 100%
  );
}

/* ============================
   FRONT COVER TEXT
   ============================ */
.front-cover {
  position: absolute;
  top: 0;
  right: 0;
  width: ${TRIM_W + BLEED}mm;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${BLEED + 15}mm ${BLEED + 12}mm ${BLEED + 12}mm ${12}mm;
  z-index: 10;
}

.front-title-area {
  text-align: center;
}

.front-subtitle {
  font-size: 10pt;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 5mm;
  opacity: 0.9;
}

.front-title {
  font-size: 32pt;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.15;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
}

.front-author-area {
  text-align: center;
}

.front-author {
  font-size: 14pt;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-shadow: 1px 1px 6px rgba(0,0,0,0.8);
}

/* ============================
   SPINE
   ============================ */
.spine {
  position: absolute;
  top: 0;
  left: ${BLEED + TRIM_W}mm;
  width: ${SPINE_W}mm;
  height: 100%;
  background: #0a1628;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.spine-content {
  transform: rotate(90deg);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8mm;
}

.spine-title {
  font-size: 10pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.spine-author {
  font-size: 8pt;
  letter-spacing: 0.08em;
}

.spine-publisher {
  font-size: 6pt;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.spine-divider {
  width: 1px;
  height: 3mm;
  background: rgba(255,255,255,0.5);
  transform: rotate(90deg);
}

/* ============================
   BACK COVER
   ============================ */
.back-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: ${BLEED + TRIM_W}mm;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${BLEED + 25}mm ${15}mm ${BLEED + 25}mm ${BLEED + 15}mm;
  z-index: 10;
}

.back-blurb {
  font-size: 11pt;
  line-height: 1.6;
  color: #d0d8e8;
  font-style: italic;
  margin-bottom: 15mm;
  text-align: justify;
}

.back-publisher {
  font-size: 8pt;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8898b8;
  margin-bottom: 8mm;
}

.back-isbn {
  font-size: 8pt;
  color: #687898;
}

/* Subtle decorative line on back cover */
.back-divider {
  width: 30mm;
  height: 0.5px;
  background: rgba(255,255,255,0.3);
  margin-bottom: 10mm;
}

/* ============================
   CROP MARKS
   ============================ */
.crop-mark {
  position: absolute;
  background: #000;
  z-index: 100;
}

/* Top-left corner */
.crop-tl-h { top: ${BLEED}mm; left: 0; width: 3mm; height: 0.25pt; }
.crop-tl-v { top: 0; left: ${BLEED}mm; width: 0.25pt; height: 3mm; }

/* Top-right corner */
.crop-tr-h { top: ${BLEED}mm; right: 0; width: 3mm; height: 0.25pt; }
.crop-tr-v { top: 0; right: ${BLEED}mm; width: 0.25pt; height: 3mm; }

/* Bottom-left corner */
.crop-bl-h { bottom: ${BLEED}mm; left: 0; width: 3mm; height: 0.25pt; }
.crop-bl-v { bottom: 0; left: ${BLEED}mm; width: 0.25pt; height: 3mm; }

/* Bottom-right corner */
.crop-br-h { bottom: ${BLEED}mm; right: 0; width: 3mm; height: 0.25pt; }
.crop-br-v { bottom: 0; right: ${BLEED}mm; width: 0.25pt; height: 3mm; }

/* Spine fold marks */
.crop-spine-l-t { top: 0; left: ${BLEED + TRIM_W}mm; width: 0.25pt; height: 3mm; }
.crop-spine-l-b { bottom: 0; left: ${BLEED + TRIM_W}mm; width: 0.25pt; height: 3mm; }
.crop-spine-r-t { top: 0; left: ${BLEED + TRIM_W + SPINE_W}mm; width: 0.25pt; height: 3mm; }
.crop-spine-r-b { bottom: 0; left: ${BLEED + TRIM_W + SPINE_W}mm; width: 0.25pt; height: 3mm; }

</style>
</head>
<body>

<!-- Background -->
<div class="background"></div>

<!-- Front cover image -->
<div class="front-cover-bg"></div>
<div class="front-cover-gradient"></div>

<!-- Front cover text -->
<div class="front-cover">
  <div class="front-title-area">
    <div class="front-subtitle">Ein Roman</div>
    <div class="front-title">Auf fremdem<br>Grund</div>
  </div>
  <div class="front-author-area">
    <div class="front-author">Erik Reisig</div>
  </div>
</div>

<!-- Spine -->
<div class="spine">
  <div class="spine-content">
    <span class="spine-author">Erik Reisig</span>
    <span class="spine-divider"></span>
    <span class="spine-title">Auf fremdem Grund</span>
    <span class="spine-divider"></span>
    <span class="spine-publisher">TANSTAAFL Press</span>
  </div>
</div>

<!-- Back cover -->
<div class="back-cover">
  <div class="back-divider"></div>
  <div class="back-blurb">
    Ein deutscher Ingenieur kauft eine ausgemusterte Ölplattform in der Nordsee, 
    schleppt sie in internationale Gewässer und gründet den ersten souveränen 
    Stadtstaat auf dem offenen Meer&nbsp;— gegen den Widerstand von Regierungen, 
    der UN und seiner eigenen Investoren.
  </div>
  <div class="back-publisher">TANSTAAFL Press</div>
  <div class="back-isbn">ISBN 000-0-00-000000-0</div>
</div>

<!-- Crop marks -->
<div class="crop-mark crop-tl-h"></div>
<div class="crop-mark crop-tl-v"></div>
<div class="crop-mark crop-tr-h"></div>
<div class="crop-mark crop-tr-v"></div>
<div class="crop-mark crop-bl-h"></div>
<div class="crop-mark crop-bl-v"></div>
<div class="crop-mark crop-br-h"></div>
<div class="crop-mark crop-br-v"></div>
<div class="crop-mark crop-spine-l-t"></div>
<div class="crop-mark crop-spine-l-b"></div>
<div class="crop-mark crop-spine-r-t"></div>
<div class="crop-mark crop-spine-r-b"></div>

</body>
</html>`;

// Write HTML
fs.writeFileSync(OUTPUT_HTML, html, 'utf-8');
console.log(`Cover HTML generated: ${OUTPUT_HTML}`);

// Generate PDF
async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto(`file://${OUTPUT_HTML}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  
  await page.pdf({
    path: OUTPUT_PDF,
    width: `${TOTAL_W}mm`,
    height: `${TOTAL_H}mm`,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    timeout: 60000
  });
  
  await browser.close();
  console.log(`Cover PDF generated: ${OUTPUT_PDF}`);
  console.log(`Dimensions: ${TOTAL_W}mm × ${TOTAL_H}mm`);
  console.log(`Spine: ${SPINE_W}mm`);
}

generatePDF().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
