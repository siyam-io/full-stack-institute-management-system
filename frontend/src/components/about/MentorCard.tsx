'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';

interface Mentor {
  id?: string;
  name: string;
  title: string;
  photo: string;
  bio: string;
  credentials: string[];
  cta: string;
}

import { CheckCircle2 } from 'lucide-react';

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  const ctaLink = `/expert-culinary-mentors/${mentor.id}`;

  return (
    <div className="glass-card p-8 md:p-10 rounded-[2rem] border border-white/10 flex flex-col h-full group hover:bg-white/15 transition-all duration-700 shadow-2xl relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-prestige-gold/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-power-red/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300"></div>

      <div className="relative w-40 h-40 mx-auto mb-10 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-1000">
        <Image 
          src={mentor.photo} 
          alt={mentor.name} 
          fill 
          loading="lazy"
          className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60"></div>
      </div>
      
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">{mentor.name}</h3>
        <div className="flex items-center justify-center gap-3">
          <div className="w-6 h-[1px] bg-power-red/50"></div>
          <p className="text-prestige-gold font-bold text-[10px] tracking-widest">{mentor.title}</p>
          <div className="w-6 h-[1px] bg-power-red/50"></div>
        </div>
      </div>

      <div className="relative px-4 mb-10">
        <div className="absolute -left-2 top-0 text-white/10 text-5xl font-serif">"</div>
        <p className="text-gray-400 leading-relaxed flex-grow text-center text-sm relative z-10">
          {mentor.bio}
        </p>
        <div className="absolute -right-2 bottom-0 text-white/10 text-5xl font-serif">"</div>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 mb-10 border border-white/5 group-hover:border-prestige-gold/20 transition-all duration-700">
        <h4 className="text-[10px] font-bold tracking-widest text-white/40 mb-6 text-center border-b border-white/5 pb-3">Operational Credentials</h4>
        <ul className="space-y-4">
          {mentor.credentials.map((cred, i) => (
            <li key={i} className="flex items-start gap-3 text-[13px] text-gray-300 font-bold leading-tight group/item">
              <CheckCircle2 className="w-4 h-4 text-prestige-gold shrink-0 group-hover/item:scale-125 transition-transform" />
              <span className="group-hover:text-white transition-colors">{cred}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link 
        href={ctaLink} 
        className="btn-primary w-full text-center py-4 rounded-xl font-bold tracking-widest text-[10px] md:text-xs shadow-[0_15px_40px_rgba(236,27,35,0.3)] hover:shadow-[0_15px_60px_rgba(236,27,35,0.5)] transition-all duration-500 hover:scale-[1.02]"
      >
        {mentor.cta}
      </Link>
    </div>
  );
};

export default MentorCard;
