'use client';

import React, { useState, useEffect, useRef } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface CardItem {
  icon: string;
  title: string;
  description: string;
}

interface ValuePropositionProps {
  data: {
    heading: string;
    cards: CardItem[];
    stats: StatItem[];
  };
}

const CountUp = ({ end, duration = 2.5, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

import Image from 'next/image';
import { UtensilsCrossed, GraduationCap, ChefHat } from 'lucide-react';

const IconWrapper = ({ name }: { name: string }) => {
  switch (name) {
    case 'UtensilsCrossed': return <UtensilsCrossed className="w-10 h-10 text-accent-red" />;
    case 'GraduationCap': return <GraduationCap className="w-10 h-10 text-accent-red" />;
    case 'ChefHat': return <ChefHat className="w-10 h-10 text-accent-red" />;
    default: return null;
  }
};

const ValueProposition = ({ data }: ValuePropositionProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 480px)" srcSet="/images/student-practice-5-480w.webp" />
          <source media="(max-width: 768px)" srcSet="/images/student-practice-5-768w.webp" />
          <source media="(max-width: 1280px)" srcSet="/images/student-practice-5-1280w.webp" />
          <img
            src="/images/student-practice-5-1920w.webp"
            alt="Culinary Academy Campus Kitchen"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08] grayscale"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="noir-chip noir-chip-red mb-8">
            Institutional Dominance
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
            {data.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {data.cards.map((card, i) => (
            <div 
              key={i} 
              className="glass-card p-6 md:p-8 rounded-[1.5rem] border border-white/5 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-700 hover:-translate-y-2 shadow-2xl relative overflow-hidden"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Card Accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-power-red to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] pointer-events-none"></div>

              <div className="mb-6 p-4 bg-white/5 rounded-2xl group-hover:bg-accent-red/10 group-hover:scale-110 transition-all duration-700 shadow-2xl border border-white/5 relative">
                <div className="absolute -inset-4 bg-accent-red/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <IconWrapper name={card.icon} />
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-accent-red transition-colors duration-500 tracking-tighter">
                {card.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed text-base md:text-lg group-hover:text-gray-300 transition-colors">
                {card.description}
              </p>

              <div className="mt-8 w-12 h-1 bg-white/10 rounded-full group-hover:w-20 group-hover:bg-power-red transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 rounded-[2rem] bg-obsidian border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] animate-fade-in [animation-delay:600ms] relative overflow-hidden group/stats">
          
          {/* Decorative Stat Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-power-red/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          {data.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center group relative z-10">
              <div className="text-4xl md:text-5xl font-black text-white mb-4 flex items-baseline group-hover:text-accent-red transition-colors duration-700 tracking-tighter">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="flex flex-col items-center">
                <div className="h-1 w-12 bg-power-red mb-4 shadow-[0_0_20px_rgba(239,35,60,0.6)] group-hover:w-16 transition-all duration-700"></div>
                <p className="text-gray-400 font-bold tracking-widest text-[10px] md:text-xs uppercase">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
