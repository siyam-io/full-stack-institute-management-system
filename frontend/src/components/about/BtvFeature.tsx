'use client';

import React from 'react';

interface BtvFeatureProps {
  data: {
    heading: string;
    subheading: string;
    embedUrl: string;
  };
}

const BtvFeature = ({ data }: BtvFeatureProps) => {
  if (!data) return null;

  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 uppercase">
            {data.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {data.subheading}
          </p>
          <div className="w-20 h-1 bg-power-red mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(236,27,35,0.5)]"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(196,160,82,0.1)] border border-white/10 group">
            <iframe
              src={data.embedUrl}
              title="CIB BTV Feature"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="glass-card px-8 py-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-3 h-3 bg-power-red rounded-full animate-pulse"></div>
              <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase">National Broadcast Archive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BtvFeature;
