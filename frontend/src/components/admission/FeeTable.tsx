'use client';

import React from 'react';

interface Installment {
  label: string;
  amount: string;
}

interface CourseFee {
  name: string;
  admissionFee: string;
  installments: Installment[];
  total: string;
}

interface FeeTableProps {
  data: {
    heading: string;
    feeHighlights: string;
    courses: CourseFee[];
  };
}

import Image from 'next/image';

const FeeTable = ({ data }: FeeTableProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/student-practice-5-1920w.webp"
          alt="Fee Structure"
          fill
          className="object-cover opacity-5 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-8">
            Investment Portfolio
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            {data.heading}
          </h2>
          <div className="w-24 h-1 bg-prestige-gold mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {data.courses.map((course, i) => (
            <div key={i} className="glass-card rounded-[2rem] border border-white/5 overflow-hidden group hover:border-prestige-gold/30 transition-all duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.6)] animate-fade-in relative" style={{ animationDelay: `${i * 150}ms` }}>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] pointer-events-none"></div>

              <div className="bg-white/[0.02] p-8 md:p-12 text-center border-b border-white/5 relative">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-prestige-gold transition-colors duration-700">{course.name}</h3>
                <div className="flex flex-col items-center">
                   <div className="flex items-baseline gap-3">
                      <span className="text-prestige-gold text-4xl md:text-5xl font-bold tracking-tight transition-all duration-1000 group-hover:scale-110">
                        {course.total}
                      </span>
                      <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Total</span>
                   </div>
                </div>
              </div>
              
              <div className="p-8 md:p-10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm text-gray-300 border-collapse">
                    <thead className="text-[10px] text-gray-500 font-bold uppercase tracking-widest border-b border-white/10">
                      <tr>
                        <th scope="col" className="pb-4 font-bold">Payment Phase / Protocol</th>
                        <th scope="col" className="pb-4 text-right font-bold">Amount (BDT)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       <tr className="group/row hover:bg-white/[0.02] transition-colors duration-300">
                        <th scope="row" className="py-4 font-medium text-gray-400 group-hover/row:text-white">
                          Initiation Protocol (Admission Fee)
                        </th>
                        <td className="py-4 text-right font-bold text-white group-hover/row:text-prestige-gold">
                          {course.admissionFee}
                        </td>
                      </tr>
                      {course.installments.map((inst, j) => (
                        <tr key={j} className="group/row hover:bg-white/[0.02] transition-colors duration-300">
                          <th scope="row" className="py-4 font-medium text-gray-400 group-hover/row:text-white">
                            {inst.label}
                          </th>
                          <td className="py-4 text-right font-bold text-white group-hover/row:text-prestige-gold">
                            {inst.amount}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-extrabold text-sm md:text-base text-white border-t border-white/10 bg-white/[0.01]">
                        <th scope="row" className="py-4 font-bold text-white">
                          Total Program Cost
                        </th>
                        <td className="py-4 text-right font-bold text-prestige-gold">
                          {course.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-10 p-6 bg-prestige-gold/5 rounded-2xl border border-prestige-gold/10 text-center relative group/notice overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:notice:translate-x-full transition-transform duration-[1000ms]"></div>
                   <p className="text-xs font-bold text-prestige-gold tracking-widest relative z-10 leading-loose">
                     {data.feeHighlights}
                   </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      import('@/lib/tracking/datalayer').then(({ pushToDataLayer }) => {
                        pushToDataLayer('purchase', { 
                          value: 44000, 
                          currency: 'BDT', 
                          content_name: 'Professional Chef Course', 
                          content_ids: ['CHEF-001']
                        });
                        alert('Simulated Payment Success. Purchase event fired.');
                      });
                    }}
                    className="px-6 py-3 bg-green-600/20 text-green-400 border border-green-600/50 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-green-600/30 transition-all"
                  >
                    Simulate Payment
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* CIB Campus Kitchen Lab Image Card */}
          <div className="glass-card rounded-[2rem] border border-white/5 overflow-hidden group hover:border-prestige-gold/30 transition-all duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.6)] animate-fade-in relative flex flex-col justify-between" style={{ animationDelay: `300ms` }}>
            <div className="aspect-[4/3] lg:aspect-auto lg:flex-1 relative overflow-hidden">
              <Image
                src="/images/practical_class_3-1920w.webp"
                alt="CIB professional training kitchen facility and commercial lab session"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-8 border-t border-white/5 bg-white/[0.01]">
              <span className="text-[10px] bg-power-red/10 border border-power-red/20 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-3">
                CIB Campus Lab
              </span>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">State-Of-The-Art Facility</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Step into a professional-grade commercial kitchen environment. CIB labs are equipped with industry-standard culinary equipment, ensuring you build high-fidelity practical skills for global kitchens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeeTable;
