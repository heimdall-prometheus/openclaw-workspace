#!/usr/bin/env node
// R2 Upload Script - Heimdall

const fs = require('fs');
const https = require('https');
const crypto = require('crypto');
const path = require('path');

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'fba6fd5a52259788403b98521e965376';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e';
const R2_ENDPOINT = 'e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com';
const R2_BUCKET = 'previews';

// Usage: node r2-upload.js <local-file> <r2-path>
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node r2-upload.js <local-file> <r2-path>');
  console.error('Example: node r2-upload.js file.pdf becker-odoo/file.pdf');
  process.exit(1);
}

const localFile = args[0];
const r2Path = args[1];

if (!fs.existsSync(localFile)) {
  console.error(`❌ File not found: ${localFile}`);
  process.exit(1);
}

// Determine content type
const ext = path.extname(localFile).toLowerCase();
const contentTypes = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.txt': 'text/plain',
  '.html': 'text/html',
  '.json': 'application/json',
};
const contentType = contentTypes[ext] || 'application/octet-stream';

// Read file
const fileContent = fs.readFileSync(localFile);
const contentLength = fileContent.length;

const host = `${R2_BUCKET}.${R2_ENDPOINT}`;
const uploadPath = `/${r2Path}`;
const date = new Date().toUTCString();

const stringToSign = `PUT\n\n${contentType}\n${date}\n/${R2_BUCKET}${uploadPath}`;
const signature = crypto
  .createHmac('sha1', R2_SECRET_ACCESS_KEY)
  .update(stringToSign)
  .digest('base64');

const options = {
  hostname: host,
  port: 443,
  path: uploadPath,
  method: 'PUT',
  headers: {
    'Host': host,
    'Date': date,
    'Content-Type': contentType,
    'Content-Length': contentLength,
    'Authorization': `AWS ${R2_ACCESS_KEY_ID}:${signature}`,
  },
};

console.log(`📤 Uploading ${localFile} → ${r2Path}`);
console.log(`   Size: ${(contentLength / 1024).toFixed(2)} KB`);
console.log(`   Type: ${contentType}`);

const req = https.request(options, (res) => {
  console.log(`   Status: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    const publicUrl = `https://assets.imr-media.de/${r2Path}`;
    console.log(`✅ Upload successful!`);
    console.log(`\n📎 Public URL:\n${publicUrl}`);
  } else {
    console.error('❌ Upload failed');
    res.on('data', (d) => process.stderr.write(d));
  }
});

req.on('error', (e) => {
  console.error('❌ Error:', e);
  process.exit(1);
});

req.write(fileContent);
req.end();
