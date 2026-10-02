'use client';

import React from 'react';
import { Link } from '@/navigation';

interface EconomicsROIProps {
  data: {
    heading: string;
    body: string;
    cta: string;
    ctaLink: string;
  };
}

import Image from 'next/image';

const EconomicsROI = ({ data }: EconomicsROIProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden text-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/student-practice-5-1920w.webp"
          alt="Culinary Economics"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-10">
          Career ROI
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight leading-tight">
          {data.heading}
        </h2>
        
        <div className="glass-card p-6 md:p-10 rounded-[1.5rem] mb-12 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          <div className="text-prestige-gold text-3xl md:text-4xl font-bold mb-6 tracking-tight shadow-sm leading-none">
            25 Days
          </div>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
            {data.body}
          </p>
        </div>

        <Link 
          href={data.ctaLink} 
          className="btn-primary inline-flex items-center gap-4 px-10 py-4 text-sm font-bold tracking-widest rounded-xl shadow-[0_15px_40px_rgba(236,27,35,0.3)] hover:scale-105 transition-all"
        >
          {data.cta}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default EconomicsROI;
