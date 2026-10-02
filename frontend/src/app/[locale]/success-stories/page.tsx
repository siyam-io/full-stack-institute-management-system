import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo";
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  Quote, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  User
} from 'lucide-react';

interface SuccessStoriesData {
  hero: {
    heading: string;
    subheading: string;
    cta: string;
  };
  stories: {
    name: string;
    batch: string;
    course: string;
    currentRole: string;
    company: string;
    photo: string;
    quote: string;
    achievements: string[];
  }[];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const successDataPath = path.join(process.cwd(), `content/${locale}/success-stories.json`);
  let successData = { hero: { heading: "Student Success Stories", subheading: "Our Graduates" } };
  
  try {
    if (fs.existsSync(successDataPath)) {
      successData = JSON.parse(fs.readFileSync(successDataPath, 'utf8'));
    }
  } catch (e) {}

  const title = `${successData.hero.heading} | Culinary Institute of Bangladesh`;
  const description = successData.hero.subheading;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/success-stories`,
      type: 'website',
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/success-stories`,
      languages: {
        'en': `https://cibdhk.com/en/success-stories`,
        'bn': `https://cibdhk.com/bn/success-stories`,
        'x-default': `https://cibdhk.com/en/success-stories`,
      }
    }
  };
}

export default function SuccessStoriesPage({ params: { locale } }: { params: { locale: string } }) {
  const successDataPath = path.join(process.cwd(), `content/${locale}/success-stories.json`);
  let successData: SuccessStoriesData = {
    hero: { heading: "Success Stories", subheading: "", cta: "" },
    stories: []
  };

  try {
    if (fs.existsSync(successDataPath)) {
      successData = JSON.parse(fs.readFileSync(successDataPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading success stories data:", error);
  }

  // Generate Article JSON-LD schemas for each success story
  const schemas = successData.stories.map((story) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${story.name}'s Journey to ${story.company} | CIB`,
    "description": story.quote.substring(0, 160) + '...',
    "image": "https://cibdhk.com/images/default-success-thumb.jpg",
    "datePublished": "2024-06-01",
    "author": {
      "@type": "Organization",
      "name": "CIB"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Culinary Institute of Bangladesh (CIB)",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cibdhk.com/images/logo_cib.png"
      }
    }
  }));

  const breadcrumbs = generateBreadcrumbSchema([
    { name: locale === 'bn' ? 'হোম' : 'Home', item: `https://cibdhk.com/${locale}` },
    { name: successData.hero.heading, item: `https://cibdhk.com/${locale}/success-stories` }
  ]);

  return (
    <main className="bg-obsidian min-h-screen text-white relative overflow-hidden">
      <SchemaInjector schemas={[...schemas, breadcrumbs, generateWebPageSchema({
        title: successData.hero.heading,
        description: successData.hero.subheading,
        url: `https://cibdhk.com/${locale}/success-stories`
      })]} />

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-prestige-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-power-red/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/5 bg-gradient-to-b from-black/60 to-transparent">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-power-red"></span>
            <span className="text-prestige-gold font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase">
              {locale === 'bn' ? 'আমাদের প্রাক্তন শিক্ষার্থীদের অর্জন' : 'Alumni Excellence & Pride'}
            </span>
            <span className="h-[2px] w-8 bg-power-red"></span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            {successData.hero.heading}
          </h1>

          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {successData.hero.subheading}
          </p>

          <a 
            href="#stories-grid"
            className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-prestige-gold uppercase hover:text-white transition-colors group"
          >
            {successData.hero.cta}
            <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section id="stories-grid" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-24">
            {successData.stories.map((story, i) => (
              <div 
                key={i} 
                className="glass-card rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden shadow-2xl hover:bg-white/10 transition-all duration-700 group"
              >
                {/* Visual Background Accents */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-prestige-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-power-red/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Premium Photo or Avatar Fallback */}
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-prestige-gold/30 transition-all duration-500 shadow-2xl bg-gradient-to-tr from-obsidian via-white/5 to-white/10 flex items-center justify-center">
                      <Image 
                        src={story.photo} 
                        alt={story.name} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] grayscale group-hover:grayscale-0"
                      />
                      
                      {/* Stylized SVG Avatar Placeholder fallback in case of missing public images */}
                      <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center z-[-1]">
                        <User className="w-16 h-16 text-prestige-gold/40 mb-2" />
                        <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">{story.name.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Quotes & Achievements */}
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="bg-prestige-gold/15 text-prestige-gold text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-wider uppercase border border-prestige-gold/20">
                        {story.batch}
                      </span>
                      <span className="bg-white/5 text-white/80 text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-wider uppercase border border-white/5 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {story.course}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-2">
                      {story.name}
                    </h2>

                    <p className="text-prestige-gold font-bold text-sm tracking-wide mb-8 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-prestige-gold shrink-0" />
                      {story.currentRole} @ <span className="underline decoration-power-red/50">{story.company}</span>
                    </p>

                    {/* Quote */}
                    <div className="relative px-6 py-6 md:px-8 border-l-2 border-power-red bg-white/5 rounded-r-2xl mb-8">
                      <Quote className="absolute top-2 right-4 w-12 h-12 text-white/5 pointer-events-none transform rotate-180" />
                      <p className="text-gray-300 text-base italic leading-relaxed relative z-10">
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Achievements List */}
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-4">
                        {locale === 'bn' ? 'প্রধান অর্জনসমূহ' : 'Key Milestones & Achievements'}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {story.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-bold leading-tight group/item">
                            <Star className="w-4 h-4 text-prestige-gold shrink-0 fill-prestige-gold/20 group-hover/item:scale-125 transition-transform" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High E-E-A-T Institution Metrics Section */}
      <section className="py-24 bg-black/40 border-y border-white/5 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-prestige-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">
              {locale === 'bn' ? 'পরিসংখ্যানে আমাদের সাফল্য' : 'Proven Placement Records'}
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'bn' ? 'গ্লোবাল হসপিটালিটি সেক্টরে সাফল্যের খতিয়ান' : 'Empowering Careers in Global Hospitality'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/5">
              <span className="text-4xl md:text-5xl font-black text-prestige-gold block mb-2">95%+</span>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest block">
                {locale === 'bn' ? 'চাকরি প্রাপ্তির হার' : 'Employment Placement Rate'}
              </span>
            </div>
            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/5">
              <span className="text-4xl md:text-5xl font-black text-prestige-gold block mb-2">1500+</span>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest block">
                {locale === 'bn' ? 'সফল গ্র্যাজুয়েট' : 'Successful Graduates'}
              </span>
            </div>
            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/5">
              <span className="text-4xl md:text-5xl font-black text-prestige-gold block mb-2">12+</span>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest block">
                {locale === 'bn' ? 'সহযোগী ৫-তারকা হোটেল' : 'Partner 5-Star Hotels'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 mb-8 shadow-2xl">
            <Award className="w-8 h-8 text-prestige-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {locale === 'bn' 
              ? 'আপনার সফল ক্যারিয়ারের প্রথম ধাপ শুরু করুন' 
              : 'Write Your Own Success Story With CIB'
            }
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            {locale === 'bn'
              ? 'বিশ্বমানের প্রশিক্ষণ ও সুনির্দিষ্ট ক্যারিয়ার প্লেসমেন্ট চ্যানেলের মাধ্যমে নিজেকে গড়ুন একজন দক্ষ আন্তর্জাতিক শেফ হিসেবে।'
              : 'Get enrolled in CIB professional chef programs today and transform your passion into a global career.'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/admission"
              className="btn-primary w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase bg-power-red text-white shadow-[0_15px_40px_rgba(236,27,35,0.4)] hover:shadow-[0_15px_60px_rgba(236,27,35,0.6)] transition-all duration-500 hover:scale-[1.02]"
            >
              {successData.hero.cta}
            </Link>
            <Link
              href="/expert-culinary-mentors"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase border border-white/10 hover:border-prestige-gold/50 bg-white/5 hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              {locale === 'bn' ? 'আমাদের মেন্টরদের জানুন' : 'Meet Our Mentors'}
              <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
