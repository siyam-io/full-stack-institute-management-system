'use client';

import React from 'react';

interface WatermarkOverlayProps {
  opacity?: string;
  className?: string;
}

export default function WatermarkOverlay({ opacity = "opacity-30", className = "" }: WatermarkOverlayProps) {
  // Brand watermark disabled for clean white-label
  return null;
}
