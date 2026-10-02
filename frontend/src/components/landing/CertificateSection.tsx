'use client';

import React from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function CertificateSection() {
  const { ref, isVisible } = useScrollReveal();

  const certifications = [
    "NSDA Food and Beverage Production সার্টিফিকেট",
    "ISO- HACCP, HYGIENE & GMP ট্রেনিং এবং সার্টিফিকেট",
    "প্রাতিষ্ঠানিক Food & Beverage Production Level-3 সার্টিফিকেট",
  ];

  return (
    <section id="certificates" className="py-16 md:py-24 bg-obsidian relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[radial-gradient(#C5A059_2px,transparent_2px)] [background-size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10 md:mb-16">
            <span className="text-prestige-gold font-bold tracking-widest text-sm uppercase mb-4 block px-4 py-1 bg-prestige-gold/10 rounded-full w-fit mx-auto border border-prestige-gold/20">
              Globally Recognized Certification
            </span>
            <h2 className="font-bengali text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight">
              আমাদের সার্টিফিকেশন
            </h2>
            <p className="font-bengali text-white/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
              আপনার দক্ষতার সর্বোচ্চ প্রমাণ — যা দেশে এবং বিদেশে ১০০% গ্রহণযোগ্য।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-md rounded-2xl group p-8 md:p-10 text-center border border-white/10 hover:border-prestige-gold/40 transition-all duration-500 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] md:min-h-[220px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-prestige-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-prestige-gold/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <svg className="w-8 h-8 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                
                <p className="font-english font-bold text-white text-lg group-hover:text-prestige-gold transition-colors duration-300 tracking-wide uppercase">
                  {cert}
                </p>
                
                <div className="mt-4 w-8 h-0.5 bg-prestige-gold/30 group-hover:w-16 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
