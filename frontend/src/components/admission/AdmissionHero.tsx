'use client';

import React from 'react';

interface AdmissionHeroProps {
  data: {
    heading: string;
    subheading: string;
  };
}

import Image from 'next/image';

const AdmissionHero = ({ data }: AdmissionHeroProps) => {
  return (
    <section className="relative pt-24 pb-16 text-center overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_3-1920w.webp"
          alt="CIB Admission Center"
          fill
          className="object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/95 to-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-black tracking-widest mb-10 uppercase">
          Admission Protocol
        </div>
        
        <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8 uppercase">
          {data.heading}
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          {data.subheading}
        </p>

        <div className="w-24 h-1 bg-power-red mx-auto mt-12 rounded-full shadow-[0_0_20px_rgba(236,27,35,0.4)]"></div>
      </div>
    </section>
  );
};

export default AdmissionHero;
