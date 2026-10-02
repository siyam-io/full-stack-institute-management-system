'use client';

import React from 'react';

interface ContactHeroProps {
  data: {
    heading: string;
    subheading: string;
  };
}

import Image from 'next/image';

const ContactHero = ({ data }: ContactHeroProps) => {
  return (
    <section className="relative pt-24 pb-16 text-center overflow-hidden">

      <div className="max-w-5xl mx-auto px-4 relative z-10 animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-8">
          Strategic Alliance
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-8">
          {data.heading}
        </h1>
        
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {data.subheading}
        </p>

        <div className="w-24 h-1 bg-power-red mx-auto mt-12 rounded-full"></div>
      </div>
    </section>
  );
};

export default ContactHero;
