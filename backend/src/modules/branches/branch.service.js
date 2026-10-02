import * as repo from "./branch.repository.js";
import { serializeBranch } from "./branch.serializer.js";
import AppError from "../../core/errors/AppError.js";

export const getAll = () => repo.findAll().then(r => r.map(serializeBranch));
export const getById = async (id) => { const b = await repo.findById(id); if (!b) throw new AppError("Branch not found", 404); return serializeBranch(b); };
export const create = (d) => repo.create(d).then(serializeBranch);
export const update = (id, d) => repo.update(id, d).then(serializeBranch);
export const toggle = async (id) => { const b = await repo.findById(id); if (!b) throw new AppError("Branch not found", 404); return repo.update(id, { is_active: !b.is_active }).then(serializeBranch); };
export const remove = async (id) => { await repo.remove(id); };
