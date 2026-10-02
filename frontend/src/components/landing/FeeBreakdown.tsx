import React from 'react';
import { courseData } from './courseData';

const FeeBreakdown = () => {
  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-power-red/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-bengali">
              কোর্স ফী এবং <span className="text-prestige-gold">সুবিধাসমূহ</span>
            </h2>
            <p className="text-gray-400 font-bengali max-w-2xl mx-auto">
              স্বল্প খরচে আন্তর্জাতিক মানের শেফ হওয়ার স্বপ্ন পূরণ করুন। আমাদের পেমেন্ট সিস্টেম অত্যন্ত সহজ এবং ছাত্র-ছাত্রীদের জন্য সুবিধাজনক।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column: Fee Structure */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-prestige-gold mb-8 uppercase tracking-widest font-bengali">ফি স্ট্রাকচার</h3>
                
                <div className="space-y-8">
                  <div className="flex items-end justify-between border-b border-white/5 pb-4">
                    <span className="text-gray-400 font-bengali">মোট কোর্স ফি</span>
                    <span className="text-3xl md:text-4xl font-bold text-white font-english">{courseData.totalFee} <span className="text-sm font-normal text-gray-500 font-bengali">টাকা</span></span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="text-gray-400 font-bengali">ভর্তি ফি</span>
                    <span className="text-xl font-bold text-white font-english">{courseData.admissionFee} <span className="text-sm font-normal text-gray-500 font-bengali">টাকা</span></span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-gray-400 font-bengali">বাকী টাকা (কিস্তিতে)</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white font-english">২৪,০০০ <span className="text-sm font-normal text-gray-500 font-bengali">টাকা</span></div>
                      <div className="text-xs text-power-red mt-1 font-bengali">১২,০০০ + ১২,০০০ (২ কিস্তিতে)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300 font-bengali">কোর্স ফী-র বাইরে আর কোনো লুকায়িত খরচ (Hidden Charge) নেই।</p>
                </div>
              </div>
            </div>

            {/* Right Column: Free Gifts */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold text-prestige-gold mb-8 uppercase tracking-widest font-bengali">কোর্সের সাথে যা যা পাচ্ছেন একদম ফ্রি!</h3>
              
              <ul className="space-y-6">
                {courseData.gifts.map((gift, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-prestige-gold group-hover:bg-prestige-gold group-hover:text-obsidian transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-bengali">{gift.name}</h4>
                      <p className="text-xs text-gray-400 font-bengali mt-1">{gift.desc}</p>
                    </div>
                  </li>
                ))}
                
                <li className="flex items-start gap-4 p-4 rounded-2xl bg-power-red/5 border border-power-red/10 mt-8">
                  <div className="text-power-red mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-bengali text-sm md:text-base leading-snug">স্পেশাল গিফট: {courseData.freeCourses}</h4>
                    <p className="text-xs text-gray-400 mt-1 font-bengali">আমাদের ছাত্রদের জন্য এই কোর্সটি সম্পূর্ণ ফ্রি!</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeeBreakdown;
