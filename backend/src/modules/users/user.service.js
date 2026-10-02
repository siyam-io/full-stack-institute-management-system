import bcrypt from "bcryptjs";
import * as repo from "./user.repository.js";
import { serializeUser } from "./user.serializer.js";
import { refId } from "../../core/utils/refId.js";
import AppError from "../../core/errors/AppError.js";
import { deleteLocalFile } from "../../../middlewares/multer.js";
import prisma from "../../core/db/prisma.js";

export const fetchUsers = async (filters, page, limit) => {
  const p = parseInt(page) || 1, l = parseInt(limit) || 20;
  const repoFilters = {};
  if (filters.branch) repoFilters.branchId = filters.branch;
  if (filters.role) repoFilters.roleId = filters.role;
  if (filters.status) repoFilters.status = filters.status;
  if (filters.search) repoFilters.search = filters.search;
  const skip = (p - 1) * l;
  const repoFiltersWithPagination = { ...repoFilters, limit: l, skip };
  const [users, total] = await Promise.all([repo.findUsers(repoFiltersWithPagination), repo.countUsers(repoFilters)]);
  return { users: users.map(serializeUser), pagination: { total, page: p, limit: l, totalPages: Math.ceil(total / l) } };
};

export const fetchById = async (id, branchFilter) => {
  const where = { id };
  if (branchFilter?.branch) where.branch_id = branchFilter.branch;
  const user = await repo.findUserFirst(where);
  if (!user) throw new AppError("User not found", 404);
  return serializeUser(user);
};

const syncMentorRelation = async (user) => {
  if (!user) return;
  if (user.isMentor) {
    await prisma.mentor.upsert({
      where: { user_id: user.id },
      update: {
        full_name: user.fullName,
        designation: user.designation,
        department: user.department,
        photo_url: user.photoUrl || "",
        bio: user.bio || "",
        social_links: user.social_links || {},
        is_active: true,
      },
      create: {
        user_id: user.id,
        full_name: user.fullName,
        designation: user.designation,
        department: user.department,
        photo_url: user.photoUrl || "",
        bio: user.bio || "",
        social_links: user.social_links || {},
        is_active: true,
      }
    });
  } else {
    await prisma.mentor.updateMany({
      where: { user_id: user.id },
      data: { is_active: false }
    });
  }
};

const syncUserAchievements = async (userId, achievementsEn, achievementsBn) => {
  if (achievementsEn === undefined && achievementsBn === undefined) return;

  const existing = await prisma.achievement.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "asc" }
  });

  const fallbackEn = existing.map(a => a.title_en).join("\n");
  const fallbackBn = existing.map(a => a.title_bn || "").join("\n");

  const finalEn = achievementsEn !== undefined ? achievementsEn : fallbackEn;
  const finalBn = achievementsBn !== undefined ? achievementsBn : fallbackBn;

  await prisma.achievement.deleteMany({
    where: { user_id: userId }
  });

  const linesEn = finalEn.split("\n").map(l => l.trim()).filter(Boolean);
  const linesBn = finalBn.split("\n").map(l => l.trim()).filter(Boolean);

  const maxLength = Math.max(linesEn.length, linesBn.length);
  for (let i = 0; i < maxLength; i++) {
    await prisma.achievement.create({
      data: {
        user_id: userId,
        title_en: linesEn[i] || "",
        title_bn: linesBn[i] || null,
        is_verified: true
      }
    });
  }
};

export const createUser = async (data, file, isMaster, adminBranch) => {
  const fp = file ? `/uploads/employees/${file.filename}` : null;
  try {
    const roleRows = await prisma.$queryRaw`SELECT * FROM "roles" WHERE "id" = CAST(${refId(data.role)} AS uuid) LIMIT 1`;
    const roleDoc = roleRows[0];
    if (!roleDoc) throw new AppError("Invalid role", 400);
    if (!isMaster) {
      data.branch = adminBranch;
      if (roleDoc.permissions?.includes("all_access") || roleDoc.name === "superadmin") throw new AppError("Cannot create master account", 403);
    }
    const pw = data.password ? await bcrypt.hash(data.password, 10) : undefined;
    const userData = {
      username: data.username, email: data.email?.toLowerCase(), password: pw, full_name: data.full_name,
      full_name_bn: data.full_name_bn || null,
      phone: data.phone, designation: data.designation || "Staff", department: data.department || "General",
      status: data.status || "Active", photo_url: fp || "",
      facebook: data.facebook || data.social_links?.facebook || "",
      linkedin: data.linkedin || data.social_links?.linkedin || "",
      twitter: data.twitter || data.social_links?.twitter || "",
      instagram: data.instagram || data.social_links?.instagram || "",
      custom: data.custom || data.others || data.social_links?.custom || "",
      role_id: refId(data.role),
      branch_id: isMaster ? refId(data.branch) : adminBranch,
      bio: data.bio || "",
      bio_bn: data.bio_bn || "",
      is_mentor: data.is_mentor === true || data.is_mentor === "true",
    };
    const user = await repo.createUser(userData);
    await syncUserAchievements(user.id, data.achievements || "", data.achievements_bn || "");
    const serialized = serializeUser(user);
    await syncMentorRelation(serialized);
    return serialized;
  } catch (e) { if (fp) deleteLocalFile(fp); throw e; }
};

