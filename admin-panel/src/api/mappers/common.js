/**
 * Common Mapper Utilities
 *
 * Used by entity mappers to normalize backend data into UI-ready shapes.
 * Works with both old Mongo shapes (_id) and new SQL shapes (id).
 */

/**
 * Extract a stable ID from any shape.
 * Priority: item.id → item._id → item (if string)
 */
export const getId = (item) => {
  if (!item) return undefined;
  if (typeof item === "string") return item;
  return item.id || item._id;
};

/**
 * Build a full image URL from a relative upload path.
 * Use VITE_IMAGE_URL from env or fall back to the hardcoded base.
 */
export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = import.meta.env?.VITE_IMAGE_URL || "http://localhost:3043";
  return `${base}${path}`;
};

/**
 * Ensure a value is a number (from Decimal, string, or already number).
 */
export const toNumber = (value) => Number(value || 0);

/**
 * Ensure a value is an ISO date string from a Date or string.
 */
export const toDateStr = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return value;
};

/**
 * Parse a JSON array stored as string (from SQLite/PostgreSQL JSON columns).
 */
export const parseJsonArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch { /* not JSON */ }
  }
  return [];
};
