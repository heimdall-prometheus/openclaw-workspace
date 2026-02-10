#!/usr/bin/env node
/**
 * Build cover-spread-v2.pdf and preview-cover-v2.png
 * Spine: 19.3mm | Total: 325.3mm × 220mm | Bleed: 5mm
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const http = require('http');

(async () => {
  const htmlPath = path.resolve(__dirname, 'cover-spread-v2.html');
  const pdfPath = path.resolve(__dirname, 'cover-spread-v2.pdf');
  const pngPath = path.resolve(__dirname, 'preview-cover-v2.png');
  const baseDir = path.dirname(htmlPath);

  // Dimensions in mm
  const WIDTH_MM = 325.3;
  const HEIGHT_MM = 220;

  console.log(`Cover spread: ${WIDTH_MM}mm × ${HEIGHT_MM}mm`);
  console.log(`Spine: 19.3mm | Back: 153mm | Front: 153mm`);

  // Serve files via HTTP to avoid file:// access issues
  const server = http.createServer((req, res) => {
    let filePath = path.join(baseDir, decodeURIComponent(req.url));
    if (!fs.existsSync(filePath)) {
      // Try workspace root for absolute paths
      filePath = path.join('/home/reisig/.openclaw/workspace', decodeURIComponent(req.url));
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
        '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2'
      };
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found: ' + req.url);
    }
  });
  
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  console.log(`Local server on port ${port}`);

  // Read HTML and rewrite file:// URLs to http://
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  htmlContent = htmlContent.replace(
    /url\(['"]?file:\/\/\/home\/reisig\/\.openclaw\/workspace\/([^'")]+)['"]?\)/g,
    (match, p1) => `url('http://127.0.0.1:${port}/${p1}')`
  );
  // Write temp HTML
  const tmpHtml = path.join(baseDir, '_tmp_cover.html');
  fs.writeFileSync(tmpHtml, htmlContent);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Set viewport to match spread at 96dpi (1mm ≈ 3.7795px)
  const PX_PER_MM = 3.7795275591;
  const vpWidth = Math.ceil(WIDTH_MM * PX_PER_MM);
  const vpHeight = Math.ceil(HEIGHT_MM * PX_PER_MM);

  await page.setViewport({ width: vpWidth, height: vpHeight, deviceScaleFactor: 2 });
  await page.goto(`http://127.0.0.1:${port}/_tmp_cover.html`, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts and images
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  // Generate PDF with exact mm dimensions
  await page.pdf({
    path: pdfPath,
    width: `${WIDTH_MM}mm`,
    height: `${HEIGHT_MM}mm`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true
  });
  console.log(`✅ PDF: ${pdfPath}`);

  // Generate preview PNG
  await page.screenshot({
    path: pngPath,
    fullPage: true,
    type: 'png'
  });
  console.log(`✅ PNG: ${pngPath}`);

  await browser.close();
  server.close();
  // Cleanup temp file
  try { fs.unlinkSync(tmpHtml); } catch(e) {}
  console.log('Done!');
})();
