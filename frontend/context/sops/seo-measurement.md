# 📊 SOP 24: SEO & AEO Measurement System

> [!NOTE]
> This Standard Operating Procedure guides the marketing and technical teams on how to track, analyze, and report search engine visibility, AI-citation search impressions (AEO), indexing status, and organic user queries using Google Search Console (GSC) and core analytics platforms.

---

## 🧭 Step-by-Step GSC Tracking Setup

Google Search Console is the primary source of truth for crawl status, search queries, and structured data impressions.

### Step 1: Access and View Configurations
1. Log into [Google Search Console](https://search.google.com/search-console).
2. Select the verified property for `https://cibdhk.com`.
3. Set the date range filter to **Last 3 months** for a stable trend analysis, or **Last 28 days** for immediate campaign review.

### Step 2: Set Up Custom Search Performance Filters
To analyze specific sections of the site (e.g., Blog or Course landing page):
1. In the **Performance** report, click the **+ New** button.
2. Select **Page...** and enter a matching pattern:
   - For course pages: `URL containing /courses`
   - For blog articles: `URL containing /blog`
   - For English content: `URL containing /en`
   - For Bengali content: `URL containing /bn`
3. Hit **Apply** to isolate queries and traffic driving clicks to these specific paths.

---

## 📈 Tracking Rich Results & AEO Impressions

Since Phase 4 implements Course, Product, VideoObject, and FAQ page schemas, we must monitor how Google renders these structured data entities.

### Step 1: Monitor Schema Search Appearance
1. Go to **Performance > Search Results**.
2. Click on the **Search Appearance** tab (next to Queries, Pages, Countries, Devices).
3. Look for the following lines:
   - **FAQ**: Displays search metrics for collapsible FAQ accordion queries.
   - **Videos**: Shows impressions/clicks from video rich snippets (from `VideoObject` markup).
   - **Product snippets / Merchant listings**: Tracks course listings displaying fee ratings.

### Step 2: Track Structured Data Health (Enhancements)
1. Scroll down to the **Experience** and **Enhancements** sections in the left sidebar.
2. Review the status reports for:
   - **FAQ**
   - **Products**
   - **Videos**
3. Ensure the charts show a clean green status (**Valid**). If any red **Invalid** items appear, check the specific URL and error details (e.g., "Missing field 'price'", "Missing field 'uploadDate'").

---

## 🔍 Identifying Crawl and Indexing Errors

Crawl efficiency ensures new blog posts and course updates rank quickly without wasting search engine resources.

### Step 1: Inspect Indexing Status
1. Navigate to **Indexing > Pages**.
2. Check the overall trend of **Indexed** vs **Not indexed** pages.
3. Scroll down to the table labeled **Why pages aren't indexed**. Focus on resolving the following critical statuses:
   - **Server error (5xx)**: Immediate hosting issue. Consult the server team.
   - **Not found (404)**: Verify if redirects are needed or if internal links are broken.
   - **Alternative page with proper canonical tag**: Normal, but verify that the canonical URL points correctly to `/en` or `/bn` versions and not the root `/`.

### Step 2: Check Crawl Rate & Stats
1. Go to **Settings > Crawl Stats > Open Report**.
2. Monitor **Total crawl requests**, **Total download size**, and **Average response time**.
3. *Threshold Check:* Average response time should remain **under 400ms**. If it spikes, check server resources or database pooling performance.

---

## 📋 Weekly SEO Measurement Checklist & Reporting Rhythm

Perform these checks every Monday morning to maintain search dominance.

| Task / Metric | Target Threshold | Action if Target Not Met |
|:---|:---|:---|
| **Average Page Load Time** | < 1.5 seconds | Optimize images (SOP 23) & purge Cloudflare cache |
| **GSC Indexing Errors** | 0 Red Errors | Inspect URLs with URL Inspection tool and fix HTML schema |
| **Avg. Search Position** | Top 5 for "Chef Course in Dhaka" | Publish 1 new niche article and audit backlink anchors |
| **Rich Result Impressions** | Increasing week-over-week | Verify `SchemaInjector` components render correctly in production |
| **Google PageSpeed Score** | > 90 on Mobile & Desktop | Inspect JS bundle sizes, defer non-critical scripts |

---

## 📝 Reporting Template (Weekly Summary)
Create a brief summary report for stakeholders:
```text
CIB SEO Performance Report - [DATE]
-------------------------------------
1. Total Impressions: [Count] (Change: [+/- %])
2. Total Clicks: [Count] (Change: [+/- %])
3. Top 3 Driving Queries: 
   - [Query 1]
   - [Query 2]
   - [Query 3]
4. Indexing Health: [Valid Count] Indexed / [Error Count] Errors
5. Rich Results Status: FAQ [Valid/Error], Video [Valid/Error], Product [Valid/Error]
```
