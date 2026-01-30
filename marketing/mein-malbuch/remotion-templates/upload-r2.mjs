import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';

const client = new S3Client({
  region: 'auto',
  endpoint: 'https://e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: 'fba6fd5a52259788403b98521e965376',
    secretAccessKey: 'ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e',
  },
});

async function uploadVideo(localPath, r2Key) {
  const body = readFileSync(localPath);
  await client.send(new PutObjectCommand({
    Bucket: 'previews',
    Key: r2Key,
    Body: body,
    ContentType: 'video/mp4',
  }));
  return `https://assets.imr-media.de/${r2Key}`;
}

const [,, localPath, r2Key] = process.argv;
if (!localPath || !r2Key) {
  console.log('Usage: node upload-r2.mjs <localPath> <r2Key>');
  process.exit(1);
}

uploadVideo(localPath, r2Key)
  .then(url => console.log('✅ Uploaded:', url))
  .catch(err => console.error('❌ Error:', err));
