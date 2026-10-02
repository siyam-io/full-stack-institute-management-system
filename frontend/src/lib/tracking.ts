// Placeholder for tracking logic (GTM, Meta CAPI, etc.)
export const pushToDataLayer = (event: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...data });
  }
};
