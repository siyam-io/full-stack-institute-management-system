import prisma from "../../core/db/prisma.js";
import { serializeRecord } from "../../core/utils/serialize.js";

export const fetchAuditLogs = async (page = 1, limit = 20, search = "", method = "") => {
  const skip = (page - 1) * limit;

  // Build filter options
  const where = {};
  
  if (method) {
    where.method = method;
  }

  if (search) {
    where.OR = [
      { action: { contains: search, mode: "insensitive" } },
      { endpoint: { contains: search, mode: "insensitive" } },
      { ip_address: { contains: search, mode: "insensitive" } },
      {
        user: {
          full_name: { contains: search, mode: "insensitive" }
        }
      }
    ];
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: {
            id: true,
            full_name: true,
            email: true,
            photo_url: true,
            role: {
              select: {
                name: true
              }
            }
          }
        }
      }
    }),
    prisma.auditLog.count({ where })
  ]);

  return {
    data: serializeRecord(logs),
    meta: {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  };
};
