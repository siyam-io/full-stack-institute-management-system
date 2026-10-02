import AdmissionHero from "@/components/admission/AdmissionHero";
import ProcessSteps from "@/components/admission/ProcessSteps";
import FeeTable from "@/components/admission/FeeTable";
import LeadForm from "@/components/admission/LeadForm";
import DemoClassForm from "@/components/admission/DemoClassForm";
import VerificationLink from "@/components/global/VerificationLink";
import fs from 'fs';
import path from 'path';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateWebPageSchema, generateOrganizationSchema, generateFAQSchema } from "@/lib/seo";
import { Metadata } from 'next';
import QuickAnswers from "@/components/global/QuickAnswers";
import InlineFAQ from "@/components/global/InlineFAQ";
import TalkToCounselor from "@/components/global/TalkToCounselor";
import AuthorBox from "@/components/global/AuthorBox";
import VideoWithTranscript from "@/components/global/VideoWithTranscript";
import { getBtvVideoData } from "@/lib/videoData";
import { BATCH_CONFIG } from "@/lib/courseConfig";

import Image from 'next/image';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isBn = locale === 'bn';
  const title = isBn
    ? 'ভর্তি চলছে ২০২৬ | শেফ কোর্স ঢাকা ফি, কিস্তি এবং ভর্তি প্রক্রিয়া | সিআইবি'
    : 'Admission Open 2026 | Chef Course Dhaka Fees, Installments & Enrollment | CIB';
  const description = isBn
    ? 'ঢাকায় সিআইবি (CIB) শেফ কোর্সে ভর্তি হোন। ৪৪,০০০ টাকা ফি, সহজ কিস্তির সুবিধা, এনএসডিএ (NSDA) এবং আইএসও (ISO) সার্টিফিকেট, ও জব প্লেসমেন্ট সহায়তা।'
    : 'Apply for CIB chef courses in Dhaka. 44,000 BDT, easy installments, NSDA & ISO certification, job placement support.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/admission`,
      type: 'website',
      siteName: 'Culinary Institute of Bangladesh',
      images: [{ url: 'https://cibdhk.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://cibdhk.com/images/og-default.png'],
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/admission`,
      languages: {
        'en': `https://cibdhk.com/en/admission`,
        'bn': `https://cibdhk.com/bn/admission`,
        'x-default': `https://cibdhk.com/en/admission`,
      }
    }
  };
}

