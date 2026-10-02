'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import WatermarkOverlay from '../global/WatermarkOverlay';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    date: string;
    author: string;
    category: string;
    excerpt: string;
    featuredImage: string;
  };
}

import { ArrowRight } from 'lucide-react';

const BlogCard = ({ post }: BlogCardProps) => {
  const locale = useLocale();

  return (
    <Link 
      href={`/${locale}/blog/${post.slug}`}
      className="group glass-card rounded-[1.5rem] overflow-hidden hover:bg-white/10 transition-all duration-700 hover:-translate-y-2 border border-white/5 flex flex-col h-full shadow-2xl relative"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          loading="lazy"
          className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] grayscale group-hover:grayscale-0"
        />
        
        <WatermarkOverlay opacity="opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />

        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000"></div>
        <div className="absolute top-6 left-6 z-20">
          <span className="bg-power-red/90 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 uppercase">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-6 font-black tracking-widest bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5 uppercase">
          <span>{post.date}</span>
          <div className="w-1 h-1 bg-prestige-gold rounded-full opacity-50"></div>
          <span>{post.author}</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-black text-white mb-6 leading-[1.2] group-hover:text-prestige-gold transition-colors duration-500 tracking-tighter uppercase">
          {post.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center text-prestige-gold font-bold text-[10px] tracking-widest group-hover:gap-4 transition-all duration-500">
            Read More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
          </div>
          <div className="w-12 h-[1px] bg-white/10 group-hover:w-24 group-hover:bg-prestige-gold/50 transition-all duration-700"></div>
        </div>
      </div>

      {/* Hover accent */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-prestige-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top"></div>
    </Link>
  );
};

export default BlogCard;
