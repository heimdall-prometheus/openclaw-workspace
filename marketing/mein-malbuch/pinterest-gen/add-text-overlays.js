const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Pin texts (German)
const pinTexts = {
  'pin-1a-v4.jpg': {
    headline: 'Kinder kleben\nam Bildschirm?',
    subline: '20 kreative Alternativen'
  },
  'pin-1b.jpg': {
    headline: 'Glückliche,\nkreative Kinder',
    subline: 'Ohne Tablet & TV'
  },
  'pin-1c.jpg': {
    headline: 'Die ultimative Liste',
    subline: 'Bildschirmfreie Aktivitäten'
  },
  'pin-2a.jpg': {
    headline: 'Was schenke\nich bloß?',
    subline: '30 Geschenkideen für Kinder'
  },
  'pin-2b.jpg': {
    headline: 'Geschenke,\ndie bleiben',
    subline: 'Persönlich & unvergesslich'
  },
  'pin-2c.jpg': {
    headline: '30 kreative\nGeschenkideen',
    subline: 'Für Kinder 2-8 Jahre'
  },
  'pin-3a.jpg': {
    headline: 'Hektischer\nFamilienalltag?',
    subline: 'So schafft ihr Quality Time'
  },
  'pin-3b.jpg': {
    headline: 'Bindung stärken',
    subline: '15 Familienrituale'
  },
  'pin-3c.jpg': {
    headline: 'Die ultimative Liste',
    subline: 'Familienzeit gestalten'
  }
};

async function addTextOverlay(inputPath, outputPath, headline, subline) {
  const img = await loadImage(inputPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  // Draw image
  ctx.drawImage(img, 0, 0);

  // Semi-transparent overlay at top
  const gradientHeight = img.height * 0.35;
  const gradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, img.width, gradientHeight);

  // Headline text
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  
  // Headline - bold, large
  const headlineSize = Math.floor(img.width * 0.08);
  ctx.font = `bold ${headlineSize}px Arial, sans-serif`;
  
  const lines = headline.split('\n');
  let y = img.height * 0.06;
  const lineHeight = headlineSize * 1.2;
  
  // Add shadow for better readability
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  lines.forEach(line => {
    ctx.fillText(line, img.width / 2, y);
    y += lineHeight;
  });

  // Subline - smaller
  const sublineSize = Math.floor(img.width * 0.04);
  ctx.font = `${sublineSize}px Arial, sans-serif`;
  ctx.fillStyle = '#3CB4AC'; // Teal brand color
  ctx.shadowBlur = 5;
  y += 10;
  ctx.fillText(subline, img.width / 2, y);

  // Save
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.92 });
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Created: ${outputPath}`);
}

async function main() {
  console.log('🎨 Adding text overlays to all 9 pins...\n');

  for (const [filename, text] of Object.entries(pinTexts)) {
    const inputPath = path.join(__dirname, filename);
    const outputPath = path.join(__dirname, 'final', filename.replace('.jpg', '-final.jpg'));
    
    // Create final folder if needed
    if (!fs.existsSync(path.join(__dirname, 'final'))) {
      fs.mkdirSync(path.join(__dirname, 'final'));
    }

    if (fs.existsSync(inputPath)) {
      await addTextOverlay(inputPath, outputPath, text.headline, text.subline);
    } else {
      console.log(`⚠️ Missing: ${inputPath}`);
    }
  }

  console.log('\n✅ All done! Check /final folder');
}

main().catch(console.error);
