import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

export const findAll = () =>
  query`SELECT * FROM "branches" ORDER BY branch_name ASC`;

export const findById = (id) =>
  query`SELECT * FROM "branches" WHERE id = ${id} LIMIT 1`.then((rows) => rows[0] || null);

export const create = (data) =>
  executeOne`
    INSERT INTO "branches" (branch_name, branch_name_bn, branch_code, address, contact_email, contact_phone, is_active)
    VALUES (${data.branch_name}, ${data.branch_name_bn || null}, ${data.branch_code}, ${data.address}, ${data.contact_email || null}, ${data.contact_phone || null}, ${data.is_active ?? true})
    RETURNING *
  `;

export const update = (id, data) =>
  executeOne`
    UPDATE "branches"
    SET branch_name = ${data.branch_name},
        branch_name_bn = ${data.branch_name_bn ?? null},
        branch_code = ${data.branch_code},
        address = ${data.address},
        contact_email = ${data.contact_email ?? null},
        contact_phone = ${data.contact_phone ?? null},
        is_active = ${data.is_active},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

export const remove = (id) =>
  execute`DELETE FROM "branches" WHERE id = ${id}`;
