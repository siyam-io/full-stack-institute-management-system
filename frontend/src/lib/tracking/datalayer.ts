/**
 * CIB Unified Data Layer
 * Institutional tracking infrastructure for the 2026 production rollout.
 */

export function pushToDataLayer(eventName: string, params?: Record<string, any>): string {
  if (typeof window === 'undefined') return '';

  // Generate a unique event ID for deduplication (Meta CAPI, GA4, etc.)
  const eventId = typeof crypto !== 'undefined' && crypto.randomUUID 
    ? crypto.randomUUID() 
    : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
  
  dataLayer.push({
    event: eventName,
    event_id: eventId,
    ...params,
    timestamp: new Date().toISOString(),
  });

  return eventId;
}

/**
 * Helper: Track Content View (GA4: view_item)
 */
export function trackViewContent(courseName: string, courseId: string) {
  pushToDataLayer('view_item', {
    currency: 'BDT',
    value: 44000, // Default price for conversion tracking
    items: [{
      item_id: courseId,
      item_name: courseName,
      item_category: 'Culinary Course',
    }]
  });
}

/**
 * Helper: Track Lead Generation (GA4: generate_lead)
 */
export function trackLead(leadType: 'application' | 'contact' | 'inquiry') {
  pushToDataLayer('generate_lead', {
    lead_type: leadType,
    source: 'web_form',
  });
}

/**
 * Helper: Track Search Term (GA4: view_search_results)
 */
export function trackSearch(term: string) {
  pushToDataLayer('view_search_results', {
    search_term: term,
  });
}

/**
 * Helper: Track Click Events
 */
export function trackClick(elementName: string, elementLocation: string) {
  pushToDataLayer('click_event', {
    element_name: elementName,
    element_location: elementLocation,
  });
}
/**
 * Helper: Track Phone Call Click
 */
export function trackPhoneCall() {
  pushToDataLayer('phone_call', {
    action: 'click_to_call',
    location: 'sticky_bar'
  });
}

/**
 * Helper: Track WhatsApp Click
 */
export function trackWhatsApp() {
  pushToDataLayer('whatsapp_click', {
    action: 'click_to_whatsapp',
    location: 'sticky_bar'
  });
}
