const http = require('http');
const https = require('https');

const LOCAL_BASE = 'http://localhost:3000';
const LIVE_BASE = 'https://cibdhk.com';

const localPages = [
  '/en',
  '/en/about',
  '/en/courses',
  '/en/admission',
  '/en/contact',
  '/en/faq',
  '/en/blog',
  '/en/gallery',
  '/en/expert-culinary-mentors/dewan-ismail',
  '/en/short-courses',
  '/en/press-media',
  '/en/success-stories',
  '/en/industry-partners',
  '/bn',
  '/bn/about',
  '/bn/courses',
  '/professional-chef-course-basic-to-advance/'
];

const livePages = [
  '/',
  '/en/about',
  '/en/admission',
  '/en/contact'
];

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, statusCode: res.statusCode }));
    }).on('error', reject);
  });
}

async function auditUrl(url, name) {
  const result = {
    name,
    url,
    statusCode: 0,
    title: 'FAIL',
    metaDesc: 'FAIL',
    canonical: 'FAIL',
    h1Count: 0,
    h1s: [],
    footerCols: 0,
    authorBox: 'FAIL',
    linkedIn: 'FAIL',
    errors: []
  };

  try {
    const { html, statusCode } = await fetchHtml(url);
    result.statusCode = statusCode;
    if (statusCode !== 200) {
      result.errors.push(`HTTP Status: ${statusCode}`);
      return result;
    }

    // Title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1].trim()) {
      result.title = titleMatch[1].trim();
    } else {
      result.errors.push('Missing or empty title tag');
    }

    // Meta Description
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i) ||
                      html.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"[^>]*>/i);
    if (descMatch && descMatch[1].trim()) {
      result.metaDesc = 'PASS';
    } else {
      result.errors.push('Missing or empty meta description');
    }

    // Canonical
    const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i);
    if (canonicalMatch && canonicalMatch[1].trim()) {
      result.canonical = canonicalMatch[1].trim();
    } else {
      result.errors.push('Missing canonical link');
    }

    // H1
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    result.h1Count = h1Matches.length;
    result.h1s = h1Matches.map(m => m[1].replace(/<[^>]*>/g, '').trim());
    if (result.h1Count !== 1) {
      result.errors.push(`H1 count is ${result.h1Count} (expected exactly 1)`);
    }

    // Footer columns (columns have either space-y-6 or space-y-5 or list elements inside footer)
    const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
    if (footerMatch) {
      const footerHtml = footerMatch[0];
      // Count space-y-6 or space-y-5 columns inside footer
      const colMatches = [...footerHtml.matchAll(/class="[^"]*(space-y-6|space-y-5)[^"]*"/gi)];
      result.footerCols = colMatches.length;
      if (result.footerCols < 5) {
        // Fallback check: count headers/sections in footer
        const h4Matches = [...footerHtml.matchAll(/<h4[^>]*>/gi)];
        result.footerCols = h4Matches.length;
      }
      if (result.footerCols !== 5) {
        result.errors.push(`Footer columns count is ${result.footerCols} (expected 5)`);
      }

      // Check LinkedIn link in footer
      if (footerHtml.includes('linkedin.com/company/cib-the-culinary-institute-of-bangladesh')) {
        result.linkedIn = 'PASS';
      } else {
        result.errors.push('LinkedIn link missing in footer');
      }
    } else {
      result.errors.push('Missing footer element');
    }

    // AuthorBox
    if (html.includes('Reviewed By') || html.includes('রিভিউড বাই') || html.includes('glass-card')) {
      result.authorBox = 'PASS';
    } else {
      // Some pages might not require AuthorBox? Let's check which ones have it
      result.authorBox = 'NOT_FOUND';
    }

  } catch (err) {
    result.errors.push(`Fetch failed: ${err.message}`);
  }

  return result;
}

async function run() {
  console.log('=== STARTING STATIC HTML AUDIT ===\n');

  console.log('--- LOCALHOST PAGES ---');
  for (const page of localPages) {
    const res = await auditUrl(`${LOCAL_BASE}${page}`, page);
    console.log(`URL: ${res.name}`);
    console.log(`  Status: ${res.statusCode}`);
    console.log(`  Title: ${res.title}`);
    console.log(`  H1s: ${res.h1Count} [${res.h1s.join(' | ')}]`);
    console.log(`  Meta Desc: ${res.metaDesc}`);
    console.log(`  Canonical: ${res.canonical}`);
    console.log(`  Footer Columns: ${res.footerCols}`);
    console.log(`  LinkedIn Link: ${res.linkedIn}`);
    console.log(`  AuthorBox: ${res.authorBox}`);
    if (res.errors.length > 0) {
      console.log(`  [FAIL] Errors:`, res.errors);
    } else {
      console.log(`  [PASS] Clean`);
    }
    console.log('');
  }

  console.log('--- LIVE SITE PAGES ---');
  for (const page of livePages) {
    const res = await auditUrl(`${LIVE_BASE}${page}`, page);
    console.log(`URL: ${res.name}`);
    console.log(`  Status: ${res.statusCode}`);
    console.log(`  Title: ${res.title}`);
    console.log(`  H1s: ${res.h1Count} [${res.h1s.join(' | ')}]`);
    console.log(`  Meta Desc: ${res.metaDesc}`);
    console.log(`  Canonical: ${res.canonical}`);
    console.log(`  Footer Columns: ${res.footerCols}`);
    console.log(`  LinkedIn Link: ${res.linkedIn}`);
    if (res.errors.length > 0) {
      console.log(`  [FAIL] Errors:`, res.errors);
    } else {
      console.log(`  [PASS] Clean`);
    }
    console.log('');
  }
}

run();
