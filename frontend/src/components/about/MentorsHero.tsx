'use client';

import React from 'react';
import Image from 'next/image';

interface MentorsHeroProps {
  data: {
    heading: string;
    subheading: string;
    image: string;
  };
}

const MentorsHero = ({ data }: MentorsHeroProps) => {
  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-obsidian">
      <div className="absolute inset-0 z-0">
        <Image
          src={data.image}
          alt="Culinary Academy Mentors Backdrop"
          fill
          priority
          className="object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center animate-fade-in pt-32">
        <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-10">
          The Council of Excellence
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
          {data.heading}
        </h1>
        
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {data.subheading}
        </p>

        <div className="w-24 h-1 bg-power-red mx-auto mt-16 rounded-full shadow-[0_0_30px_rgba(236,27,35,0.5)]"></div>
      </div>
    </section>
  );
};

export default MentorsHero;
