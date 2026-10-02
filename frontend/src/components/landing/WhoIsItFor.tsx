'use client';

import React from 'react';
import { courseData } from './courseData';

const WhoIsItFor = () => {
  const iconMap: Record<string, React.ReactNode> = {
    globe: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1a2.5 2.5 0 012.5 2.5v.5M14 20h2.121l1.591-1.591a2 2 0 011.414-.586H20M3 10.155V10a7 7 0 0110-6.326M17.845 10.155A7 7 0 0113 21h-1z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    "trending-up": (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    home: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  };

  return (
    <section className="py-24 bg-obsidian">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-bengali">
            এই কোর্সটি <span className="text-prestige-gold">কাদের জন্য?</span>
          </h2>
          <p className="text-gray-400 font-bengali max-w-2xl mx-auto">
            আপনার লক্ষ্য যাই হোক না কেন, সিআইবি আপনাকে আপনার কাঙ্ক্ষিত ক্যারিয়ারের জন্য প্রস্তুত করবে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courseData.whoIsItFor.map((persona, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl group hover:bg-white/[0.15] transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-power-red/10 flex items-center justify-center text-power-red mb-8 group-hover:scale-110 group-hover:bg-power-red group-hover:text-white transition-all duration-500">
                {iconMap[persona.icon] || iconMap.globe}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-english uppercase tracking-widest">{persona.title}</h3>
              <p className="text-gray-400 font-bengali leading-relaxed">{persona.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
