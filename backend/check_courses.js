import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany({
    include: { coursePublicPages: true }
  });
  console.log("=== COURSES & PUBLIC PAGES ===");
  courses.forEach(c => {
    console.log({
      id: c.id,
      name: c.name,
      slug: c.slug,
      status: c.status,
      publicPagesCount: c.coursePublicPages.length,
      publicPagesSlugs: c.coursePublicPages.map(p => ({ slug: p.slug, locale: p.locale, status: p.status }))
    });
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
