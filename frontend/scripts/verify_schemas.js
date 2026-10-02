const { spawn } = require('child_process');
const http = require('http');

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}`;

const testCases = [
  {
    url: '/en',
    expectedTypes: ['EducationalOrganization', 'LocalBusiness', 'EducationEvent', 'FAQPage']
  },
  {
    url: '/en/courses',
    expectedTypes: ['Course', 'Product', 'FAQPage']
  },
  {
    url: '/en/faq',
    expectedTypes: ['FAQPage']
  },
  {
    url: '/en/blog/chef-jobs-abroad-for-bangladeshi-students',
    expectedTypes: ['Article', 'FAQPage']
  },
  {
    url: '/en/expert-culinary-mentors/dewan-ismail',
    expectedTypes: ['Person', 'ProfilePage']
  },
  {
    url: '/professional-chef-course-basic-to-advance',
    expectedTypes: ['Course', 'FAQPage', 'LocalBusiness']
  },
  {
    url: '/en/sushi-course-dhaka',
    expectedTypes: ['Course', 'FAQPage', 'LocalBusiness']
  },
  {
    url: '/en/thai-cooking-course-dhaka',
    expectedTypes: ['Course', 'FAQPage', 'LocalBusiness']
  },
  {
    url: '/en/chinese-cooking-course-dhaka',
    expectedTypes: ['Course', 'FAQPage', 'LocalBusiness']
  },
  {
    url: '/en/mediterranean-cuisine-course-dhaka',
    expectedTypes: ['Course', 'FAQPage', 'LocalBusiness']
  },
  {
    url: '/en/indian-cuisine-course-dhaka',
    expectedTypes: ['Course', 'FAQPage', 'LocalBusiness']
  }
];

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${url}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, statusCode: res.statusCode }));
    }).on('error', reject);
  });
}

function extractSchemas(html) {
  const jsonLdRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  const schemas = [];
  let match;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim());
      schemas.push(parsed);
    } catch (e) {
      console.warn('[WARNING] Failed to parse a JSON-LD block:', e.message);
    }
  }
  return schemas;
}

function findTypesInSchema(schema) {
  const types = new Set();
  
  function recurse(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (obj['@type']) {
      if (Array.isArray(obj['@type'])) {
        obj['@type'].forEach(t => types.add(t));
      } else {
        types.add(obj['@type']);
      }
    }
    if (obj['@graph'] && Array.isArray(obj['@graph'])) {
      obj['@graph'].forEach(item => recurse(item));
    }
    Object.values(obj).forEach(val => {
      if (typeof val === 'object') {
        recurse(val);
      }
    });
  }

  recurse(schema);
  return Array.from(types);
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

  console.log('\n=== Starting Schema Audits ===\n');

  for (const tc of testCases) {
    console.log(`Auditing URL: ${tc.url}`);
    try {
      const { html, statusCode } = await fetchHtml(tc.url);
      if (statusCode !== 200) {
        console.error(`  [FAIL] HTTP Status Code: ${statusCode}`);
        failed = true;
        continue;
      }

      const schemas = extractSchemas(html);
      const allFoundTypes = [];
      schemas.forEach(schema => {
        allFoundTypes.push(...findTypesInSchema(schema));
      });

      console.log(`  Found schemas types: [ ${allFoundTypes.join(', ')} ]`);

      tc.expectedTypes.forEach(expected => {
        const matches = allFoundTypes.some(found => {
          if (expected === 'Organization' && found === 'EducationalOrganization') return true;
          return found.toLowerCase() === expected.toLowerCase();
        });

        if (matches) {
          console.log(`  [PASS] Found expected type: ${expected}`);
        } else {
          console.error(`  [FAIL] Missing expected type: ${expected}`);
          failed = true;
        }
      });

    } catch (e) {
      console.error(`  [FAIL] Request failed:`, e.message);
      failed = true;
    }
    console.log('');
  }

  console.log('Shutting down local Next.js server...');
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', nextProcess.pid, '/f', '/t'], { stdio: 'ignore' });
  } else {
    nextProcess.kill();
  }

  await sleep(1000);

  if (failed) {
    console.error('=== SCHEMA AUDIT FAILED ===');
    process.exit(1);
  } else {
    console.log('=== ALL SCHEMA AUDITS PASSED SUCCESSFULLY ===');
    process.exit(0);
  }
}

run();
