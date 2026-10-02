import { z } from "zod";

// UUID v4 validation for Prisma (replaces Mongoose ObjectId check)
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const objectIdSchema = z.string().refine(
  (val) => uuidRegex.test(val) || /^[a-f0-9]{24}$/i.test(val),
  { message: "Invalid ID format" }
);