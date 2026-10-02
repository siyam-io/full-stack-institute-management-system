import React, { Suspense } from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaInjector from '@/components/global/SchemaInjector';
import { generateWebPageSchema, generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema, generateHowToSchema, generateVideoObjectSchema } from '@/lib/seo';
import WatermarkOverlay from '@/components/global/WatermarkOverlay';
import { ArrowRight, Clock } from 'lucide-react';
import BlogTOC from '@/components/blog/BlogTOC';
import BlogShareButtons from '@/components/blog/BlogShareButtons';
import QuickAnswers from '@/components/global/QuickAnswers';
import AuthorBox from '@/components/global/AuthorBox';
import InlineFAQ from '@/components/global/InlineFAQ';

interface BlogPostProps {
  params: {
    locale: string;
    slug: string;
  };
}

import { fetchBlogs, fetchBlogBySlug } from '@/lib/blogApi';

export async function generateStaticParams() {
  const locales = ['en', 'bn'];
  const params = [];

  for (const locale of locales) {
    const posts = await fetchBlogs(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params: { locale, slug } }: BlogPostProps): Promise<Metadata> {
  const post = await fetchBlogBySlug(slug, locale);
  if (!post) return {};

  const title = `${post.title} | Culinary Academy Blog`;
  const description = post.excerpt;
  const ogImage = post.featuredImage.startsWith('http') ? post.featuredImage : `https://culinaryacademy.com${post.featuredImage}`;

  return {
    title,
    description,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://culinaryacademy.com/${locale}/blog/${slug}`,
      siteName: 'Culinary Academy',
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
    },
    alternates: {
      canonical: `https://culinaryacademy.com/${locale}/blog/${slug}`,
      languages: {
        'en': `https://culinaryacademy.com/en/blog/${slug}`,
        'bn': `https://culinaryacademy.com/bn/blog/${slug}`,
        'x-default': `https://culinaryacademy.com/en/blog/${slug}`,
      }
    }
  };
}

function getAuthorDetails(authorName: string, locale: string) {
  const isBn = locale === 'bn';
  const cleanAuthor = authorName ? authorName.trim() : '';

  if (cleanAuthor === 'Executive Chef Mentor' || cleanAuthor === 'লিড মেন্টর') {
    return {
      name: isBn ? 'লিড মেন্টর' : 'Executive Chef Mentor',
      title: isBn ? 'অধ্যক্ষ ও প্রধান প্রশিক্ষক' : 'Principal & Lead Instructor',
      photo: '/images/chef-mentor-portrait.jpg',
      profileUrl: ''
    };
  } else if (cleanAuthor === 'Hasan Rizvee' || cleanAuthor === 'হাসান রিজভী') {
    return {
      name: isBn ? 'হাসান রিজভী' : 'Hasan Rizvee',
      title: isBn ? 'বিজনেস অ্যানালিস্ট' : 'Business Analyst',
      photo: '/images/logo.svg',
      profileUrl: ''
    };
  } else if (cleanAuthor === 'Salman Iqbal' || cleanAuthor === 'সালমান ইকবাল') {
    return {
      name: isBn ? 'সালমান ইকবাল' : 'Salman Iqbal',
      title: isBn ? 'ব্র্যান্ড ম্যানেজার' : 'Brand Manager',
      photo: '/images/chef-mentor-portrait.jpg',
      profileUrl: ''
    };
  } else {
    return {
      name: authorName || (isBn ? 'কালিনারি একাডেমি মেন্টর' : 'Culinary Academy Mentor'),
      title: isBn ? 'মেন্টর, কালিনারি একাডেমি' : 'Mentor, Culinary Academy',
      photo: '/images/logo.svg',
      profileUrl: ''
    };
  }
}

