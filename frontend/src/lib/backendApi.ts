/**
 * Backend API helper for fetching data from backendSQL
 * Falls back to null on failure so the caller can use static JSON content.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.SERVER_API_URL || "http://localhost:3043/api";

interface FetchOptions {
  locale?: string;
  revalidate?: number;
}

export async function fetchFromBackend<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  const { locale } = options;
  const basePath = BACKEND_URL.endsWith("/") ? BACKEND_URL.slice(0, -1) : BACKEND_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${basePath}${cleanPath}`);
  if (locale) url.searchParams.set("lang", locale);

  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.warn(`Backend API ${path} returned ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.warn(`Backend API ${path} failed:`, error);
    return null;
  }
}

export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  const basePath = BACKEND_URL.replace(/\/api\/?$/, "");
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${basePath}${cleanUrl}`;
}

export default fetchFromBackend;


