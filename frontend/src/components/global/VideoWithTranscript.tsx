'use client';

import React, { useState } from 'react';
import { Tv, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface VideoWithTranscriptProps {
  videoId: string;
  title: string;
  transcript: string;
  summary: string;
  locale: string;
  platform?: string;
}

export default function VideoWithTranscript({
  videoId,
  title,
  transcript,
  summary,
  locale,
  platform = 'BTV'
}: VideoWithTranscriptProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isBn = locale === 'bn';

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      {/* Video Container */}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-slate-950">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </div>

      {/* Control bar */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="bg-power-red text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-[0_5px_15px_rgba(236,27,35,0.25)] shrink-0">
            <Tv className="w-3.5 h-3.5" />
            {platform}
          </span>
          <span className="text-white/80 font-bold text-sm line-clamp-1">{title}</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-prestige-gold/50 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          <FileText className="w-4 h-4 text-prestige-gold" />
          <span>{isBn ? 'ভিডিও ট্রান্সক্রিপ্ট' : 'Video Transcript'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Transcript Panel */}
      <div
        className={`transition-all duration-700 overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h4 className="text-prestige-gold font-bold text-xs uppercase tracking-widest mb-4">
            {isBn ? 'সংক্ষিপ্ত সারসংক্ষেপ' : 'Executive Summary'}
          </h4>
          <p className="text-white/80 text-sm leading-relaxed mb-6 italic border-l-2 border-prestige-gold/30 pl-4">
            {summary}
          </p>

          <div className="h-px bg-white/10 my-6"></div>

          <h4 className="text-prestige-gold font-bold text-xs uppercase tracking-widest mb-4">
            {isBn ? 'পূর্ণাঙ্গ বিবরণ' : 'Full Transcript'}
          </h4>
          <div className="text-white/60 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
            {transcript}
          </div>
        </div>
      </div>
    </div>
  );
}
