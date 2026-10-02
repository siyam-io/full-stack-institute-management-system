const http = require('http');

const corePaths = [
  '/', '/about', '/expert-culinary-mentors', '/courses', '/admission', '/contact', '/gallery', '/blog', '/faq', '/privacy-policy', '/term-conditions', '/companyprofile', '/location', '/directions'
];

const locales = ['en', 'bn'];
const urls = [];

locales.forEach(locale => {
  corePaths.forEach(path => {
    urls.push(`/${locale}${path}`);
  });
});

// Add specific blog posts
const enBlogs = [
  '/en/blog/best-culinary-institute-in-dhaka-comparison',
  '/en/blog/chef-jobs-abroad-for-bangladeshi-students',
  '/en/blog/food-business-license-bangladesh-process',
  '/en/blog/how-to-become-a-professional-chef-bangladesh',
  '/en/blog/restaurant-food-costing-formula-profitability'
];
const bnBlogs = [
  '/bn/blog/advanced-pastry-arts-training-dhaka',
  '/bn/blog/chef-salary-bangladesh-vs-abroad-comparison-2026',
  '/bn/blog/how-to-get-chef-job-abroad-from-bangladesh-2026'
];
urls.push(...enBlogs, ...bnBlogs);

// Add Landing Page
urls.push('/professional-chef-course-basic-to-advance/');

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: url,
      method: 'GET',
      headers: {
        'Accept': 'text/html'
      }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, statusCode: res.statusCode }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function runAudit() {
  const results = [];
  console.log(`Starting audit of ${urls.length} pages...`);

  for (const url of urls) {
    try {
      const { html, statusCode } = await fetchHtml(url);
      
      const title = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || 'MISSING';
      const description = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || html.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"[^>]*>/i)?.[1] || 'MISSING';
      const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i)?.[1] || 'MISSING';
      const h1s = (html.match(/<h1/g) || []).length;
      
      // OG & Twitter
      const ogTitle = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || 'MISSING';
      const ogImg = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || 'MISSING';
      const twCard = html.match(/<meta[^>]*name="twitter:card"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || 'MISSING';

      // Check for broken images & Alt tags
      const imgMatches = [...html.matchAll(/<img([^>]*src="([^"]*)"[^>]*)>/gi)];
      const totalImages = imgMatches.length;
      const imagesMissingAlt = imgMatches.filter(m => !m[1].includes('alt=')).length;
      const brokenImages = imgMatches.filter(m => !m[2] || m[2].includes('undefined') || m[2].includes('null')).length;

      // JSON-LD
      const jsonLdMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
      const schemas = jsonLdMatches.map(m => {
        try {
          const d = JSON.parse(m[1]);
          if (d['@graph']) return d['@graph'].map(item => item['@type']).join(', ');
          return d['@type'];
        } catch (e) { return 'INVALID_JSON'; }
      });

      results.push({
        url,
        statusCode,
        title: title.substring(0, 30),
        description: description === 'MISSING' ? 'MISSING' : description.substring(0, 30) + '...',
        h1: h1s,
        og: ogTitle !== 'MISSING' && ogImg !== 'MISSING' ? '✅' : '❌',
        twitter: twCard !== 'MISSING' ? '✅' : '❌',
        images: `${totalImages} (NoAlt:${imagesMissingAlt})`,
        broken: brokenImages,
        schema: schemas.length > 0 ? '✅' : '❌'
      });
      
      process.stdout.write('.');
    } catch (e) {
      results.push({ url, error: e.message });
      process.stdout.write('F');
    }
  }

  console.log('\n\n--- AUDIT RESULTS ---');
  console.table(results);
}

runAudit();
