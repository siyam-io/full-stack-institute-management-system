import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const branches = await prisma.branch.findMany();
    console.log("Branches rows count:", branches.length);
    console.log("Branches details:", JSON.stringify(branches, null, 2));
  } catch (err) {
    console.error("Prisma query error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
