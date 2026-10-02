/**
 * CIBDHK SQL Backend — Entry Point
 * 
 * Architecture:
 *   index.js → src/server.js → src/app.js → src/routes/ → src/modules/*
 * 
 * Layer chain: Route → Controller → Service → Repository → Prisma
 * 
 * Uses feature-module structure:
 *   src/modules/auth/        src/modules/users/
 *   src/modules/roles/       src/modules/branches/
 *   src/modules/courses/     src/modules/batches/
 *   src/modules/classes/     src/modules/students/
 *   src/modules/finance/     src/modules/inventory/
 *   src/modules/requisitions/  src/modules/expenses/
 *   src/modules/dashboard/   src/modules/certificates/
 *   src/modules/syllabus/    src/modules/holidays/
 */

import "./src/server.js";
