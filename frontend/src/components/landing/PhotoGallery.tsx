'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { courseData } from './courseData';
import useScrollReveal from '@/hooks/useScrollReveal';

const toSlug = (filename: string) => {
  const parts = filename.split('/');
  const name = parts[parts.length - 1];
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/-\d+w$/, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

function GalleryPicture({ src, alt, className, maxWidth = '768' }: { src: string, alt: string, className?: string, maxWidth?: string }) {
  const slug = toSlug(src);
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/images/${slug}-${maxWidth}w.webp`}
      />
      {/* We use a fallback img that will just fail gracefully or load if we copy the original images to public/images */}
      <img
        src={`/images/${slug}-${maxWidth}w.webp`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

export default function PhotoGallery() {
  const { ref, isVisible } = useScrollReveal();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const openLightbox = (idx: number) => {
    setCurrentImageIdx(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % courseData.galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + courseData.galleryImages.length) % courseData.galleryImages.length);
  };

  return (
    <section id="gallery" className="py-16 md:py-28 bg-obsidian relative overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prestige-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12 md:mb-20">
            <span className="text-prestige-gold font-bold tracking-widest text-sm uppercase mb-4 block">Our Campus & Culture</span>
            <h2 className="font-bengali text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
              আমাদের <span className="gold-gradient-text">গ্যালারি</span>
            </h2>
            <p className="font-bengali text-white/60 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              CIB-তে শিক্ষার্থীদের হাতে-কলমে শিক্ষা এবং উৎসবমুখর পরিবেশের কিছু স্থিরচিত্র।
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {courseData.galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 hover:border-prestige-gold/30 hover:shadow-prestige-gold/5"
                onClick={() => openLightbox(idx)}
              >
                <GalleryPicture
                  src={img.src}
                  alt={img.caption}
                  maxWidth="768"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <div className="bg-white/5 backdrop-blur-md p-4 w-full border border-white/10 rounded-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-bengali text-sm md:text-base font-bold text-center">
                      {img.caption}
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-prestige-gold p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 shadow-xl">
                  <svg className="w-4 h-4 text-obsidian" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-obsidian/98 backdrop-blur-2xl flex flex-col items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-prestige-gold transition-all duration-300 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 z-[110]"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button 
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-prestige-gold p-6 transition-all duration-300 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 group"
            onClick={prevImage}
          >
            <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative group p-2 md:p-4 bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl max-w-[95vw] max-h-[85vh] overflow-hidden">
             <GalleryPicture
               src={courseData.galleryImages[currentImageIdx].src}
               alt={courseData.galleryImages[currentImageIdx].caption}
               maxWidth="1280"
               className="max-h-[75vh] w-auto object-contain rounded-2xl animate-fade-up"
             />
          </div>

          <button 
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-prestige-gold p-6 transition-all duration-300 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 group"
            onClick={nextImage}
          >
            <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-8 md:bottom-12 left-0 right-0 text-center px-4 md:px-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl inline-block px-6 md:px-8 py-3 md:py-4">
              <p className="text-white font-bengali text-lg md:text-2xl font-black drop-shadow-lg gold-gradient-text">
                {courseData.galleryImages[currentImageIdx].caption}
              </p>
              <p className="text-white/40 font-english mt-1 md:mt-2 tracking-[0.3em] uppercase text-[10px] md:text-xs font-black">
                Image {currentImageIdx + 1} / {courseData.galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
