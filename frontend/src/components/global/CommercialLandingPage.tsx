import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Calendar,
  DollarSign
} from 'lucide-react';
import SchemaInjector from '@/components/global/SchemaInjector';
import InlineFAQ from '@/components/global/InlineFAQ';
import TalkToCounselor from '@/components/global/TalkToCounselor';
import { 
  generateWebPageSchema, 
  generateLocalBusinessSchema, 
  generateCourseSchema, 
  generateFAQSchema 
} from '@/lib/seo';

interface FAQItem {
  question: string;
  answer: string;
}

interface HighlightItem {
  title: string;
  description: string;
  icon?: string;
}

interface TableData {
  heading: string;
  headers: string[];
  rows: string[][];
}

interface CurriculumModule {
  title: string;
  description?: string;
  topics?: string[];
  duration?: string;
  icon?: string;
}

interface OutcomeItem {
  title: string;
  description?: string;
  icon?: string;
}

interface BatchSlot {
  id: string;
  name: string;
  days: string;
  time: string;
  duration: string;
  totalClasses?: number;
  status: string;
  badge?: string;
}

interface CourseInfo {
  id?: string;
  courseName?: string;
  courseCode?: string;
  baseFee?: number;
  durationValue?: number;
  durationUnit?: string;
}

interface PageData {
  slug: string;
  meta?: {
    title: string;
    description: string;
  };
  hero?: {
    badge: string;
    heading: string;
    subheading: string;
  };
  overview?: {
    title: string;
    text: string;
  };
  highlights?: HighlightItem[];
  features?: string[];
  table?: TableData;
  faqs?: FAQItem[];
  curriculum?: CurriculumModule[];
  outcomes?: OutcomeItem[];
  batchSlots?: BatchSlot[];
  course?: CourseInfo;
  cta?: {
    heading: string;
    subheading: string;
    buttonText: string;
    buttonHref: string;
  };
  coverImageUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

interface CommercialLandingPageProps {
  data: PageData;
  locale: string;
}

const CommercialLandingPage = ({ data, locale }: CommercialLandingPageProps) => {
  const isBn = locale === 'bn';
  const url = `https://cibdhk.com/${locale}/${data.slug}`;

  const meta = data.meta || {
    title: data.hero?.heading || "",
    description: data.hero?.subheading || ""
  };

  // Generate schemas
  const webPageSchema = generateWebPageSchema({
    title: meta.title,
    description: meta.description,
    url: url
  });

  const localBusinessSchema = generateLocalBusinessSchema();

  const courseSchema = generateCourseSchema({
    name: data.hero?.heading || "",
    description: meta.description,
    provider: "The Culinary Institute of Bangladesh (CIB)",
    location: "House-160, Lake Circus, Kalabagan, Dhanmondi, Dhaka"
  });

  const faqSchema = generateFAQSchema(
    (data.faqs || []).map(f => ({
      question: f.question,
      seoAnswer: f.answer
    }))
  );

  return (
    <>
      <SchemaInjector schemas={[webPageSchema, localBusinessSchema, courseSchema, faqSchema]} />

      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prestige-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-power-red/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-12 md:pt-24 md:pb-20 border-b border-white/5 bg-gradient-to-b from-black/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-prestige-gold/15 border border-prestige-gold/20 px-5 py-2.5 rounded-full text-prestige-gold font-bold text-xs tracking-wider uppercase mb-8 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-prestige-gold animate-pulse" />
            {data.hero?.badge}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase max-w-4xl mx-auto leading-none mb-6">
            {data.hero?.heading}
          </h1>

          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {data.hero?.subheading}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={data.cta?.buttonHref || "#"}
              className="btn-primary px-10 py-4 text-center font-bold tracking-widest text-xs uppercase"
            >
              {data.cta?.buttonText || "Apply Now"}
            </Link>
            <a
              href="https://wa.me/8801338958997"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 text-center font-bold tracking-widest text-xs uppercase border border-white/10 hover:border-prestige-gold/50 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-whatsapp" />
              {isBn ? 'হোয়াটসঅ্যাপ কাউন্সিলিং' : 'WhatsApp Counselor'}
            </a>
          </div>
        </div>
      </section>

      {/* Content Columns */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Cover Image Banner */}
              {data.coverImageUrl && (
                <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                  <Image 
                    src={data.coverImageUrl} 
                    alt={data.hero?.heading || "Course Cover"} 
                    fill 
                    className="object-cover" 
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                </div>
              )}

              {/* Overview block */}
              <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-prestige-gold/5 rounded-full blur-2xl"></div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                  {data.overview?.title || "Course Overview"}
                </h2>
                <div className="text-gray-300 leading-relaxed space-y-6 text-sm md:text-base font-medium">
                  {(data.overview?.text || "").split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Highlights Cards (if present) */}
              {data.highlights && data.highlights.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.highlights.map((item, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-prestige-gold/30 transition-all duration-500 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2 group-hover:text-prestige-gold transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Feature Checkmarks */}
              <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {isBn ? 'প্রোগ্রামের মূল আকর্ষণসমূহ' : 'Key Core Advantages'}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(data.features || []).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-gray-300 text-sm md:text-base font-bold leading-tight">
                      <CheckCircle2 className="w-5 h-5 text-prestige-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data/Curriculum/Fees Table (if present) */}
              {data.table && (
                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-8">
                    {data.table.heading}
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                          {data.table.headers.map((header, i) => (
                            <th key={i} className="p-4 text-xs font-bold uppercase tracking-widest text-prestige-gold">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {data.table.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                            {row.map((cell, j) => (
                              <td key={j} className="p-4 text-sm text-gray-300 font-medium">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── Learning Outcomes ── */}
              {data.outcomes && data.outcomes.length > 0 && (
                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                      {isBn ? 'শেখার ফলাফল' : 'Learning Outcomes'}
                    </h3>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {data.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-green-500/20 transition-all duration-300 group/item">
                        <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-green-500/20 transition-colors">
                          <GraduationCap className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm leading-snug mb-1">{outcome.title}</p>
                          {outcome.description && (
                            <p className="text-gray-500 text-xs leading-relaxed">{outcome.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Curriculum Timeline / Modules ── */}
              {data.curriculum && data.curriculum.length > 0 && (
                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-prestige-gold/5 rounded-full blur-3xl" />
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-prestige-gold rounded-full shadow-[0_0_15px_rgba(197,160,89,0.6)]" />
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                      {isBn ? 'কারিকুলাম টাইমলাইন' : 'Curriculum Timeline'}
                    </h3>
                  </div>
                  <ol className="relative space-y-0">
                    {data.curriculum.map((module, i) => (
                      <li key={i} className="flex gap-5 group/mod">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-prestige-gold/20 border-2 border-prestige-gold/50 flex items-center justify-center text-prestige-gold font-black text-xs shrink-0 group-hover/mod:bg-prestige-gold group-hover/mod:text-obsidian transition-all duration-300">
                            {i + 1}
                          </div>
                          {i < (data.curriculum?.length ?? 0) - 1 && (
                            <div className="w-px flex-1 bg-gradient-to-b from-prestige-gold/30 to-transparent mt-1 mb-1" />
                          )}
                        </div>
                        {/* Module content */}
                        <div className="pb-8 flex-1">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h4 className="text-white font-bold text-base tracking-tight group-hover/mod:text-prestige-gold transition-colors">
                              {module.title}
                            </h4>
                            {module.duration && (
                              <span className="text-[10px] text-prestige-gold/70 font-bold uppercase tracking-widest bg-prestige-gold/10 px-2 py-0.5 rounded-full shrink-0">
                                {module.duration}
                              </span>
                            )}
                          </div>
                          {module.description && (
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3">{module.description}</p>
                          )}
                          {module.topics && module.topics.length > 0 && (
                            <ul className="space-y-1.5">
                              {module.topics.map((topic, j) => (
                                <li key={j} className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                                  <div className="w-1.5 h-1.5 rounded-full bg-prestige-gold/50 shrink-0" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* ── Batch Slots ── */}
              {data.batchSlots && data.batchSlots.length > 0 && (
                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-power-red/5 rounded-full blur-3xl" />
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-power-red rounded-full shadow-[0_0_15px_rgba(236,27,35,0.5)]" />
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                      {isBn ? 'ব্যাচের সময়সূচি' : 'Available Batches'}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {data.batchSlots.map((slot, i) => (
                      <div key={slot.id || i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-prestige-gold/20 transition-all duration-300 group/slot">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h4 className="text-white font-bold text-sm group-hover/slot:text-prestige-gold transition-colors">{slot.name}</h4>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${
                            slot.status === 'full' ? 'bg-power-red/20 text-power-red border border-power-red/30' :
                            slot.status === 'upcoming' ? 'bg-prestige-gold/20 text-prestige-gold border border-prestige-gold/30' :
                            'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}>
                            {slot.badge || slot.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">{isBn ? 'দিন' : 'Days'}</p>
                            <p className="text-xs font-bold text-white/80">{slot.days}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">{isBn ? 'সময়' : 'Time'}</p>
                            <p className="text-xs font-bold text-white/80">{slot.time}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">{isBn ? 'মেয়াদ' : 'Duration'}</p>
                            <p className="text-xs font-bold text-white/80">{slot.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Floating Panel & Counselor */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Quick Info Sidebar */}
              <div className="glass-card p-8 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-power-red/5 rounded-full blur-2xl"></div>
                <span className="text-prestige-gold text-[10px] font-extrabold tracking-[0.25em] uppercase block mb-4">
                  {isBn ? 'ইনস্টিটিউশনাল ফ্যাক্টস' : 'INSTITUTIONAL STRENGTH'}
                </span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-6">
                  {isBn ? 'সিআইবি কেন সেরা?' : 'Why Choose CIB?'}
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 py-2 border-b border-white/5">
                    <GraduationCap className="w-5 h-5 text-power-red shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">{isBn ? 'অনুমোদন' : 'Accreditation'}</span>
                      <span className="text-xs font-bold text-white">{isBn ? 'এনএসডিএ অনুমোদিত' : 'NSDA Accredited'}</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 py-2 border-b border-white/5">
                    <ShieldCheck className="w-5 h-5 text-power-red shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">{isBn ? 'নিরাপত্তা স্ট্যান্ডার্ড' : 'Food Safety standard'}</span>
                      <span className="text-xs font-bold text-white">ISO-HACCP Certified</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 py-2 border-b border-white/5">
                    <Calendar className="w-5 h-5 text-power-red shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">{isBn ? 'ভর্তি সেশন' : 'Next Batch'}</span>
                      <span className="text-xs font-bold text-white">{isBn ? 'ভর্তি চলছে ২০২৬' : 'Enrollment Open 2026'}</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 py-2">
                    <DollarSign className="w-5 h-5 text-power-red shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">{isBn ? 'অর্থপ্রদান' : 'Payment Mode'}</span>
                      <span className="text-xs font-bold text-white">{isBn ? '৩টি সহজ কিস্তির সুযোগ' : '3 Easy Installments'}</span>
                    </div>
                  </li>
                </ul>

                <Link
                  href="/admission"
                  className="btn-primary w-full text-center py-4 rounded-xl font-bold tracking-widest text-xs uppercase bg-power-red text-white shadow-[0_10px_30px_rgba(236,27,35,0.3)] hover:shadow-[0_15px_40px_rgba(236,27,35,0.5)] transition-all duration-500 hover:scale-[1.02] block mt-8"
                >
                  {isBn ? 'অনলাইন অ্যাডমিশন' : 'Apply Online'}
                </Link>
              </div>

              {/* Direct Campus Coordinates */}
              <div className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.01]">
                <h4 className="text-xs font-bold text-prestige-gold uppercase tracking-[0.2em] mb-4">
                  {isBn ? 'ক্যাম্পাসের তথ্য' : 'Campus Coordinates'}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                  {isBn 
                    ? 'হাউস-১৬০, লেক সার্কাস, কলাবাগান, ধানমন্ডি, ঢাকা ১২০৫ (লংলাইফ হাসপাতালের পাশে)।' 
                    : 'House-160, Lake Circus, Kalabagan, Dhanmondi, Dhaka 1205 (Beside Longlife Hospital).'}
                </p>
                <div className="space-y-4">
                  <a 
                    href="tel:+8801338958997"
                    className="flex items-center gap-3 text-sm text-white hover:text-prestige-gold font-bold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-power-red" />
                    <span>+880 1338 958997</span>
                  </a>
                  <a 
                    href="https://wa.me/8801338958997"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white hover:text-whatsapp font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-whatsapp" />
                    <span>WhatsApp Chat Support</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 relative bg-obsidian border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-prestige-gold text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">
            {isBn ? 'সাধারণ জিজ্ঞাসা' : 'Voice & Search Engine FAQs'}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
            {isBn ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
          </h2>
        </div>
        <InlineFAQ questions={data.faqs || []} />
      </section>

      <TalkToCounselor locale={locale} />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-t from-black/60 to-transparent border-t border-white/5 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-6 leading-tight">
            {data.cta.heading}
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            {data.cta.subheading}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={data.cta?.buttonHref || '#'}
              className="btn-primary w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase"
            >
              {data.cta?.buttonText || 'Apply Now'}
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-bold tracking-widest text-xs uppercase border border-white/10 hover:border-prestige-gold/50 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              {isBn ? 'ক্যাম্পাস ভিজিট সিডিউল' : 'Schedule Campus Visit'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommercialLandingPage;
