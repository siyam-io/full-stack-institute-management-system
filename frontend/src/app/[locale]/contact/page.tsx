

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import fs from 'fs';
import path from 'path';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateWebPageSchema, generateLocalBusinessSchema } from "@/lib/seo";
import { Metadata } from 'next';
import Image from 'next/image';

import ThankYouModal from "@/components/global/ThankYouModal";
import InlineFAQ from "@/components/global/InlineFAQ";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isBn = locale === 'bn';
  const title = isBn
    ? 'সিআইবি ঢাকা যোগাযোগ | ক্যাম্পাস ভিজিট, ভর্তি সহায়তা, ডেমো ক্লাস এবং হোয়াটসঅ্যাপ'
    : 'Contact CIB Dhaka | Campus Visit, Admission Help, Demo Class & WhatsApp';
  const description = isBn
    ? 'ধানমন্ডি, ঢাকায় সিআইবি (CIB) ক্যাম্পে যোগাযোগ করুন, কল বা হোয়াটসঅ্যাপ করুন। কোর্সের ফি, ভর্তি সহায়তা এবং ক্যাম্পাসের ঠিকানা ও যাতায়াতের পথ জানুন।'
    : 'Call, WhatsApp, or visit CIB in Dhanmondi, Dhaka. Get course fees, admission support, and campus directions.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/contact`,
      type: 'website',
      siteName: 'Culinary Institute of Bangladesh',
      images: [{ url: 'https://cibdhk.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://cibdhk.com/images/og-default.png'],
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/contact`,
      languages: {
        'en': `https://cibdhk.com/en/contact`,
        'bn': `https://cibdhk.com/bn/contact`,
        'x-default': `https://cibdhk.com/en/contact`,
      }
    }
  };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  // Load contact data from JSON with fallback
  let contactData: any = { 
    hero: { heading: "Contact Us", subheading: "Get in touch" },
    info: { heading: "", items: [] },
    map: { heading: "", embedUrl: "" },
    form: { heading: "", fields: [] }
  };

  try {
    const contactDataPath = path.join(process.cwd(), `content/${locale}/contact.json`);
    if (fs.existsSync(contactDataPath)) {
      contactData = JSON.parse(fs.readFileSync(contactDataPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading contact page data:", error);
  }

  // const [openModal, isOpenModal] = useState(false);

  return (
    <main className="bg-obsidian min-h-screen">
      <SchemaInjector 
        schemas={[
          generateWebPageSchema({
            title: `Contact Us | ${contactData?.hero?.heading || 'Culinary Institute of Bangladesh'}`,
            description: contactData?.hero?.subheading || '',
            url: `https://cibdhk.com/${locale}/contact`
          }),
          generateLocalBusinessSchema()
        ]} 
      />
      <ContactHero data={contactData.hero} />
      
      <section className="py-24 md:py-32 relative overflow-hidden bg-obsidian">
        {/* Background Decor */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/student-practice-5-1920w.webp"
            alt="Contact Background"
            fill
            className="object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <ContactInfo data={contactData.info} />
          
          {/* Map Section - Now Full Width */}
          <div className="mb-24 md:mb-32 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              Geospatial Coordinates
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tighter uppercase">
              {contactData?.map?.heading}
            </h3>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl border border-white/10 group">
              <iframe 
                src={contactData?.map?.embedUrl}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="CIB Location"
              ></iframe>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
            {/* Image Column */}
            <div className="animate-fade-in relative group">
              <div className="absolute -inset-10 bg-power-red/10 rounded-[2rem] blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] bg-white/5">
                <Image 
                  src="/images/chef-rafeya-chowdhury-conducting-practical-class-1280w.webp" 
                  alt="Chef Rafeya Chowdhury" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-white font-black text-2xl tracking-tighter uppercase mb-2">Institutional Mentorship</h4>
                  <p className="text-prestige-gold font-bold tracking-widest text-[10px] uppercase">Direct Access to Excellence</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="animate-fade-in [animation-delay:200ms]">
              <div className="mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                  Inquiry Protocol
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                  Start a Dialogue
                </h3>
              </div>
              <ContactForm data={contactData.form} />
            </div>
          </div>

          {/* FAQs Section */}
          <div className="animate-fade-in pt-12 border-t border-white/5">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                {locale === 'bn' ? 'ক্যাম্পাস ভিজিট সংক্রান্ত সাধারণ জিজ্ঞাসা' : 'Campus Visit & Location FAQs'}
              </h3>
            </div>
            <InlineFAQ questions={
              locale === 'bn' ? [
                { question: "সিআইবি (CIB) ক্যাম্পাসটি কোথায় অবস্থিত?", answer: "সিআইবি ক্যাম্পাসটি হাউস-১৬০, লেক সার্কাস, কলাবাগান, ধানমন্ডি, ঢাকা-১২০৫ ঠিকানায় অবস্থিত। এটি কলাবাগান বাস স্ট্যান্ড থেকে খুব সহজেই যাতায়াতযোগ্য।" },
                { question: "ক্যাম্পাস পরিদর্শনের সময় কখন?", answer: "শনিবার থেকে বৃহস্পতিবার সকাল ১০:০০ টা থেকে সন্ধ্যা ৬:০০ টার মধ্যে যেকোনো সময় আপনি আমাদের ক্যাম্পাস পরিদর্শন করতে পারেন, আমাদের আধুনিক রান্নাঘর দেখতে পারেন এবং অ্যাডমিশন কাউন্সেলরদের সাথে সরাসরি কথা বলতে পারেন।" },
                { question: "আমি কি কোনো ফ্রি ডেমো ক্লাস করতে পারি?", answer: "হ্যাঁ, আপনি আমাদের +৮৮০১৩৩৮৯৫৮৯৯৭ নম্বরে কল করে অথবা যোগাযোগ ফর্মটি পূরণ করে ফ্রি ডেমো ক্লাসের জন্য নাম নিবন্ধন করতে পারেন। আমাদের কাউন্সেলর আপনার জন্য একটি সেশন বুক করবেন।" }
              ] : [
                { question: "Where is the CIB campus located?", answer: "CIB is located at House-160, Lake Circus, Kalabagan, Dhanmondi, Dhaka-1205. It is easily accessible from the Kalabagan Bus Stand." },
                { question: "What are the campus visit hours?", answer: "You can visit the CIB campus from Saturday to Thursday, between 10:00 AM and 6:00 PM, to take a tour of our professional kitchens and speak directly with our admission counselors." },
                { question: "Can I attend a free demo class?", answer: "Yes, you can register for a free demo class by calling us at +8801338958997 or filling out our contact form. Our counselors will schedule a session for you." }
              ]
            } />
          </div>

        </div>
      </section>
    </main>
  );
}
