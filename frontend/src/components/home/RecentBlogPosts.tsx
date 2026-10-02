'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLocale } from 'next-intl';
import WatermarkOverlay from '../global/WatermarkOverlay';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  featuredImage: string;
}

interface RecentBlogPostsProps {
  posts: BlogPost[];
  data: {
    heading: string;
    subheading: string;
    viewAll: string;
  };
}

const RecentBlogPosts = ({ posts, data }: RecentBlogPostsProps) => {
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 }
      }
    }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-16 md:py-24 bg-obsidian overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {data.heading}
          </h2>
          <p className="text-base text-gray-400 mt-2">
            {data.subheading}
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {posts.map((post) => (
                <div 
                  key={post.slug} 
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="glass-card p-4 rounded-2xl hover:scale-[1.02] transition-transform cursor-pointer h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                          className="object-cover"
                        />
                        
                        <WatermarkOverlay opacity="opacity-30 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="absolute inset-0 bg-black/20"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-accent-red text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-grow mt-4">
                        <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-2">
                          {post.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="group relative p-2"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedIndex === index ? 'w-8 bg-accent-red' : 'w-2 bg-white/20 group-hover:bg-white/40'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/blog" 
            className="btn-outline inline-block"
          >
            {data.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
