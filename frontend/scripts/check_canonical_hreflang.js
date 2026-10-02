const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3010;
const BASE_URL = `http://localhost:${PORT}`;
const PROD_URL = 'https://cibdhk.com';

// 1. Gather all routes dynamically
function gatherRoutes() {
  const routes = [];
  const locales = ['en', 'bn'];
  
  // Flagship Page (no locale prefix)
  routes.push('/professional-chef-course-basic-to-advance');

  // Localized Homepages
  locales.forEach(locale => {
    routes.push(`/${locale}`);
  });

  // Core & Static Routes
  const staticPaths = [
    'courses', 'admission', 'about', 'contact', 'faq', 'gallery', 
    'expert-culinary-mentors', 'companyprofile', 'location', 'directions', 
    'industry-partners', 'press-media', 'success-stories', 'privacy-policy', 'term-conditions', 'blog'
  ];

  locales.forEach(locale => {
    staticPaths.forEach(p => {
      routes.push(`/${locale}/${p}`);
    });
  });

  // Mentors subpages
  locales.forEach(locale => {
    routes.push(`/${locale}/expert-culinary-mentors/dewan-ismail`);
  });

  // Blog Posts from content/en/blog/
  const enBlogDir = path.join(process.cwd(), 'content/en/blog');
  if (fs.existsSync(enBlogDir)) {
    const blogFiles = fs.readdirSync(enBlogDir).filter(file => file.endsWith('.json'));
    blogFiles.forEach(file => {
      const slug = file.replace('.json', '');
      locales.forEach(locale => {
        routes.push(`/${locale}/blog/${slug}`);
      });
    });
  }

  // Niche Course Landing Pages from src/app/[locale]/ subdirectories
  const appLocaleDir = path.join(process.cwd(), 'src/app/[locale]');
  if (fs.existsSync(appLocaleDir)) {
    const allDirs = fs.readdirSync(appLocaleDir).filter(file => {
      const fullPath = path.join(appLocaleDir, file);
      return fs.statSync(fullPath).isDirectory();
    });

    const standardPaths = [
      '[...rest]', 'about', 'admission', 'blog', 'companyprofile', 'contact', 'courses', 
      'directions', 'expert-culinary-mentors', 'faq', 'gallery', 'industry-partners', 
      'location', 'privacy-policy', 'success-stories', 'term-conditions', 'press-media'
    ];

    const nicheSlugs = allDirs.filter(d => !standardPaths.includes(d));
    nicheSlugs.forEach(slug => {
      locales.forEach(locale => {
        routes.push(`/${locale}/${slug}`);
      });
    });
  }

  return routes;
}

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${url}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, statusCode: res.statusCode }));
    }).on('error', reject);
  });
}

function checkPort() {
  return new Promise((resolve) => {
    const client = http.get(BASE_URL, () => resolve(true))
      .on('error', () => resolve(false));
    client.end();
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const routes = gatherRoutes();
  console.log(`Discovered ${routes.length} routes to audit.`);

  console.log(`Starting Next.js production server on port ${PORT}...`);
  const nextProcess = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
    shell: true,
    stdio: 'ignore'
  });

  // Wait for server to start up
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(1000);
    ready = await checkPort();
    if (ready) {
      console.log('Next.js server is ready!');
      break;
    }
  }

  if (!ready) {
    console.error('[ERROR] Failed to start Next.js server on port', PORT);
    nextProcess.kill();
    process.exit(1);
  }

  let failed = false;
  let auditCount = 0;

  console.log('\n=== Starting Canonical & Hreflang Audit ===\n');

  for (const route of routes) {
    auditCount++;
    console.log(`[${auditCount}/${routes.length}] Auditing: ${route}`);
    try {
      const { html, statusCode } = await fetchHtml(route);
      if (statusCode !== 200) {
        console.error(`  [FAIL] HTTP Status Code: ${statusCode}`);
        failed = true;
        continue;
      }

      // 1. Check Canonical
      const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="(.*?)"[^>]*>/i);
      if (!canonicalMatch) {
        console.error('  [FAIL] Missing canonical tag!');
        failed = true;
      } else {
        const canonicalUrl = canonicalMatch[1];
        const expectedCanonical = `${PROD_URL}${route}`;
        if (canonicalUrl !== expectedCanonical) {
          console.error(`  [FAIL] Canonical mismatch: Found "${canonicalUrl}", Expected "${expectedCanonical}"`);
          failed = true;
        } else {
          console.log(`  [PASS] Canonical matches: ${canonicalUrl}`);
        }
      }

      // 2. Check Hreflang alternates
      const isRootRoute = route === '/professional-chef-course-basic-to-advance';
      
      if (!isRootRoute) {
        // Find all alternates
        const hreflangRegex = /<link[^>]*rel="alternate"[^>]*hreflang="(.*?)"[^>]*href="(.*?)"[^>]*>/gi;
        let match;
        const foundAlternates = {};
        while ((match = hreflangRegex.exec(html)) !== null) {
          foundAlternates[match[1]] = match[2];
        }

        // Determine base slug (without locale)
        const parts = route.split('/').filter(Boolean);
        const locale = parts[0];
        const subPath = parts.slice(1).join('/');
        const baseSlug = subPath ? `/${subPath}` : '';

        const expectedEn = `${PROD_URL}/en${baseSlug}`;
        const expectedBn = `${PROD_URL}/bn${baseSlug}`;
        const expectedDefault = `${PROD_URL}/en${baseSlug}`;

        if (!foundAlternates['en']) {
          console.error('  [FAIL] Missing hreflang="en" alternate!');
          failed = true;
        } else if (foundAlternates['en'] !== expectedEn) {
          console.error(`  [FAIL] Hreflang "en" mismatch: Found "${foundAlternates['en']}", Expected "${expectedEn}"`);
          failed = true;
        }

        if (!foundAlternates['bn']) {
          console.error('  [FAIL] Missing hreflang="bn" alternate!');
          failed = true;
        } else if (foundAlternates['bn'] !== expectedBn) {
          console.error(`  [FAIL] Hreflang "bn" mismatch: Found "${foundAlternates['bn']}", Expected "${expectedBn}"`);
          failed = true;
        }

        if (!foundAlternates['x-default']) {
          console.error('  [FAIL] Missing hreflang="x-default" alternate!');
          failed = true;
        } else if (foundAlternates['x-default'] !== expectedDefault) {
          console.error(`  [FAIL] Hreflang "x-default" mismatch: Found "${foundAlternates['x-default']}", Expected "${expectedDefault}"`);
          failed = true;
        }

        if (foundAlternates['en'] && foundAlternates['bn'] && foundAlternates['x-default']) {
          console.log(`  [PASS] Hreflang alternates: en="${foundAlternates['en']}", bn="${foundAlternates['bn']}", x-default="${foundAlternates['x-default']}"`);
        }
      } else {
        console.log('  [INFO] Flagship page has no alternate locales.');
      }

    } catch (e) {
      console.error(`  [FAIL] Audit failed:`, e.message);
      failed = true;
    }
  }

  console.log('\nShutting down local Next.js server...');
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', nextProcess.pid, '/f', '/t'], { stdio: 'ignore' });
  } else {
    nextProcess.kill();
  }

  await sleep(1000);

  if (failed) {
    console.error('=== CANONICAL/HREFLANG AUDIT FAILED ===');
    process.exit(1);
  } else {
    console.log('=== ALL CANONICAL & HREFLANG AUDITS PASSED SUCCESSFULLY ===');
    process.exit(0);
  }
}

run();
