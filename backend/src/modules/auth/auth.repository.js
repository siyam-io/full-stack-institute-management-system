import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

// === AUTH / LOGIN ===

export const findUserByEmail = async (email) => {
  const rows = await query`
    SELECT
      u.*, u.password_hash AS "password",
      json_build_object('id', r.id, 'name', r.name, 'description', r.description,
                        'permissions', r.permissions, 'is_system_role', r.is_system_role,
                        'created_at', r.created_at, 'updated_at', r.updated_at) AS role,
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code,
                        'address', b.address, 'contact_email', b.contact_email,
                        'contact_phone', b.contact_phone, 'is_active', b.is_active,
                        'created_at', b.created_at, 'updated_at', b.updated_at) AS branch
    FROM "users" u
    JOIN "roles" r ON r.id = u.role_id
    JOIN "branches" b ON b.id = u.branch_id
    WHERE LOWER(u.email) = LOWER(${email})
    LIMIT 1
  `;
  return rows[0] || null;
};

export const findUserById = async (id) => {
  const rows = await query`
    SELECT
      u.*, u.password_hash AS "password",
      json_build_object('id', r.id, 'name', r.name, 'description', r.description,
                        'permissions', r.permissions, 'is_system_role', r.is_system_role,
                        'created_at', r.created_at, 'updated_at', r.updated_at) AS role,
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code,
                        'address', b.address, 'contact_email', b.contact_email,
                        'contact_phone', b.contact_phone, 'is_active', b.is_active,
                        'created_at', b.created_at, 'updated_at', b.updated_at) AS branch
    FROM "users" u
    JOIN "roles" r ON r.id = u.role_id
    JOIN "branches" b ON b.id = u.branch_id
    WHERE u.id = CAST(${id} AS uuid)
    LIMIT 1
  `;
  return rows[0] || null;
};

export const findUserByResetToken = async (hashedToken) => {
  const rows = await query`
    SELECT *, password_hash AS "password" FROM "users"
    WHERE reset_password_token = ${hashedToken}
      AND reset_password_expire > NOW()
    LIMIT 1
  `;
  return rows[0] || null;
};

export const createUser = async (data) => {
  const rows = await query`
    INSERT INTO "users" (
      username, email, password_hash, employee_id, full_name,
      photo_url, phone, designation, department, joining_date,
      status, facebook, linkedin, twitter, instagram, custom,
      role_id, branch_id
    )
    VALUES (
      ${data.username}, ${data.email}, ${data.password}, ${data.employee_id || null}, ${data.full_name},
      ${data.photo_url || ""}, ${data.phone || null}, ${data.designation || "Staff"}, ${data.department || "General"}, ${data.joining_date || new Date().toISOString()},
      ${data.status || "Active"}, ${data.facebook || ""}, ${data.linkedin || ""}, ${data.twitter || ""}, ${data.instagram || ""}, ${data.custom || ""},
      ${data.role_id}, ${data.branch_id}
    )
    RETURNING id
  `;
  if (rows[0]) return findUserById(rows[0].id);
  return null;
};

export const updateUser = async (id, data) => {
  await execute`
    UPDATE "users"
    SET reset_password_token = ${data.reset_password_token ?? null},
        reset_password_expire = ${data.reset_password_expire ?? null},
        password_hash = COALESCE(${data.password ?? null}, password_hash),
        updated_at = NOW()
    WHERE id = CAST(${id} AS uuid)
  `;
  return findUserById(id);
};

export const findRoleByName = async (name) => {
  const rows = await query`
    SELECT * FROM "roles" WHERE LOWER(name) = LOWER(${name}) LIMIT 1
  `;
  return rows[0] || null;
};

export const checkDuplicateUser = async (email, username, employeeId) => {
  const rows = await query`
    SELECT * FROM "users"
    WHERE LOWER(email) = LOWER(${email})
       OR LOWER(username) = LOWER(${username})
       OR (${employeeId || null} IS NOT NULL AND employee_id = ${employeeId || null})
    LIMIT 1
  `;
  return rows[0] || null;
};
