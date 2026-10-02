'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pushToDataLayer } from '@/lib/tracking/datalayer';

/**
 * Culinary Academy Route Change Tracker
 * Ensures SPA navigation events are captured in the data layer for GA4 and marketing pixels.
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip initial load as GTM container handles the first 'gtm.js' page view
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    pushToDataLayer('page_view', {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}
