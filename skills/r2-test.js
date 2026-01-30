#!/usr/bin/env node
// Quick R2 Upload Test - Heimdall

const https = require('https');
const crypto = require('crypto');

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'fba6fd5a52259788403b98521e965376';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e';
const R2_ENDPOINT = 'e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com';
const R2_BUCKET = 'previews';

// Test: Upload small text file
const testContent = `Heimdall R2 Test - ${new Date().toISOString()}`;
const fileName = `tests/heimdall-test-${Date.now()}.txt`;

const host = `${R2_BUCKET}.${R2_ENDPOINT}`;
const path = `/${fileName}`;
const date = new Date().toUTCString();

const stringToSign = `PUT\n\ntext/plain\n${date}\n/${R2_BUCKET}${path}`;
const signature = crypto
  .createHmac('sha1', R2_SECRET_ACCESS_KEY)
  .update(stringToSign)
  .digest('base64');

const options = {
  hostname: host,
  port: 443,
  path: path,
  method: 'PUT',
  headers: {
    'Host': host,
    'Date': date,
    'Content-Type': 'text/plain',
    'Content-Length': testContent.length,
    'Authorization': `AWS ${R2_ACCESS_KEY_ID}:${signature}`,
  },
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log(`✅ Upload successful!`);
    console.log(`Public URL: https://assets.imr-media.de/${fileName}`);
  }
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (e) => {
  console.error('❌ Error:', e);
});

req.write(testContent);
req.end();
