import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthorBoxProps {
  name: string;
  title: string;
  photo?: string;
  profileUrl?: string;
  lastReviewed: string;
  locale: string;
}

export default function AuthorBox({ name, title, photo = '/images/logo_cib.png', profileUrl = '', lastReviewed, locale }: AuthorBoxProps) {
  const isBn = locale === 'bn';
  const resolvedUrl = profileUrl && profileUrl.startsWith('/') ? `/${locale}${profileUrl}` : profileUrl;

  return (
    <div className="glass-card max-w-xl mx-auto my-8 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-prestige-gold/5 rounded-full blur-xl pointer-events-none"></div>
      
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-prestige-gold/30 shrink-0 shadow-lg bg-slate-800">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-grow text-center sm:text-left relative z-10">
        <span className="text-[9px] bg-prestige-gold/15 border border-prestige-gold/25 px-2.5 py-1 rounded-full text-prestige-gold font-extrabold tracking-widest uppercase inline-block mb-1.5">
          {isBn ? 'রিভিউড বাই' : 'Reviewed By'}
        </span>
        <h4 className="text-lg font-black text-white uppercase tracking-tight">
          {resolvedUrl ? (
            <Link href={resolvedUrl} className="hover:text-prestige-gold transition-colors">
              {name}
            </Link>
          ) : (
            <span className="text-white">
              {name}
            </span>
          )}
        </h4>
        <p className="text-xs text-white/50 font-medium mb-2">{title}</p>
        <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider">
          {isBn ? 'সর্বশেষ আপডেট:' : 'Last Updated:'} <span className="text-white/60">{lastReviewed}</span>
        </div>
      </div>
    </div>
  );
}
