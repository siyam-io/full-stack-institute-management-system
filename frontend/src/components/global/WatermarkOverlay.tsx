'use client';

import React from 'react';
import Image from 'next/image';

interface WatermarkOverlayProps {
  opacity?: string;
  className?: string;
}

export default function WatermarkOverlay({ opacity = "opacity-30", className = "" }: WatermarkOverlayProps) {
  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${className}`}>
      <Image 
        src="/images/cib-watermark-overlay.png" 
        alt="" 
        fill 
        className={`object-cover ${opacity}`}
        loading="lazy"
      />
    </div>
  );
}
