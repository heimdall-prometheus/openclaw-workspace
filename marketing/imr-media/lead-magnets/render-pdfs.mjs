import puppeteer from 'puppeteer';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function renderPDF(htmlFile, outputFile) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  const htmlPath = `file://${join(__dirname, 'html', htmlFile)}`;
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: join(__dirname, 'pdf', outputFile),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  
  await browser.close();
  console.log(`✅ Created: ${outputFile}`);
}

async function main() {
  // Create pdf directory
  const { mkdir } = await import('fs/promises');
  await mkdir(join(__dirname, 'pdf'), { recursive: true });
  
  const versions = [
    ['v1-klassiker.html', 'v1-klassiker.pdf'],
    ['v2-warm.html', 'v2-warm-persoenlich.pdf'],
    ['v3-guide.html', 'v3-guide.pdf'],
    ['v4-onepager.html', 'v4-onepager.pdf'],
    ['v5-workbook.html', 'v5-workbook.pdf'],
  ];
  
  for (const [html, pdf] of versions) {
    try {
      await renderPDF(html, pdf);
    } catch (err) {
      console.error(`❌ Error rendering ${html}:`, err.message);
    }
  }
}

main();
