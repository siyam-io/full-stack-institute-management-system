import { pushToDataLayer } from './datalayer';

export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getOrCreateEventId(): string {
  if (typeof window === 'undefined') return generateEventId();
  const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
  const lastEvent = dataLayer[dataLayer.length - 1];
  if (lastEvent && lastEvent.event_id) {
    return lastEvent.event_id;
  }
  const newId = generateEventId();
  return newId;
}

export async function hashUserData(data: string): Promise<string> {
  if (!data) return '';
  const msgUint8 = new TextEncoder().encode(data.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return undefined;
}

export function getFbpAndFbc() {
  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc')
  };
}

export async function sendServerEvent(eventName: string, userData: any, customData?: any) {
  const event_id = getOrCreateEventId();
  const { fbp, fbc } = getFbpAndFbc();
  
  const hashedEmail = userData.email ? await hashUserData(userData.email) : undefined;
  const hashedPhone = userData.phone ? await hashUserData(userData.phone) : undefined;

  const payload = {
    event_name: eventName,
    event_id,
    user_data: {
      email_sha256: hashedEmail,
      phone_sha256: hashedPhone,
      fbp,
      fbc,
      client_user_agent: navigator.userAgent
    },
    custom_data: customData,
    event_source_url: window.location.href
  };

  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Failed to send server event', error);
  }
  return event_id;
}
