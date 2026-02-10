const fal = require('@fal-ai/serverless-client');

fal.config({
  credentials: process.env.FAL_AI_KEY
});

async function generatePin(prompt, name) {
  console.log(`\n🎨 Generating: ${name}`);
  const result = await fal.subscribe('fal-ai/flux-2-pro', {
    input: {
      prompt: prompt,
      image_size: { width: 1000, height: 1500 },
      num_inference_steps: 28,
      guidance_scale: 3.5
    }
  });
  console.log(`✅ ${name}: ${result.images[0].url}`);
  return result.images[0].url;
}

// V3: Stärkerer Türkis-Fokus, Overhead-Shot
const promptV3 = `
Overhead flatlay photograph of a child's hands coloring in a personalized family coloring book.
The coloring book page shows an outlined photo of a family being colored with vibrant crayons.
Scattered around: teal/turquoise colored pencils, a turquoise mug, wooden crayons.
White wooden table surface.
Bright natural daylight, soft shadows.
The child's hands are small (age 5-6), holding a teal crayon.
Warm, cozy, creative atmosphere.
Shot on iPhone 14 Pro, top-down perspective.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.
`;

// V4: Emotional Moment, Kind zeigt fertiges Bild
const promptV4 = `
Heartwarming lifestyle photograph of a proud young child (age 5) showing their completed coloring page to camera.
The coloring page shows a colored-in family portrait (outline style, now filled with colors).
Child has a big genuine smile, eyes sparkling with pride.
Sitting at kitchen table, warm afternoon light from window.
Teal/turquoise cardigan or shirt on the child.
Soft bokeh background showing cozy home interior.
Authentic, candid, emotional family moment.
Shot on Canon EOS R5, 85mm f/1.8, shallow depth of field.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.
`;

async function main() {
  const [urlV3, urlV4] = await Promise.all([
    generatePin(promptV3.trim(), 'v3-flatlay'),
    generatePin(promptV4.trim(), 'v4-proud-child')
  ]);
  
  console.log('\n📌 Results:');
  console.log('V3:', urlV3);
  console.log('V4:', urlV4);
}

main().catch(console.error);
