#!/usr/bin/env node
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const r2 = new S3Client({
  region: 'auto',
  endpoint: 'https://e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: 'fba6fd5a52259788403b98521e965376',
    secretAccessKey: 'ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e',
  },
});

const BUCKET = 'previews';
const PUBLIC_URL = 'https://assets.imr-media.de';

async function uploadFile(localPath, remotePath) {
  const content = fs.readFileSync(localPath);
  const contentType = localPath.endsWith('.webp') ? 'image/webp' : 
                      localPath.endsWith('.png') ? 'image/png' : 'application/octet-stream';

  await r2.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: remotePath,
    Body: content,
    ContentType: contentType,
  }));

  const url = `${PUBLIC_URL}/${remotePath}`;
  console.log(`✅ Uploaded: ${url}`);
  return url;
}

// Upload the file
const localFile = process.argv[2] || 'pin-1a-v1.webp';
const remotePath = `mein-malbuch/pinterest-pins/${path.basename(localFile)}`;

uploadFile(localFile, remotePath)
  .then(url => console.log(`\n🔗 Public URL: ${url}`))
  .catch(err => console.error('❌ Error:', err));
