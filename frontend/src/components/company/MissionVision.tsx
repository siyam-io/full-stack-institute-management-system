import React from 'react';

interface Section {
  heading: string;
  text: string;
}

interface MissionVisionProps {
  mission: Section;
  vision: Section;
}

import Image from 'next/image';

const MissionVision = ({ mission, vision }: MissionVisionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="relative p-12 glass-card rounded-[3rem] overflow-hidden group hover:bg-white/10 transition-all duration-700 shadow-2xl border border-white/5">
            <div className="absolute -top-10 -right-10 text-white/5 text-[15rem] font-black select-none group-hover:text-power-red/10 transition-all duration-700 pointer-events-none">
              M
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 relative z-10 flex items-center gap-6">
              <span className="w-12 h-1.5 bg-power-red rounded-full"></span>
              {mission.heading}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed relative z-10 italic">
              "{mission.text}"
            </p>
          </div>

          <div className="relative p-12 glass-card rounded-[3rem] overflow-hidden group hover:bg-white/10 transition-all duration-700 shadow-2xl border border-white/5">
            <div className="absolute -top-10 -right-10 text-white/5 text-[15rem] font-black select-none group-hover:text-prestige-gold/10 transition-all duration-700 pointer-events-none">
              V
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 relative z-10 flex items-center gap-6">
              <span className="w-12 h-1.5 bg-prestige-gold rounded-full"></span>
              {vision.heading}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed relative z-10 italic">
              "{vision.text}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
