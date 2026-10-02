import Hero from "@/components/home/Hero";
export const dynamic = 'force-dynamic';
import CourseShowcase from "@/components/home/CourseShowcase";
import ValueProposition from "@/components/home/ValueProposition";
import SocialProof from "@/components/home/SocialProof";
import FinalCTA from "@/components/home/FinalCTA";
import SocialMediaFeed from "@/components/home/SocialMediaFeed";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";
import fs from "fs";
import path from "path";
import { Metadata } from 'next';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebPageSchema, generateFAQSchema, generateEducationEventSchema } from "@/lib/seo";
import QuickAnswers from "@/components/global/QuickAnswers";
import TalkToCounselor from "@/components/global/TalkToCounselor";
import CourseQuiz from "@/components/global/CourseQuiz";
import AuthorBox from "@/components/global/AuthorBox";
import VideoWithTranscript from "@/components/global/VideoWithTranscript";
import { getBtvVideoData } from "@/lib/videoData";
import { getCmsSection, getPublicTestimonials } from "@/lib/cmsApi";
import { resolveImageUrl } from "@/lib/backendApi";
import { fetchAllCoursePages } from "@/lib/courseApi";
import { fetchBlogs } from "@/lib/blogApi";

const formatCourseFee = (value: unknown) => {
  const amount = Number(value || 0);
  if (!amount) return "";
  return `৳${new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(amount)}`;
};

