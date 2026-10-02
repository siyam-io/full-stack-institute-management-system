'use client';

import React from 'react';
import { Link } from '@/navigation';
import { useLocale } from 'next-intl';


import { pushToDataLayer } from '@/lib/tracking/datalayer';

import { CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: string;
    name: string;
    tagline: string;
    highlightMetric: string;
    shortSummary: string;
    duration: string;
    schedule: string;
    price: string;
    originalPrice: string;
    badge: string | null;
    features: string[];
    cta: string;
    link: string;
    detailsLink?: string | null;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  const locale = useLocale();
  const isExternal = course.link.startsWith('http');
  const isStaticPage = course.link.startsWith('/professional-chef-course-basic-to-advance');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleTrack = () => {
    pushToDataLayer('begin_application', { 
      course_name: course.name,
      course_id: course.id,
      price: course.price
    });
  };

  return (
    <div className="glass-card p-8 md:p-10 rounded-[2rem] border border-white/10 flex flex-col h-full relative overflow-hidden group hover:bg-white/[0.12] transition-all duration-700 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {mounted && course.badge && (
        <div className="absolute top-10 right-[-45px] rotate-45 bg-power-red text-white text-[9px] font-extrabold tracking-[0.2em] py-2 px-14 shadow-2xl z-10 uppercase">
          {course.badge}
        </div>
      )}

      {/* Decorative Flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-prestige-gold/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

      {/* Metric Header (ROI Style) */}
      <div className="mb-10 text-center relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-prestige-gold/10 border border-prestige-gold/20 text-prestige-gold text-[9px] font-bold tracking-widest mb-6 uppercase">
          Training Performance
        </div>
        <div className="text-prestige-gold text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-none group-hover:scale-110 transition-transform duration-700">
          {course.highlightMetric}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-prestige-gold transition-colors duration-500 leading-tight">
          {course.name}
        </h3>
        <div className="text-gray-400 text-sm leading-relaxed font-medium">
          {course.shortSummary}
        </div>
      </div>

      {/* Core Details Block */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-prestige-gold mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">Duration</span>
          </div>
          <div className="text-white text-sm font-bold tracking-tight">{course.duration}</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-prestige-gold mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">Schedule</span>
          </div>
          <div className="text-white text-sm font-bold tracking-tight">{course.schedule}</div>
        </div>
      </div>

      <div className="mb-8 relative z-10">
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-3xl font-black text-white tracking-tighter">{course.price}</span>
          <span className="text-gray-500 line-through text-sm font-medium opacity-50">{course.originalPrice}</span>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>

      <ul className="space-y-4 mb-12 flex-grow relative z-10">
        {course.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-4 text-gray-300 font-semibold text-xs leading-snug">
            <div className="mt-1">
              <CheckCircle2 className="w-4 h-4 text-prestige-gold shrink-0" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {isExternal ? (
        <a 
          href={course.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={handleTrack}
          className="btn-primary w-full inline-flex items-center justify-center gap-3 py-5 rounded-2xl font-black tracking-[0.2em] text-[10px] uppercase shadow-[0_15px_40px_rgba(236,27,35,0.25)] hover:shadow-[0_15px_60px_rgba(236,27,35,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10"
        >
          {course.cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      ) : isStaticPage ? (
        <a 
          href={course.link} 
          onClick={handleTrack}
          className="btn-primary w-full inline-flex items-center justify-center gap-3 py-5 rounded-2xl font-black tracking-[0.2em] text-[10px] uppercase shadow-[0_15px_40px_rgba(236,27,35,0.25)] hover:shadow-[0_15px_60px_rgba(236,27,35,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10"
        >
          {course.cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      ) : (
        <Link 
          href={course.link || '/admission'} 
          onClick={handleTrack}
          className="btn-primary w-full inline-flex items-center justify-center gap-3 py-5 rounded-2xl font-black tracking-[0.2em] text-[10px] uppercase shadow-[0_15px_40px_rgba(236,27,35,0.25)] hover:shadow-[0_15px_60px_rgba(236,27,35,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10"
        >
          {course.cta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      {mounted && course.detailsLink && typeof course.detailsLink === 'string' && course.detailsLink.length > 0 && (
        <Link 
          href={course.detailsLink} 
          className="mt-3 w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl font-black tracking-[0.2em] text-[10px] uppercase border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-prestige-gold/50 transition-all relative z-10"
        >
          {locale === 'bn' ? 'কোর্সের বিস্তারিত' : 'Course Details'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
      
      <div className="mt-6 text-center relative z-10">
        <Link 
          href="/faq" 
          className="text-prestige-gold/60 hover:text-prestige-gold text-[10px] font-extrabold uppercase tracking-[0.15em] transition-colors duration-300 inline-flex items-center gap-1.5 group/link"
        >
          <span>{locale === 'bn' ? 'সার্টিফিকেশন সম্পর্কে জানুন' : 'Learn about certifications'}</span>
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>

  );
};

export default CourseCard;
