import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://cibdhk.com';

// Define static routes and their priorities/frequencies
const staticRoutes = [
  { path: 'about', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'contact', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'faq', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'gallery', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'expert-culinary-mentors', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'companyprofile', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'location', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'directions', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'industry-partners', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'press-media', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'success-stories', priority: 0.6, changefreq: 'monthly' as const },
  { path: 'privacy-policy', priority: 0.3, changefreq: 'monthly' as const },
  { path: 'term-conditions', priority: 0.3, changefreq: 'monthly' as const },
];

const coreRoutes = [
  { path: 'courses', priority: 0.9, changefreq: 'weekly' as const },
  { path: 'admission', priority: 0.9, changefreq: 'weekly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const locales = ['en', 'bn'];
  const now = new Date();

  // 1. Root / Flagship Page (no locale prefix)
  sitemapEntries.push({
    url: `${BASE_URL}/professional-chef-course-basic-to-advance`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // 2. Localized Homepages
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    });
  });

  // 3. Core Pages (Courses & Admission)
  locales.forEach(locale => {
    coreRoutes.forEach(route => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/${route.path}`,
        lastModified: now,
        changeFrequency: route.changefreq,
        priority: route.priority,
      });
    });
  });

  // 4. Static Pages
  locales.forEach(locale => {
    staticRoutes.forEach(route => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/${route.path}`,
        lastModified: now,
        changeFrequency: route.changefreq,
        priority: route.priority,
      });
    });
  });

  // 5. Expert Mentors Detail Pages
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${BASE_URL}/${locale}/expert-culinary-mentors/dewan-ismail`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // 6. Blog Index
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // 7. Blog Posts (dynamic scan)
  const enBlogDir = path.join(process.cwd(), 'content/en/blog');
  if (fs.existsSync(enBlogDir)) {
    const blogFiles = fs.readdirSync(enBlogDir).filter(file => file.endsWith('.json'));
    blogFiles.forEach(file => {
      const slug = file.replace('.json', '');
      locales.forEach(locale => {
        sitemapEntries.push({
          url: `${BASE_URL}/${locale}/blog/${slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    });
  }

  // 8. Niche Course Landing Pages
  // We identify niche courses by scanning src/app/[locale]/ subdirectories that are not in core/static lists
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
        sitemapEntries.push({
          url: `${BASE_URL}/${locale}/${slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    });
  }

  return sitemapEntries;
}
