import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";
import prisma from "../../core/db/prisma.js";

export const findUsers = (filters = {}) => {
  const { branchId, roleId, status, search, limit, skip } = filters;
  return query`
    SELECT u.*, u.password_hash AS "password",
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code) AS branch,
      json_build_object('id', r.id, 'name', r.name, 'is_system_role', r.is_system_role, 'permissions', r.permissions) AS role
    FROM "users" u
    JOIN "branches" b ON b.id = u.branch_id
    JOIN "roles" r ON r.id = u.role_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR u.branch_id = CAST(${branchId || null} AS uuid))
      AND (CAST(${roleId || null} AS VARCHAR) IS NULL OR u.role_id = CAST(${roleId || null} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR u.status = ${status})
      AND (CAST(${search || null} AS VARCHAR) IS NULL OR
        LOWER(u.full_name) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(u.email) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(u.username) LIKE LOWER('%' || ${search || ""} || '%'))
    ORDER BY u.created_at DESC
    LIMIT ${limit ?? 1000000} OFFSET ${skip ?? 0}
  `;
};

export const countUsers = (filters = {}) => {
  const { branchId, roleId, status, search } = filters;
  return query`
    SELECT COUNT(*) as count
    FROM "users" u
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR u.branch_id = CAST(${branchId || null} AS uuid))
      AND (CAST(${roleId || null} AS VARCHAR) IS NULL OR u.role_id = CAST(${roleId || null} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR u.status = ${status})
      AND (CAST(${search || null} AS VARCHAR) IS NULL OR
        LOWER(u.full_name) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(u.email) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(u.username) LIKE LOWER('%' || ${search || ""} || '%'))
  `.then((rows) => Number(rows[0]?.count ?? 0));
};

export const findUserFirst = (where) => {
  const { id, branchId, roleId } = where || {};
  if (id) return findUserById(id);
  return query`
    SELECT u.*, u.password_hash AS "password",
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code) AS branch,
      json_build_object('id', r.id, 'name', r.name, 'is_system_role', r.is_system_role, 'permissions', r.permissions) AS role
    FROM "users" u
    JOIN "branches" b ON b.id = u.branch_id
    JOIN "roles" r ON r.id = u.role_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR u.branch_id = CAST(${branchId || null} AS uuid))
      AND (CAST(${roleId || null} AS VARCHAR) IS NULL OR u.role_id = CAST(${roleId || null} AS uuid))
    LIMIT 1
  `.then((rows) => rows[0] || null);
};

export const findUserById = async (id) => {
  const user = await query`
    SELECT u.*, u.password_hash AS "password",
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code) AS branch,
      json_build_object('id', r.id, 'name', r.name, 'is_system_role', r.is_system_role, 'permissions', r.permissions) AS role
    FROM "users" u
    JOIN "branches" b ON b.id = u.branch_id
    JOIN "roles" r ON r.id = u.role_id
    WHERE u.id = CAST(${id} AS uuid)
    LIMIT 1
  `.then((rows) => rows[0] || null);

  if (user) {
    const achievements = await prisma.achievement.findMany({
      where: { user_id: id },
      orderBy: { created_at: "asc" }
    });
    user.achievements = achievements;
  }
  return user;
};

export const createUser = (data) => {
  const socialLinks = {
    facebook: data.facebook || "",
    linkedin: data.linkedin || "",
    twitter: data.twitter || "",
    instagram: data.instagram || "",
    custom: data.custom || ""
  };
  return executeOne`
    INSERT INTO "users" (
      username, email, password_hash, employee_id, full_name, full_name_bn,
      photo_url, phone, designation, department, joining_date,
      status, social_links,
      role_id, branch_id, bio, bio_bn, is_mentor
    )
    VALUES (
      ${data.username}, ${data.email}, ${data.password}, ${data.employee_id || null}, ${data.full_name}, ${data.full_name_bn || null},
      ${data.photo_url || ""}, ${data.phone || null}, ${data.designation || "Staff"}, ${data.department || "General"}, ${data.joining_date || new Date().toISOString()},
      ${data.status || "Active"}, CAST(${JSON.stringify(socialLinks)} AS jsonb),
      CAST(${data.role_id} AS uuid), CAST(${data.branch_id} AS uuid), ${data.bio || ""}, ${data.bio_bn || ""}, ${data.is_mentor ?? false}
    )
    RETURNING id
  `.then((row) => (row ? findUserById(row.id) : null));
};

export const updateUser = async (id, data) => {
  const current = await findUserById(id);
  const existingSocial = current?.social_links 
    ? (typeof current.social_links === "string" ? JSON.parse(current.social_links) : current.social_links)
    : {};
  
  const socialLinks = {
    facebook: data.facebook !== undefined ? data.facebook : (existingSocial.facebook || ""),
    linkedin: data.linkedin !== undefined ? data.linkedin : (existingSocial.linkedin || ""),
    twitter: data.twitter !== undefined ? data.twitter : (existingSocial.twitter || ""),
    instagram: data.instagram !== undefined ? data.instagram : (existingSocial.instagram || ""),
    custom: data.custom !== undefined ? data.custom : (existingSocial.custom || "")
  };

  await execute`
    UPDATE "users"
    SET username = COALESCE(${data.username ?? null}, username),
        email = COALESCE(${data.email ?? null}, email),
        password_hash = COALESCE(${data.password ?? null}, password_hash),
        full_name = COALESCE(${data.full_name ?? null}, full_name),
        full_name_bn = COALESCE(${data.full_name_bn ?? null}, full_name_bn),
        phone = COALESCE(${data.phone ?? null}, phone),
        designation = COALESCE(${data.designation ?? null}, designation),
        department = COALESCE(${data.department ?? null}, department),
        status = COALESCE(${data.status ?? null}, status),
        photo_url = COALESCE(${data.photo_url ?? null}, photo_url),
        social_links = CAST(${JSON.stringify(socialLinks)} AS jsonb),
        bio = COALESCE(${data.bio ?? null}, bio),
        bio_bn = COALESCE(${data.bio_bn ?? null}, bio_bn),
        is_mentor = COALESCE(${data.is_mentor ?? null}, is_mentor),
        role_id = COALESCE(CAST(${data.role_id ?? null} AS uuid), role_id),
        branch_id = COALESCE(CAST(${data.branch_id ?? null} AS uuid), branch_id),
        updated_at = NOW()
    WHERE id = CAST(${id} AS uuid)
  `;
  return findUserById(id);
};

export const deleteUser = (id) =>
  execute`DELETE FROM "users" WHERE id = CAST(${id} AS uuid)`;

// Kept for backwards compat - service still calls these
export const findMany = findUsers;
export const count = countUsers;
export const findFirst = findUserFirst;
export const findById = findUserById;
export const create = createUser;
export const update = updateUser;
export const remove = deleteUser;
