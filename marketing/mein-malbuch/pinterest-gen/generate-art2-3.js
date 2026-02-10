const fal = require('@fal-ai/serverless-client');

fal.config({
  credentials: process.env.FAL_AI_KEY
});

async function generatePin(prompt, name) {
  console.log(`🎨 Starting: ${name}`);
  const result = await fal.subscribe('fal-ai/flux-2-pro', {
    input: {
      prompt: prompt,
      image_size: { width: 1000, height: 1500 },
      num_inference_steps: 28,
      guidance_scale: 3.5
    }
  });
  console.log(`✅ Done: ${name}`);
  return { name, url: result.images[0].url };
}

const pins = [
  // ARTIKEL 2: Geschenkideen Kinder
  {
    name: 'pin-2a-geschenk-problem',
    prompt: `Relatable lifestyle photo of a stressed parent in a toy store, looking overwhelmed by choices.
Shelves full of colorful toys in background, slightly blurred.
Parent (30s) holding phone, looking confused and undecided.
Warm lighting, authentic "help me" expression.
Wearing casual clothes with teal/turquoise scarf or accessory.
Shot on Sony A7IV, 50mm f/2.0, shallow depth of field.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.`
  },
  {
    name: 'pin-2b-geschenk-benefit',
    prompt: `Heartwarming photograph of a child (age 6) excitedly unwrapping a personalized coloring book gift.
Birthday party setting with simple decorations.
Child's face showing pure joy and surprise.
The coloring book cover visible, showing outlined family photos.
Teal/turquoise birthday decorations and ribbons.
Warm, celebratory atmosphere with soft natural light.
Other wrapped gifts in background.
Shot on Canon EOS R5, 85mm f/1.8, capturing the magical moment.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.`
  },
  {
    name: 'pin-2c-geschenk-listicle',
    prompt: `Beautiful flatlay of creative, meaningful gift ideas for children.
Top-down view on white marble surface:
- Personalized coloring book with family photo outlines (center)
- Wooden toys
- Art supplies in teal/turquoise container
- Handmade craft kit
- Small potted plant
Elegant gift wrapping with turquoise ribbons scattered around.
Natural daylight, Pinterest-worthy aesthetic.
Clean, organized, inspiring gift guide visual.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.`
  },
  // ARTIKEL 3: Familienzeit gestalten
  {
    name: 'pin-3a-familie-problem',
    prompt: `Lifestyle photograph showing the contrast of modern busy family life.
A family of four at dinner table - parents on phones, kids looking bored.
Slightly desaturated, cooler tones to convey disconnection.
Modern kitchen/dining room setting.
The mood is "we need to change something".
Soft evening light from window.
Subtle teal/turquoise elements in decor.
Shot on Fuji X-T5, 23mm f/2, documentary style.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.`
  },
  {
    name: 'pin-3b-familie-benefit',
    prompt: `Warm, glowing photograph of quality family time together.
Parents and two children (ages 5 and 8) gathered around coffee table.
Everyone engaged in a creative activity together - coloring, crafting.
Big smiles, eye contact, genuine connection and laughter.
Cozy living room with warm evening light, perhaps candles.
Teal/turquoise throw blanket and cushions.
The feeling of "this is what matters".
Shot on Sony A7IV, 35mm f/1.4, warm color grading.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.`
  },
  {
    name: 'pin-3c-familie-listicle',
    prompt: `Aesthetic flatlay representing family ritual ideas and quality time.
Top-down view on cozy knitted blanket:
- Personalized family coloring book (open, partially colored)
- Hot cocoa mugs (one with teal/turquoise color)
- Fairy lights arranged in corner
- Polaroid-style family photos
- Colored pencils in wooden holder
- Small succulent plant
Warm, hygge atmosphere, cozy family evening vibes.
Soft natural light with warm tones.
ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS anywhere in the image.`
  }
];

async function main() {
  console.log(`\n🚀 Generating ${pins.length} pins in parallel...\n`);
  
  const results = await Promise.all(
    pins.map(p => generatePin(p.prompt.trim(), p.name))
  );
  
  console.log('\n📌 ALL RESULTS:');
  results.forEach(r => console.log(`${r.name}: ${r.url}`));
}

main().catch(console.error);
