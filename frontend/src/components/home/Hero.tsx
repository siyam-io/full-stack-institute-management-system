'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BATCH_CONFIG } from '@/lib/courseConfig';
import { useLocale } from 'next-intl';

interface HeroSlide {
  image: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroProps {
  data: {
    slides: HeroSlide[];
    batchInfo?: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const locale = useLocale();

  const enrollingSlots = BATCH_CONFIG.slots.filter(s => s.status === 'enrolling');
  const enrollingNames = enrollingSlots.map(s => 
    locale === 'bn' ? s.labelBn.replace('ের ব্যাচ', '').replace(' ব্যাচ', '') : s.label.replace(' Batch', '')
  );
  
  const batchesText = enrollingNames.length > 0
    ? enrollingNames.slice(0, -1).join(', ') + (enrollingNames.length > 1 ? (locale === 'bn' ? ' ও ' : ' & ') : '') + enrollingNames[enrollingNames.length - 1]
    : '';

  const formattedBatchInfo = data.batchInfo ? data.batchInfo.replace('{batches}', batchesText) : '';

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[80vh] md:h-screen min-h-[600px] w-full overflow-hidden bg-obsidian">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {data.slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Background Image with optimized overlay */}
              <div className="absolute inset-0 z-0">
                {slide.image?.includes('-1920w.webp') ? (
                  <picture>
                    <source media="(max-width: 480px)" srcSet={slide.image.replace('-1920w.webp', '-480w.webp')} />
                    <source media="(max-width: 768px)" srcSet={slide.image.replace('-1920w.webp', '-768w.webp')} />
                    <source media="(max-width: 1280px)" srcSet={slide.image.replace('-1920w.webp', '-1280w.webp')} />
                    <img
                      src={slide.image}
                      alt={slide.headline || 'CIB Hero'}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </picture>
                ) : (
                  <img
                    src={slide.image || '/images/practical_class_1-1920w.webp'}
                    alt={slide.headline || 'CIB Hero'}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-black/20 to-black/50"></div>
              </div>

              {/* Content - Responsive Padding & Font Sizes */}
              <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 md:mb-12">
                    <span className="noir-chip text-white/70">
                      Premium Culinary Education
                    </span>
                    {formattedBatchInfo && (
                      <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        {formattedBatchInfo}
                      </span>
                    )}
                  </div>
                  
                  {index === 0 ? (
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] animate-slide-up text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
                      {slide.headline}
                    </h1>
                  ) : (
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] animate-slide-up text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
                      {slide.headline}
                    </h2>
                  )}
                  
                  <p className="text-lg md:text-xl text-white/70 mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed animate-slide-up [animation-delay:200ms]">
                    {slide.subheadline}
                  </p>

                  <div className="mt-8 md:mt-10 animate-slide-up [animation-delay:400ms] flex justify-center gap-4 flex-wrap">
                    <Link 
                      href={slide.ctaLink} 
                      className="shiny-cta group hover:scale-105 transition-all duration-500 inline-flex items-center justify-center text-white"
                    >
                      <span className="flex items-center gap-3">
                        {slide.ctaText}
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                    <Link 
                      href="/admission#apply" 
                      className="group px-8 py-4 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 font-medium hover:text-white hover:bg-zinc-800 transition-all duration-500 inline-flex items-center gap-3"
                    >
                      <span className="flex items-center gap-3">
                        Book Your Visit
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {data.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className="group relative p-2"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className={`h-2 transition-all duration-500 rounded-full ${
              selectedIndex === i ? 'w-10 bg-power-red' : 'w-2 bg-white/20 group-hover:bg-white/40'
            }`} />
          </button>
        ))}
      </div>

      {/* Side Arrows - Hidden on Mobile */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-8 pointer-events-none hidden md:flex">
        <button 
          onClick={scrollPrev}
          className="p-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-all pointer-events-auto"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={scrollNext}
          className="p-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-all pointer-events-auto"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-obsidian to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
