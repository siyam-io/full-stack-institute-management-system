'use client';

import { GoogleTagManager } from '@next/third-parties/google';

export default function GTMTracker({ gtmId }: { gtmId: string }) {
  return <GoogleTagManager gtmId={gtmId} />;
}
