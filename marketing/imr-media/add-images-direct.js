const fs = require('fs');

const filePath = '/var/www/imr-media/IMR_Media-main/src/data/blogPosts.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Direct replacements - add image after author line for each article
const replacements = [
  {
    find: "slug: 'online-shop-erstellen-guide',\n    title:",
    check: "slug: 'online-shop-erstellen-guide'",
    addAfter: "author: 'IMR Media',",
    image: "    image: 'https://assets.imr-media.de/imr-media/blog-images/header-online-shop-guide.png',"
  },
  {
    find: "slug: 'online-shop-kosten',\n    title:",
    check: "slug: 'online-shop-kosten'",
    addAfter: "author: 'IMR Media',",
    image: "    image: 'https://assets.imr-media.de/imr-media/blog-images/header-online-shop-kosten.png',"
  },
  {
    find: "slug: 'online-shop-fehler-vermeiden',\n    title:",
    check: "slug: 'online-shop-fehler-vermeiden'",
    addAfter: "author: 'IMR Media',",
    image: "    image: 'https://assets.imr-media.de/imr-media/blog-images/header-online-shop-fehler.png',"
  },
  {
    find: "slug: 'webdesign-augsburg-agentur-finden',\n    title:",
    check: "slug: 'webdesign-augsburg-agentur-finden'",
    addAfter: "author: 'IMR Media',",
    image: "    image: 'https://assets.imr-media.de/imr-media/blog-images/header-webdesign-augsburg.png',"
  }
];

for (const r of replacements) {
  // Check if this article already has an image
  const articleStart = content.indexOf(r.check);
  if (articleStart === -1) {
    console.log(`❌ Article not found: ${r.check}`);
    continue;
  }
  
  // Find the next article or end
  const nextArticle = content.indexOf("slug: '", articleStart + 10);
  const articleSection = nextArticle > -1 ? content.substring(articleStart, nextArticle) : content.substring(articleStart);
  
  if (articleSection.includes("image: '")) {
    console.log(`⏭️ Already has image: ${r.check}`);
    continue;
  }
  
  // Find the author line and add image after it
  const authorIndex = content.indexOf(r.addAfter, articleStart);
  if (authorIndex === -1 || (nextArticle > -1 && authorIndex > nextArticle)) {
    console.log(`❌ Author line not found for: ${r.check}`);
    continue;
  }
  
  const insertPos = authorIndex + r.addAfter.length;
  content = content.slice(0, insertPos) + '\n' + r.image + content.slice(insertPos);
  console.log(`✅ Added image to: ${r.check}`);
}

fs.writeFileSync(filePath, content);
console.log('\n✅ Done! Images added.');
