#!/usr/bin/env node

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Read credentials from bashrc
const bashrc = fs.readFileSync(process.env.HOME + '/.bashrc', 'utf8');
const tokenMatch = bashrc.match(/CLOUDFLARE_API_TOKEN="([^"]+)"/);
const accountId = 'e1625bd206eaa162677dba0e5bc1569f';
const token = tokenMatch[1];

async function uploadFile(filePath, remoteName) {
  const fileBuffer = fs.readFileSync(filePath);
  const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');
  
  const url = `https://${accountId}.r2.cloudflarestorage.com/previews/der-waechter/${remoteName}`;
  
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'image/png',
      'x-amz-content-sha256': sha256,
      'x-amz-date': amzDate
    },
    body: fileBuffer
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed for ${remoteName}: ${response.status} ${text}`);
  }
  
  console.log(`✅ Uploaded: ${remoteName}`);
  return `https://assets.imr-media.de/der-waechter/${remoteName}`;
}

async function main() {
  const imagesDir = 'creative/images';
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));
  
  console.log(`Uploading ${files.length} images to R2...`);
  
  const urls = [];
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const url = await uploadFile(filePath, file);
    urls.push({ file, url });
  }
  
  console.log('\n📦 All images uploaded!');
  console.log('\nPublic URLs:');
  urls.forEach(({ file, url }) => {
    console.log(`${file}: ${url}`);
  });
  
  // Save URLs to file
  fs.writeFileSync('creative/image-urls.json', JSON.stringify(urls, null, 2));
  console.log('\n💾 URLs saved to creative/image-urls.json');
}

main().catch(console.error);
