'use client';

import React from 'react';
import { courseData } from './courseData';

const CurriculumOverview = () => {
  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-power-red/5 blur-[150px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-bengali">
            কি কি শিখবেন এই <span className="text-prestige-gold">কোর্সে?</span>
          </h2>
          <p className="text-gray-400 font-bengali max-w-2xl mx-auto">
            আন্তর্জাতিক মানের কারিকুলাম যা আপনাকে ১৬টিরও বেশি দেশের রান্নায় দক্ষ করে তুলবে।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cuisines Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-power-red/10 flex items-center justify-center text-power-red border border-power-red/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1a2.5 2.5 0 012.5 2.5v.5M14 20h2.121l1.591-1.591a2 2 0 011.414-.586H20M3 10.155V10a7 7 0 0110-6.326M17.845 10.155A7 7 0 0113 21h-1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white font-bengali">১৬+ আন্তর্জাতিক কুইজিন</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {courseData.curriculumDetails.cuisines.map((cuisine, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-gray-300 font-english">
                  {cuisine}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t border-white/5">
              <p className="text-prestige-gold font-bold text-lg font-bengali">১০০+ অথেন্টিক রেসিপি কভার করা হবে</p>
            </div>
          </div>

          {/* Key Modules Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl h-full flex flex-col lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-power-red/10 flex items-center justify-center text-power-red border border-power-red/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white font-bengali">স্পেশাল মডিউলসমূহ</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {courseData.curriculumDetails.modules.map((module, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-power-red group-hover:scale-150 transition-transform" />
                  <span className="text-gray-300 font-bengali text-lg">{module}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-power-red/10 border border-power-red/20 rounded-2xl flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-white font-bold font-bengali text-xl mb-1">বোনাস মডিউল:</h4>
                <p className="text-power-red font-bold font-bengali">{courseData.curriculumDetails.bonus}</p>
              </div>
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-obsidian bg-gray-800 flex items-center justify-center text-xl shadow-lg">
                    🥐
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumOverview;
