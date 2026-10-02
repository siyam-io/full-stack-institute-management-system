'use client';

import React from 'react';
import Image from 'next/image';

interface StoryBlockProps {
  data: {
    heading: string;
    content: string;
    image: string;
    mission: string;
  };
}

const StoryBlock = ({ data }: StoryBlockProps) => {
  if (!data) return null;
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-obsidian">
      {/* CSS gradient replaces the heavy 1920px background image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-obsidian via-white/[0.02] to-obsidian" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8">
        <div className="space-y-24 md:space-y-32">
          {/* Row 1: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-power-red"></div>
                <h4 className="text-prestige-gold font-bold tracking-widest text-[10px] uppercase">Institutional Genesis</h4>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
                {data.heading}
              </h2>
              
              <div className="space-y-8 text-sm md:text-base text-gray-400 leading-relaxed">
                <p className="font-medium border-l-2 border-power-red/50 pl-6 py-3 text-gray-300 bg-white/5 rounded-r-2xl text-lg md:text-xl">
                  {data.content}
                </p>
                
                <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-prestige-gold/20 transition-all duration-1000">
                  <div className="absolute -top-10 -right-10 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg className="w-32 h-32 text-prestige-gold" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8v8H6v-8h4zm12 0v8h-4v-8h4z" />
                      <path d="M0 8v12h12v-12h-12zm4 4h4v4h-4v-4zm16-4v12h12v-12h-12zm4 4h4v4h-4v-4z" />
                    </svg>
                  </div>
                  <h4 className="text-prestige-gold font-bold tracking-widest text-[10px] mb-4 uppercase">Sovereign Commitment</h4>
                  <p className="text-white text-xl md:text-2xl font-black leading-tight tracking-tighter">
                    "At CIB, we don't just teach recipes; we architect careers that dominate the global culinary landscape."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-6 h-[1px] bg-power-red"></div>
                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Established MMXX</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in order-1 lg:order-2 group">
              <div className="absolute -inset-10 bg-power-red/10 rounded-[2rem] blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] transform hover:rotate-1 transition-transform duration-1000 bg-white/5">
                <Image 
                  src={data.image} 
                  alt="Institutional Excellence" 
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Row 2: Image Left, Mission Right (If image2 exists) */}
          {(data as any).image2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative animate-fade-in group">
                <div className="absolute -inset-10 bg-prestige-gold/10 rounded-[2rem] blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] md:aspect-video transform hover:-rotate-1 transition-transform duration-1000 bg-white/5">
                  <Image 
                    src={(data as any).image2} 
                    alt="CIB Student Practice" 
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent"></div>
                </div>
              </div>

              <div className="animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-[1px] bg-prestige-gold"></div>
                  <h4 className="text-prestige-gold font-bold tracking-widest text-[10px] uppercase">Our Mission</h4>
                </div>
                <p className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter mb-8">
                  Engineering the next generation of global culinary leaders.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Every workstation at CIB is a launchpad. Our mission is to ensure every graduate carries the weight of professional excellence, technical speed, and unwavering discipline into the world's most demanding kitchens.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoryBlock;
