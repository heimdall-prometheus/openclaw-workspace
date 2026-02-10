const fs = require('fs');

const filePath = '/var/www/imr-media/IMR_Media-main/src/data/blogPosts.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add images to existing articles
const updates = [
  {
    slug: 'online-shop-erstellen-guide',
    image: 'https://assets.imr-media.de/imr-media/blog-images/header-online-shop-guide.png'
  },
  {
    slug: 'online-shop-kosten',
    image: 'https://assets.imr-media.de/imr-media/blog-images/header-online-shop-kosten.png'
  },
  {
    slug: 'online-shop-fehler-vermeiden',
    image: 'https://assets.imr-media.de/imr-media/blog-images/header-online-shop-fehler.png'
  },
  {
    slug: 'webdesign-augsburg-agentur-finden',
    image: 'https://assets.imr-media.de/imr-media/blog-images/header-webdesign-augsburg.png'
  }
];

for (const update of updates) {
  // Find the article and add image property after author line
  const slugPattern = new RegExp(`(slug: '${update.slug}'[\\s\\S]*?author: '[^']*',)`, 'g');
  
  if (content.includes(`slug: '${update.slug}'`) && !content.includes(`slug: '${update.slug}'`) || !content.match(new RegExp(`slug: '${update.slug}'[\\s\\S]*?image:`))) {
    content = content.replace(slugPattern, `$1\n    image: '${update.image}',`);
    console.log(`✅ Added image to: ${update.slug}`);
  } else {
    console.log(`⏭️ Skipped (already has image or not found): ${update.slug}`);
  }
}

fs.writeFileSync(filePath, content);
console.log('\n✅ All images added to blogPosts.ts');
