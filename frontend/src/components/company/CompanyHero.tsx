import React from 'react';

interface CompanyHeroProps {
  heading: string;
  subheading: string;
  tagline: string;
}

import Image from 'next/image';

const CompanyHero = ({ heading, subheading, tagline }: CompanyHeroProps) => {
  return (
    <section className="relative pt-40 pb-24 text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_1-1920w.webp"
          alt="CIB Institutional Profile"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-[3px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-xs font-black uppercase tracking-[0.3em] mb-8">
            {subheading}
          </div>
          
          <h1 className="text-5xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.9] mb-12 shadow-sm">
            {heading.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'text-prestige-gold block md:inline' : 'block md:inline mr-4'}>
                {word}
              </span>
            ))}
          </h1>

          <div className="w-32 h-1.5 bg-power-red mb-12 rounded-full shadow-[0_0_20px_rgba(236,27,35,0.5)]"></div>
          
          <p className="text-2xl md:text-4xl font-medium text-gray-300 max-w-4xl italic leading-relaxed">
            "{tagline}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanyHero;
