import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

export const findAll = () =>
  query`SELECT * FROM "roles" ORDER BY name ASC`;

export const findById = (id) =>
  query`SELECT * FROM "roles" WHERE id = ${id} LIMIT 1`.then((rows) => rows[0] || null);

export const create = (data) =>
  executeOne`
    INSERT INTO "roles" (name, description, permissions, is_system_role)
    VALUES (${data.name}, ${data.description || null}, ${data.permissions || "[]"}, ${data.is_system_role ?? false})
    RETURNING *
  `;

export const update = (id, data) =>
  executeOne`
    UPDATE "roles"
    SET name = ${data.name},
        description = ${data.description ?? null},
        permissions = ${data.permissions ?? "[]"},
        is_system_role = ${data.is_system_role ?? false},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

export const remove = (id) =>
  execute`DELETE FROM "roles" WHERE id = ${id}`;

export const countUsersWithRole = (id) =>
  query`SELECT COUNT(*) as count FROM "users" WHERE role_id = ${id}`.then((rows) => Number(rows[0]?.count ?? 0));
