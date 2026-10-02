
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import SchemaInjector from "@/components/global/SchemaInjector";
import { generateWebPageSchema, generateLocalBusinessSchema } from "@/lib/seo";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'en' ? 'Get Directions | CIB' : 'দিকনির্দেশনা পান | সিআইবি',
    description: locale === 'en' ? 'Navigate to CIB campus in Dhaka.' : 'সিআইবি ক্যাম্পাসে আসার দিকনির্দেশনা।',
    alternates: {
      canonical: `https://cibdhk.com/${locale}/directions`,
      languages: {
        'en': 'https://cibdhk.com/en/directions',
        'bn': 'https://cibdhk.com/bn/directions',
        'x-default': 'https://cibdhk.com/en/directions',
      }
    }
  };
}

export default function DirectionsPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="bg-obsidian min-h-screen flex flex-col">
      <SchemaInjector 
        schemas={[
          generateWebPageSchema({
            title: locale === 'en' ? 'Get Directions | CIB' : 'দিকনির্দেশনা পান | সিআইবি',
            description: locale === 'en' ? 'Navigate to CIB campus in Dhaka.' : 'সিআইবি ক্যাম্পাসে আসার দিকনির্দেশনা।',
            url: `https://cibdhk.com/${locale}/directions`
          }),
          generateLocalBusinessSchema()
        ]} 
      />

      {/* Header */}
      <header className="p-6 md:p-10 flex items-center justify-between relative z-10">
        <Link 
          href={`/${locale}/location`}
          className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-black uppercase text-[10px] tracking-[0.2em]">Back to Location</span>
        </Link>
        <div className="text-white font-black uppercase text-sm tracking-[0.3em]">
          CIB Navigation
        </div>
      </header>

      {/* Map Widget - Occupies remaining height */}
      <section className="flex-1 relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.93297059155!2d90.37891827606774!3d23.750313188795992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ae78434771%3A0xe54e6015b637d7c6!2sCulinary%20Institute%20of%20Bangladesh%20(CIB)!5e0!3m2!1sen!2sbd!4v1714392000000!5m2!1sen!2sbd"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          title="CIB Directions Map"
          className="grayscale invert opacity-90 contrast-125"
        ></iframe>
        
        {/* Mobile-friendly overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 md:hidden">
          <a 
            href="https://maps.app.goo.gl/QEkrd2fTHYhqC1tP9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full h-16 bg-power-red text-white font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center shadow-[0_20px_40px_rgba(236,27,35,0.4)]"
          >
            Start Navigation
          </a>
        </div>
      </section>
    </main>
  );
}
