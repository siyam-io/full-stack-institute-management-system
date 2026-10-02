import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo";
import { 
  Building, 
  CheckCircle2, 
  ArrowRight,
  Handshake,
  Award,
  Globe
} from 'lucide-react';

interface PartnerData {
  hero: {
    heading: string;
    subheading: string;
    cta: string;
  };
  partners: {
    name: string;
    type: string;
    role: string;
    logoId: string;
    description: string;
    benefits: string[];
  }[];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const partnerDataPath = path.join(process.cwd(), `content/${locale}/industry-partners.json`);
  let partnerData = { hero: { heading: "Industry Partners", subheading: "Our Collaborations" } };
  
  try {
    if (fs.existsSync(partnerDataPath)) {
      partnerData = JSON.parse(fs.readFileSync(partnerDataPath, 'utf8'));
    }
  } catch (e) {}

  const title = `${partnerData.hero.heading} | Culinary Institute of Bangladesh`;
  const description = partnerData.hero.subheading;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/industry-partners`,
      type: 'website',
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/industry-partners`,
      languages: {
        'en': `https://cibdhk.com/en/industry-partners`,
        'bn': `https://cibdhk.com/bn/industry-partners`,
        'x-default': `https://cibdhk.com/en/industry-partners`,
      }
    }
  };
}

