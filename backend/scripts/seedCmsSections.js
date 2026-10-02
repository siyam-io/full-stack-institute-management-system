import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SECTIONS = [
  { sectionKey: "home_hero", pageKey: "home", title: "Home Hero" },
  { sectionKey: "professional_chef_course", pageKey: "home", title: "Professional Chef Course" },
  { sectionKey: "student_testimonials", pageKey: "home", title: "Student Testimonials" },
  { sectionKey: "strategic_team", pageKey: "about", title: "Strategic Team" },
  { sectionKey: "course_page", pageKey: "courses", title: "Course Page" },
  { sectionKey: "blog_page", pageKey: "blog", title: "Blog Page" },
];

async function main() {
  console.log("Seeding cms_sections...\n");

  for (const { sectionKey, pageKey, title } of SECTIONS) {
    try {
      await prisma.$executeRaw`
        INSERT INTO "cms_sections" (id, section_key, page_key, title, created_at, updated_at)
        VALUES (gen_random_uuid(), ${sectionKey}, ${pageKey}, ${title}, NOW(), NOW())
        ON CONFLICT (section_key) DO NOTHING
      `;
      console.log(`  [OK] ${sectionKey} (${title})`);
    } catch (err) {
      console.error(`  [ERR] ${sectionKey}:`, err.message);
    }
  }

  // Verify
  const count = await prisma.$queryRaw`SELECT COUNT(*)::int as count FROM "cms_sections"`;
  console.log(`\nTotal cms_sections: ${count[0]?.count || 0}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
