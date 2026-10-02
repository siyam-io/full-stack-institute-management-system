'use client';

import React from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function SocialProof() {
  const { ref, isVisible } = useScrollReveal();

  const hotels = [
    "Pan Pacific Sonargaon", 
    "Radisson Blu", 
    "The Westin Dhaka", 
    "InterContinental", 
    "Le Méridien", 
    "Renaissance Hotels",
    "Sheraton Dhaka",
    "Amari Dhaka"
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-obsidian border-y border-white/5" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10 md:mb-16">
            <span className="text-prestige-gold font-bold tracking-widest text-sm uppercase mb-4 block">Our Placement Network</span>
            <h2 className="font-bengali text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight">
              ইন্টার্নশিপ এবং চাকুরীর সেরা সুযোগ
            </h2>
            <p className="text-white/60 text-base md:text-lg font-bengali max-w-3xl mx-auto leading-relaxed">
              সফলভাবে কোর্স সম্পন্ন করার পর দেশে এবং বিদেশে ফাইভ-স্টার হোটেল, রিসোর্ট এবং স্বনামধন্য রেস্টুরেন্টে ইন্টার্নশিপ ও চাকুরীর জন্য আমাদের এক্সক্লুসিভ নেটওয়ার্ক এবং সাপোর্ট প্রদান করা হয়। 
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 border border-white/10 text-prestige-gold shadow-lg">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <p className="font-english font-black text-white/40 tracking-[0.3em] text-xs uppercase mb-10">
              Top 5-Star Placement Partners
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl">
              {hotels.map((hotel, idx) => (
                <div 
                  key={idx} 
                  className="px-4 py-2 md:px-6 md:py-3 bg-white/5 border border-white/10 rounded-xl text-sm md:text-base font-english font-bold text-white/80 shadow-inner hover:bg-prestige-gold/10 hover:border-prestige-gold/30 hover:text-prestige-gold transition-all duration-300 cursor-default"
                >
                  {hotel}
                </div>
              ))}
            </div>
            
            <div className="mt-16 flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
               {/* Simplified representation of prestige logos or just more text */}
               <p className="font-bengali text-sm text-white italic">এবং আরও ২০+ লিডিং হসপিটালিটি ব্র্যান্ড...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
