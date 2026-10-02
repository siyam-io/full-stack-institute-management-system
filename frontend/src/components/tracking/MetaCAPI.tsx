'use client';

import { useEffect } from 'react';

export default function MetaCAPI() {
  useEffect(() => {
    // Client-side Meta Pixel initialization (fallback/redundancy)
    // Actual CAPI usually happens on the server via events
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  return null;
}
