import * as fal from '@fal-ai/serverless-client';
import { writeFileSync, readFileSync } from 'fs';

// Configure fal.ai
fal.config({
  credentials: process.env.FAL_AI_KEY
});

async function generateOmniHuman() {
  console.log('🎬 Starting OmniHuman Lip-Sync generation...');
  console.log('⚠️ This costs ~$1 and takes 8-10 minutes!');
  
  // First, upload avatar image
  console.log('📤 Uploading avatar image...');
  const avatarBuffer = readFileSync('03-avatars/avatar-mama-couch.png');
  const avatarBlob = new Blob([avatarBuffer], { type: 'image/png' });
  const avatarUrl = await fal.storage.upload(avatarBlob);
  console.log('✅ Avatar uploaded:', avatarUrl);
  
  // Upload audio
  console.log('📤 Uploading audio...');
  const audioBuffer = readFileSync('04-audio/audio-v1.mp3');
  const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
  const audioUrl = await fal.storage.upload(audioBlob);
  console.log('✅ Audio uploaded:', audioUrl);
  
  // Generate OmniHuman video
  console.log('🎥 Generating lip-sync video (this takes 8-10 minutes)...');
  
  const result = await fal.subscribe('fal-ai/bytedance/omnihuman/v1.5', {
    input: {
      image_url: avatarUrl,
      audio_url: audioUrl
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === 'IN_QUEUE') {
        console.log('📋 In queue, position:', update.queue_position || 'unknown');
      } else if (update.status === 'IN_PROGRESS') {
        console.log('⏳ Processing...');
      }
    }
  });
  
  console.log('✅ OmniHuman video generated!');
  console.log('📎 URL:', result.video.url);
  
  // Download the video
  const response = await fetch(result.video.url);
  const buffer = await response.arrayBuffer();
  writeFileSync('05-omnihuman/video-raw.mp4', Buffer.from(buffer));
  
  console.log('💾 Saved to: 05-omnihuman/video-raw.mp4');
  
  return result.video.url;
}

generateOmniHuman().catch(console.error);
