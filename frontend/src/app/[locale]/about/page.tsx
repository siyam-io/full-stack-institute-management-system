import AboutHero from "@/components/about/AboutHero";
import StoryBlock from "@/components/about/StoryBlock";
import dynamic from 'next/dynamic';
import fs from 'fs';
import path from 'path';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateWebPageSchema, generateOrganizationSchema, generateFAQSchema } from "@/lib/seo";
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { User, Tv, Award, ArrowRight } from 'lucide-react';
import { getMarketingPage } from "@/lib/marketingApi";
import { getPublicTeamMembers } from "@/lib/cmsApi";
import { resolveImageUrl } from "@/lib/backendApi";

import InlineFAQ from "@/components/global/InlineFAQ";
import TalkToCounselor from "@/components/global/TalkToCounselor";
import AuthorBox from "@/components/global/AuthorBox";
import VideoWithTranscript from "@/components/global/VideoWithTranscript";
import { getBtvVideoData } from "@/lib/videoData";
import QuickAnswers from "@/components/global/QuickAnswers";

// Heavy below-fold sections — lazy loaded so they don't block initial render
const GlobalStandards = dynamic(() => import('@/components/about/GlobalStandards'), { ssr: true });
const OurTeam = dynamic(() => import('@/components/about/OurTeam'), { ssr: true });
const PersonaCards = dynamic(() => import('@/components/about/PersonaCards'), { ssr: true });
const FinalCTA = dynamic(() => import('@/components/home/FinalCTA'), { ssr: true });
const VerificationLink = dynamic(() => import('@/components/global/VerificationLink'), { ssr: true });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const pageData = await getMarketingPage("about", locale);
  const isBn = locale === 'bn';
  const title = pageData?.seo_title || (isBn
    ? 'সিআইবি সম্পর্কে | ঢাকায় এনএসডিএ কালিনারি ইনস্টিটিউট, মেন্টর, সুবিধা এবং সার্টিফিকেট'
    : 'About CIB | NSDA Culinary Institute in Dhaka, Mentors, Facilities & Certifications');
  const description = pageData?.seo_description || (isBn
    ? 'সিআইবি (CIB)-এর মেন্টর প্যানেল, ক্যাম্পাস, সার্টিফিকেট, কোম্পানির প্রোফাইল এবং শিক্ষার্থীরা কেন আমাদের শেফ ট্রেনিং ও গ্লোবাল ক্যারিয়ারের জন্য বেছে নেয় তা জানুন।'
    : 'See CIB\'s mentors, campus, certifications, company profile, and why students choose us for chef training and global culinary careers.');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/about`,
      type: 'website',
      siteName: 'Culinary Institute of Bangladesh',
      images: [{ url: 'https://cibdhk.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://cibdhk.com/images/og-default.png'],
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/about`,
      languages: {
        'en': `https://cibdhk.com/en/about`,
        'bn': `https://cibdhk.com/bn/about`,
        'x-default': `https://cibdhk.com/en/about`,
      }
    }
  };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  // Load about page data from DB / Fallback
  const pageData = await getMarketingPage("about", locale);
  const aboutData = pageData?.content || { 
    hero: { heading: "About Us", subheading: "Culinary Institute of Bangladesh" },
    story: { title: "", content: [] },
    finalCta: { heading: "", subheading: "", buttonText: "", buttonHref: "" }
  };

  // Fetch CMS strategic team members (with JSON fallback)
  const cmsTeam = await getPublicTeamMembers(locale);

  // Merge CMS team over static JSON
  if (cmsTeam && cmsTeam.length > 0) {
    aboutData.ourTeam = {
      heading: locale === 'bn' ? 'আমাদের বিশেষজ্ঞ দল' : 'Our Strategic Team',
      subheading: locale === 'bn'
        ? 'অভিজ্ঞতা, দক্ষতা এবং আন্তর্জাতিক মানের সমন্বয়ে গঠিত আমাদের কোর টিম।'
        : 'Our core team built on experience, expertise, and international standards.',
      members: cmsTeam.map((m: any) => ({
        name: m.name,
        role: m.designation,
        photo: resolveImageUrl(m.imageUrl) || "",
        credentials: m.bio ? [m.bio] : [],
      })),
    };
  }

  let quickAnswersData: { question: string; answer: string }[] = [];
  try {
    const faqPageData = await getMarketingPage("faq", locale);
    const faqData = faqPageData?.content;
    if (faqData && faqData.categories) {
      // Find the conversational voice queries category
      const conversationalCat = faqData.categories.find(
        (c: any) => c.category === (locale === 'bn' ? 'কণ্ঠস্বর অনুসন্ধান (ভয়েস সার্চ)' : 'Conversational Voice Queries')
      );
      if (conversationalCat && conversationalCat.faqs) {
        quickAnswersData = conversationalCat.faqs.map((f: any) => ({
          question: f.question,
          answer: f.seoAnswer
        }));
      }
    }
  } catch (error) {
    console.error("Error loading FAQs for about page:", error);
  }

  // Fallback if file load fails
  if (quickAnswersData.length === 0) {
    quickAnswersData = locale === 'bn' ? [
      {
        question: "সিআইবি (CIB) কবে প্রতিষ্ঠিত হয়েছে?",
        answer: "কালিনারি ইনস্টিটিউট অফ বাংলাদেশ (CIB) একটি স্বনামধন্য কালিনারি ট্রেনিং একাডেমি যা বাংলাদেশে আন্তর্জাতিক মানের শেফ তৈরির লক্ষ্যে প্রতিষ্ঠিত হয়েছে।"
      }
    ] : [
      {
        question: "What is the Culinary Institute of Bangladesh?",
        answer: "CIB is a premier culinary training academy dedicated to producing internationally standard professional chefs in Bangladesh."
      }
    ];
  }

  const faqSchema = generateFAQSchema(
    quickAnswersData.map(q => ({
      question: q.question,
      seoAnswer: q.answer
    }))
  );

  const btvVideo = getBtvVideoData(locale);

  return (
    <main className="bg-obsidian">
      <SchemaInjector 
        schemas={[
          generateWebPageSchema({
            title: `About CIB | ${aboutData?.hero?.heading || 'Culinary Institute of Bangladesh'}`,
            description: aboutData?.hero?.subheading || '',
            url: `https://cibdhk.com/${locale}/about`
          }),
          generateOrganizationSchema(),
          faqSchema
        ]} 
      />
      <AboutHero data={aboutData?.hero} />




      
      <div className="relative z-10">
        <StoryBlock data={aboutData.story} />

        {/* Certifications & Accreditations Section */}
        {aboutData.accreditation && aboutData.accreditation.logos && (
          <section className="py-20 bg-obsidian/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h3 className="text-prestige-gold text-[10px] font-bold tracking-[0.3em] uppercase text-center mb-16 opacity-60">
                {aboutData.accreditation.heading}
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
                {aboutData.accreditation.logos.map((logo: string, i: number) => (
                  <div key={i} className="relative w-24 h-24 md:w-32 md:h-32 group">
                    <Image 
                      src={logo} 
                      alt="Accreditation" 
                      fill 
                      className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        <div className="py-16 md:py-24 bg-obsidian flex justify-center">
          <div className="glass-card px-10 py-6 rounded-full border border-white/10 shadow-[0_0_50px_rgba(196,160,82,0.1)] hover:border-prestige-gold/30 transition-all duration-700">
            <VerificationLink className="scale-125" />
          </div>
        </div>



        {aboutData?.globalStandards && <GlobalStandards data={aboutData.globalStandards} />}
        {/* Mentor Group Photo Section */}
        <section className="py-16 relative z-10 bg-obsidian">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="glass-card overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl relative group">
              <div className="aspect-[21/9] relative">
                <Image
                  src="/images/principal-dewan-ismail-inspecting-student-practice-session-1920w.webp"
                  alt="Principal Dewan Ismail inspecting students' culinary work at CIB lab"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                  <span className="text-[10px] bg-prestige-gold/20 border border-prestige-gold/30 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-3">
                    {locale === 'bn' ? 'ব্যবহারিক মেন্টরশিপ' : 'Culinary Mentorship'}
                  </span>
                  <p className="text-white text-lg md:text-xl font-black uppercase tracking-tight">
                    {locale === 'bn' ? 'প্রিন্সিপাল দেওয়ান ইসমাইল কর্তৃক ব্যবহারিক ক্লাস পরিদর্শন' : 'Principal Dewan Ismail Inspecting Student Practice'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {aboutData?.ourTeam && <OurTeam data={aboutData.ourTeam} />}

        <section className="py-12 relative bg-obsidian border-t border-white/5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
              {locale === 'bn' ? 'আমাদের সম্পর্কে জিজ্ঞাসা' : 'About CIB FAQs'}
            </h2>
          </div>
          <InlineFAQ questions={
            locale === 'bn' ? [
              { question: "সিআইবি (CIB) কবে প্রতিষ্ঠিত হয়েছে?", answer: "কালিনারি ইনস্টিটিউট অফ বাংলাদেশ (CIB) একটি স্বনামধন্য কালিনারি ট্রেনিং একাডেমি যা বাংলাদেশে আন্তর্জাতিক মানের শেফ তৈরির লক্ষ্যে প্রতিষ্ঠিত হয়েছে।" },
              { question: "আপনাদের মেন্টররা কারা?", answer: "আমাদের মেন্টর প্যানেলে রয়েছেন দেশি-বিদেশি ফাইভ-স্টার হোটেলে কাজ করা অভিজ্ঞ এক্সিকিউটিভ শেফবৃন্দ।" },
              { question: "CIB-এর ক্যাম্পাস কোথায় অবস্থিত?", answer: "আমাদের মূল ক্যাম্পাস ঢাকার ধানমন্ডি (হাউজ-১৬০, লেক সার্কাস, কলাবাগান) এলাকায় অবস্থিত, যেখানে রয়েছে আধুনিক বাণিজ্যিক রান্নাঘর।" },
              { question: "সিআইবি কী কী সার্টিফিকেট প্রদান করে?", answer: "সিআইবি জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA) লেভেল ২ ও ৩ সার্টিফিকেট, আইএসও-এইচএসিসিপি (ISO-HACCP) খাদ্য নিরাপত্তা সার্টিফিকেট এবং প্রাতিষ্ঠানিক সার্টিফিকেট প্রদান করে যা বিশ্বব্যাপী সমাদৃত।" },
              { question: "কোর্স শেষে কি চাকরির কোনো ব্যবস্থা করা হয়?", answer: "হ্যাঁ, সিআইবি শিক্ষার্থীদের ইন্টার্নশিপ এবং দেশের শীর্ষ ৫-তারকা হোটেলসহ আন্তর্জাতিক বাজারে চাকরি পেতে সরাসরি প্লেসমেন্ট সহায়তা প্রদান করে।" }
            ] : [
              { question: "What is the Culinary Institute of Bangladesh?", answer: "CIB is a premier culinary training academy dedicated to producing internationally standard professional chefs in Bangladesh." },
              { question: "Who are the mentors at CIB?", answer: "Our mentor panel consists of highly experienced Executive Chefs with extensive backgrounds working in 5-star hotels globally." },
              { question: "Where is the CIB campus located?", answer: "Our main campus is located in Dhanmondi, Dhaka (House-160, Lake Circus, Kalabagan), featuring state-of-the-art commercial kitchens." },
              { question: "What certifications does CIB offer?", answer: "CIB offers National Skill Development Authority (NSDA) Level 2 & 3 certificates, ISO-HACCP food safety certifications, and institutional certificates which are globally recognized." },
              { question: "Does CIB offer job placement support?", answer: "Yes, CIB provides conditional placement support, helping students secure internships and jobs in leading 5-star hotels in Bangladesh and international hospitality hubs." }
            ]
          } />
        </section>

        <TalkToCounselor locale={locale} />



        {/* Next Steps Section */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-obsidian border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-6 uppercase">
                {locale === 'bn' ? 'পরবর্তী ধাপ' : 'Next Steps'}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6">
                {locale === 'bn' ? 'রন্ধনশিল্পে আপনার যাত্রা' : 'Continue Your Journey'}
              </h2>
              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                {locale === 'bn' 
                  ? 'আমাদের সাথে যুক্ত হওয়ার জন্য নিচের যেকোনো একটি ধাপ বেছে নিন।' 
                  : 'Take the next step towards your global culinary career with CIB.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link 
                href={`/${locale}/expert-culinary-mentors/dewan-ismail`}
                className="group p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-700 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-power-red/10 border border-power-red/20 flex items-center justify-center text-power-red mb-8 group-hover:scale-110 transition-transform duration-500">
                    <User className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-4 group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'দেওয়ান ইসমাইল' : 'Meet Dewan Ismail'}
                  </h3>
                  <p className="text-sm md:text-base text-white/60 mb-10 leading-relaxed">
                    {locale === 'bn' 
                      ? 'আমাদের প্রিন্সিপাল এবং প্রতিষ্ঠাতার আন্তর্জাতিক রন্ধনশিল্পের দীর্ঘ অভিজ্ঞতা ও নির্দেশনা জানুন।' 
                      : 'Learn about the vision and global culinary pedigree of our Principal & Founder.'}
                  </p>
                </div>
                <div className="flex items-center text-prestige-gold text-xs font-bold uppercase tracking-wider gap-2 mt-auto">
                  <span>{locale === 'bn' ? 'পোর্টফোলিও দেখুন' : 'View Portfolio'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </Link>

              <Link 
                href={`/${locale}/press-media`}
                className="group p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-700 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-power-red/10 border border-power-red/20 flex items-center justify-center text-power-red mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Tv className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-4 group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'মিডিয়ায় সিআইবি' : 'CIB in the News'}
                  </h3>
                  <p className="text-sm md:text-base text-white/60 mb-10 leading-relaxed">
                    {locale === 'bn' 
                      ? 'দেশীয় ও আন্তর্জাতিক মিডিয়ায় আমাদের কার্যক্রম এবং রন্ধনশিল্পে আমাদের অবদানের খবর দেখুন।' 
                      : 'Explore our press coverage, television features, and media articles.'}
                  </p>
                </div>
                <div className="flex items-center text-prestige-gold text-xs font-bold uppercase tracking-wider gap-2 mt-auto">
                  <span>{locale === 'bn' ? 'সংবাদ কভারেজ' : 'See Media Hub'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </Link>

              <Link 
                href={`/${locale}/success-stories`}
                className="group p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.05] hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-700 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-power-red/10 border border-power-red/20 flex items-center justify-center text-power-red mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-4 group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'সাফল্যের গল্প' : 'Student Success'}
                  </h3>
                  <p className="text-sm md:text-base text-white/60 mb-10 leading-relaxed">
                    {locale === 'bn' 
                      ? 'আমাদের সফল শিক্ষার্থীদের আন্তর্জাতিক ক্যারিয়ার এবং রন্ধনশিল্পে তাদের অভাবনীয় অগ্রগতির গল্প।' 
                      : 'Read inspiring stories of our alumni thriving in leading kitchens worldwide.'}
                  </p>
                </div>
                <div className="flex items-center text-prestige-gold text-xs font-bold uppercase tracking-wider gap-2 mt-auto">
                  <span>{locale === 'bn' ? 'সাফল্যগাথা দেখুন' : 'See Results'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {aboutData?.personas && <PersonaCards data={aboutData.personas} />}
        <FinalCTA data={aboutData?.finalCta} />
      </div>
      {/* AEO Direct Answer Block */}
      <section className="py-16 bg-white/[0.02] border-t border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] bg-power-red/10 border border-power-red/20 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-4">
            {locale === 'bn' ? 'সরাসরি উত্তর (Direct Answer)' : 'Direct Answer'}
          </span>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed tracking-tight">
            {locale === 'bn'
              ? 'সিআইবি (কালিনারি ইনস্টিটিউট অফ বাংলাদেশ) ঢাকার ধানমন্ডিতে অবস্থিত একটি সর্বাধুনিক ও পেশাদার রন্ধনশিল্প শিক্ষালয়। আমরা প্রধানমন্ত্রীর কার্যালয়ের এনএসডিএ (NSDA) এবং বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) অনুমোদিত। ৫-স্টার শেফ মেন্টর প্যানেল এবং আন্তর্জাতিক মানের ল্যাব সুবিধার মাধ্যমে আমরা বিশ্বমানের রন্ধন শিক্ষা, আইএসও-এইচএসিসিপি সার্টিফিকেশন এবং নির্ভরযোগ্য ক্যারিয়ার সমাধান প্রদান করি।'
              : 'The Culinary Institute of Bangladesh (CIB) is a premier professional culinary academy in Dhanmondi, Dhaka. Fully accredited by the NSDA (Prime Minister\'s Office) and BTEB, CIB delivers world-class vocational training. Led by 5-star executive chef mentors, our institute features modern kitchen labs, ISO-HACCP standards, and certified pathways to global culinary careers.'
            }
          </p>
        </div>
      </section>

      {/* AEO Key Facts Table */}
      <section className="py-12 relative z-10 bg-obsidian border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-prestige-gold font-bold text-xs uppercase tracking-widest mb-6 text-center">
              {locale === 'bn' ? 'সিআইবি পরিচিতি ও মূল তথ্য তালিকা' : 'CIB Profile Key Facts'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase text-xs tracking-wider">
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'প্যারামিটার' : 'Parameter'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'তথ্য / বিবরণ' : 'Details / Value'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'অনুমোদন / মানদণ্ড' : 'Accreditation / Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80 font-medium">
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'প্রতিষ্ঠান' : 'Institution'}</td>
                    <td className="py-3 px-4">Culinary Institute of Bangladesh (CIB)</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? 'নিবন্ধিত ও অনুমোদিত' : 'Registered & Accredited'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'প্রতিষ্ঠাতা ও প্রিন্সিপাল' : 'Founder & Principal'}</td>
                    <td className="py-3 px-4">Dewan Ismail</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">{locale === 'bn' ? '৫-তারকা এক্সিকিউティブ শেফ' : '5-Star Executive Chef'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'অনুমোদন ও বোর্ড' : 'Accreditation Board'}</td>
                    <td className="py-3 px-4">NSDA (Prime Minister\'s Office) & BTEB</td>
                    <td className="py-3 px-4 text-white/60">Level 2 & 3 Vocational Training</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'সার্টিফিকেশন মান' : 'Standards Audits'}</td>
                    <td className="py-3 px-4">ISO 22000:2018 & HACCP Food Safety</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">SGS Switzerland Audited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'ক্যাম্পাস ঠিকানা' : 'Campus Address'}</td>
                    <td className="py-3 px-4">House-160, Lake Circus, Kalabagan, Dhanmondi, Dhaka</td>
                    <td className="py-3 px-4 text-white/40">1200+ sq.ft Modern Kitchen Labs</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'যোগাযোগ নম্বর' : 'Helpline'}</td>
                    <td className="py-3 px-4">+8801338958997</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপ উপলব্ধ' : 'WhatsApp Support Open'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>


      {/* Author Box Section */}
      <section className="py-12 bg-black/10 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <AuthorBox 
            name="Dewan Ismail"
            title={locale === 'bn' ? 'প্রিন্সিপাল ও প্রতিষ্ঠাতা, সিআইবি' : 'Principal & Founder, CIB'}
            photo="/images/dewan-ismail-portrait.jpg"
            profileUrl="/expert-culinary-mentors/dewan-ismail"
            lastReviewed={locale === 'bn' ? 'জুন ২০২৬' : 'June 2026'}
            locale={locale}
          />
        </div>
      </section>
    </main>
  );
}
