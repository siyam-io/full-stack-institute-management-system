'use client';

import React from 'react';
import Image from 'next/image';
import { courseData } from './courseData';

const WhyCourseSection = () => {
  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-bengali">
            কেন সিআইবি-তে <span className="text-prestige-gold">ভর্তি হবেন?</span>
          </h2>
          <p className="text-gray-400 font-bengali max-w-2xl mx-auto">
            দেশের সেরা ল্যাব এবং ইন্ডাস্ট্রি এক্সপার্টদের সাথে আপনার শেফ হওয়ার যাত্রা শুরু হোক এখানেই।
          </p>
        </div>

        <div className="space-y-12">
          {courseData.whyCourseContent.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col lg:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-power-red/10 text-power-red text-xl font-bold border border-power-red/20">
                  {idx + 1}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white font-bengali leading-tight">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-400 font-bengali leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-4 flex items-center gap-4 text-prestige-gold font-bold font-bengali">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  গ্লোবাল স্ট্যান্ডার্ড ট্রেনিং
                </div>
              </div>

              {/* Image Side */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group border border-white/10">
                  <Image
                    src={item.image || "/images/practical_class_1-1280w.webp"}
                    alt={item.title}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-prestige-gold/10 blur-3xl -z-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCourseSection;
