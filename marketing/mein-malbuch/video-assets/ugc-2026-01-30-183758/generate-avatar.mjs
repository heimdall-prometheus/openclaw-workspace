import * as fal from '@fal-ai/serverless-client';
import { writeFileSync } from 'fs';

// Configure fal.ai
fal.config({
  credentials: process.env.FAL_AI_KEY
});

const prompt = `RAW photo, medium shot of a naturally beautiful German woman, age 32, sitting on a beige linen couch.

FRAMING: Medium shot from waist up, camera placed 2 meters away. NOT a selfie. NOT close-up. Subject fills about 60% of frame height.

SUBJECT: Blonde hair with natural highlights, shoulder-length. Clear blue eyes. Light natural makeup. Genuine warm smile showing excitement. Natural skin texture with pores visible. Wearing a casual cream-colored sweater.

SETTING: Cozy bright living room. Soft afternoon window light from the left. Blurred background with houseplants and family photos on shelf.

CAMERA: Subject LOOKING DIRECTLY INTO CAMERA LENS with engaged, enthusiastic expression. Sharp focus on face.

STYLE: Authentic UGC influencer recording a product review. NOT AI-generated. NOT stock photo. Real mom energy.`;

const negativePrompt = `artificial, CGI, 3D render, illustration, cartoon, plastic skin, overly smooth skin, perfect skin, airbrushed, studio lighting, stock photo, symmetrical face, too perfect, mannequin, selfie angle, too close, duck face, filters, instagram filters, heavy makeup`;

async function generateAvatar() {
  console.log('🎨 Generating avatar with fal.ai/nano-banana-pro...');
  
  const result = await fal.subscribe('fal-ai/flux-pro/v1.1', {
    input: {
      prompt: prompt,
      image_size: { width: 1024, height: 1024 },
      num_inference_steps: 28,
      guidance_scale: 3.5,
      safety_tolerance: "2"
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === 'IN_PROGRESS') {
        console.log('⏳ Generating...');
      }
    }
  });
  
  console.log('✅ Avatar generated!');
  console.log('📎 URL:', result.images[0].url);
  
  // Download the image
  const response = await fetch(result.images[0].url);
  const buffer = await response.arrayBuffer();
  writeFileSync('03-avatars/avatar-mama-couch.png', Buffer.from(buffer));
  
  console.log('💾 Saved to: 03-avatars/avatar-mama-couch.png');
  
  return result.images[0].url;
}

generateAvatar().catch(console.error);
