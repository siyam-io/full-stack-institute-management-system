const http = require('http');

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
  '/professional-chef-course-basic-to-advance/',
  // Spot-check 3 blog posts
  '/en/blog/commis-chef-salary-bangladesh',
  '/en/blog/chef-salary-bangladesh-vs-gulf-vs-europe',
  '/en/blog/homemade-food-business-bangladesh'
];

const livePages = [
  '/',
  '/en/about',
  '/en/admission',
  '/en/contact'
];

function getWebSocketUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const targets = JSON.parse(data);
          const page = targets.find(t => t.type === 'page');
          if (page && page.webSocketDebuggerUrl) {
            resolve(page.webSocketDebuggerUrl);
          } else {
            reject(new Error('No active page target found'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 0;
    this.pending = new Map();
    this.eventListeners = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id !== undefined && this.pending.has(data.id)) {
          const { resolve, reject } = this.pending.get(data.id);
          this.pending.delete(data.id);
          if (data.error) reject(data.error);
          else resolve(data.result);
        } else if (data.method) {
          const listeners = this.eventListeners.get(data.method) || [];
          listeners.forEach(fn => fn(data.params));
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(event, fn) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(fn);
  }

  off(event, fn) {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event);
      const index = listeners.indexOf(fn);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runPageAudit(client, url, isMobile = false) {
  const consoleErrors = [];
  const networkErrors = [];

  const onConsole = (params) => {
    if (params.type === 'error' || params.type === 'warning') {
      const text = params.args.map(arg => arg.value || arg.description || '').join(' ');
      if (params.type === 'error') {
        consoleErrors.push(`[Console Error] ${text}`);
      }
    }
  };

  const onLog = (params) => {
    if (params.entry.level === 'error') {
      consoleErrors.push(`[Log Error] ${params.entry.text}`);
    }
  };

  const onNetwork = (params) => {
    if (params.loadingFailed) {
      networkErrors.push(`[Network Failed] ${params.requestId}: ${params.errorText}`);
    }
  };

  client.on('Runtime.consoleAPICalled', onConsole);
  client.on('Log.entryAdded', onLog);
  client.on('Network.loadingFailed', onNetwork);

  try {
    if (isMobile) {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
        mobile: true
      });
      await client.send('Emulation.setUserAgentOverride', {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
      });
    } else {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false
      });
      await client.send('Emulation.setUserAgentOverride', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      });
    }

    await client.send('Page.navigate', { url });

    await new Promise((resolve) => {
      const loadHandler = () => {
        client.off('Page.loadEventFired', loadHandler);
        resolve();
      };
      client.on('Page.loadEventFired', loadHandler);
      setTimeout(loadHandler, 10000);
    });

    await sleep(2000);

    const evalRes = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const title = document.title;
        const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
        const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
        const h1s = Array.from(document.querySelectorAll('h1')).map(h1 => h1.innerText.trim());
        
        const imgElements = Array.from(document.querySelectorAll('img'));
        const images = imgElements.map(img => {
          return {
            src: img.src,
            alt: img.alt,
            loaded: img.complete && img.naturalWidth > 0,
            naturalWidth: img.naturalWidth
          };
        });
        const brokenImages = images.filter(img => !img.loaded).map(img => img.src);

        const footer = document.querySelector('footer');
        let footerCols = 0;
        let footerLinks = [];
        if (footer) {
          const cols = footer.querySelectorAll('.space-y-6, .space-y-5, footer > div > div > div > div');
          footerCols = Array.from(cols).filter(c => c.querySelector('h4') || c.querySelector('ul')).length;
          footerLinks = Array.from(footer.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.href }));
        }

        const authorBoxTextExists = Array.from(document.querySelectorAll('*')).some(el => {
          if (el.children.length > 0) return false;
          const t = el.innerText || '';
          return t.includes('Reviewed By') || t.includes('রিভিউড বাই');
        });
        const authorBoxClassExists = !!document.querySelector('.glass-card') && document.querySelector('.glass-card').innerText.includes('Reviewed');

        const linkedInLinks = Array.from(document.querySelectorAll('a[href*="linkedin.com/company/cib-the-culinary-institute-of-bangladesh"]')).map(a => a.href);

        const hasTurnstile = !!document.querySelector('iframe[src*="challenges.cloudflare.com"]');

        const hasToc = !!document.querySelector('nav ul, .toc, .table-of-contents') || Array.from(document.querySelectorAll('h2, h3')).length > 2;

        const hasShareButtons = !!document.querySelector('button[aria-label*="share" i]') || !!document.querySelector('[class*="share" i]');

        const hasStickyCta = !!document.querySelector('[class*="sticky" i]') || !!document.querySelector('[class*="fixed" i] button');

        return {
          title,
          metaDesc,
          canonical,
          h1Count: h1s.length,
          h1Text: h1s,
          totalImages: images.length,
          brokenImages,
          footerCols,
          footerLinks,
          authorBoxVisible: authorBoxTextExists || authorBoxClassExists,
          linkedInLinks,
          hasTurnstile,
          hasToc,
          hasShareButtons,
          hasStickyCta
        };
      })()`,
      returnByValue: true
    });

    const auditData = evalRes.result?.value || {};
    
    return {
      success: true,
      url,
      consoleErrors,
      networkErrors,
      ...auditData
    };
  } catch (err) {
    return {
      success: false,
      url,
      error: err.message,
      consoleErrors,
      networkErrors
    };
  } finally {
    client.off('Runtime.consoleAPICalled', onConsole);
    client.off('Log.entryAdded', onLog);
    client.off('Network.loadingFailed', onNetwork);
  }
}

async function checkLlmTxt(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          content: data.substring(0, 500)
        });
      });
    }).on('error', (err) => {
      resolve({
        error: err.message
      });
    });
  });
}

async function main() {
  console.log('Connecting to Chrome CDP...');
  const wsUrl = await getWebSocketUrl();
  console.log('CDP WS URL:', wsUrl);
  
  const client = new CDPClient(wsUrl);
  await client.connect();
  console.log('Connected!');

  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Log.enable');
  await client.send('Network.enable');

  const report = {
    local: [],
    live: [],
    llmTxtLocal: null,
    llmTxtLive: null
  };

  console.log('\n=== RUNNING LOCALHOST AUDIT ===');
  for (const page of localPages) {
    const url = `${LOCAL_BASE}${page}`;
    console.log(`Auditing: ${url}`);
    
    let audit = await runPageAudit(client, url, false);
    
    if (page === '/professional-chef-course-basic-to-advance/') {
      const mobileAudit = await runPageAudit(client, url, true);
      audit.mobile = mobileAudit;
    }
    
    report.local.push(audit);
  }

  console.log('Checking local llms.txt...');
  report.llmTxtLocal = await checkLlmTxt(`${LOCAL_BASE}/llms.txt`);

  console.log('\n=== RUNNING LIVE SITE AUDIT ===');
  for (const page of livePages) {
    const url = `${LIVE_BASE}${page}`;
    console.log(`Auditing: ${url}`);
    const audit = await runPageAudit(client, url, false);
    report.live.push(audit);
  }

  console.log('Checking live llms.txt...');
  report.llmTxtLive = await checkLlmTxt(`${LIVE_BASE}/llms.txt`);

  console.log('\n=== AUDIT COMPLETE ===');
  console.log(JSON.stringify(report, null, 2));

  client.close();
}

main().catch(err => {
  console.error('[FATAL ERROR]', err);
});
