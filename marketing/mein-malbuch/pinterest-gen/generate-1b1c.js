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

// Pin 1B: Benefit Hook - "Glückliche, kreative Kinder"
const prompt1B = `
Joyful lifestyle photograph of two happy children (ages 4 and 7) doing creative arts and crafts together.
They are laughing and having fun while coloring and drawing at a bright wooden table.
Colorful crayons, colored pencils, and coloring books spread on table.
Natural daylight streaming in, warm golden hour feeling.
One child wearing a teal/turquoise shirt.
Genuine happiness and sibling bonding moment.
Clean, bright, airy home environment with white walls.
Shot on Sony A7IV, 35mm f/1.8, authentic candid moment.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.
`;

// Pin 1C: Listicle Hook - "Die ultimative Liste" (visual of multiple activities)
const prompt1C = `
Bright, colorful flatlay photograph showing various screen-free activities for children.
Top-down view of a white table with neatly arranged items:
- A personalized coloring book with family photos as outlines
- Wooden colored pencils in teal/turquoise holder
- Watercolor paint set
- Craft supplies (scissors, glue, colorful paper)
- A small plant in turquoise pot
- Children's hands reaching for supplies from corners
Natural daylight, soft shadows, organized but playful arrangement.
Pinterest-style aesthetic, clean and inspiring.
Shot on iPhone 14 Pro, top-down perspective.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.
`;

async function main() {
  const [url1B, url1C] = await Promise.all([
    generatePin(prompt1B.trim(), 'pin-1b-benefit'),
    generatePin(prompt1C.trim(), 'pin-1c-listicle')
  ]);
  
  console.log('\n📌 Results:');
  console.log('1B:', url1B);
  console.log('1C:', url1C);
}

main().catch(console.error);
