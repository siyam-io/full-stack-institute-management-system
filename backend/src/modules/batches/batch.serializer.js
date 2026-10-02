import { serializeRecord } from "../../core/utils/serialize.js";

const parseJsonArray = (v) => { if (typeof v === "string") { try { const p = JSON.parse(v); if (Array.isArray(p)) return p; } catch {} } return v; };

export const serializeBatch = (batch) => {
  const obj = serializeRecord(batch);
  if (!obj) return obj;
  obj.scheduleDays = parseJsonArray(obj.scheduleDays || obj.schedule_days);
  obj.classTimeEn = obj.classTimeEn || obj.class_time_en || null;
  obj.batchNameBn = obj.batchNameBn || null;
  obj.classDaysBn = obj.classDaysBn || null;
  obj.classTimeBn = obj.classTimeBn || null;
  obj.durationEn = obj.durationEn || null;
  obj.durationBn = obj.durationBn || null;
  obj.totalClasses = obj.totalClasses || null;
  obj.badgeEn = obj.badgeEn || null;
  obj.badgeBn = obj.badgeBn || null;
  return obj;
};
