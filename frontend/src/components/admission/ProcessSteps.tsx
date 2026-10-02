'use client';

import React from 'react';

interface Step {
  number: string;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  data: {
    heading: string;
    steps: Step[];
  };
}

import { FileText, PhoneCall, Flame } from 'lucide-react';
import Image from 'next/image';

const StepIcon = ({ index }: { index: number }) => {
  switch (index) {
    case 0: return <FileText className="w-8 h-8 text-prestige-gold" strokeWidth={1.5} />;
    case 1: return <PhoneCall className="w-8 h-8 text-prestige-gold" strokeWidth={1.5} />;
    case 2: return <Flame className="w-8 h-8 text-prestige-gold" strokeWidth={1.5} />;
    default: return null;
  }
};

const ProcessSteps = ({ data }: ProcessStepsProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_2-1280w.webp"
          alt="Process Background"
          fill
          className="object-cover opacity-[0.03] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-8 uppercase">
            Institutional Intake
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
            {data.heading}
          </h2>
          <div className="w-24 h-1 bg-power-red mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(236,27,35,0.5)]"></div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[4rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24">
            {data.steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group animate-fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="w-24 h-24 rounded-3xl glass-card border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center mb-10 group-hover:border-prestige-gold/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000 z-10 relative overflow-hidden">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] pointer-events-none"></div>
                  
                  <StepIcon index={i} />
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-white mb-6 group-hover:text-prestige-gold transition-colors duration-700 tracking-tighter">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-sm opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                  {step.desc}
                </p>

                {/* Decorative index indicator */}
                <div className="mt-8 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-600 tracking-widest group-hover:text-power-red transition-colors">
                  A-0{i+1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
