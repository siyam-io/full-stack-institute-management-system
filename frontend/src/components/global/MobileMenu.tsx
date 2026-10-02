import React from 'react';
import { Link } from '@/navigation';
import { 
  X, Home, BookOpen, HelpCircle, Mail, 
  Info, MessageCircle, Phone, 
  ShieldCheck, Newspaper
} from 'lucide-react';
import VerificationLink from './VerificationLink';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  navData, 
  locale 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  navData: any;
  locale: string;
}) => {

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[40] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Glassy Dropdown Panel */}
      <div className={`fixed top-0 left-0 w-full z-[51] bg-obsidian/90 backdrop-blur-xl border-b border-white/10 rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out transform lg:hidden ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex justify-between items-center p-4 border-b border-white/5">
          <div className="text-prestige-gold text-[10px] font-black uppercase tracking-[0.3em] pl-2">
            Navigation Protocol
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-white hover:text-power-red transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-6 space-y-2 max-h-[80vh] overflow-y-auto">
          <Link 
            href="/" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <Home className="w-4 h-4 text-prestige-gold" />
            {navData.home}
          </Link>
          
          <Link 
            href="/courses" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <BookOpen className="w-4 h-4 text-prestige-gold" />
            {navData.courses}
          </Link>

          <Link 
            href="/about" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <Info className="w-4 h-4 text-prestige-gold" />
            {navData.about}
          </Link>

          <Link 
            href="/faq" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <HelpCircle className="w-4 h-4 text-prestige-gold" />
            {navData.faq}
          </Link>

          <Link 
            href="/blog" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <Newspaper className="w-4 h-4 text-prestige-gold" />
            {navData.blog}
          </Link>

          <Link 
            href="/contact" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <Mail className="w-4 h-4 text-prestige-gold" />
            {navData.contact}
          </Link>

          <a 
            href={process.env.NEXT_PUBLIC_VERIFICATION_URL || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <ShieldCheck className="w-4 h-4 text-prestige-gold" />
            Certificate Verification
          </a>
        </nav>

        {/* Quick Contact Footer */}
        <div className="p-6 border-t border-white/5 grid grid-cols-2 gap-4">
          <a 
            href="https://wa.me/8801700000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-whatsapp/10 border border-whatsapp/20 rounded-xl text-whatsapp text-xs font-black uppercase tracking-widest transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a 
            href="tel:+8801700000000" 
            className="flex items-center justify-center gap-2 p-3 bg-power-red/10 border border-power-red/20 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
