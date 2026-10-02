import React from 'react';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import FAQSearchFilter from '@/components/faq/FAQSearchFilter';
import SchemaInjector from '@/components/global/SchemaInjector';
import { generateWebPageSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { BookOpen, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';
import { getMarketingPage } from '@/lib/marketingApi';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const pageData = await getMarketingPage("faq", locale);
  const data: any = pageData?.content || { hero: { heading: "FAQ", subheading: "Common Questions" } };

  const title = pageData?.seo_title || `${data?.hero?.heading || 'FAQ'} | CIB`;
  const description = pageData?.seo_description || data?.hero?.subheading || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/faq`,
      type: 'website',
      siteName: 'Culinary Institute of Bangladesh',
      images: [{ url: 'https://cibdhk.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://cibdhk.com/images/og-default.png'],
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/faq`,
      languages: {
        'en': `https://cibdhk.com/en/faq`,
        'bn': `https://cibdhk.com/bn/faq`,
        'x-default': `https://cibdhk.com/en/faq`,
      }
    }
  };
}

import Image from 'next/image';

export default async function FAQPage({ params: { locale } }: Props) {
  const pageData = await getMarketingPage("faq", locale);
  const data: any = pageData?.content || { 
    hero: { heading: "FAQ", subheading: "Common Questions" },
    categories: [],
    cta: { heading: "Need more help?", subtext: "", buttonText: "Contact Us", buttonLink: "/contact" }
  };

  return (
    <main className="min-h-screen bg-obsidian relative overflow-hidden">
      <SchemaInjector 
        schemas={[
          generateWebPageSchema({
            title: `${data?.hero?.heading || 'FAQ'} | CIB`,
            description: data?.hero?.subheading || '',
            url: `https://cibdhk.com/${locale}/faq`
          }),
          generateFAQSchema((data?.categories || []).flatMap((cat: any) => cat.faqs || [])),
          generateBreadcrumbSchema([
            { name: locale === 'en' ? 'Home' : 'হোম', item: `https://cibdhk.com/${locale}` },
            { name: data?.hero?.heading || 'FAQ', item: `https://cibdhk.com/${locale}/faq` }
          ])
        ]} 
      />

      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_2-1920w.webp"
          alt="FAQ Background"
          fill
          className="object-cover opacity-5 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="relative pt-24 pb-16 text-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-10">
              Information Protocol
            </div>
            <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8 uppercase">
              {data.hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              {data.hero.subheading}
            </p>
            <div className="w-24 h-1 bg-power-red mx-auto mt-12 rounded-full shadow-[0_0_30px_rgba(236,27,35,0.5)]"></div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 md:py-24 section-padding relative">
          {/* Subtle Decorative Image */}
          <div className="absolute top-1/2 left-0 w-full h-96 -translate-y-1/2 pointer-events-none opacity-[0.03] grayscale overflow-hidden">
            <Image 
              src="/images/practical_class_3-1920w.webp" 
              alt="Decorative Background" 
              fill
              className="object-cover"
            />
          </div>

          <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
            <FAQSearchFilter categories={data.categories} locale={locale} />
          </div>
        </section>

        {/* Ready to Start CTA */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-6 uppercase">
                {locale === 'bn' ? 'আপনার ভবিষ্যৎ' : 'Your Future'}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6">
                {locale === 'bn' ? 'শুরু করতে প্রস্তুত?' : 'Ready to Start?'}
              </h2>
              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                {locale === 'bn' 
                  ? 'আপনার রন্ধনশিল্পের যাত্রা শুরু করুন বাংলাদেশের সেরা ইনস্টিটিউটের সাথে।' 
                  : 'Begin your culinary journey with the premier institute in Bangladesh.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href={`/${locale}/courses`}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-power-red/10 border border-power-red/20 flex items-center justify-center text-power-red mb-6 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase mb-3 group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'কোর্স সমূহ' : 'Explore Courses'}
                  </h3>
                  <p className="text-sm text-white/60 mb-8">
                    {locale === 'bn' ? 'আমাদের পেশাদার শেফ কোর্সসমূহ দেখুন' : 'View our professional chef programs'}
                  </p>
                </div>
                <div className="flex items-center text-prestige-gold text-xs font-bold uppercase tracking-wider gap-2 mt-auto">
                  <span>{locale === 'bn' ? 'বিস্তারিত দেখুন' : 'Learn More'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </Link>

              <Link 
                href={`/${locale}/admission`}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-power-red/10 border border-power-red/20 flex items-center justify-center text-power-red mb-6 group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase mb-3 group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'এখনই আবেদন করুন' : 'Apply Now'}
                  </h3>
                  <p className="text-sm text-white/60 mb-8">
                    {locale === 'bn' ? 'আপনার ক্যারিয়ারের নতুন দিগন্ত উন্মোচন করুন' : 'Take the first step toward your career'}
                  </p>
                </div>
                <div className="flex items-center text-prestige-gold text-xs font-bold uppercase tracking-wider gap-2 mt-auto">
                  <span>{locale === 'bn' ? 'আবেদন ফর্ম' : 'Apply Online'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </Link>

              <Link 
                href={`/${locale}/expert-culinary-mentors`}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-power-red/10 border border-power-red/20 flex items-center justify-center text-power-red mb-6 group-hover:scale-110 transition-transform duration-500">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase mb-3 group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'মেন্টরদের সাথে দেখা করুন' : 'Meet Your Instructors'}
                  </h3>
                  <p className="text-sm text-white/60 mb-8">
                    {locale === 'bn' ? 'আন্তর্জাতিকভাবে অভিজ্ঞ শেফদের থেকে শিখুন' : 'Learn from internationally experienced chefs'}
                  </p>
                </div>
                <div className="flex items-center text-prestige-gold text-xs font-bold uppercase tracking-wider gap-2 mt-auto">
                  <span>{locale === 'bn' ? 'প্রোফাইল দেখুন' : 'View Faculty'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-power-red/5 backdrop-blur-2xl border-t border-white/5"></div>
          {/* Final CTA Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/student-practice-6-1920w.webp"
              alt="CIB Training"
              fill
              className="object-cover opacity-[0.03] grayscale"
            />
          </div>
          
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-10 uppercase">
              Still Curious?
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tighter leading-[1.1] uppercase">
              {data.cta.heading}
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              {data.cta.subtext}
            </p>
            <Link 
              href={`/${locale}${data.cta.buttonLink}`}
              className="btn-primary inline-flex items-center gap-4 group uppercase"
            >
              {data.cta.buttonText}
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
