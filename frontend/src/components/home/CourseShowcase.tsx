'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { pushToDataLayer } from '@/lib/tracking/datalayer';

interface ComparisonData {
  title: string;
  benefits?: string[];
  drawbacks?: string[];
}

interface CourseShowcaseProps {
  data: {
    heading: string;
    courseName: string;
    price: string;
    features: string[];
    comparison: {
      heading: string;
      professional: ComparisonData;
      ordinary: ComparisonData;
    };
    cta: string;
    ctaLink: string;
    image: string;
  };
}

import { CheckCircle2, XCircle } from 'lucide-react';

const CourseShowcase = ({ data }: CourseShowcaseProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 480px)" srcSet="/images/principal-dewan-ismail-inspecting-student-practice-session-480w.webp" />
          <source media="(max-width: 768px)" srcSet="/images/principal-dewan-ismail-inspecting-student-practice-session-768w.webp" />
          <source media="(max-width: 1280px)" srcSet="/images/principal-dewan-ismail-inspecting-student-practice-session-1280w.webp" />
          <img
            src="/images/principal-dewan-ismail-inspecting-student-practice-session-1920w.webp"
            alt="Culinary Institute of Bangladesh"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-white">

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-center mb-40">

          {/* Left Column: Info */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-8 group">
              <div className="w-12 h-1.5 bg-power-red shadow-[0_0_20px_rgba(236,27,35,0.6)] group-hover:w-16 transition-all duration-700"></div>
              <h4 className="text-gray-400 font-bold tracking-widest text-[10px] md:text-xs">
                {data.courseName}
              </h4>
            </div>

            <h2 className="text-3xl md:text-5xl font-black leading-[1.1] mb-8 tracking-tighter">
              {data.heading}
            </h2>

            <div className="inline-flex flex-col mb-12 p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group/price">
              {/* Price Accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-red scale-y-0 group-hover/price:scale-y-100 transition-transform duration-700"></div>
              <span className="text-gray-500 text-[10px] md:text-xs font-bold tracking-widest mb-2 uppercase">Investment Capital</span>
              <div className="text-2xl md:text-4xl font-black text-white tracking-tighter flex items-baseline gap-2">
                {data.price}
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {data.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-300 group/item">
                  <div className="p-1.5 rounded-full bg-green-500/10 border border-green-500/20 group-hover/item:bg-green-500 group-hover/item:text-white transition-all duration-500">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-gray-400 group-hover/item:text-white transition-colors">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-8">
              <Link
                href={data.ctaLink}
                onClick={() => pushToDataLayer('begin_application', { course_name: data.courseName })}
                className="btn-primary px-10 py-5 rounded-xl text-xs font-bold tracking-widest shadow-[0_20px_50px_rgba(236,27,35,0.3)] hover:scale-105 transition-all duration-700"
              >
                {data.cta}
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative group animate-fade-in">
            {/* Visual Echo Effect */}
            <div className="absolute -inset-10 bg-power-red/10 rounded-[4rem] blur-[100px] group-hover:bg-power-red/20 transition-all duration-1000 opacity-50"></div>
            <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/5 aspect-[4/5] md:aspect-video lg:aspect-square">
              <picture>
                <source media="(max-width: 480px)" srcSet={data.image.replace('-1920w.webp', '-480w.webp')} />
                <source media="(max-width: 768px)" srcSet={data.image.replace('-1920w.webp', '-768w.webp')} />
                <source media="(max-width: 1280px)" srcSet={data.image.replace('-1920w.webp', '-1280w.webp')} />
                <img
                  src={data.image}
                  alt="Practical Class at CIB"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000"></div>

              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-[1.5rem] border border-white/10 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 backdrop-blur-2xl">
                <p className="text-accent-red font-bold tracking-widest text-[10px] mb-1">Campus Protocol</p>
                <h3 className="text-lg font-bold text-white tracking-tight">Active Practical Session</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mt-40">
          <div className="text-center mb-16">
            <div className="noir-chip noir-chip-red mb-8">
              Institutional Parity
            </div>
            <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter leading-tight">
              {data.comparison.heading}
            </h3>
            <div className="w-24 h-1 bg-power-red mx-auto rounded-full shadow-[0_0_20px_rgba(236,27,35,0.5)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* CIB Professional Card */}
            <div className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-green-500/5 rounded-[4rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative glass-card p-6 md:p-8 rounded-[1.5rem] border border-white/5 hover:border-green-500/30 transition-all duration-700 shadow-2xl h-full">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000">
                  <CheckCircle2 className="w-32 h-32 text-green-500" />
                </div>
                <h4 className="text-xl md:text-2xl font-black text-white mb-8 flex items-center gap-4 tracking-tighter">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-2xl shadow-green-500/30">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  {data.comparison.professional.title}
                </h4>
                <ul className="space-y-6">
                  {data.comparison.professional.benefits?.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-300 text-sm md:text-base group/li">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shadow-[0_0_15px_rgba(34,197,94,0.8)] group-hover/li:scale-150 transition-transform"></div>
                      <span className="font-bold text-gray-400 group-hover/li:text-white transition-colors">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ordinary Training Card */}
            <div className="relative overflow-hidden group grayscale hover:grayscale-0 transition-all duration-1000">
              <div className="relative glass-card p-6 md:p-8 rounded-[1.5rem] border border-white/5 opacity-40 hover:opacity-100 transition-all duration-700 h-full">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-1000">
                  <XCircle className="w-32 h-32 text-red-500" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-500 mb-8 flex items-center gap-4 tracking-tight">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-gray-600" />
                  </div>
                  {data.comparison.ordinary.title}
                </h4>
                <ul className="space-y-6">
                  {data.comparison.ordinary.drawbacks?.map((drawback, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-600 text-sm md:text-base group/li">
                      <div className="w-2 h-2 bg-gray-700 rounded-full mt-2"></div>
                      <span className="font-bold text-gray-500">{drawback}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseShowcase;
