'use client';

import React, { useState } from 'react';

interface MonthData {
  title: string;
  items: string[];
}

interface CurriculumTimelineProps {
  data: {
    heading: string;
    months: MonthData[];
  };
}

import { ChevronDown, Check } from 'lucide-react';
import Image from 'next/image';

const CurriculumTimeline = ({ data }: CurriculumTimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_2-1920w.webp"
          alt="Curriculum Roadmap"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-obsidian"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-6">
            The Mastery Roadmap
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            {data.heading}
          </h2>
        </div>

        <ol className="space-y-8" aria-label="Culriculum Timeline Roadmap">
          {data.months.map((month, i) => (
            <li 
              key={i} 
              className={`glass-card rounded-[1.5rem] border transition-all duration-700 overflow-hidden cursor-pointer ${
                activeIndex === i ? 'border-prestige-gold/40 bg-white/10 shadow-2xl scale-105' : 'border-white/5 bg-white/5 hover:border-white/10'
              }`}
              onClick={() => setActiveIndex(i)}
            >
              <div className="p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-500 ${
                    activeIndex === i ? 'bg-power-red text-white shadow-[0_0_20px_rgba(236,27,35,0.4)] rotate-6' : 'bg-white/5 text-white/20'
                  }`}>
                    {i + 1}
                  </div>
                  <h3 className={`text-lg font-bold transition-colors duration-500 ${
                    activeIndex === i ? 'text-white' : 'text-gray-500'
                  }`}>
                    {month.title}
                  </h3>
                </div>
                <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-700 ${activeIndex === i ? 'rotate-180 bg-prestige-gold border-prestige-gold' : ''}`}>
                  <ChevronDown className={`w-5 h-5 transition-colors ${activeIndex === i ? 'text-obsidian' : 'text-gray-500'}`} />
                </div>
              </div>

              <div className={`transition-all duration-700 ease-in-out ${
                activeIndex === i ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-8 pt-4 ml-0 md:ml-20 border-t border-white/5">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {month.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-300 text-sm md:text-base group/item">
                        <div className="mt-1 w-4 h-4 rounded-full bg-prestige-gold/20 flex items-center justify-center group-hover/item:bg-prestige-gold transition-colors">
                          <Check className="w-2.5 h-2.5 text-prestige-gold group-hover/item:text-obsidian transition-colors" strokeWidth={4} />
                        </div>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default CurriculumTimeline;
