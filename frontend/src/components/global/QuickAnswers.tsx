'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface QuickAnswersProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

const QuickAnswers = ({ items, title = "Quick Answers (PAA)", subtitle = "Voice & Search Engine FAQs" }: QuickAnswersProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section 
      id="quick-answers" 
      className="relative max-w-4xl mx-auto px-4 my-12 relative z-10"
      aria-labelledby="quick-answers-heading"
    >
      <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 bg-obsidian/80 backdrop-blur-md shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
        {/* Title Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-power-red to-transparent"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-bold tracking-widest uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            AI & Voice Assistant Ready
          </div>
          <h2 
            id="quick-answers-heading" 
            className="text-2xl md:text-3xl font-black text-white tracking-tighter"
          >
            {title}
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1 font-medium tracking-wide">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="border border-white/5 rounded-xl bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-power-red/30"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left text-white hover:text-prestige-gold transition-colors focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm md:text-base pr-4 group-hover:translate-x-1 transition-transform duration-300">
                    {item.question}
                  </span>
                  <span className="text-gray-400 group-hover:text-prestige-gold transition-colors flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 border-t border-white/5' : 'max-h-0 opacity-0 pointer-events-none'
                  } overflow-hidden`}
                >
                  <div className="p-4 md:p-5 bg-white/[0.01]">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAnswers;