const normalizeFeatureList = (value: unknown, locale: string): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item: any) => {
      if (typeof item === "string") return item;
      if (item?.title) return item.title;
      if (item?.label) return item.label;
      if (item?.en || item?.bn) return locale === "bn" ? (item.bn || item.en) : (item.en || item.bn);
      return "";
    })
    .filter(Boolean);
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isBn = locale === 'bn';
  const title = isBn
    ? 'বাংলাদেশে শেফ কোর্স | ঢাকায় প্রফেশনাল কালিনারি ইনস্টিটিউট | কালিনারি একাডেমি'
    : 'Chef Course in Bangladesh | Professional Culinary Institute in Dhaka | Culinary Academy';
  const description = isBn
    ? '১৬+ দেশের ১২০+ রেসিপি শিখুন, এনএসডিএ লেভেল-২ ও ৩ ট্রেনিং, আইএসও-এইচএসিসিপি মান, জব প্লেসমেন্ট সহায়তা এবং সহজ কিস্তির সুবিধা। ধানমন্ডিতে কালিনারি একাডেমি ক্যাম্পাস ভিজিট করুন।'
    : 'Learn 120+ recipes from 16+ cuisines, NSDA Level-2 & 3 training, ISO-HACCP standards, job placement support, and easy installments. Visit Culinary Academy in Dhanmondi.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://culinaryacademy.com'}/${locale}`,
      type: 'website',
      siteName: 'Culinary Academy - Culinary Academy',
      images: [{ url: 'https://culinaryacademy.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://culinaryacademy.com/images/og-default.png'],
    },
    alternates: {
      canonical: `https://culinaryacademy.com/${locale}`,
      languages: {
        'en': 'https://culinaryacademy.com/en',
        'bn': 'https://culinaryacademy.com/bn',
        'x-default': 'https://culinaryacademy.com/en',
      }
    }
  };
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  let homeData = null;

  try {
    const filePath = path.join(process.cwd(), `content/${locale}/home.json`);
    if (fs.existsSync(filePath)) {
      homeData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (error) {
    console.error("Error loading home data:", error);
  }

  // Fetch blog posts for the Recent Insights section
  let recentPosts = [];
  try {
    const posts = await fetchBlogs(locale);
    recentPosts = posts.slice(0, 6);
  } catch (error) {
    console.error("Error loading recent posts:", error);
  }

  // --- Fetch dynamic CMS data (with JSON fallback) ---
  const [cmsHero, cmsTestimonials, cmsChefCourse] = await Promise.all([
    getCmsSection("home_hero", locale),
    getPublicTestimonials(locale),
    getCmsSection("professional_chef_course", locale),
  ]);

  let selectedChefCoursePage: any = null;
  const selectedCourseId = cmsChefCourse?.data?.selectedCourseId;
  if (selectedCourseId) {
    const publicCoursePages = await fetchAllCoursePages(locale);
    selectedChefCoursePage = publicCoursePages.find((page: any) => (
      page.id === selectedCourseId || page.courseId === selectedCourseId || page.course?.id === selectedCourseId
    ));
  }

  // Merge CMS hero data over static JSON
  if (homeData && cmsHero?.data) {
    const d = cmsHero.data;
    if (d.slides && Array.isArray(d.slides)) {
      homeData.hero = {
        slides: d.slides.map((slide: any) => ({
          image: resolveImageUrl(slide.image) || "/images/principal-dewan-ismail-preparing-fish-for-turkish-cuisine-2-1920w.webp",
          headline: slide.headline || slide.title || "",
          subheadline: slide.subheadline || slide.subtitle || "",
          ctaText: slide.ctaText || slide.primaryButtonText || "View Courses",
          ctaLink: slide.ctaLink || slide.primaryButtonHref || "/courses",
        })),
      };
    } else {
      homeData.hero = {
        slides: [{
          image: resolveImageUrl(d.heroImageUrl) || homeData.hero?.slides?.[0]?.image || "/images/principal-dewan-ismail-preparing-fish-for-turkish-cuisine-2-1920w.webp",
          headline: d.title || homeData.hero?.slides?.[0]?.headline || "Your Dream Chef Career Starts in Dhaka",
          subheadline: d.subtitle || homeData.hero?.slides?.[0]?.subheadline || "",
          ctaText: d.primaryButtonText || homeData.hero?.slides?.[0]?.ctaText || "View Courses",
          ctaLink: d.primaryButtonHref || homeData.hero?.slides?.[0]?.ctaLink || "/courses",
        }],
      };
    }
    if (d.stats && Array.isArray(d.stats)) {
      homeData.valueProposition = homeData.valueProposition || {};
      homeData.valueProposition.stats = d.stats.map((s: any) => ({
        value: parseInt(s.value) || 0,
        suffix: "+",
        label: s.label || "",
      }));
    }
  }

  // Merge CMS chef course data over static JSON
  if (homeData && (selectedChefCoursePage || cmsChefCourse?.data)) {
    const d = cmsChefCourse?.data || {};
    const pageContent = selectedChefCoursePage?.content || {};
    const pageFeatures = normalizeFeatureList(
      pageContent.highlights || pageContent.features || selectedChefCoursePage?.outcomes,
      locale
    );
    const course = selectedChefCoursePage?.course || {};

    homeData.courseShowcase = {
      ...homeData.courseShowcase,
      heading: selectedChefCoursePage?.title || selectedChefCoursePage?.heroTitle || d.title || homeData.courseShowcase?.heading || "",
      courseName: selectedChefCoursePage?.heroSubtitle || course.courseName || d.subtitle || homeData.courseShowcase?.courseName || "",
      price: formatCourseFee(course.baseFee) || d.feeText || homeData.courseShowcase?.price || "",
      features: pageFeatures.length > 0 ? pageFeatures.slice(0, 4) : (d.highlights || homeData.courseShowcase?.features || []),
      cta: d.ctaText || homeData.courseShowcase?.cta || "",
      ctaLink: selectedChefCoursePage?.slug ? `/courses/${selectedChefCoursePage.slug}` : (d.ctaHref || homeData.courseShowcase?.ctaLink || ""),
      image: resolveImageUrl(selectedChefCoursePage?.coverImageUrl || d.imageUrl) || homeData.courseShowcase?.image || "",
    };
  }

  // Merge CMS testimonials over static JSON
  if (homeData && cmsTestimonials && cmsTestimonials.length > 0) {
    homeData.socialProof = homeData.socialProof || {};
    homeData.socialProof.testimonials = cmsTestimonials.map((t: any) => ({
      name: t.studentName,
      batch: t.designation || "",
      photo: resolveImageUrl(t.imageUrl) || "/images/student_1-768w.webp",
      quote: t.message,
    }));
  }

  if (!homeData) {
    // If no data, we could show a fallback or notFound()
    // For now, let's show a minimal fallback to prevent 404
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Welcome to Culinary Academy ({locale})</h1>
      </div>
    );
  }

  let quickAnswersData: { question: string; answer: string }[] = [];
  try {
    const faqPath = path.join(process.cwd(), `content/${locale}/faq.json`);
    if (fs.existsSync(faqPath)) {
      const faqData = JSON.parse(fs.readFileSync(faqPath, "utf8"));
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
    console.error("Error loading FAQs for homepage:", error);
  }

  // Fallback if file load fails
  if (quickAnswersData.length === 0) {
    quickAnswersData = locale === 'bn' ? [
      {
        question: "বাংলাদেশে প্রফেশনাল শেফ কোর্সের খরচ কত টাকা?",
        answer: "কালিনারি একাডেমি-তে প্রফেশনাল শেফ কোর্সের মোট খরচ মাত্র ৪৪,০০০ টাকা। এটি ৩টি সহজ কিস্তিতে পরিশোধ করা যায়: ভর্তি ফি ১৬,০০০ টাকা এবং পরবর্তী দুটি কিস্তি ১৪,০০০ টাকা করে। কোনো অতিরিক্ত বা গোপন চার্জ নেই। এই ফি-র মধ্যে সব ধরনের প্রিমিয়াম কাঁচামাল, পরীক্ষার উপকরণ, শেফ ইউনিফর্ম এবং প্রয়োজনীয় টুলকিটের খরচ অন্তর্ভুক্ত রয়েছে, যা আন্তর্জাতিক মানের ক্যারিয়ার গড়তে সাহায্য করে।"
      },
      {
        question: "ঢাকার সেরা রান্নার স্কুল কোনটা?",
        answer: "কালিনারি একাডেমি (কালিনারি একাডেমি) হচ্ছে ঢাকার মধ্যে সেরা এনএসডিএ (NSDA) অনুমোদিত কুকিং ট্রেনিং সেন্টার। এখানে আন্তর্জাতিক মানের শেফ মেন্টরদের অধীনে ১৬টিরও বেশি দেশের ১২০টিরও বেশি রেসিপি হাতে-কলমে শেখানো হয়। সেই সাথে রয়েছে ৫-স্টার হোটেল ইন্টার্নশিপ ও চাকরি পাওয়ার সুবিধা এবং আইএসও-এইচএসিসিপি (ISO-HACCP) সার্টিফিকেশন, যা আপনার ক্যারিয়ারকে একধাপ এগিয়ে নিয়ে যাবে।"
      },
      {
        question: "শেফ কোর্স করে কি বিদেশে চাকরি পাওয়া সম্ভব?",
        answer: "হ্যাঁ, সম্ভব। কালিনারি একাডেমি থেকে সফলভাবে কোর্স সম্পন্ন করার পর শিক্ষার্থীরা সরাসরি আন্তর্জাতিক প্লেসমেন্ট ও ফাইভ-স্টার হোটেলগুলোতে ইন্টার্নশিপের সুযোগ পান। এছাড়াও আমাদের শিক্ষার্থীদের জন্য মালয়েশিয়া, অস্ট্রেলিয়া এবং কানাডার স্বনামধন্য বিশ্ববিদ্যালয়গুলোতে সরাসরি ক্রেডিট ট্রান্সফারের পথ সুগম রয়েছে। আমাদের গ্লোবাল কারিকুলাম ও সার্টিফিকেট বিশ্বজুড়ে অত্যন্ত সমাদৃত ও স্বনামধন্য বিলাসবহুল ক্রুজলাইন ও রিসোর্টে হাই-স্যালারি চাকরির জন্য দারুণ কার্যকর।"
      }
    ] : [
      {
        question: "How much does a professional chef course cost in Bangladesh?",
        answer: "The Professional Chef Course at Culinary Academy costs 44,000 BDT total, payable in 3 installments: 16,000 BDT admission fee + two 14,000 BDT installments. No hidden charges. This comprehensive fee structure covers all premium raw ingredients, exam materials, chef uniforms, and toolkit costs, making Culinary Academy the most affordable high-fidelity culinary institute in Dhaka for aspiring professional chefs seeking career-ready training."
      },
      {
        question: "Which is the best culinary institute in Dhaka?",
        answer: "Culinary Academy (Culinary Academy) is the top NSDA-accredited culinary training institute in Dhaka, offering 120+ recipes from 16+ cuisines with ISO-HACCP certification and 5-star hotel placement support. With a state-of-the-art commercial kitchen facility and internationally trained executive chef mentors, Culinary Academy provides hands-on practical training that matches international standards, ensuring graduates are immediately ready for prestigious jobs worldwide."
      },
      {
        question: "Can I get a chef job abroad after completing a course in Bangladesh?",
        answer: "Yes. Culinary Academy graduates receive international placements and credit transfer pathways to top universities in Malaysia, Australia, and Canada, backed by five-star hotel internships. Culinary Academy's curriculum is globally recognized and fully aligned with international standards, allowing our students to secure high-paying chef positions in top-tier cruise lines, luxury resort properties, and fine-dining establishments across the globe upon graduation."
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
    <>
      <SchemaInjector
        schemas={[
          generateWebPageSchema({
            title: (homeData?.hero?.slides?.[0]?.headline) ? `${homeData.hero.slides[0].headline} | Culinary Academy` : 'Culinary Academy - Culinary Academy',
            description: (homeData?.hero?.slides?.[0]?.subheadline) || 'Professional Chef Course in Dhaka',
            url: `https://culinaryacademy.com/${locale}`
          }),
          generateOrganizationSchema(),
          generateLocalBusinessSchema(),
          faqSchema,
          generateEducationEventSchema({
            name: locale === 'bn' ? 'প্রফেশনাল শেফ কোর্স ভর্তি সেশন ২০২৬' : 'Professional Chef Course Admission Session 2026',
            startDate: '2026-07-01T10:00:00+06:00',
            endDate: '2026-07-07T19:00:00+06:00',
            price: '44000'
          })
        ]}
      />
      <Hero data={{ ...homeData.hero, batchInfo: homeData.batchInfo }} />


      <ValueProposition data={homeData.valueProposition} />

      <section className="py-20 bg-obsidian border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              {locale === 'bn' ? 'Culinary Academy কেন আলাদা?' : 'What Makes Culinary Academy Different'}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">
              {locale === 'bn'
                ? 'বাংলাদেশের কালিনারি ইন্ডাস্ট্রিতে আমরাই দিচ্ছি সবচেয়ে পূর্ণাঙ্গ ও আন্তর্জাতিক মানের সুবিধা।'
                : 'We provide the most comprehensive and internationally recognized culinary training facilities in Bangladesh.'}
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              locale === 'bn' ? '১২০+ রেসিপি' : '120+ recipes',
              locale === 'bn' ? '১৬+ কুইজিন' : '16+ cuisines',
              locale === 'bn' ? 'এনএসডিএ (NSDA) অনুমোদিত' : 'NSDA-accredited',
              locale === 'bn' ? 'আইএসও-এইচএসিসিপি (ISO-HACCP) সার্টিফাইড' : 'ISO-HACCP certified',
              locale === 'bn' ? 'ফ্রি পেস্ট্রি মডিউল' : 'free pastry module',
              locale === 'bn' ? 'ফাইভ-স্টার প্লেসমেন্ট পার্টনার' : '5-star placement partners'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 glass-card p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-prestige-gold/30 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-bold tracking-wide text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-24 bg-obsidian relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10 mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6">
            {locale === 'bn' ? 'আপনার সঠিক কোর্সটি বেছে নিন' : 'Choose Your Path'}
          </h2>
          <div className="flex justify-center">
            <CourseQuiz locale={locale} />
          </div>
        </div>
      </section>

      <CourseShowcase data={homeData.courseShowcase} />

      <TalkToCounselor locale={locale} />

      <SocialProof data={homeData.socialProof} />
      <SocialMediaFeed data={homeData.socialMedia} />
      <FinalCTA data={homeData.finalCta} />

      <RecentBlogPosts posts={recentPosts} data={homeData.recentPosts} />

      {/* AEO SECTION - Moved Above Footer */}
      {/* AEO Direct Answer Block */}
      <section className="py-16 bg-white/[0.02] border-t border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] bg-power-red/10 border border-power-red/20 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-4">
            {locale === 'bn' ? 'সরাসরি উত্তর (Direct Answer)' : 'Direct Answer'}
          </span>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed tracking-tight">
            {locale === 'bn'
              ? 'কালিনারি একাডেমি হলো ঢাকার ধানমন্ডিতে অবস্থিত প্রধানমন্ত্রীর কার্যালয়ের এনএসডিএ (NSDA) অনুমোদিত প্রিমিয়াম কুকিং স্কুল। আমাদের ৫-তারকা আন্তর্জাতিক শেফ মেন্টরদের অধীনে আমরা ১৬+ দেশের ১২০+ রেসিপি, এনএসডিএ লেভেল ২ ও ৩ এবং আইএসও-এইচএসিসিপি ফুড সেফটি মানদণ্ড নিশ্চিত করি, যা শিক্ষার্থীদের বিশ্বজুড়ে ফাইভ-স্টার চাকরি ও ইন্টার্নশিপ পেতে সাহায্য করে।'
              : 'Culinary Academy is the premier NSDA-accredited culinary academy in Dhanmondi, Dhaka. Under 5-star executive mentors, Culinary Academy provides hands-on training for 120+ recipes across 16+ global cuisines, offering official NSDA Level 2 & 3 credentials, ISO-HACCP certifications, and conditional 5-star hotel job placement support globally.'
            }
          </p>
        </div>
      </section>

      {/* AEO Key Facts Table */}
      <section className="py-12 relative z-10 bg-obsidian border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-prestige-gold font-bold text-xs uppercase tracking-widest mb-6 text-center">
              {locale === 'bn' ? 'কালিনারি একাডেমি মূল তথ্য তালিকা' : 'Culinary Academy Core Key Facts'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase text-xs tracking-wider">
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'প্যারামিটার' : 'Parameter'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'তথ্য / বিবরণ' : 'Details / Value'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'অনুমোদন / মানদণ্ড' : 'Verification / Standard'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80 font-medium">
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'কোর্স ফি' : 'Course Fee'}</td>
                    <td className="py-3 px-4">৳৪৪,০০০ ({locale === 'bn' ? '৩টি কিস্তিতে পরিশোধযোগ্য' : 'Payable in 3 Installments'})</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? 'কোনো হিডেন চার্জ নেই' : 'No Hidden Charges'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'সময়কাল' : 'Duration'}</td>
                    <td className="py-3 px-4">{locale === 'bn' ? '৬ মাস (২ মাস কিচেন ল্যাব + ৪ মাস ইন্টার্নশিপ)' : '6 Months (2M Lab + 4M Internship)'}</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">{locale === 'bn' ? '১০০% প্র্যাকটিক্যাল' : '100% Practical'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'অনুমোদন ও স্বীকৃতি' : 'Accreditation'}</td>
                    <td className="py-3 px-4">{locale === 'bn' ? 'NSDA (প্রধানমন্ত্রীর কার্যালয়) এবং BTEB' : 'NSDA (Prime Minister\'s Office) & BTEB'}</td>
                    <td className="py-3 px-4 font-bold text-white/60">Level 2 & 3 Certified</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'খাদ্য নিরাপত্তা মান' : 'Food Safety Standard'}</td>
                    <td className="py-3 px-4">ISO 22000 & HACCP Standards</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">SGS Switzerland Audited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'ক্যাম্পাস লোকেশন' : 'Campus Location'}</td>
                    <td className="py-3 px-4">{locale === 'bn' ? 'ধানমন্ডি, ঢাকা (লেক সার্কাস, কলাবাগান)' : 'Dhanmondi, Dhaka (Lake Circus, Kalabagan)'}</td>
                    <td className="py-3 px-4 text-white/40">House-160, 1st Floor</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'অফিশিয়াল হেল্পলাইন' : 'Official Helpline'}</td>
                    <td className="py-3 px-4">+880 1700 000000</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপ উপলব্ধ' : 'WhatsApp Available'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Video Embed + Transcript Section */}
      <section className="py-20 bg-black/10 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-[10px] bg-power-red/10 border border-power-red/20 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-4">
            {locale === 'bn' ? 'ভিডিও গাইড' : 'Featured Video'}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6">
            {locale === 'bn' ? 'আমাদের কিচেন ও ল্যাব কভারেজ' : 'Watch Culinary Academy in Action'}
          </h2>
          <VideoWithTranscript
            videoId={btvVideo.videoId}
            title={btvVideo.title}
            summary={btvVideo.summary}
            transcript={btvVideo.transcript}
            locale={locale}
            platform={btvVideo.platform}
          />
        </div>
      </section>

      <QuickAnswers
        items={quickAnswersData}
        title={locale === 'bn' ? "কুইক আনসারস (PAA)" : "Quick Answers (PAA)"}
        subtitle={locale === 'bn' ? "ভয়েস ও সার্চ ইঞ্জিন FAQ" : "Voice & Search Engine FAQs"}
      />

      {/* Author Box Section */}
      <section className="py-12 bg-black/10 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <AuthorBox
            name="Dewan Ismail"
            title={locale === 'bn' ? 'প্রিন্সিপাল ও প্রতিষ্ঠাতা, কালিনারি একাডেমি' : 'Principal & Founder, Culinary Academy'}
            photo="/images/dewan-ismail-portrait.jpg"
            profileUrl="/expert-culinary-mentors/dewan-ismail"
            lastReviewed={locale === 'bn' ? 'জুন ২০২৬' : 'June 2026'}
            locale={locale}
          />
        </div>
      </section>
    </>
  );
}

// Cache bust to force dev compiler rebuild
