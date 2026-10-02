const fs = require('fs');
const path = require('path');

const locales = ['en', 'bn'];
const publicDir = path.join(__dirname, '..', 'public');
let brokenCount = 0;
const missingImages = new Set();

console.log('=== Checking Blog Featured Images ===\n');

locales.forEach(locale => {
  const blogDir = path.join(__dirname, '..', 'content', locale, 'blog');
  if (!fs.existsSync(blogDir)) {
    console.warn(`Blog directory for locale '${locale}' does not exist.`);
    return;
  }
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
  console.log(`Checking ${files.length} posts for locale '${locale}'...`);
  
  files.forEach(file => {
    const filePath = path.join(blogDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const featuredImage = data.featuredImage;
      if (!featuredImage) {
        console.error(`[MISSING KEY] ${locale}/blog/${file} has no featuredImage property.`);
        brokenCount++;
        missingImages.add(data.slug);
      } else {
        const fullImagePath = path.join(publicDir, featuredImage);
        if (!fs.existsSync(fullImagePath)) {
          console.error(`[BROKEN FILE] ${locale}/blog/${file} specifies "${featuredImage}", which does not exist.`);
          brokenCount++;
          missingImages.add(data.slug);
        }
      }
    } catch (e) {
      console.error(`[ERROR PARSING] Failed to parse ${locale}/blog/${file}:`, e.message);
      brokenCount++;
    }
  });
});

console.log(`\nScan finished. Total broken/missing images: ${brokenCount}`);
if (missingImages.size > 0) {
  console.log('Slugs with missing/broken images:', Array.from(missingImages));
}
process.exit(brokenCount > 0 ? 1 : 0);
