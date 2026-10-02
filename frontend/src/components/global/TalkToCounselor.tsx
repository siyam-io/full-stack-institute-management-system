import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface TalkToCounselorProps {
  locale?: string;
}

export default function TalkToCounselor({ locale = 'en' }: TalkToCounselorProps) {
  const isBn = locale === 'bn';
  const heading = isBn ? 'ভর্তি বিষয়ক কোনো প্রশ্ন আছে?' : 'Have Admission Questions?';
  const subheading = isBn ? 'আমাদের অভিজ্ঞ কাউন্সিলরদের সাথে কথা বলুন' : 'Talk to our expert counselors today';

  return (
    <div className="w-full max-w-4xl mx-auto my-12 md:my-16 px-4">
      <div className="glass-card p-8 md:p-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-power-red/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-prestige-gold/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="text-center md:text-left relative z-10">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
            {heading}
          </h3>
          <p className="text-white/60 font-medium">
            {subheading}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto">
          <Link
            href="https://wa.me/8801338958997"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-8 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-white font-bold transition-all duration-300 group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            WhatsApp
          </Link>
          <Link
            href="tel:+8801338958997"
            className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-8 rounded-xl bg-power-red hover:bg-power-red/90 text-white font-bold shadow-[0_10px_30px_rgba(236,27,35,0.3)] transition-all duration-300 group"
          >
            <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Call Now
          </Link>
        </div>
      </div>
    </div>
  );
}
