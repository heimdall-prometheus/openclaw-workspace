#!/usr/bin/env node
// R2 Upload for Heimdall Theme

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const R2_ACCESS_KEY_ID = 'fba6fd5a52259788403b98521e965376';
const R2_SECRET_ACCESS_KEY = 'ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e';
const R2_ENDPOINT = 'e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com';
const R2_BUCKET = 'previews';

const localFile = process.argv[2] || 'output/heimdall-theme-v1.mp3';
const remotePath = process.argv[3] || 'heimdall/heimdall-theme-v1.mp3';

const fileContent = fs.readFileSync(localFile);
const contentType = 'audio/mpeg';

const host = `${R2_BUCKET}.${R2_ENDPOINT}`;
const urlPath = `/${remotePath}`;
const date = new Date().toUTCString();

const stringToSign = `PUT\n\n${contentType}\n${date}\n/${R2_BUCKET}${urlPath}`;
const signature = crypto
  .createHmac('sha1', R2_SECRET_ACCESS_KEY)
  .update(stringToSign)
  .digest('base64');

const options = {
  hostname: host,
  port: 443,
  path: urlPath,
  method: 'PUT',
  headers: {
    'Host': host,
    'Date': date,
    'Content-Type': contentType,
    'Content-Length': fileContent.length,
    'Authorization': `AWS ${R2_ACCESS_KEY_ID}:${signature}`,
  },
};

console.log(`Uploading ${localFile} (${(fileContent.length/1024/1024).toFixed(2)} MB)...`);

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log(`✅ Upload successful!`);
    console.log(`Public URL: https://assets.imr-media.de/${remotePath}`);
  } else {
    res.on('data', (d) => process.stdout.write(d));
  }
});

req.on('error', (e) => {
  console.error('❌ Error:', e);
});

req.write(fileContent);
req.end();
