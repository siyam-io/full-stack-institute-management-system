'use client';

import React from 'react';
import { courseData } from './courseData';

export default function LandingFooter() {
  const whatsappLink = `https://wa.me/${courseData.contact.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="bg-obsidian text-white py-12 md:py-20 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 lg:gap-8 items-start mb-16 md:mb-20">
          {/* Brand Identity */}
          <div className="space-y-8 col-span-1 md:col-span-1 lg:col-span-1">
            <div className="relative group inline-block">
              <img src="/images/logo_cib.png" alt="CIB Logo" width="64" height="64" className="h-16 w-auto invert brightness-0 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute -inset-2 bg-prestige-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-bengali text-white/50 text-base md:text-lg leading-relaxed">
              {courseData.tagline}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { name: 'facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', url: 'https://www.facebook.com/cibdhaka' },
                { name: 'instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z', url: 'https://instagram.com/cib.dhk' },
                { name: 'youtube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', url: 'https://www.youtube.com/channel/UCehkM8tt4M68UBbVqJHC_HQ' },
                { name: 'linkedin', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', url: 'https://www.linkedin.com/company/cib-the-culinary-institute-of-bangladesh/' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  aria-label={social.name.charAt(0).toUpperCase() + social.name.slice(1)}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-prestige-gold/10 hover:border-prestige-gold/30 transition-all text-white/60 hover:text-prestige-gold"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6 col-span-1">
            <h4 className="text-white font-black tracking-widest text-xs uppercase border-l-2 border-prestige-gold pl-4">Important Links</h4>
            <ul className="space-y-4 font-bengali">
              {[
                { name: 'প্রধান ওয়েবসাইট', url: 'https://cibdhk.com/' },
                { name: 'আমাদের সম্পর্কে', url: 'https://cibdhk.com/about/' },
                { name: 'সরাসরি ভর্তি (Direct)', url: courseData.directAdmissionUrl },
                { name: 'বিশেষজ্ঞ মেন্টরবৃন্দ', url: 'https://cibdhk.com/expert-culinary-mentors/' },
                { name: 'সার্টিফিকেট ভেরিফিকেশন', url: 'https://verification.cibdhk.com/' },
                { name: 'ভর্তির নিয়মাবলী', url: 'https://cibdhk.com/admission/' },
                { name: 'গোপনীয়তা নীতি', url: 'https://cibdhk.com/privacy-policy/' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-prestige-gold transition-colors block py-1">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 col-span-1">
            <h4 className="text-white font-black tracking-widest text-xs uppercase border-l-2 border-prestige-gold pl-4">Contact Info</h4>
            <div className="space-y-6 font-english">
               <div className="space-y-1">
                 <p className="text-white/40 text-xs uppercase font-bold tracking-tighter">Phone & Support</p>
                 <p className="text-xl font-black text-white hover:text-prestige-gold transition-colors">{courseData.contact.phone}</p>
                 <p className="text-lg font-bold text-white/80">{courseData.contact.altPhone}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-white/40 text-xs uppercase font-bold tracking-tighter">Visit Us</p>
                 <p className="font-bengali text-white/60 text-base leading-relaxed">{courseData.contact.address}</p>
               </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="space-y-8 col-span-1">
             <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 border border-prestige-gold/20 rounded-2xl">
                <h4 className="font-bengali text-lg md:text-xl font-bold text-white mb-4">ভর্তি হতে ইচ্ছুক?</h4>
                <p className="font-bengali text-white/50 text-sm mb-6">সিট সংখ্যা সীমিত, আজই আপনার সিট বুক করে ক্যারিয়ার শুরু করুন।</p>
                <a 
                  href={courseData.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-power-red text-white hover:bg-power-red-dark transition-colors font-bold w-full py-4 text-center block text-base rounded-full"
                >
                  এখনই রেজিস্ট্রেশন করুন
                </a>
             </div>
             
             <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.8a9.718 9.718 0 01-4.952-1.358l-.355-.211-3.68.965.982-3.588-.232-.369A9.72 9.72 0 012.3 12.05C2.3 6.67 6.67 2.3 12.05 2.3c2.612 0 5.065 1.018 6.911 2.864A9.704 9.704 0 0121.8 12.05c0 5.38-4.37 9.75-9.75 9.75zM12.05 0C5.405 0 0 5.405 0 12.05c0 2.124.554 4.197 1.607 6.026L0 24l6.089-1.597A12.02 12.02 0 0012.05 24.1C18.695 24.1 24.1 12.05 24.1 5.405 18.695 0 12.05 0z" />
                </svg>
                Contact via WhatsApp
              </a>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm font-sans tracking-wide">
          <p>© {new Date().getFullYear()} Culinary Institute of Bangladesh. All rights reserved.</p>
          <div className="flex gap-8">
             <a href="#" className="hover:text-prestige-gold transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-prestige-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
