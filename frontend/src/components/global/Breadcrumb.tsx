"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ locale = 'en' }: { locale?: string }) {
  const pathname = usePathname();
  if (!pathname || pathname === `/${locale}` || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  // remove the locale segment
  const pathSegments = segments.filter(seg => seg !== locale);

  if (pathSegments.length === 0) return null;

  const isBn = locale === 'bn';

  return (
    <div className="absolute top-0 left-0 w-full z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 pointer-events-auto">
        <nav className="inline-flex items-center space-x-2 text-[10px] md:text-xs text-gray-400 bg-obsidian/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 shadow-xl uppercase tracking-wider font-bold">
          <Link href={`/${locale}`} className="hover:text-prestige-gold transition-colors flex items-center gap-1.5">
            <Home className="w-3 h-3 md:w-4 md:h-4" />
            <span>{isBn ? 'হোম' : 'Home'}</span>
          </Link>
          {pathSegments.map((seg, i) => {
            const isLast = i === pathSegments.length - 1;
            const href = `/${locale}/${pathSegments.slice(0, i + 1).join('/')}`;
            
            // formatting segment name
            let name = seg.replace(/-/g, ' ');
            name = name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <React.Fragment key={href}>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white/20" />
                {isLast ? (
                  <span className="text-prestige-gold truncate max-w-[150px] md:max-w-xs">{name}</span>
                ) : (
                  <Link href={href} className="hover:text-white transition-colors truncate max-w-[100px] md:max-w-[150px]">
                    {name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
