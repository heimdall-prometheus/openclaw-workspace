import * as fal from '@fal-ai/serverless-client';
import { writeFileSync } from 'fs';

// Configure fal.ai
fal.config({
  credentials: process.env.FAL_AI_KEY
});

const script = `Schau mal was aus diesem Foto wird!

Dein Familienfoto – und jetzt als Ausmalbild.

Ich hab alle unsere schönsten Momente in ein Malbuch verwandelt. Der Strandurlaub, der Hund, Papas lustiges Gesicht.

Meine Kinder sind besessen. Stundenlang malen statt Tablet.

mein-malbuch-punkt-com – 24 Seiten, 29 Euro, in 5 Minuten erstellt.`;

async function generateAudio() {
  console.log('🎙️ Generating TTS audio with Sophie voice...');
  
  const result = await fal.subscribe('fal-ai/minimax/speech-02-hd', {
    input: {
      text: script,
      voice_setting: {
        voice_id: 'Voice47317d7f1767100465',  // Sophie - German female
        speed: 1.1,
        pitch: 1
      },
      language_boost: 'German'
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === 'IN_PROGRESS') {
        console.log('⏳ Generating...');
      }
    }
  });
  
  console.log('✅ Audio generated!');
  console.log('📎 URL:', result.audio.url);
  
  // Download the audio
  const response = await fetch(result.audio.url);
  const buffer = await response.arrayBuffer();
  writeFileSync('04-audio/audio-v1.mp3', Buffer.from(buffer));
  
  console.log('💾 Saved to: 04-audio/audio-v1.mp3');
  
  // Get duration using ffprobe
  console.log('⏱️ Check duration with: ffprobe -i 04-audio/audio-v1.mp3 -show_entries format=duration -v quiet -of csv="p=0"');
  
  return result.audio.url;
}

generateAudio().catch(console.error);
