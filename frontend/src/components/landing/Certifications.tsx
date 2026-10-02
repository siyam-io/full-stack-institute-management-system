'use client';

import React from 'react';
import Image from 'next/image';
import { courseData } from './courseData';

const Certifications = () => {
  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-bengali">
            আপনার অর্জিত <span className="text-prestige-gold">সার্টিফিকেটসমূহ</span>
          </h2>
          <p className="text-gray-400 font-bengali max-w-2xl mx-auto">
            দেশ ও বিদেশে সমানভাবে গ্রহণযোগ্য ৩টি অত্যন্ত শক্তিশালী সার্টিফিকেট যা আপনার ক্যারিয়ারকে এক ধাপ এগিয়ে রাখবে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courseData.certifications.map((cert, i) => (
            <div key={i} className="group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/[0.15] transition-all duration-500 hover:-translate-y-2">
              <div className="relative w-32 h-32 mb-8 bg-white rounded-full p-4 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <Image
                  src={cert.badge}
                  alt={cert.title}
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <div className="absolute inset-0 rounded-full border-4 border-prestige-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 font-bengali leading-tight">
                {cert.title}
              </h3>
              <p className="text-xs text-prestige-gold font-bold mb-4 font-english uppercase tracking-widest">
                {cert.authority}
              </p>
              <p className="text-sm text-gray-400 font-bengali leading-relaxed">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://verification.cibdhk.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white hover:text-prestige-gold transition-colors font-bold font-bengali group"
          >
            সার্টিফিকেট ভেরিফিকেশন চেক করুন
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
