"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, BookOpen, GraduationCap, Search, ArrowRight } from 'lucide-react';
import './globals.css';

export default function RootNotFound() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/bn')) {
        setLocale('bn');
      }
    }
  }, []);

  const isBn = locale === 'bn';

  return (
    <html lang={locale}>
      <head>
        <title>{isBn ? 'পৃষ্ঠা পাওয়া যায়নি | CIB' : 'Page Not Found | CIB'}</title>
      </head>
      <body className="bg-[#000A1A] text-white min-h-screen flex flex-col items-center justify-center p-4 antialiased selection:bg-prestige-gold/30 selection:text-white overflow-hidden font-inter">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-prestige-gold/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="w-[600px] h-[600px] bg-power-red/5 rounded-full blur-[100px] mix-blend-screen absolute -bottom-48 -right-48"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center px-4 animate-fade-in">
          <h1 className="text-[8rem] md:text-[14rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/50 to-transparent mb-2 drop-shadow-2xl">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-black text-prestige-gold uppercase tracking-tighter mb-6">
            {isBn ? 'পৃষ্ঠা পাওয়া যায়নি' : 'Page Not Found'}
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto italic">
            {isBn 
              ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে, বা সাময়িকভাবে অনুপলব্ধ হতে পারে।' 
              : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
          </p>

          <div className="relative max-w-md mx-auto mb-16 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-prestige-gold transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder={isBn ? 'ওয়েবসাইটে খুঁজুন...' : 'Search the website...'} 
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-prestige-gold/50 focus:ring-1 focus:ring-prestige-gold/50 transition-all shadow-2xl backdrop-blur-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = `/${locale}/faq?q=${encodeURIComponent(e.currentTarget.value)}`;
                }
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Link href={`/${locale}`} className="group glass-card p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/10 hover:border-prestige-gold/30 transition-all duration-500 flex flex-col justify-between h-full shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-prestige-gold/10 transition-all duration-500 shadow-xl">
                <Home className="w-7 h-7 text-prestige-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-prestige-gold transition-colors uppercase tracking-tight">
                  {isBn ? 'হোমপেজ' : 'Homepage'}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  {isBn ? 'মূল পাতায় ফিরে যান' : 'Return to main page'}
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500 text-prestige-gold" />
                </p>
              </div>
            </Link>

            <Link href={`/${locale}/courses`} className="group glass-card p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/10 hover:border-prestige-gold/30 transition-all duration-500 flex flex-col justify-between h-full shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-prestige-gold/10 transition-all duration-500 shadow-xl">
                <BookOpen className="w-7 h-7 text-prestige-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-prestige-gold transition-colors uppercase tracking-tight">
                  {isBn ? 'কোর্সসমূহ' : 'Our Courses'}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  {isBn ? 'আমাদের প্রোগ্রামগুলো দেখুন' : 'Explore our programs'}
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500 text-prestige-gold" />
                </p>
              </div>
            </Link>

            <Link href={`/${locale}/admission`} className="group glass-card p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/10 hover:border-power-red/30 transition-all duration-500 flex flex-col justify-between h-full shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-power-red/20 transition-all duration-500 shadow-xl">
                <GraduationCap className="w-7 h-7 text-power-red" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-power-red transition-colors uppercase tracking-tight">
                  {isBn ? 'ভর্তি' : 'Admission'}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  {isBn ? 'আবেদন প্রক্রিয়া শুরু করুন' : 'Start your application'}
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500 text-power-red" />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
