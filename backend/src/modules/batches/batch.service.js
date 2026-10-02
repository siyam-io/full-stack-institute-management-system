import * as repo from "./batch.repository.js";
import { serializeBatch } from "./batch.serializer.js";
import AppError from "../../core/errors/AppError.js";
import prisma from "../../core/db/prisma.js";
import { mapBatchInput, refId } from "../../core/utils/refId.js";

export const createBatch = (data) => {
  const d = mapBatchInput(data);
  return repo.createBatch(d).then(serializeBatch);
};

export const fetchAll = async (query, branchFilter, isMaster) => {
  const filters = {};
  if (branchFilter?.branch_id) filters.branchId = branchFilter.branch_id;
  else if (branchFilter?.branch) filters.branchId = branchFilter.branch;
  if (isMaster && query.branch && query.branch !== "all") filters.branchId = query.branch;
  if (query.status && query.status !== "all") filters.status = query.status;
  const page = parseInt(query.page) || 1, limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  const filtersWithPagination = { ...filters, limit, skip };
  const [batches, total] = await Promise.all([repo.findBatches(filtersWithPagination), repo.countBatches(filters)]);
  return { data: batches.map(serializeBatch), pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};

export const fetchById = async (id, branchFilter) => {
  const where = { id };
  if (branchFilter?.branch_id) where.branchId = branchFilter.branch_id;
  else if (branchFilter?.branch) where.branchId = branchFilter.branch;
  const b = await repo.findBatchFirst(where);
  if (!b) throw new AppError("Batch not found", 404);
  return serializeBatch(b);
};

export const modify = (id, data) => {
  const d = {};
  if (data.batch_name) d.batch_name = data.batch_name;
  if (data.start_date) d.start_date = new Date(data.start_date);
  if (data.schedule_days) d.schedule_days = JSON.stringify(data.schedule_days);
  if (data.class_time_en) d.class_time_en = data.class_time_en;
  if (data.class_time_bn) d.class_time_bn = data.class_time_bn;
  if (data.class_days_bn) d.class_days_bn = data.class_days_bn;
  if (data.status) d.status = data.status;
  if (data.courseId || data.course) d.course_id = data.courseId || refId(data.course);
  return repo.updateBatch(id, d).then(serializeBatch);
};

export const remove = async (id) => {
  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`DELETE FROM "ClassContent" WHERE batch_id = ${id}`;
    await tx.$executeRaw`DELETE FROM "Batch" WHERE id = ${id}`;
  });
};
