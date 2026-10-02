import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface InlineFAQProps {
  questions: FAQItem[];
}

export default function InlineFAQ({ questions }: InlineFAQProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 my-16 relative z-10 px-4 md:px-8">
      {questions.map((q, i) => (
        <details
          key={i}
          className="group glass-card bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 open:bg-white/[0.05] open:border-prestige-gold/30"
        >
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none outline-none focus-visible:ring-2 focus-visible:ring-prestige-gold [&::-webkit-details-marker]:hidden">
            <h4 className="text-lg md:text-xl font-bold text-white pr-4 group-open:text-prestige-gold transition-colors">
              {q.question}
            </h4>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-open:bg-power-red/10 border border-transparent group-open:border-power-red/20 transition-all duration-300">
              <ChevronDown className="w-5 h-5 text-gray-400 group-open:text-power-red transform group-open:rotate-180 transition-transform duration-300" />
            </div>
          </summary>
          <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed text-sm md:text-base animate-fade-in border-t border-white/5 mt-2 pt-4">
            {q.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
