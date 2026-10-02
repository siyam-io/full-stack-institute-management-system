'use client';

import React, { useState } from 'react';
import BlogCard from './BlogCard';

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  featuredImage: string;
}

interface FilteredBlogGridProps {
  posts: Post[];
  locale: string;
}

const CATEGORIES_MAP: Record<string, { en: string; bn: string }> = {
  all: { en: 'All', bn: 'সব পোস্ট' },
  career: { en: 'Chef Career Path', bn: 'শেফ ক্যারিয়ার' },
  business: { en: 'Food Business', bn: 'ফুড বিজনেস' },
  skills: { en: 'Culinary Skills', bn: 'কালিনারি স্কিলস' },
  life: { en: 'Culinary Academy Life', bn: 'কালিনারি একাডেমি লাইফ' },
  ai: { en: 'AI/Ask Engine Focus', bn: 'এআই সার্চ ফোকাস' }
};

export default function FilteredBlogGrid({ posts, locale }: FilteredBlogGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleFilterChange = (filterKey: string) => {
    setSelectedFilter(filterKey);
  };

  const getFilteredPosts = () => {
    if (selectedFilter === 'all') return posts;

    return posts.filter(post => {
      const category = post.category || '';
      
      switch (selectedFilter) {
        case 'career':
          return category === 'Chef Career Path' || category === 'Chef Course';
        case 'business':
          return category === 'Food Business' || category === 'Food Business & Entrepreneurship';
        case 'skills':
          return category === 'Culinary Skills';
        case 'life':
          return category === 'Culinary Academy Life';
        case 'ai':
          return category === 'AI/Ask Engine Focus';
        default:
          return true;
      }
    });
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="space-y-12">
      {/* Category Pills Container */}
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-4xl mx-auto px-4">
        {Object.entries(CATEGORIES_MAP).map(([key, labelObj]) => {
          const isActive = selectedFilter === key;
          const label = locale === 'bn' ? labelObj.bn : labelObj.en;
          
          return (
            <button
              key={key}
              onClick={() => handleFilterChange(key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-500 border ${
                isActive
                  ? 'bg-power-red text-white border-power-red shadow-[0_0_20px_rgba(236,27,35,0.4)]'
                  : 'bg-white/[0.02] text-white/70 border-white/5 hover:border-prestige-gold/50 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <div 
                key={post.slug} 
                className="animate-fade-in" 
                style={{ animationDelay: `${(i % 6) * 100}ms` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 glass-card rounded-[2rem] border border-white/5 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              {locale === 'bn' ? 'কোনো পোস্ট পাওয়া যায়নি' : 'No Insights Found'}
            </h2>
            <p className="text-gray-400">
              {locale === 'bn' 
                ? 'এই ক্যাটাগরিতে নতুন পোস্ট খুব শীঘ্রই আসছে।' 
                : 'Check back soon for fresh culinary perspectives in this category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
