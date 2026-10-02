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
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-obsidian/95 backdrop-blur-2xl py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]  border-white/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-10 hover:scale-105 transition-transform duration-500">
            <Image 
              src="/images/logo_cib.png" 
              alt="CIB Logo" 
              width={160} 
              height={70} 
              className="w-auto h-16 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-10">
            <Link href="/" className="text-white hover:text-prestige-gold font-bold tracking-widest text-[11px] transition-all duration-500 relative group uppercase">
              {navData.home}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>
            
            {/* Dropdown */}
            <div 
              className="relative group/about"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <Link href="/about" className="text-white group-hover/about:text-prestige-gold font-bold tracking-widest text-[11px] flex items-center gap-2 transition-all duration-500 uppercase">
                {navData.about}
                <svg className={`w-3 h-3 transition-transform duration-500 ${isAboutOpen ? 'rotate-180 text-prestige-gold' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 glass-card p-2 rounded-2xl overflow-hidden transition-all duration-500 origin-top shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/5 ${
                isAboutOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-4'
              }`}>
                <Link href="/about" className="flex items-center justify-between px-6 py-4 text-white hover:bg-white/5 rounded-xl transition-all duration-500 font-bold tracking-widest text-[10px] group/item uppercase">
                  {navData.ourStory}
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-prestige-gold" />
                </Link>
                <Link href="/expert-culinary-mentors" className="flex items-center justify-between px-6 py-4 text-white hover:bg-white/5 rounded-xl transition-all duration-500 font-bold tracking-widest text-[10px] group/item uppercase">
                  {navData.meetMentors}
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-prestige-gold" />
                </Link>
                <Link href="/gallery" className="flex items-center justify-between px-6 py-4 text-white hover:bg-white/5 rounded-xl transition-all duration-500 font-bold tracking-widest text-[10px] group/item uppercase">
                  {navData.gallery}
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-prestige-gold" />
                </Link>
                <Link href="/faq" className="flex items-center justify-between px-6 py-4 text-white hover:bg-white/5 rounded-xl transition-all duration-500 font-bold tracking-widest text-[10px] group/item uppercase">
                  {navData.faq}
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-prestige-gold" />
                </Link>
              </div>
            </div>

            <Link href="/courses" className="text-white hover:text-prestige-gold font-bold tracking-widest text-[11px] transition-all duration-500 relative group uppercase">
              {navData.courses}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>


            <Link href="/admission" className="text-white hover:text-prestige-gold font-bold tracking-widest text-[11px] transition-all duration-500 relative group uppercase">
              {navData.admission}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-white hover:text-prestige-gold font-bold tracking-widest text-[11px] transition-all duration-500 relative group uppercase">
              {navData.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link href="/blog" className="text-white hover:text-prestige-gold font-bold tracking-widest text-[11px] transition-all duration-500 relative group uppercase">
              {navData.blog}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-power-red transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-8">
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
