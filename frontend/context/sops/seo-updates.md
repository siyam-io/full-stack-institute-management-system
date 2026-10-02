# SOP 12: How to Update SEO Metadata, Schemas, or Social Preview

## Purpose
To maintain the site's high search engine visibility and social media authority through structured metadata.

## Prerequisites
- SEO keyword list.
- A 1200x630px OG image for social previews.

## Step-by-Step Instructions

### Updating Meta Tags
1.  **Global Defaults**: Edit `src/lib/seo.ts` to update the site-wide title template or default description.
2.  **Page Specific**: Open the `page.tsx` for a specific route. Update the `generateMetadata` function's return values.

### Managing JSON-LD Schemas
1.  **Locate Schemas**: Open `src/components/global/Schema.tsx` or look for the `Schema` component usage in individual pages.
2.  **Edit Data**: Update the structured data objects (e.g., `Course` schema fees, `LocalBusiness` opening hours).
3.  **Add New Schema**: Follow the schema.org standards and add a new `<script type="application/ld+json">` block if needed.

### Hub-and-Spoke Internal Link Architecture
1.  **Automated Related Resources**: Individual blog posts render an Obsidian Glass related resources container. The template in `src/app/[locale]/blog/[slug]/page.tsx` automatically links to `/courses`, `/admission`, and checks if `post.category` warrants a mentor or partner link.
2.  **Blog JSON Content**: To update the static related links array for specific posts, edit the `relatedLinks` array inside `content/[locale]/blog/*.json`.
3.  **Cross-linking CTA Blocks**: Core pages like `/faq`, `/about`, and `/courses` contain modular glass CTA buttons that link back to the key E-E-A-T pages (mentors, success-stories, partners).

### Crawler Optimization (Robots.txt)
1.  **Bot Filtering Rules**: Open `public/robots.txt` to inspect bot rules. Bad or aggressive crawlers (`anthropic-ai`, `Bytespider`) are blocked entirely using:
    ```txt
    User-agent: anthropic-ai
    Disallow: /
    ```
2.  **Crawl Budgets**: To protect cPanel CPU resources, `/api/` and `/_next/` are disallowed from crawling, but assets (`/_next/static/`) are explicitly allowed.

### Cloudflare Edge Image Optimization Setup
To automatically serve next-gen `WebP` and `AVIF` formats without running local Node.js image compression workloads:
1.  **Log in** to the Cloudflare Dashboard.
2.  **Navigate** to **Speed** -> **Optimization** -> **Image Optimization**.
3.  **Enable Polish**: Set to **Lossy** and check **WebP** to dynamically convert legacy images.
4.  **Enable Mirage**: Turn on Mirage to optimize image loading for mobile connections and slow networks.

### Social Previews
1.  **Upload OG Image**: Save your `og-image.webp` to `public/images/seo/`.
2.  **Update Reference**: In `generateMetadata`, update the `openGraph.images` array path.

## Verification Steps
- ✅ Use the [Google Rich Results Test](https://search.google.com/test/rich-results) tool.
- ✅ Paste a link in the [Meta Debugger](https://developers.facebook.com/tools/debug/) to verify social cards.
- ✅ Check `view-source:https://cibdhk.com` to confirm meta tags are present.

## Troubleshooting
- **Old preview showing**: Facebook/Twitter cache images. Use their "Scrape Again" or "Clear Cache" tools to update.
- **Invalid Schema**: Ensure you didn't leave a trailing comma or miss a curly brace in the JSON-LD script.

## Related SOPs
- [SOP 13: Landing Page Updates](./landing-page.md)
- [SOP 18: Monthly Health Check](./health-check.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [36-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
