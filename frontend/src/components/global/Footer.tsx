'use client';

import React from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';

// Custom Icons for better reliability and performance (No lucide-react dependency)
const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.28-2.28a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

interface FooterProps {
  data: any;
  locale: string;
}

const Footer = ({ data, locale }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const copyright = data?.copyright?.replace('{year}', currentYear.toString()) || `© ${currentYear} Culinary Institute of Bangladesh.`;

  // Safely access columns with fallbacks
  const getColumn = (index: number) => {
    return data?.columns?.[index] || { title: "", links: [], socials: {} };
  };

  const col1 = getColumn(0);
  const col2 = getColumn(1);
  const col3 = getColumn(2);
  const col4 = getColumn(3);
  const col5 = getColumn(4);

  const headingStyle = "text-xs font-bold uppercase tracking-[0.3em] text-prestige-gold mb-8";
  const linkStyle = "text-sm text-gray-400 hover:text-white transition-colors block";

  return (
    <footer className="bg-[#000A1A] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
          {/* Column 1: Navigation */}
          <div className="space-y-6">
            <h4 className={headingStyle}>{col1.title || "Navigation"}</h4>
            <ul className="space-y-4">
              {col1.links?.map((link: any, i: number) => (
                <li key={i}>
                  <Link href={link.href} className={linkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className={headingStyle}>{col2.title || "Quick Links"}</h4>
            <ul className="space-y-4">
              {col2.links?.map((link: any, i: number) => (
                <li key={i}>
                  <Link href={link.href} className={linkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional */}
          <div className="space-y-6">
            <h4 className={headingStyle}>{col3.title || "Institutional"}</h4>
            <ul className="space-y-4">
              {col3.links?.map((link: any, i: number) => (
                <li key={i}>
                  {link.href?.startsWith('http') ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href || '#'} className={linkStyle}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h4 className={headingStyle}>{col4.title || "Contact"}</h4>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <MapPinIcon className="w-4 h-4 text-power-red shrink-0 mt-1" />
                <span className="text-gray-400 text-sm leading-relaxed">{col4.address || "Dhaka, Bangladesh"}</span>
              </li>
              <li className="flex gap-4 items-center">
                <PhoneIcon className="w-4 h-4 text-power-red shrink-0" />
                <span className="text-gray-400 text-sm">{col4.phone || "+880..."}</span>
              </li>
              <li className="flex gap-4 items-center">
                <MailIcon className="w-4 h-4 text-power-red shrink-0" />
                <span className="text-gray-400 text-sm">{col4.email || "info@cibdhk.com"}</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="space-y-6">
            <h4 className={headingStyle}>{col5.title || "Newsletter"}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              {col5.disclaimer || "Subscribe to our newsletter for updates."}
            </p>
            <form className="relative flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={col5.placeholder || "Your email"}
                className="w-full bg-white/5 border border-white/10 rounded-l-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-power-red/50 transition-all text-white placeholder:text-gray-600"
              />
              <button 
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-power-red text-white px-4 rounded-r-xl hover:bg-red-600 transition-all flex items-center justify-center"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </form>
            <div className="pt-2 flex gap-4">
              <Image src="/images/nsda-logo.png" alt="NSDA" width={32} height={32} className="opacity-30 grayscale" />
              <Image src="/images/iso-logo.png" alt="ISO" width={32} height={32} className="opacity-30 grayscale" />
            </div>
          </div>
        </div>

        {/* Bottom Bar Redesign */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Logo Section */}
          <div className="flex-1 flex justify-start">
            <Image 
              src="/images/cib-logo-accredited.png" 
              alt="CIB Accredited Logo" 
              width={280} 
              height={80} 
              className="h-auto w-[280px] object-contain opacity-90"
            />
          </div>

          {/* Social Section */}
          <div className="flex items-center gap-6">
            <a href={col4.socials?.facebook || "https://www.facebook.com/cibdhaka"} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href={col4.socials?.youtube || "https://www.youtube.com/@cibdhaka"} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
              <YoutubeIcon className="w-5 h-5" />
            </a>
            <a href={col4.socials?.instagram || "https://www.instagram.com/cib.dhk/"} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href={col4.socials?.tiktok || "https://www.tiktok.com/@cibdhaka"} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a href={col4.socials?.linkedin || "https://www.linkedin.com/company/cib-the-culinary-institute-of-bangladesh/"} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a href={col4.socials?.whatsapp || "https://wa.me/8801338958997"} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
              <PhoneIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright & Credit Section */}
          <div className="flex-1 flex flex-col items-center lg:items-end gap-1">
            <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold text-center lg:text-right">
              {copyright}
            </p>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
              Developed by <a href="https://hasanrizvee.info/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-prestige-gold transition-colors font-black underline decoration-white/10 underline-offset-4">Hasan Rizvee</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
