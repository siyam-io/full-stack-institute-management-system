'use client';

import React from 'react';
import { courseData } from './courseData';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function CuisineGrid() {
  const { ref, isVisible } = useScrollReveal();

  const cuisineFlags: Record<string, string> = {
    "Continental Food-I": "eu",
    "Continental Food-II": "eu",
    "Italian Cuisine": "it",
    "Italian": "it",
    "Thai Cuisine": "th",
    "Thai": "th",
    "Chinese Cuisine": "cn",
    "Chinese": "cn",
    "Japanese Cuisine": "jp",
    "Japanese": "jp",
    "Korean Cuisine": "kr",
    "Korean": "kr",
    "Indian Cuisine": "in",
    "Indian": "in",
    "Mughlai Cuisine": "in",
    "Malaysian Cuisine": "my",
    "Middle Eastern Cuisine": "sa",
    "Mexican Cuisine": "mx",
    "Mexican": "mx",
    "Turkish Cuisine": "tr",
    "Turkish": "tr",
    "French Cuisine": "fr",
    "French": "fr",
    "Spanish Cuisine": "es",
    "Spanish": "es",
    "Indonesian Cuisine": "id",
    "Bangladeshi Regional Cuisine": "bd",
    "Bengali": "bd",
    "Pakistani": "pk",
    "Iranian": "ir",
    "Arabian": "sa",
    "Afghani": "af",
    "Singaporean": "sg",
    "Qatari": "qa"
  };

  return (
    <section id="cuisines" className="py-28 bg-obsidian text-white relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <span className="text-prestige-gold font-bold tracking-widest text-sm uppercase mb-4 block font-english">Global Culinary Expertise</span>
            <h2 className="font-bengali text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
              ১৬+ দেশের <span className="text-transparent bg-clip-text bg-gradient-to-r from-prestige-gold via-yellow-200 to-prestige-gold">আন্তর্জাতিক কুইজিন</span>
            </h2>
            <p className="font-bengali text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {courseData.recipesCount}+ এর বেশি সিগনেচার রেসিপি দিয়ে সাজানো সম্পূর্ণ প্র্যাকটিক্যাল কোর্স। আপনি শিখবেন প্রতিটি কুইজিনের অথেন্টিক স্বাদ এবং প্রেজেন্টেশন।
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6">
            {courseData.cuisines.map((cuisine, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl group p-4 md:p-6 lg:p-8 text-center hover:border-prestige-gold/50 transition-all duration-500 flex flex-col items-center justify-center min-h-[120px] md:min-h-[160px] gap-2 md:gap-4 shadow-2xl shadow-obsidian"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-prestige-gold group-hover:scale-110 transition-all duration-500 shadow-2xl bg-white/5 flex items-center justify-center p-0.5">
                  {cuisineFlags[cuisine] ? (
                    <img 
                      src={`https://flagcdn.com/w160/${cuisineFlags[cuisine]}.png`} 
                      alt={`${cuisine} flag`}
                      width="64"
                      height="64"
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xl md:text-3xl">🍳</span>
                  )}
                </div>
                <span className="font-english font-bold text-xs md:text-sm text-white/80 group-hover:text-prestige-gold transition-colors duration-300 tracking-wide uppercase leading-tight">
                  {cuisine}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
