import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo";
import { 
  Tv, 
  FileText, 
  ExternalLink, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163c0 0-.199-1.403-.812-2.02-.778-.813-1.65-.817-2.05-.865C17.78 3 12 3 12 3s-5.78 0-8.636.278c-.4.048-1.272.052-2.05.865-.613.617-.812 2.02-.812 2.02S0 8.01 0 12v1.99c0 0 .199 1.403.812 2.02.778.813 1.65.817 2.05.865C6.22 17 12 17 12 17s5.78 0 8.636-.278c.4-.048 1.272-.052 2.05-.865.613-.617.812-2.02.812-2.02S24 13.99 24 12v-1.99c0 0-.199-1.403-.812-2.02zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface PressMediaData {
  hero: {
    heading: string;
    subheading: string;
    cta: string;
  };
  featuredTv: {
    title: string;
    url: string;
    platform: string;
    reporter: string;
    date: string;
    description: string;
  }[];
  youtubeAppearances: {
    title: string;
    url: string;
    platform: string;
    views: string;
    description: string;
  }[];
  pressMentions: {
    publisher: string;
    title: string;
    date: string;
    summary: string;
  }[];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const pressDataPath = path.join(process.cwd(), `content/${locale}/press-media.json`);
  let pressData = { hero: { heading: "Press & Media Coverage", subheading: "CIB in the News" } };
  
  try {
    if (fs.existsSync(pressDataPath)) {
      pressData = JSON.parse(fs.readFileSync(pressDataPath, 'utf8'));
    }
  } catch (e) {}

  const title = `${pressData.hero.heading} | Culinary Institute of Bangladesh`;
  const description = pressData.hero.subheading;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/press-media`,
      type: 'website',
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/press-media`,
      languages: {
        'en': `https://cibdhk.com/en/press-media`,
        'bn': `https://cibdhk.com/bn/press-media`,
        'x-default': `https://cibdhk.com/en/press-media`,
      }
    }
  };
}

