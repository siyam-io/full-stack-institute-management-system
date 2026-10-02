'use client';

import React from 'react';
import Image from 'next/image';
import { courseData } from './courseData';
import useScrollReveal from '@/hooks/useScrollReveal';

const monthImages = [
  '/images/student_1-1280w.webp',
  '/images/student-practice-5-1280w.webp',
  '/images/student_practice_session_2-1280w.webp'
];

export default function MonthlyCurriculum() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="curriculum-monthly" className="py-16 md:py-24 bg-obsidian relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-prestige-gold/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-power-red/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10 md:mb-16 relative z-10">
            <h2 className="font-bengali text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
              আমাদের ৩ মাসের ইনটেনসিভ কারিকুলাম <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-prestige-gold via-yellow-200 to-prestige-gold text-xl sm:text-2xl md:text-3xl block mt-2 font-english">Professional Culinary Roadmap</span>
            </h2>
            <p className="font-bengali text-white/60 text-base md:text-lg max-w-2xl mx-auto">
              প্রতিটি মাস সাজানো হয়েছে ইন্ডাস্ট্রির চাহিদা এবং আপনার ক্যারিয়ার গ্রোথের কথা মাথায় রেখে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {courseData.monthlyBreakdown.map((month, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-xl border border-white/10 group p-1 hover:border-prestige-gold/30 transition-all duration-500 overflow-hidden rounded-xl shadow-2xl shadow-obsidian"
              >
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image 
                    src={monthImages[idx]} 
                    alt={`Training session for ${month.title}`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-6">
                    <span className="text-prestige-gold font-black text-sm tracking-widest uppercase bg-obsidian/80 px-3 py-1 rounded-full border border-prestige-gold/20 font-english">
                      Month 0{idx + 1}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-bengali font-bold text-2xl text-white mb-3 leading-snug group-hover:text-prestige-gold transition-colors">
                    {month.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-6 font-medium italic font-english">
                    "{month.description}"
                  </p>
                  
                  <ul className="space-y-4">
                    {month.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed group/item font-english">
                        <span className="mt-1 flex h-2 w-2 rounded-full bg-prestige-gold/60 group-hover/item:scale-125 transition-transform flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
