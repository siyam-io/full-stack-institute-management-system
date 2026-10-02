'use client';

import React from 'react';
import { courseData } from './courseData';

export default function StickyCTA() {
  const whatsappLink = `https://wa.me/${courseData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('হ্যালো, প্রফেশনাল শেফ কোর্সে ভর্তি হতে চাই।')}`;
  const phoneLink = `tel:${courseData.contact.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-obsidian/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.5)] p-4 pb-safe">
      <div className="flex gap-4 max-w-lg mx-auto">
        <a 
          href={courseData.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] bg-power-red text-white hover:bg-power-red-dark flex items-center justify-center gap-2 py-4 rounded-2xl text-base animate-[pulse_3s_infinite] font-bold transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          <span className="font-bengali">ভর্তি ফর্ম</span>
        </a>
        <a 
          href={phoneLink}
          className="flex-1 bg-white/5 border border-white/10 text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-bold font-bengali text-sm active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-prestige-gold" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          কল
        </a>
      </div>
    </div>
  );
}
