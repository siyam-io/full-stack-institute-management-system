const http = require('http');

const urls = [
  '/en', '/en/about', '/en/courses', '/en/admission', '/en/faq', '/en/blog', '/en/gallery', '/en/contact',
  '/bn', '/bn/about', '/bn/blog',
  '/en/blog/how-to-become-a-professional-chef-bangladesh'
];

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractMatches(regex, str, group = 1) {
  const matches = [];
  let m;
  while ((m = regex.exec(str)) !== null) {
    matches.push(m[group]);
  }
  return matches;
}

async function audit() {
  const report = {};
  for (const url of urls) {
    try {
      const html = await fetchHtml(url);
      
      const title = html.match(/<title[^>]*>(.*?)<\/title>/)?.[1] || '';
      const desc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || '';
      const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i)?.[1] || '';
      
      // Hreflang
      const hreflangMatches = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"[^>]*>/gi)];
      const hreflangs = hreflangMatches.map(m => ({ hreflang: m[1], href: m[2] }));

      // JSON-LD
      const jsonLdMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
      const jsonLds = jsonLdMatches.map(m => {
        try {
          const d = JSON.parse(m[1]);
          return d['@type'] || (d['@graph'] ? d['@graph'].map(g => g['@type']).join(',') : 'Unknown');
        } catch(e) { return 'Invalid JSON'; }
      });

      // OG tags
      const ogTitle = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
      const ogDesc = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
      const ogImage = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
      const ogUrl = html.match(/<meta[^>]*property="og:url"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
      const ogType = html.match(/<meta[^>]*property="og:type"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
      const ogSiteName = html.match(/<meta[^>]*property="og:site_name"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
      
      // Twitter tags
      const twCard = html.match(/<meta[^>]*name="twitter:card"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
      const twImage = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]*)"[^>]*>/i)?.[1];

      report[url] = {
        title,
        desc: desc.substring(0, 50) + '...',
        canonical,
        hreflangCount: hreflangs.length,
        jsonLds,
        ogImage,
        twImage
      };
    } catch(e) {
      console.error(url, e.message);
    }
  }
  console.log(JSON.stringify(report, null, 2));
}

audit();
