import authRoutes from "../modules/auth/auth.routes.js";
import roleRoutes from "../modules/roles/role.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import branchRoutes from "../modules/branches/branch.routes.js";
import { adminRouter as courseRoutes, publicRouter as publicCourseRoutes } from "../modules/courses/course.routes.js";
import studentRoutes from "../modules/students/student.routes.js";
import batchRoutes from "../modules/batches/batch.routes.js";
import classRoutes from "../modules/classes/class.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import financeRoutes from "../modules/finance/finance.routes.js";
import certificateRoutes from "../modules/certificates/certificate.routes.js";
import { adminRouter as blogRoutes, publicRouter as publicBlogRoutes } from "../modules/blogs/blog.routes.js";
import { adminRouter as marketingRoutes, publicRouter as publicMarketingRoutes } from "../modules/marketingPages/marketingPage.routes.js";
import { adminRouter as cmsRoutes, publicRouter as publicCmsRoutes } from "../modules/cms/cms.routes.js";
import auditRoutes from "../modules/audit/audit.routes.js";

const ROUTES = [
  ["/auth", authRoutes],
  ["/roles", roleRoutes],
  ["/users", userRoutes],
  ["/branches", branchRoutes],
  ["/courses", courseRoutes],
  ["/public/courses", publicCourseRoutes],
  ["/students", studentRoutes],
  ["/batches", batchRoutes],
  ["/classes", classRoutes],
  ["/dashboard", dashboardRoutes],
  ["/finance", financeRoutes],
  ["/generate-certificate", certificateRoutes],
  ["/blogs", blogRoutes],
  ["/public/blogs", publicBlogRoutes],
  ["/marketing-pages", marketingRoutes],
  ["/public/marketing-pages", publicMarketingRoutes],
  ["/cms", cmsRoutes],
  ["/public", publicCmsRoutes],
  ["/audit-logs", auditRoutes],
];

export const registerRoutes = (app) => {
  // v1 routes (clean API contract)
  for (const [path, router] of ROUTES) {
    app.use(`/api/v1${path}`, router);
  }
  // Legacy alias (backward compatible)
  for (const [path, router] of ROUTES) {
    app.use(`/api${path}`, router);
  }
};
