import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FilteredBlogGrid from '@/components/blog/FilteredBlogGrid';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: `Culinary Blog | Industry Insights & Career Guides | CIB`,
    description: `Stay updated with the latest culinary trends, career advice, and recipes from The Culinary Institute of Bangladesh.`,
    alternates: {
      canonical: `https://cibdhk.com/${locale}/blog`,
      languages: {
        'en': 'https://cibdhk.com/en/blog',
        'bn': 'https://cibdhk.com/bn/blog',
        'x-default': 'https://cibdhk.com/en/blog',
      }
    }
  };
}

import Image from 'next/image';

import { fetchBlogs } from '@/lib/blogApi';

export default async function BlogListingPage({ params: { locale } }: { params: { locale: string } }) {
  const posts = await fetchBlogs(locale);

  // Load hero data
  let heroData = {
    badge: "Intellectual Gastronomy",
    title: "The CIB Blog",
    description: "\"Career guides, market intelligence, and culinary philosophies from the nexus of excellence.\""
  };

  try {
    const heroPath = path.join(process.cwd(), `content/${locale}/blog_hero.json`);
    if (fs.existsSync(heroPath)) {
      heroData = JSON.parse(fs.readFileSync(heroPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading blog hero data:", error);
  }

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-obsidian relative overflow-hidden">

      <div className="relative z-10">
        <section className="relative pt-10 md:pt-14 pb-16 text-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-10">
              {heroData.badge}
            </div>
            <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8 uppercase">
              {heroData.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              {heroData.description}
            </p>
            <div className="w-24 h-1 bg-power-red mx-auto mt-12 rounded-full shadow-[0_0_30px_rgba(236,27,35,0.5)]"></div>
          </div>
        </section>

        {/* Featured Post Section */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 relative z-10">
            <div className="glass-card overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-prestige-gold/30 hover:bg-white/10 transition-all duration-700 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Image Column */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[450px] w-full overflow-hidden rounded-t-[2.5rem] lg:rounded-t-none lg:rounded-l-[2.5rem]">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-obsidian/40 opacity-80 pointer-events-none"></div>
                  <div className="absolute top-6 left-6 bg-power-red text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    {locale === 'bn' ? 'ফিচার্ড পোস্ট' : 'Featured Post'}
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-[10px] text-white/40 mb-6 font-bold uppercase tracking-[0.2em]">
                    <span className="text-prestige-gold">{featuredPost.category}</span>
                    <span className="w-1.5 h-1.5 bg-power-red rounded-full"></span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight mb-4 hover:text-prestige-gold transition-colors">
                    <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-prestige-gold font-bold text-sm">
                        {featuredPost.author[0]}
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold">{featuredPost.author}</p>
                        <p className="text-white/30 text-[9px] uppercase tracking-wider">Lead Analyst</p>
                      </div>
                    </div>

                    <Link
                      href={`/${locale}/blog/${featuredPost.slug}`}
                      className="btn-primary px-6 py-3 text-center font-bold tracking-widest text-[10px] uppercase flex items-center gap-2 group"
                    >
                      {locale === 'bn' ? 'নিবন্ধটি পড়ুন' : 'Read Article'}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid with Client-Side Filtering */}
        <section className="py-16 md:py-24 section-padding">
          <FilteredBlogGrid posts={gridPosts} locale={locale} />
        </section>
      </div>
    </main>
  );
}
