'use client';

import React from 'react';
import Image from 'next/image';

interface AboutHeroProps {
  data: {
    heading: string;
    subheading: string;
    image: string;
  };
}

const AboutHero = ({ data }: AboutHeroProps) => {
  if (!data) return null;
  return (
    <section className="relative h-[80vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-obsidian">
      <div className="absolute inset-0 z-0">
        <Image
          src={data.image || '/images/practical_class_1-1920w.webp'}
          alt="Culinary Academy Professional Environment"
          fill
          priority
          className="object-cover grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-[3px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center animate-fade-in pt-14 md:pt-20 pb-20">
        <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-black tracking-widest mb-10 uppercase">
          The Culinary Manifesto
        </div>
        
        <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8 uppercase">
          {data.heading}
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          {data.subheading}
        </p>

        <div className="w-24 h-1 bg-power-red mx-auto mt-16 rounded-full shadow-[0_0_30px_rgba(236,27,35,0.5)]"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-obsidian to-transparent z-10"></div>
    </section>
  );
};

export default AboutHero;
