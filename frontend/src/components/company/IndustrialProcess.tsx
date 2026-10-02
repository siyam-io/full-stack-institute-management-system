import React from 'react';

interface IndustrialProcessProps {
  heading: string;
  steps: string[];
}

import Image from 'next/image';

const IndustrialProcess = ({ heading, steps }: IndustrialProcessProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/student-practice-5-1920w.webp"
          alt="Industrial Methodology"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-24 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Methodology & Standards
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            {heading}
          </h2>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 left-4 md:left-1/2 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2"></div>
          
          <div className="space-y-24">
            {steps.map((step, i) => {
              const [title, desc] = step.split(': ');
              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} animate-fade-in`} style={{ animationDelay: `${i * 200}ms` }}>
                  {/* Step Dot */}
                  <div className="absolute left-4 md:left-1/2 w-12 h-12 bg-obsidian rounded-2xl -translate-x-1/2 z-20 border-2 border-power-red/50 flex items-center justify-center shadow-[0_0_30px_rgba(236,27,35,0.3)]">
                    <div className="w-2 h-2 bg-power-red rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <div className={`glass-card p-10 md:p-14 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all duration-700 shadow-2xl relative group ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                      {/* Step Number */}
                      <div className={`absolute top-1/2 -translate-y-1/2 ${i % 2 === 0 ? '-right-6' : '-left-6'} hidden lg:block text-[8rem] font-black text-white/5 select-none pointer-events-none group-hover:text-prestige-gold/5 transition-all duration-700`}>
                        0{i + 1}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight group-hover:text-prestige-gold transition-colors duration-500">{title}</h3>
                      <p className="text-gray-400 text-lg leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                        "{desc}"
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialProcess;
