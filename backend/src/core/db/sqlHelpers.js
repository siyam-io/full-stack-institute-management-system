/**
 * SQL Helper Utilities
 * For building raw SQL queries and processing results.
 * SQLite-specific: LIKE is case-insensitive for ASCII by default,
 * datetime('now') for current time, JSON functions for relations.
 */

import { Prisma } from "@prisma/client";
import prisma from "./prisma.js";

// --- Query Execution Helpers ---

/** Execute a SELECT query and return rows */
export const query = (strings, ...values) => {
  if (strings && strings.strings && strings.values) {
    return prisma.$queryRaw(strings);
  }
  return prisma.$queryRaw(Prisma.sql(strings, ...values));
};
query.raw = Prisma.raw;

/** Execute an INSERT/UPDATE/DELETE, return first row via RETURNING */
export const executeOne = (strings, ...values) => {
  if (strings && strings.strings && strings.values) {
    return prisma.$queryRaw(strings).then((rows) => rows[0] || null);
  }
  return prisma.$queryRaw(Prisma.sql(strings, ...values)).then((rows) => rows[0] || null);
};

/** Execute an INSERT/UPDATE/DELETE, return affected count */
export const execute = (strings, ...values) => {
  if (strings && strings.strings && strings.values) {
    return prisma.$executeRaw(strings);
  }
  return prisma.$executeRaw(Prisma.sql(strings, ...values));
};

// --- Relation Extraction ---

/** Extract foreign key from Prisma connect syntax: {connect:{id:"x"}} → "x", or from string/object */
export const extractFk = (value) => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (value.connect?.id) return value.connect.id;
  if (value.id) return value.id;
  if (value._id) return value._id;
  return undefined;
};

// --- WHERE Clause Builder ---

/**
 * Build a simple WHERE clause from a flat filter object.
 * Supports: equality, string contains, OR array, date range ({gte, lte}), IN array, not-null.
 * Returns { clause: "WHERE ...", params: [...] }
 */
export const buildWhere = (filters) => {
  const conditions = [];
  const params = [];

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null) continue;

    if (key === "OR" && Array.isArray(value)) {
      const orParts = [];
      for (const orCond of value) {
        const [orKey, orVal] = Object.entries(orCond)[0];
        if (orVal === undefined || orVal === null) continue;
        if (typeof orVal === "object" && orVal.contains) {
          orParts.push(`LOWER("${orKey}") LIKE LOWER('%' || ? || '%')`);
          params.push(orVal.contains);
        } else if (typeof orVal === "object" && orVal.in && Array.isArray(orVal.in)) {
          const placeholders = orVal.in.map(() => "?").join(", ");
          orParts.push(`"${orKey}" IN (${placeholders})`);
          params.push(...orVal.in);
        } else {
          orParts.push(`"${orKey}" = ?`);
          params.push(orVal);
        }
      }
      if (orParts.length) conditions.push(`(${orParts.join(" OR ")})`);
    } else if (typeof value === "object" && !Array.isArray(value)) {
      if (value.gte !== undefined) {
        conditions.push(`"${key}" >= ?`);
        params.push(value.gte instanceof Date ? value.gte.toISOString() : value.gte);
      }
      if (value.lte !== undefined) {
        conditions.push(`"${key}" <= ?`);
        params.push(value.lte instanceof Date ? value.lte.toISOString() : value.lte);
      }
      if (value.in && Array.isArray(value.in)) {
        const placeholders = value.in.map(() => "?").join(", ");
        conditions.push(`"${key}" IN (${placeholders})`);
        params.push(...value.in);
      }
      if (value.not === null) {
        conditions.push(`"${key}" IS NOT NULL`);
      }
      if (value.contains) {
        conditions.push(`LOWER("${key}") LIKE LOWER('%' || ? || '%')`);
        params.push(value.contains);
      }
    } else {
      conditions.push(`"${key}" = ?`);
      params.push(value);
    }
  }

  return {
    clause: conditions.length ? `WHERE ${conditions.join(" AND ")}` : "",
    params,
  };
};

// --- Order By Builder ---

/**
 * Build ORDER BY from a whitelist object.
 * @param {object} orderBy - e.g., { createdAt: "desc" } or { course_name: "asc" }
 * @param {object} whitelist - e.g., { createdAt: '"createdAt"', name: '"course_name"' }
 * @param {string} fallback - default column if not in whitelist
 */
export const buildOrderBy = (orderBy, whitelist, fallback = '"created_at" DESC') => {
  if (!orderBy) return `ORDER BY ${fallback}`;
  const parts = [];
  for (const [key, dir] of Object.entries(orderBy)) {
    const col = whitelist[key];
    if (col) parts.push(`${col} ${dir === "desc" ? "DESC" : "ASC"}`);
  }
  return parts.length ? `ORDER BY ${parts.join(", ")}` : `ORDER BY ${fallback}`;
};

// --- Result Nesting ---

/**
 * Nest a flat row with dotted keys (e.g., "role.id") into nested objects.
 * Parses JSON strings from SQLite json_object() / json_group_array().
 */
export const nestResult = (row) => {
  if (!row) return row;
  const result = {};
  for (const [key, value] of Object.entries(row)) {
    // Check if value is a JSON string from json_object/json_group_array
    let parsed = value;
    if (typeof value === "string" && (value.startsWith("{") || value.startsWith("["))) {
      try { parsed = JSON.parse(value); } catch { /* not JSON */ }
    }
    const parts = key.split(".");
    if (parts.length === 1) {
      result[key] = parsed;
    } else {
      let current = result;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = parsed;
    }
  }
  return result;
};

/** Apply nestResult to an array of rows */
export const nestResults = (rows) => rows.map(nestResult);

// --- Pagination ---

export const paginationParams = (page, limit) => {
  const p = Math.max(1, parseInt(page) || 1);
  const l = Math.min(100, parseInt(limit) || 30);
  return { page: p, limit: l, skip: (p - 1) * l };
};

// --- SQLite Date Helpers ---

export const sqlNow = "datetime('now')";
export const dateParam = (d) => (d instanceof Date ? d.toISOString() : d);
