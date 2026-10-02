/**
 * Database Dialect Helper
 *
 * Provides SQL fragments that differ between database providers.
 * Import this in repositories to write provider-agnostic raw SQL.
 *
 * === SAFETY NOTE ===
 * The SQL fragment helpers below return raw SQL strings (e.g., "NOW()", "json_build_object(...)").
 * These strings come from trusted hardcoded values, never from user input.
 * When using in prisma.$queryRaw, you MUST wrap them via the `sql` tagged template
 * helper provided below, which uses prisma.$queryRawUnsafe internally.
 * This is the ONE approved use of $queryRawUnsafe — for trusted provider fragments only.
 *
 * Current primary: postgresql
 * Future: mysql support (documented, not yet active)
 */

import prisma from "./prisma.js";

export const dialect = process.env.DB_PROVIDER || "postgresql";

export const isPostgres = dialect === "postgresql";
export const isMysql = dialect === "mysql";
export const isSqlite = dialect === "sqlite";

// --- SQL Fragments ---

/** Current timestamp function */
export const now = () => {
  if (isMysql) return "NOW()";
  if (isSqlite) return "datetime('now')";
  return "NOW()"; // PostgreSQL
};

/** Case-insensitive search: column ILIKE pattern */
export const ilike = (column, pattern) => {
  if (isMysql) return `${column} LIKE ${pattern}`;
  if (isSqlite) return `LOWER(${column}) LIKE LOWER(${pattern})`;
  return `${column} ILIKE ${pattern}`; // PostgreSQL
};

/** JSON object builder: json_build_object / json_object / JSON_OBJECT */
export const jsonBuildObject = (pairs) => {
  if (isMysql) {
    const args = pairs.flatMap(([k, v]) => [`'${k}'`, v]).join(", ");
    return `JSON_OBJECT(${args})`;
  }
  if (isSqlite) {
    const args = pairs.flatMap(([k, v]) => [`'${k}'`, v]).join(", ");
    return `json_object(${args})`;
  }
  // PostgreSQL
  const args = pairs.flatMap(([k, v]) => [`'${k}'`, v]).join(", ");
  return `json_build_object(${args})`;
};

/** JSON array aggregator: json_agg / json_group_array / JSON_ARRAYAGG */
export const jsonAgg = (expr) => {
  if (isMysql) return `JSON_ARRAYAGG(${expr})`;
  if (isSqlite) return `json_group_array(${expr})`;
  return `json_agg(${expr})`; // PostgreSQL
};

/** Quote an identifier properly for the provider */
export const quoteIdent = (name) => {
  if (isMysql) return `\`${name}\``;
  return `"${name}"`; // PG and SQLite
};

// --- Stable SQL fragment APIs (provider-agnostic for common use) ---

/**
 * Returns a stable SQL NOW expression.
 * Use in template tags: ${nowSql}
 */
export const NOW = (() => {
  if (isMysql || isPostgres) return "NOW()";
  return "datetime('now')";
})();

/**
 * Build a json_object(...) alias fragment for use in template tags.
 * For PostgreSQL: json_build_object('key', col, ...)
 * For SQLite: json_object('key', col, ...)
 * For MySQL: JSON_OBJECT('key', col, ...)
 *
 * Usage in template:
 *   ${sql.jsonObject({ id: '"u"."id"', name: '"u"."full_name"' })} AS role
 * Returns: json_build_object('id', "u"."id", 'name', "u"."full_name") AS role
 */
export const jsonObject = (kv) => {
  let fn;
  if (isMysql) fn = "JSON_OBJECT";
  else if (isSqlite) fn = "json_object";
  else fn = "json_build_object";

  const args = Object.entries(kv)
    .flatMap(([k, v]) => [`'${k}'`, v])
    .join(", ");
  return `${fn}(${args})`;
};

/**
 * Build a json_agg(...) fragment.
 * For PostgreSQL: json_agg(expr)
 * For SQLite: json_group_array(expr)
 * For MySQL: JSON_ARRAYAGG(expr)
 */
export const jsonArrayAgg = (expr) => {
  if (isMysql) return `JSON_ARRAYAGG(${expr})`;
  if (isSqlite) return `json_group_array(${expr})`;
  return `json_agg(${expr})`;
};

/**
 * Build a RETURNING clause.
 * MySQL does NOT support RETURNING; use LAST_INSERT_ID() + separate SELECT.
 * PostgreSQL and SQLite 3.35+ support RETURNING.
 * For MySQL fallback: INSERT ... ; SELECT * FROM table WHERE id = LAST_INSERT_ID()
 * TODO: Implement MySQL fallback pattern in repositories when MySQL is activated.
 */
export const returning = (columns = "*") => {
  if (isMysql) return "";
  return `RETURNING ${columns}`;
};

/**
 * Build an ILIKE-compatible condition.
 * PostgreSQL: column ILIKE pattern
 * SQLite: LOWER(column) LIKE LOWER(pattern)
 * MySQL: column LIKE pattern (case-insensitive by default for most collations)
 */
export const caseInsensitiveLike = (column, patternPlaceholder) => {
  if (isPostgres) return `${column} ILIKE ${patternPlaceholder}`;
  if (isSqlite) return `LOWER(${column}) LIKE LOWER(${patternPlaceholder})`;
  return `${column} LIKE ${patternPlaceholder}`;
};

/**
 * Safe tagged template for trusted SQL fragments.
 * This wraps prisma.$queryRawUnsafe — the ONE approved exception per rawSqlAgent.md.
 * ONLY pass hardcoded provider fragments from this module; never user input.
 *
 * Usage:
 *   import { sql, jsonObject } from "../core/db/dialect.js";
 *   const rows = await sql`SELECT ${sql.raw(jsonObject({ id: '"u"."id"' }))} AS role FROM "User" u`;
 */
export const sql = (strings, ...values) => {
  return prisma.$queryRawUnsafe(
    String.raw({ raw: strings }, ...values)
  );
};

/** Attach a raw SQL fragment to the sql tagged template */
sql.raw = (fragment) => fragment;

/** Shorthand: prisma.$transaction with raw SQL support via tx.$queryRawUnsafe */
export const txSql = (tx) => (strings, ...values) => {
  return tx.$queryRawUnsafe(
    String.raw({ raw: strings }, ...values)
  );
};
