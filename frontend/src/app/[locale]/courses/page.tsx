import CourseHero from "@/components/course/CourseHero";
import CourseCard from "@/components/course/CourseCard";
import CurriculumTimeline from "@/components/course/CurriculumTimeline";
import CertComparison from "@/components/course/CertComparison";
import EconomicsROI from "@/components/course/EconomicsROI";
import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateWebPageSchema, generateCourseSchema, generateProductSchema, generateFAQSchema } from "@/lib/seo";
import { fetchFromBackend } from "@/lib/backendApi";
import QuickAnswers from "@/components/global/QuickAnswers";
import InlineFAQ from "@/components/global/InlineFAQ";
import TalkToCounselor from "@/components/global/TalkToCounselor";
import { COURSE_CONFIG, BATCH_CONFIG } from "@/lib/courseConfig";
import AuthorBox from "@/components/global/AuthorBox";
import VideoWithTranscript from "@/components/global/VideoWithTranscript";
import { getBtvVideoData } from "@/lib/videoData";
import { Metadata } from 'next';
import Image from "next/image";
import Link from 'next/link';
import { UserCheck, Award, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isBn = locale === 'bn';
  const title = isBn
    ? 'ঢাকায় শেফ কোর্সের ফি ২০২৬ | প্রফেশনাল শেফ, বারিস্তা, ফাস্ট ফুড এবং ডিপ্লোমা | কালিনারি একাডেমি'
    : 'Chef Course in Dhaka Fees 2026 | Professional Chef, Barista, Fast Food & Diploma | Culinary Academy';
  const description = isBn
    ? 'কালিনারি একাডেমি শেফ কোর্সসমূহ, ফি, মেয়াদ, সার্টিফিকেট এবং ক্যারিয়ার গাইডলাইন তুলনা করুন। প্রফেশনাল শেফ, শেফ + বারিস্তা, ফাস্ট ফুড শর্ট কোর্স এবং ৬ মাসের ডিপ্লোমা।'
    : 'Compare Culinary Academy chef courses, fees, duration, certifications, and career paths. Professional Chef, Chef + Barista, Fast Food Short Course, and 6-Month Diploma.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://culinaryacademy.com/${locale}/courses`,
      type: 'website',
      siteName: 'Culinary Academy',
      images: [{ url: 'https://culinaryacademy.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://culinaryacademy.com/images/og-default.png'],
    },
    alternates: {
      canonical: `https://culinaryacademy.com/${locale}/courses`,
      languages: {
        'en': `https://culinaryacademy.com/en/courses`,
        'bn': `https://culinaryacademy.com/bn/courses`,
        'x-default': `https://culinaryacademy.com/en/courses`,
      }
    }
  };
}

