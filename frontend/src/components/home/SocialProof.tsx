'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Testimonial {
  name: string;
  batch: string;
  photo: string;
  quote: string;
}

interface PartnerLogo {
  src: string;
  alt: string;
}

interface SocialProofProps {
  data: {
    heading: string;
    partnerLogos: PartnerLogo[];
    testimonialsHeading: string;
    testimonials: Testimonial[];
  };
}

import { Quote } from 'lucide-react';

const SocialProof = ({ data }: SocialProofProps) => {
  // Carousel for Partner Logos
  const [emblaRefLogos] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  
  // Carousel for Testimonials
  const [emblaRefTestimonials] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 480px)" srcSet="/images/practical_class_2-480w.webp" />
          <source media="(max-width: 768px)" srcSet="/images/practical_class_2-768w.webp" />
          <source media="(max-width: 1280px)" srcSet="/images/practical_class_2-1280w.webp" />
          <img
            src="/images/practical_class_2-1920w.webp"
            alt="CIB Students Practicing"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="mb-40">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-8">
              {data.heading}
            </div>
            <div className="w-24 h-[1px] bg-white/10 mx-auto"></div>
          </div>
          
          <div className="overflow-hidden" ref={emblaRefLogos}>
            <div className="flex -ml-6">
              {[...data.partnerLogos, ...data.partnerLogos].map((logo, i) => (
                <div key={i} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-6 group">
                  <div className="glass-card relative h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden border border-white/10 transition-all duration-700 hover:border-power-red/50 shadow-2xl">
                    <picture>
                      <source media="(max-width: 480px)" srcSet={logo.src.replace('-1920w.webp', '-480w.webp')} />
                      <source media="(max-width: 768px)" srcSet={logo.src.replace('-1920w.webp', '-768w.webp')} />
                      <source media="(max-width: 1280px)" srcSet={logo.src.replace('-1920w.webp', '-1280w.webp')} />
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </picture>
                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80"></div>
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <h4 className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                        {logo.alt}
                      </h4>
                      <div className="w-12 h-1 bg-power-red rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-8">
              Institutional Testimony
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
              {data.testimonialsHeading}
            </h2>
            <div className="w-24 h-1 bg-power-red mx-auto rounded-full shadow-[0_0_20px_rgba(236,27,35,0.5)]"></div>
          </div>
          
          <div className="overflow-hidden" ref={emblaRefTestimonials}>
            <div className="flex -ml-8">
              {data.testimonials.map((testimonial, i) => (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-8">
                  <div className="glass-card p-5 md:p-6 rounded-[1.5rem] border border-white/5 h-full flex flex-col hover:bg-white/10 transition-all duration-1000 group relative overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] pointer-events-none"></div>

                    <div className="relative mb-8">
                      <Quote className="w-12 h-12 text-prestige-gold/10 absolute -top-8 -left-8 group-hover:text-prestige-gold/20 transition-all duration-1000 transform group-hover:-rotate-12" />
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed relative z-10 pt-4 group-hover:text-white transition-colors font-medium">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-4 pt-8 border-t border-white/5">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-white/5 group-hover:border-prestige-gold/30 shrink-0 shadow-2xl transition-all duration-1000 transform group-hover:rotate-6">
                        <Image 
                          src={testimonial.photo.includes('-768w.webp') ? testimonial.photo.replace('-768w.webp', '-480w.webp') : testimonial.photo} 
                          alt={testimonial.name} 
                          fill 
                          sizes="56px"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-black text-white text-base md:text-lg tracking-tighter group-hover:text-prestige-gold transition-colors">{testimonial.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="w-2 h-1 bg-power-red rounded-full shadow-[0_0_10px_rgba(236,27,35,0.5)]"></div>
                          <p className="text-[10px] text-gray-500 tracking-widest font-bold group-hover:text-gray-400 transition-colors uppercase">{testimonial.batch}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Hints */}
          <div className="flex justify-center gap-4 mt-20">
            {data.testimonials.map((_, i) => (
              <div key={i} className="h-1.5 w-12 rounded-full bg-white/5 group-hover:bg-power-red transition-all duration-1000"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
