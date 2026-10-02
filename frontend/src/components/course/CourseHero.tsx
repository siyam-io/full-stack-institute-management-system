'use client';

import React from 'react';

interface CourseHeroProps {
  data: {
    heading: string;
    subheading: string;
  };
}

import Image from 'next/image';

const CourseHero = ({ data }: CourseHeroProps) => {
  return (
    <section className="relative pt-10 md:pt-14 pb-16 text-center overflow-hidden">

      <div className="max-w-5xl mx-auto px-4 relative z-10 animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-black tracking-widest mb-8 uppercase">
          The Professional Path
        </div>
        
        <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8 uppercase">
          {data.heading}
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          {data.subheading}
        </p>

        <div className="w-24 h-1 bg-power-red mx-auto mt-12 rounded-full"></div>
      </div>
    </section>
  );
};

export default CourseHero;
