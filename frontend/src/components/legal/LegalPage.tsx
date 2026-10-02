'use client';

import React from 'react';

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  content: string;
}

import Image from 'next/image';

const LegalPage = ({ title, lastUpdated, content }: LegalPageProps) => {
  return (
    <main className="min-h-screen bg-obsidian relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_2-1920w.webp"
          alt="Legal Background"
          fill
          className="object-cover opacity-5 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 pt-40 pb-32 animate-fade-in">
        <header className="mb-24 text-center relative">
          {/* Institutional Seal Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20 opacity-5 pointer-events-none">
            <svg className="w-64 h-64 text-prestige-gold rotate-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.11v4.71c0 4.41-2.99 8.52-7 9.82-4.01-1.3-7-5.41-7-9.82V6.29l7-3.11zM11 7v2h2V7h-2zm0 4v6h2v-6h-2z" />
            </svg>
          </div>

          <div className="inline-block px-6 py-2 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-black tracking-widest mb-10 relative z-10 uppercase">
            Institutional Registry
          </div>
          <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-10 uppercase">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/50 font-black tracking-[0.2em] text-[10px] uppercase">
            <span>Verified Status</span>
            <div className="w-1.5 h-1.5 bg-power-red rounded-full"></div>
            <span>Updated: {lastUpdated}</span>
          </div>
          <div className="w-32 h-2 bg-power-red mx-auto mt-16 rounded-full shadow-[0_0_40px_rgba(236,27,35,0.6)]"></div>
        </header>

        <div className="glass-card p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] pointer-events-none"></div>

          <article 
            className="prose prose-invert prose-base md:prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
              prose-p:text-white/70 prose-p:leading-relaxed
              prose-li:text-white/70 prose-strong:text-prestige-gold prose-strong:font-black
              prose-a:text-prestige-gold prose-a:no-underline hover:prose-a:text-white transition-colors
              prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <footer className="mt-32 pt-16 border-t border-white/5 text-center">
          <p className="text-gray-600 text-[10px] font-bold tracking-widest">
            © 2026 THE CULINARY INSTITUTE OF BANGLADESH | ALL PROTOCOLS RESERVED
          </p>
        </footer>
      </div>
    </main>
  );
};

export default LegalPage;
