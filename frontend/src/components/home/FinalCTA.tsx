'use client';

import React from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { pushToDataLayer } from '@/lib/tracking/datalayer';

interface FinalCTAProps {
  data: {
    heading: string;
    subtext: string;
    buttonText: string;
    buttonLink: string;
  };
}

const FinalCTA = ({ data }: FinalCTAProps) => {
  return (
    <section className="relative py-16 md:py-24 text-center overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_1-1920w.webp"
          alt="Culinary Academy Professional Kitchen"
          fill
          className="object-cover opacity-5 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-red/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 animate-fade-in">
        <div className="noir-chip noir-chip-red mb-10">
          The Final Protocol
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
          {data.heading}
        </h2>
        
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          {data.subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link 
            href={data.buttonLink} 
            onClick={() => pushToDataLayer('begin_application', { source: 'final_cta' })}
            className="shiny-cta group flex items-center gap-4 text-white uppercase"
          >
            {data.buttonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-24 flex items-center justify-center gap-6 opacity-20">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-white"></div>
          <div className="w-2 h-2 bg-power-red rounded-full"></div>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
