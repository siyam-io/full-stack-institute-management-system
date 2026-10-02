'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerificationLinkProps {
  label?: string;
  className?: string;
}

const VerificationLink = ({ label = "Certificate Verification", className = "" }: VerificationLinkProps) => {
  return (
    <a
      href="https://verification.cibdhk.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-bold text-prestige-gold hover:text-yellow-400 transition-all duration-300 group ${className}`}
    >
      <ShieldCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
      <span className="tracking-wide uppercase text-[10px] md:text-xs">
        {label}
      </span>
    </a>
  );
};

export default VerificationLink;
