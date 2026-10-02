"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingApplyButton({ locale = 'en' }: { locale?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on admission page where the form is already present
  if (pathname?.includes('/admission')) {
    return null;
  }

  const text = locale === 'bn' ? 'ভর্তি হোন' : 'Apply Now';

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 md:hidden ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <Link
        href={`/${locale}/admission`}
        className="flex items-center gap-2 bg-power-red text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(236,27,35,0.4)] hover:bg-power-red/90 active:scale-95 transition-all whitespace-nowrap"
      >
        <span>{text}</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
