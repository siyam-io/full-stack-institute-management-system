"use client";

import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, Check, Share2 } from 'lucide-react';

export default function BlogShareButtons({ title, locale }: { title: string, locale: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    if (navigator.share) {
      setCanShare(true);
    }
  }, []);

  const isBn = locale === 'bn';

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        url
      });
    } catch (err) {
      console.log('Share error', err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mt-16 pt-8 border-t border-white/10 relative z-10">
      <div className="w-full text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
        {isBn ? 'শেয়ার করুন' : 'Share this article'}
      </div>
      
      {canShare && (
        <button 
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-prestige-gold text-obsidian font-black hover:bg-white hover:text-obsidian transition-all shadow-[0_0_20px_rgba(202,152,73,0.3)] uppercase tracking-tight text-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>{isBn ? 'শেয়ার করুন' : 'Share'}</span>
        </button>
      )}
      
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-prestige-gold hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-prestige-gold hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </a>

      <a 
        href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-prestige-gold hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
        aria-label="Share on WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 21.037l-2.028-.016c-1.393-.01-2.73-.393-3.896-1.107L5.05 20.6l.666-1.077c-.77-1.196-1.182-2.585-1.185-4.015-.012-4.148 3.364-7.525 7.51-7.525 4.144 0 7.523 3.376 7.523 7.524 0 4.148-3.38 7.525-7.533 7.53zM12.03 9.482c-3.315 0-6.015 2.7-6.005 6.013.003 1.054.275 2.083.794 2.997l.156.27-1.002 1.623 1.583-.497.265.15c.894.507 1.905.772 2.942.773 3.313 0 6.015-2.698 6.015-6.013 0-3.315-2.7-6.014-6.014-6.014h-.002a6.004 6.004 0 0 0-2.735.656z" />
          <path d="M16.143 14.51c-.204-.102-1.205-.595-1.39-.664-.186-.068-.322-.102-.458.102-.136.204-.526.664-.645.8-.12.136-.238.153-.442.051-.204-.102-.86-.317-1.64-1.01-.606-.538-1.015-1.203-1.134-1.407-.12-.204-.013-.314.089-.416.09-.092.204-.238.306-.357.102-.12.136-.204.204-.34.068-.136.034-.255-.017-.357-.051-.102-.458-1.107-.628-1.515-.165-.395-.333-.34-.458-.346-.118-.006-.255-.008-.391-.008s-.357.051-.544.255c-.186.204-.713.697-.713 1.7 0 1.003.73 1.973.832 2.109.102.136 1.442 2.201 3.493 3.088.489.21.87.336 1.168.43.49.155.937.133 1.288.08.391-.059 1.205-.493 1.375-.97.17-.476.17-.884.12-1.004-.05-.12-.186-.187-.39-.289z" />
        </svg>
      </a>

      <button 
        onClick={handleCopy}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-prestige-gold hover:bg-white/20 transition-colors"
        aria-label="Copy Link"
        title="Copy Link"
      >
        {copied ? <Check className="w-5 h-5 text-green-400" /> : <LinkIcon className="w-5 h-5" />}
      </button>
    </div>
  );
}
