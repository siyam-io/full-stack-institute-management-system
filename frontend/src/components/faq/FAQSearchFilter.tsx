"use client";

import React, { useState, useMemo } from 'react';
import { Search, GraduationCap, BookOpen, Briefcase, MessageSquare, HelpCircle } from 'lucide-react';
import FAQAccordion from '@/components/faq/FAQAccordion';

const getCategoryIcon = (categoryName: string) => {
  const lower = categoryName.toLowerCase();
  if (lower.includes('course') || lower.includes('কোর্স') || lower.includes('curriculum')) {
    return <BookOpen className="w-6 h-6 text-white" />;
  }
  if (lower.includes('admission') || lower.includes('ভর্তি') || lower.includes('enroll')) {
    return <GraduationCap className="w-6 h-6 text-white" />;
  }
  if (lower.includes('career') || lower.includes('চাকরি') || lower.includes('placement')) {
    return <Briefcase className="w-6 h-6 text-white" />;
  }
  if (lower.includes('voice') || lower.includes('কণ্ঠ') || lower.includes('conversation')) {
    return <MessageSquare className="w-6 h-6 text-white" />;
  }
  return <HelpCircle className="w-6 h-6 text-white" />;
};

interface FAQ {
  question: string;
  fullAnswer: string;
}

interface FAQCategory {
  category: string;
  faqs: FAQ[];
}

export default function FAQSearchFilter({ categories, locale = 'en' }: { categories: FAQCategory[], locale?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');
  
  const isBn = locale === 'bn';

  const allTabName = isBn ? 'সব' : 'All';

  // Filter logic
  const filteredCategories = useMemo(() => {
    return categories.map(cat => {
      // 1. Filter by category tab
      if (activeTab !== 'All' && activeTab !== allTabName && cat.category !== activeTab) {
        return { ...cat, faqs: [] };
      }
      
      // 2. Filter by search query
      if (!searchQuery.trim()) {
        return cat;
      }

      const q = searchQuery.toLowerCase();
      const matchedFaqs = cat.faqs.filter(faq => 
        faq.question.toLowerCase().includes(q) || 
        faq.fullAnswer.toLowerCase().includes(q)
      );
      
      return { ...cat, faqs: matchedFaqs };
    }).filter(cat => cat.faqs.length > 0);
  }, [categories, searchQuery, activeTab, allTabName]);

  return (
    <div className="w-full">
      <div className="mb-12 flex flex-col items-center gap-8">
        {/* Search Input */}
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={isBn ? 'আপনার প্রশ্ন খুঁজুন...' : 'Search for questions...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-prestige-gold/50 focus:ring-1 focus:ring-prestige-gold/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)] text-lg"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-6 py-2.5 rounded-full font-bold transition-all ${activeTab === 'All' || activeTab === allTabName ? 'bg-prestige-gold text-obsidian shadow-[0_0_15px_rgba(202,152,73,0.4)]' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
          >
            {allTabName}
          </button>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(cat.category)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all ${activeTab === cat.category ? 'bg-prestige-gold text-obsidian shadow-[0_0_15px_rgba(202,152,73,0.4)]' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-24">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-6 mb-12 group">
                <div className="w-12 h-12 rounded-xl bg-power-red flex items-center justify-center text-white shadow-[0_15px_40px_rgba(236,27,35,0.3)] transform group-hover:rotate-12 transition-transform duration-700">
                  {getCategoryIcon(cat.category)}
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase">
                  {cat.category}
                </h2>
              </div>
              <FAQAccordion faqs={cat.faqs} />
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {isBn ? 'কোনো ফলাফল পাওয়া যায়নি।' : 'No results found.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
