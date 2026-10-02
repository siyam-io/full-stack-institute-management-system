'use client';

import React, { useState } from 'react';
import { courseData } from './courseData';
import useScrollReveal from '@/hooks/useScrollReveal';
import { BATCH_CONFIG } from '@/lib/courseConfig';

interface BatchSelectorProps {
  cmsData?: any;
}

export default function BatchSelector({ cmsData }: BatchSelectorProps) {
  const { ref, isVisible } = useScrollReveal();
  const [activeBatch, setActiveBatch] = useState(0);
  const locale = 'bn';

  // Build slots list dynamically from CMS data if available, fallback to static BATCH_CONFIG
  const slots = React.useMemo(() => {
    if (cmsData?.batcheTime && Array.isArray(cmsData.batcheTime)) {
      return cmsData.batcheTime.map((b: any) => ({
        id: b.id,
        label: b.name || "",
        labelBn: b.name || "",
        status: b.status || "enrolling",
        badge: b.badge || "",
        badgeBn: b.badge || "",
        days: b.days || "",
        time: b.time || "",
        duration: b.duration || "",
        totalClasses: b.totalClasses || 36
      }));
    }
    
    // Fallback to static BATCH_CONFIG slots matched with courseData
    return BATCH_CONFIG.slots.map(slot => {
      const detail = courseData.batcheTime.find(b => 
        (slot.id === 'morning' && (b.name.includes('Morning') || b.name.includes('সকাল'))) ||
        (slot.id === 'afternoon' && (b.name.includes('Afternoon') || b.name.includes('বিকাল'))) ||
        (slot.id === 'weekend' && (b.name.includes('Weekend') || b.name.includes('উইকএন্ড') || b.name.includes('উইকেন্ড')))
      ) || courseData.batcheTime[0];

      return {
        id: slot.id,
        label: slot.label,
        labelBn: slot.labelBn,
        status: slot.status,
        badge: slot.badge,
        badgeBn: slot.badgeBn,
        days: detail.days,
        time: detail.time,
        duration: detail.duration,
        totalClasses: detail.totalClasses
      };
    });
  }, [cmsData]);

  // Safe checks
  const currentSlot = slots[activeBatch] || slots[0];
  if (!currentSlot) return null;

  const statusInfo = BATCH_CONFIG.statusOptions[currentSlot.status as keyof typeof BATCH_CONFIG.statusOptions] || BATCH_CONFIG.statusOptions.enrolling;

  return (
    <section id="batch-selector" className="py-16 md:py-24 bg-obsidian relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-prestige-gold/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-power-red/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10 md:mb-16">
            <span className="gold-gradient-text font-bold tracking-widest text-sm uppercase mb-4 block">
              Flexible Schedules
            </span>
            <h2 className="font-bengali text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight">
              ব্যাচের সময়সূচি
            </h2>
            <p className="font-bengali text-white/60 text-base md:text-lg">আপনার সুবিধামত ব্যাচ নির্বাচন করে আজই আপনার যাত্রা শুরু করুন।</p>
          </div>

          {/* Toggle buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 md:mb-12">
            {slots.map((slot, idx) => {
              const label = locale === 'bn' ? slot.labelBn : slot.label;
              const badge = locale === 'bn' ? slot.badgeBn : slot.badge;
              const isFull = slot.status === 'full';
              
              return (
                <button
                  key={slot.id}
                  onClick={() => setActiveBatch(idx)}
                  className={`relative px-6 py-4 md:px-8 md:py-5 rounded-2xl font-bengali font-bold transition-all duration-300 text-base md:text-lg flex items-center gap-3 border ${
                    activeBatch === idx 
                      ? 'bg-prestige-gold text-obsidian border-prestige-gold shadow-[0_0_25px_rgba(197,160,89,0.4)] scale-105' 
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {label}
                  {badge && (
                    <span className={`absolute -top-3 -right-3 text-[10px] font-english font-black uppercase tracking-tighter px-2.5 py-1 rounded-full shadow-lg ${
                      isFull ? 'bg-power-red text-white animate-pulse' : 'bg-white text-obsidian'
                    }`}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Batch Card */}
          <div className="glass-card p-1 md:p-1.5 border border-white/10 overflow-hidden bg-white/5 rounded-[2rem]">
            <div className="bg-obsidian/40 backdrop-blur-sm rounded-[2rem] p-6 sm:p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8 md:mb-12 border-b border-white/5 pb-8 md:pb-10">
                <div className="text-center md:text-left">
                  <h3 className="font-bengali text-2xl md:text-3xl font-bold text-white mb-2">
                    {locale === 'bn' ? currentSlot.labelBn : currentSlot.label}
                  </h3>
                  <div className={`flex items-center gap-2 font-medium ${statusInfo.color}`}>
                    <span className={`w-2 h-2 rounded-full ${statusInfo.color.replace('text-', 'bg-')} ${
                      currentSlot.status === 'enrolling' ? 'animate-ping' : ''
                    }`} />
                    {locale === 'bn' ? statusInfo.labelBn : statusInfo.label}
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Starting From</p>
                  <p className="font-english font-black text-2xl text-white">
                    {cmsData?.batchStartDate || courseData.batchStartDate}
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-prestige-gold/20 transition-colors">📅</div>
                    <div>
                      <p className="text-white/40 text-sm font-english tracking-wider uppercase mb-1">Weekly Days</p>
                      <p className="font-bengali font-bold text-white text-xl">{currentSlot.days}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-prestige-gold/20 transition-colors">🕒</div>
                    <div>
                      <p className="text-white/40 text-sm font-english tracking-wider uppercase mb-1">Session Time</p>
                      <p className="font-bengali font-bold text-white text-xl">{currentSlot.time}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-prestige-gold/20 transition-colors">⏳</div>
                    <div>
                      <p className="text-white/40 text-sm font-english tracking-wider uppercase mb-1">Total Duration</p>
                      <p className="font-bengali font-bold text-white text-xl">{currentSlot.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-prestige-gold/20 transition-colors">🎓</div>
                    <div>
                      <p className="text-white/40 text-sm font-english tracking-wider uppercase mb-1">Practical Classes</p>
                      <p className="font-english font-bold text-white text-2xl">{currentSlot.totalClasses} <span className="font-bengali text-lg text-white/60">টি</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 md:mt-16 text-center">
                {currentSlot.status === 'enrolling' ? (
                  <a
                    href={cmsData?.formUrl || courseData.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-16 py-4 md:py-6 text-base md:text-xl shadow-[0_20px_50px_rgba(236,27,35,0.3)] bg-power-red text-white rounded-full font-bold hover:bg-power-red-dark transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    {locale === 'bn' ? 'ভর্তির জন্য আবেদন করুন' : 'Enroll Now'}
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-16 py-4 md:py-6 text-base md:text-xl bg-gray-700 text-white/50 rounded-full font-bold cursor-not-allowed"
                  >
                    {locale === 'bn' ? 'আসন পূর্ণ' : 'Closed / Full'}
                  </button>
                )}
                <p className="text-white/40 font-bengali text-sm mt-6">
                  * সিট নিশ্চিত করতে দ্রুত আবেদন করুন। প্রতিটি ব্যাচে আসন সংখ্যা সীমিত।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