export default function AdmissionPage({ params: { locale } }: { params: { locale: string } }) {
  // Load admission data from JSON with fallback
  let admissionData: any = { 
    hero: { heading: "Admission", subheading: "" },
    process: { items: [] },
    feeTable: { heading: "", columns: [], rows: [] },
    form: { heading: "", fields: [] }
  };

  try {
    const admissionDataPath = path.join(process.cwd(), `content/${locale}/admission.json`);
    if (fs.existsSync(admissionDataPath)) {
      admissionData = JSON.parse(fs.readFileSync(admissionDataPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading admission page data:", error);
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
    console.error("Error loading FAQs for admission page:", error);
  }

  // Fallback if file load fails
  if (quickAnswersData.length === 0) {
    quickAnswersData = locale === 'bn' ? [
      {
        question: "কালিনারি ইনস্টিটিউট অফ বাংলাদেশ-এ কীভাবে ভর্তি হব?",
        answer: "কালিনারি ইনস্টিটিউট অফ বাংলাদেশ বা সিআইবি-তে ভর্তির জন্য আপনি অনলাইনে আমাদের অফিশিয়াল ওয়েবসাইটের মাধ্যমে আবেদন করতে পারেন অথবা প্রয়োজনীয় কাগজপত্র (এসএসসি/এইচএসসি সার্টিফিকেট বা মার্কশিট, এনআইডি বা জন্ম নিবন্ধন এবং ২ কপি পাসপোর্ট সাইজ ছবি) নিয়ে সরাসরি আমাদের ধানমন্ডি ক্যাম্পাসে চলে আসতে পারেন। আমাদের ভর্তি বিষয়ক পরামর্শক দল আপনার প্রোফাইল ও যোগ্যতা যাচাই করে কিস্তি সুবিধার মাধ্যমে খুব দ্রুত আপনার ভর্তি প্রক্রিয়া নিশ্চিত করবেন।"
      }
    ] : [
      {
        question: "How can I apply for a chef course at Culinary Institute of Bangladesh?",
        answer: "To apply for a professional chef course at CIB, you can submit an online application through our secure portal or visit our Dhanmondi campus in person with your educational credentials (SSC/HSC marksheets), two passport-size photographs, and a national identity card or birth certificate. Our admissions advisors will conduct a brief profile verification before confirming your enrollment and setting up your installment plan."
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

  const btvVideo = getBtvVideoData(locale);

  return (
    <main className="bg-obsidian min-h-screen">
      <SchemaInjector 
        schemas={[
          generateWebPageSchema({
            title: `Admission | ${admissionData?.hero?.heading || 'Admission'}`,
            description: admissionData?.hero?.subheading || '',
            url: `https://cibdhk.com/${locale}/admission`
          }),
          generateOrganizationSchema(),
          faqSchema
        ]} 
      />
      <AdmissionHero data={admissionData.hero} />



      <ProcessSteps data={admissionData.process} />
      
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <DemoClassForm />
      </div>

      <FeeTable data={admissionData.feeTable} />


      
      <section className="py-12 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
            {locale === 'bn' ? 'ভর্তি বিষয়ক জিজ্ঞাসা' : 'Admission FAQs'}
          </h2>
        </div>
        <InlineFAQ questions={
          locale === 'bn' ? [
            { question: "ভর্তির জন্য কী কী ডকুমেন্টস প্রয়োজন?", answer: "আপনার এসএসসি বা এইচএসসির মার্কশিট বা সার্টিফিকেট, ন্যাশনাল আইডি বা জন্ম নিবন্ধনের কপি এবং ২ কপি পাসপোর্ট সাইজ ছবি লাগবে।" },
            { question: "পেমেন্ট পদ্ধতি কী?", answer: "আপনি নগদ, বিকাশ, নগদ অ্যাপ বা সরাসরি ব্যাংক অ্যাকাউন্টে কিস্তির মাধ্যমে পেমেন্ট করতে পারবেন।" },
            { question: "আমি কি কিস্তিতে কোর্সের ফি দিতে পারবো?", answer: "হ্যাঁ, আপনি মোট ৩টি সহজ কিস্তিতে (ভর্তির সময় ১৬,০০০ টাকা, এবং বাকি দুটি কিস্তি ১৪,০০০ টাকা করে) পরিশোধ করতে পারবেন।" }
          ] : [
            { question: "What documents are required for admission?", answer: "You will need a copy of your SSC/HSC transcript or certificate, National ID or Birth Certificate, and 2 passport-sized photographs." },
            { question: "What are the payment methods?", answer: "We accept payments via Cash, bKash, Nagad, and direct Bank Transfer for your convenience." },
            { question: "Can I pay the course fee in installments?", answer: "Yes, you can pay the total course fee in 3 easy installments (16,000 BDT upon admission, followed by two installments of 14,000 BDT each)." }
          ]
        } />
      </section>

      <TalkToCounselor locale={locale} />

      <LeadForm data={admissionData.form} />


      
      <section className="py-16 md:py-24 relative overflow-hidden bg-obsidian">

        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/5 text-center max-w-2xl w-full shadow-[0_40px_100px_rgba(0,0,0,0.6)] group">
            <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-10">
              Verification Protocol
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight leading-tight">
              Institutional Credibility
            </h3>
            <div className="w-24 h-1 bg-power-red mx-auto mt-10 rounded-full shadow-[0_0_30px_rgba(236,27,35,0.6)] mb-12"></div>
            
            <div className="flex justify-center">
              <VerificationLink className="scale-125 hover:scale-150 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>
      {/* AEO Direct Answer Block */}
      <section className="py-16 bg-white/[0.02] border-t border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] bg-power-red/10 border border-power-red/20 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-4">
            {locale === 'bn' ? 'সরাসরি উত্তর (Direct Answer)' : 'Direct Answer'}
          </span>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed tracking-tight">
            {locale === 'bn'
              ? 'কালিনারি ইনস্টিটিউট অফ বাংলাদেশ (CIB)-এ ভর্তির প্রক্রিয়া অত্যন্ত সহজ ও স্বচ্ছ। আগ্রহী শিক্ষার্থীরা সরাসরি ধানমন্ডি ক্যাম্পাস ভিজিট করে অথবা অনলাইনের মাধ্যমে আবেদন সম্পন্ন করতে পারবেন। ভর্তির জন্য ৩টি সহজ কিস্তির সুযোগ রয়েছে (মোট ফি ৪৪,০০০ টাকা; ভর্তি ফি ১৬,০০০ টাকা এবং পরবর্তী দুটি কিস্তি ১৪,০০০ টাকা করে)। এসএসসি/এইচএসসি বা সমমানের যোগ্যতা সম্পন্ন যে কেউ প্রফেশনাল শেফ কোর্সে ভর্তি হতে পারবেন।'
              : 'Enrollment at the Culinary Institute of Bangladesh (CIB) is designed to be streamlined and accessible. Students can apply online or visit our Dhanmondi campus. The professional chef course fee is 44,000 BDT, payable in 3 easy installments (16,000 BDT at admission, followed by two 14,000 BDT monthly installments). Admission is open to candidates with SSC/HSC credentials or equivalent.'
            }
          </p>
        </div>
      </section>

      {/* AEO Key Facts Table */}
      <section className="py-12 relative z-10 bg-obsidian border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-prestige-gold font-bold text-xs uppercase tracking-widest mb-6 text-center">
              {locale === 'bn' ? 'ভর্তি সংক্রান্ত মূল তথ্য তালিকা' : 'Admission Key Facts'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase text-xs tracking-wider">
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'প্যারামিটার' : 'Parameter'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'তথ্য / বিবরণ' : 'Details / Value'}</th>
                    <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'শর্ত / মানদণ্ড' : 'Requirements / Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80 font-medium">
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Eligibility'}</td>
                    <td className="py-3 px-4">{locale === 'bn' ? 'ন্যূনতম এসএসসি / সমমান বা এইচএসসি' : 'Minimum SSC / Equivalent or HSC'}</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? 'যেকোনো বিভাগ গ্রহণযোগ্য' : 'Open to All disciplines'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'মোট কোর্স ফি' : 'Total Course Fee'}</td>
                    <td className="py-3 px-4">৳৪৪,০০০</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">{locale === 'bn' ? 'সহজ কিস্তি সুবিধা' : 'Installment Option Available'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'কিস্তি পরিকল্পনা' : 'Installment Details'}</td>
                    <td className="py-3 px-4">{locale === 'bn' ? 'ভর্তির সময় ৳১৬,০০০ + পরবর্তী ২ কিস্তি ৳১৪,০০০ করে' : '৳16,000 at admission + 2 monthly payments of ৳14,000'}</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? 'কোনো অতিরিক্ত চার্জ নেই' : 'No Extra Charges'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'প্রয়োজনীয় কাগজপত্র' : 'Required Documents'}</td>
                    <td className="py-3 px-4">{locale === 'bn' ? '২ কপি ছবি, এনআইডি/জন্ম নিবন্ধন এবং শিক্ষাগত সার্টিফিকেট' : '2 passport photos, NID/Birth Certificate & Academic Transcripts'}</td>
                    <td className="py-3 px-4 text-white/40">{locale === 'bn' ? 'ফটোকপি গ্রহণযোগ্য' : 'Photocopies accepted'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'আবেদন পদ্ধতি' : 'Application Process'}</td>
                    <td className="py-3 px-4">{locale === 'bn' ? 'অনলাইন আবেদন অথবা সরাসরি ক্যাম্পাস ভর্তি' : 'Online Application or Campus Walk-in'}</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">{locale === 'bn' ? 'ধানমন্ডি প্রধান কার্যালয়' : 'Dhanmondi Main Campus'}</td>
                  </tr>
                  {batchesText && (
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">{locale === 'bn' ? 'চলমান ভর্তি সেশন' : 'Current Session'}</td>
                      <td className="py-3 px-4">{batchesText}</td>
                      <td className="py-3 px-4 text-green-400 font-bold">{locale === 'bn' ? 'সীমিত আসন' : 'Limited Seats Open'}</td>
                    </tr>
                  )}
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