export default async function BlogPostPage({ params: { locale, slug } }: BlogPostProps) {
  const posts = await fetchBlogs(locale);
  const postIndex = posts.findIndex(p => p.slug === slug);
  
  if (postIndex === -1) notFound();

  const post = posts[postIndex];
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  // Prepare schemas
  const schemas: any[] = [
    generateWebPageSchema({
      title: post.title,
      description: post.excerpt,
      url: `https://culinaryacademy.com/${locale}/blog/${slug}`
    }),
    generateArticleSchema({
      title: post.title,
      description: post.excerpt,
      image: post.featuredImage.startsWith('http') ? post.featuredImage : `https://culinaryacademy.com${post.featuredImage}`,
      datePublished: post.date,
      author: post.author,
      locale: locale
    }),
    generateBreadcrumbSchema([
      { name: locale === 'en' ? 'Home' : 'হোম', item: `https://culinaryacademy.com/${locale}` },
      { name: locale === 'en' ? 'Intel Archive' : 'আর্কাইভ', item: `https://culinaryacademy.com/${locale}/blog` },
      { name: post.title, item: `https://culinaryacademy.com/${locale}/blog/${slug}` }
    ])
  ];

  // Add VideoObject schema if videoUrl is present in the blog post JSON
  if (post.videoUrl) {
    schemas.push(
      generateVideoObjectSchema({
        name: post.videoTitle || post.title,
        description: post.videoDescription || post.excerpt,
        thumbnailUrl: post.videoThumbnailUrl || (post.featuredImage.startsWith('http') ? post.featuredImage : `https://culinaryacademy.com${post.featuredImage}`),
        uploadDate: post.videoUploadDate || post.date,
        embedUrl: post.videoUrl
      })
    );
  }

  // Add FAQ schema if available
  if (post.faq && Array.isArray(post.faq) && post.faq.length > 0) {
    schemas.push(
      generateFAQSchema(
        post.faq.map((item: any) => ({
          question: item.question,
          seoAnswer: item.answer || item.seoAnswer
        }))
      )
    );
  }

  // Add HowTo schema dynamically if headings have steps
  if (slug.includes('how-to') || slug.includes('start-') || slug.includes('process') || slug.includes('business')) {
    const steps: { name: string, text: string }[] = [];
    const regex = /##\s+(\d+|[০-৯]+)\.\s*(.*?)\n([\s\S]*?)(?=\n##|$)/g;
    let match;
    while ((match = regex.exec(post.content || '')) !== null) {
      const stepName = match[2].trim();
      const stepText = match[3]
        .replace(/[#*\[\]\(\)_`~-]/g, '')
        .trim()
        .split('\n')[0];
      if (stepName && stepText) {
        steps.push({ name: stepName, text: stepText });
      }
    }
    if (steps.length > 0) {
      schemas.push(
        generateHowToSchema({
          name: post.title,
          description: post.excerpt,
          steps: steps
        })
      );
    }
  }

  // Extract headings for TOC
  const headings: { id: string, text: string }[] = [];
  const regexH2 = /##\s+(.*?)\n/g;
  let matchH2;
  while ((matchH2 = regexH2.exec(post.content || '')) !== null) {
    const text = matchH2[1].replace(/[#*\[\]\(\)_`~-]/g, '').trim();
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (text && id) headings.push({ id, text });
  }

  // Calculate reading time
  const words = (post.content || '').split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <Suspense fallback={null}>
      <article className="min-h-screen bg-obsidian text-white">
        <SchemaInjector schemas={schemas} />
        {/* Article Hero */}
        <header className="pt-10 md:pt-14 pb-16 section-padding relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(236,27,35,0.05),transparent)]"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center text-prestige-gold font-bold text-[10px] uppercase tracking-widest mb-10 hover:gap-3 transition-all group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Intel Archive
            </Link>
            
            <div className="flex items-center justify-center gap-4 text-[10px] text-white/40 mb-8 font-black uppercase tracking-[0.3em]">
              <span className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10">{post.category}</span>
              <div className="w-1.5 h-1.5 bg-power-red rounded-full shadow-[0_0_10px_rgba(236,27,35,0.8)]"></div>
              <span>{post.date}</span>
              {post.lastReviewed && (
                <>
                  <div className="w-1.5 h-1.5 bg-prestige-gold rounded-full shadow-[0_0_10px_rgba(202,152,73,0.8)]"></div>
                  <span className="bg-prestige-gold/15 text-prestige-gold border border-prestige-gold/25 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider animate-pulse">
                    {locale === 'bn' ? 'আপডেটেড ২০২৬' : 'Updated for 2026'}
                  </span>
                </>
              )}
              <div className="w-1.5 h-1.5 bg-prestige-gold rounded-full shadow-[0_0_10px_rgba(202,152,73,0.8)]"></div>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-prestige-gold" />
                {readingTime} {locale === 'bn' ? 'মিনিট পাঠ' : 'min read'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-16 uppercase">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-16 rounded-[1.2rem] bg-white/5 border border-white/10 flex items-center justify-center text-prestige-gold font-black text-2xl shadow-2xl relative overflow-hidden group/author">
                <div className="absolute inset-0 bg-prestige-gold/10 opacity-0 group-hover/author:opacity-100 transition-opacity duration-700"></div>
                <span className="relative z-10">{post.author[0]}</span>
              </div>
              <div className="text-left">
                <p className="text-white/30 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">Lead Analyst</p>
                <p className="text-white font-black text-xl tracking-tight">{post.author}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-4 relative z-20">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 group">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[3000ms]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
            <WatermarkOverlay opacity="opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-4 py-24 md:py-32">
          <div className="glass-card p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] opacity-[0.02] pointer-events-none"></div>
            
            <BlogTOC headings={headings} locale={locale} />
            
            <div className="prose prose-invert prose-lg max-w-none 
              prose-p:text-gray-400 prose-p:leading-relaxed prose-p:font-medium
              prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
              prose-strong:text-prestige-gold prose-strong:font-bold
              prose-a:text-power-red prose-a:no-underline hover:prose-a:underline prose-a:font-bold transition-all
              prose-li:text-gray-400 prose-li:font-medium
              prose-blockquote:border-l-power-red prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:text-white/80 prose-blockquote:font-bold prose-blockquote:italic
              prose-img:rounded-3xl prose-img:border prose-img:border-white/5 prose-img:shadow-2xl
            ">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => {
                    const text = String(props.children).replace(/[#*\[\]\(\)_`~-]/g, '').trim();
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    return <h2 id={id} className="scroll-mt-32" {...props} />;
                  },
                  a: ({ node, ...props }) => {
                    if (props.href?.startsWith('/')) {
                      return <Link href={`/${locale}${props.href}`} {...props} className="text-power-red hover:underline font-bold" />;
                    }
                    return <a {...props} target="_blank" rel="noopener noreferrer" className="text-power-red hover:underline font-bold" />;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Quick Answers (PAA) Block */}
            {post.faq && Array.isArray(post.faq) && post.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <QuickAnswers
                  items={post.faq.slice(0, 4).map((f: any) => ({
                    question: f.question,
                    answer: f.seoAnswer || f.answer
                  }))}
                  title={locale === 'bn' ? "কুইক অ্যানসারস (PAA)" : "Quick Answers (PAA)"}
                  subtitle={locale === 'bn' ? "ভয়েস ও সার্চ ইঞ্জিন FAQ" : "Voice & Search Engine FAQs"}
                />
              </div>
            )}

            {/* Full FAQ Section */}
            {post.faq && Array.isArray(post.faq) && post.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                <h4 className="text-prestige-gold text-xs font-bold tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-power-red rounded-full shadow-[0_0_10px_rgba(236,27,35,0.8)]"></span>
                  {locale === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions (FAQ)'}
                </h4>
                <InlineFAQ
                  questions={post.faq.map((f: any) => ({
                    question: f.question,
                    answer: f.fullAnswer || f.answer || f.seoAnswer
                  }))}
                />
              </div>
            )}

            {/* Author Box Component */}
            <div className="mt-12 pt-8 border-t border-white/10">
              {(() => {
                const authorDetails = getAuthorDetails(post.author, locale);
                return (
                  <AuthorBox
                    name={authorDetails.name}
                    title={authorDetails.title}
                    photo={authorDetails.photo}
                    profileUrl={authorDetails.profileUrl}
                    lastReviewed={post.lastReviewed || post.date}
                    locale={locale}
                  />
                );
              })()}
            </div>

            {/* Related Resources Block */}
            <div className="mt-16 pt-12 border-t border-white/10 relative z-10">
              <h4 className="text-prestige-gold text-xs font-bold tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-power-red rounded-full shadow-[0_0_10px_rgba(236,27,35,0.8)]"></span>
                {locale === 'bn' ? 'সম্পর্কিত রিসোর্সসমূহ' : 'Related Resources'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  href={`/${locale}/courses`}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="text-sm font-bold text-white group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'আমাদের প্রফেশনাল শেফ কোর্সটি দেখুন' : 'Explore Our Professional Chef Course'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
                <Link 
                  href={`/${locale}/admission`}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="text-sm font-bold text-white group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'এখনই আবেদন করুন' : 'Apply Now'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
                {post.category === 'Chef Career Path' && (
                  <Link 
                    href={`/${locale}/about`}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-between group sm:col-span-2"
                  >
                    <span className="text-sm font-bold text-white group-hover:text-prestige-gold transition-colors">
                      {locale === 'bn' ? 'আমাদের ফ্যাকাল্টি ও মেন্টরদের সম্পর্কে জানুন' : 'Learn About Our Expert Chef Mentors'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
                )}
                {(post.category === 'Food Business' || post.category === 'Food Business & Entrepreneurship') && (
                  <Link 
                    href={`/${locale}/industry-partners`}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-between group sm:col-span-2"
                  >
                    <span className="text-sm font-bold text-white group-hover:text-prestige-gold transition-colors">
                      {locale === 'bn' ? 'আমাদের ইন্ডাস্ট্রি পার্টনারদের তালিকা দেখুন' : 'Explore Our Industry Partners'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
                )}
              </div>
            </div>

            <BlogShareButtons title={post.title} locale={locale} />
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
            {prevPost ? (
              <Link 
                href={`/${locale}/blog/${prevPost.slug}`}
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 transition-all duration-700 flex flex-col text-left hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
              >
                <span className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Previous Insight</span>
                <span className="text-xl font-black text-white group-hover:text-prestige-gold transition-colors line-clamp-2 tracking-tighter uppercase leading-tight">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link 
                href={`/${locale}/blog/${nextPost.slug}`}
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 transition-all duration-700 flex flex-col text-right hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
              >
                <span className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Next Insight</span>
                <span className="text-xl font-black text-white group-hover:text-prestige-gold transition-colors line-clamp-2 tracking-tighter uppercase leading-tight">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>
    </Suspense>

  );
}
