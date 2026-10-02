import React from 'react';

interface ComplianceSectionProps {
  heading: string;
  items: string[];
}

import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const ComplianceSection = ({ heading, items }: ComplianceSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/student-practice-5-1920w.webp"
          alt="Compliance Standards"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Institutional Integrity
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            {heading}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, i) => {
            const [title, desc] = item.split(': ');
            return (
              <div 
                key={i} 
                className="glass-card p-10 rounded-[2.5rem] border border-white/5 flex flex-col hover:bg-white/10 transition-all duration-700 group shadow-2xl relative overflow-hidden"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Card Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-prestige-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                    <CheckCircle2 className="w-7 h-7 text-prestige-gold" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-prestige-gold transition-colors duration-500">{title}</h3>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                  "{desc}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
