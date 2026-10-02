/**
 * Application Constants
 *
 * Uses Vite env vars (VITE_* prefix) when available,
 * falls back to hardcoded defaults for development.
 *
 * Add a .env file in web2/ to override:
 *   VITE_API_URL=http://localhost:3043/api
 *   VITE_IMAGE_URL=http://localhost:3043
 */

export const apiURL = {
  // API base URL (used by axios)
  api_url: import.meta.env.VITE_API_URL || "https://backend-jade-three-35.vercel.app/api",

  // Image/storage base URL (used for upload paths)
  image_url: import.meta.env.VITE_IMAGE_URL || "https://backend-jade-three-35.vercel.app",

  // Frontend URL (used for links in emails, QR codes, public site images)
  fontend_url: import.meta.env.VITE_FRONTEND_URL || import.meta.env.VITE_FONTEND_URL || "https://frontend-alpha-one-4xdf3qqzp0.vercel.app",

  // Main site URL
  main_url: import.meta.env.VITE_MAIN_URL || "https://frontend-alpha-one-4xdf3qqzp0.vercel.app",
};
