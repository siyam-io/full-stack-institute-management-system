import React from 'react';
import { Metadata } from 'next';
import "@/app/globals.css";
import "@/styles/landing.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://cibdhk.com'),
  title: 'Professional Chef Course (Basic to Advance) | CIB',
  description: 'Master the art of professional cooking with 100% practical training in Dhaka. Accredited by NSDA & ISO. Best culinary course for international career.',
  alternates: {
    canonical: 'https://cibdhk.com/professional-chef-course-basic-to-advance',
  },
  openGraph: {
    title: 'Professional Chef Course (Basic to Advance) | CIB',
    description: 'Master the art of professional cooking with 100% practical training in Dhaka.',
    url: 'https://cibdhk.com/professional-chef-course-basic-to-advance',
    siteName: 'Culinary Institute of Bangladesh',
    images: [
      {
        url: '/images/landing/Practical_class_1.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Chef Course at CIB',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Chef Course (Basic to Advance) | CIB',
    description: 'Master the art of professional cooking with 100% practical training in Dhaka.',
    images: ['/images/landing/Practical_class_1.jpg'],
  },
};

import Script from 'next/script';
import GTMTracker from '@/components/tracking/GTMTracker';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <GTMTracker gtmId="GTM-T5WVVZ4J" />
        {/* Meta Pixel */}
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
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=769929944747444&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="landing-page-root selection:bg-prestige-gold selection:text-obsidian bg-obsidian text-white antialiased">
        {children}
      </body>
    </html>
  );
}
