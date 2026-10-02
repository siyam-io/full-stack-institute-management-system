/**
 * Serialization Layer
 * Automatically converts raw SQL database records (snake_case)
 * to clean API contract shapes (camelCase) and strips Mongo-specific keys like _id.
 */

export const toPlain = (value) => {
  if (value === null || value === undefined) return value;
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && typeof value.toNumber === "function") return value.toNumber();
  if (Array.isArray(value)) return value.map(toPlain);
  
  if (typeof value === "object") {
    // Parse SQLite JSON object strings if any remain
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, toPlain(v)])
    );
  }
  
  if (typeof value === "string") {
    const trimmed = value.trim();
    if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && (trimmed.endsWith("}") || trimmed.endsWith("]"))) {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "object") return toPlain(parsed);
      } catch {
        // Return string as-is
      }
    }
  }
  return value;
};

/**
 * Recursively converts object keys from snake_case to camelCase
 * and deletes any Mongo '_id' properties.
 */
export const serializeRecord = (record) => {
  if (record === null || record === undefined) return record;
  
  const plain = toPlain(record);
  if (Array.isArray(plain)) {
    return plain.map(serializeRecord);
  }
  
  if (typeof plain === "object") {
    const camelObj = {};
    for (const [key, val] of Object.entries(plain)) {
      if (key === "_id") continue; // drop MongoDB _id
      
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      camelObj[camelKey] = serializeRecord(val);
    }
    return camelObj;
  }
  
  return plain;
};

// Map original export names to the new SQL-native serialization function
export const withMongoId = serializeRecord;
export const serializeRole = serializeRecord;
export const serializeBranch = serializeRecord;
export const serializeCourse = serializeRecord;
export const serializeUser = serializeRecord;
export const serializeBatch = serializeRecord;
export const serializeStudent = serializeRecord;
export const serializeFee = serializeRecord;
export const serializePayment = serializeRecord;
export const serializeClassContent = serializeRecord;
export const serializeComment = serializeRecord;

