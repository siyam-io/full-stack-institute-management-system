'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface GalleryGridProps {
  categories: string[];
  images: GalleryImage[];
}

const GalleryGrid = ({ categories, images }: GalleryGridProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [index, setIndex] = useState(-1);

  const filteredImages = activeCategory === categories[0] 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const slides = filteredImages.map(img => ({ src: img.src, alt: img.alt }));

  return (
    <section className="relative py-16 md:py-24 bg-obsidian overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_2-1920w.webp"
          alt="Visual Archive"
          fill
          className="object-cover opacity-5 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 animate-fade-in">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl font-bold tracking-widest text-[10px] transition-all duration-700 border relative overflow-hidden group ${
                activeCategory === cat 
                  ? 'bg-power-red border-power-red text-white shadow-[0_20px_50px_rgba(236,27,35,0.3)]' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:border-prestige-gold/50 hover:text-white'
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              )}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredImages.map((img, i) => (
            <div 
              key={i} 
              className="relative rounded-[1.5rem] overflow-hidden cursor-pointer group break-inside-avoid border border-white/5 shadow-2xl animate-fade-in bg-white/5"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => setIndex(i)}
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000"></div>
                
                {/* Visual Accent */}
                <div className="absolute inset-0 border-[8px] border-white/0 group-hover:border-white/5 transition-all duration-1000 pointer-events-none rounded-[1.5rem]"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100">
                <div className="p-6 bg-power-red/90 backdrop-blur-xl rounded-full text-white shadow-2xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-700 border border-white/10">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <div className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white text-[10px] font-bold tracking-widest">
                  View Masterpiece
                </div>
              </div>

              {/* Categorical Metadata */}
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 flex justify-between items-center">
                <span className="px-5 py-2 bg-prestige-gold text-obsidian text-[10px] font-bold tracking-widest rounded-lg shadow-2xl">
                  {img.category}
                </span>
                <span className="text-white/40 text-[10px] font-bold tracking-widest">
                  CIB-A{i+100}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Lightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={slides}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .95)" } }}
        />
      </div>
    </section>
  );
};

export default GalleryGrid;
