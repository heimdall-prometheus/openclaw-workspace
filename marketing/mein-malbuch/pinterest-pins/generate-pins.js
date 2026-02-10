const fal = require("@fal-ai/serverless-client");
const fs = require("fs");
const path = require("path");

// Configure fal.ai
fal.config({
  credentials: process.env.FAL_KEY
});

const pins = [
  // Artikel 1: Bildschirmfreie Aktivitäten
  {
    id: "pin-1a-bildschirmfrei-problem",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: photo of frustrated child staring at tablet screen in dark room, parents worried in background. Middle: Bold orange text '20 bildschirmfreie Aktivitäten' on white background. Bottom: small text 'Von Eltern getestet ✓' and 'mein-malbuch.com' logo. Warm orange and yellow gradient. Professional, clean, Pinterest style. High quality, photorealistic.",
    article: "bildschirmfreie-aktivitaeten"
  },
  {
    id: "pin-1b-bildschirmfrei-benefit",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: happy children painting and drawing with colorful markers and crayons, watercolor style, bright and joyful. Middle: pastel mint text 'Bildschirmfreie Zeit = Kreative Köpfe' on soft background. Bottom: '20 Ideen, die funktionieren' and CTA button 'Jetzt lesen'. Soft pastel colors (mint, pink, light blue). Warm, inviting, family-friendly aesthetic. Pinterest style.",
    article: "bildschirmfreie-aktivitaeten"
  },
  {
    id: "pin-1c-bildschirmfrei-listicle",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: Bold black text 'Die ultimative Liste'. Middle: 2x2 grid showing 4 different activities - child painting, crafting with paper, playing outside, building with blocks. Each photo vibrant and colorful. Bottom: '20 Ideen für 3-8 Jahre' and small logo. Bright primary colors (red, blue, yellow). Energetic, playful, Pinterest list style.",
    article: "bildschirmfreie-aktivitaeten"
  },
  // Artikel 2: Geschenkideen
  {
    id: "pin-2a-geschenke-problem",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: overwhelmed person standing in front of toy store shelf full of colorful plastic toys, question mark above head, looking confused. Middle: Bold yellow text '30 Geschenkideen für Kinder' on white. Bottom: 'Kein Plastik-Schrott!' and 'Von Erziehern empfohlen' badge. Warm tones (yellow, orange, red). Problem-solving aesthetic, Pinterest style.",
    article: "geschenkideen-kinder"
  },
  {
    id: "pin-2b-geschenke-benefit",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: happy child holding and hugging a personalized coloring book with their own photo on cover, genuine smile, warm lighting. Middle: pastel pink text 'Geschenke, die bleiben (nicht nur Plastik)'. Bottom: '30 Ideen für 3-8 Jahre' and CTA. Soft pastel tones (mint, pink, cream). Emotional, heartwarming, Pinterest gift guide style.",
    article: "geschenkideen-kinder"
  },
  {
    id: "pin-2c-geschenke-listicle",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: '30 Geschenkideen für Kinder'. Middle: 2x3 grid showing 6 different gift types - coloring book, wooden toy, children's book, craft kit, outdoor toy, puzzle. Each item beautifully photographed. Bottom: 'Von Erziehern empfohlen' badge and logo. Colorful, vibrant, professional Pinterest product grid style.",
    article: "geschenkideen-kinder"
  },
  // Artikel 3: Familienzeit
  {
    id: "pin-3a-familienzeit-problem",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: stressed family scene - parents on phones, child ignored, messy room, chaotic atmosphere, blurred motion. Middle: Orange to yellow gradient with text '15 Rituale für Quality Time'. Bottom: 'Bindung stärken. Erinnerungen schaffen.' and logo. Warm gradient (orange to yellow) showing 'solution'. Pinterest transformation style.",
    article: "familienzeit-gestalten"
  },
  {
    id: "pin-3b-familienzeit-benefit",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: happy family sitting together at table painting and crafting, genuine smiles, warm natural lighting, cozy atmosphere. Middle: pastel text 'Quality Time = Starke Bindung' on soft background. Bottom: '15 Rituale, die funktionieren' and CTA. Soft pastels (mint, pink, cream). Warm, emotional, family connection aesthetic, Pinterest style.",
    article: "familienzeit-gestalten"
  },
  {
    id: "pin-3c-familienzeit-listicle",
    prompt: "Pinterest pin design, 1000x1500 portrait format. Top: Bold text '15 Familien-Rituale'. Middle: 2x2 grid showing 4 family moments - bedtime reading, board game night, cooking together, outdoor adventure. Each scene warm and inviting. Bottom: 'Bindung stärken. Erinnerungen schaffen.' and logo. Bright primary colors, energetic, Pinterest family list style.",
    article: "familienzeit-gestalten"
  }
];

async function generatePin(pin) {
  console.log(`\n🎨 Generating: ${pin.id}...`);
  
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: pin.prompt,
        image_size: {
          width: 1000,
          height: 1500
        },
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: false
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log(`   Status: ${update.status}`);
        }
      },
    });

    if (result.images && result.images[0]) {
      const imageUrl = result.images[0].url;
      console.log(`   ✅ Generated: ${imageUrl}`);
      
      // Download image
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      const filename = `${pin.id}.png`;
      const filepath = path.join(__dirname, filename);
      fs.writeFileSync(filepath, Buffer.from(buffer));
      console.log(`   💾 Saved: ${filename}`);
      
      return {
        ...pin,
        localFile: filename,
        fal_url: imageUrl
      };
    }
  } catch (error) {
    console.error(`   ❌ Error generating ${pin.id}:`, error.message);
    return { ...pin, error: error.message };
  }
}

async function main() {
  console.log("🚀 Starting Pinterest Pin Generation with fal.ai");
  console.log(`📊 Total pins to generate: ${pins.length}\n`);
  
  const results = [];
  
  // Generate pins sequentially to avoid rate limits
  for (const pin of pins) {
    const result = await generatePin(pin);
    results.push(result);
    
    // Wait 2 seconds between requests
    if (pins.indexOf(pin) < pins.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Save results
  const outputFile = path.join(__dirname, 'generated-pins.json');
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n📋 Results saved to: ${outputFile}`);
  
  const successCount = results.filter(r => !r.error).length;
  console.log(`\n✅ Success: ${successCount}/${pins.length} pins generated`);
  
  if (successCount < pins.length) {
    console.log(`⚠️  Failed: ${pins.length - successCount} pins`);
  }
}

main().catch(console.error);
