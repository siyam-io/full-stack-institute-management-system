'use client';

import React, { useState, useEffect } from 'react';

/**
 * Culinary Academy Privacy & Consent Orchestrator
 * Implements GTM Consent Mode V2 (EU/Global standards) for the 2026 launch.
 */
export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cib_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (status: 'granted' | 'denied') => {
    // Update GTM Consent Mode
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': status,
        'analytics_storage': status,
        'ad_user_data': status,
        'ad_personalization': status,
      });
    }

    localStorage.setItem('cib_consent', status);
    setIsVisible(false);

    // If granted, we can also trigger a custom event to notify GTM
    if (status === 'granted' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'consent_granted' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] animate-fade-in">
      <div className="max-w-[320px] bg-obsidian/95 border border-white/10 shadow-2xl rounded-2xl p-5 flex flex-col gap-4 backdrop-blur-xl">
        <div className="text-left">
          <p className="text-white text-[11px] font-medium leading-relaxed">
            We use cookies to optimize your experience and track training ROI. 
            <span className="text-gray-400 block mt-1">By accepting, you help us improve our vocational programs.</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0 w-full">
          <button 
            onClick={() => handleConsent('denied')}
            className="flex-1 text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors py-2 border border-white/5 rounded-lg"
          >
            Reject
          </button>
          <button 
            onClick={() => handleConsent('granted')}
            className="flex-1 bg-power-red hover:bg-[#c81018] text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
