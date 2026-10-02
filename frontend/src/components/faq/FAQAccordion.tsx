'use client';

import React from 'react';

interface FAQ {
  question: string;
  fullAnswer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

import { Plus, Minus } from 'lucide-react';

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  return (
    <div className="space-y-8">
      {faqs.map((faq, index) => (
        <details 
          key={index} 
          className="group glass-card rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-700 shadow-2xl open:bg-white/10 open:border-prestige-gold/20"
        >
          <summary className="flex items-center justify-between list-none cursor-pointer p-10 focus:outline-none select-none">
            <span className="text-xl md:text-2xl font-black text-white group-hover:text-prestige-gold transition-colors duration-500 pr-10 leading-tight uppercase tracking-tight">
              {faq.question}
            </span>
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-open:bg-power-red group-open:border-power-red group-open:rotate-90 transition-all duration-700 shadow-xl">
              <Plus className="w-6 h-6 text-prestige-gold group-open:hidden" strokeWidth={3} />
              <Minus className="w-6 h-6 text-white hidden group-open:block" strokeWidth={3} />
            </div>
          </summary>
          <div className="px-10 pb-10 animate-fade-in">
            <div className="w-full h-px bg-gradient-to-r from-prestige-gold/20 via-white/5 to-transparent mb-10"></div>
            <div className="text-gray-300 leading-relaxed max-w-4xl text-[17px] italic bg-white/5 p-8 rounded-3xl border border-white/5 relative overflow-hidden group/answer">
              <span className="relative z-10">"{faq.fullAnswer}"</span>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/answer:opacity-10 transition-opacity">
                <svg className="w-20 h-20 text-prestige-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H14.017C13.4647 8 13.017 8.44772 13.017 9V15C13.017 16.1046 12.1216 17 11.017 17H8.01701C7.46472 17 7.01701 17.4477 7.01701 18V21L14.017 21Z" />
                </svg>
              </div>
            </div>
          </div>
        </details>
      ))}

      <style jsx>{`
        summary::-webkit-details-marker {
          display: none;
        }
        details[open] {
          animation: slideDown 0.7s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FAQAccordion;
