'use client';

import React, { useState } from 'react';
import { courseData } from './courseData';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function FAQSection() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-28 bg-obsidian relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12 md:mb-20">
            <span className="text-prestige-gold font-bold tracking-widest text-sm uppercase mb-4 block">Knowledge Base</span>
            <h2 className="font-bengali text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
              সচরাচর <span className="gold-gradient-text">জিজ্ঞাসা</span>
            </h2>
            <p className="font-bengali text-white/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              আপনার মনে কি কোনো প্রশ্ন আছে? কোর্সের সময়সীমা, ফি এবং অন্যান্য বিষয় সম্পর্কে বিস্তারিত জেনে নিন।
            </p>
          </div>

          <div className="space-y-5">
            {courseData.faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? 'border border-prestige-gold/50 shadow-[0_0_30px_rgba(197,160,89,0.1)]' : 'border border-white/5 hover:border-white/20'}`}
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 md:px-8 py-5 md:py-7 flex justify-between items-center gap-4 md:gap-6"
                  >
                    <span className={`font-bengali font-bold text-lg sm:text-xl md:text-2xl transition-colors duration-300 ${isOpen ? 'text-prestige-gold' : 'text-white/90'}`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${isOpen ? 'border-prestige-gold bg-prestige-gold/10 text-prestige-gold rotate-180' : 'border-white/10 text-white/40'}`}>
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div 
                    className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="pt-5 md:pt-6 border-t border-white/5 font-bengali text-white/60 text-base md:text-lg lg:text-xl leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-16 text-center p-6 sm:p-10 bg-white/5 backdrop-blur-md border border-prestige-gold/20 rounded-2xl">
             <h3 className="font-bengali text-xl md:text-2xl text-white mb-4">আরও কিছু জানতে চান?</h3>
             <p className="font-bengali text-white/60 mb-8 text-base md:text-lg">আমাদের সাথে সরাসরি কথা বলতে নিচের নাম্বারে কল করুন অথবা হোয়াটসঅ্যাপ করুন।</p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <a href={`tel:${courseData.contact.phone.replace(/[^0-9+]/g, '')}`} className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto text-center text-base md:text-lg">কল করুন: {courseData.contact.phone}</a>
                <a href={`https://wa.me/${courseData.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto text-center text-base md:text-lg">হোয়াটসঅ্যাপ মেসেজ</a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
