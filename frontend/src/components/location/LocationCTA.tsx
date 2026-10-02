'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface CTA {
  heading: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

interface LocationCTAProps {
  cta: CTA;
}

export default function LocationCTA({ cta }: LocationCTAProps) {
  return (
    <section className="w-full bg-gradient-to-r from-amber-600 to-orange-600 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {cta.heading}
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Primary Button */}
          <Link
            href={cta.primaryButtonLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            {cta.primaryButtonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary Button */}
          <Link
            href={cta.secondaryButtonLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-lg text-white font-bold rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            {cta.secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