export default function IndustryPartnersPage({ params: { locale } }: { params: { locale: string } }) {
  const partnerDataPath = path.join(process.cwd(), `content/${locale}/industry-partners.json`);
  let partnerData: PartnerData = {
    hero: { heading: "Industry Partners", subheading: "", cta: "" },
    partners: []
  };

  try {
    if (fs.existsSync(partnerDataPath)) {
      partnerData = JSON.parse(fs.readFileSync(partnerDataPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading industry partners data:", error);
  }

  // Generate Organization schemas for partners
  const schemas = partnerData.partners.map((partner) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": partner.name,
    "url": "https://cibdhk.com",
    "logo": "https://cibdhk.com/images/logo_cib.png",
    "sameAs": [
      "https://cibdhk.com"
    ]
  }));

  const breadcrumbs = generateBreadcrumbSchema([
    { name: locale === 'bn' ? 'হোম' : 'Home', item: `https://cibdhk.com/${locale}` },
    { name: partnerData.hero.heading, item: `https://cibdhk.com/${locale}/industry-partners` }
  ]);

  // High-fidelity custom SVG logos for 5-star partners to prevent any missing asset issues
  const renderPartnerLogo = (logoId: string) => {
    switch (logoId) {
      case 'radisson':
        return (
          <svg className="w-full h-full max-h-16 text-prestige-gold drop-shadow-xl" viewBox="0 0 300 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="80" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M40 25 C40 25 55 20 65 30 C75 40 70 55 55 55 L40 55 L40 25 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M40 25 L40 55 L55 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M55 42 L70 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <text x="90" y="48" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.25em" fill="#FFFFFF">RADISSON</text>
            <text x="90" y="60" fontFamily="sans-serif" fontWeight="bold" fontSize="10" letterSpacing="0.1em" fill="var(--prestige-gold, #FFD700)">BLU HOTELS</text>
          </svg>
        );
      case 'westin':
        return (
          <svg className="w-full h-full max-h-16 text-prestige-gold drop-shadow-xl" viewBox="0 0 300 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="80" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M35 25 L45 55 L55 35 L65 55 L75 25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="95" y="48" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.3em" fill="#FFFFFF">WESTIN</text>
            <text x="95" y="60" fontFamily="sans-serif" fontWeight="bold" fontSize="10" letterSpacing="0.15em" fill="var(--prestige-gold, #FFD700)">HOTELS & RESORTS</text>
          </svg>
        );
      case 'intercontinental':
        return (
          <svg className="w-full h-full max-h-16 text-prestige-gold drop-shadow-xl" viewBox="0 0 300 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="80" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M55 22 L55 58 M40 22 L70 22 M40 58 L70 58 M55 34 C42 34 40 46 55 46" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <text x="90" y="48" fontFamily="serif" fontWeight="bold" fontSize="22" letterSpacing="0.05em" fill="#FFFFFF">INTERCONTINENTAL.</text>
            <text x="90" y="60" fontFamily="sans-serif" fontWeight="bold" fontSize="9" letterSpacing="0.1em" fill="var(--prestige-gold, #FFD700)">HOTELS & RESORTS</text>
          </svg>
        );
      default:
        return (
          <div className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <Building className="w-8 h-8 text-prestige-gold/50" />
          </div>
        );
    }
  };

  return (
    <main className="bg-obsidian min-h-screen text-white relative overflow-hidden">
      <SchemaInjector schemas={[...schemas, breadcrumbs, generateWebPageSchema({
        title: partnerData.hero.heading,
        description: partnerData.hero.subheading,
        url: `https://cibdhk.com/${locale}/industry-partners`
      })]} />

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prestige-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-power-red/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/5 bg-gradient-to-b from-black/60 to-transparent">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-power-red"></span>
            <span className="text-prestige-gold font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase">
              {locale === 'bn' ? '৫-তারকা পার্টনার ও কোলাবরেশন' : 'Elite Alliances & Placements'}
            </span>
            <span className="h-[2px] w-8 bg-power-red"></span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            {partnerData.hero.heading}
          </h1>

          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {partnerData.hero.subheading}
          </p>

          <a 
            href="#partners-list"
            className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-prestige-gold uppercase hover:text-white transition-colors group"
          >
            {partnerData.hero.cta}
            <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Partners List */}
      <section id="partners-list" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="space-y-16">
            {partnerData.partners.map((partner, i) => (
              <div 
                key={i} 
                className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden shadow-2xl hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-prestige-gold/5 rounded-full blur-2xl"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                  
                  {/* Left: Custom SVG Logo representation */}
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="w-full max-w-[280px]">
                      {renderPartnerLogo(partner.logoId)}
                    </div>
                  </div>

                  {/* Right: Details & Benefits */}
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-prestige-gold/15 text-prestige-gold text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase border border-prestige-gold/20">
                        {partner.type}
                      </span>
                      <span className="bg-white/5 text-white/75 text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase border border-white/5 flex items-center gap-1.5">
                        <Handshake className="w-3.5 h-3.5" />
                        {partner.role}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
                      {partner.name}
                    </h2>

                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                      {partner.description}
                    </p>

                    {/* Benefit Bullets */}
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-4">
                        {locale === 'bn' ? 'সহযোগিতার মূল ক্ষেত্রসমূহ' : 'Key Collaborative Features'}
                      </h4>
                      <ul className="space-y-3.5">
                        {partner.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-bold leading-tight group/item">
                            <CheckCircle2 className="w-4 h-4 text-prestige-gold shrink-0 group-hover/item:scale-125 transition-transform" />
                            <span className="group-hover:text-white transition-colors">{benefit}</span>
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

      {/* Institutional Strength Section */}
      <section className="py-24 bg-black/40 border-y border-white/5 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 mb-8">
            <Handshake className="w-8 h-8 text-prestige-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {locale === 'bn' 
              ? '৫-স্টার হসপিটালিটি সেক্টরের সাথে সরাসরি ইন্টার্নশিপ প্লেসমেন্ট' 
              : 'Direct Path to Elite 5-Star Placement'
            }
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            {locale === 'bn'
              ? 'আমাদের বিশ্বস্ত সহযোগী হোটেলগুলির তত্ত্বাবধানে ৩ মাসের প্রাক-পেশাদারি বাস্তব কিচেন প্রশিক্ষণের মাধ্যমে আপনার দক্ষতার বিকাশ নিশ্চিত করুন।'
              : 'Unlock career-defining industry exposure through structured industrial placements at Radisson Blu, The Westin, and InterContinental.'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/admission"
              className="btn-primary w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase bg-power-red text-white shadow-[0_15px_40px_rgba(236,27,35,0.4)] hover:shadow-[0_15px_60px_rgba(236,27,35,0.6)] transition-all duration-500 hover:scale-[1.02]"
            >
              {locale === 'bn' ? 'ভর্তি প্লেসমেন্ট আবেদন' : 'Apply for Admission'}
            </Link>
            <Link
              href="/courses"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase border border-white/10 hover:border-prestige-gold/50 bg-white/5 hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              {locale === 'bn' ? 'কোর্স কারিকুলাম দেখুন' : 'View Course Curriculum'}
              <ArrowRight className="w-4 h-4 text-prestige-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
