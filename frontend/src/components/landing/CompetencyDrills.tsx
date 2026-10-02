'use client';

import React from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function CompetencyDrills() {
  const { ref, isVisible } = useScrollReveal();

  const drills = [
    { 
      title: "Knife Precision Drill", 
      description: "Execute flawless 12 Essential Vegetable Cuts within strict industrial time limits.",
      icon: (
        <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l2.828-2.829a2 2 0 112.829 2.829L14.121 14.121M12 12L4.93 4.93a2 2 0 00-2.829 2.828L9.172 14.83M12 12l-2.828 2.828" />
        </svg>
      )
    },
    { 
      title: "Zero-Tolerance Hygiene", 
      description: "0% tolerance for food safety violations, following HACCP & ISO 22000 protocols.",
      icon: (
        <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: "Industrial Velocity", 
      description: "Execute complex recipes within commercial ticket times.",
      icon: (
        <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: "Recipe Consistency", 
      description: "Master 120+ International Recipes with 5-star flavor replication.",
      icon: (
        <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section id="drills" className="py-24 bg-obsidian relative" ref={ref}>
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-prestige-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20 relative z-10">
            <h2 className="font-bengali text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              সার্টিফিকেট কেবল যোগ্যদেরই দেওয়া হয় <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-prestige-gold via-yellow-200 to-prestige-gold text-xl md:text-2xl block mt-2 font-medium font-english">Certificates are Earned, Not Given</span>
            </h2>
            <div className="w-24 h-1 bg-prestige-gold mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {drills.map((drill, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl group p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 md:gap-6 hover:border-prestige-gold/40 transition-all duration-500 shadow-2xl shadow-obsidian"
              >
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-prestige-gold/10 transition-colors">
                  {drill.icon}
                </div>
                <div>
                  <h3 className="font-bold font-english text-lg md:text-xl text-white mb-2 md:mb-3 group-hover:text-prestige-gold transition-colors">{drill.title}</h3>
                  <p className="font-english text-white/60 text-sm md:text-base leading-relaxed">
                    {drill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
