import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { redirect } from '@/navigation';
import { getPublicMentorsList } from '@/lib/marketingApi';
import Image from 'next/image';
import Link from 'next/link';
import SchemaInjector from "@/components/global/SchemaInjector";
import { 
  generateBreadcrumbSchema, 
  generateWebPageSchema,
  generateProfilePageSchema
} from "@/lib/seo";
import { 
  Shield, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Globe, 
  Tv, 
  ArrowRight, 
  BookOpen, 
  Star,
  ExternalLink
} from 'lucide-react';

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163c0 0-.199-1.403-.812-2.02-.778-.813-1.65-.817-2.05-.865C17.78 3 12 3 12 3s-5.78 0-8.636.278c-.4.048-1.272.052-2.05.865-.613.617-.812 2.02-.812 2.02S0 8.01 0 12v1.99c0 0 .199 1.403.812 2.02.778.813 1.65.817 2.05.865C6.22 17 12 17 12 17s5.78 0 8.636-.278c.4-.048 1.272-.052 2.05-.865.613-.617.812-2.02.812-2.02S24 13.99 24 12v-1.99c0 0-.199-1.403-.812-2.02zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);


interface MentorData {
  name: string;
  title: string;
  photo: string;
  bio: string;
  credentials: string[];
  mediaAppearances: {
    title: string;
    url: string;
    thumbnail?: string;
    platform: string;
    description: string;
  }[];
  cta: string;
  ctaLink: string;
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  let mentorData: MentorData | null = null;
  const mentorDataPath = path.join(process.cwd(), `content/${locale}/mentors/${slug}.json`);
  
  try {
    if (fs.existsSync(mentorDataPath)) {
      mentorData = JSON.parse(fs.readFileSync(mentorDataPath, 'utf8'));
    } else {
      const allMentorsPath = path.join(process.cwd(), `content/${locale}/mentors.json`);
      if (fs.existsSync(allMentorsPath)) {
        const allMentors = JSON.parse(fs.readFileSync(allMentorsPath, 'utf8'));
        const found = allMentors.mentors.find((m: any) => m.id === slug);
        if (found) {
          mentorData = { ...found, mediaAppearances: found.mediaAppearances || [] };
        }
      }
    }
  } catch (e) {
    console.error("Error generating metadata for mentor page:", e);
  }

  try {
    const backendMentors = await getPublicMentorsList(locale);
    const foundInBackend = backendMentors.find((m: any) => m.id === slug);
    if (foundInBackend) {
      mentorData = {
        ...mentorData,
        ...foundInBackend,
        mediaAppearances: mentorData?.mediaAppearances || foundInBackend.mediaAppearances || []
      };
    }
  } catch (e) {
    console.error("Error merging backend mentor data for metadata:", e);
  }

  if (!mentorData) {
    return {
      title: 'Mentor Profile | CIB',
    };
  }

  const title = `${mentorData.name} | ${mentorData.title} | CIB`;
  const description = mentorData.bio.substring(0, 160) + '...';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/expert-culinary-mentors/${slug}`,
      type: 'profile',
      images: [{ url: mentorData.photo, width: 600, height: 600, alt: mentorData.name }],
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/expert-culinary-mentors/${slug}`,
      languages: {
        'en': `https://cibdhk.com/en/expert-culinary-mentors/${slug}`,
        'bn': `https://cibdhk.com/bn/expert-culinary-mentors/${slug}`,
        'x-default': `https://cibdhk.com/en/expert-culinary-mentors/${slug}`,
      }
    }
  };
}

