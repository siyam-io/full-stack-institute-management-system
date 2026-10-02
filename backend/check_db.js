import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: { role: true, branch: true }
  });
  console.log("=== USERS ===");
  users.forEach(u => {
    console.log({
      id: u.id,
      email: u.email,
      username: u.username,
      roleName: u.role?.name,
      branchName: u.branch?.branch_name,
      permissions: u.role?.permissions
    });
  });

  const roles = await prisma.role.findMany();
  console.log("=== ROLES ===");
  console.log(roles.map(r => ({ id: r.id, name: r.name, permissions: r.permissions })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
