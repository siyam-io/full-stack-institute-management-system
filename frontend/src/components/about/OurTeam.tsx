'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  credentials: string[];
}

interface OurTeamProps {
  data: {
    heading: string;
    subheading: string;
    members: TeamMember[];
  };
}

const OurTeam = ({ data }: OurTeamProps) => {
  if (!data) return null;

  return (
    <section className="py-24 md:py-32 bg-obsidian/50 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 uppercase">
            {data.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {data.subheading}
          </p>
          <div className="w-20 h-1 bg-prestige-gold mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(196,160,82,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.members.map((member, i) => (
            <div 
              key={i} 
              className="glass-card p-8 rounded-[2.5rem] border border-white/5 hover:border-prestige-gold/30 transition-all duration-700 flex flex-col items-center group relative overflow-hidden"
            >
              {/* Card Decor */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-prestige-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Photo */}
              <div className="relative w-32 h-32 mb-6 p-1 rounded-full border-2 border-prestige-gold/30 group-hover:border-prestige-gold transition-colors duration-700">
                <div className="w-full h-full rounded-full overflow-hidden relative shadow-2xl flex items-center justify-center">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-obsidian border border-prestige-gold/20 flex items-center justify-center shadow-inner">
                      <span className="text-prestige-gold font-black text-4xl uppercase select-none">
                        {member.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                {/* Status Dot */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-obsidian rounded-full"></div>
              </div>

              {/* Name & Role */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-prestige-gold transition-colors line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-[10px] text-prestige-gold font-bold uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full inline-block">
                  {member.role}
                </p>
              </div>

              {/* Credentials */}
              {member.credentials && member.credentials.length > 0 && (
                <div className="w-full space-y-2 mt-auto">
                  <div className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-3 text-center border-b border-white/5 pb-2">
                    Verified Expertise
                  </div>
                  {member.credentials.map((cred, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-400 font-medium group/item">
                      <CheckCircle2 className="w-3 h-3 text-prestige-gold shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                      <span className="group-hover:text-white transition-colors leading-tight line-clamp-2">{cred}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
