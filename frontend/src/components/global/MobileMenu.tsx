import React from 'react';
import { Link } from '@/navigation';
import { 
  X, Home, BookOpen, GraduationCap, 
  Image as ImageIcon, HelpCircle, Mail, 
  Info, Users, MessageCircle, Phone, 
  ShieldCheck, ChevronDown, ChevronRight,
  Newspaper
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
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = React.useState(false);

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
          
          {/* About Dropdown Section */}
          <div className="space-y-1">
            <button 
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="w-full flex items-center justify-between p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
            >
              <div className="flex items-center gap-4">
                <Info className="w-4 h-4 text-prestige-gold" />
                {navData.about}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`pl-12 space-y-1 transition-all duration-300 overflow-hidden ${
              isAboutOpen ? 'max-h-64 opacity-100 py-2' : 'max-h-0 opacity-0'
            }`}>
              <Link href="/about" onClick={onClose} className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase">
                {navData.ourStory}
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link href="/expert-culinary-mentors" onClick={onClose} className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase">
                {navData.meetMentors}
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link href="/gallery" onClick={onClose} className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase">
                {navData.gallery}
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link href="/faq" onClick={onClose} className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase">
                {navData.faq}
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Courses Dropdown Section */}
          <div className="space-y-1 relative">
            <Link 
              href="/courses" 
              onClick={onClose} 
              className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
            >
              <BookOpen className="w-4 h-4 text-prestige-gold" />
              {navData.courses}
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsCoursesOpen(!isCoursesOpen);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors"
              aria-label="Toggle courses submenu"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCoursesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`pl-12 space-y-1 transition-all duration-300 overflow-hidden ${
              isCoursesOpen ? 'max-h-[30rem] opacity-100 py-2' : 'max-h-0 opacity-0'
            }`}>
              <Link 
                href="/chef-course-bangladesh" 
                onClick={onClose} 
                className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase"
              >
                {navData.proChefCourse}
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link 
                href="/barista-course-dhaka" 
                onClick={onClose} 
                className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase"
              >
                {navData.comboCourse}
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link 
                href="/fast-food-course-dhaka" 
                onClick={onClose} 
                className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase"
              >
                {navData.fastFoodCourse}
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link 
                href="/pastry-bakery-course-dhaka" 
                onClick={onClose} 
                className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase"
              >
                {navData.customizedCourse}
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link 
                href="/culinary-diploma-bangladesh" 
                onClick={onClose} 
                className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase"
              >
                {navData.diplomaCourse}
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link 
                href="/short-courses" 
                onClick={onClose} 
                className="flex items-center justify-between p-3 text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase"
              >
                {navData.shortCourses}
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <Link 
            href="/admission" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <GraduationCap className="w-4 h-4 text-prestige-gold" />
            {navData.admission}
          </Link>

          <Link 
            href="/contact" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <Mail className="w-4 h-4 text-prestige-gold" />
            {navData.contact}
          </Link>

          <Link 
            href="/blog" 
            onClick={onClose} 
            className="flex items-center gap-4 p-4 text-white hover:bg-white/5 rounded-xl transition-all font-bold tracking-tight uppercase text-sm"
          >
            <Newspaper className="w-4 h-4 text-prestige-gold" />
            {navData.blog}
          </Link>

          <a 
            href="https://verification.cibdhk.com" 
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
            href="https://wa.me/8801338958997" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-whatsapp/10 border border-whatsapp/20 rounded-xl text-whatsapp text-xs font-black uppercase tracking-widest transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a 
            href="tel:+8801338958997" 
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
