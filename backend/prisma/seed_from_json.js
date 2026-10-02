import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const readJson = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  let content = fs.readFileSync(filePath, "utf-8");
  if (content.startsWith("\ufeff")) {
    content = content.slice(1);
  }
  return JSON.parse(content);
};

async function main() {
  console.log("🚀 Starting import of pages and courses from JSON content files...");

  const contentEnDir = "D:/pg/web_app/cibdhk/web1/content/en";
  const contentBnDir = "D:/pg/web_app/cibdhk/web1/content/bn";

  // --- 1. Import Marketing Pages ---
  console.log("Importing Marketing Pages...");
  const marketingFiles = [
    "about.json",
    "admission.json",
    "contact.json",
    "privacy.json",
    "terms.json",
    "faq.json",
    "mentors.json",
    "courses.json",
    "gallery.json",
    "short-courses.json",
    "industry-partners.json",
    "success-stories.json",
    "company-profile.json",
    "press-media.json",
    "location.json"
  ];

  for (const filename of marketingFiles) {
    const enPath = path.join(contentEnDir, filename);
    const bnPath = path.join(contentBnDir, filename);

    if (!fs.existsSync(enPath)) continue;

    const enData = readJson(enPath);
    const bnData = readJson(bnPath);

    const slug = filename.replace(".json", "");

    await prisma.marketingPage.upsert({
      where: { slug },
      update: {
        title_en: enData.meta?.title || enData.title || slug,
        title_bn: bnData?.meta?.title || bnData?.title || null,
        content_en: enData,
        content_bn: bnData || {},
        seo_title_en: enData.meta?.title || null,
        seo_title_bn: bnData?.meta?.title || null,
        seo_description_en: enData.meta?.description || null,
        seo_description_bn: bnData?.meta?.description || null,
      },
      create: {
        slug,
        title_en: enData.meta?.title || enData.title || slug,
        title_bn: bnData?.meta?.title || bnData?.title || null,
        content_en: enData,
        content_bn: bnData || {},
        seo_title_en: enData.meta?.title || null,
        seo_title_bn: bnData?.meta?.title || null,
        seo_description_en: enData.meta?.description || null,
        seo_description_bn: bnData?.meta?.description || null,
      }
    });
    console.log(`✅ Seeded Marketing Page: ${slug}`);
  }

  // --- 2. Import Course Public Pages ---
  console.log("Importing Course Detail Pages...");
  const courseFiles = fs.readdirSync(contentEnDir).filter(f => 
    f.endsWith(".json") && !marketingFiles.includes(f) && f !== "home.json" && f !== "blog_hero.json"
  );

  for (const filename of courseFiles) {
    const enPath = path.join(contentEnDir, filename);
    const bnPath = path.join(contentBnDir, filename);

    const enData = readJson(enPath);
    const bnData = readJson(bnPath);

    const slug = filename.replace(".json", "");
    const courseCode = slug.substring(0, 8).toUpperCase();

    // Check if Course row exists, otherwise create it
    let course = await prisma.course.findFirst({
      where: {
        OR: [
          { slug },
          { course_code: courseCode }
        ]
      }
    });

    if (!course) {
      course = await prisma.course.create({
        data: {
          course_name_en: enData.hero?.heading || slug,
          course_name_bn: bnData?.hero?.heading || null,
          course_code: courseCode,
          slug,
          duration_value: 6,
          duration_unit: "months",
          base_fee: 44000,
          is_active: true
        }
      });
    }

    await prisma.coursePublicPage.upsert({
      where: { course_id: course.id },
      update: {
        slug,
        hero_title_en: enData.hero?.heading || enData.meta?.title || "",
        hero_title_bn: bnData?.hero?.heading || bnData?.meta?.title || null,
        hero_subtitle_en: enData.hero?.subheading || null,
        hero_subtitle_bn: bnData?.hero?.subheading || null,
        overview_en: enData.overview?.text || null,
        overview_bn: bnData?.overview?.text || null,
        content_en: enData,
        content_bn: bnData || {},
        seo_title_en: enData.meta?.title || null,
        seo_title_bn: bnData?.meta?.title || null,
        seo_description_en: enData.meta?.description || null,
        seo_description_bn: bnData?.meta?.description || null,
        status: "published",
        published_at: new Date()
      },
      create: {
        course_id: course.id,
        slug,
        hero_title_en: enData.hero?.heading || enData.meta?.title || "",
        hero_title_bn: bnData?.hero?.heading || bnData?.meta?.title || null,
        hero_subtitle_en: enData.hero?.subheading || null,
        hero_subtitle_bn: bnData?.hero?.subheading || null,
        overview_en: enData.overview?.text || null,
        overview_bn: bnData?.overview?.text || null,
        content_en: enData,
        content_bn: bnData || {},
        seo_title_en: enData.meta?.title || null,
        seo_title_bn: bnData?.meta?.title || null,
        seo_description_en: enData.meta?.description || null,
        seo_description_bn: bnData?.meta?.description || null,
        status: "published",
        published_at: new Date()
      }
    });
    console.log(`✅ Seeded Course Detail Page: ${slug}`);
  }

  // --- 3. Import Blog Posts ---
  console.log("Importing Blog Posts...");
  const blogEnDir = path.join(contentEnDir, "blog");
  const blogBnDir = path.join(contentBnDir, "blog");

  if (fs.existsSync(blogEnDir)) {
    const blogFiles = fs.readdirSync(blogEnDir).filter(f => f.endsWith(".json"));

    for (const filename of blogFiles) {
      const enPath = path.join(blogEnDir, filename);
      const bnPath = path.join(blogBnDir, filename);

      const enData = readJson(enPath);
      const bnData = readJson(bnPath);

      const slug = filename.replace(".json", "");

      await prisma.blogPost.upsert({
        where: { slug },
        update: {
          title_en: enData.title || slug,
          title_bn: bnData?.title || null,
          excerpt_en: enData.excerpt || null,
          excerpt_bn: bnData?.excerpt || null,
          content_en: enData,
          content_bn: bnData || {},
          seo_title_en: enData.meta?.title || null,
          seo_title_bn: bnData?.meta?.title || null,
          seo_description_en: enData.meta?.description || null,
          seo_description_bn: bnData?.meta?.description || null,
          status: "published",
          published_at: new Date()
        },
        create: {
          slug,
          title_en: enData.title || slug,
          title_bn: bnData?.title || null,
          excerpt_en: enData.excerpt || null,
          excerpt_bn: bnData?.excerpt || null,
          content_en: enData,
          content_bn: bnData || {},
          seo_title_en: enData.meta?.title || null,
          seo_title_bn: bnData?.meta?.title || null,
          seo_description_en: enData.meta?.description || null,
          seo_description_bn: bnData?.meta?.description || null,
          status: "published",
          published_at: new Date()
        }
      });
      console.log(`✅ Seeded Blog Post: ${slug}`);
    }
  }

  console.log("🎉 All contents successfully imported from JSON files!");
}

main()
  .catch((e) => {
    console.error("Error seeding JSON pages:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
