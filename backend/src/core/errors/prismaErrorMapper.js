import AppError from "../errors/AppError.js";

/**
 * Map Prisma errors to user-friendly HTTP errors.
 */
export const handlePrismaError = (error) => {
  if (!error) return;

  if (error.code === "P2002") {
    // Unique constraint violation
    const field = error.meta?.target?.join(", ") || "field";
    throw new AppError(`Duplicate ${field} value`, 400);
  }

  if (error.code === "P2010") {
    // Raw query failed. Check PostgreSQL error code for unique violation (23505)
    const dbMessage = error.message || "";
    const dbCode = error.meta?.code || "";
    if (dbCode === "23505" || dbMessage.includes("23505")) {
      let field = "field";
      const match = dbMessage.match(/Key \((.*?)\)=\((.*?)\) already exists/);
      if (match && match[1]) {
        field = match[1];
      }
      throw new AppError(`Duplicate value for ${field}. Please use another value!`, 400);
    }
  }

  if (error.code === "P2025") {
    // Record not found
    throw new AppError("Record not found", 404);
  }

  if (error.code === "P2003") {
    // Foreign key constraint failed
    throw new AppError("Referenced record does not exist", 400);
  }

  // Re-throw if not a known Prisma error
  throw error;
};
