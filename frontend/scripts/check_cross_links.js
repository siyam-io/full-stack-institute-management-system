const fs = require('fs');
const path = require('path');

const targetRoutes = [
  'cooking-course-dhaka',
  'japanese-cooking-course-dhaka',
  'korean-cooking-course-dhaka',
  'pizza-pasta-course-dhaka',
  'baking-course-dhaka',
  'culinary-institute-comparison-bangladesh',
  'short-courses',
  // Phase 1 / 2 routes
  'barista-course-dhaka',
  'best-culinary-institute-bangladesh',
  'best-culinary-institute-dhaka',
  'chef-course-bangladesh',
  'chef-course-dhaka',
  'chef-course-fees-bangladesh',
  'culinary-course-bangladesh',
  'culinary-diploma-bangladesh',
  'fast-food-course-dhaka',
  'pastry-bakery-course-dhaka'
];

const counts = {};
targetRoutes.forEach(r => {
  counts[r] = { en: 0, bn: 0, sources_en: [], sources_bn: [] };
});

function scanDir(dir, lang) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, lang);
    } else if (item.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      targetRoutes.forEach(route => {
        // Look for links in JSON like "/route", "/en/route", "/bn/route"
        const regex = new RegExp(`["'\\(]\\/([a-z]{2}\\/)?${route}["'\\/\\)]`, 'g');
        if (regex.test(content)) {
          counts[route][lang]++;
          counts[route][`sources_${lang}`].push(path.relative(process.cwd(), fullPath));
        }
      });
    }
  });
}

scanDir(path.join(process.cwd(), 'content/en'), 'en');
scanDir(path.join(process.cwd(), 'content/bn'), 'bn');

// Check navigation files too
const enNav = fs.readFileSync(path.join(process.cwd(), 'content/en/globals/navigation.json'), 'utf8');
const bnNav = fs.readFileSync(path.join(process.cwd(), 'content/bn/globals/navigation.json'), 'utf8');
const enFooter = fs.readFileSync(path.join(process.cwd(), 'content/en/globals/footer.json'), 'utf8');
const bnFooter = fs.readFileSync(path.join(process.cwd(), 'content/bn/globals/footer.json'), 'utf8');

targetRoutes.forEach(route => {
  // Check if it exists in nav/footer
  if (enNav.includes(route)) {
    counts[route].en++;
    counts[route].sources_en.push('navigation.json');
  }
  if (bnNav.includes(route)) {
    counts[route].bn++;
    counts[route].sources_bn.push('navigation.json');
  }
  if (enFooter.includes(route)) {
    counts[route].en++;
    counts[route].sources_en.push('footer.json');
  }
  if (bnFooter.includes(route)) {
    counts[route].bn++;
    counts[route].sources_bn.push('footer.json');
  }
});

console.log('--- LINK AUDIT RESULT ---');
let belowTwo = 0;
targetRoutes.forEach(route => {
  console.log(`Route: /${route}`);
  console.log(`  EN Links: ${counts[route].en} (from: ${counts[route].sources_en.join(', ')})`);
  console.log(`  BN Links: ${counts[route].bn} (from: ${counts[route].sources_bn.join(', ')})`);
  if (counts[route].en < 2 || counts[route].bn < 2) {
    belowTwo++;
  }
});

console.log(`\nAudit completed. Routes with < 2 links in either language: ${belowTwo}`);
