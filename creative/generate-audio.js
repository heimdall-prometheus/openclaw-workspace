#!/usr/bin/env node

const fs = require('fs');

// Read credentials
const bashrc = fs.readFileSync(process.env.HOME + '/.bashrc', 'utf8');
const falKey = bashrc.match(/FAL_KEY="([^"]+)"/)[1];

// Read narration text
const text = fs.readFileSync('creative/narration-text.txt', 'utf8');

async function generateAudio() {
  console.log('Generating audio with HP Baxxter voice...');
  console.log(`Text length: ${text.length} characters`);
  
  const response = await fetch('https://fal.run/fal-ai/minimax/speech-02-hd', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${falKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
      voice_setting: {
        voice_id: 'Voice78d9cb991769959037', // HP Baxxter
        speed: 1.0,
        pitch: 1
      },
      language_boost: 'German'
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Audio generation failed: ${response.status} ${error}`);
  }
  
  const result = await response.json();
  console.log('Audio generated successfully!');
  
  const audioUrl = result.audio?.url || result.audio_url || result.url;
  console.log('Audio URL:', audioUrl);
  console.log('Duration:', result.duration_ms / 1000, 'seconds');
  
  // Download the audio
  const audioResponse = await fetch(audioUrl);
  const audioBuffer = await audioResponse.arrayBuffer();
  
  fs.writeFileSync('creative/narration.mp3', Buffer.from(audioBuffer));
  console.log('Audio saved to creative/narration.mp3');
  
  // Save metadata
  fs.writeFileSync('creative/audio-metadata.json', JSON.stringify({
    url: result.audio_url,
    voice_id: 'Voice78d9cb991769959037',
    voice_name: 'HP Baxxter',
    duration: result.duration || 'unknown',
    generated_at: new Date().toISOString()
  }, null, 2));
  
  return result;
}

generateAudio().catch(console.error);
