'use client';

import React from 'react';
import { courseData } from './courseData';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function LocationMap() {
  const { ref, isVisible } = useScrollReveal();
  const whatsappLink = `https://wa.me/${courseData.contact.whatsapp.replace(/[^0-9]/g, '')}`;
  const phoneLink = `tel:${courseData.contact.phone.replace(/[^0-9+]/g, '')}`;
  const altPhoneLink = `tel:${courseData.contact.altPhone.replace(/[^0-9+]/g, '')}`;

  return (
    <section id="location" className="py-16 md:py-28 bg-obsidian relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-prestige-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12 md:mb-20">
            <span className="text-prestige-gold font-bold tracking-widest text-sm uppercase mb-4 block">Visit Our Campus</span>
            <h2 className="font-bengali text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
              আমাদের <span className="gold-gradient-text">অবস্থান</span>
            </h2>
            <p className="font-bengali text-white/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              সরাসরি ক্যাম্পাস ভিজিট করে আমাদের সুযোগ-সুবিধা এবং আধুনিক ল্যাব স্বচক্ষে দেখে যাওয়ার জন্য আপনাকে আমন্ত্রণ জানাচ্ছি।
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 max-w-6xl mx-auto border border-white/10 shadow-2xl rounded-2xl">
            <div className="rounded-2xl overflow-hidden mb-12 border border-white/5 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1825.9613669295404!2d90.37705186754462!3d23.75013457946004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b95e7a43bf21%3A0xd1c7ee1fe52d6a70!2sCIB%20-%20The%20Culinary%20Institute%20of%20Bangladesh!5e0!3m2!1sen!2sbd!4v1777318905119!5m2!1sen!2sbd" 
                className="w-full min-h-[400px] md:h-[500px] grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="CIB Location Map"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-2 border-prestige-gold/10 rounded-2xl" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
              {/* Address */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-prestige-gold/30 group-hover:bg-prestige-gold/10 transition-all duration-500">
                  <svg className="w-7 h-7 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-english font-black text-white/40 tracking-widest uppercase text-[10px] mb-2">Location</h3>
                  <p className="font-bengali text-white/80 text-lg leading-relaxed mb-3">
                    {courseData.contact.address}
                  </p>
                  <a href="https://maps.app.goo.gl/Dup1kWcfLdd5e8nv9" target="_blank" rel="noopener noreferrer" className="font-english text-sm font-bold text-prestige-gold hover:underline flex items-center gap-2">
                    Open in Maps 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-prestige-gold/30 group-hover:bg-prestige-gold/10 transition-all duration-500">
                  <svg className="w-7 h-7 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-english font-black text-white/40 tracking-widest uppercase text-[10px] mb-2">Connect</h3>
                  <div className="space-y-1 mb-3">
                    <p className="font-english text-white/90 text-lg font-bold">
                      <a href={phoneLink} className="hover:text-prestige-gold transition-colors">{courseData.contact.phone}</a>
                    </p>
                    <p className="font-english text-white/70 text-base">
                      <a href={altPhoneLink} className="hover:text-prestige-gold transition-colors">{courseData.contact.altPhone}</a>
                    </p>
                  </div>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="font-english text-sm font-bold text-emerald-400 hover:underline flex items-center gap-2">
                    WhatsApp Support
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-prestige-gold/30 group-hover:bg-prestige-gold/10 transition-all duration-500">
                  <svg className="w-7 h-7 text-prestige-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-english font-black text-white/40 tracking-widest uppercase text-[10px] mb-2">Business Hours</h3>
                  <div className="font-bengali text-white/80 text-lg space-y-1">
                    <p>শনি-বৃহস্পতি: <span className="text-white font-bold">১০:০০ - ১৮:০০</span></p>
                    <p>শুক্রবার: <span className="text-white font-bold">১৮:০০ - ২২:০০</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
