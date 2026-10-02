'use client';

import React from 'react';

interface CertData {
  title: string;
  bestFor: string[];
}

interface CertComparisonProps {
  data: {
    heading: string;
    global: CertData;
    nsda: CertData;
  };
}

import { Globe, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const CertComparison = ({ data }: CertComparisonProps) => {
  if (!data) return null;
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_3-1920w.webp"
          alt="Certification Landscape"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-6">
            Global Accreditation
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            {data.heading}
          </h2>
        </div>

        <div className="overflow-x-auto mt-12">
          <table className="w-full text-left text-xs md:text-sm text-gray-300 border-collapse border border-white/5 rounded-2xl overflow-hidden glass-card shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <thead className="bg-white/[0.02] text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-white/10">
              <tr>
                <th scope="col" className="p-4 md:p-6 w-1/4">Comparison Dimension</th>
                <th scope="col" className="p-4 md:p-6 text-blue-400 w-3/8">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {data.global.title}
                  </div>
                </th>
                <th scope="col" className="p-4 md:p-6 text-prestige-gold w-3/8">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    {data.nsda.title}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/[0.01]">
              <tr className="hover:bg-white/[0.02] transition-colors duration-300">
                <th scope="row" className="p-4 md:p-6 font-bold text-white uppercase tracking-wider text-[10px]">
                  Accreditation Level
                </th>
                <td className="p-4 md:p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-[10px] font-bold tracking-widest border border-blue-600/20 uppercase">
                    International Standards
                  </span>
                </td>
                <td className="p-4 md:p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-prestige-gold/10 text-prestige-gold text-[10px] font-bold tracking-widest border border-prestige-gold/20 uppercase">
                    National Recognition
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors duration-300">
                <th scope="row" className="p-4 md:p-6 font-bold text-white uppercase tracking-wider text-[10px]">
                  Best Suited For
                </th>
                <td className="p-4 md:p-6">
                  <ul className="space-y-3 list-disc pl-4">
                    {data.global.bestFor.map((item, i) => (
                      <li key={i} className="leading-relaxed hover:text-white transition-colors">{item}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 md:p-6">
                  <ul className="space-y-3 list-disc pl-4">
                    {data.nsda.bestFor.map((item, i) => (
                      <li key={i} className="leading-relaxed hover:text-white transition-colors">{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors duration-300">
                <th scope="row" className="p-4 md:p-6 font-bold text-white uppercase tracking-wider text-[10px]">
                  Industry Recognition
                </th>
                <td className="p-4 md:p-6 text-gray-400 leading-relaxed">
                  Globally accepted across standard fine-dining institutions, luxury cruises, and international resorts.
                </td>
                <td className="p-4 md:p-6 text-gray-400 leading-relaxed">
                  Fully recognized by the Government of Bangladesh, civil service, and domestic 5-star hotel networks.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CertComparison;
