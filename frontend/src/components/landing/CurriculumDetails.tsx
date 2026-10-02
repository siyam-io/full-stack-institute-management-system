'use client';

import React, { useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function CurriculumDetails() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number>(0);

  const curriculumData = [
    {
      title: "Theoretical Modules",
      bengaliTitle: "থিওরেটিক্যাল বিষয়সমূহ",
      icon: (
        <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      content: "Introduction to Hospitality Industry, Kitchen Setup & Hierarchy, Food Safety & HACCP, Workplace Hygiene, Menu Planning, Cost Control, Industrial Discipline."
    },
    {
      title: "Global Cuisines",
      bengaliTitle: "১৬+ দেশের কুইজিন",
      icon: (
        <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: "Continental, Italian, Thai, Chinese, Japanese, Korean, Indian, Mughlai, Malaysian, Middle Eastern, Mexican, Turkish, French, Spanish, Indonesian, Bangladeshi Regional Cuisine."
    },
    {
      title: "Specialized Sections",
      bengaliTitle: "বিশেষ প্রশিক্ষণ",
      icon: (
        <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      content: "Breakfast Cookery, Advanced Baking & Pastry, Barista & Beverage Making, Vegetable Carving, Food Presentation & Fine Dining Plating Techniques."
    }
  ];

  return (
    <section id="curriculum-details" className="py-24 bg-obsidian border-y border-white/5" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="font-bengali text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              কী কী শেখানো হবে?
            </h2>
            <p className="font-bengali text-white/60 text-lg">আন্তর্জাতিক মানের সম্পূর্ণ ইনটেনসিভ কারিকুলাম</p>
          </div>

          <div className="space-y-4">
            {curriculumData.map((item, idx) => (
              <div 
                key={idx} 
                className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-prestige-gold/40' : 'border-white/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                  className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 min-h-[56px] flex justify-between items-center transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-3 sm:gap-4 text-left">
                    <div className={`p-2 sm:p-3 rounded-xl transition-colors flex-shrink-0 ${openIndex === idx ? 'bg-prestige-gold/20' : 'bg-white/5'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold font-english text-white text-base sm:text-lg md:text-xl">{item.title}</h3>
                      <p className="font-bengali text-xs sm:text-sm md:text-base text-white/50">{item.bengaliTitle}</p>
                    </div>
                  </div>
                  <svg 
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-white/30 transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180 text-prestige-gold' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === idx ? 'max-h-96 py-6 opacity-100 border-t border-white/5' : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  <p className="font-english text-white/80 leading-relaxed text-lg">
                    {item.content}
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
