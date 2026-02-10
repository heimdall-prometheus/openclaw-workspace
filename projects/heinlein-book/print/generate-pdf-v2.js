#!/usr/bin/env node
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const WORKSPACE = '/home/reisig/.openclaw/workspace';
const HTML_PATH = path.join(WORKSPACE, 'projects/heinlein-book/print/interior-illustrated-v2.html');
const PDF_PATH = path.join(WORKSPACE, 'projects/heinlein-book/print/interior-illustrated-v2.pdf');

(async () => {
  // Read HTML and embed all images as base64 data URIs
  console.log('Reading and processing HTML...');
  let html = fs.readFileSync(HTML_PATH, 'utf8');

  // Replace all file:///... image sources with base64 data URIs
  const imgRegex = /src="file:\/\/\/(.*?)"/g;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const filePath = '/' + match[1];
    if (fs.existsSync(filePath)) {
      const imgData = fs.readFileSync(filePath);
      const base64 = imgData.toString('base64');
      const ext = path.extname(filePath).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
      html = html.replace(`file:///${match[1]}`, `data:${mime};base64,${base64}`);
      console.log(`  Embedded: ${path.basename(filePath)} (${(imgData.length/1024).toFixed(0)} KB)`);
      // Reset regex since we modified the string
      imgRegex.lastIndex = 0;
    } else {
      console.log(`  WARNING: Not found: ${filePath}`);
    }
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(300000);

  console.log('Setting content...');
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 120000 });

  // Wait for fonts
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 2000));

  console.log('Generating PDF (this may take a few minutes)...');
  await page.pdf({
    path: PDF_PATH,
    width: '145mm',
    height: '220mm',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    timeout: 300000
  });

  const stat = fs.statSync(PDF_PATH);
  console.log(`PDF created: ${PDF_PATH}`);
  console.log(`Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);

  // Check page count
  const { execSync } = require('child_process');
  try {
    const pageCount = execSync(`pdfinfo "${PDF_PATH}" | grep Pages | awk '{print $2}'`).toString().trim();
    console.log(`Page count: ${pageCount}`);
    const pages = parseInt(pageCount);
    if (pages % 4 === 0) {
      console.log('✅ Page count is divisible by 4!');
    } else {
      console.log(`⚠️ Page count ${pages} is NOT divisible by 4! Need ${4 - (pages % 4)} more blank pages.`);
    }
  } catch (e) {
    console.log('Could not check page count:', e.message);
  }

  await browser.close();
  console.log('Done.');
})();
