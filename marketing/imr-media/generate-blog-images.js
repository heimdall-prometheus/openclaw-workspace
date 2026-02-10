const fal = require('@fal-ai/serverless-client');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Configure fal.ai
fal.config({
  credentials: process.env.FAL_AI_KEY
});

// Configure R2
const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || 'https://e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const R2_BUCKET = 'previews';
const R2_PUBLIC_URL = 'https://assets.imr-media.de';

// Blog articles with prompts
const articles = [
  {
    slug: 'online-shop-kosten',
    title: 'Was kostet ein Online-Shop?',
    prompt: `Clean, modern infographic illustration for blog header: "Online Shop Costs Overview"

Visual elements to include:
- Central laptop with shopping cart icon
- Floating cost elements: Euro symbols, price tags, calculator
- Bar chart showing cost breakdown (hosting, design, marketing)
- Clean white/blue corporate color scheme
- Professional business style, NOT cartoonish

Style: Flat design infographic, minimalist, professional
Aspect: 16:9 landscape, blog header format
Quality: High resolution, clean lines, modern tech aesthetic
NO text, NO words, NO labels - only visual elements`
  },
  {
    slug: 'online-shop-fehler',
    title: '10 Fehler beim Online-Shop',
    prompt: `Clean, modern infographic illustration for blog header: "Common Online Shop Mistakes"

Visual elements to include:
- Warning signs and caution symbols
- Broken shopping cart or error icons
- Red X marks and green checkmarks contrast
- Laptop with error message visualization
- Clean red/orange warning colors on white background

Style: Flat design infographic, minimalist, professional
Aspect: 16:9 landscape, blog header format
Quality: High resolution, clean lines, modern tech aesthetic
NO text, NO words, NO labels - only visual elements`
  },
  {
    slug: 'online-shop-guide',
    title: 'Online-Shop erstellen Guide',
    prompt: `Clean, modern infographic illustration for blog header: "Step-by-Step Online Shop Guide"

Visual elements to include:
- Numbered stepping stones or pathway (1,2,3,4,5)
- Laptop transforming into shopping bag
- Rocket launch symbolizing business start
- Clean blue/green success colors
- Progress bar or milestone markers

Style: Flat design infographic, minimalist, professional
Aspect: 16:9 landscape, blog header format
Quality: High resolution, clean lines, modern tech aesthetic
NO text, NO words, NO labels - only visual elements`
  },
  {
    slug: 'webdesign-augsburg',
    title: 'Webdesign Augsburg',
    prompt: `Clean, modern infographic illustration for blog header: "Web Design Agency"

Visual elements to include:
- Stylized city skyline silhouette (generic European city)
- Large monitor showing website wireframe
- Design tools floating: color palette, cursor, layers
- Professional blue/gray corporate colors
- Local business feel combined with modern tech

Style: Flat design infographic, minimalist, professional
Aspect: 16:9 landscape, blog header format
Quality: High resolution, clean lines, modern tech aesthetic
NO text, NO words, NO labels - only visual elements`
  },
  {
    slug: 'shopsystem-vergleich',
    title: 'Shopify vs WooCommerce vs Shopware',
    prompt: `Clean, modern infographic illustration for blog header: "E-Commerce Platform Comparison"

Visual elements to include:
- Three distinct platforms represented by abstract shapes/icons
- Comparison scales or balance visualization
- Shopping cart icons in different styles
- Versus or comparison arrows
- Clean orange/blue/green for three platforms
- Decision tree or branching paths visual

Style: Flat design infographic, minimalist, professional
Aspect: 16:9 landscape, blog header format
Quality: High resolution, clean lines, modern tech aesthetic
NO text, NO words, NO logos, NO labels - only abstract visual elements`
  }
];

async function uploadToR2(imageUrl, filename) {
  console.log(`  Downloading from fal.ai...`);
  const response = await fetch(imageUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  
  const key = `imr-media/blog-images/${filename}`;
  console.log(`  Uploading to R2: ${key}...`);
  
  await r2.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: 'image/png',
  }));
  
  return `${R2_PUBLIC_URL}/${key}`;
}

async function generateImage(article) {
  console.log(`\n🎨 Generating: ${article.title}`);
  console.log(`  Prompt: ${article.prompt.substring(0, 80)}...`);
  
  try {
    const result = await fal.subscribe('fal-ai/nano-banana-pro', {
      input: {
        prompt: article.prompt,
        num_images: 1,
        aspect_ratio: '16:9',
        resolution: '2K',
        output_format: 'png'
      },
      logs: false
    });
    
    if (result.images && result.images.length > 0) {
      const imageUrl = result.images[0].url;
      console.log(`  ✅ Generated: ${imageUrl.substring(0, 60)}...`);
      
      // Upload to R2
      const filename = `header-${article.slug}.png`;
      const permanentUrl = await uploadToR2(imageUrl, filename);
      console.log(`  ✅ Uploaded: ${permanentUrl}`);
      
      return {
        slug: article.slug,
        title: article.title,
        falUrl: imageUrl,
        r2Url: permanentUrl,
        success: true
      };
    }
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return {
      slug: article.slug,
      title: article.title,
      error: error.message,
      success: false
    };
  }
}

async function main() {
  console.log('🚀 IMR Media Blog Image Generator');
  console.log('==================================\n');
  console.log(`Model: fal-ai/nano-banana-pro`);
  console.log(`Articles: ${articles.length}`);
  console.log(`Estimated cost: ~$${(articles.length * 0.15).toFixed(2)}`);
  
  const results = [];
  
  for (const article of articles) {
    const result = await generateImage(article);
    results.push(result);
    
    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log('\n\n📊 RESULTS SUMMARY');
  console.log('==================\n');
  
  const successCount = results.filter(r => r.success).length;
  console.log(`Success: ${successCount}/${articles.length}\n`);
  
  for (const result of results) {
    if (result.success) {
      console.log(`✅ ${result.title}`);
      console.log(`   ${result.r2Url}\n`);
    } else {
      console.log(`❌ ${result.title}`);
      console.log(`   Error: ${result.error}\n`);
    }
  }
  
  // Save results
  const outputPath = path.join(__dirname, 'blog-images/generation-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);
}

main().catch(console.error);
