'use client';

import React from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function CourseFeatures() {
  const { ref, isVisible } = useScrollReveal();

  const features = [
    {
      icon: (
        <svg className="w-12 h-12 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "১০০% প্র্যাকটিক্যাল ক্লাস",
      desc: "নিজে হাতে রান্না করে সরাসরি ইন্ডাস্ট্রিয়াল প্র্যাকটিস শেখার সুযোগ।"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      ),
      title: "Advanced Pastry & Bakery",
      desc: "শেফ কোর্সের সাথে সম্পূর্ণ প্রফেশনাল লেভেল মডিউল একদম ফ্রি।"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "International Certification",
      desc: "ISO ও গ্লোবাল স্ট্যান্ডার্ড সার্টিফিকেট যা বিশ্বজুড়ে গ্রহণযোগ্য।"
    }
  ];

  return (
    <section id="features" className="relative py-16 md:py-24 lg:py-28 bg-obsidian text-white overflow-hidden" ref={ref}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-prestige-gold font-bold tracking-widest text-sm uppercase mb-4 block font-english">Our Unique Value</span>
          <h2 className="font-bengali text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
            অদক্ষ থেকে <span className="text-transparent bg-clip-text bg-gradient-to-r from-prestige-gold via-yellow-200 to-prestige-gold">প্রফেশনাল শেফ</span>
          </h2>
          <p className="font-bengali text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            আমরা শুধু রান্না শিখাই না, আমরা আপনাকে তৈরি করি ইন্ডাস্ট্রির চাহিদা অনুযায়ী একজন দক্ষ প্রফেশনাল হিসেবে।
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl group p-7 md:p-10 flex flex-col items-center text-center hover:border-prestige-gold/30 hover:-translate-y-2 transition-all duration-500 shadow-2xl shadow-obsidian">
              <div className="mb-6 md:mb-8 p-4 md:p-5 bg-white/5 rounded-2xl md:rounded-3xl group-hover:bg-prestige-gold/10 group-hover:scale-110 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="font-bengali text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white group-hover:text-prestige-gold transition-colors">{feature.title}</h3>
              <p className="font-bengali text-white/50 text-base md:text-lg leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