export default async function CoursesPage({ params: { locale } }: { params: { locale: string } }) {
  // Load courses data from JSON with fallback
  let coursesData: any = { 
    hero: { heading: "Our Courses", subheading: "Professional Culinary Training" },
    courses: [],
    curriculum: { heading: "", items: [] },
    certComparison: { heading: "", items: [] },
    economics: { heading: "", items: [] }
  };

  try {
    const coursesDataPath = path.join(process.cwd(), `content/${locale}/courses.json`);
    if (fs.existsSync(coursesDataPath)) {
      coursesData = JSON.parse(fs.readFileSync(coursesDataPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading courses page data:", error);
  }

  // Load dynamic course pages from backend
  try {
    const response = await fetchFromBackend(`/public/courses?locale=${locale}`);
    if (response && response.success && Array.isArray(response.data)) {
      const dbPages = response.data.map((page: any) => {
        let coverImg = page.coverImageUrl;
        if (coverImg && coverImg.startsWith("/uploads")) {
          coverImg = `http://localhost:3043${coverImg}`;
        }
        
        let parsedContent = page.content;
        if (typeof parsedContent === "string") {
          try {
            parsedContent = JSON.parse(parsedContent);
          } catch (e) {
            parsedContent = {};
          }
        }

        return {
          ...page,
          content: parsedContent,
          coverImageUrl: coverImg
        };
      });

      const dbPagesBySlug = new Map(dbPages.map((p: any) => [p.slug, p]));
      
      coursesData.courses = coursesData.courses.map((course: any) => {
        const slug = course.link.replace(/^\/|\/$/g, "");
        const dbPage = dbPagesBySlug.get(slug);
        
        let defaultSlug = "";
        if (course.id === "chef") defaultSlug = "/chef-course-dhaka";
        else if (course.id === "combo") defaultSlug = "/barista-course-dhaka";
        else if (course.id === "fast-food") defaultSlug = "/fast-food-course-dhaka";
        else if (course.id === "diploma") defaultSlug = "/culinary-diploma-bangladesh";

        if (dbPage && dbPage.content) {
          const content = dbPage.content;
          return {
            ...course,
            name: dbPage.title || course.name,
            tagline: dbPage.excerpt || course.tagline,
            shortSummary: dbPage.excerpt || course.shortSummary,
            price: content.table?.rows?.find((r: any) => r[0]?.toLowerCase().includes("fee") || r[0]?.toLowerCase().includes("price"))?.[1] || course.price,
            badge: content.hero?.badge || course.badge,
            features: content.features || course.features,
            detailsLink: `/${dbPage.slug}`
          };
        }
        return {
          ...course,
          detailsLink: defaultSlug || undefined

        };
      });

      // Find any dbPages that are not in the static courses list and append them
      const staticSlugs = new Set(coursesData.courses.map((c: any) => c.link.replace(/^\/|\/$/g, "")));
      dbPages.forEach((p: any) => {
        if (!staticSlugs.has(p.slug) && p.content && p.status === "published") {
          const content = p.content;
          coursesData.courses.push({
            id: p.slug,
            name: p.title || p.course?.courseName || "",
            tagline: p.heroSubtitle || p.excerpt || "",
            highlightMetric: content.highlights?.[0]?.title || "New Program",
            shortSummary: p.heroSubtitle || p.excerpt || "",
            duration: p.course?.durationValue ? `${p.course.durationValue} ${p.course.durationUnit}` : (content.table?.rows?.find((r: any) => r[0]?.toLowerCase().includes("duration"))?.[1] || "Flexible"),
            schedule: p.schedule || content.table?.rows?.find((r: any) => r[0]?.toLowerCase().includes("schedule"))?.[1] || "Flexible",
            price: p.course?.baseFee ? `৳${Number(p.course.baseFee).toLocaleString()}` : (content.table?.rows?.find((r: any) => r[0]?.toLowerCase().includes("fee"))?.[1] || "৳15,000"),
            originalPrice: "",
            badge: content.hero?.badge || null,
            features: content.features || [],
            cta: content.cta?.buttonText || (locale === 'bn' ? 'আবেদন করুন' : 'Apply Now'),
            link: "/admission",
            detailsLink: `/${p.slug}`
          });
        }
      });
    }
  } catch (error) {
    console.error("Error loading dynamic courses data:", error);
  }

  let quickAnswersData: { question: string; answer: string }[] = [];
  try {
    const faqPath = path.join(process.cwd(), `content/${locale}/faq.json`);
    if (fs.existsSync(faqPath)) {
      const faqData = JSON.parse(fs.readFileSync(faqPath, "utf8"));
      // Find the conversational voice queries category
      const conversationalCat = faqData.categories.find(
        (c: any) => c.category === (locale === 'bn' ? 'কণ্ঠস্বর অনুসন্ধান (ভয়ার সার্চ)' : 'Conversational Voice Queries') || c.category === (locale === 'bn' ? 'কণ্ঠস্বর অনুসন্ধান (ভয়েস সার্চ)' : 'Conversational Voice Queries')
      );
      if (conversationalCat && conversationalCat.faqs) {
        quickAnswersData = conversationalCat.faqs.map((f: any) => ({
          question: f.question,
          answer: f.seoAnswer
        }));
      }
    }
  } catch (error) {
    console.error("Error loading FAQs for courses page:", error);
  }

  // Fallback if file load fails
  if (quickAnswersData.length === 0) {
    quickAnswersData = locale === 'bn' ? [
      {
        question: "প্রফেশনাল শেফ কোর্স করতে শিক্ষাগত যোগ্যতা কী লাগে?",
        answer: "বাংলাদেশে প্রফেশনাল শেফ কোর্সে ভর্তি হওয়ার জন্য ন্যূনতম এসএসসি বা এইচএসসি পাস হতে হবে, বয়স কমপক্ষে ১৬ বছর এবং রান্নার প্রতি আগ্রহ থাকতে হবে। পূর্বে রান্নার কোনো অভিজ্ঞতা থাকার প্রয়োজন নেই।"
      },
      {
        question: "বাংলাদেশে শেফ বা কালিনারি আর্টস ক্যারিয়ার কেমন?",
        answer: "হ্যাঁ, অবশ্যই! বর্তমানে বাংলাদেশে ও আন্তর্জাতিক বাজারে কালিনারি আর্টস বা শেফ পেশা অত্যন্ত সম্মানজনক ও লাভজনক একটি ক্যারিয়ার।"
      }
    ] : [
      {
        question: "What are the requirements for a professional chef course in Bangladesh?",
        answer: "The requirements include a minimum education level of SSC/HSC (or equivalent grade), age 16+, basic English communication, and a passion for culinary arts. No prior culinary experience is needed."
      },
      {
        question: "Is culinary arts a good career in Bangladesh?",
        answer: "Yes. A career in culinary arts offers rapid career growth, international job placements in premium hotels and cruises, high-salary opportunities, and entrepreneurial success in the food business sector."
      }
    ];
  }

  const faqSchema = generateFAQSchema(
    quickAnswersData.map(q => ({
      question: q.question,
      seoAnswer: q.answer
    }))
  );

  const enrollingSlots = BATCH_CONFIG.slots.filter(s => s.status === 'enrolling');
  const enrollingNames = enrollingSlots.map(s => 
    locale === 'bn' ? s.labelBn.replace('ের ব্যাচ', '').replace(' ব্যাচ', '') : s.label.replace(' Batch', '')
  );
  
  const batchesText = enrollingNames.length > 0
    ? enrollingNames.slice(0, -1).join(', ') + (enrollingNames.length > 1 ? (locale === 'bn' ? ' ও ' : ' & ') : '') + enrollingNames[enrollingNames.length - 1]
    : '';

  const batchAvailabilityText = coursesData.batchAvailability 
    ? coursesData.batchAvailability.replace('{batches}', batchesText) 
    : '';

  const btvVideo = getBtvVideoData(locale);

  return (
    <main className="bg-obsidian min-h-screen">
      <SchemaInjector 
        schemas={[
          generateWebPageSchema({
            title: `Courses | ${coursesData?.hero?.heading || 'Culinary Academy'}`,
            description: coursesData?.hero?.subheading || '',
            url: `https://culinaryacademy.com/${locale}/courses`
          }),
          ...(coursesData?.courses || []).map((course: any) => 
            generateCourseSchema({
              name: course.name,
              description: course.tagline,
              provider: "Culinary Academy",
              location: "House-160, Dhanmondi, Dhaka"
            })
          ),
          ...(coursesData?.courses || []).map((course: any) => 
            generateProductSchema({
              name: course.name,
              description: course.tagline,
              price: course.price ? course.price.replace(/[^0-9]/g, '') : COURSE_CONFIG.feeTotal.toString(),
              ratingValue: "4.8",
              reviewCount: "150"
            })
          ),
          faqSchema
        ]} 
      />
      <CourseHero data={coursesData.hero} />

      
      {batchAvailabilityText && (
        <div className="bg-obsidian border-b border-white/5 py-4">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-5 py-2.5 rounded-full text-green-400 font-bold text-sm tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              {batchAvailabilityText}
            </div>
          </div>
        </div>
      )}
      
      <section className="py-24 md:py-32 relative overflow-hidden">
 
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {(coursesData?.courses || []).map((course: any, i: number) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Kitchen Action Image Section */}
      <section className="pb-16 relative z-10 bg-obsidian">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="glass-card overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl relative group">
            <div className="aspect-[21/9] relative">
              <Image
                src="/images/kitchen-flame-saute.jpg"
                alt="Students practicing hands-on culinary skills at Culinary Academy commercial kitchen lab"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                <span className="text-[10px] bg-prestige-gold/20 border border-prestige-gold/30 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-3">
                  {locale === 'bn' ? 'ব্যবহারিক ল্যাব' : 'Culinary Kitchen Lab'}
                </span>
                <p className="text-white text-lg md:text-xl font-black uppercase tracking-tight">
                  {locale === 'bn' ? 'কালিনারি একাডেমি স্টেট-অফ-দ্য-আর্ট বাণিজ্যিক রান্নাঘর' : 'Culinary Academy State-of-the-Art Commercial Kitchen Lab'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CurriculumTimeline data={coursesData.curriculum} />
      
      <TalkToCounselor locale={locale} />
 
      <section className="py-12 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
            {locale === 'bn' ? 'কোর্স সম্পর্কে জিজ্ঞাসা' : 'Course FAQs'}
          </h2>
        </div>
        <InlineFAQ questions={
          locale === 'bn' ? [
            { question: "প্রফেশনাল শেফ কোর্সের মেয়াদ কতদিন?", answer: "কোর্সের মেয়াদ ৬ মাস (২ মাস প্র্যাক্টিক্যাল ক্লাস + ৪ মাস ফাইভ-স্টার হোটেলে ইন্টার্নশিপ)।" },
            { question: "কোর্সের ফি কত এবং কিস্তিতে দেওয়ার সুযোগ আছে কি?", answer: "হ্যাঁ, কোর্সের মোট ফি ৪৪,০০০ টাকা যা ৩টি কিস্তিতে (১৬,০০০ + ১৪,০০০ + ১৪,০০০) দেওয়া যাবে।" },
            { question: "কোর্স শেষে কি সার্টিফিকেট দেওয়া হবে?", answer: "হ্যাঁ, আপনি এনএসডিএ (NSDA) এবং আইএসও-এইচএসিসিপি (ISO-HACCP) সার্টিফাইড হবেন, যা আন্তর্জাতিকভাবে স্বীকৃত।" },
            { question: "চাকরির ক্ষেত্রে কি কোনো সহায়তা করা হয়?", answer: "অবশ্যই! আমাদের ডেডিকেটেড প্লেসমেন্ট সেল আপনাকে দেশের শীর্ষ ৫-স্টার হোটেল এবং আন্তর্জাতিক ক্যারিয়ার গড়তে সহায়তা করবে।" }
          ] : [
            { question: "What is the duration of the Professional Chef Course?", answer: "The course lasts for 6 months (2 months of intensive practical training + 4 months of 5-star hotel internship)." },
            { question: "What is the course fee, and is there an installment option?", answer: "The total fee is 44,000 BDT, which can be paid in 3 easy installments (16,000 + 14,000 + 14,000)." },
            { question: "What certifications will I receive?", answer: "You will receive NSDA and ISO-HACCP certifications, which are globally recognized and highly valued in the industry." },
            { question: "Do you provide job placement assistance?", answer: "Yes, our dedicated placement cell assists students with internships and job placements in 5-star hotels both locally and internationally." }
          ]
        } />
      </section>
      

      <CertComparison data={coursesData.certComparison} />
      
      {/* Mentor and Success Stories Cross-Linking Section */}
      <section className="py-16 bg-obsidian/40 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              href={`/${locale}/expert-culinary-mentors`}
              className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-power-red/10 border border-power-red/20 flex items-center justify-center text-power-red shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-black text-white uppercase mb-1 tracking-tight group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'আমাদের মেন্টরদের সাথে দেখা করুন' : 'Meet Your Instructors'}
                  </h3>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                    {locale === 'bn' 
                      ? 'আন্তর্জাতিক অভিজ্ঞতা সম্পন্ন শেফদের ক্যারিয়ার ও প্রোফাইল দেখুন' 
                      : 'Explore the global credentials and experience of our faculty.'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-prestige-gold group-hover:translate-x-2 transition-transform duration-500 shrink-0 ml-4" />
            </Link>
 
            <Link 
              href={`/${locale}/success-stories`}
              className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-power-red/10 border border-power-red/20 flex items-center justify-center text-power-red shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-black text-white uppercase mb-1 tracking-tight group-hover:text-prestige-gold transition-colors">
                    {locale === 'bn' ? 'সফল শিক্ষার্থীদের সাফল্যগাথা' : 'See Student Success'}
                  </h3>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                    {locale === 'bn' 
                      ? 'আমাদের সফল শিক্ষার্থীদের আন্তর্জাতিক ক্যারিয়ার ও সাফল্যগাথা জানুন' 
                      : 'Read the stories of our alumni thriving in kitchens globally.'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-prestige-gold group-hover:translate-x-2 transition-transform duration-500 shrink-0 ml-4" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* Author Box Section */}
      
      <EconomicsROI data={coursesData.economics} />

      {/* AEO Direct Answer Block */}
      <section className="py-16 bg-white/[0.02] border-t border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] bg-power-red/10 border border-power-red/20 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-4">
            {locale === 'bn' ? 'সরাসরি উত্তর (Direct Answer)' : 'Direct Answer'}
          </span>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed tracking-tight">
            {locale === 'bn'
              ? 'কালিনারি একাডেমি ঢাকায় পেশাদার কালিনারি প্রশিক্ষণ কোর্সসমূহ অফার করে। আমাদের প্রোগ্রামগুলোর মধ্যে রয়েছে ৬ মাসের প্রফেশনাল শেফ কোর্স, কাস্টম বেকিং, বারিস্তা, এবং কমার্শিয়াল ফাস্ট ফুড শর্ট কোর্স। আন্তর্জাতিক ৫-স্টার শেফদের তত্ত্বাবধানে ১০০% প্র্যাকটিক্যাল ল্যাব, এনএসডিএ সরকারি অনুমোদন ও বিশ্বমানের আইএসও-এইচএসিসিপি খাদ্য নিরাপত্তা মানদণ্ডে আমাদের শিক্ষার্থীরা বিশ্বজুড়ে ক্যারিয়ার গড়তে সক্ষম।'
              : 'Culinary Academy (Culinary Academy) offers specialized professional culinary training in Dhaka. Our programs span the flagship 6-Month Professional Chef Course, Barista, Baking, Fast Food operations, and Diploma courses. Guided by 5-star mentors, we ensure 100% practical lab experience, official NSDA & BTEB vocational state credentials, ISO-HACCP standards, and global placement support.'
            }
          </p>
        </div>
      </section>

      {/* AEO Key Facts Course Comparison Table */}
      <section className="py-12 relative z-10 bg-obsidian border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-prestige-gold font-bold text-xs uppercase tracking-widest mb-6 text-center">
              {locale === 'bn' ? 'কোর্স তুলনামূলক তথ্য তালিকা' : 'Course Comparison Key Facts'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase text-xs tracking-wider">
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'কোর্সের নাম' : 'Course Name'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'মোট কোর্স ফি' : 'Total Course Fee'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'সময়কাল' : 'Duration'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'সনদ ও স্বীকৃতি' : 'Credentials'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'ক্যারিয়ার পাথ' : 'Target Career'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80 font-medium">
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Professional Chef Course</td>
                    <td className="py-3 px-4">৳৪৪,০০০ ({locale === 'bn' ? 'কিস্তি সুবিধা সহ' : 'Installments avail.'})</td>
                    <td className="py-3 px-4">6 Months (2M Lab + 4M Internship)</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">NSDA State Level 2 & 3, ISO-HACCP</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? '৫-তারকা হোটেল ও আন্তর্জাতিক শেফ' : '5-Star Hotel & Abroad Chef'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Barista & Cafe Operations</td>
                    <td className="py-3 px-4">৳২৫,০০০</td>
                    <td className="py-3 px-4">1 Month (30 Hours)</td>
                    <td className="py-3 px-4">Culinary Academy Institutional Cert</td>
                    <td className="py-3 px-4">{locale === 'bn' ? 'বারিস্তা ও ক্যাফে এন্টারপ্রেনার' : 'Professional Barista & Cafe Owner'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Fast Food & Catering Management</td>
                    <td className="py-3 px-4">৳৩০,০০০</td>
                    <td className="py-3 px-4">1.5 Months (45 Hours)</td>
                    <td className="py-3 px-4">Culinary Academy & ISO Standards</td>
                    <td className="py-3 px-4">{locale === 'bn' ? 'রেস্তোরাঁ ও ক্লাউড কিচেন উদ্যোক্তা' : 'Restaurant & Cloud Kitchen Owner'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Professional Baking & Pastry</td>
                    <td className="py-3 px-4">৳২৮,০০০</td>
                    <td className="py-3 px-4">1 Month (30 Hours)</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">Culinary Academy & HACCP Standards</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? 'হোম বেকিং ও পেস্ট্রি শেফ' : 'Home Bakery Owner & Pastry Chef'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Diploma in Culinary Arts</td>
                    <td className="py-3 px-4">৳১,১০,০০০</td>
                    <td className="py-3 px-4">6 Months (Full-Time On-site)</td>
                    <td className="py-3 px-4">BTEB Board Board, ISO-HACCP</td>
                    <td className="py-3 px-4">{locale === 'bn' ? 'হসপিটালিটি ম্যানেজার ও হেড শেফ' : 'Hospitality Executive & Head Chef'}</td>
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
            name="Executive Chef Mentor"
            title={locale === 'bn' ? 'প্রিন্সিপাল ও লিড প্রশিক্ষক, কালিনারি একাডেমি' : 'Principal & Lead Instructor, Culinary Academy'}
            photo="/images/chef-mentor-portrait.jpg"
            profileUrl=""
            lastReviewed={locale === 'bn' ? 'জুন ২০২৬' : 'June 2026'}
            locale={locale}
          />
        </div>
      </section>
    </main>
  );
}

