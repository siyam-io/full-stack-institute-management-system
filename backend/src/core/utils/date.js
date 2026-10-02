import { format, addDays, startOfDay } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const toISO = (date) => (date instanceof Date ? date.toISOString() : date);
export const toDate = (value) => (value ? new Date(value) : null);
export const nowISO = () => new Date().toISOString();

export const formatDate = (date, fmt = "yyyy-MM-dd") => format(date, fmt);
export const formatInDhaka = (date, fmt = "yyyy-MM-dd") => formatInTimeZone(date, "Asia/Dhaka", fmt);
export const addOneDay = (date) => addDays(date, 1);
export const dayStart = (date) => startOfDay(date);
