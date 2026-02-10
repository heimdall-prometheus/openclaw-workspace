const fal = require('@fal-ai/serverless-client');

// Setup
fal.config({
  credentials: process.env.FAL_AI_KEY
});

async function generatePin(prompt, filename, model = 'fal-ai/flux-2-pro') {
  console.log(`\n🎨 Generating: ${filename}`);
  console.log(`🤖 Model: ${model}`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);
  
  const result = await fal.subscribe(model, {
    input: {
      prompt: prompt,
      image_size: {
        width: 1000,
        height: 1500
      },
      num_inference_steps: 28,
      guidance_scale: 3.5
    }
  });

  console.log(`✅ Generated: ${result.images[0].url}`);
  return result.images[0].url;
}

// Pin 1A v2: Bildschirmfreie Aktivitäten - Brand-aligned
const prompt1A_v2 = `
Warm lifestyle photograph of a happy German family moment.
A young child (age 5-6) sitting at a wooden table, focused on coloring in a personalized coloring book.
The coloring book shows outlined family photos being colored in with crayons.
Mother sitting beside, watching lovingly.
Bright, airy room with natural daylight from window.
Teal/turquoise accent colors in decor (pillows, mug, pencil holder).
Wooden colored pencils scattered on table.
Authentic, candid feeling - not posed.
Shot on Canon EOS R5, f/2.8, shallow depth of field on child's hands and coloring book.
Warm, emotional, family bonding moment.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.
`;

async function main() {
  const url = await generatePin(prompt1A_v2.trim(), 'pin-1a-bildschirmfrei-v2.png');
  console.log('\n📌 Pin URL:', url);
  console.log('\n💡 Next: Download, review, iterate if needed');
}

main().catch(console.error);
