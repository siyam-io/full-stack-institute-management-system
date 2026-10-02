"use client";

import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

export default function BlogTOC({ headings, locale }: { headings: { id: string, text: string }[], locale: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!headings || headings.length === 0) return null;

  const isBn = locale === 'bn';

  return (
    <div className="mb-12 glass-card rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 shadow-2xl">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
      >
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-prestige-gold" />
          <span className="font-bold text-white uppercase tracking-wider">{isBn ? 'সূচিপত্র' : 'Table of Contents'}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      
      {isOpen && (
        <div className="p-6 pt-0 border-t border-white/5">
          <ul className="space-y-3 mt-4">
            {headings.map((h, i) => (
              <li key={i}>
                <a 
                  href={`#${h.id}`} 
                  className="text-gray-400 hover:text-prestige-gold hover:underline transition-colors block text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
