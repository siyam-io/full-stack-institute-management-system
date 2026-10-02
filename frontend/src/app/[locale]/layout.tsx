import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import { notFound } from 'next/navigation';
import SkipToContent from "@/components/global/SkipToContent";
import ClientLayoutWrapper from '@/components/global/ClientLayoutWrapper';
import FloatingApplyButton from '@/components/global/FloatingApplyButton';
import QuickContactPanel from '@/components/global/QuickContactPanel';
import Breadcrumb from '@/components/global/Breadcrumb';
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import NoirBackground from "@/components/global/NoirBackground";
import WebVitals from "@/components/global/WebVitals";
import fs from 'fs';
import path from 'path';
import GTMTracker from "@/components/tracking/GTMTracker";
import MetaCAPI from "@/components/tracking/MetaCAPI";
import PageViewTracker from "@/components/tracking/PageViewTracker";
import ConsentBanner from "@/components/tracking/ConsentBanner";
import { Suspense } from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import ErrorBoundary from '@/components/global/ErrorBoundary';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cibdhk.com'),
  alternates: {
    languages: {
      'en': '/en',
      'bn': '/bn',
      'x-default': '/en',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Culinary Institute of Bangladesh',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Culinary Institute of Bangladesh - Premium Culinary Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-default.png'],
  },
};

const inter = localFont({
  src: "../../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

const anekBangla = localFont({
  src: "../../../public/fonts/Anek_Bangla/AnekBangla-VariableFont_wdth,wght.ttf",
  variable: "--font-anek-bangla",
  weight: "100 800",
});

// Reference display face for the red-noir system.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "400", "600", "700", "800"],
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!['en', 'bn'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  // Load global data (navigation and footer)
  let navigationData: any = { 
    home: "Home",
    about: "About",
    ourStory: "About CIB",
    meetMentors: "Mentors",
    courses: "Courses",
    proChefCourse: "Pro Chef",
    comboCourse: "Combo",
    bakeryCourse: "Bakery",
    admission: "Admission",
    gallery: "Gallery",
    faq: "FAQ",
    contact: "Contact",
    blog: "Blog",
    languageToggle: "বাংলা"
  };

  let footerData: any = { 
    description: "Culinary Institute of Bangladesh (CIB) is the premier vocational training powerhouse for professional chefs and culinary entrepreneurs in Bangladesh.",
    columns: [
      { 
        title: "Navigation", 
        links: [
          { "label": "About CIB", "href": "/about" },
          { "label": "Admission", "href": "/admission" },
          { "label": "View Courses", "href": "/courses" },
          { "label": "Culinary Blog", "href": "/blog" }
        ] 
      },
      { 
        title: "Quick Links", 
        links: [
          { "label": "Pro Chef Landing", "href": "/professional-chef-course-basic-to-advance/" },
          { "label": "Diploma Courses", "href": "/courses" },
          { "label": "Short Courses", "href": "/courses" },
          { "label": "Contact Us", "href": "/contact" }
        ] 
      },
      { 
        title: "Institutional", 
        links: [
          { "label": "Verification", "href": "https://verification.cibdhk.com" },
          { "label": "Expert Mentors", "href": "/expert-culinary-mentors" },
          { "label": "FAQ", "href": "/faq" },
          { "label": "Gallery", "href": "/gallery" }
        ] 
      },
      { 
        title: "Contact", 
        address: "House-160, Lake Circus, Kalabagan, Dhanmondi, Dhaka 1205", 
        phone: "+880 1338 958997", 
        email: "info@cibdhk.com", 
        socials: {
          facebook: "https://www.facebook.com/cibdhaka",
          youtube: "https://www.youtube.com/@cibdhaka",
          instagram: "https://www.instagram.com/cib.dhk/",
          whatsapp: "https://wa.me/8801338958997"
        } 
      },
      { 
        title: "Newsletter", 
        placeholder: "Enter your email", 
        buttonText: "Join", 
        disclaimer: "Join 5,000+ professional chefs." 
      }
    ],
    copyright: "© {year} Culinary Institute of Bangladesh.",
    legal: []
  };

  try {
    const navPath = path.join(process.cwd(), `content/${locale}/globals/navigation.json`);
    const footerPath = path.join(process.cwd(), `content/${locale}/globals/footer.json`);
    
    if (fs.existsSync(navPath)) {
      try {
        const navRaw = fs.readFileSync(navPath, 'utf8');
        navigationData = { ...navigationData, ...JSON.parse(navRaw) };
      } catch (e) {
        console.error("Error parsing navigation.json:", e);
      }
    }
    if (fs.existsSync(footerPath)) {
      try {
        const footerRaw = fs.readFileSync(footerPath, 'utf8');
        footerData = { ...footerData, ...JSON.parse(footerRaw) };
      } catch (e) {
        console.error("Error parsing footer.json:", e);
      }
    }
  } catch (error) {
    console.error("Error loading global data:", error);
  }

  return (
    <html lang={locale}>
      <head>
        <GTMTracker gtmId="GTM-T5WVVZ4J" />
        <MetaCAPI />
        {/* Meta Pixel Base Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '769929944747444');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=769929944747444&ev=PageView&noscript=1"
          />
        </noscript>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        
        <style dangerouslySetInnerHTML={{ __html: `
          :root { --obsidian: #050506; --prestige-gold: #FFD700; --power-red: #EF233C; }
          body { background-color: var(--obsidian); color: white; margin: 0; }
          .pt-24 { padding-top: 6rem; }
          @media (min-width: 768px) { .md\\:pt-28 { padding-top: 7rem; } }
          header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
        `}} />
      </head>
      <body 
        className={`${inter.variable} ${anekBangla.variable} ${manrope.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <NoirBackground />
        <div className="gradient-blur" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageProvider initialLanguage={locale === 'bn' ? 'bn' : 'en'}>
          <SkipToContent />
          <Header navData={navigationData} locale={locale} />
          <main id="main-content" className="min-h-screen pt-24 md:pt-28 relative z-10">
            <Breadcrumb locale={locale} />
            <ErrorBoundary locale={locale}>
              {children}
            </ErrorBoundary>
          </main>
          <Footer data={footerData} locale={locale} />
          <ConsentBanner />
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          <WebVitals />
          </LanguageProvider>
        </NextIntlClientProvider>
        
        <FloatingApplyButton locale={locale} />
        <QuickContactPanel locale={locale} />
      </body>
    </html>
  );
}