export default async function MentorDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  let mentorData: MentorData | null = null;
  const mentorDataPath = path.join(process.cwd(), `content/${locale}/mentors/${slug}.json`);

  try {
    if (fs.existsSync(mentorDataPath)) {
      mentorData = JSON.parse(fs.readFileSync(mentorDataPath, 'utf8'));
    } else {
      const allMentorsPath = path.join(process.cwd(), `content/${locale}/mentors.json`);
      if (fs.existsSync(allMentorsPath)) {
        const allMentors = JSON.parse(fs.readFileSync(allMentorsPath, 'utf8'));
        const found = allMentors.mentors.find((m: any) => m.id === slug);
        if (found) {
          mentorData = { ...found, mediaAppearances: found.mediaAppearances || [] };
        }
      }
    }
  } catch (error) {
    console.error("Error loading mentor detail data:", error);
  }

  try {
    const backendMentors = await getPublicMentorsList(locale);
    const foundInBackend = backendMentors.find((m: any) => m.id === slug);
    if (foundInBackend) {
      mentorData = {
        ...mentorData,
        ...foundInBackend,
        mediaAppearances: mentorData?.mediaAppearances || foundInBackend.mediaAppearances || []
      };
    }
  } catch (e) {
    console.error("Error merging backend mentor data:", e);
  }

  if (!mentorData) {
    notFound();
  }

  // Map credentials to specific high-authority icons for elite presentation
  const getCredIcon = (index: number) => {
    switch (index % 4) {
      case 0: return <Shield className="w-6 h-6 text-prestige-gold shrink-0" />;
      case 1: return <Award className="w-6 h-6 text-prestige-gold shrink-0" />;
      case 2: return <GraduationCap className="w-6 h-6 text-prestige-gold shrink-0" />;
      default: return <BookOpen className="w-6 h-6 text-prestige-gold shrink-0" />;
    }
  };

  const sameAsLinks = [
    "https://www.facebook.com/cibdhaka",
    "https://www.youtube.com/@cibdhaka",
    "https://www.instagram.com/cib.dhk/",
    "https://www.tiktok.com/@cibdhaka",
    "https://wa.me/8801338958997",
    "https://www.linkedin.com/company/cibdhk"
  ];
  
  if (slug === 'dewan-ismail') {
    if (mentorData.mediaAppearances && Array.isArray(mentorData.mediaAppearances)) {
      mentorData.mediaAppearances.forEach((media: any) => {
        if (media.url && !sameAsLinks.includes(media.url)) {
          sameAsLinks.push(media.url);
        }
      });
    }
  } else if (slug === 'rafeya-chowdhury' || mentorData.name.includes('Rafeya')) {
    sameAsLinks.push("https://www.youtube.com/@btv");
  }

  // Generate Person Schema for maximum E-E-A-T
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": mentorData.name,
    "jobTitle": mentorData.title,
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "The Culinary Institute of Bangladesh (CIB)",
      "url": "https://cibdhk.com"
    },
    "image": `https://cibdhk.com${mentorData.photo}`,
    "description": mentorData.bio,
    "sameAs": sameAsLinks,
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Jagannath University"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Daffodil International University"
      }
    ],
    "knowsAbout": [
      "Culinary Arts",
      "Food Safety",
      "HACCP & Hygiene",
      "Hospitality Management",
      "Vocational Culinary Education"
    ]
  };
  
  const profilePageSchema = generateProfilePageSchema({
    name: mentorData.name,
    image: `https://cibdhk.com${mentorData.photo}`,
    jobTitle: mentorData.title,
    worksFor: "The Culinary Institute of Bangladesh (CIB)",
    description: mentorData.bio,
    sameAs: sameAsLinks,
    url: `https://cibdhk.com/${locale}/expert-culinary-mentors/${slug}`
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: locale === 'bn' ? 'হোম' : 'Home', item: `https://cibdhk.com/${locale}` },
    { name: locale === 'bn' ? 'আমাদের মেন্টরবৃন্দ' : 'Expert Culinary Mentors', item: `https://cibdhk.com/${locale}/expert-culinary-mentors` },
    { name: mentorData.name, item: `https://cibdhk.com/${locale}/expert-culinary-mentors/${slug}` }
  ]);

  // Premium inline fallback portrait SVG to prevent build/run breakage
  const photoFallbackUrl = mentorData.photo;

  return (
    <main className="bg-obsidian min-h-screen text-white relative overflow-hidden">
      <SchemaInjector schemas={[personSchema, profilePageSchema, breadcrumbs]} />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prestige-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[-100px] w-[600px] h-[600px] bg-power-red/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-prestige-gold/5 rounded-full blur-[200px] pointer-events-none"></div>

      {/* Hero section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group hover:border-prestige-gold/30 transition-all duration-700">
                
                {/* Prestige Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-power-red/10 via-transparent to-prestige-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none"></div>
                
                {/* Next.js Image with premium loading effect */}
                <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
                  <Image
                    src={photoFallbackUrl}
                    alt={mentorData.name}
                    fill
                    priority
                    sizes="(max-w-768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-[3000ms] grayscale hover:grayscale-0"
                  />
                  
                  {/* Badge */}
                  <div className="absolute bottom-8 left-8 right-8 z-20 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/5 text-center">
                    <span className="text-prestige-gold text-[10px] font-extrabold tracking-[0.25em] uppercase block mb-1">
                      {locale === 'bn' ? 'প্রতিষ্ঠাতা ও প্রিন্সিপাল' : 'FOUNDER & PRINCIPAL'}
                    </span>
                    <span className="text-xs text-white/80 font-bold block">
                      The Culinary Institute of Bangladesh
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Details & Title */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[2px] w-12 bg-power-red"></span>
                <span className="text-prestige-gold font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase">
                  {locale === 'bn' ? 'লিডারশিপ ও ক্যারিয়ার গাইডেন্স' : 'Leadership & Career Guidance'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-none">
                {mentorData.name}
              </h1>

              <p className="text-prestige-gold text-lg md:text-xl font-bold tracking-wide mb-8 border-l-2 border-prestige-gold/30 pl-4 py-1">
                {mentorData.title}
              </p>

              <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-24 h-24 bg-prestige-gold/5 rounded-full blur-2xl"></div>
                <h2 className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-4">
                  {locale === 'bn' ? 'পরিচিতি ও ভিশন' : 'About Dewan Ismail'}
                </h2>
                <p className="text-gray-300 leading-relaxed font-medium text-sm md:text-base">
                  {mentorData.bio}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link
                  href={mentorData.ctaLink || "/admission"}
                  className="btn-primary w-full sm:w-auto text-center px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase bg-power-red text-white shadow-[0_15px_40px_rgba(236,27,35,0.4)] hover:shadow-[0_15px_60px_rgba(236,27,35,0.6)] transition-all duration-500 hover:scale-[1.02]"
                >
                  {mentorData.cta}
                </Link>
                
                <Link
                  href="/contact"
                  className="w-full sm:w-auto text-center px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase border border-white/10 hover:border-prestige-gold/50 bg-white/5 hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  {locale === 'bn' ? 'যোগাযোগ করুন' : 'Talk to Us'}
                  <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-black/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-prestige-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">
              {locale === 'bn' ? 'যোগ্যতা ও অর্জনসমূহ' : 'Authority & Accomplishments'}
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'bn' ? 'আন্তর্জাতিক মানসম্পন্ন পেশাদারি ক্রেডেনশিয়াল' : 'Elite Professional Credentials'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mentorData.credentials.map((cred, i) => (
              <div 
                key={i} 
                className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-500 flex items-start gap-4"
              >
                {getCredIcon(i)}
                <div>
                  <h3 className="text-white font-bold text-sm leading-snug">
                    {cred}
                  </h3>
                  <span className="text-[10px] font-bold text-prestige-gold/50 tracking-wider uppercase block mt-2">
                    {locale === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                  </span>
                </div>
              </div>
            ))}
            
            {/* NSDA/BTEB Institution Card */}
            <div className="glass-card p-6 rounded-2xl border border-prestige-gold/20 bg-prestige-gold/5 flex items-start gap-4 lg:col-span-2 xl:col-span-1">
              <Star className="w-6 h-6 text-prestige-gold shrink-0 fill-prestige-gold" />
              <div>
                <h3 className="text-white font-bold text-sm leading-snug">
                  {locale === 'bn' ? 'এনএসডিএ ও বিটিইবি সার্টিফাইড ইন্সট্রাকশন' : 'NSDA & BTEB Certified Instruction'}
                </h3>
                <p className="text-gray-400 text-xs mt-2">
                  {locale === 'bn' ? 'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ অনুমোদিত কালিনারি প্রশিক্ষক।' : 'Approved culinary instructor under the National Skills Development Authority, Prime Minister\'s Office.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media & TV Appearances Section */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-8 bg-power-red"></span>
                <span className="text-prestige-gold font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase">
                  {locale === 'bn' ? 'মিডিয়া ও জাতীয় টেলিভিশন' : 'Media & Thought Leadership'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {locale === 'bn' ? 'টেলিভিশন ফিচার এবং আলোচনা সভা' : 'Media Appearances & TV Features'}
              </h2>
            </div>
            
            <p className="text-gray-400 max-w-md text-sm md:text-base font-medium">
              {locale === 'bn' 
                ? 'বাংলাদেশের কালিনারি প্রশিক্ষণ ও ক্যারিয়ার গঠন নিয়ে জাতীয় টিভি বিটিভিসহ বিভিন্ন মাধ্যমে প্রিন্সিপালের গঠনমূলক বক্তব্য।' 
                : 'Watch Principal Dewan Ismail discuss the evolution of vocational chef training and global hospitality pathways.'
              }
            </p>
          </div>

          {/* YouTube Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentorData.mediaAppearances.map((media, i) => {
              // Extract video ID from URL
              let videoId = 'ayKFD3Nzqag';
              if (media.url.includes('youtu.be/')) {
                videoId = media.url.split('youtu.be/')[1].split('?')[0];
              } else if (media.url.includes('watch?v=')) {
                videoId = media.url.split('watch?v=')[1].split('&')[0];
              }

              return (
                <div 
                  key={i} 
                  className="glass-card rounded-3xl overflow-hidden border border-white/5 bg-white/5 flex flex-col h-full hover:border-prestige-gold/20 transition-all duration-500 group"
                >
                  {/* Embedded lazy load video */}
                  <div className="relative aspect-video w-full bg-slate-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={media.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    ></iframe>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-4">
                      {media.platform.toLowerCase() === 'btv' || media.platform === 'বিটিভি' ? (
                        <span className="bg-power-red text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-[0_5px_15px_rgba(236,27,35,0.2)]">
                          <Tv className="w-3 h-3" />
                          {media.platform}
                        </span>
                      ) : (
                        <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-[0_5px_15px_rgba(220,38,38,0.2)]">
                          <YoutubeIcon className="w-3 h-3" />
                          {media.platform}
                        </span>
                      )}
                    </div>

                    <h3 className="text-white font-bold text-base tracking-tight mb-2 group-hover:text-prestige-gold transition-colors line-clamp-2">
                      {media.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed flex-grow line-clamp-3">
                      {media.description}
                    </p>

                    <a 
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 text-[10px] font-extrabold tracking-widest text-prestige-gold uppercase hover:text-white transition-colors flex items-center gap-2 w-max"
                    >
                      {locale === 'bn' ? 'ভিডিও লিঙ্ক দেখুন' : 'Watch on YouTube'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Global Authority Footer Banner */}
      <section className="py-20 relative overflow-hidden z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-20">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 mb-8 shadow-2xl">
            <Shield className="w-8 h-8 text-prestige-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
            {locale === 'bn' 
              ? 'প্রিন্সিপাল দেওয়ান ইসমাইলের নির্দেশনায় গ্লোবাল ক্যারিয়ার গড়ুন' 
              : 'Begin Your Culinary Journey Under Elite Guidance'
            }
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            {locale === 'bn'
              ? 'আমাদের বিশ্বমানের ল্যাব ও সরাসরি দেওয়ান ইসমাইলের তত্ত্বাবধানে হাতে-কলমে প্রশিক্ষণ নিয়ে অর্জন করুন আন্তর্জাতিক শেফ সার্টিফিকেশন।'
              : 'Master fine dining culinary arts and food safety standards with hands-on instructions certified by SGS Switzerland and BTEB.'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={mentorData.ctaLink || "/admission"}
              className="btn-primary w-full sm:w-auto px-10 py-4.5 rounded-xl font-bold tracking-widest text-xs uppercase"
            >
              {mentorData.cta}
            </Link>
            <Link
              href="/expert-culinary-mentors"
              className="w-full sm:w-auto px-10 py-4.5 rounded-xl font-bold tracking-widest text-xs uppercase border border-white/10 hover:border-white/30 bg-white/5 transition-all duration-300"
            >
              {locale === 'bn' ? 'মেন্টর পেজে ফিরে যান' : 'Back to Mentors'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
