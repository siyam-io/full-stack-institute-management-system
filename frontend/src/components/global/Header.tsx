'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';
import LanguageToggle from './LanguageToggle';
import MobileMenu from './MobileMenu';
import VerificationLink from './VerificationLink';
import { Phone, MessageCircle, ChevronRight, Menu } from 'lucide-react';

interface NavData {
  home: string;
  about: string;
  ourStory: string;
  meetMentors: string;
  courses: string;
  proChefCourse: string;
  comboCourse: string;
  fastFoodCourse: string;
  customizedCourse: string;
  diplomaCourse: string;
  shortCourses: string;
  specialtyCourses: string;
  sushiCourse: string;
  thaiCourse: string;
  chineseCourse: string;
  mediterraneanCourse: string;
  indianCourse: string;
  admission: string;
  gallery: string;
  faq: string;
  contact: string;
  blog: string;
  languageToggle: string;
}

const Header = ({ navData, locale }: { navData: NavData; locale: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-transparent py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center gap-6 max-w-6xl mx-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
          {/* Logo */}
          <Link href="/" className="relative z-10 hover:scale-105 transition-transform duration-500">
            <Image 
              src="/images/logo_cib.png" 
              alt="CIB Logo" 
              width={120} 
              height={50} 
              className="w-auto h-10 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-7">
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              {navData.home}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>

            <Link href="/courses" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              {navData.courses}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>

            <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              {navData.about}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>

            <Link href="/faq" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              {navData.faq}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>

            <Link href="/blog" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              {navData.blog}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>

            <Link href="/contact" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              {navData.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 pr-6 border-r border-white/10">
              <a 
                href="tel:+8801338958997" 
                className="text-white hover:text-prestige-gold transition-all"
                aria-label="Call CIB"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/8801338958997" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-whatsapp transition-all"
                aria-label="WhatsApp CIB"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <VerificationLink />
            <LanguageToggle label={navData.languageToggle} locale={locale} />
          </div>
        </div>

        {/* Mobile Header Redesign */}
        <div className="lg:hidden flex justify-between items-center h-16">
          {/* Left side: CIB logo + language toggle */}
          <div className="flex items-center gap-4">
            <Link href="/" className="relative z-10 shrink-0">
              <Image 
                src="/images/logo_cib.png" 
                alt="CIB Logo" 
                width={120} 
                height={50} 
                className="w-auto h-10 object-contain"
                priority
              />
            </Link>
            <LanguageToggle label={navData.languageToggle} locale={locale} />
          </div>

          {/* Right side: WhatsApp + hamburger menu */}
          <div className="flex items-center gap-2">
            <a 
              href="https://wa.me/8801338958997" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white p-2 hover:text-whatsapp transition-colors"
              aria-label="WhatsApp CIB"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <button 
              className="text-white p-2 hover:text-prestige-gold transition-colors" 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        navData={navData}
        locale={locale}
      />
    </header>
  );
};

export default Header;
