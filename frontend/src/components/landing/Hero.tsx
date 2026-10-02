'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { courseData } from './courseData';
import CountdownTimer from './CountdownTimer';
import { BATCH_CONFIG } from '@/lib/courseConfig';

const sliderImages = [
  '/images/practical_class_1-1920w.webp',
  '/images/student_practice_session_6-1920w.webp',
  '/images/practical_class_2-1920w.webp',
  '/images/theoritical_class-1920w.webp',
];

const Hero = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);
  const [visible, setVisible] = useState(false);
  const locale = 'bn';

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const whatsappLink = `https://wa.me/${courseData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('হ্যালো, প্রফেশনাল শেফ কোর্সে ভর্তি হতে চাই।')}`;

  // Dynamically build enrolling batches string from BATCH_CONFIG
  const enrollingSlots = BATCH_CONFIG.slots.filter(s => s.status === 'enrolling');
  
  let batchText = '';
  if (locale === 'bn') {
    const slotNamesBn = enrollingSlots.map(s => s.labelBn.replace('ের ব্যাচ', '').replace(' ব্যাচ', ''));
    batchText = slotNamesBn.length > 0
      ? 'ভর্তি চলছে — ' + slotNamesBn.slice(0, -1).join(', ') + (slotNamesBn.length > 1 ? ' ও ' : '') + slotNamesBn[slotNamesBn.length - 1] + ' ব্যাচ'
      : 'ভর্তি চলছে';
  } else {
    const slotNamesEn = enrollingSlots.map(s => s.label.replace(' Batch', ''));
    batchText = slotNamesEn.length > 0
      ? 'Admissions Open — ' + slotNamesEn.slice(0, -1).join(', ') + (slotNamesEn.length > 1 ? ' & ' : '') + slotNamesEn[slotNamesEn.length - 1] + ' Batches'
      : 'Admissions Open';
  }

  return (
    <section id="hero" className="relative min-h-screen min-h-[100svh] flex flex-col justify-center overflow-hidden bg-obsidian">
      {/* ── Background Layer with Embla Carousel ── */}
      <div className="absolute inset-0 z-0">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {sliderImages.map((src, index) => (
              <div className="relative flex-[0_0_100%] h-full" key={index}>
                <Image
                  src={src}
                  alt={`CIB Professional Chef Training Class ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/90 via-obsidian/80 to-obsidian" />
      </div>

      {/* ── Top Announcement ── */}
      <div className="absolute top-0 left-0 w-full z-20 bg-power-red/90 backdrop-blur-md">
        <div className="px-4 py-2 flex items-center justify-center gap-2 md:gap-3 text-white text-xs md:text-sm font-bold animate-fade-in flex-wrap text-center">
          <span className="flex h-2 w-2 rounded-full bg-white animate-ping flex-shrink-0" />
          {batchText}
          <span className="hidden md:inline">|</span>
          <span className="text-prestige-gold uppercase tracking-wider">
            {locale === 'bn' ? 'সীমিত আসন!' : 'Limited Seats!'}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-16 md:pb-12">
        <div className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-6 md:mb-10 flex justify-center">
              <Image
                src="/images/logo_cib.png"
                alt="CIB Logo"
                width={112}
                height={112}
                className="h-16 md:h-24 lg:h-28 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-4 md:mb-6 drop-shadow-lg font-bengali">
              <span className="block text-white mb-1 md:mb-2">বিদেশে ক্যারিয়ার গড়তে শিখুন</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-prestige-gold via-yellow-200 to-prestige-gold uppercase tracking-tight font-english">
                প্রফেশনাল শেফ কোর্স
              </span>
            </h1>

            {/* Specs */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-8 mb-6 md:mb-8 text-white/80 font-medium text-sm md:text-base font-bengali">
              <span className="flex items-center gap-2"><span className="text-prestige-gold">★</span> ১৬+ দেশের কুইজিন</span>
              <span className="flex items-center gap-2"><span className="text-prestige-gold">★</span> ১২০+ রেসিপি</span>
              <span className="flex items-center gap-2"><span className="text-prestige-gold">★</span> ১০০% প্র্যাকটিক্যাল</span>
            </div>

            {/* Countdown */}
            <div className="mb-8 md:mb-12">
              <CountdownTimer />
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
              <a
                href="#apply-form"
                className="bg-power-red hover:bg-red-700 text-white w-full sm:w-auto text-base md:text-xl px-8 md:px-12 py-4 md:py-5 font-bold font-bengali rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-power-red/40"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" /></svg>
                এখনই ভর্তি হোন
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 w-full sm:w-auto text-sm md:text-base px-8 md:px-12 py-4 md:py-5 font-bold font-bengali rounded-xl transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.8a9.718 9.718 0 01-4.952-1.358l-.355-.211-3.68.965.982-3.588-.232-.369A9.72 9.72 0 012.3 12.05C2.3 6.67 6.67 2.3 12.05 2.3c2.612 0 5.065 1.018 6.911 2.864A9.704 9.704 0 0121.8 12.05c0 5.38-4.37 9.75-9.75 9.75zM12.05 0C5.405 0 0 5.405 0 12.05c0 2.124.554 4.197 1.607 6.026L0 24l6.089-1.597A12.02 12.02 0 0012.05 24.1C18.695 24.1 24.1 18.695 24.1 12.05 24.1 5.405 18.695 0 12.05 0z" /></svg>
                সরাসরি মেসেজ দিন
              </a>
            </div>

            <div className="mt-6 flex justify-center">
              <a 
                href={courseData.directAdmissionUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-prestige-gold text-xs font-bengali transition-colors underline underline-offset-4"
              >
                সরাসরি ভর্তি
              </a>
            </div>

            {/* Quick Pricing Summary */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl w-[92%] sm:w-80 mx-auto p-5 md:p-6 border border-white/20 animate-fade-up">
              <p className="text-white/60 text-sm mb-1 font-bengali">মোট কোর্স ফী</p>
              <div className="text-2xl md:text-3xl font-black text-white mb-2 font-bengali">{courseData.totalFee} টাকা</div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80 font-bengali">
                <span className="bg-white/10 px-2 py-1 rounded">ভর্তি {courseData.admissionFee}</span>
                <span className="bg-white/10 px-2 py-1 rounded">বাকী ২ কিস্তিতে</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
