import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://cibdhk.com';

const activeRoutes = [
  { path: '', priority: 1.0, changefreq: 'daily' as const },
  { path: 'courses', priority: 0.9, changefreq: 'weekly' as const },
  { path: 'about', priority: 0.7, changefreq: 'monthly' as const },
  { path: 'faq', priority: 0.7, changefreq: 'monthly' as const },
  { path: 'blog', priority: 0.8, changefreq: 'weekly' as const },
  { path: 'contact', priority: 0.7, changefreq: 'monthly' as const },
  { path: 'privacy-policy', priority: 0.3, changefreq: 'monthly' as const },
  { path: 'term-conditions', priority: 0.3, changefreq: 'monthly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const locales = ['en', 'bn'];
  const now = new Date();

  // 1. Core and Static Routes
  locales.forEach(locale => {
    activeRoutes.forEach(route => {
      const url = route.path ? `${BASE_URL}/${locale}/${route.path}` : `${BASE_URL}/${locale}`;
      sitemapEntries.push({
        url,
        lastModified: now,
        changeFrequency: route.changefreq,
        priority: route.priority,
      });
    });
  });

  // 2. Blog Posts (dynamic scan)
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

  return sitemapEntries;
}