export default function PressMediaPage({ params: { locale } }: { params: { locale: string } }) {
  const pressDataPath = path.join(process.cwd(), `content/${locale}/press-media.json`);
  let pressData: PressMediaData = {
    hero: { heading: "Press & Media", subheading: "", cta: "" },
    featuredTv: [],
    youtubeAppearances: [],
    pressMentions: []
  };

  try {
    if (fs.existsSync(pressDataPath)) {
      pressData = JSON.parse(fs.readFileSync(pressDataPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading press media data:", error);
  }

  // Generate NewsArticle JSON-LD schemas
  const schemas = pressData.featuredTv.map((tv, idx) => ({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": tv.title,
    "image": "https://cibdhk.com/images/btv-feature-thumb.jpg",
    "datePublished": tv.date,
    "author": {
      "@type": "Organization",
      "name": "CIB"
    },
    "publisher": {
      "@type": "Organization",
      "name": tv.platform,
      "logo": {
        "@type": "ImageObject",
        "url": "https://cibdhk.com/images/logo_cib.png"
      }
    },
    "description": tv.description
  }));

  const breadcrumbs = generateBreadcrumbSchema([
    { name: locale === 'bn' ? 'হোম' : 'Home', item: `https://cibdhk.com/${locale}` },
    { name: pressData.hero.heading, item: `https://cibdhk.com/${locale}/press-media` }
  ]);

  return (
    <main className="bg-obsidian min-h-screen text-white relative overflow-hidden">
      <SchemaInjector schemas={[...schemas, breadcrumbs, generateWebPageSchema({
        title: pressData.hero.heading,
        description: pressData.hero.subheading,
        url: `https://cibdhk.com/${locale}/press-media`
      })]} />

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-power-red/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-prestige-gold/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/5 bg-gradient-to-b from-black/60 to-transparent">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-power-red"></span>
            <span className="text-prestige-gold font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase">
              {locale === 'bn' ? 'মিডিয়া কভারেজ ও প্রমাণ' : 'Media Coverage & Authority'}
            </span>
            <span className="h-[2px] w-8 bg-power-red"></span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            {pressData.hero.heading}
          </h1>

          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {pressData.hero.subheading}
          </p>

          <a 
            href="#featured-tv"
            className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-prestige-gold uppercase hover:text-white transition-colors group"
          >
            {pressData.hero.cta}
            <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Featured TV Appearances */}
      <section id="featured-tv" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-prestige-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">
              {locale === 'bn' ? 'জাতীয় টেলিভিশন সম্প্রচার' : 'National TV Broadcasts'}
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'bn' ? 'টেলিভিশন নিউজ কভারেজ ও ফিচার' : 'Featured News & Broadcast Highlights'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {pressData.featuredTv.map((tv, i) => {
              let videoId = 'ayKFD3Nzqag';
              if (tv.url.includes('youtu.be/')) {
                videoId = tv.url.split('youtu.be/')[1].split('?')[0];
              } else if (tv.url.includes('watch?v=')) {
                videoId = tv.url.split('watch?v=')[1].split('&')[0];
              }

              return (
                <div 
                  key={i} 
                  className="glass-card rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 hover:border-prestige-gold/20 transition-all duration-500 flex flex-col h-full shadow-2xl"
                >
                  <div className="relative aspect-video w-full bg-slate-950">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={tv.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    ></iframe>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="bg-power-red text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-[0_5px_15px_rgba(236,27,35,0.3)]">
                        <Tv className="w-3.5 h-3.5" />
                        {tv.platform}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {tv.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-4 leading-snug">
                      {tv.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                      {tv.description}
                    </p>
                    
                    <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between text-xs text-gray-500">
                      <span>{locale === 'bn' ? 'প্রতিবেদক: ' : 'Reporter: '} <strong className="text-white/80">{tv.reporter}</strong></span>
                      <a 
                        href={tv.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-prestige-gold hover:text-white font-bold tracking-wider flex items-center gap-1.5"
                      >
                        {locale === 'bn' ? 'ইউটিউব লিঙ্ক' : 'YouTube Link'}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* YouTube Appearances */}
      <section className="py-20 bg-black/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-prestige-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">
              {locale === 'bn' ? 'ইউটিউব আলোচনা ও মাস্টারক্লাস' : 'YouTube Lectures & Discussions'}
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'bn' ? 'অভিজ্ঞ মেন্টরদের অনলাইন ক্লাস ও আলোচনা' : 'Expert Training Lectures & Culinary Science'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressData.youtubeAppearances.map((youtube, i) => {
              let videoId = 'ayKFD3Nzqag';
              if (youtube.url.includes('youtu.be/')) {
                videoId = youtube.url.split('youtu.be/')[1].split('?')[0];
              } else if (youtube.url.includes('watch?v=')) {
                videoId = youtube.url.split('watch?v=')[1].split('&')[0];
              }

              return (
                <div 
                  key={i} 
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-white/5 flex flex-col h-full hover:border-prestige-gold/20 transition-all duration-500 group"
                >
                  <div className="relative aspect-video w-full bg-slate-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={youtube.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    ></iframe>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="bg-red-600 text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                        <YoutubeIcon className="w-3 h-3" />
                        {youtube.platform}
                      </span>
                      <span className="text-[10px] text-prestige-gold font-bold flex items-center gap-1 bg-prestige-gold/10 px-2.5 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        {youtube.views} {locale === 'bn' ? 'ভিউস' : 'Views'}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-sm tracking-tight mb-2 group-hover:text-prestige-gold transition-colors line-clamp-2">
                      {youtube.title}
                    </h3>
                    
                    <p className="text-gray-400 text-xs leading-relaxed flex-grow line-clamp-3">
                      {youtube.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Press Mentions */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-prestige-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">
              {locale === 'bn' ? 'পত্রপত্রিকায় সিআইবি' : 'News & Press Mentions'}
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'bn' ? 'শীর্ষস্থানীয় জাতীয় সংবাদমাধ্যমে প্রকাশিত প্রতিবেদন' : 'Editorials & Feature Highlights'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pressData.pressMentions.map((mention, i) => (
              <div 
                key={i} 
                className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-500 flex flex-col h-full justify-between relative overflow-hidden group hover:border-prestige-gold/20"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-prestige-gold/5 rounded-full blur-2xl"></div>
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-prestige-gold font-bold text-xs tracking-[0.2em] uppercase border-b border-prestige-gold/30 pb-1">
                      {mention.publisher}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {mention.date}
                    </span>
                  </div>

                  <h3 className="text-white font-extrabold text-lg md:text-xl tracking-tight mb-4 group-hover:text-prestige-gold transition-colors">
                    "{mention.title}"
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {mention.summary}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/5 pt-6 flex justify-end">
                  <span className="text-[10px] font-extrabold tracking-widest text-white/50 uppercase flex items-center gap-2 group-hover:text-white transition-colors">
                    {locale === 'bn' ? 'সংবাদটি বিস্তারিত পড়ুন' : 'Read Publication'}
                    <FileText className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-gradient-to-t from-black/60 to-transparent relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 mb-8 shadow-2xl">
            <Award className="w-8 h-8 text-prestige-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {locale === 'bn' 
              ? 'জাতীয়ভাবে স্বীকৃত সেরা কালিনারি ইনস্টিটিউটে যুক্ত হোন' 
              : 'Join the Nation\'s Leading Accredited Culinary Institute'
            }
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            {locale === 'bn'
              ? 'আমাদের বিশ্বমানের ল্যাব ও সরাসরি দেওয়ান ইসমাইলের তত্ত্বাবধানে হাতে-কলমে প্রশিক্ষণ নিয়ে অর্জন করুন আন্তর্জাতিক শেফ সার্টিফিকেশন।'
              : 'Acquire international credentials and build a high-income hospitality career under certified culinary masters.'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/admission"
              className="btn-primary w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase bg-power-red text-white shadow-[0_15px_40px_rgba(236,27,35,0.4)] hover:shadow-[0_15px_60px_rgba(236,27,35,0.6)] transition-all duration-500 hover:scale-[1.02]"
            >
              {locale === 'bn' ? 'ভর্তি ফর্ম পূরণ করুন' : 'Apply Now'}
            </Link>
            <Link
              href="/courses"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase border border-white/10 hover:border-prestige-gold/50 bg-white/5 hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              {locale === 'bn' ? 'কোর্স সমূহ দেখুন' : 'Explore Courses'}
              <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
