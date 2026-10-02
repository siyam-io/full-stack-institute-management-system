'use client';

import React from 'react';

interface CardItem {
  icon: string;
  title: string;
  desc: string;
}

interface PersonaCardsProps {
  data: {
    heading: string;
    cards: CardItem[];
  };
}

import { Plane, RefreshCw, Store } from 'lucide-react';

const IconWrapper = ({ name }: { name: string }) => {
  const iconProps = { className: "w-12 h-12 text-prestige-gold", strokeWidth: 1.5 };
  switch (name) {
    case 'Plane': return <Plane {...iconProps} />;
    case 'RefreshCw': return <RefreshCw {...iconProps} />;
    case 'Store': return <Store {...iconProps} />;
    default: return null;
  }
};

const PersonaCards = ({ data }: PersonaCardsProps) => {
  if (!data) return null;
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-obsidian">
      {/* CSS gradient replaces the heavy 1920px background image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-obsidian via-white/[0.02] to-obsidian" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-8">
            Pathways to Dominance
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            {data.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {data.cards.map((card, i) => (
            <div 
              key={i} 
              className="glass-card p-8 md:p-10 rounded-[2rem] border border-white/5 flex flex-col hover:bg-white/10 transition-all duration-700 group shadow-2xl relative overflow-hidden"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Card Accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-prestige-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
              
              {/* Index Number */}
              <div className="absolute top-8 right-8 text-white/5 text-6xl font-bold select-none group-hover:text-white/10 transition-colors">
                0{i + 1}
              </div>

              <div className="mb-12 group-hover:scale-125 group-hover:rotate-[15deg] transition-all duration-700 w-fit relative">
                <div className="absolute inset-0 bg-prestige-gold/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <IconWrapper name={card.icon} />
                </div>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold mb-6 text-white group-hover:text-prestige-gold transition-colors duration-500 tracking-tight">
                {card.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                {card.desc}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-[1px] bg-white/10 group-hover:bg-prestige-gold transition-colors"></div>
                <span className="text-[10px] font-bold tracking-widest text-white/20 group-hover:text-white/40">Strategic Route</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonaCards;
