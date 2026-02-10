#!/usr/bin/env node
// R2 Upload Script with AWS Signature V4 - Heimdall

const fs = require('fs');
const https = require('https');
const crypto = require('crypto');
const path = require('path');

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'fba6fd5a52259788403b98521e965376';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e';
const R2_ENDPOINT = 'e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com';
const R2_BUCKET = 'previews';
const REGION = 'auto'; // Cloudflare R2 uses 'auto'

// Usage: node r2-upload-v4.js <local-file> <r2-path>
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node r2-upload-v4.js <local-file> <r2-path>');
  console.error('Example: node r2-upload-v4.js file.pdf becker-odoo/file.pdf');
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

// AWS SigV4 helper functions
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function hmac(key, data) {
  return crypto.createHmac('sha256', key).update(data).digest();
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = hmac('AWS4' + key, dateStamp);
  const kRegion = hmac(kDate, regionName);
  const kService = hmac(kRegion, serviceName);
  const kSigning = hmac(kService, 'aws4_request');
  return kSigning;
}

// Request setup
const now = new Date();
const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, ''); // 20260205T154700Z
const dateStamp = amzDate.substr(0, 8); // 20260205

const host = `${R2_BUCKET}.${R2_ENDPOINT}`;
const uploadPath = `/${r2Path}`;
const service = 's3';

// Calculate payload hash
const payloadHash = sha256(fileContent);

// Canonical request
const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
const canonicalRequest = [
  'PUT',
  uploadPath,
  '', // query string
  canonicalHeaders,
  signedHeaders,
  payloadHash
].join('\n');

// String to sign
const credentialScope = `${dateStamp}/${REGION}/${service}/aws4_request`;
const stringToSign = [
  'AWS4-HMAC-SHA256',
  amzDate,
  credentialScope,
  sha256(canonicalRequest)
].join('\n');

// Calculate signature
const signingKey = getSignatureKey(R2_SECRET_ACCESS_KEY, dateStamp, REGION, service);
const signature = hmac(signingKey, stringToSign).toString('hex');

// Authorization header
const authorization = `AWS4-HMAC-SHA256 Credential=${R2_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

const options = {
  hostname: host,
  port: 443,
  path: uploadPath,
  method: 'PUT',
  headers: {
    'Host': host,
    'Content-Type': contentType,
    'Content-Length': contentLength,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
    'Authorization': authorization,
  },
};

console.log(`📤 Uploading ${localFile} → ${r2Path}`);
console.log(`   Size: ${(contentLength / 1024).toFixed(2)} KB`);
console.log(`   Type: ${contentType}`);

const req = https.request(options, (res) => {
  console.log(`   Status: ${res.statusCode}`);
  
  let responseData = '';
  res.on('data', (d) => {
    responseData += d.toString();
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      const publicUrl = `https://assets.imr-media.de/${r2Path}`;
      console.log(`✅ Upload successful!`);
      console.log(`\n📎 Public URL:\n${publicUrl}`);
    } else {
      console.error('❌ Upload failed');
      console.error(responseData);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Error:', e);
  process.exit(1);
});

req.write(fileContent);
req.end();
