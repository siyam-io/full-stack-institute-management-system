import { z } from "zod";
import { objectIdSchema } from "./common.js";

const daysEnum = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

const objectIdArraySchema = z.preprocess((val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val.trim() === "" ? [] : val.split(",").map((s) => s.trim());
  }
  return [];
}, z.array(objectIdSchema).optional().default([]));

const scheduleDaysSchema = z.preprocess((val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val.trim() === "" ? [] : val.split(",").map((s) => s.trim());
  }
  return [];
}, z.array(daysEnum).min(1));

export const batchCreateSchema = z.object({
  batch_name: z.string().trim().min(1),
  batch_name_bn: z.string().trim().nullable().optional(),
  course: objectIdSchema,
  branch: objectIdSchema.optional(),

  instructors: objectIdArraySchema,

  start_date: z.string().min(1),
  end_date: z.string().nullable().optional(),

  time_slot: z.object({
    start_time: z.string().min(1),
    end_time: z.string().min(1),
  }),
  class_time_bn: z.string().nullable().optional(),

  schedule_days: scheduleDaysSchema,
  class_days_bn: z.string().nullable().optional(),

  status: z
    .enum(["Upcoming", "Active", "Completed", "On Hold"])
    .default("Upcoming"),
  capacity: z.preprocess((val) => (val === "" ? null : Number(val)), z.number().nullable().optional()),
  duration_en: z.string().nullable().optional(),
  duration_bn: z.string().nullable().optional(),
  total_classes: z.preprocess((val) => (val === "" ? null : Number(val)), z.number().nullable().optional()),
  badge_en: z.string().nullable().optional(),
  badge_bn: z.string().nullable().optional(),
});

export const batchUpdateSchema = z
  .object({
    batch_name: z.string().trim().optional(),
    batch_name_bn: z.string().trim().nullable().optional(),
    course: objectIdSchema.optional(),

    instructors: objectIdArraySchema.optional(),

    start_date: z.string().optional(),
    end_date: z.string().nullable().optional(),

    time_slot: z
      .object({
        start_time: z.string().optional(),
        end_time: z.string().optional(),
      })
      .optional(),
    class_time_bn: z.string().nullable().optional(),

    schedule_days: scheduleDaysSchema.optional(),
    class_days_bn: z.string().nullable().optional(),

    status: z.enum(["Upcoming", "Active", "Completed", "On Hold"]).optional(),
    capacity: z.preprocess((val) => (val === "" ? null : Number(val)), z.number().nullable().optional()),
    duration_en: z.string().nullable().optional(),
    duration_bn: z.string().nullable().optional(),
    total_classes: z.preprocess((val) => (val === "" ? null : Number(val)), z.number().nullable().optional()),
    badge_en: z.string().nullable().optional(),
    badge_bn: z.string().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });
