import * as repo from "./dashboard.repository.js";
import prisma from "../../core/db/prisma.js";
import { serializeRecord } from "../../core/utils/serialize.js";

export const fetchDashboardStats = async (branchFilter) => {
  const branchVal = branchFilter?.branch_id || branchFilter?.branch || null;
  const where = branchVal ? { branchId: branchVal } : {};
  const currentYear = new Date().getFullYear();

  const [
    totalStudents,
    activeStudents,
    totalBatches,
    totalInstructors,
    monthlyRevenue,
    batchDistribution,
    totalRevenue,
  ] = await Promise.all([
    repo.countStudents(where),
    repo.countStudents({ ...where, status: "active" }),
    repo.countBatches({ ...where, status: "Active" }),
    repo.countInstructors(where),
    repo.getMonthlyPayments(where, currentYear),
    repo.getBatchDistribution(where),
    repo.getTotalRevenue(where),
  ]);

  return {
    totals: {
      students: { total: totalStudents, active: activeStudents },
      batches: { active: totalBatches },
      staff: { instructors: totalInstructors },
      finance: { collected: totalRevenue },
    },
    charts: {
      monthlyRevenue,
      batchDistribution,
    },
  };
};

export const fetchBranchStats = async (branchId) => {
  const where = { branchId };
  const currentYear = new Date().getFullYear();

  const [
    totalStudents,
    activeBatches,
    totalInstructors,
    activeCourses,
    totalRevenue,
    pendingLogistics,
    revenueChart,
    recentStudents,
    recentPayments,
    batchDistribution,
  ] = await Promise.all([
    repo.countStudents(where),
    repo.countBatches({ ...where, status: "Active" }),
    repo.countInstructors(where),
    prisma.course.count({ where: { is_active: true } }),
    repo.getTotalRevenue(where),
    repo.getPendingRequisitionsCount(branchId),
    repo.getMonthlyPayments(where, currentYear),
    repo.getRecentStudents(branchId),
    repo.getRecentPayments(branchId),
    repo.getBatchDistribution(where),
  ]);

  const branchName = await repo.getBranchName(branchId);

  const formattedRevenue = revenueChart.map((r) => ({ name: r.month, amount: r.revenue }));
  const formattedBatches = batchDistribution.map((b) => ({ batch_name: b.name, student_count: b.count }));

  return {
    branchName, totalStudents, activeBatches, instructors: totalInstructors,
    activeCourses, totalRevenue, pendingLogistics,
    batchDistribution: formattedBatches, batchData: formattedBatches,
    chartData: formattedBatches, revenueChart: formattedRevenue,
    recentActivities: { 
      students: serializeRecord(recentStudents), 
      payments: serializeRecord(recentPayments) 
    },
    classWiseExpenses: [], branchBatches: [],
  };
};