export const modifyUser = async (id, data, file, isMaster, adminBranch, branchFilter) => {
  const fp = file ? `/uploads/employees/${file.filename}` : null;
  try {
    const where = { id };
    if (branchFilter?.branch) where.branch_id = branchFilter.branch;
    const target = await repo.findUserFirst(where);
    if (!target) throw new AppError("User not found", 404);
    if (!isMaster) {
      if (data.role && refId(data.role) !== target.role_id) {
        const rrRows = await prisma.$queryRaw`SELECT * FROM "roles" WHERE "id" = CAST(${refId(data.role)} AS uuid) LIMIT 1`;
        const rr = rrRows[0];
        if (rr && (rr.permissions?.includes("all_access") || rr.name === "superadmin")) throw new AppError("Cannot elevate to master", 403);
      }
      delete data.branch;
    }
    const updateData = {};
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email.toLowerCase();
    if (data.password && data.password !== "") updateData.password = await bcrypt.hash(data.password, 10);
    if (data.full_name) updateData.full_name = data.full_name;
    if (data.full_name_bn !== undefined) updateData.full_name_bn = data.full_name_bn;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.designation) updateData.designation = data.designation;
    if (data.department) updateData.department = data.department;
    if (fp) { if (target.photo_url) deleteLocalFile(target.photo_url); updateData.photo_url = fp; }
    if (data.role) updateData.role_id = refId(data.role);
    if (isMaster && data.branch) updateData.branch_id = refId(data.branch);
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.bio_bn !== undefined) updateData.bio_bn = data.bio_bn;
    if (data.is_mentor !== undefined) updateData.is_mentor = data.is_mentor === true || data.is_mentor === "true";
    const fb = data.facebook || data.social_links?.facebook; if (fb !== undefined) updateData.facebook = fb;
    const li = data.linkedin || data.social_links?.linkedin; if (li !== undefined) updateData.linkedin = li;
    const tw = data.twitter || data.social_links?.twitter; if (tw !== undefined) updateData.twitter = tw;
    const ig = data.instagram || data.social_links?.instagram; if (ig !== undefined) updateData.instagram = ig;
    const cu = data.custom || data.others || data.social_links?.custom; if (cu !== undefined) updateData.custom = cu;
    const user = await repo.updateUser(id, updateData);
    await syncUserAchievements(id, data.achievements, data.achievements_bn);
    const serialized = serializeUser(user);
    await syncMentorRelation(serialized);
    return serialized;
  } catch (e) { if (fp) deleteLocalFile(fp); throw e; }
};

export const removeUser = async (id, branchFilter) => {
  const where = { id };
  if (branchFilter?.branch) where.branch_id = branchFilter.branch;
  const t = await repo.findUserFirst(where);
  if (!t) throw new AppError("Not found", 404);
  if (t.photo_url) deleteLocalFile(t.photo_url);
  await repo.deleteUser(id);
};

export const changeStatus = (id, status) =>
  repo.updateUser(id, { status }).then(serializeUser);

export const changeRole = async (id, roleId, isMaster) => {
  if (!isMaster) {
    const rrRows = await prisma.$queryRaw`SELECT * FROM "roles" WHERE "id" = CAST(${roleId} AS uuid) LIMIT 1`;
    const rr = rrRows[0];
    if (rr?.permissions?.includes("all_access") || rr?.name === "superadmin") throw new AppError("Cannot elevate", 403);
  }
  return repo.updateUser(id, { role_id: roleId }).then(serializeUser);
};

export const deleteImage = async (id, branchFilter) => {
  const where = { id };
  if (branchFilter?.branch) where.branch_id = branchFilter.branch;
  const u = await repo.findUserFirst(where);
  if (!u) throw new AppError("Not found", 404);
  if (u.photo_url) deleteLocalFile(u.photo_url);
  return repo.updateUser(id, { photo_url: "" }).then(serializeUser);
};
