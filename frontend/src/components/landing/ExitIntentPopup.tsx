'use client';

import React, { useState, useEffect } from 'react';
import { courseData } from './courseData';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fade-in">
      <div className="bg-obsidian border border-white/10 rounded-[2.5rem] p-6 sm:p-10 max-w-lg w-full relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-prestige-gold/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-prestige-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-prestige-gold/20">
            <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>

          <h2 className="font-bengali text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            যাওয়ার আগে <span className="gold-gradient-text">একটু দাঁড়ান!</span>
          </h2>
          <p className="font-bengali text-white/60 text-base md:text-lg mb-10">
            আপনি কি জানেন? এখন ভর্তি হলে পাচ্ছেন স্পেশাল <span className="text-white font-bold">১০% ডিসকাউন্ট</span> এবং ফ্রি টুলকিট সেট!
          </p>
        </div>

        <div className="space-y-4">
          <a 
            href={courseData.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsVisible(false)}
            className="bg-power-red text-white hover:bg-power-red-dark transition-colors font-bold w-full py-4 rounded-2xl flex justify-center items-center gap-3 group"
          >
            <span className="font-bengali font-bold text-lg">স্লট বুকিং দিন</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <button 
            onClick={() => setIsVisible(false)}
            className="w-full py-2 text-white/30 text-xs font-bold hover:text-white transition-colors"
          >
            ধন্যবাদ, এখন নয়
          </button>
        </div>
      </div>
    </div>
  );
}
