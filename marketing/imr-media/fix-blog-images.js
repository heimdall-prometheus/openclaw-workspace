const fs = require('fs');

const filePath = '/var/www/imr-media/IMR_Media-main/src/pages/Blog.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the placeholder with actual image rendering
const oldCode = `{/* Post Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blaugrau-light to-blaugrau flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-accent/50" />
                </div>`;

const newCode = `{/* Post Image */}
                <div className="aspect-video bg-gradient-to-br from-blaugrau-light to-blaugrau flex items-center justify-center overflow-hidden">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-12 h-12 text-accent/50" />
                  )}
                </div>`;

if (content.includes(oldCode)) {
  content = content.replace(oldCode, newCode);
  fs.writeFileSync(filePath, content);
  console.log('✅ Blog.tsx updated to show images!');
} else {
  console.log('❌ Could not find placeholder code. Maybe already updated?');
  console.log('Searching for similar patterns...');
  
  // Try a more flexible search
  if (content.includes('Post Image Placeholder')) {
    console.log('Found "Post Image Placeholder" comment');
  }
  if (content.includes('post.image')) {
    console.log('✅ Already uses post.image - might be fixed already');
  }
}
