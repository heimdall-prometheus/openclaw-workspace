#!/usr/bin/env node
/**
 * Generate PDF from HTML via Playwright Chromium.
 * Requires: HTTP server on localhost:8766 serving /tmp/lager-analyse.html
 * 
 * Usage:
 *   cd /tmp && python3 -m http.server 8766 &
 *   node skills/mein-schluessel-lager-report/scripts/gen-pdf.js [output-filename]
 *   pkill -f "http.server 8766"
 */
const playwright = require('/usr/lib/node_modules/openclaw/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const now = new Date();
const defaultName = `Lager-Einkaufsanalyse-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}.pdf`;
const outputName = process.argv[2] || defaultName;
const workspace = process.env.WORKSPACE || '/home/reisig/.openclaw/workspace';
const outputPath = path.join(workspace, 'projects/mein-schluessel', outputName);

(async () => {
  const browser = await playwright.chromium.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8766/lager-analyse.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '12mm', bottom: '15mm', left: '10mm', right: '10mm' },
    printBackground: true
  });
  
  const stats = fs.statSync(outputPath);
  console.log(`PDF: ${(stats.size / 1024).toFixed(0)} KB → ${outputPath}`);
  await browser.close();
})();
