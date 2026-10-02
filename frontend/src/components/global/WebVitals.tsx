'use client';

import { useEffect } from 'react';
import { onLCP, onCLS, onFCP, onINP, Metric } from 'web-vitals';

const WebVitals = () => {
  useEffect(() => {
    const sendToAnalytics = (metric: Metric) => {
      // @ts-ignore
      if (typeof window.gtag === 'function') {
        // @ts-ignore
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_label: metric.id,
          non_interaction: true,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[WebVitals] ${metric.name}:`, metric.value);
      }
    };

    onLCP(sendToAnalytics);
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
  }, []);

  return null;
};

export default WebVitals;
