import * as repo from "./role.repository.js";
import * as serializer from "./role.serializer.js";
import AppError from "../../core/errors/AppError.js";

export const getRoles = async () => {
  const roles = await repo.findAll();
  return roles.map(serializer.serializeRole);
};
export const getRoleById = async (id) => {
  const r = await repo.findById(id);
  if (!r) throw new AppError("Role not found", 404);
  return serializer.serializeRole(r);
};
export const createRole = async (data) => {
  const r = await repo.create({ ...data, permissions: JSON.stringify(data.permissions ?? []) });
  return serializer.serializeRole(r);
};
export const updateRole = async (id, data) => {
  const r = await repo.update(id, { ...data, permissions: JSON.stringify(data.permissions ?? []) });
  return serializer.serializeRole(r);
};
export const deleteRole = async (id) => {
  const c = await repo.countUsersWithRole(id);
  if (c > 0) throw new AppError("Cannot delete role assigned to users.", 400);
  await repo.remove(id);
};
